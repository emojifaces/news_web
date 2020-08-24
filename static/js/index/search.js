$('.search-btn').click(function () {

    let _this = $(this)
    let query = _this.siblings('input').val()
    location.href = '/search/?q=' + query
})

$('#search-result-fastinfo').click(function () {
    $(this).parents('ul').find('li').removeClass('active');
    $(this).addClass('active');
    let query = $('.search-text input').val()
    location.href = '/search/?q=' + query
})

$('#search-result-blog').click(function () {
    $(this).parents('ul').find('li').removeClass('active');
    $(this).addClass('active');
    let query = $('.search-text input').val()
    $.ajax({
        url: '/searchoffical/?q=' + query,
        mothod: 'GET',
        success: function (res) {
            console.log('搜索blog',res)
            $('#main-data').empty();
            if (!res.success) {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                let moreBtn = $('<div class="main-data-div">\n' +
                    '                <div class="main-data-info">\n' +
                    '                    <div class="main-footer cursor-pointer" id="moreSearchBlog">\n' +
                    '                        Xem thêm\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>')
                let str = `Find ${res.num} result`
                $('.result-num').text(str)
                for (let data of res.data) {
                    let container = $('<div class="blog-box color-comment" data="' + data.id + '">' +
                        '<div class="footer-date">' + timeformat(data.pub_date) + '</div>' +
                        '</div>')
                    if (data.title) {
                        let title_div = $('<div class="blog-title-div">' +
                            '<span class="label-green color-white label">' + data.type.name + '</span>' +
                            '</div>')
                        if (data.type.color) {
                            title_div.children('span').css('background-color', data.type.color)
                        }
                        let title = $('<span class="blog-content-txt">' + data.title + '</span>')
                        title_div.append(title)
                        container.append(title_div)
                    }
                    let blog_content = $('<div class="blog-content">' + data.content + '</div>')
                    container.append(blog_content)
                    if (data.img) {
                        let img_div = $('<div class="blog-image-div">')
                        for (let img of data.img) {
                            let img_node = $('<img src="/media/' + img + '" class="alert-img" alt="">')
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
                    if (data.islike) {
                        let like_btn = $('<button class="blog-like" islike="' + data.islike + '">' +
                            '<img src="/static/images/like2.png" alt="">' +
                            '</button>')
                        let like_num = $('<span>' + data.like_num + '</span>')
                        like_btn.append(like_num)
                        footer_div.append(like_btn)
                    } else {
                        let like_btn = $('<button class="blog-like" islike="' + data.islike + '">' +
                            '<img src="/static/images/like1.png" alt="">' +
                            '</button>')
                        let like_num = $('<span>' + data.like_num + '</span>')
                        like_btn.append(like_num)
                        footer_div.append(like_btn)
                    }
                    container.append(footer_div)
                    $('#main-data').append(container)
                }
                $('#main-data').append(moreBtn)
            }


        }
    })
})

SearchBlog_page = 2
$(document).on('click', '#moreSearchBlog', function () {
    let moreBtn = $(this).parents('.main-data-div')
    let query = $('.search-text input').val()
    $.ajax({
        url: '/searchoffical/?q=' + query + '&page=' + SearchBlog_page,
        mothod: 'GET',
        success: function (res) {
            moreBtn.remove();
            if (!res.success) {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                let moreBtn = $('<div class="main-data-div">\n' +
                    '                <div class="main-data-info">\n' +
                    '                    <div class="main-footer cursor-pointer" id="moreSearchBlog">\n' +
                    '                        Xem thêm\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>')
                let str = `Find ${res.num} result`
                $('.result-num').text(str)
                for (let data of res.data) {
                    let container = $('<div class="blog-box color-comment" data="' + data.id + '">' +
                        '<div class="footer-date">' + timeformat(data.pub_date) + '</div>' +
                        '</div>')
                    if (data.title) {
                        let title_div = $('<div class="blog-title-div">' +
                            '<span class="label-green color-white label">' + data.type.name + '</span>' +
                            '</div>')
                        if (data.type.color) {
                            title_div.children('span').css('background-color', data.type.color)
                        }
                        let title = $('<span class="blog-content-txt">' + data.title + '</span>')
                        title_div.append(title)
                        container.append(title_div)
                    }
                    let blog_content = $('<div class="blog-content">' + data.content + '</div>')
                    container.append(blog_content)
                    if (data.img) {
                        let img_div = $('<div class="blog-image-div">')
                        for (let img of data.img) {
                            let img_node = $('<img src="/media/' + img + '" class="alert-img" alt="">')
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
                    if (data.islike) {
                        let like_btn = $('<button class="blog-like" islike="' + data.islike + '">' +
                            '<img src="/static/images/like2.png" alt="">' +
                            '</button>')
                        footer_div.append(like_btn)
                    } else {
                        let like_btn = $('<button class="blog-like" islike="' + data.islike + '">' +
                            '<img src="/static/images/like1.png" alt="">' +
                            '</button>')
                        footer_div.append(like_btn)
                    }
                    container.append(footer_div)
                    $('#main-data').append(container)
                }
                $('#main-data').append(moreBtn)
                SearchBlog_page += 1
            }


        }
    })
})


SearchFastInfo_page = 2
$(document).on('click', '#moreSearchFastInfo', function () {
    let moreBtn = $(this).parents('.main-data-div')
    let query = $('.search-text input').val()
    $.ajax({
        type: 'get',
        url: '/moresearchfastinfo/?q=' + query + '&page=' + SearchFastInfo_page,
        success: function (res) {
            console.log(res)
            moreBtn.remove()
            if (!res.success) {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                for (let data of res.data) {
                    let div = $('<div class="main-data-div color-comment"></div>')
                    let icon = $('<div class="main-data-icon">\n' +
                        '             <div class="icon-div">\n' +
                        '             <img src="/static/images/7_24.png" alt="">' +
                        '             </div>\n' +
                        '         </div>')
                    let time = $('<div class="main-data-time">' + data.pub_date + '</div>')
                    let info = $('<div class="main-data-info"></div>')
                    div.append(icon, time, info)
                    let fast = $('<div>' + data.content + '</div>')
                    info.append(fast)
                    if (data.is_important) {
                        div.css('color', 'red')
                    }
                    $('#main-data').append(div)

                }
                $('#main-data').append(moreBtn)
                SearchFastInfo_page += 1
            }
        }
    })
})

function initSearchData() {
    let query = $('.search-text input').val()
    let moreBtn = $('<div class="main-data-div">\n' +
        '                <div class="main-data-info">\n' +
        '                    <div class="main-footer cursor-pointer" id="moreSearchFastInfo">\n' +
        '                        Xem thêm\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>')
    $.ajax({
        type: 'get',
        url: '/moresearchfastinfo/?q=' + query,
        success: function (res) {
            console.log('加载搜索数据', res)
            if (!res.success) {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                for (let data of res.data) {
                    let div = $('<div class="main-data-div color-comment"></div>')
                    let icon = $('<div class="main-data-icon">\n' +
                        '             <div class="icon-div">\n' +
                        '             <img src="/static/images/7_24.png" alt="">' +
                        '             </div>\n' +
                        '         </div>')
                    let time = $('<div class="main-data-time">' + data.pub_date + '</div>')
                    let info = $('<div class="main-data-info"></div>')
                    div.append(icon, time, info)
                    let fast = $('<div>' + data.content + '</div>')
                    info.append(fast)
                    if (data.is_important) {
                        div.css('color', 'red')
                    }
                    $('#main-data').append(div)

                }
                $('#main-data').append(moreBtn)

            }
        }
    })
}