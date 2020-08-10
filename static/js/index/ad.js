// 初始化全局广告
function initGlobalAd() {
    $.ajax({
        type:'get',
        url:'/ad/globalad/',
        success:function (res) {
            console.log('初始化全局广告：',res)
            // 网站全局 顶部广告
            for (let ad of res.data.top){
                let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                setWidth(res.data.top.length,img)
                $('#top').append(img)
            }


            // for (let ad of res.data.top){
            //     let img = $('<img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" alt="" class="col-3" >')
            //     setWidth(res.data.top.length,img)
            //     $('#top').append(img)
            // }
            // 网站全局 左侧广告
            for (let ad of res.data.left){
                let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')

                $('#fixed-left').append(img)
            }
            // 网站全局 右侧广告
            for (let ad of res.data.right){
                let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')

                $('#fixed-right').append(img)
            }
        }
    })
}

// 点击广告跳转url
$(document).on('click','#ad-img',function () {
    let url = $(this).attr('data-url')
    window.open(url)
})

$(document).on('click','.mask',function () {
    let url = $(this).siblings('img').attr('data-url')
    window.open(url)
})

// 初始化首页广告
function initIndexAd() {
    $.ajax({
        type:'get',
        url:'/ad/indexad/',
        success:function (res) {
            console.log('初始化网页首页广告：',res)
            let top_container = $('#main-left-top')
            let right_container = $('#main-right-ad')
            // 顶部
            for (let [key,val] of Object.entries(res.data.top)){
                let ad_div = $('<div class="ad-container maxw190"></div>')
                for (let ad of val){
                    let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length,img)
                    ad_div.append(img)
                }
                top_container.append(ad_div)
            }

            // 右部
            for (let [key,val] of Object.entries(res.data.right)){
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val){
                    let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length,img)
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
        type:'get',
        url:'/ad/calendarad/',
        success:function (res) {
            console.log('初始化日历广告：',res)
            let top_container = $('#main-left-top')
            let right_container = $('#main-right')
            // 顶部
            for (let [key,val] of Object.entries(res.data.top)){
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val){
                    let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length,img)
                    ad_div.append(img)
                }
                top_container.append(ad_div)
            }

            // 右部
            for (let [key,val] of Object.entries(res.data.right)){
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val){
                    let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length,img)
                    ad_div.append(img)
                }
                right_container.append(ad_div)
            }
        }
    })
}

// 初始化动态广告
function initGroupad() {
    $.ajax({
        type:'get',
        url:'/ad/groupad/',
        success:function (res) {
            console.log('初始化动态广告：',res)
            let top_container = $('.group-content-ad')
            let right_container = $('#main-right')
            // 顶部
            for (let [key,val] of Object.entries(res.data.top)){
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val){
                    let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    // if (val.length==1){
                    //     img.css('width','100%')
                    //     img.children('img').css('width','100%')
                    // }
                    setWidth(val.length,img)
                    ad_div.append(img)
                }
                top_container.append(ad_div)
            }

            // 右部
            for (let [key,val] of Object.entries(res.data.right)){
                let ad_div = $('<div class="ad-container"></div>')
                for (let ad of val){
                    let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')
                    setWidth(val.length,img)
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
    let top = div[10]
    let middle = div[15]
    let bottom = div[20]
    if ($(top).find('.fast-info-ad').length||$(middle).find('.fast-info-ad').length||$(bottom).find('.fast-info-ad').length){
        return null

    }else{
        // $('#main-left-data').find('.fast-info-ad').remove()
        $.ajax({
        type:'get',
        url:'/ad/fastinfoad/',
        success:function (res) {
            console.log('初始化快讯内的固定广告：',res)
            let top_container = $('<div class="ad-container fast-info-ad"></div>')
            let middle_container = $('<div class="ad-container fast-info-ad"></div>')
            let bottom_container = $('<div class="ad-container fast-info-ad"></div>')
            // top
            for (let ad of res.data.top){
                let img = $('<div class="ad-div fast-11"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')

                top_container.append(img)
            }
            $(top).append(top_container)

            // middle
            for (let ad of res.data.middle){
                let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')

                middle_container.append(img)
            }
            $(middle).append(middle_container)

            // bottom
            for (let ad of res.data.bottom){
                let img = $('<div class="ad-div"><img src="/media/'+ad.img+'" data-url="'+ad.url+'" id="ad-img" ><div class="mask">Show Me More</div></div>')

                bottom_container.append(img)
            }
            $(bottom).append(bottom_container)
        }
    })
    }





}


function setWidth(num,node) {
    if (num==1){
        node.css('width','100%')
    }else if (1<num<4){
        let width = 1/num *100 -5 +'%'
        node.css('width',width)
    }else{
        node.css('width','20%')
    }
}

