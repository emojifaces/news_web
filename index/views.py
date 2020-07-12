from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView


class IndexView(APIView):

    def get(self,request):

        return render(request,'index.html')

class SummaryView(APIView):

    def get(self,request):

        return render(request,'index-summary.html')