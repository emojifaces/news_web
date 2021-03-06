from django.db.models import Q
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from datetime import datetime
import random
from operator import itemgetter
from itertools import groupby


def key_sort_group(data,key):

    data.sort(key=itemgetter(key))
    result = dict()
    for key, items in groupby(data, key=itemgetter(key)):
        result[key] = list(items)
    return result


class GlobalAD(APIView):

    def get(self,reuqets):
        current_date = datetime.now()
        ads = HardAdverts.objects.filter(Q(start_date__lte=current_date)&Q(end_date__gte=current_date),is_pub=True,page=0)
        top = list()
        bottom = list()
        left = list()
        right = list()
        for ad in ads:
            ad_dict = {
                'sort':ad.sort,
                'img':ad.img,
                'url':ad.url
            }
            if ad.site == 0:
                top.append(ad_dict)
            elif ad.site == 1:
                right.append(ad_dict)
            elif ad.site == 2:
                bottom.append(ad_dict)
            elif ad.site == 3:
                left.append(ad_dict)
        data = {
            'top': top[0],
            'bottom':bottom,
            'left':left,
            'right':right
        }
        return Response({'success':True,'data':data})

class IndexAD(APIView):

    def get(self,request):
        current_date = datetime.now()
        ads = HardAdverts.objects.filter(Q(start_date__lte=current_date) & Q(end_date__gte=current_date), is_pub=True,
                                         page=1)
        top = list()
        right = list()

        for ad in ads:
            ad_dict = {
                'sort': ad.sort,
                'img': ad.img,
                'url': ad.url
            }
            if ad.site == 0:
                top.append(ad_dict)
            elif ad.site == 1:
                right.append(ad_dict)


        data = {
            'top':top,
            'right':right
        }
        return Response({'success':True,'data':data})

class CalendarAD(APIView):

    def get(self,request):
        current_date = datetime.now()
        ads = HardAdverts.objects.filter(Q(start_date__lte=current_date) & Q(end_date__gte=current_date), is_pub=True,
                                         page=2)
        top = list()
        right = list()

        for ad in ads:
            ad_dict = {
                'sort': ad.sort,
                'img': ad.img,
                'url': ad.url
            }
            if ad.site == 0:
                top.append(ad_dict)
            elif ad.site == 1:
                right.append(ad_dict)


        data = {
            'top': top[0],
            'right': right
        }
        return Response({'success': True, 'data': data})

class GroupAD(APIView):

    def get(self,request):
        current_date = datetime.now()
        ads = HardAdverts.objects.filter(Q(start_date__lte=current_date) & Q(end_date__gte=current_date), is_pub=True,
                                         page=4)
        top = list()
        right = list()

        for ad in ads:
            ad_dict = {
                'sort': ad.sort,
                'img': ad.img,
                'url': ad.url
            }
            if ad.site == 0:
                top.append(ad_dict)
            elif ad.site == 1:
                right.append(ad_dict)

        top = key_sort_group(top, 'sort')
        right = key_sort_group(right, 'sort')

        data = {
            'top': top,
            'right': right
        }
        return Response({'success': True, 'data': data})

class FastInfoAD(APIView):

    def get(self,request):
        current_date = datetime.now()
        ads = HardAdverts.objects.filter(Q(start_date__lte=current_date) & Q(end_date__gte=current_date), is_pub=True,
                                         page=3,site__in=(4, 5, 6,7))

        fast6 = list()
        fast11 = list()
        fast16 = list()
        fast21 = list()

        for ad in ads:
            ad_dict = {
                'sort': ad.sort,
                'img': ad.img,
                'url': ad.url
            }
            if ad.site == 4:
                fast11.append(ad_dict)
            elif ad.site == 5:
                fast16.append(ad_dict)
            elif ad.site == 6:
                fast21.append(ad_dict)
            elif ad.site == 7:
                fast6.append(ad_dict)

        data = {
            'fast6':fast6,
            'fast11':fast11[0],
            'fast16':fast16[0],
            'fast21':fast21[0],
        }

        return Response({'success': True, 'data': data})