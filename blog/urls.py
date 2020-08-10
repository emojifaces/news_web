from django.urls import path
from blog.views import *
from blog.api import *


urlpatterns = [
    path('',BlogView.as_view(),name='blog'),
    path('like/',LikeBlogView.as_view(),name='like'),
    path('getbloglist/',BlogList.as_view()),
]