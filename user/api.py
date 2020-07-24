import emoji
from django.db.models import Q
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from group.models import *
from group.api import Mypage, UnsafeSessionAuthentication


# user 获取个人动态数据
class GetMyGroup(APIView):


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
        blog_list = Blogs.objects.filter(user_id_id=user_id,is_pub=True, state=0).order_by('-create_date')[start:end]
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
                            'num': fbc.firstBlogComment.filter(is_pub=True).count(),
                            'sbc_list': second_comment
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
                        'num':vote.num,
                        'id':vote.id
                    }
                    voteData.append(vote_dict)

            data = {
                'id': blog.id,
                'type': blog.type,
                'userId':blog.user_id.id,
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
                'commentData':commentData,
                'votenum':blog.selectBlog_blog.all().count(),
                'votetitle':blog.vote_title,
                'isallvote':blog.selectBlog_blog.filter(user_id_id=user_id).exists(),
                'votedata':voteData,
                'ismine': True if blog.user_id.id == user_id else False,
                'fbc_num': blog.first_blogComment_blog.filter(is_pub=True).count(),
                'bgcolor': blog.bgcolor
            }
            group_list.append(data)
        return Response({'success':True,'data':group_list})


# user 获取个人收藏数据
class GetMyCollect(APIView):

    def get(self,request):
        page = request.GET.get('page', 1)
        limit = request.GET.get('limite', 10)
        start = (int(page) - 1) * int(limit)
        end = start + int(limit)
        user = BaseUser.objects.get(auth_user=request.user)
        my_collect_set = CollectBlogs.objects.filter(user_id_id=user.id,blog_id__is_pub=True,blog_id__state=0).order_by('-create_date')[start:end]
        if my_collect_set:
            collect_list = list()
            for collect in my_collect_set:
                blog = collect.blog_id
                voteData = list()
                vote_list = blog.blogChoice_blog.all()
                first_comment = list()
                fbc_list = blog.first_blogComment_blog.filter(is_pub=True).order_by('-create_date')[0:5]
                if fbc_list:
                    for fbc in fbc_list:
                        second_comment = list()
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
                                    'ismine': True if sbc.user_id.id == user.id else False
                                }
                                second_comment.append(sbc_dict)
                        fbc_dict = {
                            'id': fbc.id,
                            'userId': fbc.user_id.id,
                            'header': fbc.user_id.img,
                            'username': fbc.user_id.name,
                            'content': emoji.emojize(fbc.content),
                            'pub_date': fbc.create_date,
                            'secondComment': second_comment,
                            'ismine': True if fbc.user_id.id == user.id else False,
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
                            'isVote': vote.selectBlog_answer.filter(user_id_id=user.id).exists(),
                            'num': vote.num,
                            'id': vote.id
                        }
                        voteData.append(vote_dict)

                data = {
                    'id': blog.id,
                    'type': blog.type,
                    'userId': blog.user_id.id,
                    'user_name': blog.user_id.name,
                    'header': blog.user_id.img,
                    'pub_date': blog.create_date,
                    'content': emoji.emojize(blog.content),
                    'img': [blog_img.img for blog_img in blog.blogImages_blog.all()],
                    'iscollect': blog.collectBlog_blog.filter(user_id_id=user.id).exists(),
                    'collectnum': blog.collectBlog_blog.all().count(),
                    'islike': blog.goodFingerBlog_blog.filter(user_id_id=user.id).exists(),
                    'likenum': blog.goodfingers,
                    'commentnum': blog.first_blogComment_blog.filter(is_pub=True).count() + blog.second_blogComment_blog.filter(is_pub=True).count(),
                    'commentData': commentData,
                    'votenum': blog.selectBlog_blog.all().count(),
                    'votetitle': blog.vote_title,
                    'isallvote': blog.selectBlog_blog.filter(user_id_id=user.id).exists(),
                    'votedata': voteData,
                    'ismine': True if blog.user_id.id == user.id else False,
                    'fbc_num': blog.first_blogComment_blog.filter(is_pub=True).count(),
                    'bgcolor': blog.bgcolor
                }
                collect_list.append(data)
            return Response({'success': True, 'data': collect_list})
        else:
            return Response({'success':False,'msg':'暂无更多数据'})

# user 获取个人黑名单数据
class GetBlackList(APIView):

    def get(self,request):
        user = BaseUser.objects.get(auth_user=request.user)
        my_blacks_set = Blacks.objects.filter(user_id_id=user.id)
        blacks_list = list()
        for black in my_blacks_set:
            blacks_dict = {
                'userId':black.black_id.id,
                "black_img":black.black_id.img,
                "black_name":black.black_id.name,
                "black_slogan":black.black_id.slogan,
                "gender":black.black_id.gender
            }
            blacks_list.append(blacks_dict)
        return Response({"success":True,"data":blacks_list})

# 获取用户个人动态数据
class GetUserGroup(APIView):


    def get(self,request,pk):
        if request.user.is_authenticated:
            baseuser = BaseUser.objects.get(auth_user=request.user)  # 已登录的用户
            user_id = baseuser.id
        else:
            user_id = None
        page = request.GET.get('page', 1)
        limit = request.GET.get('limite', 10)
        start = (int(page) - 1) * int(limit)
        end = start + int(limit)
        blog_list = Blogs.objects.filter(user_id_id=pk,is_pub=True, state=0).order_by('-create_date')[start:end]
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
                            'num': fbc.firstBlogComment.filter(is_pub=True).count(),
                            'sbc_list': second_comment
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
                        'num':vote.num,
                        'id':vote.id
                    }
                    voteData.append(vote_dict)

            data = {
                'id': blog.id,
                'type': blog.type,
                'userId':blog.user_id.id,
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
                'commentData':commentData,
                'votenum':blog.selectBlog_blog.all().count(),
                'votetitle':blog.vote_title,
                'isallvote':blog.selectBlog_blog.filter(user_id_id=user_id).exists(),
                'votedata':voteData,
                'ismine': True if blog.user_id.id == user_id else False,
                'fbc_num': blog.first_blogComment_blog.filter(is_pub=True).count(),
                'bgcolor': blog.bgcolor
            }
            group_list.append(data)
        return Response({'success':True,'data':group_list})

# user个人中心 我发出的评论
class GetMyCommentList(APIView):

    def get(self,request):
        page = request.GET.get('page',1)
        limit = request.GET.get('limit',10)
        fbc_num = request.GET.get('fbc',0)
        sbc_num = request.GET.get('sbc',0)
        fbc_start = (int(page) - 1) * int(limit)+int(fbc_num)
        fbc_end = fbc_start + int(limit)
        sbc_start = (int(page) - 1) * int(limit)+int(sbc_num)
        sbc_end = sbc_start + int(limit)
        user = BaseUser.objects.get(auth_user=request.user)
        my_blogs = Blogs.objects.filter(is_pub=True,user_id=user)
        fbc_list = list(FirstBlogComment.objects.filter(Q(user_id_id=user.id,is_pub=True)|Q(blog_id__in=my_blogs,is_pub=True)).
                        order_by('-create_date')[fbc_start:fbc_end])    # 我发出的一级评论 或 我收到的一级评论
        sbc_list = list(SecondBlogComment.objects.filter(Q(user_id_id=user.id,is_pub=True)|Q(reply_id_id=user.id,is_pub=True)).
                        order_by('-create_date')[sbc_start:sbc_end])    # 我发出的二级评论 或 我收到的二级评论
        comment_list = fbc_list+sbc_list
        if comment_list:

            comment_list.sort(key=lambda x: x.create_date,reverse=True)
            comment_list = comment_list[:10]
            data = list()
            for comment in comment_list:
                print(type(comment))
                if isinstance(comment,FirstBlogComment):
                    print('1级评论')
                    comment_dict = {
                        'id':comment.id,
                        'userId':comment.user_id_id,
                        'type':1,
                        'comment_user_name': comment.user_id.name,
                        'comment_user_img': comment.user_id.img,
                        'ismine':True if comment.user_id==user else False,
                        'comment_content':emoji.emojize(comment.content),
                        'pub_date':comment.create_date,
                        'blog_user_name':comment.blog_id.user_id.name,
                        'blog_user_img': comment.blog_id.user_id.img,
                        'blog_content':emoji.emojize(comment.blog_id.content),
                    }
                else:
                    print('2级评论')
                    comment_dict = {
                        'id': comment.id,
                        'userId':comment.user_id_id,
                        'type':2,
                        'comment_user_name': comment.user_id.name,
                        'comment_user_img': comment.user_id.img,
                        'ismine': True if comment.user_id == user else False,
                        'comment_content': emoji.emojize(comment.content),
                        'pub_date': comment.create_date,
                        'replyUserId': comment.reply_id_id,
                        'reply_user_name': comment.reply_id.name,
                        'blog_userId': comment.blog_id.user_id.id,
                        'blog_user_name':comment.blog_id.user_id.name,
                        'blog_user_img': comment.blog_id.user_id.img,
                        'blog_content':emoji.emojize(comment.blog_id.content),
                    }
                data.append(comment_dict)
            print(data)
            return Response({'success':True,'data':data})
        else:
            return Response({'success':False,'msg':'暂无数据'})

# 添加黑名单
class AddBlackList(APIView):

    def get(self,request):

        if request.user.is_authenticated:
            black_id = request.GET.get('id')
            user = BaseUser.objects.get(auth_user=request.user)
            Blacks.objects.create(user_id=user,black_id_id=black_id)
            return Response({'success':True,'msg':'已拉黑'})
        else:
            return Response({'success':False,'msg':'未登录'})

# 修改个人信息
class ModifyPersonalInformation(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)
    def post(self,request):

        user = BaseUser.objects.get(auth_user=request.user)
        name = request.POST.get('name',None)
        gender = request.POST.get('gender',1)
        birthday = request.POST.get('birthday',None)
        phone = request.POST.get('phone',None)
        facebook = request.POST.get('facebook',None)
        slogan = request.POST.get('slogan',None)
        try:
            user.name = name
            user.gender = int(gender)
            user.birthday = birthday
            user.phone = phone
            user.facebook = facebook
            user.slogan = slogan
            user.save()
        except:
            return Response({'success':False,'msg':'修改失败'})
        return Response({'success':True,'msg':'修改成功'})

# 解除黑名单
class RemoveBlackList(APIView):

    def get(self,request):
        userId = request.GET.get('id',None)
        try:
            Blacks.objects.get(black_id_id=userId).delete()
        except:
            return Response({'success':False,'msg':'操作失败'})
        return Response({'success':True,'msg':'操作成功'})

class ThirdLogin(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, format=None):

        return render(request,'test.html')
