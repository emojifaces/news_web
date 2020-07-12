from django.urls import path
from cal.views import CalendarView
from cal.api import DataView,EventsView


urlpatterns = [
    path('',CalendarView.as_view(),name="calendar"),
    path('data/',DataView.as_view(),name="data"),
    path('events/',EventsView.as_view(),name="events"),

]