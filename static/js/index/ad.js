// 初始化全局广告
function initGlobalAd() {
    $.ajax({
        type: 'get',
        url: '/ad/globalad/',
        success: function (res) {
            console.log('初始化全局广告：', res)
            // 网站全局 顶部广告
            for (let ad of res.data.top) {
                let img = $('<div class="ad-div global-top"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                setWidth(res.data.top.length, img)
                $('#top').append(img)
            }


            // 网站全局 左侧广告
            for (let ad of res.data.left) {
                let ad_container = $('<div class="global-side-container"></div>')
                let img = $('<div class="ad-div global-ad-side"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                let close_btn = $('<div class="close-ad">&times; close</div>')
                ad_container.append(img, close_btn)
                $('.global-left').append(ad_container)
            }
            // 网站全局 右侧广告
            for (let ad of res.data.right) {
                let ad_container = $('<div class="global-side-container"></div>')
                let img = $('<div class="ad-div global-ad-side"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                let close_btn = $('<div class="close-ad">&times; close</div>')
                ad_container.append(img,close_btn)
                $('.global-right').append(ad_container)
            }
        }
    })
}

// 点击广告跳转url
$(document).on('click', '#ad-img', function () {
    let url = $(this).attr('data-url')
    window.open(url)
})

$(document).on('click', '.mask', function () {
    let url = $(this).siblings('img').attr('data-url')
    window.open(url)
})

// 初始化首页广告
function initIndexAd() {
    $.ajax({
        type: 'get',
        url: '/ad/indexad/',
        success: function (res) {
            console.log('初始化网页首页广告：', res)
            let top_container = $('#main-left-top')
            let right_container = $('#main-right-ad')
            // 顶部
            for (let [key, val] of Object.entries(res.data.top)) {
                let ad_div = $('<div class="ad-container maxw190"></div>')
                for (let ad of val) {
                    let img = $('<div class="ad-div"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length, img)
                    ad_div.append(img)
                }
                top_container.append(ad_div)
            }

            // 右部
            for (let [key, val] of Object.entries(res.data.right)) {
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val) {
                    let img = $('<div class="ad-div"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length, img)
                    ad_div.append(img)
                }
                right_container.append(ad_div)
            }
        }
    })
}


// 初始化日历广告
function initCalendarAd() {
    $.ajax({
        type: 'get',
        url: '/ad/calendarad/',
        success: function (res) {
            console.log('初始化日历广告：', res)
            let top_container = $('#main-left-top')
            let right_container = $('#main-right')
            // 顶部
            let ad_top_container = $('<div class="ad-container"></div>')
            let top_img = $('<div class="ad-div cal-top-ad"><img src="/media/' + res.data.top.img + '" data-url="' + res.data.top.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
            ad_top_container.append(top_img)
            top_container.append(ad_top_container)


            // 右部
            let ad_right_container = $('<div class="col-ad-container"></div>')
            for (let ad of res.data.right) {
                let img = $('<div class="ad-div cal-right-ad"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                ad_right_container.append(img)
            }
            right_container.append(ad_right_container)

        }
    })
}

// 初始化动态广告
function initGroupad() {
    $.ajax({
        type: 'get',
        url: '/ad/groupad/',
        success: function (res) {
            console.log('初始化动态广告：', res)
            let top_container = $('.group-content-ad')
            let right_container = $('#main-right')
            // 顶部
            for (let [key, val] of Object.entries(res.data.top)) {
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val) {
                    let img = $('<div class="ad-div"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length, img)
                    ad_div.append(img)
                }
                top_container.append(ad_div)
            }

            // 右部
            for (let [key, val] of Object.entries(res.data.right)) {
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val) {
                    let img = $('<div class="ad-div"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    setWidth(val.length, img)
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    ad_div.append(img)
                }
                right_container.append(ad_div)
            }
        }
    })
}

// 初始化快讯内固定广告
function initFastInfoAd() {

    $('#main-left-data').find('.fast-info-ad').remove()
    let div = $('#main-left-data').find('.main-data-info')
    let fast_6 = $(div[5])
    let fast_11 = $(div[10])
    let fast_16 = $(div[15])
    let fast_21 = $(div[20])
    if (fast_6.find('.fast-info-ad').length || fast_11.find('.fast-info-ad').length || fast_16.find('.fast-info-ad').length || fast_21.find('.fast-info-ad').length) {
        return null

    } else {

        $.ajax({
            type: 'get',
            url: '/ad/fastinfoad/',
            success: function (res) {
                console.log('初始化快讯内的固定广告：', res)
                let fast_6_container = $('<div class="ad-container fast-info-ad"></div>')
                let fast_11_container = $('<div class="ad-container fast-info-ad"></div>')
                let fast_16_container = $('<div class="ad-container fast-info-ad"></div>')
                let fast_21_container = $('<div class="ad-container fast-info-ad"></div>')
                // fast_6 显示所有广告
                for (let ad of res.data.fast6) {
                    let img = $('<div class="ad-div fast-6"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')

                    fast_6_container.append(img)
                }
                fast_6.append(fast_6_container)

                // fast_11 只显示一个广告

                let fast_11_img = $('<div class="ad-div fast-11"><img src="/media/' + res.data.fast11.img + '" data-url="' + res.data.fast11.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                fast_11_container.append(fast_11_img)
                fast_11.append(fast_11_container)

                // fast_16

                let fast_16_img = $('<div class="ad-div fast-16"><img src="/media/' + res.data.fast16.img + '" data-url="' + res.data.fast16.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                fast_16_container.append(fast_16_img)
                fast_16.append(fast_16_container)

                // fast_21

                let fast_21_img = $('<div class="ad-div fast-21"><img src="/media/' + res.data.fast21.img + '" data-url="' + res.data.fast21.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                fast_21_container.append(fast_21_img)
                fast_21.append(fast_21_container)
            }
        })
    }


}


function setWidth(num, node) {
    if (num == 1) {
        node.css('width', '100%')
    } else if (1 < num < 4) {
        let width = 1 / num * 100 - 5 + '%'
        node.css('width', width)
    } else {
        node.css('width', '20%')
    }
}

