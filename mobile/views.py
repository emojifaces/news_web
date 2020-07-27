from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

from ad.models import OfficalAdverts, OfficalDetailAdverts
from blog.models import Offical
from user.models import BaseUser


class MobileIndex(APIView):
    def get(self,request):
        return render(request,'mobile-index.html')

class MobileBlog(APIView):
    def get(self, request):

        # 判断用户是否登录
        if request.user.is_authenticated:
            user_id = BaseUser.objects.get(auth_user=request.user).id
        else:
            user_id = None
        blog_set = Offical.objects.filter(is_pub=True, state=0).order_by('-pub_date')
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
                        'url': ad.url,
                        'img': ad.img,
                        'sort': ad.sort
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
                'ads': ad_list
            }
            blog_list.append(blog_dict)

        return render(request, 'mobile-blog.html', {'data': blog_list, 'page': page})

class MobileBlogDetail(APIView):

    def get(self,request,pk):
        if request.user.is_authenticated:
            user_id = BaseUser.objects.get(auth_user=request.user).id
        else:
            user_id = None
        blog = Offical.objects.get(id=pk)
        blog_img = blog.officalAndimage_offical.all()
        img = list()
        for image in blog_img:
            img.append(image.img)
        ads = OfficalDetailAdverts.objects.all()
        ad_list = list()
        for ad in ads:
            ad_dict = {
                'url':ad.url,
                'sort':ad.sort,
                'img':ad.img
            }
            ad_list.append(ad_dict)
        data = {
            'id':blog.id,
            'title':blog.title,
            'style':blog.style,
            'type':{
                'name':blog.type.name if blog.type else None,
                'color':blog.type.color if blog.type else None,
            },
            'content':blog.content,
            'pub_date':blog.pub_date,
            'like_num':blog.goodfingers,
            'img':img,
            'islike':blog.goodFingerOffical_offical.filter(user_id_id=user_id).exists(),
            'ads':ad_list
        }
        return render(request,'mobile-blog-detail.html',{'data':data})

class MobileUser(APIView):

    def get(self,request):

        if request.user.is_authenticated:
            user = BaseUser.objects.get(auth_user=request.user)
            data = {
                "name": user.name,
                "slogan": user.slogan,
                "gender": user.gender,
                "birthday": user.birthday,
                "phone": user.phone,
                "email": user.email,
                "img": user.img
            }
            return render(request, 'mobile-user.html', {'data': data})
        else:
            return Response('未登录，请登录')



