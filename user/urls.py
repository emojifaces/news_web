from django.urls import include, path
from user.views import *
from user.api import *


urlpatterns = [
    path('', UserView.as_view(), name='user'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('mygroup/',GetMyGroup.as_view(),name='mygroup'),
    path('mycomment/',GetMyComment.as_view(),name='mycomment'),
    path('mycollect/',GetMyCollect.as_view(),name='mycollect'),
    path('blacklist/',GetBlackList.as_view(),name="blacklist"),
]