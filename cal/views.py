from django.shortcuts import render
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from cal.models import *
from rest_framework.views import APIView

from group.api import UnsafeSessionAuthentication


class CalendarView(APIView):

    def get(self,request):



        return render(request,'calendar.html')


class CalendarInfoView(APIView):
    authentication_classes = (UnsafeSessionAuthentication, BasicAuthentication)
    permission_classes = (AllowAny,)

    def get(self, request):
        id = request.GET.get('id','')
        calendar = Calendar.objects.get(id=id)
        return render(request, 'calendarInfo.html',{'id':calendar.id,'jid':calendar.jId})