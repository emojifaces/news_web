from django.urls import path, include
from group.views import *
from group.api import GroupDetail

urlpatterns = [
    path('',GroupView.as_view(), name='group'),
    path('detail/<int:pk>',GroupDetail.as_view()),
]