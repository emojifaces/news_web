from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import spider.routing

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            index.routing.websocket_urlpatterns# 指明路由文件是devops/routing.py
        )
    ),
})