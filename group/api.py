import base64
import os
import random
import time

import emoji
from django.conf import settings
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import BasePermission, AllowAny, IsAuthenticated
from rest_framework.views import APIView
from user.models import *
from group.models import *


colors = ['#fcffac', '#d1f0b0', '#fdab75', '#fcc69b', '#ffabb6', '#81d4df']
def getstrlen(string):
    if string:
        length = len(string)
        utf8_length = len(string.encode('utf-8'))
        length = (utf8_length - length) / 2 + length
    else:
        length = 0
    return int(length)



class UnsafeSessionAuthentication(SessionAuthentication):
    def authenticate(self, request):
        http_request = request._request
        user = getattr(http_request, 'user', None)
        if not user or not user.is_active:
            return None
        return (user, None)

class UpdateLike(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        blog_id = request.POST.get('blog_id', None)
        islike = request.POST.get('islike')
        if request.user.is_authenticated:
            baseuser = BaseUser.objects.get(auth_user=request.user)
            blog = Blogs.objects.get(id=blog_id)
            if islike == '1':
                gfb = GoodFingerBlogs.objects.filter(blog_id_id=blog_id,user_id_id=baseuser.id)
                if not gfb:
                    GoodFingerBlogs.objects.create(blog_id_id=blog_id,user_id_id=baseuser.id)
                    blog.goodfingers += 1
                    blog.save()
                else:
                    return Response({'success':False,'err':'不能重复点赞'})
            elif islike == '0':
                gfb = GoodFingerBlogs.objects.filter(blog_id_id=blog_id,user_id_id=baseuser.id)
                if gfb:
                    blog.goodfingers -= 1
                    blog.save()
                    GoodFingerBlogs.objects.get(blog_id_id=blog_id,user_id_id=baseuser.id).delete()
                else:
                    return Response({'success':False,'err':'不能重复点赞'})
            return Response({'success':True})
        else:
            return Response({'success':False,'err':'未登录'})

class UpdateVote(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):

        votechoice_id = request.POST.get('votechoice_id')
        blog_id = request.POST.get('blog_id')
        if not request.user.is_authenticated:
            return Response({"success": False,"msg": "未登录"})
        else:
            baseuser = BaseUser.objects.get(auth_user=request.user)
            if SelectBlogs.objects.filter(blog_id_id=blog_id,answer_id_id=votechoice_id,user_id_id=baseuser.id).exists():
                return Response({'success':False,'msg':'不能重复投票'})
            else:
                SelectBlogs.objects.create(blog_id_id=blog_id, answer_id_id=votechoice_id, user_id_id=baseuser.id)
                v = BlogChoices.objects.get(id=votechoice_id)
                v.num += 1
                v.save()
                return Response({"success": True})


class UpdateCollect(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        blog_id = request.POST.get('blog_id')
        iscollect = request.POST.get('iscollect')
        if request.user.is_authenticated:
            baseuser = BaseUser.objects.get(auth_user=request.user)
            blog = Blogs.objects.get(id=blog_id)
            if iscollect == '1':
                collect_blog = CollectBlogs.objects.filter(blog_id_id=blog_id, user_id_id=baseuser.id)
                if not collect_blog:
                    CollectBlogs.objects.create(blog_id_id=blog_id, user_id_id=baseuser.id)
                else:
                    return Response({'success': False, 'err': '之前收藏过'})
            elif iscollect == '0':
                collect_blog = CollectBlogs.objects.filter(blog_id_id=blog_id, user_id_id=baseuser.id)
                if collect_blog:
                    CollectBlogs.objects.get(blog_id_id=blog_id, user_id_id=baseuser.id).delete()
                else:
                    return Response({'success': False, 'err': '之前没收藏过 不能取消'})
            return Response({'success': True})
        else:
            return Response({'success': False, 'err': '未登录'})

class AddFirstComment(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        content = request.POST.get('content')
        blog_id = request.POST.get('blog_id')
        content = emoji.demojize(content)
        if not request.user.is_authenticated:
            return Response({"success":False,'err':"未登录"})
        else:
            try:
                blog = Blogs.objects.get(id=blog_id)
            except:
                return Response({'success':False,'err':'该blog不存在'})
            baseuser = BaseUser.objects.get(auth_user=request.user)
            fbc = FirstBlogComment.objects.create(blog_id_id=blog_id,user_id_id=baseuser.id,content=emoji.demojize(content))

            Remind.objects.create(user_id=baseuser,blog_id_id=blog_id,content=emoji.demojize(content),author=blog.user_id,type=0,first_comment=fbc)

            data = {
                "success": True,
                'userId':baseuser.id,
                "commentId": fbc.id,
                "createDate": fbc.create_date,
                "userName": baseuser.name,
                "userImg": baseuser.img,
                "comment": emoji.emojize(content)
            }
            return Response(data)

class AddSecondComment(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        content = request.POST.get('content')
        content = emoji.demojize(content)
        blog_id = request.POST.get('blog_id')
        first_id = request.POST.get('first_id')
        if not request.user.is_authenticated:
            return Response({"success":False,"err":"未登录"})
        else:
            try:
                blog = Blogs.objects.get(id=blog_id)
            except:
                return Response({'success':False,'err':'该blog不存在'})
            baseuser = BaseUser.objects.get(auth_user=request.user)
            reply_id = FirstBlogComment.objects.get(id=first_id).user_id_id
            sbc = SecondBlogComment.objects.create(blog_id_id=blog_id, first_comment_id=first_id,user_id_id=baseuser.id,content=content,reply_id_id=reply_id)
            data = {
                'success':True,
                'userId': baseuser.id,
                'comment':emoji.emojize(content),
                'create_date':sbc.create_date,
                'id':sbc.id
            }
            Remind.objects.create(user_id=baseuser,blog_id=blog,author_id=reply_id,type=1,content=emoji.demojize(content),)
            return Response(data)

class Publish(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        content = request.POST.get('content', None)
        vote_title = request.POST.get('votetitle', None)
        vote_date = request.POST.getlist('votedata', None)
        files = request.FILES.getlist('img', None)
        # files = request.FILES.get('img', None)
        content = emoji.demojize(content)

        if not request.user.is_authenticated:
            return Response({"success":False,"msg":"未登录"})
        else:
            baseuser = BaseUser.objects.get(auth_user=request.user)

            if vote_title:
                blog = Blogs.objects.create(type=1,content=content,vote_title=vote_title,user_id_id=baseuser.id)
                blog_id = blog.id
                if vote_date:
                    for vote_option in vote_date:
                        BlogChoices.objects.create(blog_id_id=blog_id,content=vote_option)
                if files:
                    for img in files:
                        # path = os.path.join(settings.MEDIA_ROOT, f'{img.name}')
                        # destination = open(path, 'wb')
                        # for chunk in img.chunks():
                        #     destination.write(chunk)
                        # destination.close()
                        # BlogImages.objects.create(blog_id_id=blog_id, img=img)
                        img_suffix = img.name.split('.')[-1]
                        t = time.time()
                        path = str(int(round(t * 1000))) + str(blog_id) + 'group.'+img_suffix
                        destination = open(os.path.join(settings.MEDIA_ROOT, path), "wb")
                        for chunk in img.chunks():
                            destination.write(chunk)
                        destination.close()
                        BlogImages.objects.create(blog_id_id=blog_id, img=path)
                else:
                    return Response({"msg":'投票选项是必填项'})
            else:
                blog = Blogs.objects.create(type=0,content=content,user_id_id=baseuser.id)
                blog_id = blog.id
                if files:
                    for img in files:
                        # path = os.path.join(settings.MEDIA_ROOT, f'{img.name}')
                        # destination = open(path, 'wb')
                        # for chunk in img.chunks():
                        #     destination.write(chunk)
                        # destination.close()
                        # BlogImages.objects.create(blog_id_id=blog_id, img=img)
                        img_suffix = img.name.split('.')[-1]
                        t = time.time()
                        path = str(int(round(t * 1000))) + str(blog_id) + 'group.' + img_suffix
                        destination = open(os.path.join(settings.MEDIA_ROOT, path), "wb")
                        for chunk in img.chunks():
                            destination.write(chunk)
                        destination.close()
                        BlogImages.objects.create(blog_id_id=blog_id, img=path)
            if getstrlen(content) < 120:
                blog.bgcolor = random.choice(colors)
                blog.save()

            return Response({"success":True})


class Mypage(PageNumberPagination):
    page_size = 10
    page_query_param = 'page'
    # 定制传参
    page_size_query_param = 'limit'
    # 最大一页的数据
    max_page_size = 10

# group 初始化动态 加载更多动态
class GroupList(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self,request):

        if request.user.is_authenticated:
            baseuser = BaseUser.objects.get(auth_user=request.user)  # 已登录的用户
            user_id = baseuser.id
        else:
            user_id = None
        page = request.GET.get('page', 1)
        limit = request.GET.get('limite', 30)
        offset = request.GET.get('offset', 0)
        start = (int(page) - 1) * int(limit) + int(offset)
        end = start + int(limit)
        blog_list = Blogs.objects.filter(is_pub=True, state=0).order_by('-create_date')[start:end]
        if not blog_list:
            return Response({'success':False,'msg':'无数据'})

        group_list = list()
        for blog in blog_list:
            voteData = list()
            vote_list = blog.blogChoice_blog.all()
            first_comment = list()
            fbc_list = blog.first_blogComment_blog.filter(is_pub=True).order_by('-create_date')[0:5]
            if fbc_list:
                for fbc in fbc_list:
                    second_comment = list()
                    sbc_data = dict()
                    sbc_list = fbc.firstBlogComment.filter(is_pub=True).order_by('-create_date')[0:2]
                    if sbc_list:
                        for sbc in sbc_list:
                            sbc_dict = {
                                'id':sbc.id,
                                'userId':sbc.user_id.id,
                                'header':sbc.user_id.img,
                                'username':sbc.user_id.name,
                                'content':emoji.emojize(sbc.content),
                                'pub_date':sbc.create_date,
                                'reply_id':sbc.reply_id.id,
                                'reply_name':sbc.reply_id.name,
                                'ismine': True if sbc.user_id.id == user_id else False
                            }
                            second_comment.append(sbc_dict)
                        sbc_data = {
                            'num':fbc.firstBlogComment.filter(is_pub=True).count(),
                            'sbc_list':second_comment
                        }
                    fbc_dict = {
                        'id':fbc.id,
                        'userId':fbc.user_id.id,
                        'header':fbc.user_id.img,
                        'username':fbc.user_id.name,
                        'content':emoji.emojize(fbc.content),
                        'pub_date':fbc.create_date,
                        'secondComment':sbc_data,
                        'ismine': True if fbc.user_id.id == user_id else False,
                        'sbc_num': fbc.firstBlogComment.filter(is_pub=True).count(),
                    }
                    first_comment.append(fbc_dict)


            commentData = {
                'count': blog.first_blogComment_blog.filter(is_pub=True).count(),
                'first_comment': first_comment
            }

            if vote_list:
                for vote in vote_list:
                    vote_dict = {
                        'content':emoji.emojize(vote.content),
                        'isVote':vote.selectBlog_answer.filter(user_id_id=user_id).exists(),
                        # 'num':vote.num,
                        'num':vote.selectBlog_answer.all().count(),
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
                'content':emoji.emojize(blog.content) if blog.content else '',
                'img':[blog_img.img for blog_img in blog.blogImages_blog.all()],
                'iscollect':blog.collectBlog_blog.filter(user_id_id=user_id).exists(),
                'collectnum':blog.collectBlog_blog.filter(is_pub=True).count(),
                'islike':blog.goodFingerBlog_blog.filter(user_id_id=user_id).exists(),
                'likenum':blog.goodfingers,
                'commentnum':blog.first_blogComment_blog.filter(is_pub=True).count()+blog.second_blogComment_blog.filter(is_pub=True).count(),
                'commentData':commentData,
                'votenum':blog.selectBlog_blog.all().count(),
                'votetitle':blog.vote_title,
                'isallvote':blog.selectBlog_blog.filter(user_id_id=user_id).exists(),
                'votedata':voteData,
                'ismine': True if blog.user_id.id == user_id else False,
                'fbc_num': blog.first_blogComment_blog.filter(is_pub=True).count(),
                'bgcolor':blog.bgcolor,
                'facebook_link': blog.user_id.facebook_link if blog.user_id.facebook_link else None
            }
            group_list.append(data)
        return Response({'success':True,'data':group_list})


class CommentPage(PageNumberPagination):
    page_size = 5
    page_query_param = 'page'
    # 定制传参
    page_size_query_param = 'limit'
    # 最大一页的数据
    max_page_size = 5

# 加载更多评论
class MoreComment(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        if request.user.is_authenticated:
            userId = BaseUser.objects.get(auth_user=request.user).id
        else:
            userId = None
        blog_id = request.POST.get('blog_id')
        blog = Blogs.objects.get(id=blog_id)
        all_fbc = blog.first_blogComment_blog.all().order_by('-create_date')
        page_obj = CommentPage()
        fbc_set = page_obj.paginate_queryset(queryset=all_fbc, request=request, view=self)
        fbc_list = list()
        for fbc in fbc_set:
            sbc_set = fbc.firstBlogComment.all().order_by('-create_date')[0:2]
            sbc_list = list()
            if sbc_set:
                for sbc in sbc_set:
                    sbc_dict = {
                        'id':sbc.id,
                        'userId': sbc.user_id.id,
                        'header': sbc.user_id.img,
                        'username': sbc.user_id.name,
                        'content':emoji.emojize(sbc.content),
                        'pub_date':sbc.create_date,
                        'reply_id': sbc.reply_id.id,
                        'reply_name':sbc.reply_id.name,
                        'ismine': True if sbc.user_id.id == userId else False
                    }
                    sbc_list.append(sbc_dict)
            fbc_dict = {
                'id':fbc.id,
                'userId': fbc.user_id.id,
                'header': fbc.user_id.img,
                'username':fbc.user_id.name,
                'content':emoji.emojize(fbc.content),
                'pub_date':fbc.create_date,
                'secondComment':sbc_list,
                'ismine': True if fbc.user_id.id == userId else False,
                'sbc_num': fbc.firstBlogComment.all().count()
            }
            fbc_list.append(fbc_dict)

        return Response({'success':True,'data':fbc_list})

# 删除自己的动态
class DeleteGroup(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):
        blog_id = request.POST.get('blogId')
        blog = Blogs.objects.get(id=blog_id,state=0)
        blog.state = 1
        blog.save()
        return Response({'success':True,'msg':'删除成功'})

# 动态详情
class GroupDetail(APIView):

    def get(self,request,pk):
        if request.user.is_authenticated:
            baseuser = BaseUser.objects.get(auth_user=request.user)  # 已登录的用户
            user_id = baseuser.id
        else:
            user_id = None
        blog = Blogs.objects.get(id=pk)
        voteData = list()
        vote_list = blog.blogChoice_blog.all()
        first_comment = list()
        fbc_list = blog.first_blogComment_blog.filter(is_pub=True).order_by('-create_date')[0:5]
        if fbc_list:
            for fbc in fbc_list:
                second_comment = list()
                sbc_data = dict()
                sbc_list = fbc.firstBlogComment.filter(is_pub=True).order_by('-create_date')[0:2]
                if sbc_list:
                    for sbc in sbc_list:
                        sbc_dict = {
                            'id': sbc.id,
                            'userId': sbc.user_id.id,
                            'header': sbc.user_id.img,
                            'username': sbc.user_id.name,
                            'content': emoji.emojize(sbc.content),
                            'pub_date': sbc.create_date,
                            'reply_id': sbc.reply_id.id,
                            'reply_name': sbc.reply_id.name,
                            'ismine': True if sbc.user_id.id == user_id else False
                        }
                        second_comment.append(sbc_dict)
                    sbc_data = {
                        'num': fbc.firstBlogComment.filter(is_pub=True).count(),
                        'sbc_list': second_comment
                    }
                fbc_dict = {
                    'id': fbc.id,
                    'userId': fbc.user_id.id,
                    'header': fbc.user_id.img,
                    'username': fbc.user_id.name,
                    'content': emoji.emojize(fbc.content),
                    'pub_date': fbc.create_date,
                    'secondComment': sbc_data,
                    'ismine': True if fbc.user_id.id == user_id else False,
                    'sbc_num': fbc.firstBlogComment.filter(is_pub=True).count(),
                }
                first_comment.append(fbc_dict)

        commentData = {
            'count': blog.first_blogComment_blog.filter(is_pub=True).count(),
            'first_comment': first_comment
        }

        if vote_list:
            for vote in vote_list:
                vote_dict = {
                    'content': emoji.emojize(vote.content),
                    'isVote': vote.selectBlog_answer.filter(user_id_id=user_id).exists(),
                    'num': vote.num,
                    'id': vote.id
                }
                voteData.append(vote_dict)

        data = {
            'id': blog.id,
            'userId': blog.user_id_id,
            'type': blog.type,
            'user_id': blog.user_id.id,
            'user_name': blog.user_id.name,
            'header': blog.user_id.img,
            'pub_date': blog.create_date,
            'content': emoji.emojize(blog.content) if blog.content else '',
            'img': [blog_img.img for blog_img in blog.blogImages_blog.all()],
            'iscollect': blog.collectBlog_blog.filter(user_id_id=user_id).exists(),
            'collectnum': blog.collectBlog_blog.filter(is_pub=True).count(),
            'islike': blog.goodFingerBlog_blog.filter(user_id_id=user_id).exists(),
            'likenum': blog.goodfingers,
            'commentnum': blog.first_blogComment_blog.filter(is_pub=True).count() + blog.second_blogComment_blog.filter(
                is_pub=True).count(),
            'commentData': commentData,
            'votenum': blog.selectBlog_blog.all().count(),
            'votetitle': blog.vote_title,
            'isallvote': blog.selectBlog_blog.filter(user_id_id=user_id).exists(),
            'votedata': voteData,
            'ismine': True if blog.user_id.id == user_id else False,
            'fbc_num': blog.first_blogComment_blog.filter(is_pub=True).count(),
            'bgcolor': blog.bgcolor,
            'facebook_link': blog.user_id.facebook_link if blog.user_id.facebook_link else None
        }
        return Response({'success':True,'data':data})