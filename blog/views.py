from django.shortcuts import render
from rest_framework.views import APIView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from ad.models import OfficalAdverts
from blog.models import Offical
from user.models import BaseUser


class BlogView(APIView):

    def get(self,request):

        # 判断用户是否登录
        if request.user.is_authenticated:
            user_id = BaseUser.objects.get(auth_user=request.user).id
        else:
            user_id = None
        blog_set = Offical.objects.filter(is_pub=True,state=0).order_by('-pub_date')
        page_num = request.GET.get('page')
        paginator = Paginator(blog_set, 3)
        try:
            page = paginator.page(page_num)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)
        blogs = page
        blog_list = list()
        for blog in blogs:
            blog_img = blog.officalAndimage_offical.all()
            image = list()
            if blog_img:
                for img in blog_img:
                    image.append(img.img)
            if blog.type:
                type_dict = {
                    'name': blog.type.name,
                    'color': blog.type.color,
                }
            else:
                type_dict = {
                    'name': None,
                    'color': None,
                }

            ad_set = OfficalAdverts.objects.filter(offical_id_id=blog.id)
            if ad_set:
                ad_list = list()
                for ad in ad_set:
                    ad_dict = {
                        'url':ad.url,
                        'img':ad.img,
                        'sort':ad.sort
                    }
                    ad_list.append(ad_dict)
            else:
                ad_list = None

            blog_dict = {
                'id': blog.id,  # blog ID
                'title': blog.title,  # blog 标题
                'type': type_dict,
                'content': blog.content,  # blog 内容
                'pub_date': blog.pub_date,  # blog 发布日期
                'likenum': blog.goodfingers,  # 点赞数
                'islike': blog.goodFingerOffical_offical.filter(user_id_id=user_id).exists(),  # 当前用户是否点赞
                'image': image,  # blog 图片
                'ads':ad_list
            }
            blog_list.append(blog_dict)


        return render(request,'blog.html',{'data':blog_list,'page':page})