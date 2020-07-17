from django.shortcuts import render
from django.views.generic import View
from group.models import *
from datetime import datetime


class GroupView(View):

    def get(self, request):
        blogs = Blogs.objects.all().order_by('-create_date')[0:9]
        data = list()

        for blog in blogs:
            base_user = blog.user_id     # 发布博客的用户
            name = base_user.name
            img = base_user.img
            blog_imgs = [blog_img.img for blog_img in blog.blogImages_blog.all()]
            fbc_num = blog.first_blogComment_blog.all().count()
            sbc_num = blog.second_blogComment_blog.all().count()
            comment_num = fbc_num+sbc_num   # 评论总数
            fbc_list = blog.first_blogComment_blog.all().order_by('-create_date')[0:3]
            comment_list = list()
            if fbc_list:
                for fbc in fbc_list:
                    sbc_list = fbc.firstBlogComment.all().order_by('-create_date')
                    comment = {
                        "fbc": fbc,
                        "sbc_list": sbc_list
                    }
                    comment_list.append(comment)

            block = {
                'name': name,
                'img': img,
                'blog': blog,
                'blog_imgs': blog_imgs,
                'comment_num': comment_num,
                'fbc_list': fbc_list,
                'comment_list': comment_list,
                'fbc_num': fbc_num,
                'bgcolor': blog.bgcolor
            }
            if request.user.is_authenticated:
                baseuser = BaseUser.objects.get(auth_user=request.user)     # 已登录的用户
                # 登录用户是否点赞
                islike = blog.goodFingerBlog_blog.filter(user_id_id=baseuser.id).exists()
                # 登录用户是否收藏
                iscollect = blog.collectBlog_blog.filter(user_id_id=baseuser.id).exists()
                block.setdefault('islike', islike)
                block.setdefault('iscollect', iscollect)
                if baseuser.id == base_user.id:
                    block.setdefault('ismine',True)
                else:
                    block.setdefault('ismine',False)
                if blog.type == 1:
                    isvoteblog = blog.selectBlog_blog.filter(user_id_id=baseuser.id).exists()
                    block.setdefault('isvoteblog',isvoteblog)
                    vote_option_set = blog.blogChoice_blog.all()
                    vote_option_list = list()
                    for vote_option in vote_option_set:
                        vote_option_dict = {
                            'isvote':blog.selectBlog_blog.filter(answer_id_id=vote_option.id,user_id_id=baseuser.id).exists(),
                            'vote_option':vote_option
                        }
                        vote_option_list.append(vote_option_dict)
                    block.setdefault('vote_option', vote_option_list)
                    vote_num = blog.selectBlog_blog.all().count()
                    block.setdefault('vote_num',vote_num)
            else:
                block.setdefault('ismine', None)
                if blog.type == 1:
                    block.setdefault('isvoteblog', False)
                    vote_option_set = blog.blogChoice_blog.all()
                    vote_option_list = list()
                    for vote_option in vote_option_set:
                        vote_option_dict = {
                            'isvote': False,
                            'vote_option': vote_option
                        }
                        vote_option_list.append(vote_option_dict)
                    block.setdefault('vote_option', vote_option_list)
                    vote_num = blog.selectBlog_blog.all().count()
                    block.setdefault('vote_num', vote_num)

            data.append(block)
        return render(request, 'group.html', {'data':data})


