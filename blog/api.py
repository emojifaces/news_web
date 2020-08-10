from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ad.models import OfficalAdverts
from blog.models import *



class UnsafeSessionAuthentication(SessionAuthentication):
    def authenticate(self, request):
        http_request = request._request
        user = getattr(http_request, 'user', None)
        if not user or not user.is_active:
            return None
        return (user, None)

class Mypage(PageNumberPagination):
    page_size = 3
    page_query_param = 'page'
    # 定制传参
    page_size_query_param = 'limit'
    # 最大一页的数据
    max_page_size = 3

# blog 列表API
class BlogList(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self,request):

        # 判断用户是否登录
        if request.user.is_authenticated:
            user_id = BaseUser.objects.get(auth_user=request.user).id
        else:
            user_id = None
        blog_set = Offical.objects.filter(is_pub=True).order_by('-pub_date')
        page = request.GET.get('page',1)
        limit = request.GET.get('limit',30)
        start = (int(page)-1)* int(limit)
        end = start+int(limit)
        blogs = blog_set[start:end]
        blog_list = list()
        if blogs:
            for blog in blogs:
                blog_img = blog.officalAndimage_offical.all()
                image = list()
                ad_list = list()
                ad_set = OfficalAdverts.objects.filter(offical_id_id=blog.id)
                if ad_set:
                    for ad in ad_set:
                        ad_dict = {
                            'url':ad.url,
                            'img':ad.img,
                            'sort':ad.sort
                        }
                        ad_list.append(ad_dict)


                if blog_img:
                    for img in blog_img:
                        image.append(img.img)
                blog_dict = {
                    'id': blog.id,      # blog ID
                    'title': blog.title,     # blog 标题
                    'type': {                       # blog 类型
                        'name': blog.type.name if blog.type else None,
                        'color': blog.type.color if blog.type else None,
                    },
                    'content': blog.content,       # blog 内容
                    'pub_date': blog.pub_date,      # blog 发布日期
                    'likenum': blog.goodfingers,        # 点赞数
                    'islike': blog.goodFingerOffical_offical.filter(user_id_id=user_id).exists(),   # 当前用户是否点赞
                    'image': image,      # blog 图片
                    'ads': ad_list if ad_list else None
                }
                blog_list.append(blog_dict)

            return Response({'success':True,'data':blog_list})
        else:
            return Response({'success':False,'msg':'无更多数据'})
class LikeBlogView(APIView):

    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def post(self,request):

        # 只有登录的用户才能点赞官博
        if not request.user.is_authenticated:
            return Response({'success':False,"msg":"请登录"})
        else:
            blog_id = request.POST.get('blog_id')
            islike = request.POST.get('islike')
            user_id = BaseUser.objects.get(auth_user=request.user).id
            blog = Offical.objects.get(id=blog_id)
            # 查询用户是否已点赞
            if GoodFingerOfficals.objects.filter(offical_id_id=blog_id,user_id_id=user_id).exists() and islike == 'True':
                GoodFingerOfficals.objects.filter(offical_id_id=blog_id, user_id_id=user_id).delete()
                blog.goodfingers -= 1
                blog.save()
                return Response({'success':True})
            elif not GoodFingerOfficals.objects.filter(offical_id_id=blog_id,user_id_id=user_id).exists() and islike == 'False':
                GoodFingerOfficals.objects.create(offical_id_id=blog_id,user_id_id=user_id)
                blog.goodfingers += 1
                blog.save()
                return Response({"success":True})
            else:
                return Response({'success':False,"msg":"出错了"})