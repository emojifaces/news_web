from django.urls import path
from .views import *


urlpatterns = [
    path('facebook/',Facebook.as_view()),
]