$('.search-btn').click(function () {

    let _this = $(this)
    let query = _this.siblings('input').val()
    location.href = '/search/?q='+query
})

$('#newsfeed').click(function () {
        $(this).parents('ul').find('li').removeClass('active');
        $(this).addClass('active');
        let query = $('.search-text input').val()
        location.href = '/search/?q='+query
    })

$('#summary').click(function () {
    $(this).parents('ul').find('li').removeClass('active');
    $(this).addClass('active');
    let query = $('.search-text input').val()
    $.ajax({
        url: '/searchoffical/?q='+query,
        mothod: 'GET',
        success: function (res) {
            $('#main-data').empty();
            if (!res.success){
                layer.msg('<div style="color: black;text-align: center;">'+res.msg+'</div>')
            }else{
                let str = `Find ${res.num} result`
                $('.result-num').text(str)
                for (let data of res.data){
                    let container = $('<div class="blog-box color-comment" data="'+data.id+'">' +
                        '<div class="footer-date">'+timeformat(data.pub_date)+'</div>' +
                        '</div>')
                    if (data.title){
                        let title_div = $('<div class="blog-title-div">' +
                            '<span class="label-green color-white label">'+data.type.name+'</span>' +
                            '</div>')
                        if (data.type.color){
                            title_div.children('span').css('background-color',data.type.color)
                        }
                        let title = $('<span class="blog-content-txt">'+data.title+'</span>')
                        title_div.append(title)
                        container.append(title_div)
                    }
                    let blog_content = $('<div class="blog-content">'+data.content+'</div>')
                    container.append(blog_content)
                    if (data.img){
                        let img_div = $('<div class="blog-image-div">')
                        for (let img of data.img){
                            let img_node = $('<img src="/media/'+img+'" class="alert-img" alt="">')
                            img_div.append(img_node)
                        }
                        container.append(img_div)
                    }
                    let footer_div = $('<div class="blog-footer-div">' +
                        '<button class="blog-share">\n' +
                        '        <img src="/static/images/share1.png" alt="">\n' +
                        '        <span>Share</span>\n' +
                        '</button>' +
                        '</div>')
                    if (data.islike){
                        let like_btn = $('<button class="blog-like" islike="'+data.islike+'">' +
                            '<img src="/static/images/like2.png" alt="">' +
                            '</button>')
                        footer_div.append(like_btn)
                    }else{
                        let like_btn = $('<button class="blog-like" islike="'+data.islike+'">' +
                            '<img src="/static/images/like1.png" alt="">' +
                            '</button>')
                        footer_div.append(like_btn)
                    }
                    container.append(footer_div)
                    $('#main-data').append(container)
                }
            }


        }
    })
})