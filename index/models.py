from django.db import models

TYPE_CHOICE = (
    (0, '快讯'),
    (1, '日历'),
    (2, '微博'),
    (3, '广告组'),
    (4, '广告'),
)

STATE_CHOICE = (
    (0, '正常'),
    (1, '隐藏'),
)



class AbstractModel(models.Model):
    create_date = models.DateTimeField(auto_now_add=True, verbose_name=u"创建时间")
    modify_date = models.DateTimeField(auto_now=True, verbose_name=u"修改时间")

    class Meta:
        abstract = True


class FastInfo(AbstractModel):
    type = models.PositiveIntegerField(choices=TYPE_CHOICE, verbose_name=u'类型', default=0)
    jId = models.CharField(max_length=255, unique=True, null=True, blank=True, verbose_name=u'金十id')
    pub_date = models.DateTimeField(null=True, blank=True, verbose_name='快讯时间')
    content = models.TextField(null=True, blank=True, verbose_name='快讯内容')
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'快讯图片')
    is_important = models.BooleanField(default=True, verbose_name='是否重要')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    translate = models.TextField(null=True, blank=True, verbose_name='快讯翻译内容')
    other_id = models.IntegerField(null=True, blank=True, verbose_name='其他内容对应id', default=0)
    VN_pub_date = models.DateTimeField(null=True, blank=True, verbose_name='越南发布时间')
    channel = models.CharField(max_length=255, null=True, blank=True, verbose_name="channel")

    class Meta:
        db_table = u'k_fastinfo'
        verbose_name = u'快讯'


class Summary(AbstractModel):
    title = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'标题')
    state = models.PositiveIntegerField(choices=STATE_CHOICE, verbose_name=u'状态', default=0)
    pub_date = models.DateTimeField(null=True, blank=True, verbose_name='发布时间')
    content = models.TextField(null=True, blank=True, verbose_name='快讯内容')
    is_important = models.BooleanField(default=True, verbose_name='是否重要')
    sort = models.IntegerField(null=True, blank=True, verbose_name='排序', default=0)

    class Meta:
        db_table = u'k_summary'
        verbose_name = u'摘要'
