from django.shortcuts import render
from django.views.generic import View
from group.models import *
from datetime import datetime


class GroupView(View):

    def get(self, request):

        return render(request, 'group.html')


