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

function initBlogDate(page,limit) {
    let container = $('.blog-load-div')
    $.ajax({
        type:'get',
        url:'/blog/getbloglist/?page='+page+'&limit='+limit,
        success:function (res) {
            console.log('加载blog数据：',res)
            if (res.success){
                for (let data of res.data){
                    if (data.ads){
                        let ad_box = $('<div class="blog-box color-comment"></div>')
                        let ad_container = $('<div class="ad-container"></div>')
                        ad_box.append(ad_container)
                        for (let ad of data.ads){
                            let ad_div = $(' <div class="ad-div">\n' +
                                '                 <img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" >\n' +
                                '                 <div class="mask">Show Me More</div>\n' +
                                '             </div>')
                            ad_container.append(ad_div)
                        }
                        container.append(ad_box)
                    }
                    let blog_box = $('<div class="blog-box color-comment" data="'+data.id+'">' +
                        '<div class="footer-date">'+timeformat(data.pub_date)+'</div>' +
                        '</div>')
                    if (data.title){
                        let title_div = $('<div class="blog-title-div"></div>')
                        blog_box.append(title_div)
                        if (data.type.name){
                            let type_name = $('<span class="label-green color-white label">'+data.type.name+'</span>')
                            if (data.type.color){
                                type_name.css('background-color',data.type.color)
                            }
                            title_div.append(type_name)
                        }
                        let title = $('<span class="blog-content-txt">'+data.title+'</span>')
                        title_div.append(title)
                    }
                    let content_div = $('<div class="blog-content">'+data.content+'</div>')
                    blog_box.append(content_div)
                    if (data.image){
                        let img_div = $('<div class="blog-image-div"></div>')
                        blog_box.append(img_div)
                        for (let image of data.image){
                            let img = $('<img src="/media/'+image+'" class="alert-img" alt="">')
                            img_div.append(img)
                        }
                    }
                    let footer_div = $('<div class="blog-footer-div">' +
                        '<button class="blog-share">\n' +
                        '     <img src="/static/images/share1.png" alt="">\n' +
                        '     <span>Share</span>\n' +
                        '</button>' +
                        '</div>')

                    let like_btn = $('<button class="blog-like" islike="'+data.islike+'">')
                    if (data.islike){
                        let like_img = $('<img src="/static/images/like2.png" alt="">')
                        let like_num = $('<span>'+data.likenum+'</span>')
                        like_btn.append(like_img,like_num)
                    }else{
                        let like_img = $('<img src="/static/images/like1.png" alt="">')
                        let like_num = $('<span>'+data.likenum+'</span>')
                        like_btn.append(like_img,like_num)
                    }
                    footer_div.append(like_btn)
                    blog_box.append(footer_div)
                    container.before(blog_box)
                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '                <div class="main-data-info">\n' +
                    '                    <div class="main-footer cursor-pointer" id="moreOfficalBlog">\n' +
                    '                        MORE INFORMATION\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>')
                container.after(moreBtn)
            }else{
                layer.msg('<div style="color: black;text-align: center;">'+res.msg+ '</div>')
            }
        },
        beforeSend: function () {
            $('.blog-load-div').show()
        },
        complete: function () {
            $('.blog-load-div').hide()
        }

    })
}

Offical_Blog_Page=2
$(document).on('click','#moreOfficalBlog',function () {
    $(this).parents('.main-data-div').remove()
    initBlogDate(Offical_Blog_Page,30)
    Offical_Blog_Page+=1
})