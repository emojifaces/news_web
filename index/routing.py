from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    # url(r'^ws/market/$', consumers.Market),
    url(r'^wss/fast/$', consumers.Fast),
]
