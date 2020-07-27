$(document).on('click','.backgroud-nav-container',function () {
    let _this = $(this)
    _this.hide()
})
$(document).on('click','.nav-list',function (e) {
    e.stopPropagation()
})
$(document).on('click','.nav-btm',function () {
    $('.backgroud-nav-container').show()
})
$(document).on('click','.blog-content',function () {
    let id = $(this).parent('.blog-box').attr('data')
    location.href = '/mobile/blog/'+id+'/'
})
$(document).on('click','.blog-title-div',function () {
    let id = $(this).parent('.blog-box').attr('data')
    location.href = '/mobile/blog/'+id+'/'
})
$(document).on('click','.blog-back',function () {
    window.history.back();
})
$(document).on('click','.blog-detail-like',function () {
    let btn = $(this);
    let blog_id = btn.parents('.blog-detail-container').attr('data');    // 获取blog ID
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
                layer.msg('<div style="color: white;text-align: center;">'+result.msg+ '</div>')
            }
        }
    })
});
$(document).on('click','#mobile-user',function () {
    $('.mobile-user-menu').toggle()
})
