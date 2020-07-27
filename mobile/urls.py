from django.urls import path
from mobile.views import *


urlpatterns = [
    path('index/',MobileIndex.as_view()),
    path('blog/',MobileBlog.as_view()),
    path('blog/<pk>/',MobileBlogDetail.as_view()),
    path('user/',MobileUser.as_view()),
]