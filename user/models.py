from django.db import models
from django.conf import settings

STATUS_CHOICE = (
    (0, '在线'),
    (1, '黑名单'),
    (2, '删除')
)

SEX_CHOICES = (
    (1, u'男'),
    (2, u'女'),
)

TYPE_CHOICES = (
    (0, u'注册'),
    (1, u'忘记密码'),
)


class AbstractModel(models.Model):
    create_date = models.DateTimeField(auto_now_add=True, verbose_name=u"创建时间")
    modify_date = models.DateTimeField(auto_now=True, verbose_name=u"修改时间")

    class Meta:
        abstract = True


class Manage(AbstractModel):

    account = models.CharField(max_length=255, unique=True, null=True, blank=True, verbose_name=u'账号用户名')
    status = models.PositiveIntegerField(choices=STATUS_CHOICE, verbose_name=u'状态', default=0)
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'姓名')
    phone = models.CharField(max_length=50, null=True, blank=True, verbose_name=u'手机号')
    email = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'邮箱')
    auth_user = models.OneToOneField(settings.AUTH_USER_MODEL, models.CASCADE, verbose_name=u'登录用户', blank=True, null=True)

    class Meta:
        db_table = u'k_manage'
        verbose_name = u'管理员'


class BaseUser(AbstractModel):

    account = models.CharField(max_length=255, unique=True, null=True, blank=True, verbose_name=u'账号用户名')
    status = models.PositiveIntegerField(choices=STATUS_CHOICE, verbose_name=u'状态', default=0)
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'姓名')
    phone = models.CharField(max_length=50, null=True, blank=True, verbose_name=u'手机号')
    email = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'邮箱')
    facebookopenid = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'fackbookopenID')
    googleopenid = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'googleopenID')
    gender = models.IntegerField(choices=SEX_CHOICES, verbose_name=u'性别', default=0)
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'头像')
    birthday = models.DateTimeField(null=True, blank=True, verbose_name='生日')
    slogan = models.CharField(max_length=255, null=True, blank=True, verbose_name='个人签名')
    facebook = models.CharField(max_length=255, null=True, blank=True, verbose_name='Facebook账号')
    facebook_link = models.CharField(max_length=255, null=True, blank=True, verbose_name='facebook地址')
    auth_user = models.OneToOneField(settings.AUTH_USER_MODEL, models.CASCADE, verbose_name=u'登录用户', blank=True, null=True)

    class Meta:
        db_table = u'k_baseuser'
        verbose_name = u'基础用户'


class UserToken(AbstractModel):
    email = models.CharField(max_length=150, null=True, blank=True, verbose_name=u'邮箱')
    token = models.CharField(max_length=20, null=True, blank=True, verbose_name=u'验证码')
    type = models.IntegerField(choices=TYPE_CHOICES, verbose_name=u'类型', default=0)
    pub_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = u'k_user_token'
        verbose_name = u'验证码'
