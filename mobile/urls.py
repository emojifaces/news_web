from django.urls import path
from mobile.views import *


urlpatterns = [
    path('index/',MobileIndex.as_view()),
    path('blog/',MobileBlog.as_view()),
    path('blog/<pk>/',MobileBlogDetail.as_view()),
    path('user/',MobileUser.as_view()),
    path('logout/',MobileLogOut.as_view()),
    path('calendar/',MobileCalendar.as_view()),
    path('calendarInfo/', MobileCalendarInfoView.as_view()),
    path('aboutus/',MobileAboutUs.as_view()),
    path('group/',MobileGroupView.as_view()),
]