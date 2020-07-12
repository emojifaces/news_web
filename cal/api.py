import requests
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from group.api import UnsafeSessionAuthentication
from datetime import datetime
from cal.models import *

class DataView(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self, request):

        date = request.GET.get('date',None)
        if not date:
            date = datetime.now()
        else:
            date = datetime.strptime(date,"%Y-%m-%d")
        data_set = Calendar.objects.filter(VN_pub_date__year=date.year,VN_pub_date__month=date.month,VN_pub_date__day=date.day).order_by("VN_pub_date")
        if not data_set:
            return Response({'success':False,"msg":"暂无数据"})
        else:
            data_list = list()
            for data in data_set:
                data_dict = {
                    "id":data.id,
                    "time": data.VN_pub_date.time(),
                    "area": data.tran_country,
                    "name": data.tran_title,
                    "star": data.star,
                    "pre": data.previous,
                    "exp": data.consensus,
                    "act": data.actual,
                    "tag": data.tag
                }
                data_list.append(data_dict)
            return Response(data_list)


class EventsView(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self, request):

        date = request.GET.get('date', None)

        if not date:
            date = datetime.now()
        else:
            date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
        event_set = Events.objects.filter(VN_pub_date__year=date.year, VN_pub_date__month=date.month,
                                           VN_pub_date__day=date.day).order_by("VN_pub_date")
        if not event_set:
            return Response({'success': False, "msg": "暂无数据"})
        else:
            event_list = list()
            for event in event_set:
                event_dict = {
                    "id": event.id,
                    "time": event.VN_pub_date.time(),
                    "area": event.tran_country,
                    "events": event. tran_event_content,
                    "star": event.star,
                    "city": event.region
                }
                event_list.append(event_dict)
            return Response(event_list)

class GetCalendarGraphData(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self, request):
        id = request.GET.get('id', '')
        url = "https://rili-open-api.jin10.com/getSiteChartByDateRange?dataId={0}".format(id)
        headers = {
            'x-app-id': "1coXNOi34tU5TDTl",
            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
            'origin': "https://www.jin10.com",
            'referer': "https://www.jin10.com/",
            'x-version': "1.0.0",
        }
        respone = requests.get(url, headers=headers)
        data = respone.json()
        return Response(data)
