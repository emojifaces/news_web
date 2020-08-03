from django.forms import model_to_dict
from rest_framework.authentication import BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
import emoji

from blog.models import GoodFingerOfficals, OfficalImages
from cal.models import Calendar
from group.api import UnsafeSessionAuthentication, Remind
from group.models import Blogs, FirstBlogComment, SecondBlogComment, Attentions, CollectBlogs, GoodFingerBlogs, \
    BlogImages, BlogChoices, SelectBlogs
from index.models import FastInfo, Summary
from user.models import BaseUser
from datetime import datetime
from ad.models import *


class Mypage(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    # 定制传参
    page_size_query_param = 'limit'
    # 最大一页的数据
    max_page_size = 10

# index 加载快讯列表
class GetFastInfoList(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        if request.user.is_authenticated:
            user = BaseUser.objects.get(auth_user=request.user)
        else:
            user = None
        is_import = request.GET.get('import', '')
        page = request.GET.get('page', 1)
        limit = request.GET.get('limit', 30)
        start = (int(page) - 1) * int(limit)
        end = int(page) * int(limit)
        data = FastInfo.objects.filter(is_pub=True).order_by('-VN_pub_date').all()
        if is_import:
            data = data.filter(is_important=is_import).all()
        res = data[start:end]
        returnList = list()
        for obj in res:
            if obj.type == 1:
                # 日历
                if Calendar.objects.filter(id=obj.other_id).exists():
                    calendar = Calendar.objects.get(id=obj.other_id)
                    dic = model_to_dict(calendar)
                    dic['is_important'] = obj.is_important
                    dic['title'] = emoji.emojize(calendar.title)
                    dic['tran_title'] = emoji.emojize(calendar.tran_title)
                    dic['VN_pub_date'] = calendar.VN_pub_date.time()
                    if calendar.actual:
                        dic['actual'] = calendar.actual
                    else:
                        dic['actual'] = u'---'
                    if calendar.consensus:
                        dic['consensus'] = calendar.consensus
                    else:
                        dic['consensus'] = u'---'
                    if calendar.previous:
                        dic['previous'] = calendar.previous
                    else:
                        dic['previous'] = u'---'
                    dic['star'] = calendar.star
                    if calendar.unit == u'%':
                        dic['unit'] = u'%'
                    else:
                        dic['unit'] = ''
                    dic['fast_type'] = 1
                    returnList.append(dic)
            elif obj.type == 2:
                # group
                if Blogs.objects.filter(id=obj.other_id).exists():
                    blog = Blogs.objects.get(id=obj.other_id)
                    dic = model_to_dict(blog)
                    dic['is_important'] = obj.is_important
                    firstNum = FirstBlogComment.objects.filter(blog_id=blog, is_pub=True).count()
                    scondNum = SecondBlogComment.objects.filter(blog_id=blog, is_pub=True).count()
                    dic['commentNum'] = firstNum + scondNum
                    dic['content'] = emoji.emojize(blog.content)
                    dic['pub_date'] = blog.modify_date.strftime("%Y/%m/%d %H:%M:%S")
                    dic['VN_pub_date'] = obj.VN_pub_date.strftime("%Y/%m/%d %H:%M:%S")
                    if Attentions.objects.filter(user_id=user, star_id=blog.user_id).exists():
                        dic['isfollow'] = True
                    else:
                        dic['isfollow'] = False
                    if CollectBlogs.objects.filter(user_id=user, blog_id=blog, is_pub=True).exists():
                        dic['iscollect'] = True
                    else:
                        dic['iscollect'] = False
                    if GoodFingerBlogs.objects.filter(user_id=user, blog_id=blog, is_pub=True).exists():
                        dic['isgood'] = True
                    else:
                        dic['isgood'] = False
                    dic['header'] = blog.user_id.img
                    dic['username'] = blog.user_id.name

                    if BlogImages.objects.filter(blog_id=blog, is_pub=True).exists():
                        blogImage = BlogImages.objects.filter(blog_id=blog, is_pub=True).all()
                        imgList = list()
                        for oo in blogImage:
                            imgList.append(oo.img)
                        dic['img'] = imgList
                    else:
                        dic['img'] = []
                        if blog.bgcolor:
                            dic['isimportance'] = True
                    transpondList = list()
                    dataDic = dict()
                    if blog.type == 1:
                        # 投票
                        if BlogChoices.objects.filter(blog_id=blog, is_pub=True).exists():
                            blogChoice = BlogChoices.objects.filter(blog_id=blog, is_pub=True)
                            voteNum = 0
                            choiceList = list()
                            isallvote = False
                            for obj in blogChoice:
                                obj_dic = model_to_dict(obj)
                                obj_dic['content'] = emoji.emojize(obj.content)
                                obj_dic['pub_date'] = obj.modify_date.strftime("%Y/%m/%d %H:%M:%S")
                                if SelectBlogs.objects.filter(blog_id=blog, answer_id=obj, user_id=user).exists():
                                    obj_dic['isvote'] = True
                                    isallvote = True
                                else:
                                    obj_dic['isvote'] = False
                                choiceList.append(obj_dic)
                                voteNum += obj.num
                            dic['vote'] = choiceList
                            dic['voteNum'] = voteNum
                            dic['isallvote'] = isallvote
                    elif blog.type == 2:
                        while True:
                            if blog.type == 2:
                                # 转发
                                if Blogs.objects.filter(id=blog.blog_id.id, is_pub=True).exists():
                                    blog = Blogs.objects.get(id=blog.blog_id.id, is_pub=True)
                                    transpondList.append({'username': blog.user_id.name, 'id': blog.user_id.id})
                                    continue
                            else:
                                dataDic['data'] = model_to_dict(blog)
                                dataDic['data']['content'] = emoji.emojize(blog.content)
                                dataDic['data']['username'] = blog.user_id.name
                                if BlogImages.objects.filter(blog_id=blog, is_pub=True).exists():
                                    blogImage = BlogImages.objects.filter(blog_id=blog, is_pub=True).all()
                                    imgList = list()
                                    for oo in blogImage:
                                        imgList.append(oo.img)
                                    dataDic['data']['img'] = imgList
                                else:
                                    dataDic['data']['img'] = []
                                if blog.type == 1:
                                    # 投票
                                    if BlogChoices.objects.filter(blog_id=blog, is_pub=True).exists():
                                        blogChoice = BlogChoices.objects.filter(blog_id=blog, is_pub=True)
                                        voteNum = 0
                                        isallvote = False
                                        choiceList = list()
                                        for obj in blogChoice:
                                            obj_dic = model_to_dict(obj)
                                            obj_dic['content'] = emoji.emojize(obj.content)
                                            obj_dic['pub_date'] = obj.modify_date.strftime("%Y/%m/%d %H:%M:%S")
                                            if SelectBlogs.objects.filter(blog_id=blog, answer_id=obj, user_id=user).exists():
                                                obj_dic['isvote'] = True
                                                isallvote = True
                                            else:
                                                obj_dic['isvote'] = False
                                            choiceList.append(obj_dic)
                                            voteNum += obj.num
                                        dataDic['data']['vote'] = choiceList
                                        dataDic['data']['voteNum'] = voteNum
                                        dataDic['data']['isallvote'] = isallvote
                                dataDic['transpond'] = transpondList
                                break
                        dic['data'] = dataDic
                    dic['fast_type'] = 2
                    returnList.append(dic)
            elif obj.type == 0:
                # 快讯
                dic = model_to_dict(obj)
                dic['content'] = emoji.emojize(obj.content)
                dic['translate'] = emoji.emojize(obj.translate)
                dic['VN_pub_date'] = obj.VN_pub_date.time()
                dic['fast_type'] = obj.type
                returnList.append(dic)
            elif obj.type == 3:
                dic = model_to_dict(obj)
                ad_list = list()
                rounds_ad_group = RoundsAdvertsGroup.objects.get(id=obj.other_id)
                ads = RoundsAdverts.objects.filter(round_id=rounds_ad_group.id)
                for ad in ads:

                    ad_dict = {
                        'url':ad.url,
                        'sort':ad.sort,
                        'img':ad.img
                    }
                    ad_list.append(ad_dict)
                dic['rounds_ad_group'] = ad_list
                dic['VN_pub_date'] = obj.VN_pub_date.time().replace(microsecond=0)
                dic['fast_type'] = obj.type
                returnList.append(dic)
            elif obj.type == 5:
                if Offical.objects.filter(id=obj.other_id).exists():
                    offical = Offical.objects.get(id=obj.other_id)
                    dic = model_to_dict(offical)
                    if offical.title:
                        dic['title'] = emoji.emojize(offical.title)
                    if offical.content:
                        dic['content'] = emoji.emojize(offical.content)
                    if offical.type:
                        dic['type'] = offical.type.name
                        dic['typecolor'] = offical.type.color
                    else:
                        dic['type'] = ''
                        dic['typecolor'] = ''
                    dic['pub_date'] = offical.modify_date.strftime("%Y/%m/%d %H:%M:%S")
                    dic['VN_pub_date'] = obj.VN_pub_date.strftime("%Y/%m/%d %H:%M:%S")
                    if GoodFingerOfficals.objects.filter(user_id=user, offical_id=offical, is_pub=True).exists():
                        dic['isgood'] = True
                    else:
                        dic['isgood'] = False
                    dic['imglist'] = []
                    piclist = OfficalImages.objects.filter(offical_id=offical)
                    if len(piclist) > 0:
                        for pic in piclist:
                            dic['imglist'].append(pic.img)
                    dic['adlist'] = []
                    adlist = OfficalAdverts.objects.filter(offical_id=offical).order_by('sort')
                    if len(adlist) > 0:
                        for ad in adlist:
                            adobj = {'id': ad.id, 'url': ad.url, 'img': ad.img}
                            if ad.ad_id:
                                adobj['factoryname'] = ad.ad_id.name
                            else:
                                adobj['factoryname'] = ''
                            dic['adlist'].append(adobj)
                    dic['fast_type'] = 5
                    returnList.append(dic)


        return Response({'count': data.count(), 'page': page, 'limit': limit, 'data': returnList})


class GetCalendarList(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self,request):
        current_time = datetime.now()
        calendar_set = Calendar.objects.filter(VN_pub_date__gt=current_time).order_by('VN_pub_date')
        if calendar_set:
            calendar_list = list()
            for calendar in calendar_set:
                calendar_dict = {
                    "id": calendar.id,
                    "title": calendar.tran_title,
                    "tag": calendar.tag,
                    "actual": calendar.actual,
                    "consensus": calendar.consensus,
                    "previous": calendar.previous,
                    "star": calendar.star,
                    "country": calendar.tran_country,
                    "pub_date":calendar.VN_pub_date.time(),
                }
                calendar_list.append(calendar_dict)
            # print(calendar_list)
            return Response({"success":True,"data":calendar_list})
        else:
            return Response({"success":False,"msg":"暂无数据"})


# index 加载动态列表
class IndexGroupList(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self,request):

        if request.user.is_authenticated:
            baseuser = BaseUser.objects.get(auth_user=request.user)  # 已登录的用户
            user_id = baseuser.id
        else:
            user_id = None
        page = request.GET.get('page', 1)
        limit = request.GET.get('limite', 10)
        offset = request.GET.get('offset', 0)
        start = (int(page) - 1) * int(limit) + int(offset)
        end = start + int(limit)
        blog_list = Blogs.objects.filter(is_pub=True,state=0).order_by('-create_date')[start:end]
        if not blog_list:
            return Response({'success':False,'msg':'无数据'})
        group_list = list()

        for blog in blog_list:
            voteData = list()
            vote_list = blog.blogChoice_blog.filter(is_pub=True)
            if vote_list:
                for vote in vote_list:
                    vote_dict = {
                        'content':emoji.emojize(vote.content),
                        'isVote':vote.selectBlog_answer.filter(user_id_id=user_id).exists(),
                        'num':vote.num,
                        'id':vote.id
                    }
                    voteData.append(vote_dict)

            data = {
                'id': blog.id,
                'userId':blog.user_id_id,
                'type': blog.type,
                'user_id':blog.user_id.id,
                'user_name':blog.user_id.name,
                'header':blog.user_id.img,
                'pub_date':blog.create_date,
                'content':emoji.emojize(blog.content),
                'img':[blog_img.img for blog_img in blog.blogImages_blog.all()],
                'iscollect':blog.collectBlog_blog.filter(user_id_id=user_id).exists(),
                'collectnum':blog.collectBlog_blog.all().count(),
                'islike':blog.goodFingerBlog_blog.filter(user_id_id=user_id).exists(),
                'likenum':blog.goodfingers,
                'commentnum':blog.first_blogComment_blog.filter(is_pub=True).count()+blog.second_blogComment_blog.filter(is_pub=True).count(),
                'votenum':blog.selectBlog_blog.all().count(),
                'votetitle':blog.vote_title,
                'isallvote':blog.selectBlog_blog.filter(user_id_id=user_id).exists(),
                'votedata':voteData,
                'ismine': True if blog.user_id.id == user_id else False,
                'bgcolor': blog.bgcolor,
                'facebook_link': blog.user_id.facebook_link if blog.user_id.facebook_link else None
            }
            group_list.append(data)
        return Response({'success':True,'data':group_list})


# 加载更多一级评论（包括二级）
class GetIndexGroupComment(APIView):

    def get(self,request):
        if request.user.is_authenticated:
            userId = BaseUser.objects.get(auth_user=request.user).id
        else:
            userId = None
        page = request.GET.get('page')
        limit = request.GET.get('limit')
        blog_id = request.GET.get('id')
        fbc_num = FirstBlogComment.objects.filter(blog_id_id=blog_id,is_pub=True).count()
        start = (int(page)-1)*int(limit)
        end = start + int(limit)
        fbc_set = FirstBlogComment.objects.filter(blog_id_id=blog_id,is_pub=True).order_by('-create_date')[start:end]
        comment_list = list()
        if fbc_set:
            for fbc in fbc_set:
                sbc_set = fbc.firstBlogComment.filter(is_pub=True).order_by('-create_date')[0:2]
                if sbc_set:
                    sbc_list = list()
                    for sbc in sbc_set:
                        sbc_dict = {
                            'id':sbc.id,
                            'userId':sbc.user_id.id,
                            'header':sbc.user_id.img,
                            'username':sbc.user_id.name,
                            'content':emoji.emojize(sbc.content),
                            'pub_date': sbc.create_date,
                            'reply_id':sbc.reply_id.id,
                            'reply_name':sbc.reply_id.name,
                            'ismine': True if sbc.user_id.id == userId else False
                        }
                        sbc_list.append(sbc_dict)
                    sbc = {
                        'num':fbc.firstBlogComment.filter(is_pub=True).count(),
                        'sbc_list':sbc_list
                    }
                    fbc_dict = {
                        'id':fbc.id,
                        'userId':fbc.user_id.id,
                        'header':fbc.user_id.img,
                        'username':fbc.user_id.name,
                        'content':emoji.emojize(fbc.content),
                        'pub_date':fbc.create_date,
                        'sbc':sbc,
                        'sbc_num': fbc.firstBlogComment.filter(is_pub=True).count(),
                        'ismine':True if fbc.user_id.id == userId else False,
                    }
                else:
                    fbc_dict = {
                        'id': fbc.id,
                        'userId': fbc.user_id.id,
                        'header': fbc.user_id.img,
                        'username': fbc.user_id.name,
                        'content': emoji.emojize(fbc.content),
                        'pub_date': fbc.create_date,
                        'sbc': None,
                        'ismine': True if fbc.user_id.id == userId else False,
                        'sbc_num':0
                    }
                comment_list.append(fbc_dict)
            return Response({'success':True,'fbc_num':fbc_num,'data':comment_list})
        else:
            return Response({'success':False,'msg':'暂无数据'})


# 加载更多二级评论
class GetMoreSBC(APIView):

    def get(self,request):
        if request.user.is_authenticated:
            userId = BaseUser.objects.get(auth_user=request.user).id
        else:
            userId = None
        page = request.GET.get('page')
        limit = request.GET.get('limit')
        fbc_id = request.GET.get('id')
        offset = request.GET.get('offset')
        fbc = FirstBlogComment.objects.get(id=fbc_id)
        start = (int(page)-1)*int(limit)+int(offset)
        end = start + int(limit)
        sbc_set = fbc.firstBlogComment.filter(is_pub=True).order_by('-create_date')[start:end]
        if sbc_set:

            sbc_list = list()
            sbc_num = fbc.firstBlogComment.filter(is_pub=True).count()
            for sbc in sbc_set:
                sbc_dict = {
                    'id': sbc.id,
                    'userId': sbc.user_id.id,
                    'header': sbc.user_id.img,
                    'username': sbc.user_id.name,
                    'content': emoji.emojize(sbc.content),
                    'pub_date': sbc.create_date,
                    'reply_id': sbc.reply_id.id,
                    'reply_name': sbc.reply_id.name,
                    'ismine': True if sbc.user_id.id == userId else False
                }
                sbc_list.append(sbc_dict)
            return Response({'success':True,'sbc_num':sbc_num,'data':sbc_list})
        else:
            return Response({'success':False,'msg':'无更多数据'})


# 删除一级 二级评论
class DeleteComment(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        type = request.POST.get('type')
        id = request.POST.get('id')
        baseuser = BaseUser.objects.get(auth_user=request.user)
        if type == '1':
            # 一级评论
            if not FirstBlogComment.objects.filter(id=id, user_id=baseuser, is_pub=True).exists():
                return Response({'success': False, 'err': "留言不存在"})
            firstcomment = FirstBlogComment.objects.get(id=id, user_id=baseuser, is_pub=True)
            try:
                SecondBlogComment.objects.filter(first_comment=firstcomment, is_pub=True).update(is_pub=False)
                firstcomment.is_pub = False
                firstcomment.save()
                return Response({'success': True,'msg':'成功删除'})
            except Exception as e:
                return Response({'success': False, 'msg': 'err'})
        else:
            if not SecondBlogComment.objects.filter(id=id, user_id=baseuser, is_pub=True).exists():
                return Response({'success': False, 'msg': "留言不存在"})
            secondcomment = SecondBlogComment.objects.get(id=id, user_id=baseuser, is_pub=True)
            try:
                secondcomment.is_pub = False
                secondcomment.save()
                return Response({'success': True,'msg':'成功删除'})
            except Exception as e:
                return Response({'success': False, 'msg': 'err'})

# 消息提醒
class RemindView(APIView):

    def get(self,request):
        if request.user.is_authenticated:
            userId = BaseUser.objects.get(auth_user=request.user).id
        else:
            userId = None
        if Remind.objects.filter(author_id=userId,isread=False).exists():
            return Response({'msg':True})
        else:
            return Response({'msg':False})

class UpdateRemindState(APIView):

    def get(self,request):
        if request.user.is_authenticated:
            userId = BaseUser.objects.get(auth_user=request.user).id
        else:
            userId = None
        Remind.objects.filter(author_id=userId,isread=False).update(isread=True)
        return Response({'success':True})
