from django.db import models

from user.models import BaseUser

STATE_CHOICE = (
    (0, '正常'),
    (1, '隐藏'),
)
OSTYLE_CHOICE = (
    (0, '文字'),
    (1, '广告'),
)


class AbstractModel(models.Model):
    create_date = models.DateTimeField(auto_now_add=True, verbose_name=u"创建时间")
    modify_date = models.DateTimeField(auto_now=True, verbose_name=u"修改时间")

    class Meta:
        abstract = True


class OfficalType(AbstractModel):
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'名称')
    color = models.CharField(max_length=50, null=True, blank=True, verbose_name=u'颜色')
    is_pub = models.BooleanField(default=False, verbose_name='是否发布')
    state = models.PositiveIntegerField(choices=STATE_CHOICE, verbose_name=u'状态', default=0)

    class Meta:
        db_table = u'k_offical_type'
        verbose_name = u'官博类型'


class Offical(AbstractModel):
    title = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'标题')
    style = models.PositiveIntegerField(choices=OSTYLE_CHOICE, verbose_name=u'官博类型', default=0)
    type = models.ForeignKey(OfficalType, on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'分类id')
    content = models.TextField(null=True, blank=True, verbose_name=u'内容')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    pub_date = models.DateTimeField(null=True, blank=True, verbose_name='发布时间')
    state = models.PositiveIntegerField(choices=STATE_CHOICE, verbose_name=u'状态', default=0)
    goodfingers = models.IntegerField(null=True, blank=True, verbose_name='点赞数', default=0)

    class Meta:
        db_table = u'k_offical'
        verbose_name = u'官博'


class OfficalImages(AbstractModel):
    offical_id = models.ForeignKey(Offical, related_name='officalAndimage_offical', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'官博id')
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'图片')

    class Meta:
        db_table = u'k_offical_images'
        verbose_name = u'官博图片'


class GoodFingerOfficals(AbstractModel):
    offical_id = models.ForeignKey(Offical, related_name='goodFingerOffical_offical', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'官博id')
    user_id = models.ForeignKey(BaseUser, related_name='goodFingerOffical_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_goodfinger_officals'
        verbose_name = u'点赞微博'


