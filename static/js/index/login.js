// 点击页面背景关闭用户登录窗口
$(document).on('click', '.backgroud-container', function (event) {
    $(this).remove();
})
// // 阻止向父元素事件冒泡
$(document).on('click', '.user-login-container', function (e) {
    e.stopPropagation();
})

// 点击头像显示用户登录窗口
function login() {
    let current_path = window.location.pathname;
    console.log('当前路径为：', current_path)
    let html = $('<div class="backgroud-container">\n' +
        '    <div class="user-login-container">\n' +
        '        <div class="register-login">\n' +
        '        <div class="user-login-top">\n' +
        '            <button type="button" id="facebookButton" class="facebook-btn fb-login-button"><img src="/static/images/facebook_icon.png" alt=""><span>LOG IN WITH FACEBOOK</span></button>\n' +
        '            <button type="button" id="googleButton" class="google-btn"><img src="/static/images/google_icon.png" alt=""><span>LOG IN WITH GOOGLE</span></button>\n' +
        '        </div>\n' +
        '        <div class="split-line">\n' +
        '                <div></div>\n' +
        '            <span>or</span>\n' +
        '        </div>\n' +
        '        <form class="login-form" method="post" action="/user/login/" enctype="multipart/form-data">\n' +
        '            <div class="user-login">\n' +
        '                <div class="user-login-title">LOG IN</div>\n' +
        '                    <input id="current-path" name="current_url" style="display: none">\n' +
        '                <input type="text" name="email" placeholder="Email">\n' +
        '                <input type="password" name="password" placeholder="Password">\n' +
        '                    <div class="forgot-password">Forgot Password?</div>\n' +
        '                <button type="button" id="user-login-btn">LOG IN</button>\n' +
        '            </div>\n' +
        '        </form>\n' +
        '            <div class="signup-link">Don\'t have an account?<span>&nbsp;Sign up</span></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>')
    $('body').prepend(html)
    $('#current-path').val(current_path);
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '1094797449963-8h30k5v064h5idmpsn96e34hrhfsa181.apps.googleusercontent.com',  //第二步申请的客户端id
            cookiepolicy: "single_host_origin"
        });
        attachSignin(document.getElementById('googleButton'));
    });

    function attachSignin(element) {
        auth2.attachClickHandler(element, {},
            function (googleUser) {
                //获取用户信息
                var profile = googleUser.getBasicProfile();
                console.log('获取到的用户信息：', profile);
                let data = {
                    'openid': profile.getId(),
                    'email': profile.getEmail(),
                    'img': profile.getImageUrl(),
                    'name': profile.getName()
                }
                console.log('获取到的google用户信息',data)
                $.ajax({
                    type: 'post',
                    url: '/third/',
                    data: {
                        'openid': profile.getId(),
                        'email': profile.getEmail(),
                        'img': profile.getImageUrl(),
                        'name': profile.getName(),
                        'type': 'google'
                    },
                    success: function (res) {
                        console.log('google登录返回结果：', res)
                        if (!res.success) {
                            layer.msg('<div style="color: black;text-align: center;">' + res.err + '</div>')
                        } else {
                            window.location.reload(true)
                        }
                    }
                })
            }, function (error) {
                console.log(JSON.stringify(error, undefined, 2));
            }
        );
    }
}

// 点击注册链接显示注册表单
$(document).on('click', '.signup-link span', function () {
    $('.login-form').remove()
    $('.signup-link').remove()
    $('.user-login-container').css('top', '5%')
    let html = $('<form class="signup-form" action="">\n' +
        '            <div class="user-signup">\n' +
        '                <div class="user-login-title">SIGN UP</div>\n' +
        '                <input type="email" name="email" placeholder="Email Account">\n' +
        '                <button type="button" id="user-code">Get Email Verification Code</button>\n' +
        '                <input type="text" name="code" placeholder="Verification Code">\n' +
        '                <input type="password" name="pwd" placeholder="Set Password">\n' +
        '                <input type="password" name="password" placeholder="Repeat Password">\n' +
        '                <button type="button" id="user-register">SIGN UP</button>\n' +
        '            </div>\n' +
        '        </form>' +
        '            <div class="login-link">Already have a account?<span>&nbsp;Log in</span></div>')
    $('.split-line').after(html)
})

// 点击登录链接展示登录表单
$(document).on('click', '.login-link span', function () {
    $('.forgot-form').remove()
    $('.signup-form').remove()
    $('.login-link').remove()
    $('.user-login-container').css('top', '10%')
    let html = $('<form class="login-form" method="post" action="/user/login/" enctype="multipart/form-data">\n' +
        '           <div class="user-login">\n' +
        '                <div class="user-login-title">LOG IN</div>\n' +
        '                    <input id="current-path" name="current_url" style="display: none">\n' +
        '                <input type="text" name="email" placeholder="Email">\n' +
        '                <input type="password" name="password" placeholder="Password">\n' +
        '                    <div class="forgot-password">Forgot Password?</div>\n' +
        '                <button type="button" id="user-login-btn">LOG IN</button>\n' +
        '            </div>\n' +
        '      </form>\n' +
        '          <div class="signup-link">Don\'t have an account?<span>&nbsp;Sign up</span></div>\n')
    $('.split-line').after(html)
})

// 点击忘记密码链接展示重置密码表单
$(document).on('click', '.forgot-password', function () {
    $('.login-form').remove()
    $('.signup-link').remove()
    $('.user-login-container').css('top', '5%')
    let html = $('<form class="forgot-form" action="">\n' +
        '            <div class="user-forgot">\n' +
        '                <div class="forgot-title">FORGOT PASSWORD</div>\n' +
        '                <input type="email" name="email" placeholder="Email Account">\n' +
        '                <button type="button" id="user-code">Get Email Verification Code</button>\n' +
        '                <input type="text" name="code" placeholder="Verification Code">\n' +
        '                <input type="password" name="pwd" placeholder="Set Password">\n' +
        '                <input type="password" name="password" placeholder="Repeat Password">\n' +
        '                <button type="button" id="forgot-pwd">SUBMIT</button>\n' +
        '            </div>\n' +
        '        </form>\n' +
        '        <div class="login-link">Already have a account?<span>&nbsp;Log in</span></div>')
    $('.split-line').after(html)
})

// 用户登录
$(document).on('click', '#user-login-btn', function () {
    let _this = $(this)
    let email = _this.siblings('input[name="email"]').val()
    let password = _this.siblings('input[name="password"]').val()
    let path = _this.siblings('input[name="current_url"]').val()
    console.log($('.login-form').serialize())
    if (email == '') {
        layer.msg('<div style="color: black;text-align: center;">' + 'email不能为空</div>')
    } else if (password == '') {
        layer.msg('<div style="color: black;text-align: center;">' + 'password不能为空</div>')
    } else {
        $.ajax({
            type: 'post',
            url: '/user/login/',
            data: $('.login-form').serialize(),
            success: function (res) {
                if (!res.success) {
                    layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                } else if (res.success) {
                    layer.msg('<div style="color: black;text-align: center;">' + '登陆成功</div>')
                    location.href = path
                }
            }
        })
    }
})

// 用户获取验证码
$(document).on('click', '#user-code', function () {
    let _this = $(this)
    let email = _this.siblings('input[name="email"]').val()
    console.log(email)
    if (email == '') {
        layer.msg('<div style="color: black;text-align: center;">' + 'email不能为空</div>')
    } else {
        $.ajax({
            type: 'post',
            url: '/user/getcode/',
            data: {
                'email': email
            },
            success: function (res) {
                if (res.success) {
                    layer.msg('<div style="color: black;text-align: center;">' + '已发送验证码</div>')
                } else {
                    layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                }
            }
        })
    }
})

// 用户忘记密码
$(document).on('click', '#forgot-pwd', function () {
    let _this = $(this)
    let email = _this.siblings('input[name="email"]').val()
    let code = _this.siblings('input[name="code"]').val()
    let pwd = _this.siblings('input[name="pwd"]').val()
    let password = _this.siblings('input[name="password"]').val()
    if (email == '') {
        layer.msg('<div style="color: black;text-align: center;">' + 'email不能为空</div>')
    } else if (code == '') {
        layer.msg('<div style="color: black;text-align: center;">' + '验证码不能为空</div>')
    } else if (pwd == '') {
        layer.msg('<div style="color: black;text-align: center;">' + '密码不能为空</div>')
    } else if (password == '') {
        layer.msg('<div style="color: black;text-align: center;">' + '密码不能为空</div>')
    } else if (pwd != password) {
        layer.msg('<div style="color: black;text-align: center;">' + '两次密码不一致</div>')
    } else {
        $.ajax({
            type: 'post',
            url: '/user/forgotpassword/',
            data: $('.forgot-form').serialize(),
            success: function (res) {
                if (!res.success) {
                    layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                } else {
                    layer.msg('<div style="color: black;text-align: center;">' + '密码修改成功</div>')
                    location.href = '/'
                }
            }
        })
    }
})

// 用户注册
$(document).on('click', '#user-register', function () {
    let _this = $(this)
    let email = _this.siblings('input[name="email"]').val()
    let code = _this.siblings('input[name="code"]').val()
    let pwd = _this.siblings('input[name="pwd"]').val()
    let password = _this.siblings('input[name="password"]').val()
    if (email == '') {
        layer.msg('<div style="color: black;text-align: center;">' + 'email不能为空</div>')
    } else if (code == '') {
        layer.msg('<div style="color: black;text-align: center;">' + '验证码不能为空</div>')
    } else if (pwd == '') {
        layer.msg('<div style="color: black;text-align: center;">' + '密码不能为空</div>')
    } else if (password == '') {
        layer.msg('<div style="color: black;text-align: center;">' + '密码不能为空</div>')
    } else if (pwd != password) {
        layer.msg('<div style="color: black;text-align: center;">' + '两次密码不一致</div>')
    } else {
        $.ajax({
            type: 'post',
            url: '/user/register/',
            data: $('.signup-form').serialize(),
            success: function (res) {
                if (!res.success) {
                    layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                } else {
                    layer.msg('<div style="color: black;text-align: center;">' + '注册成功</div>')
                    location.href = '/'
                }
            }
        })
    }
})

