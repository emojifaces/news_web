from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from ad.models import OfficalAdverts
from blog.models import Offical
from user.models import BaseUser


class BlogView(APIView):

    def get(self,request):

        return render(request,'blog.html')

class BlogDetail(APIView):

    def get(self,request,pk):

        if request.user.is_authenticated:
            user_id = BaseUser.objects.get(auth_user=request.user).id
        else:
            user_id = None
        try:
            blog = Offical.objects.get(id=pk,is_pub=True)
        except:
            return Response({'success':False,'msg':'请求错误'})
        blog_img = blog.officalAndimage_offical.all()
        image = list()
        if blog_img:
            for img in blog_img:
                image.append(img.img)

        data = {
            'id': blog.id,  # blog ID
            'title': blog.title,  # blog 标题
            'type': {  # blog 类型
                'name': blog.type.name if blog.type else None,
                'color': blog.type.color if blog.type else None,
            },
            'content': blog.content,  # blog 内容
            'pub_date': blog.pub_date,  # blog 发布日期
            'likenum': blog.goodfingers,  # 点赞数
            'islike': blog.goodFingerOffical_offical.filter(user_id_id=user_id).exists(),  # 当前用户是否点赞
            'image': image,  # blog 图片
        }
        return render(request,'blog-detail.html',{'data':data})