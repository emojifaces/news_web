from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
import json
import time

import redis

redis_client = redis.Redis(host="127.0.0.1", port=6379, db=5)





class Fast(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'kfast'
        self.user_id = str(int(time.time()))
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.channel_layer.group_add(
            self.user_id,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        await self.channel_layer.group_add(
            self.user_id,
            self.channel_name
        )

    async def user_message(self, event):
        await self.send(json.dumps(event))

    # 主动推送
    async def tui_kfast(self, event):
        mes = event['msg']
        await self.send(json.dumps(mes))