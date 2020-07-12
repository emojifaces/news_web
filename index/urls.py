from django.urls import path, include
from index.views import *
from index.api import *

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('summary/',SummaryView.as_view(),name='summary'),
    path('fastinfo/',GetFastInfoList.as_view(),name='fastinfo'),
    path('getsummarylist/',GetSummaryList.as_view(),name='summarylist'),
    path('getcalendarlist/',GetCalendarList.as_view(),name='calendarlist'),
    path('indexgrouplist/',IndexGroupList.as_view(),name='indexgrouplist'),
    path('fbc/',GetIndexGroupComment.as_view(),name='fbc'),
    path('sbc/',GetMoreSBC.as_view(),name='sbc'),
]