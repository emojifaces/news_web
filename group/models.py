from django.db import models
from user.models import *

TYPE_CHOICE = (
    (0, '文字'),
    (1, '投票'),
    (2, '转发'),
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


class Blogs(AbstractModel):
    type = models.PositiveIntegerField(choices=TYPE_CHOICE, verbose_name=u'类型', default=0)
    content = models.TextField(null=True, blank=True, verbose_name='微博内容')
    vote_title = models.TextField(null=True, blank=True, verbose_name='投票标题')
    user_id = models.ForeignKey(BaseUser, related_name='blogs_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    blog_id = models.ForeignKey('self', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'转发微博id')
    goodfingers = models.IntegerField(null=True, blank=True, verbose_name='点赞数', default=0)
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')
    state = models.PositiveIntegerField(choices=STATE_CHOICE, verbose_name=u'状态', default=0)
    bgcolor = models.CharField(max_length=25, null=True, blank=True, verbose_name='背景颜色')

    class Meta:
        db_table = u'k_blogs'
        verbose_name = u'微博'


class BlogImages(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='blogImages_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    img = models.CharField(max_length=255, null=True, blank=True, verbose_name=u'微博图片')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_blog_images'
        verbose_name = u'微博图片'


class BlogChoices(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='blogChoice_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    content = models.TextField(null=True, blank=True, verbose_name='投票内容')
    sort = models.IntegerField(null=True, blank=True, verbose_name='排序', default=0)
    num = models.IntegerField(null=True, blank=True, verbose_name='投票数', default=0)
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_blog_choices'
        verbose_name = u'微博投票'


class FirstBlogComment(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='first_blogComment_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    user_id = models.ForeignKey(BaseUser, related_name='first_blogComment_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'留言用户id')
    content = models.TextField(null=True, blank=True, verbose_name=u'内容')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_first_blog_comment'
        verbose_name = u'一级微博留言和回复'


class SecondBlogComment(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='second_blogComment_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    first_comment = models.ForeignKey(FirstBlogComment, related_name='firstBlogComment', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'一级留言ID')
    user_id = models.ForeignKey(BaseUser, related_name='second_blogComment_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'留言用户id')
    reply_id = models.ForeignKey(BaseUser, related_name='blogComment_reply', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'回复用户id')
    content = models.TextField(null=True, blank=True, verbose_name=u'内容')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_section_blog_comment'
        verbose_name = u'二级微博留言和回复'



class CollectBlogs(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='collectBlog_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    user_id = models.ForeignKey(BaseUser, related_name='collectBlog_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_collect_blogs'
        verbose_name = u'收藏微博'


class GoodFingerBlogs(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='goodFingerBlog_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    user_id = models.ForeignKey(BaseUser, related_name='goodFingerBlog_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    is_pub = models.BooleanField(default=True, verbose_name='是否发布')

    class Meta:
        db_table = u'k_goodfinger_blogs'
        verbose_name = u'点赞微博'


class SelectBlogs(AbstractModel):
    blog_id = models.ForeignKey(Blogs, related_name='selectBlog_blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'微博id')
    answer_id = models.ForeignKey(BlogChoices, related_name='selectBlog_answer', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'投票id')
    user_id = models.ForeignKey(BaseUser, related_name='selectBlog_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')

    class Meta:
        db_table = u'k_select_blogs'
        verbose_name = u'投票微博'


class Attentions(AbstractModel):
    user_id = models.ForeignKey(BaseUser, related_name='attentions_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    star_id = models.ForeignKey(BaseUser, related_name='attentions_star', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'关注用户id')

    class Meta:
        db_table = u'k_attentions'
        verbose_name = u'关注'


class Blacks(AbstractModel):
    user_id = models.ForeignKey(BaseUser, related_name='black_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    black_id = models.ForeignKey(BaseUser, related_name='black_black', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'黑名单用户id')

    class Meta:
        db_table = u'k_blacks'
        verbose_name = u'黑名单'


class Remind(AbstractModel):
    user_id = models.ForeignKey(BaseUser, related_name='remind_user', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'发送者id')
    blog_id = models.ForeignKey(Blogs, related_name='blog', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'用户id')
    author = models.ForeignKey(BaseUser, related_name='author', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name=u'所有者')
    type = models.IntegerField(choices=((0, '一级'), (1, "二级")), verbose_name='分类')
    content = models.CharField(max_length=255, null=True, blank=True, verbose_name='内容')
    isread = models.BooleanField(default=False, verbose_name='是否已读')
    first_comment = models.ForeignKey(FirstBlogComment, related_name='first_comment', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name='一级')
    second_comment = models.ForeignKey(SecondBlogComment, related_name='second_comment', on_delete=models.DO_NOTHING, null=True, blank=True, verbose_name='二级')

    class Meta:
        db_table = u'k_remind'
        verbose_name = u'提醒'