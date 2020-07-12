from django.urls import path, include
from group.views import *


urlpatterns = [
    path('',GroupView.as_view(), name='group')
]