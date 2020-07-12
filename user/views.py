import hashlib

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import View
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from user.models import BaseUser



class UserView(View):

    def get(self, request):
        if request.user.is_authenticated:
            user = BaseUser.objects.get(auth_user=request.user)
            data = {
                "name":user.name,
                "slogan":user.slogan,
                "gender": user.gender,
                "birthday":user.birthday,
                "phone":user.phone,
                "email":user.email,
                "img":user.img
            }
            return render(request, 'user.html',{'data':data})
        else:
            return HttpResponse('未登录，请登录')



class LoginView(View):

    def post(self, request):
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        current_url = request.POST.get('current_url', None)
        if User.objects.filter(username=username):
            user = authenticate(username=username, password=hashlib.md5(password.encode("utf-8")).hexdigest())
            # user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    login(request, user)
                    base_user = BaseUser.objects.filter(auth_user=user).first()
                    user_img = base_user.img
                    user_name = base_user.name
                    request.session['user_img'] = user_img
                    request.session['user_name'] = user_name
                    request.session['username'] = username
                    request.session['user_id'] = base_user.id
                    print(user_img,type(user_img))
                    data = {
                        'baseuser':base_user
                    }
                    return redirect(current_url, **data)
                else:
                    return JsonResponse({'msg': 2})     # 2：用户未激活
            else:
                return  JsonResponse({'msg': 0})        # 0: 密码错误
        else:
            return JsonResponse({'msg': 3})     # 3: 账号错误

class LogoutView(View):

    def get(self, request):
        logout(request)
        return redirect(reverse('index'))


