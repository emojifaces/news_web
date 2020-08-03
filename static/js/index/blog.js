// 页面跳转
$('.pagination-jump-txt').on('click',function () {
    let page_num = $('.jump-ipt').val();
    location.href = '?page='+page_num
});

// 用户点赞官博
$(document).on('click','.blog-like',function () {
    let btn = $(this);
    let blog_id = btn.parents('.blog-box').attr('data');    // 获取blog ID
    let islike = btn.attr('islike');        // 当前blog是否点赞
    let like_num = btn.children('span').text();     // 点赞数
    if (islike=="true"||islike=="True"){
        // 取消点赞
        like_num = parseInt(like_num)-1;
        btn.children('span').text(like_num);
        btn.children('img').attr('src','/static/images/like1.png');
        btn.attr('islike','False')
    }else{
        // 点赞
        like_num = parseInt(like_num)+1;
        btn.children('span').text(like_num);
        btn.children('img').attr('src','/static/images/like2.png');
        btn.attr('islike','True')
    }

    $.ajax({
        type:'post',
        url:'/blog/like/',
        data:{
            'blog_id':blog_id,
            'islike':islike
        },
        success:function (result) {
            if (!result.success){
                layer.msg('<div style="color: black;text-align: center;">'+result.msg+ '</div>')
            }
        }
    })
});

$(document).on('click','.blog-left-top',function () {
    let _this = $(this)
    let url = _this.attr('data-url')
    window.open(url)
})