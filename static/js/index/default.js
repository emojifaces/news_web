layer.config({
    extend: 'VN-skin-1/style.css', //加载您的扩展样式
    skin: 'layer-ext-VN-skin-1'
});


mainWidth = $('#main').width();
if (!mainWidth) {
    mainWidth = $('#main-index').width()
}
if (!mainWidth) {
    mainWidth = $('#main-group').width()
}
bodyWidth = $('body').width();
fixedWidth = $('#fixed-left').width();
titleHeight = $('#title').height();
pos = (bodyWidth - mainWidth) / 2 - fixedWidth - 80;
if (pos < 0) {
    pos = 0
}
$('#fixed-left').css('left', pos);
// $('#fixed-left').css('top', titleHeight + 20);
$('#fixed-left').css('top', '25%');
$('#fixed-right').css('right', pos);
// $('#fixed-right').css('top', titleHeight + 20);
$('#fixed-right').css('top', '25%')

// 控制blog 小图的宽度
function contentImgInit() {
    $('.content-img').each(function () {
        length = $(this).children('img').length;
        if (length == 1) {
            $(this).find('img').css('width', '50%')
        } else {
            $(this).find('img').css('width', '24%')
        }
    });
}

contentImgInit()

// 显示二级评论输入框
$(document).on('click', '.reply', function () {
    if ($(this).parents('.comment-op').parent().find('.VN-input-group-1').length) {
        $(this).parents('.comment-op').parent().find('.VN-input-group-1').remove()
    } else {
        console.log($(this).parents('.comment-op'))
        let img_url = $('div[id="user-header"]>img').attr("src");
        $(this).parents('.comment-op').after('<div class="VN-input-group-1">\n' +
            '                            <div class="VN-input-group-1-user">\n' +
            '                                <div class="user-header">\n' +
            '                                    <img src="' + img_url + '" width="30" height="30" alt="">\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="VN-input-item">\n' +
            '                                <input type="text" value="" class="group-1-input">\n' +
            '                                <div class="emojiBtn">\n' +
            '                                    <img src="/static/images/emojiButton.png" alt="">\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <button class="group-1-button" id="reply"><img src="/static/images/submit.png" alt=""></button>\n' +
            '                        </div>')
    }

});

// 投票弹窗
$(document).on('click', '.vote', function () {
    layer.open({
        type: 1,
        title: 'Tiến hành bỏ phiếu ?',
        skin: 'layer-ext-VN-skin-1',
        area: '53rem',
        shade: [0.3, '#000'],
        content: '<div style="padding: 1.5rem">\n' +
            '    <div class="VN-input-group">\n' +
            '        <textarea name="" rows="5" class="textarea_2" id="votetitle"></textarea>\n' +
            '        <div class="VN-input-icon-box icon-box-1">\n' +
            '            <div class="VN-icon-group">\n' +
            '                <div class="emojiBtn">\n' +
            '                    <svg t="1583835608479" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2284" data-spm-anchor-id="a313x.7781069.0.i1" width="22" height="22">\n' +
            '                        <path d="M324.8 440c34.4 0 62.4-28 62.4-62.4s-28-62.4-62.4-62.4-62.4 28-62.4 62.4 28 62.4 62.4 62.4z m374.4 0c34.4 0 62.4-28 62.4-62.4s-28-62.4-62.4-62.4-62.4 28-62.4 62.4 28 62.4 62.4 62.4zM340 709.6C384 744 440.8 764.8 512 764.8s128-20.8 172-55.2c26.4-21.6 42.4-42.4 50.4-58.4 6.4-12 0.8-27.2-11.2-33.6s-27.2-0.8-33.6 11.2c-0.8 1.6-3.2 6.4-8 12-7.2 10.4-17.6 20-28.8 29.6-34.4 28-80.8 44.8-140.8 44.8s-105.6-16.8-140.8-44.8c-12-9.6-21.6-20-28.8-29.6-4-5.6-7.2-9.6-8-12-6.4-12-20.8-17.6-33.6-11.2s-17.6 20.8-11.2 33.6c8 16 24 36.8 50.4 58.4z"\n' +
            '                              fill="#eaad40" p-id="2285" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path>\n' +
            '                        <path d="M512 1010.4c-276.8 0-502.4-225.6-502.4-502.4S235.2 5.6 512 5.6s502.4 225.6 502.4 502.4-225.6 502.4-502.4 502.4zM512 53.6C261.6 53.6 57.6 257.6 57.6 508s204 454.4 454.4 454.4 454.4-204 454.4-454.4S762.4 53.6 512 53.6z" fill="#eaad40" p-id="2286"\n' +
            '                              data-spm-anchor-id="a313x.7781069.0.i0" class="selected"></path>\n' +
            '                    </svg>\n' +
            '                </div>\n' +
            '                <div class="image">\n' +
            '                    <svg t="1583836028975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4184" width="22" height="22">\n' +
            '                        <path d="M853.333333 955.733333H170.666667c-66.030933 0-102.4-36.369067-102.4-102.4V170.666667c0-66.030933 36.369067-102.4 102.4-102.4h682.666666c66.030933 0 102.4 36.369067 102.4 102.4v682.666666c0 66.030933-36.369067 102.4-102.4 102.4zM102.4 775.0656V853.333333c0 47.223467 21.0432 68.266667 68.266667 68.266667h682.666666c47.223467 0 68.266667-21.0432 68.266667-68.266667v-78.267733l-324.266667-324.266667L450.798933 597.333333l73.2672 73.2672a17.0496 17.0496 0 1 1-24.132266 24.132267L341.333333 536.132267l-238.933333 238.933333zM597.333333 409.6c4.369067 0 8.738133 1.672533 12.066134 5.000533L921.6 726.801067V170.666667c0-47.223467-21.0432-68.266667-68.266667-68.266667H170.666667c-47.223467 0-68.266667 21.0432-68.266667 68.266667v556.1344l226.8672-226.8672a17.0496 17.0496 0 0 1 24.132267 0L426.666667 573.201067l158.600533-158.600534A17.015467 17.015467 0 0 1 597.333333 409.6z m-256-51.2c-27.904 0-52.343467-10.2912-72.6528-30.600533C248.9344 308.0704 238.933333 283.921067 238.933333 256c0-27.8016 9.949867-52.1728 29.5424-72.448C289.160533 163.549867 313.531733 153.6 341.333333 153.6c27.921067 0 52.0704 10.001067 71.816534 29.7472C433.442133 203.656533 443.733333 228.096 443.733333 256c0 28.023467-10.359467 52.241067-30.805333 72.004267C393.5744 348.040533 369.3568 358.4 341.333333 358.4z m0-170.666667c-18.8928 0-34.850133 6.519467-48.708266 19.950934C279.586133 221.149867 273.066667 237.1072 273.066667 256c0 18.7904 6.4512 34.389333 19.746133 47.650133C306.688 317.525333 322.542933 324.266667 341.333333 324.266667c18.670933 0 34.184533-6.673067 47.4624-20.394667C402.926933 290.184533 409.6 274.670933 409.6 256c0-18.7904-6.741333-34.645333-20.599467-48.520533C375.722667 194.184533 360.123733 187.733333 341.333333 187.733333z"\n' +
            '                              p-id="4185" fill="#eaad40"></path>\n' +
            '                    </svg>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '<div style="display: flex;flex-direction: column">' +
            '        <div class="vote-item color-comment">\n' +
            '            <label class="vote-label">Tùy 1 : </label>\n' +
            '            <div class="vote-input-block">\n' +
            '                <input type="text" name="title"  autocomplete="off" class="vote-input">\n' +
            '            </div>\n' +
            '            <div class="vote-op color-comment">\n' +
            '                <div class="vote-delete"><svg t="1584608642461" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3294" width="30" height="30"><path d="M204.8 477.87008h614.4v68.27008H204.8z" p-id="3295"></path></svg></div>\n' +
            '                <div class="vote-add"><svg t="1584608794231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3572" width="30" height="30"><path d="M819.2 477.87008H546.12992V204.8h-68.25984v273.07008H204.8v68.27008h273.07008V819.2h68.25984V546.14016H819.2z" p-id="3573"></path></svg></div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="vote-item color-comment">\n' +
            '            <label class="vote-label">Tùy 2 : </label>\n' +
            '            <div class="vote-input-block">\n' +
            '                <input type="text" name="title"  autocomplete="off" class="vote-input">\n' +
            '            </div>\n' +
            '            <div class="vote-op color-comment">\n' +
            '                <div class="vote-delete"><svg t="1584608642461" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3294" width="30" height="30"><path d="M204.8 477.87008h614.4v68.27008H204.8z" p-id="3295"></path></svg></div>\n' +
            '                <div class="vote-add"><svg t="1584608794231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3572" width="30" height="30"><path d="M819.2 477.87008H546.12992V204.8h-68.25984v273.07008H204.8v68.27008h273.07008V819.2h68.25984V546.14016H819.2z" p-id="3573"></path></svg></div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '</div>' +
            '        <div style="display: flex;justify-content: flex-end">\n' +
            '            <a class="VN-input-button-3 color-white" id="submitvote" onclick="submitVote()">Submit</a></div>\n' +
            '    </div>\n' +
            '</div>'
    });
});

// 增加投票选项
$(document).on('click', '.vote-add', function () {
    length = $(this).parents('.vote-item').parent('div').find('.vote-item').length + 1;
    $(this).parents('.vote-item').parent('div').append('<div class="vote-item color-comment">\n' +
        '            <label class="vote-label">Tùy ' + length + ' : </label>\n' +
        '            <div class="vote-input-block">\n' +
        '                <input type="text" name="title"  autocomplete="off" class="vote-input">\n' +
        '            </div>\n' +
        '            <div class="vote-op color-comment">\n' +
        '                <div class="vote-delete"><svg t="1584608642461" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3294" width="30" height="30"><path d="M204.8 477.87008h614.4v68.27008H204.8z" p-id="3295"></path></svg></div>\n' +
        '                <div class="vote-add"><svg t="1584608794231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3572" width="30" height="30"><path d="M819.2 477.87008H546.12992V204.8h-68.25984v273.07008H204.8v68.27008h273.07008V819.2h68.25984V546.14016H819.2z" p-id="3573"></path></svg></div>\n' +
        '            </div>\n' +
        '        </div>\n')
});

// 删除投票选项
$(document).on('click', '.vote-delete', function () {
    if ($(this).parents('.vote-item').parent().find('.vote-item').length != 1) {
        dom = $(this).parents('.vote-item').parent();
        $(this).parents('.vote-item').remove();
        dom.find('.vote-item').each(function (index, element) {
            $(this).find('.vote-label').text('Tùy ' + (index + 1) + ':')
        })
    }

});


function getImgNaturalDimensions(oImg, callback) {
    var nWidth, nHeight;
    if (!oImg.naturalWidth) { // 现代浏览器

        nWidth = oImg.naturalWidth;
        nHeight = oImg.naturalHeight;
        if (nWidth > 1920) {
            nWidth = 1800
        }
        if (nHeight > 1080) {
            nHeight = 900
        }
        callback({w: nWidth, h: nHeight});

    } else { // IE6/7/8
        var nImg = new Image();

        nImg.onload = function () {
            nWidth = nImg.width;
            nHeight = nImg.height;
            if (nWidth > 1920) {
                nWidth = 1800
            }
            if (nHeight > 1080) {
                nHeight = 900
            }
            callback({w: nWidth, h: nHeight});
        }
        nImg.src = oImg.src;
    }
}




$(document).on('click','.alert-img',function () {
        var self = this;
        getImgNaturalDimensions($(self).get(0), function (dimensions) {
            console.log(dimensions)
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                shadeClose: true,
                scrollbar: false,
                area: [dimensions.w + 'px', dimensions.h + 'px'],
                content: "<img src='"+$(self)[0].src+"' style='width: 100%;height: 100%;object-fit: cover'>"
            })
        });

    }
)

// 用户投票
$(document).on('click',".vote-choose", function () {
    console.log('开始')
    let vote_box = $(this).parent('.vote-box')
    let isvote = vote_box.attr('isvote')
    let vote_choose = $(this)
    console.log('是否投过票：',isvote)
    if (isvote=='True'||isvote=='true') {
        console.log('投过票了不能重复投票')
        layer.msg('<div style="color: black;text-align: center;">' + '不能重复投票</div>')
    } else if (isvote=='False'||isvote=='false') {
        console.log('没有投票现在可以投票')
        vote_box.attr('isvote', 'True');
        let votechoice_id = $(this).attr('vote');   // 投票选项ID
        let blog_id = $(this).parents('.user-dynamic-box').attr('data');    // blog_id
        let allVote = $(this).siblings('#allVote')  // 投票总数
        console.log('blog_id:',blog_id)
        console.log('投票选项ID：',votechoice_id)
        $.ajax({
            type:'post',
            url:'/updatevote/',
            data:{
                'votechoice_id':votechoice_id,
                'blog_id':blog_id
            },
            success:function (result) {
                console.log(result)
                if (result.success){
                    // 投票后总票数加1
                    let allVoteNum = parseInt(allVote.text()) + 1
                    allVote.text(allVoteNum+" Person Vote")
                    // 投票后选项票数加1
                    let vote_num = parseInt(vote_choose.children('.vote-choose-num').text())+1
                    vote_choose.children('.vote-choose-num').text(vote_num)
                    // 投票后动画效果
                    vote_choose.find('.vote-percent').removeClass('unchecked');
                    vote_choose.find('.vote-percent').addClass('checked', true);
                    vote_choose.parent('.vote-box').find('.vote-choose').each(function () {
                        let num = $(this).children('.vote-choose-num').text()
                        num = parseInt(num)     // 选项票数
                        $(this).find('.vote-choose-num').css('display', 'block');
                        $(this).find('.vote-percent').css({
                            width: (num/allVoteNum)*100 + "%",
                            transition: 'width 2s'
                        })
                    })
                }else{
                    layer.msg('<div style="color: black;text-align: center;">' + '不能重复投票</div>')
                }
            }
        })

    }
})

// 用户点赞
$(document).on('click', '.like', function () {
    let blogId = $(this).parents('.user-dynamic-box').attr('data');
    let data = $(this).attr('data')
    if (data=='true') {
        $(this).find('img').attr('src', "/static/images/like1.png")
        $(this).attr('data', 'false')
        let numLike = parseInt($(this).find('span').text());
        $(this).find('span').text(numLike - 1)
        let islike = 0;
        $.ajax({
            type: 'post',
            url: '/updatelike/',
            data: {
                'blog_id': blogId,
                'islike': islike
            },
            success:function (result) {
                if (result.success==false){
                    layer.msg('<div style="color: black;text-align: center;">' + '请登录</div>')
                }
            }
        })
    } else {
        $(this).find('img').attr('src', "/static/images/like2.png");
        $(this).attr('data', 'true')
        let numLike = parseInt($(this).find('span').text());
        $(this).find('span').text(numLike + 1)
        let islike = 1;
        $.ajax({
            type: 'post',
            url: '/updatelike/',
            data: {
                'blog_id': blogId,
                'islike': islike
            },
            success:function (result) {
                if (result.success==false){
                    layer.msg('<div style="color: black;text-align: center;">' + '请登录</div>')
                }
            }
        })
    }

})

// 用户收藏
$(document).on('click', '.collect', function () {
    let blogId = $(this).parents('.user-dynamic-box').attr('data');
    let data = $(this).attr('data')
    if (data=='true') {
        $(this).find('img').attr('src', "/static/images/collcet1.png")
        $(this).attr('data', 'false')
        let iscollect = 0;
        $.ajax({
            type: 'post',
            url: '/updatecollect/',
            data: {
                'blog_id': blogId,
                'iscollect': iscollect
            },
            success:function (result) {
                if (result.success==false){
                    layer.msg('<div style="color: black;text-align: center;">' + '请登录</div>')
                }
            }
        })
    } else if (data=='false') {
        $(this).find('img').attr('src', "/static/images/collect2.png");
        $(this).attr('data', 'true')
        let iscollect = 1;
        $.ajax({
            type: 'post',
            url: '/updatecollect/',
            data: {
                'blog_id': blogId,
                'iscollect': iscollect
            },
            success:function (result) {
                if (result.success==false){
                    layer.msg('<div style="color: black;text-align: center;">' + '请登录</div>')
                }
            }
        })
    }

})

// 上传图片弹框
function showModal() {
    $('#myModal').modal('show')
}
// 导航栏状态
$(".navibar-top").find("li").each(function () {
    var a = $(this).find("a:first")[0];
    if ($(a).attr("href") === location.pathname) {
        $(this).addClass("active");
    } else {
        $(this).removeClass("active");
    }
});
// 转到个人中心页面
function toUser() {
    location.href = '/user/';
}
// 发布投票按钮
function submitVote() {
    console.log('開始');
    let content = $('#content').val()
    let votetitle = $('#votetitle').val()
    let voteoption = new Array();
    $(".vote-input").each(function () {
        voteoption.push($(this).val());
    })
    console.log(content)
    console.log(votetitle)
    console.log(voteoption)
    $.ajax({
        type: 'post',
        url: '/publish/',
        data: {
            "content": content,
            "votetitle": votetitle,
            "votedata": voteoption
        },
        success: function (result) {
            console.log(result);
            layer.closeAll();
            if ($('.right-user-dynamic-scroll-box').length){
                     location.href = '/'
            }else{
                location.href = '/group/'
            }
        }
    })
}

// 上传图片弹窗
var tipsIndex = null;   //  上传图片弹出层的索引
$('.image').on('click', function () {
    var that = this
    var content = '<form action="" method="post" enctype="multipart/form-data">' +
        '<div id="imgBox">' +
        '<div class="addImg">' +
        '<input type="file" id="file" accept="image/*" class="file">' +
        '<div class="addIcon">' +
        '<span>+</span>' +
        '</div>' +
        '</div>' +
        '<div class="imgList" id="imgList"></div>' +
        '</div>' +
        '</form>'
    tipsIndex = layer.tips(content, that, {
        time: 0,
        tips: [3, '#B3B3B3'],
        area: ['500px', '300px'],
        closeBtn: 2,
    })

})

// 增加图片按钮
var imageList = new Array();
var formData = new FormData();
$(document).on('change', '#file', function () {
    if (imageList.length > 3) {
        content = '<div style="color: black;text-align: center;">' + '最多上传四张图片</div>'
        layer.msg(content);
    } else {
        // console.log($('#file'))
        var file = $('#file')[0].files[0]
        imageList.push(file)
        // console.log(file)

        formData.append('img', file)
        console.log(formData.getAll('img'), typeof formData.getAll('img'))
        var fd = new FileReader()
        fd.readAsDataURL(file)
        fd.onload = function () {
            $('#imgList').append("<div class='imgDiv'>" +
                "<img data='" + file.name + "' style='height: 100px;width: 100px;' src='" + this.result + "'>" +
                "<div class='cover' id='delbtn'>delete</div>" +
                "</div>")
        }
        // console.log(imageList,imageList.length)
    }

})
// 删除图片按钮
$(document).on('click', '#delbtn', function () {
    $(this).parent('.imgDiv').remove();
    var data = $(this).prev().attr('data');
    for (let item of formData.values()) {
        console.log('formdata:', item)
    }
    formData.delete('img');

    console.log(data);
    imageList.forEach(function (value, index, array) {
        if (value.name == data) {
            console.log('删除', value.name, index)
            array.splice(index, 1)
        } else {
            formData.append('img', value);
        }
    })
    for (let img of imageList) {
        console.log('imageList:', img);
    }
    for (let item of formData.values()) {
        console.log('formdata:', item)
    }
})
// 发布blog按钮
$('#submitblog').on('click', function () {
    let content =$(this).parents('.VN-input-group').find('#content').val();
    formData.append('content', content)
    $.ajax({
        url: "/publish/",
        type: "post",
        processData: false,
        data: formData,
        contentType: false,
        success: function (e) {
            if (e.success) {
                layer.close(tipsIndex);

                layer.msg('<div style="color: black;text-align: center;">' + '发布成功</div>');
                if ($('.right-user-dynamic-scroll-box').length){
                     location.href = '/'
                }else{
                    location.href = '/group/'
                }
            }else{
                layer.msg('<div style="color: black;text-align: center;">' + e.msg +'</div>');
            }
        }
    })
})

//  发布一级评论

$(document).on('click','#discuss', function () {
    let btn = $(this)
    let input = btn.siblings('.VN-input-item').children('input')
    let content = btn.siblings('.VN-input-item').children('input').val()   // 评论框的内容
    let blogId = $(this).parents('.user-dynamic-box').attr('data'); // blogID
    let discuss = btn.parent('.VN-input-group-1').siblings('.dynamic-info').find('.discuss')    // 评论数图标
    let all_discuss_num =  parseInt(discuss.children('span').text())    // 评论数
    if (content==''){
        layer.msg('<div style="color: black;text-align: center;">' + '请输入内容</div>');
    }else {
        $.ajax({
        type: 'post',
        url: '/addfirstcomment/',
        data: {
            "content": content,
            "blog_id": blogId
        },
        success: function (e) {
            if (e.success == true) {

                let html = '<div class="dynamic-comment-group fbc-box" data="' + e.commentId + '" uid="'+e.userId+'">\n' +
                    '                    <div class="user-header">\n' +
                    '                        <img src="/media/' + e.userImg + '" width="40" height="40" alt="">\n' +
                    '                    </div>\n' +
                    '                    <div class="comment-data color-comment">\n' +
                    '                        <div class="comment-text">\n' +
                    '                            <span class="content-user-name">' + e.userName + '</span>\n' +
                    '                            <span>:&nbsp;</span>\n' +
                    '                            <div class="delete-comment" id="delete-fbc"><span>Delete</span></div>\n'+
                    '                            <div>' + e.comment + '</div></div>\n' +
                    '                        <div class="comment-op">\n' +
                    '                            <div class="content-time">' + timeformat(e.createDate) + '</div>\n' +
                    '                            <div class="fbc-num">\n' +
                    '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                    '                                  <span>(0)</span>\n' +
                    '                            </div>\n'+
                    '                            <div class="reply">Reply</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>'
                // 清空评论框
                input.val('')
                // 插入新增一级评论
                btn.parent('.VN-input-group-1').siblings('.dynamic-comment-box').prepend(html);
                // 评论数加1
                all_discuss_num += 1
                discuss.children('span').text(all_discuss_num)
                // 成功弹窗
                layer.msg('<div style="color: black;text-align: center;">' + '评论成功</div>')
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + '未登录</div>')
            }
        }
    })
    }

})

//  发布二级评论
$(document).on('click', '#reply', function () {
    let btn = $(this)
    let input = $(this).siblings('.VN-input-item').children('input')    // 评论框
    let content = input.val();  // 评论内容
    let blog_id = $(this).parents('.user-dynamic-box').attr('data');    // blog ID
    let first_id = $(this).parents('.fbc-box').attr('data');  // 一级评论ID
    let discuss = btn.parents('.dynamic-comment-box').siblings('.dynamic-info').find('.discuss')    // 评论数图标
    let fbc_icon = null     // 一级评论下的二级评论图标
    if(btn.parents('.VN-input-group-1').siblings('.comment-op').find('span').text()){
        fbc_icon = btn.parents('.VN-input-group-1').siblings('.comment-op').find('.fbc-num')
    }else {
        fbc_icon = btn.parents('.sbc-box').siblings('.comment-op').find('.fbc-num')
    }
    let all_discuss_num =  parseInt(discuss.children('span').text())    // 评论数
    let fbc_num = parseInt(fbc_icon.children('span').text().slice(1,-1))        // 一级评论下的二级评论的数量
    let dom = btn.parents('.dynamic-comment-group:eq(-1)').children('.comment-data')
    console.log(dom)
    console.log(dom.find('.more-sbc'))
    if (content==""){
        layer.msg('<div style="color: black;text-align: center;">' + '请输入内容</div>');
    }else{
        $.ajax({
        type: 'post',
        url: '/addsecondcomment/',
        data: {
            'content': content,
            'blog_id': blog_id,
            'first_id': first_id
        },
        success: function (result) {
            console.log('发布二级评论：',result);
            let img_url = $('div[id="user-header"]>img').attr("src");   // 用户头像url
            let user_name = $('div[id="user-name"]>span').text();       // 用户名称
            let reply_name = btn.parent('.VN-input-group-1').siblings('.comment-text').children('.content-user-name').text()     // 回复用户名称
            if (result.success) {
                let html = '<div class="dynamic-comment-group sbc-box" data="'+result.id+'" uid="'+result.userId+'">\n' +
                    '           <div class="user-header">\n' +
                    '               <img src="' + img_url + '" width="30" height="30" alt="">\n' +
                    '           </div>\n' +
                    '           <div class="comment-data color-comment">\n' +
                    '                <div class="comment-text">\n' +
                    '                     <span class="content-user-name">' + user_name + '</span>\n' +
                    '                     <span>to ' + reply_name + ':&nbsp;</span>\n' +
                    '                     <div class="delete-comment" id="delete-sbc">\n' +
                    '                           <span>Delete</span>\n'+
                    '                     </div>\n'+
                    '                     <div>' + result.comment + '</div>\n' +
                    '                </div>\n' +
                    '                <div class="comment-op">\n' +
                    '                      <div class="content-time">' + timeformat(result.create_date) + '</div>\n' +
                    '                          <div class="reply">Reply</div>\n' +
                    '                </div>\n' +
                    '            </div>'


                // 清空评论框
                input.val('')
                // 关闭输入框
                btn.parent('.VN-input-group-1').remove()
                // 插入新增二级评论
                if (dom.find('.more-sbc').length!=0){
                    $('.more-sbc').before(html)
                }else{
                    dom.append(html)
                }
                // 评论数加1
                all_discuss_num += 1
                discuss.children('span').text(all_discuss_num)
                fbc_num += 1
                fbc_num = `(${fbc_num})`
                fbc_icon.children('span').text(fbc_num)

                // 成功弹窗
                layer.msg('<div style="color: black;text-align: center;">' + '评论成功</div>')
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + '未登录</div>')
            }

        }
    })
    }
})


// 全局变量 page limit
group_page = 1
group_limit = 10

// group 数据初始化
function initGroup() {
    $.ajax({
        'type':'get',
        'url':'/getgrouplist/',
        success:function (res) {
            console.log('group初始化:',res)
            if(res.success){
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#main-left')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="'+data.userId+'"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header" >\n' +
                        '            <img src="/media/' + data.header + '" width="40" height="40" alt="" >\n' +
                        '        </div>')
                    info.append(header)
                    let content = $('<div class="dynamic-content"></div>')
                    info.append(content)
                    let content_header = $('<div class="content-header">\n' +
                        '                <div class="content-user-data">\n' +
                        '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                        '                    <div class="content-time">' + timeformat(data.pub_date) + '</div>\n' +
                        '                </div>\n' +
                        '            </div>')
                    // 判断是否是自己发的动态
                    if (data.ismine){
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<span>Delete</span>\n' +
                            '</div>' +
                            '</div>')
                        content_header.append(content_account_status)
                    }else{
                        let content_account_status = ('<div class="content-account-status">\n' +
                        '<div class=content-facebook">\n' +
                        '<img src="/static/images/fb.png" alt="">\n' +
                        '</div>\n' +
                        '</div>\n')
                        content_header.append(content_account_status)
                    }

                    let content_data = $('<div class="content-data"></div>')
                    let content_text = $('<div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor){
                        content_text.addClass('bg-color')
                        content_text.css('background-color',data.bgcolor)
                    }
                    content_data.append(content_text)
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/' + img + '" class="alert-img" alt="">')
                            content_img.append(image)
                        }
                        content_data.append(content_img)
                    }
                    if (data.type == 1) {
                        let vote_box = $('<div class="vote-box" isvote="'+data.isallvote+'"></div>')
                        let vote_title = $('<div class="vote-title color-comment">' + data.votetitle + '</div>')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Person Vote</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="'+vote_item.id+'" data="'+vote_item.isVote+'">\n' +
                                    '                     <div class="vote-choose-txt">' +vote_item.content+ '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" >' + vote_item.num + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote){
                                    vote_choose_num.css('display','block')
                                    let percent = (parseInt(vote_item.num)/parseInt(data.votenum))*100
                                    let width = percent+'%'
                                    vote_percent.css('width',width)
                                    if (vote_item.isVote){
                                        vote_percent.addClass('checked')
                                    }else{
                                        vote_percent.addClass('unchecked')
                                    }
                                    vote_choose.append(vote_choose_num,vote_percent)
                                }else{
                                    vote_percent.addClass('unchecked')
                                    vote_choose_num.css('display','none')
                                    vote_percent.css('width','0%')
                                    vote_choose.append(vote_choose_num,vote_percent)
                                }

                                vote_box.append(vote_choose)
                            }
                        }
                        vote_box.append(all_vote)
                        content_data.append(vote_box)
                    }
                    let content_op = $('<div class="content-op"></div>')
                    let collect = $('<div class="collect"></div>')
                    if (data.iscollect) {
                        collect.attr('data','true')
                        let img = $('<img src="/static/images/collect2.png" alt="">')
                        let span = $('<span class="color-comment">Collect</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data','false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Collect</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss" id="all-comments">\n' +
                        '               <img src="/static/images/comment1.png" alt="">\n' +
                        '               <span class="color-comment">' + data.commentnum + '</span>\n' +
                        '            </div>')
                    let like = $('<div class="like"></div>')
                    if (data.islike) {
                        like.attr('data','true')
                        let img = $('<img src="/static/images/like2.png" alt="" >')
                        let likenum = $('<span class="color-comment">'+data.likenum+'</span>')
                        like.append(img,likenum)
                    } else {
                        like.attr('data','false')
                        let img = $('<img src="/static/images/like1.png" alt="" >')
                        let likenum = $('<span class="color-comment">'+data.likenum+'</span>')
                        like.append(img,likenum)
                    }
                    content_op.append(collect, discuss, like)
                    content.append(content_header, content_data, content_op)
                    let VN_input = $('<div class="VN-input-group-1">\n' +
                        '        <div class="VN-input-group-1-user">\n' +
                        '            <div class="user-header">\n' +
                        '                <img src="' + headerUrl + '" width="30" height="30" alt="">\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <div class="VN-input-item">\n' +
                        '            <input type="text" value="" class="group-1-input commentBox">\n' +
                        '            <div class="emojiBtn">\n' +
                        '                <img src="/static/images/emojiButton.png" alt="">\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <button class="group-1-button" id="discuss"><img src="/static/images/submit.png" alt=""></button>\n' +
                        '    </div>')
                    parentDiv.append(VN_input)
                    dom.append(parentDiv)
                    let comment_box = $('<div class="dynamic-comment-box"></div>')
                    parentDiv.append(comment_box)
                    for (let fbc of data.commentData.first_comment){
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="'+fbc.userId+'"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        if (fbc.ismine){
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                            fbc_comment_text.append(fbc_delete)
                        }
                        let fbc_content = $('<div>' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>('+fbc.sbc_num+')</span>\n' +
                            '                            </div>\n'+
                            '                            <div class="reply">Reply</div>\n' +
                            '                       </div>')
                        fbc_commentDate.append(fbc_comment_text,fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'" uid="'+sbc.userId+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                if (sbc.ismine){
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                    sbc_comment_text.append(sbc_comment_delete)
                                }
                                let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Reply</div>\n' +
                                    '                   </div>')
                                sbc_comment_data.append(sbc_comment_text,sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                        }
                        if (fbc.sbc_num>2){
                            let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/more2.png" alt="">&nbsp;&nbsp;<span>('+(fbc.sbc_num-2)+')</span></div>')
                            fbc_commentDate.append(moreSBCBtn)
                        }
                    }
                    comment_box.append(fbc_box)
                }
                    if (data.fbc_num > 5){
                    let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                        '<img src="/static/images/more1.png" alt="">\n' +
                        '</div>')
                    comment_box.append(moreFBCBtn)
                }
            }


                let moreBlogBtn = $('<div class="main-data-div">\n' +
                        '<div class="main-data-info">\n' +
                        '<div class="main-footer cursor-pointer"  id="groupMoreGroup" ">MORE INFORMATION</div>\n' +
                        '</div>\n' +
                        '</div>')
                dom.append(moreBlogBtn)
            }
        }
    })
}

// group 加载更多blog
$(document).on('click','#groupMoreGroup',function () {
    let _this = $(this)
    let offset = _this.parents('#main-left').find('.user-dynamic-box').length
    let moreBtn = _this.parents('.main-data-div')
    $.ajax({
        type:'get',
        url:'/getgrouplist/?page='+group_page+'&limit='+group_limit+'&offset='+offset,
        success:function (res) {
            console.log('加载更多group:',res)
            if(res.success){
                moreBtn.remove()
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#main-left')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="'+data.userId+'"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/' + data.header + '" width="40" height="40" alt="">\n' +
                        '        </div>')
                    info.append(header)
                    let content = $('<div class="dynamic-content"></div>')
                    info.append(content)
                    let content_header = $('<div class="content-header">\n' +
                        '                <div class="content-user-data">\n' +
                        '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                        '                    <div class="content-time">' + timeformat(data.pub_date) + '</div>\n' +
                        '                </div>\n' +
                        '            </div>')
                    // 判断是否是自己发的动态
                    if (data.ismine){
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<span>Delete</span>\n' +
                            '</div>' +
                            '</div>')
                        content_header.append(content_account_status)
                    }else{
                        let content_account_status = ('<div class="content-account-status">\n' +
                        '<div class=content-facebook">\n' +
                        '<img src="/static/images/fb.png" alt="">\n' +
                        '</div>\n' +
                        '</div>\n')
                        content_header.append(content_account_status)
                    }

                    let content_data = $('<div class="content-data"></div>')
                    let content_text = $('<div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor){
                        content_text.addClass('bg-color')
                        content_text.css('background-color',data.bgcolor)
                    }
                    content_data.append(content_text)
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/' + img + '" class="alert-img" alt="">')
                            content_img.append(image)
                        }
                        content_data.append(content_img)
                    }
                    if (data.type == 1) {
                        let vote_box = $('<div class="vote-box" isvote="'+data.isallvote+'"></div>')
                        let vote_title = $('<div class="vote-title color-comment">' + data.votetitle + '</div>')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Person Vote</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="'+vote_item.id+'" data="'+vote_item.isVote+'">\n' +
                                    '                     <div class="vote-choose-txt">' +vote_item.content+ '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" >' + vote_item.num + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote){
                                    vote_choose_num.css('display','block')
                                    let percent = (parseInt(vote_item.num)/parseInt(data.votenum))*100
                                    let width = percent+'%'
                                    vote_percent.css('width',width)
                                    if (vote_item.isVote){
                                        vote_percent.addClass('checked')
                                    }else{
                                        vote_percent.addClass('unchecked')
                                    }
                                    vote_choose.append(vote_choose_num,vote_percent)
                                }else{
                                    vote_percent.addClass('unchecked')
                                    vote_choose_num.css('display','none')
                                    vote_percent.css('width','0%')
                                    vote_choose.append(vote_choose_num,vote_percent)
                                }

                                vote_box.append(vote_choose)
                            }
                        }
                        vote_box.append(all_vote)
                        content_data.append(vote_box)
                    }
                    let content_op = $('<div class="content-op"></div>')
                    let collect = $('<div class="collect"></div>')
                    if (data.iscollect) {
                        collect.attr('data','true')
                        let img = $('<img src="/static/images/collect2.png" alt="">')
                        let span = $('<span class="color-comment">Collect</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data','false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Collect</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss" id="all-comments">\n' +
                        '               <img src="/static/images/comment1.png" alt="">\n' +
                        '               <span class="color-comment">' + data.commentnum + '</span>\n' +
                        '            </div>')
                    let like = $('<div class="like"></div>')
                    if (data.islike) {
                        like.attr('data','true')
                        let img = $('<img src="/static/images/like2.png" alt="" >')
                        let likenum = $('<span class="color-comment">'+data.likenum+'</span>')
                        like.append(img,likenum)
                    } else {
                        like.attr('data','false')
                        let img = $('<img src="/static/images/like1.png" alt="" >')
                        let likenum = $('<span class="color-comment">'+data.likenum+'</span>')
                        like.append(img,likenum)
                    }
                    content_op.append(collect, discuss, like)
                    content.append(content_header, content_data, content_op)
                    let VN_input = $('<div class="VN-input-group-1">\n' +
                        '        <div class="VN-input-group-1-user">\n' +
                        '            <div class="user-header">\n' +
                        '                <img src="' + headerUrl + '" width="30" height="30" alt="">\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <div class="VN-input-item">\n' +
                        '            <input type="text" value="" class="group-1-input commentBox">\n' +
                        '            <div class="emojiBtn">\n' +
                        '                <img src="/static/images/emojiButton.png" alt="">\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <button class="group-1-button" id="discuss"><img src="/static/images/submit.png" alt=""></button>\n' +
                        '    </div>')
                    parentDiv.append(VN_input)
                    dom.append(parentDiv)
                    let comment_box = $('<div class="dynamic-comment-box"></div>')
                    parentDiv.append(comment_box)
                    for (let fbc of data.commentData.first_comment){
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="'+fbc.userId+'"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        if (fbc.ismine){
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                            fbc_comment_text.append(fbc_delete)
                        }
                        let fbc_content = $('<div>' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>('+fbc.sbc_num+')</span>\n' +
                            '                            </div>\n'+
                            '                            <div class="reply">Reply</div>\n' +
                            '                       </div>')
                        fbc_commentDate.append(fbc_comment_text,fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'" uid="'+sbc.userId+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                if (sbc.ismine){
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                    sbc_comment_text.append(sbc_comment_delete)
                                }
                                let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Reply</div>\n' +
                                    '                   </div>')
                                sbc_comment_data.append(sbc_comment_text,sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                        }
                        if (fbc.sbc_num>2){
                            let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/more2.png" alt="">&nbsp;&nbsp;<span>('+(fbc.sbc_num-2)+')</span></div>')
                            fbc_commentDate.append(moreSBCBtn)
                        }
                    }
                    comment_box.append(fbc_box)
                }
                if (res.fbc_num > 5){
                    let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                        '<img src="/static/images/more1.png" alt="">\n' +
                        '</div>')
                    comment_box.append(moreFBCBtn)
                }
            }
                dom.append(moreBtn)
                group_page += 1
            }
        }
    })
})

// 删除自己的动态
$(document).on('click','.delete-group',function () {
    console.log('开始删除动态');
    let _this = $(this)
    let blogId = _this.parents('.user-dynamic-box').attr('data');
    $.ajax({
        type:'post',
        url:'/deletegroup/',
        data:{
          "blogId":blogId
        },
        success:function (result) {
            if (result.success){
                _this.parents('.user-dynamic-box').remove()
                layer.msg('<div style="color: black;text-align: center;">' + result.msg+'</div>')
            }else{
                layer.msg('<div style="color: black;text-align: center;">' + '网络忙，删除出错</div>')
            }
        }
    });
})

// 动态 评论 时间格式化
function timeformat(timestr) {
    let oldtime = new Date(timestr);
    let current_time = new Date();
    let lefttime = current_time.getTime()-oldtime.getTime()

    let min = 60 * 1000;
    let hour = min * 60;

    let lefthour = Math.floor(lefttime/hour)
    let leftminute = Math.floor(lefttime/min)

    if (lefttime<(24*60*60*1000)){
        if (lefttime < 60*1000){
            return '刚刚'
        }else if (lefthour<24&&lefthour>0){
            return `${lefthour}小时之前`
        }else if (leftminute<60&&leftminute>0){
            return `${leftminute}分钟之前`
        }else{
            return '刚刚'
        }
    }else{
        return `${oldtime.getFullYear()}/${oldtime.getMonth()+1}/${oldtime.getDate()} ${checktime(oldtime.getHours())}:${checktime(oldtime.getMinutes())}:${checktime(oldtime.getSeconds())}`
    }
}

// 删除自己的一级评论
$(document).on('click','#delete-fbc',function () {
    let _this = $(this)
    let fbc_id = _this.parents('.fbc-box').attr('data')
    let all_node = _this.parents('.dynamic-comment-box').siblings('.dynamic-info').find('#all-comments span')
    let all_num = all_node.text()
    let sbc_num = parseInt(_this.parents('.comment-text').siblings('.comment-op').find('.fbc-num span').text().slice(1,-1))
    $.ajax({
        type:'post',
        url:'/deletecomment/',
        data:{
          'id' : fbc_id,
          'type' : '1'
        },
        success:function (res) {
            if (res){
                _this.parents('.fbc-box').remove()
                all_num = all_num-sbc_num-1
                all_node.text(all_num)
                layer.msg('<div style="color: black;text-align: center;">' + res.msg+'</div>')
            }else{
                layer.msg('<div style="color: black;text-align: center;">' + res.msg+'</div>')
            }
        }
    })
})

// 删除自己的二级评论
$(document).on('click','#delete-sbc',function () {
    let _this = $(this)
    let sbc_id = _this.parents('.sbc-box').attr('data')
    let all_node = _this.parents('.dynamic-comment-box').siblings('.dynamic-info').find('#all-comments span')
    let all_num = parseInt(all_node.text())
    let sbc_node = _this.parents('.sbc-box').siblings('.comment-op').find('.fbc-num span')
    let sbc_num = parseInt(sbc_node.text().slice(1,-1))
    console.log(all_num,sbc_num)
    $.ajax({
        type:'post',
        url:'/deletecomment/',
        data:{
          'id' : sbc_id,
          'type' : '2'
        },
        success:function (res) {
            if (res){
                _this.parents('.sbc-box').remove()
                all_num-=1
                sbc_num-=1
                all_node.text(all_num)
                sbc_node.text(sbc_num)
                layer.msg('<div style="color: black;text-align: center;">' + res.msg+'</div>')
            }else{
                layer.msg('<div style="color: black;text-align: center;">' + res.msg+'</div>')
            }
        }
    })
})

// 点击头像 跳转到用户详情页面
$(document).on('click','.user-header',function () {
    let _this = $(this)
    let parentNode = _this.parent('div')
    let uid = null
    console.log(parentNode.attr('class'))
    if (parentNode.hasClass('dynamic-info')){
        console.log('跳转到博主页面')
        uid = parentNode.attr('uid')
        location.href = '/user/userdetail/'+uid
    }else if (parentNode.hasClass('fbc-box')){
        console.log('跳转到1级评论页面')
        uid = parentNode.attr('uid')
        location.href = '/user/userdetail/'+uid
    }else if(parentNode.hasClass('sbc-box')){
        console.log('跳转到2级评论页面')
        uid = parentNode.attr('uid')
        location.href = '/user/userdetail/'+uid
    }
})

// 点击用户名 跳转到用户详情页面
$(document).on('click','.content-user-name',function () {
    let _this = $(this)
    let parentNode = _this.parent('div').parent('div').parent('div')
    if (parentNode.hasClass('dynamic-content')){
        console.log('跳转到博主页面')
        uid = parentNode.parent('div').attr('uid')
        location.href = '/user/userdetail/'+uid
    }else if (parentNode.hasClass('fbc-box')){
        console.log('跳转到1级评论页面')
        uid = parentNode.attr('uid')
        location.href = '/user/userdetail/'+uid
    }else if(parentNode.hasClass('sbc-box')){
        console.log('跳转到2级评论页面')
        uid = parentNode.attr('uid')
        location.href = '/user/userdetail/'+uid
    }
})

