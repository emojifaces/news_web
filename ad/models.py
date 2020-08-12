from django.db import models

from blog.models import Offical
from group.models import AbstractModel


STATE_CHOICE = (
    (0, '正常'),
    (1, '隐藏'),
)

SITE_CHOICE = (
    (0, '上'),
    (1, '右'),
    (2, '下'),
    (3, '左'),
    (4, 'fast-11'),
    (5, 'fast-16'),
    (6, 'fast-21'),
    (7, 'fast-6'),
)

PAGE_CHOICE = (
    (0, '网页全局'),
    (1, '网页首页'),
    (2, '网页日历'),
    (3, '快讯内'),
    (4, '网页动态'),
    (5, 'App动态详情'),
)

class AdvertsFactory(AbstractModel):
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'名称')
    state = models.PositiveIntegerField(choices=STATE_CHOICE, verbose_name=u'状态', default=0)
    contact = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'联系人')
    phone = models.CharField(max_length=50, null=True, blank=True, verbose_name=u'手机号')
    url = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'链接地址')

    class Meta:
        db_table = u'k_advert_factory'
        verbose_name = u'广告商'

class HardAdverts(AbstractModel):
    ad_id = models.ForeignKey(AdvertsFactory, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'广告商id')
    url = models.CharField(max_length=300, null=True, blank=True, verbose_name=u'网址')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    site = models.PositiveIntegerField(choices=SITE_CHOICE, verbose_name=u'广告显示位置', default=0)
    page = models.PositiveIntegerField(choices=PAGE_CHOICE, verbose_name=u'广告显示页面', default=0)
    sort = models.PositiveIntegerField(verbose_name=u'广告排序', default=0)
    start_date = models.DateField(null=True, blank=True, verbose_name='开始时间')
    end_date = models.DateField(null=True, blank=True, verbose_name='结束时间')
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'广告图')

    class Meta:
        db_table = u'k_hard_adverts'
        verbose_name = u'固定广告'

class RoundsAdvertsGroup(AbstractModel):
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    start_date = models.DateField(null=True, blank=True, verbose_name='开始时间')
    end_date = models.DateField(null=True, blank=True, verbose_name='结束时间')
    round_time = models.TimeField(blank=True, null=True, verbose_name=u'循环时间')
    is_rounds = models.BooleanField(default=True, verbose_name='是否循环')
    page = models.PositiveIntegerField(choices=PAGE_CHOICE, verbose_name=u'广告显示页面', default=0)

    class Meta:
        db_table = u'k_rounds_adverts_group'
        verbose_name = u'循环广告组'

class RoundsAdverts(AbstractModel):
    round_id = models.ForeignKey(RoundsAdvertsGroup, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'组id')
    ad_id = models.ForeignKey(AdvertsFactory, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'广告商id')
    url = models.CharField(max_length=300, null=True, blank=True, verbose_name=u'网址')
    sort = models.PositiveIntegerField(verbose_name=u'排序', default=0)
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'广告图')

    class Meta:
        db_table = u'k_rounds_adverts'
        verbose_name = u'循环广告'

class OfficalAdverts(AbstractModel):
    offical_id = models.ForeignKey(Offical, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'官博id')
    ad_id = models.ForeignKey(AdvertsFactory, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'广告商id')
    url = models.CharField(max_length=300, null=True, blank=True, verbose_name=u'网址')
    sort = models.PositiveIntegerField(verbose_name=u'排序', default=0)
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'广告图')

    class Meta:
        db_table = u'k_offical_adverts'
        verbose_name = u'官博广告'

class OfficalDetailAdverts(AbstractModel):
    ad_id = models.ForeignKey(AdvertsFactory, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'广告商id')
    url = models.CharField(max_length=300, null=True, blank=True, verbose_name=u'网址')
    sort = models.PositiveIntegerField(verbose_name=u'排序', default=0)
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'广告图')

    class Meta:
        db_table = u'k_offical_detail_adverts'
        verbose_name = u'官博详情广告'