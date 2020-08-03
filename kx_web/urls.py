from .views import *
from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings
from group.api import *
from cal.views import CalendarInfoView
from cal.api import GetCalendarGraphData
from index.api import *



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('index.urls')),
    path('user/', include('user.urls')),
    path('group/', include('group.urls')),
    path('about-us/', aboutus),
    path('blog/', include('blog.urls')),
    path('calendar/', include('cal.urls')),
    path('ad/',include('ad.urls')),
    path('mobile/',include('mobile.urls')),
    path('third/',include('third.urls')),
    path('calendarInfo/', CalendarInfoView.as_view()),
    path('updatelike/',UpdateLike.as_view()),
    path('updatevote/',UpdateVote.as_view()),
    path('updatecollect/',UpdateCollect.as_view()),
    path('addfirstcomment/',AddFirstComment.as_view()),
    path('addsecondcomment/',AddSecondComment.as_view()),
    path('publish/',Publish.as_view()),
    path('getgrouplist/',GroupList.as_view()),
    path('getcalendargraphdata/',GetCalendarGraphData.as_view()),
    path('getmorecomment/',MoreComment.as_view()),
    path('deletegroup/',DeleteGroup.as_view()),
    path('deletecomment/',DeleteComment.as_view()),
    path('checkremind/',RemindView.as_view()),
    path('updateremind/',UpdateRemindState.as_view()),
    path('sendfastwebsocket/',SendFastToWebsocket.as_view()),
    # path('', include('social_django.urls', namespace='social')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()

