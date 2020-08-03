import os
import string
import uuid
import random
import time
import emoji
import requests
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework.views import APIView

from group.api import UnsafeSessionAuthentication, BaseUser


def randomstr(num):
    salt = ''.join(random.sample(string.ascii_letters + string.digits, num))
    return salt


class Login(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        """
        :type  "google or facebook"
        :param request:
        :param format:
        :return:
        """
        openId = request.POST.get('openid', '').strip()
        name = request.POST.get('name', '').strip()
        img = request.POST.get('img', '')
        email = request.POST.get('email', '')
        loginType = request.POST.get('type', '')
        baseuser = None
        if not loginType:
            return Response({'success': False, 'err': u'Data Error'})
        if openId and name:
            if ((loginType.lower() == "facebook") and BaseUser.objects.filter(facebookopenid=openId).exists()) or (
                    (loginType.lower() == "google") and BaseUser.objects.filter(googleopenid=openId).exists()):
                if loginType.lower() == "facebook":
                    baseuser = BaseUser.objects.get(facebookopenid=openId)
                elif loginType.lower() == "google":
                    baseuser = BaseUser.objects.get(googleopenid=openId)
                if baseuser.status == 0:
                    user = baseuser.auth_user
                    if user is not None:
                        if user.is_active:
                            request.session['user_img'] = baseuser.img
                            request.session['user_name'] = baseuser.name
                            login(request, user)
                            return Response({'success': True, 'userimg': baseuser.img, 'userid': baseuser.id})
                        else:
                            data = {'success': False, 'err': u'User is cancel'}
                    else:
                        data = {'success': False, 'err': u'User is cancel'}
                else:
                    data = {'success': False, 'err': u'User is cancel'}
            else:
                # 不存在 创建用户
                if email:
                    if User.objects.filter(email=email).exists():
                        user = User.objects.get(email=email)
                        if BaseUser.objects.filter(auth_user=user).exists():
                            baseuser = BaseUser.objects.get(auth_user=user)
                        else:
                            if loginType.lower() == 'facebook':
                                baseuser = BaseUser.objects.create(facebookopenid=openId, name=name, facebook=name,
                                                                   auth_user=user, email=email)
                            elif loginType.lower() == "google":
                                baseuser = BaseUser.objects.create(googleopenid=openId, name=name, auth_user=user,
                                                                   email=email)
                    else:
                        try:
                            user = User.objects.create(username=emoji.demojize(name), password=randomstr(10),
                                                       is_active=True, email=email)
                        except Exception as e:
                            user = User.objects.create(username=emoji.demojize(name) + str(uuid.uuid1()),
                                                       password=randomstr(10), is_active=True, email=email)
                        if loginType.lower() == 'facebook':
                            baseuser = BaseUser.objects.create(facebookopenid=openId, name=name, facebook=name,
                                                               auth_user=user, email=email)
                        elif loginType.lower() == "google":
                            baseuser = BaseUser.objects.create(googleopenid=openId, name=name, auth_user=user,
                                                               email=email)
                else:
                    try:
                        user = User.objects.create(username=emoji.demojize(name), password=randomstr(10),
                                                   is_active=True)
                    except Exception as e:
                        user = User.objects.create(username=emoji.demojize(name) + str(uuid.uuid1()),
                                                   password=randomstr(10), is_active=True)
                    if loginType.lower() == 'facebook':
                        baseuser = BaseUser.objects.create(facebookopenid=openId, name=name, facebook=name,
                                                           auth_user=user)
                    elif loginType.lower() == "google":
                        baseuser = BaseUser.objects.create(googleopenid=openId, name=name, auth_user=user)

                if img and (baseuser.img is False):
                    r = requests.get(img)
                    t = time.time()
                    path = 'userhead' + str(int(round(t * 1000))) + str(baseuser.id) + '.jpg'
                    with open(os.path.join(settings.MEDIA_ROOT, path), 'wb') as f:
                        f.write(r.content)
                    baseuser.img = path
                else:
                    baseuser.img = 'header_default.png'
                baseuser.save()
                request.session['user_img'] = baseuser.img
                request.session['user_name'] = baseuser.name
                login(request, user)
                return Response({'success': True, 'userimg': baseuser.img, 'userid': baseuser.id})
        else:
            data = {'success': False, 'err': u'Data Error'}
        return Response(data)
