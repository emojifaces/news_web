import hashlib
import random
import re
from .models import *
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import View
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from group.api import UnsafeSessionAuthentication
from user.models import BaseUser
from django.http import Http404
from group.models import *


# 用户跳转个人中心页
class UserView(View):

    def get(self, request):
        num = request.GET.get('num', '')
        if request.user.is_authenticated:
            user = BaseUser.objects.get(auth_user=request.user)
            data = {
                "name": user.name,
                "slogan": user.slogan,
                "gender": user.gender,
                "birthday": user.birthday,
                "phone": user.phone,
                "email": user.email,
                "img": user.img,
                "num": num,
                "facebook": user.facebook,
                "facebook_link": user.facebook_link
            }
            return render(request, 'user.html', {'data': data})
        else:
            return HttpResponse('未登录，请登录')


# 用户详情
class UserDetail(APIView):

    def get(self, request, pk):
        try:
            user = BaseUser.objects.get(id=pk)
        except:
            raise Http404
        data = {
            "userId": user.id,
            "name": user.name,
            "slogan": user.slogan,
            "gender": user.gender,
            "birthday": user.birthday,
            "phone": user.phone,
            "email": user.email,
            "img": user.img,
            'facebook_link': user.facebook_link,
            "ismine": True if user.auth_user == request.user else False,
        }
        if request.user.is_authenticated:
            data['isblack'] = True if Blacks.objects.filter(user_id__auth_user=request.user,
                                                            black_id_id=user.id).exists() else False
        else:
            data['isblack'] = True

        return render(request, 'user-detail.html', {'data': data})


# request.session['user_img'] = user_img
# request.session['user_name'] = user_name
# password=hashlib.md5(password.encode("utf-8")).hexdigest()
# 用户登录
class LoginView(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):

        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '').strip()
        email = str(email)
        password = str(password)
        if email and password:
            if BaseUser.objects.filter(email=email).exists():
                baseuser = BaseUser.objects.get(email=email)
                if baseuser.status == 0:
                    user = authenticate(username=baseuser.account,
                                        password=hashlib.md5(password.encode("utf-8")).hexdigest())
                    if user is not None:
                        if user.is_active:
                            login(request, user)
                            request.session['user_img'] = baseuser.img
                            request.session['user_name'] = baseuser.name
                            return Response({'success': True, 'msg': 'success'})
                        else:
                            data = {'success': False, 'msg': u'User is cancel'}
                    else:
                        data = {'success': False, 'msg': u'Password Error'}
                else:
                    data = {'success': False, 'msg': u'User is cancel'}
            else:
                data = {'success': False, 'msg': u'No user'}
        else:
            data = {'success': False, 'msg': u'No user'}
        return Response(data)


# 退出登录
class LogoutView(View):

    def get(self, request):
        logout(request)
        return redirect(reverse('index'))


# 用户注册
class Register(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        email = request.POST.get('email', '').strip()
        token = request.POST.get('code', '').strip()
        password = request.POST.get('password', '').strip()
        email = str(email)
        password = str(password)
        token = str(token)
        if email and password and token:
            if UserToken.objects.filter(email=email, token=token,type=0).exists():
                if BaseUser.objects.filter(email=email).exists():
                    data = {'success': False, 'err': u'email already exist'}
                else:
                    auth_user = User.objects.create_user(username=email,
                                                         password=hashlib.md5(password.encode("utf-8")).hexdigest(),email=email)
                    baseuser = BaseUser.objects.create(account=email, auth_user=auth_user, email=email, name=email,
                                                       img="header_default.png")
                    if baseuser.status == 0:
                        user = authenticate(username=baseuser.account,
                                            password=hashlib.md5(password.encode("utf-8")).hexdigest())
                        if user is not None:
                            if user.is_active:
                                login(request, auth_user)
                                request.session['user_img'] = baseuser.img
                                request.session['user_name'] = baseuser.name
                                return Response({'success': True, 'msg': '注册成功'})
                            else:
                                data = {'success': False, 'msg': u'User is cancel'}
                        else:
                            data = {'success': False, 'msg': u'Password Error'}
                    else:
                        data = {'success': False, 'msg': u'User is cancel'}
            else:
                data = {'success': False, 'msg': u'Token error'}
        else:
            data = {'success': False, 'msg': u'No info'}
        return Response(data)


# 获取验证码
class GetCode(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        email = request.POST.get('email', '').strip()
        type = request.POST.get('type', '').strip()
        if not type:
            type = 0
        email = str(email)
        if email:
            if int(type) == 0:
                if BaseUser.objects.filter(email=email).exists():
                    data = {'success': False, 'msg': u'email already exist'}
                    return Response(data)
            elif int(type) == 1:
                if not BaseUser.objects.filter(email=email).exists():
                    data = {'success': False, 'msg': u'email not exist'}
                    return Response(data)
            if re.match(r'^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}$', email):
                usertoken, created = UserToken.objects.get_or_create(email=email, type=type)
                token = random.randint(100000, 999999)
                usertoken.token = str(token)
                usertoken.save()
                data = {'success': True,'msg':u'success'}
            else:
                data = {'success': False, 'msg': u'Wrong email'}
        else:
            data = {'success': False, 'msg': u'No email'}
        return Response(data)


# 忘记密码
class ForgotPassword(APIView):
    authentication_classes = (UnsafeSessionAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):

        email = request.POST.get('email', '').strip()
        token = request.POST.get('token', '').strip()
        password = request.POST.get('password', '').strip()
        password2 = request.POST.get('password2', '').strip()
        email = str(email)
        password = str(password)
        password2 = str(password2)
        token = str(token)
        if password and password2 and (password == password2) and email and token:
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                baseuser = BaseUser.objects.get(auth_user=user)
                if UserToken.objects.filter(email=email, token=token, type=1).exists():
                    try:
                        user.set_password(hashlib.md5(password.encode("utf-8")).hexdigest())
                        user.save()
                        user = authenticate(username=user.username,
                                            password=hashlib.md5(password.encode("utf-8")).hexdigest())
                        if user is not None:
                            if user.is_active:
                                login(request, user)
                                request.session['user_img'] = baseuser.img
                                request.session['user_name'] = baseuser.name
                                return Response({'success': True, 'userimg': baseuser.img, 'userid': baseuser.id})
                            else:
                                data = {'success': False, 'msg': u'User is cancel'}
                        else:
                            data = {'success': False, 'msg': u'User is cancel'}
                    except Exception as e:
                        data = {'success': False, 'msg': u'User is cancel'}
                else:
                    data = {'success': False, 'msg': u'Token error'}
            else:
                data = {'success': False, 'msg': u'No info'}
        else:
            data = {'success': False, 'msg': u'User is cancel'}
        return Response(data)


