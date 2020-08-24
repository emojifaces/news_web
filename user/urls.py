from django.urls import include, path
from user.views import *
from user.api import *


urlpatterns = [
    path('', UserView.as_view(), name='user'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('mygroup/', GetMyGroup.as_view(),name='mygroup'),
    # path('mycomment/', GetMyComment.as_view(),name='mycomment'),
    path('mycollect/', GetMyCollect.as_view(),name='mycollect'),
    path('blacklist/', GetBlackList.as_view(),name="blacklist"),
    path('getcode/', GetCode.as_view(),name='getcode'),
    path('register/', Register.as_view(),name='register'),
    path('forgotpassword/', ForgotPassword.as_view(),name='forgotpassword'),
    path('userdetail/<pk>', UserDetail.as_view(),name='userdetail'),
    path('usergrouplist/<pk>/',GetUserGroup.as_view(),name='usergrouplist'),
    path('getmycomment/',GetMyCommentList.as_view()),
    path('addblacklist/',AddBlackList.as_view()),
    path('modifypersonalinfo/',ModifyPersonalInformation.as_view()),
    path('removeblacklist/',RemoveBlackList.as_view()),
    path('thirdlogin/',ThirdLogin.as_view()),
    path('moduserhead/',ModifyUserHeadImg.as_view()),
]