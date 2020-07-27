from django.db.models import Q
from django.shortcuts import render
from .models import *
from blog.models import *

from rest_framework.response import Response
from rest_framework.views import APIView



class IndexView(APIView):

    def get(self,request):

        return render(request,'index.html')

class SummaryView(APIView):

    def get(self,request):

        return render(request,'index-summary.html')

class SearchView(APIView):

    def get(self,request):

        query = request.GET.get('q',None)
        page = request.GET.get('page', 1)
        limit = request.GET.get('limit', 20)
        start = (int(page) - 1) * int(limit)
        end = int(page) * int(limit)
        if not query:
            return Response({'success':False,'msg':'暂无结果'})
        else:
            fastinfo_result = FastInfo.objects.filter(type=0,is_pub=True,translate__icontains=query).order_by('-VN_pub_date')[start:end]
            return_list = list()
            for item in fastinfo_result:
                result_dict = {
                    'pub_date':item.VN_pub_date,
                    'content':item.translate,
                    'is_important':item.is_important
                }
                return_list.append(result_dict)
            return render(request,'search.html',{'success':True,'data':return_list,'num':len(fastinfo_result),'query':query})

class SearchOffical(APIView):

    def get(self,request):
        if request.user.is_authenticated:
            user_id = BaseUser.objects.get(auth_user=request.user).id
        else:
            user_id = None
        page = request.GET.get('page', 1)
        limit = request.GET.get('limit', 20)
        start = (int(page) - 1) * int(limit)
        end = int(page) * int(limit)
        query = request.GET.get('q', None)
        if not query:
            return Response({'success': False, 'msg': '暂无结果'})
        else:
            offical_result = Offical.objects.filter(Q(title__icontains=query)|Q(content__icontains=query),is_pub=True,state=0,style=0).order_by('-pub_date')[start:end]
            return_list = list()
            for item in offical_result:
                img = list()
                for image in item.officalAndimage_offical.all():
                    img.append(image.img)

                result_dict = {
                    'id':item.id,
                    'pub_date': item.pub_date,
                    'content': item.content,
                    'title': item.title,
                    'img': img,
                    'like_num':item.goodfingers,
                    'islike':item.goodFingerOffical_offical.filter(user_id_id=user_id).exists(),
                    'type': {
                        'name': item.type.name if item.type else None,
                        'color': item.type.color if item.type else None,
                    },
                }
                return_list.append(result_dict)
            return Response({'success':True,'data':return_list,'num':len(offical_result)})