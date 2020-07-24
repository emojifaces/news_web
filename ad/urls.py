from django.urls import path
from .views import *

urlpatterns = [
    path('globalad/',GlobalAD.as_view()),
    path('indexad/',IndexAD.as_view()),
    path('calendarad/',CalendarAD.as_view()),
    path('groupad/',GroupAD.as_view()),
    path('fastinfoad/',FastInfoAD.as_view()),
]