import emoji
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from group.models import *
from group.api import Mypage


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
                'commentData':commentData,
                'votenum':blog.selectBlog_blog.all().count(),
                'votetitle':blog.vote_title,
                'isallvote':blog.selectBlog_blog.filter(user_id_id=user_id).exists(),
                'votedata':voteData,
                'ismine': True if blog.user_id.id == user_id else False,
                'fbc_num': blog.first_blogComment_blog.filter(is_pub=True).count()
            }
            group_list.append(data)
        return Response({'success':True,'data':group_list})

class GetMyComment(APIView):

    def get(self,request):
        page = request.GET.get('page',1)
        limit = request.GET.get('limit',10)
        start = (int(page) - 1) * int(limit)
        end = start + int(limit)
        user = BaseUser.objects.get(auth_user=request.user)
        my_fbc_set = FirstBlogComment.objects.filter(user_id_id=user.id,is_pub=True)
        my_sbc_set = SecondBlogComment.objects.filter(user_id_id=user.id,is_pub=True)
        my_fbc_list = [fbc.blog_id.id for fbc in my_fbc_set]
        my_sbc_list = [sbc.blog_id.id for sbc in my_sbc_set]
        blog_id_list = list(set(my_fbc_list).union(set(my_sbc_list)))[start:end]
        my_comment_list = list()
        for blog_id in blog_id_list:
            try:
                blog = Blogs.objects.get(id=blog_id,is_pub=True,state=0)
            except:
                continue
            voteData = list()
            vote_list = blog.blogChoice_blog.all()
            first_comment = list()
            fbc_list = blog.first_blogComment_blog.filter(user_id_id=user.id,is_pub=True).order_by('-create_date')
            sbc_comment = list()
            if fbc_list:
                for fbc in fbc_list:
                    second_comment = list()
                    sbc_data = dict()
                    sbc_list = fbc.firstBlogComment.filter(Q(user_id_id=user.id,is_pub=True)|Q(reply_id_id=user.id,is_pub=True)).order_by('-create_date')
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
                        sbc_data = {
                            'num':fbc.firstBlogComment.filter(is_pub=True).count(),
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
                        'ismine': True if fbc.user_id.id == user.id else False,
                        'sbc_num': fbc.firstBlogComment.filter(is_pub=True).count(),
                    }
                    first_comment.append(fbc_dict)

            else:
                sbc_set = blog.second_blogComment_blog.filter(Q(user_id_id=user.id,is_pub=True)|Q(reply_id_id=user.id,is_pub=True)).order_by('-create_date')
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
                        'ismine': True if sbc.user_id.id == user.id else False
                    }
                    sbc_comment.append(sbc_dict)
            commentData = {
                'first_comment': first_comment,
                'sbc_comment':sbc_comment
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
                'user_id': blog.user_id.id,
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
                'ismine': True if blog.user_id.id == user.id else False
            }
            my_comment_list.append(data)
        return Response({'success':True,'data':my_comment_list})


class GetMyCollect(APIView):

    def get(self,request):
        user = BaseUser.objects.get(auth_user=request.user)
        my_collect_set = CollectBlogs.objects.filter(user_id_id=user.id).order_by('-create_date')
        page_obj = Mypage()
        collects = page_obj.paginate_queryset(my_collect_set,request,self)
        collect_list = list()
        for collect in collects:
            blog = collect.blog_id
            voteData = list()
            vote_list = blog.blogChoice_blog.all()
            first_comment = list()
            fbc_list = blog.first_blogComment_blog.all().order_by('-create_date')
            if fbc_list:
                for fbc in fbc_list:
                    second_comment = list()
                    sbc_list = fbc.firstBlogComment.all().order_by('-create_date')
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
                                'ismine': True if  sbc.user_id.id == user.id else False
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
                        'ismine': True if fbc.user_id.id == user.id else False
                    }
                    first_comment.append(fbc_dict)

            commentData = {
                'count': blog.first_blogComment_blog.all().count(),
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
                'user_id': blog.user_id.id,
                'user_name': blog.user_id.name,
                'header': blog.user_id.img,
                'pub_date': blog.create_date,
                'content': emoji.emojize(blog.content),
                'img': [blog_img.img for blog_img in blog.blogImages_blog.all()],
                'iscollect': blog.collectBlog_blog.filter(user_id_id=user.id).exists(),
                'collectnum': blog.collectBlog_blog.all().count(),
                'islike': blog.goodFingerBlog_blog.filter(user_id_id=user.id).exists(),
                'likenum': blog.goodfingers,
                'commentnum': blog.first_blogComment_blog.all().count() + blog.second_blogComment_blog.all().count(),
                'commentData': commentData,
                'votenum': blog.selectBlog_blog.all().count(),
                'votetitle': blog.vote_title,
                'isallvote': blog.selectBlog_blog.filter(user_id_id=user.id).exists(),
                'votedata': voteData,
                'ismine': True if blog.user_id.id == user.id else False
            }
            collect_list.append(data)
        return Response({'success': True, 'data': collect_list})


class GetBlackList(APIView):

    def get(self,request):
        user = BaseUser.objects.get(auth_user=request.user)
        my_blacks_set = Blacks.objects.filter(user_id_id=user.id)
        blacks_list = list()
        for black in my_blacks_set:
            blacks_dict = {
                "black_img":black.black_id.img,
                "black_name":black.black_id.name,
                "black_slogan":black.black_id.slogan,
                "gender":black.black_id.gender
            }
            blacks_list.append(blacks_dict)
        return Response({"success":True,"data":blacks_list})
