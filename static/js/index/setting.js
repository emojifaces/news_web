// 获取cookie
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

// 检查是否有新消息
function checkRemind() {
    console.log('已登录，开始轮询')
    setInterval(function () {
        $.ajax({
            type:'get',
            url:'/checkremind/',
            success:function (res) {
                if (res.msg){
                    $('#user-message').attr('src','/static/images/message1.png')
                }else{
                    $('#user-message').attr('src','/static/images/message.png')
                }
            }
            })
    },60000)
    
}

// 夜间模式
function NightMode() {
    let html = $('<link rel="stylesheet" href="/static/css/night.css">')
    $('head').append(html)
}

$(document).on('click','#onNight',function () {
    let input = $('#Night')
    if (input.is(':checked')){
        NightMode()
        document.cookie = 'onNight=true'
    }else{
        $('link[href="/static/css/night.css"]').remove()
        document.cookie = 'onNight=false'
    }
})

// 初始化网站主题模式
function initMode() {
    if (getCookie('onNight')=='true'){
        $('#Night').attr('checked',true)
        NightMode()
    }
}



function playBGM() {
    let player = $('#bgm')[0]
    player.play()
}


$(document).on('click','#onSound',function () {
    let input = $('#Sound')
    if (input.is(':checked')){
        document.cookie = 'onSound=true'
    }else{
        document.cookie = 'onSound=false'
    }
})

function initSound() {
    if (getCookie('onSound')=='false'){
        $('#Sound').removeAttr('checked')
    }
}

function entityToString(entity){
  var div=document.createElement('div');
  div.innerHTML=entity;
  var res=div.innerText||div.textContent;
  return res;
}

function removeMS(date) {
    if (date.indexOf(' ')!=-1){
        date = date.split(' ')[1]
    }
    if (date.indexOf('.')!=-1){
        return date.substring(0,date.indexOf('.'))
    }else{
        return date
    }
}