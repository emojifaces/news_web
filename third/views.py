from django.http import HttpResponse
from django.shortcuts import render

from rest_framework.views import APIView


class Facebook(APIView):

    def get(self,request):

        data = request.GET
        print(data)
        print(dir(data))
        for i in dir(data):
            print(i)

        return HttpResponse(dir(data))
