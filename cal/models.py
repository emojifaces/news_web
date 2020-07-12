from django.db import models

C_STATE_CHOICE = (
    (0, '待发布'),
    (1, '已发布'),
)
TAG_CHOICE = (
    (0, '无'),
    (1, '红色'),
    (2, '黄色'),
    (3, '绿色'),
)


class AbstractModel(models.Model):
    create_date = models.DateTimeField(auto_now_add=True, verbose_name=u"创建时间")
    modify_date = models.DateTimeField(auto_now=True, verbose_name=u"修改时间")

    class Meta:
        abstract = True

class Calendar(AbstractModel):
    title = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'标题')
    tran_title = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'标题翻译')
    jId = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'金十id')
    affect = models.PositiveIntegerField(choices=C_STATE_CHOICE, verbose_name=u'状态', default=0)
    tag = models.PositiveIntegerField(choices=TAG_CHOICE, verbose_name=u'显示标签', default=0)
    pub_date = models.DateTimeField(null=True, blank=True, verbose_name='发布时间')
    actual = models.CharField(max_length=150, null=True, blank=True, verbose_name='公布值')
    consensus = models.CharField(max_length=150, null=True, blank=True, verbose_name='预测值')
    revised = models.CharField(max_length=150, null=True, blank=True, verbose_name='修改值')
    previous = models.CharField(max_length=150, null=True, blank=True, verbose_name='前值')
    star = models.IntegerField(null=True, blank=True, verbose_name='星级', default=0)
    unit = models.CharField(max_length=150, null=True, blank=True, verbose_name='单位')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    country = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'国家')
    tran_country = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'国家翻译')
    VN_pub_date = models.DateTimeField(null=True, blank=True, verbose_name='越南发布时间')

    class Meta:
        db_table = u'k_calendar'
        verbose_name = u'财经日历'


class Events(AbstractModel):
    event_content = models.TextField(null=True, blank=True, verbose_name=u'内容')
    tran_event_content = models.TextField(null=True, blank=True, verbose_name=u'内容翻译')
    jId = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'金十id')
    pub_date = models.DateTimeField(null=True, blank=True, verbose_name='发布时间')
    star = models.IntegerField(null=True, blank=True, verbose_name='星级', default=0)
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    country = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'国家')
    region = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'城市')
    people = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'作者')
    tran_country = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'国家翻译')
    tran_city = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'国家翻译')
    VN_pub_date = models.DateTimeField(null=True, blank=True, verbose_name='越南发布时间')

    class Meta:
        db_table = u'k_events'
        verbose_name = u'财经大事'