from django.urls import path
from blog.views import *
from blog.api import LikeBlogView


urlpatterns = [
    path('',BlogView.as_view(),name='blog'),
    path('like/',LikeBlogView.as_view(),name='like'),
]