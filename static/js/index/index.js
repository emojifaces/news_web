fastinfo_page = 2
fastinfo_limit = 30
// 加载更多快讯信息
$(document).on('click', '#moreFastInfoBtn', function () {
    let btn = $(this).parents('.main-data-div')
    $.ajax({
        type: 'get',
        url: '/fastinfo/?page=' + fastinfo_page + '&limit=' + fastinfo_limit,
        success: function (result) {
            console.log('加载更多快讯信息', result)
            let container = $('#main-left-data')
            btn.remove()
            for (let data of result.data) {
                let div = $('<div class="main-data-div color-comment"></div>')
                let icon = $('<div class="main-data-icon">\n' +
                    '             <div class="icon-div">\n' +
                    '             <img src="/static/images/7_24.png" alt="">' +
                    '             </div>\n' +
                    '         </div>')
                let time = $('<div class="main-data-time">' + removeMS(data.VN_pub_date) + '</div>')
                let info = $('<div class="main-data-info"></div>')
                div.append(icon, time, info)
                if (data.fast_type == 0) {

                    // 快讯
                    if (data.translate.indexOf('&lt;iframe src=') != -1) {
                        data.translate = entityToString(data.translate)
                    }
                    let fast = $('<div>' + data.translate + '</div>')
                    info.append(fast)
                    if (data.is_important) {
                        div.css('color', 'red')
                    }
                } else if (data.fast_type == 1) {
                    // 日历
                    let calendar_box = $('<div class="main-calendar-box">\n' +
                        '                        <img src="/static/images/flag/' + data.tran_country + '.png" class="flag" alt="">\n' +
                        '                    </div>')
                    let calendar_data = $('<div class="main-calendar-data"><div class="main-calendar-title">' + data.tran_title + '</div></div>')
                    let calendar_star = $('<div class="calendar-star"></div>')
                    for (let lightStar = 0; lightStar < data.star; lightStar++) {
                        let lightStarDiv = $('<svg t="1583754430858" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" width="16" height="16">\n' +
                            ' <path d="M747.682255 638.235053c10.091846 49.955762 18.998703 95.172593 26.714432 135.6464 3.560082 17.076934 6.824429 34.151821 9.795087 51.227732 2.965541 17.070794 5.78475 32.564673 8.456602 46.479591 2.673899 13.908778 4.897543 25.76685 6.67912 35.573193 1.778506 9.801227 2.968611 15.965623 3.560082 18.492166 1.778506 12.650111-0.889253 21.029966-8.010441 25.142633-7.125281 4.102435-15.138792 6.163373-24.041556 6.163373-2.968611 0-7.271614-1.110287-12.911054-3.319605-5.637394-2.215458-9.943466-3.954055-12.909008-5.217838L512.616542 804.236807c-42.147936 26.559912-80.432891 50.276057-114.864074 71.146387-14.842033 8.849552-29.529547 17.705244-44.073798 26.553773-14.544251 8.854669-27.754111 17.081027-39.625486 24.662703-11.872399 7.590885-22.109554 13.920034-30.714536 18.97926-8.610098 5.053086-14.398942 8.214079-17.364483 9.484002-5.936199 3.162016-12.023848 4.266164-18.256806 3.314489-6.235005-0.946558-11.872399-3.314489-16.915251-7.109931-5.043876-3.796466-8.756431-8.378831-11.129478-13.755282-2.376117-5.376451-2.965541-10.911514-1.781576-16.594957 0.596588-2.532683 2.078335-8.702196 4.453429-18.502399 2.376117-9.801227 5.043876-21.50171 8.013511-35.098379 2.965541-13.596669 6.380314-28.615735 10.239202-45.057195 3.857864-16.440437 7.862062-33.199123 12.018731-50.275034 8.904811-39.210024 18.996656-83.474157 30.274514-132.798539-35.021631-32.254611-66.482157-61.028958-94.381577-86.322018-11.872399-10.749832-23.598464-21.344121-35.173081-31.776727-11.574616-10.437723-21.963221-19.919678-31.162744-28.461215-9.203616-8.535397-16.769942-15.490809-22.705118-20.866237-5.936199-5.373381-9.203616-8.378831-9.800203-9.012258-7.121188-6.957459-13.20372-14.70184-18.250666-23.23826-5.043876-8.541537-6.975878-17.231453-5.785773-26.086122 1.187035-8.853645 4.449335-15.812127 9.79611-20.871353 5.340635-5.057179 11.275811-8.218172 17.807574-9.487072l275.131221-26.557866L470.766388 102.288664c3.560082-10.122545 8.608052-18.818601 15.140839-26.085098 6.526647-7.272637 15.432481-10.911514 26.710338-10.911514 5.935176 0 11.129478 1.425466 15.582907 4.267187 4.451382 2.847861 8.16189 6.16542 11.133571 9.959839 2.963495 3.795443 5.485945 7.589862 7.563256 11.386328 2.079358 3.794419 3.713578 6.954389 4.897543 9.485025l99.729375 254.222005 275.136338 27.510564c11.872399 3.160993 20.177552 6.955412 24.927739 11.380188 4.751211 4.426823 7.121188 11.383258 7.121188 20.87033 0 8.853645-2.521426 16.59905-7.566326 23.237237-5.047969 6.643304-11.42726 14.705933-19.144012 24.193005L747.682255 638.235053 747.682255 638.235053zM747.682255 638.235053"\n' +
                            ' p-id="2560" fill="#e8c04c"></path>\n' +
                            '</svg>')
                        calendar_star.append(lightStarDiv)
                    }
                    for (let darkStar = 0; darkStar < (5 - data.star); darkStar++) {
                        let darkStarDiv = $('<svg t="1583754505767" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3027" width="16" height="16">\n' +
                            ' <path d="M747.682255 638.235053c10.091846 49.955762 18.998703 95.172593 26.714432 135.6464 3.560082 17.076934 6.824429 34.151821 9.795087 51.227732 2.965541 17.070794 5.78475 32.564673 8.456602 46.479591 2.673899 13.908778 4.897543 25.76685 6.67912 35.573193 1.778506 9.801227 2.968611 15.965623 3.560082 18.492166 1.778506 12.650111-0.889253 21.029966-8.010441 25.142633-7.125281 4.102435-15.138792 6.163373-24.041556 6.163373-2.968611 0-7.271614-1.110287-12.911054-3.319605-5.637394-2.215458-9.943466-3.954055-12.909008-5.217838L512.616542 804.236807c-42.147936 26.559912-80.432891 50.276057-114.864074 71.146387-14.842033 8.849552-29.529547 17.705244-44.073798 26.553773-14.544251 8.854669-27.754111 17.081027-39.625486 24.662703-11.872399 7.590885-22.109554 13.920034-30.714536 18.97926-8.610098 5.053086-14.398942 8.214079-17.364483 9.484002-5.936199 3.162016-12.023848 4.266164-18.256806 3.314489-6.235005-0.946558-11.872399-3.314489-16.915251-7.109931-5.043876-3.796466-8.756431-8.378831-11.129478-13.755282-2.376117-5.376451-2.965541-10.911514-1.781576-16.594957 0.596588-2.532683 2.078335-8.702196 4.453429-18.502399 2.376117-9.801227 5.043876-21.50171 8.013511-35.098379 2.965541-13.596669 6.380314-28.615735 10.239202-45.057195 3.857864-16.440437 7.862062-33.199123 12.018731-50.275034 8.904811-39.210024 18.996656-83.474157 30.274514-132.798539-35.021631-32.254611-66.482157-61.028958-94.381577-86.322018-11.872399-10.749832-23.598464-21.344121-35.173081-31.776727-11.574616-10.437723-21.963221-19.919678-31.162744-28.461215-9.203616-8.535397-16.769942-15.490809-22.705118-20.866237-5.936199-5.373381-9.203616-8.378831-9.800203-9.012258-7.121188-6.957459-13.20372-14.70184-18.250666-23.23826-5.043876-8.541537-6.975878-17.231453-5.785773-26.086122 1.187035-8.853645 4.449335-15.812127 9.79611-20.871353 5.340635-5.057179 11.275811-8.218172 17.807574-9.487072l275.131221-26.557866L470.766388 102.288664c3.560082-10.122545 8.608052-18.818601 15.140839-26.085098 6.526647-7.272637 15.432481-10.911514 26.710338-10.911514 5.935176 0 11.129478 1.425466 15.582907 4.267187 4.451382 2.847861 8.16189 6.16542 11.133571 9.959839 2.963495 3.795443 5.485945 7.589862 7.563256 11.386328 2.079358 3.794419 3.713578 6.954389 4.897543 9.485025l99.729375 254.222005 275.136338 27.510564c11.872399 3.160993 20.177552 6.955412 24.927739 11.380188 4.751211 4.426823 7.121188 11.383258 7.121188 20.87033 0 8.853645-2.521426 16.59905-7.566326 23.237237-5.047969 6.643304-11.42726 14.705933-19.144012 24.193005L747.682255 638.235053 747.682255 638.235053zM747.682255 638.235053"\n' +
                            ' p-id="3028" fill="#c8c8c8"></path>\n' +
                            '</svg>')
                        calendar_star.append(darkStarDiv)
                    }
                    let act = $('<div class="act">Act:' + data.actual + '%</div>')
                    let tag = $('<div class="bear">BEAR</div>')
                    let pre_exp = $('<div style="width: 100%;display: flex">\n' +
                        '                 <div class="pre">Pre:' + data.previous + '%</div>\n' +
                        '                 <div class="exp">Exp:' + data.consensus + '</div>\n' +
                        '            </div>')
                    calendar_data.append(calendar_star, act, tag, pre_exp)
                    calendar_box.append(calendar_data)
                    info.append(calendar_box)
                } else if (data.fast_type == 2) {
                    // 微博

                    let blogId = data.id
                    $.ajax({
                        type: 'get',
                        url: '/group/detail/' + blogId,
                        success: function (res) {
                            console.log(res)
                            if (res.success) {
                                let data = res.data
                                let headerUrl = $('#user-header>img').attr('src');
                                let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                                let user_info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
                                parentDiv.append(user_info)
                                let header = $('<div class="user-header" >\n' +
                                    '            <img src="/media/' + data.header + '" width="40" height="40" alt="" >\n' +
                                    '        </div>')
                                user_info.append(header)
                                let content = $('<div class="dynamic-content"></div>')
                                user_info.append(content)
                                let content_header = $('<div class="content-header">\n' +
                                    '                <div class="content-user-data">\n' +
                                    '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                                    '                    <div class="content-time">' + timeformat(data.pub_date) + '</div>\n' +
                                    '                </div>\n' +
                                    '            </div>')
                                // 判断是否是自己发的动态
                                if (data.ismine) {
                                    let content_account_status = ('<div class="content-account-status">' +
                                        '<div class="delete-group">\n' +
                                        '<span>Delete</span>\n' +
                                        '</div>' +
                                        '</div>')
                                    content_header.append(content_account_status)
                                } else {
                                    let content_account_status = $('<div class="content-account-status"></div>')
                                    if (data.facebook_link) {
                                        let facebook_link_div = $('<div class="content-facebook" data-url="' + data.facebook_link + '"><img src="/static/images/fb.png" alt=""></div>')
                                        content_account_status.append(facebook_link_div)
                                    }
                                    content_header.append(content_account_status)
                                }

                                let content_data = $('<div class="content-data"></div>')
                                let content_text = $('<div class="content-text color-comment">\n' +
                                    '                    <span>' + data.content + '</span>\n' +
                                    '                </div>')
                                if (data.bgcolor) {
                                    content_text.addClass('bg-color')
                                    content_text.css('background-color', data.bgcolor)
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
                                    let vote_box = $('<div class="vote-box" isvote="' + data.isallvote + '"></div>')
                                    let vote_title = $('<div class="vote-title color-comment">' + data.votetitle + '</div>')
                                    let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Person Vote</div>')
                                    vote_box.append(vote_title)
                                    if (data.votedata) {
                                        for (let vote_item of data.votedata) {
                                            let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                                '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                                '                </div>')
                                            let vote_choose_num = $('<div class="vote-choose-num" >' + vote_item.num + '</div>')
                                            let vote_percent = $('<div class="vote-percent" ></div>')
                                            if (data.isallvote) {
                                                vote_choose_num.css('display', 'block')
                                                let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                                let width = percent + '%'
                                                vote_percent.css('width', width)
                                                if (vote_item.isVote) {
                                                    vote_percent.addClass('checked')
                                                } else {
                                                    vote_percent.addClass('unchecked')
                                                }
                                                vote_choose.append(vote_choose_num, vote_percent)
                                            } else {
                                                vote_percent.addClass('unchecked')
                                                vote_choose_num.css('display', 'none')
                                                vote_percent.css('width', '0%')
                                                vote_choose.append(vote_choose_num, vote_percent)
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
                                    collect.attr('data', 'true')
                                    let img = $('<img src="/static/images/collect2.png" alt="">')
                                    let span = $('<span class="color-comment">Collect</span>')
                                    collect.append(img, span)
                                } else {
                                    collect.attr('data', 'false')
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
                                    like.attr('data', 'true')
                                    let img = $('<img src="/static/images/like2.png" alt="" >')
                                    let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                                    like.append(img, likenum)
                                } else {
                                    like.attr('data', 'false')
                                    let img = $('<img src="/static/images/like1.png" alt="" >')
                                    let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                                    like.append(img, likenum)
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
                                info.append(parentDiv)
                                let comment_box = $('<div class="dynamic-comment-box"></div>')
                                parentDiv.append(comment_box)
                                for (let fbc of data.commentData.first_comment) {
                                    let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                                    let fbc_header = $('<div class="user-header">\n' +
                                        '                  <img src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                                        '               </div>')
                                    let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                                    let fbc_comment_text = $('<div class="comment-text">\n' +
                                        '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                                        '                            <span>:&nbsp;</span>\n' +
                                        '                        </div>')
                                    if (fbc.ismine) {
                                        let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                                        fbc_comment_text.append(fbc_delete)
                                    }
                                    let fbc_content = $('<div>' + fbc.content + '</div>')
                                    fbc_comment_text.append(fbc_content)
                                    let fbc_comment_op = $('<div class="comment-op">\n' +
                                        '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                                        '                            <div class="fbc-num">\n' +
                                        '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                                        '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                                        '                            </div>\n' +
                                        '                            <div class="reply">Reply</div>\n' +
                                        '                       </div>')
                                    fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                                    fbc_box.append(fbc_header, fbc_commentDate)
                                    if (fbc.secondComment.sbc_list) {
                                        for (let sbc of fbc.secondComment.sbc_list) {
                                            let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                                '                  <div class="user-header">\n' +
                                                '                       <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                                '                  </div>\n' +
                                                '            </div>')
                                            let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                            let sbc_comment_text = $('<div class="comment-text">\n' +
                                                '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                                '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                                '                     </div>')
                                            if (sbc.ismine) {
                                                let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                                sbc_comment_text.append(sbc_comment_delete)
                                            }
                                            let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                                            sbc_comment_text.append(sbc_comment_content)
                                            let sbc_comment_op = $('<div class="comment-op">\n' +
                                                '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                                '                        <div class="reply">Reply</div>\n' +
                                                '                   </div>')
                                            sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                            sbc_box.append(sbc_comment_data)
                                            fbc_commentDate.append(sbc_box)
                                        }
                                        if (fbc.sbc_num > 2) {
                                            let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/more2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                            fbc_commentDate.append(moreSBCBtn)
                                        }
                                    }
                                    comment_box.append(fbc_box)
                                }
                                if (data.fbc_num > 5) {
                                    let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                                        '<img src="/static/images/more1.png" alt="">\n' +
                                        '</div>')
                                    comment_box.append(moreFBCBtn)
                                }

                            }
                        }
                    })


                } else if (data.fast_type == 3) {
                    // 广告组
                    let ad_container = $('<div class="ad-container"></div>')
                    for (let ad of data.rounds_ad_group) {
                        let img = $('<div class="ad-div"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                        setWidth(data.rounds_ad_group.length, img)
                        ad_container.append(img)
                    }
                    info.append(ad_container)
                } else if (data.fast_type == 5) {
                    // 官博
                    let blog_container = $('<div class="blog-box color-comment" data="' + data.id + '">' +
                        '<div class="footer-date">' + data.VN_pub_date + '</div>' +
                        '</div>')
                    if (data.title) {
                        let blog_title = $('<div class="blog-title-div"></div>')
                        if (data.type && data.typecolor) {
                            let type = $('<span class="label-green color-white label">' + data.type + '</span>')
                            type.css('background-color', data.typecolor)
                            blog_title.append(type)
                        }
                        let blog_title_content = $('<span class="blog-content-txt">' + data.title + '</span>')
                        blog_title.append(blog_title_content)
                        blog_container.append(blog_title)
                    }
                    let blog_content = $('<div class="blog-content">' + data.content + '</div>')
                    blog_container.append(blog_content)
                    if (data.imglist) {
                        let blog_img_div = $('<div class="blog-image-div"></div>')
                        for (let img of data.imglist) {
                            let img_node = $('<img src="/media/' + img + '" class="alert-img">')
                            blog_img_div.append(img_node)
                        }
                        blog_container.append(blog_img_div)
                    }
                    let blog_footer_div = $('<div class="blog-footer-div">' +
                        '<button class="blog-share">' +
                        '   <img src="/static/images/share1.png" alt="">' +
                        '   <span>Share</span>' +
                        '</button>' +
                        '</div>')
                    if (data.isgood) {
                        let button = $('<button class="blog-like" islike="True">' +
                            '<img src="/static/images/like2.png" alt=""><span>' + data.goodfingers + '</span>' +
                            '</button>')
                        blog_footer_div.append(button)
                    } else {
                        let button = $('<button class="blog-like" islike="False">' +
                            '<img src="/static/images/like1.png" alt=""><span>' + data.goodfingers + '</span>' +
                            '</button>')
                        blog_footer_div.append(button)
                    }
                    blog_container.append(blog_footer_div)
                    info.append(blog_container)
                }
                container.append(div)

            }
            container.append(btn)
            fastinfo_page += 1

            // 加载快讯广告
            // initFastInfoAd()
        }
    })

})
// 加载更对summary
summary_page = 2
summary_limit = 30
$(document).on('click', '#moreSummaryBtn', function () {
    let btn = $(this).parents('.main-data-div')
    $.ajax({
        type: 'get',
        url: '/fastinfo/?import=True&page=' + summary_page + '&limit=' + summary_limit,
        success: function (result) {
            console.log('加载更多summary', result)
            let container = $('#main-left-data')
            btn.remove()
            for (let data of result.data) {
                let div = $('<div class="main-data-div color-comment"></div>')

                let icon = $('<div class="main-data-icon">\n' +
                    '             <div class="icon-div">\n' +
                    '             <img src="/static/images/7_24.png" alt="">' +
                    '             </div>\n' +
                    '         </div>')
                let time = $('<div class="main-data-time">' + data.VN_pub_date + '</div>')
                let info = $('<div class="main-data-info"></div>')
                div.append(icon, time, info)
                if (data.fast_type == 0) {
                    // 快讯
                    if (data.translate.indexOf('&lt;iframe src=') != -1) {
                        data.translate = entityToString(data.translate)
                    }
                    let fast = $('<div>' + data.translate + '</div>')
                    info.append(fast)

                } else if (data.fast_type == 1) {
                    // 日历
                    let calendar_box = $('<div class="main-calendar-box">\n' +
                        '                        <img src="/static/images/flag/' + data.tran_country + '.png" class="flag" alt="">\n' +
                        '                    </div>')
                    let calendar_data = $('<div class="main-calendar-data"><div class="main-calendar-title">' + data.tran_title + '</div></div>')
                    let calendar_star = $('<div class="calendar-star"></div>')
                    for (let lightStar = 0; lightStar < data.star; lightStar++) {
                        let lightStarDiv = $('<svg t="1583754430858" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" width="16" height="16">\n' +
                            ' <path d="M747.682255 638.235053c10.091846 49.955762 18.998703 95.172593 26.714432 135.6464 3.560082 17.076934 6.824429 34.151821 9.795087 51.227732 2.965541 17.070794 5.78475 32.564673 8.456602 46.479591 2.673899 13.908778 4.897543 25.76685 6.67912 35.573193 1.778506 9.801227 2.968611 15.965623 3.560082 18.492166 1.778506 12.650111-0.889253 21.029966-8.010441 25.142633-7.125281 4.102435-15.138792 6.163373-24.041556 6.163373-2.968611 0-7.271614-1.110287-12.911054-3.319605-5.637394-2.215458-9.943466-3.954055-12.909008-5.217838L512.616542 804.236807c-42.147936 26.559912-80.432891 50.276057-114.864074 71.146387-14.842033 8.849552-29.529547 17.705244-44.073798 26.553773-14.544251 8.854669-27.754111 17.081027-39.625486 24.662703-11.872399 7.590885-22.109554 13.920034-30.714536 18.97926-8.610098 5.053086-14.398942 8.214079-17.364483 9.484002-5.936199 3.162016-12.023848 4.266164-18.256806 3.314489-6.235005-0.946558-11.872399-3.314489-16.915251-7.109931-5.043876-3.796466-8.756431-8.378831-11.129478-13.755282-2.376117-5.376451-2.965541-10.911514-1.781576-16.594957 0.596588-2.532683 2.078335-8.702196 4.453429-18.502399 2.376117-9.801227 5.043876-21.50171 8.013511-35.098379 2.965541-13.596669 6.380314-28.615735 10.239202-45.057195 3.857864-16.440437 7.862062-33.199123 12.018731-50.275034 8.904811-39.210024 18.996656-83.474157 30.274514-132.798539-35.021631-32.254611-66.482157-61.028958-94.381577-86.322018-11.872399-10.749832-23.598464-21.344121-35.173081-31.776727-11.574616-10.437723-21.963221-19.919678-31.162744-28.461215-9.203616-8.535397-16.769942-15.490809-22.705118-20.866237-5.936199-5.373381-9.203616-8.378831-9.800203-9.012258-7.121188-6.957459-13.20372-14.70184-18.250666-23.23826-5.043876-8.541537-6.975878-17.231453-5.785773-26.086122 1.187035-8.853645 4.449335-15.812127 9.79611-20.871353 5.340635-5.057179 11.275811-8.218172 17.807574-9.487072l275.131221-26.557866L470.766388 102.288664c3.560082-10.122545 8.608052-18.818601 15.140839-26.085098 6.526647-7.272637 15.432481-10.911514 26.710338-10.911514 5.935176 0 11.129478 1.425466 15.582907 4.267187 4.451382 2.847861 8.16189 6.16542 11.133571 9.959839 2.963495 3.795443 5.485945 7.589862 7.563256 11.386328 2.079358 3.794419 3.713578 6.954389 4.897543 9.485025l99.729375 254.222005 275.136338 27.510564c11.872399 3.160993 20.177552 6.955412 24.927739 11.380188 4.751211 4.426823 7.121188 11.383258 7.121188 20.87033 0 8.853645-2.521426 16.59905-7.566326 23.237237-5.047969 6.643304-11.42726 14.705933-19.144012 24.193005L747.682255 638.235053 747.682255 638.235053zM747.682255 638.235053"\n' +
                            ' p-id="2560" fill="#e8c04c"></path>\n' +
                            '</svg>')
                        calendar_star.append(lightStarDiv)
                    }
                    for (let darkStar = 0; darkStar < (5 - data.star); darkStar++) {
                        let darkStarDiv = $('<svg t="1583754505767" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3027" width="16" height="16">\n' +
                            ' <path d="M747.682255 638.235053c10.091846 49.955762 18.998703 95.172593 26.714432 135.6464 3.560082 17.076934 6.824429 34.151821 9.795087 51.227732 2.965541 17.070794 5.78475 32.564673 8.456602 46.479591 2.673899 13.908778 4.897543 25.76685 6.67912 35.573193 1.778506 9.801227 2.968611 15.965623 3.560082 18.492166 1.778506 12.650111-0.889253 21.029966-8.010441 25.142633-7.125281 4.102435-15.138792 6.163373-24.041556 6.163373-2.968611 0-7.271614-1.110287-12.911054-3.319605-5.637394-2.215458-9.943466-3.954055-12.909008-5.217838L512.616542 804.236807c-42.147936 26.559912-80.432891 50.276057-114.864074 71.146387-14.842033 8.849552-29.529547 17.705244-44.073798 26.553773-14.544251 8.854669-27.754111 17.081027-39.625486 24.662703-11.872399 7.590885-22.109554 13.920034-30.714536 18.97926-8.610098 5.053086-14.398942 8.214079-17.364483 9.484002-5.936199 3.162016-12.023848 4.266164-18.256806 3.314489-6.235005-0.946558-11.872399-3.314489-16.915251-7.109931-5.043876-3.796466-8.756431-8.378831-11.129478-13.755282-2.376117-5.376451-2.965541-10.911514-1.781576-16.594957 0.596588-2.532683 2.078335-8.702196 4.453429-18.502399 2.376117-9.801227 5.043876-21.50171 8.013511-35.098379 2.965541-13.596669 6.380314-28.615735 10.239202-45.057195 3.857864-16.440437 7.862062-33.199123 12.018731-50.275034 8.904811-39.210024 18.996656-83.474157 30.274514-132.798539-35.021631-32.254611-66.482157-61.028958-94.381577-86.322018-11.872399-10.749832-23.598464-21.344121-35.173081-31.776727-11.574616-10.437723-21.963221-19.919678-31.162744-28.461215-9.203616-8.535397-16.769942-15.490809-22.705118-20.866237-5.936199-5.373381-9.203616-8.378831-9.800203-9.012258-7.121188-6.957459-13.20372-14.70184-18.250666-23.23826-5.043876-8.541537-6.975878-17.231453-5.785773-26.086122 1.187035-8.853645 4.449335-15.812127 9.79611-20.871353 5.340635-5.057179 11.275811-8.218172 17.807574-9.487072l275.131221-26.557866L470.766388 102.288664c3.560082-10.122545 8.608052-18.818601 15.140839-26.085098 6.526647-7.272637 15.432481-10.911514 26.710338-10.911514 5.935176 0 11.129478 1.425466 15.582907 4.267187 4.451382 2.847861 8.16189 6.16542 11.133571 9.959839 2.963495 3.795443 5.485945 7.589862 7.563256 11.386328 2.079358 3.794419 3.713578 6.954389 4.897543 9.485025l99.729375 254.222005 275.136338 27.510564c11.872399 3.160993 20.177552 6.955412 24.927739 11.380188 4.751211 4.426823 7.121188 11.383258 7.121188 20.87033 0 8.853645-2.521426 16.59905-7.566326 23.237237-5.047969 6.643304-11.42726 14.705933-19.144012 24.193005L747.682255 638.235053 747.682255 638.235053zM747.682255 638.235053"\n' +
                            ' p-id="3028" fill="#c8c8c8"></path>\n' +
                            '</svg>')
                        calendar_star.append(darkStarDiv)
                    }
                    let act = $('<div class="act">Act:' + data.actual + '%</div>')
                    let tag = $('<div class="bear">BEAR</div>')
                    let pre_exp = $('<div style="width: 100%;display: flex">\n' +
                        '                 <div class="pre">Pre:' + data.previous + '%</div>\n' +
                        '                 <div class="exp">Exp:' + data.consensus + '</div>\n' +
                        '            </div>')
                    calendar_data.append(calendar_star, act, tag, pre_exp)
                    calendar_box.append(calendar_data)
                    info.append(calendar_box)
                } else if (data.fast_type == 2) {
                    // 微博
                    let blogId = data.id
                    $.ajax({
                        type: 'get',
                        url: '/group/detail/' + blogId,
                        success: function (res) {
                            console.log(res)
                            if (res.success) {
                                let data = res.data
                                let headerUrl = $('#user-header>img').attr('src');
                                let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                                let user_info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
                                parentDiv.append(user_info)
                                let header = $('<div class="user-header" >\n' +
                                    '            <img src="/media/' + data.header + '" width="40" height="40" alt="" >\n' +
                                    '        </div>')
                                user_info.append(header)
                                let content = $('<div class="dynamic-content"></div>')
                                user_info.append(content)
                                let content_header = $('<div class="content-header">\n' +
                                    '                <div class="content-user-data">\n' +
                                    '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                                    '                    <div class="content-time">' + timeformat(data.pub_date) + '</div>\n' +
                                    '                </div>\n' +
                                    '            </div>')
                                // 判断是否是自己发的动态
                                if (data.ismine) {
                                    let content_account_status = ('<div class="content-account-status">' +
                                        '<div class="delete-group">\n' +
                                        '<span>Delete</span>\n' +
                                        '</div>' +
                                        '</div>')
                                    content_header.append(content_account_status)
                                } else {
                                    let content_account_status = $('<div class="content-account-status"></div>')
                                    if (data.facebook_link) {
                                        let facebook_link_div = $('<div class="content-facebook" data-url="' + data.facebook_link + '"><img src="/static/images/fb.png" alt=""></div>')
                                        content_account_status.append(facebook_link_div)
                                    }
                                    content_header.append(content_account_status)
                                }

                                let content_data = $('<div class="content-data"></div>')
                                let content_text = $('<div class="content-text color-comment">\n' +
                                    '                    <span>' + data.content + '</span>\n' +
                                    '                </div>')
                                if (data.bgcolor) {
                                    content_text.addClass('bg-color')
                                    content_text.css('background-color', data.bgcolor)
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
                                    let vote_box = $('<div class="vote-box" isvote="' + data.isallvote + '"></div>')
                                    let vote_title = $('<div class="vote-title color-comment">' + data.votetitle + '</div>')
                                    let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Person Vote</div>')
                                    vote_box.append(vote_title)
                                    if (data.votedata) {
                                        for (let vote_item of data.votedata) {
                                            let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                                '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                                '                </div>')
                                            let vote_choose_num = $('<div class="vote-choose-num" >' + vote_item.num + '</div>')
                                            let vote_percent = $('<div class="vote-percent" ></div>')
                                            if (data.isallvote) {
                                                vote_choose_num.css('display', 'block')
                                                let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                                let width = percent + '%'
                                                vote_percent.css('width', width)
                                                if (vote_item.isVote) {
                                                    vote_percent.addClass('checked')
                                                } else {
                                                    vote_percent.addClass('unchecked')
                                                }
                                                vote_choose.append(vote_choose_num, vote_percent)
                                            } else {
                                                vote_percent.addClass('unchecked')
                                                vote_choose_num.css('display', 'none')
                                                vote_percent.css('width', '0%')
                                                vote_choose.append(vote_choose_num, vote_percent)
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
                                    collect.attr('data', 'true')
                                    let img = $('<img src="/static/images/collect2.png" alt="">')
                                    let span = $('<span class="color-comment">Collect</span>')
                                    collect.append(img, span)
                                } else {
                                    collect.attr('data', 'false')
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
                                    like.attr('data', 'true')
                                    let img = $('<img src="/static/images/like2.png" alt="" >')
                                    let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                                    like.append(img, likenum)
                                } else {
                                    like.attr('data', 'false')
                                    let img = $('<img src="/static/images/like1.png" alt="" >')
                                    let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                                    like.append(img, likenum)
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
                                info.append(parentDiv)
                                let comment_box = $('<div class="dynamic-comment-box"></div>')
                                parentDiv.append(comment_box)
                                for (let fbc of data.commentData.first_comment) {
                                    let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                                    let fbc_header = $('<div class="user-header">\n' +
                                        '                  <img src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                                        '               </div>')
                                    let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                                    let fbc_comment_text = $('<div class="comment-text">\n' +
                                        '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                                        '                            <span>:&nbsp;</span>\n' +
                                        '                        </div>')
                                    if (fbc.ismine) {
                                        let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                                        fbc_comment_text.append(fbc_delete)
                                    }
                                    let fbc_content = $('<div>' + fbc.content + '</div>')
                                    fbc_comment_text.append(fbc_content)
                                    let fbc_comment_op = $('<div class="comment-op">\n' +
                                        '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                                        '                            <div class="fbc-num">\n' +
                                        '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                                        '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                                        '                            </div>\n' +
                                        '                            <div class="reply">Reply</div>\n' +
                                        '                       </div>')
                                    fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                                    fbc_box.append(fbc_header, fbc_commentDate)
                                    if (fbc.secondComment.sbc_list) {
                                        for (let sbc of fbc.secondComment.sbc_list) {
                                            let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                                '                  <div class="user-header">\n' +
                                                '                       <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                                '                  </div>\n' +
                                                '            </div>')
                                            let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                            let sbc_comment_text = $('<div class="comment-text">\n' +
                                                '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                                '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                                '                     </div>')
                                            if (sbc.ismine) {
                                                let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                                sbc_comment_text.append(sbc_comment_delete)
                                            }
                                            let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                                            sbc_comment_text.append(sbc_comment_content)
                                            let sbc_comment_op = $('<div class="comment-op">\n' +
                                                '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                                '                        <div class="reply">Reply</div>\n' +
                                                '                   </div>')
                                            sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                            sbc_box.append(sbc_comment_data)
                                            fbc_commentDate.append(sbc_box)
                                        }
                                        if (fbc.sbc_num > 2) {
                                            let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/more2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                            fbc_commentDate.append(moreSBCBtn)
                                        }
                                    }
                                    comment_box.append(fbc_box)
                                }
                                if (data.fbc_num > 5) {
                                    let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                                        '<img src="/static/images/more1.png" alt="">\n' +
                                        '</div>')
                                    comment_box.append(moreFBCBtn)
                                }

                            }
                        }
                    })

                } else if (data.fast_type == 3) {
                    let ad_container = $('<div class="ad-container"></div>')
                    for (let ad of data.rounds_ad_group) {
                        let img = $('<div class="ad-div"><img src="/media/' + ad.img + '" data-url="' + ad.url + '" id="ad-img" ><div class="mask">Show Me More</div></div>')
                        ad_container.append(img)
                    }
                    info.append(ad_container)
                }
                container.append(div)

            }
            container.append(btn)
            fastinfo_page += 1

            // 加载快讯广告
            initFastInfoAd()
        }
    })

})

month_list = new Array("Jan", "Jan", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
week_list = new Array("Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun");

// 格式化时间函数
function checktime(str) {
    return str > 9 ? str : '0' + str;
}

// index 时间计时器
setInterval(function () {
    // main-time 元素中的时间
    let datetime = new Date()
    let year = datetime.getFullYear();
    let day = checktime(datetime.getDate());

    let month = month_list[datetime.getMonth() - 1];
    let hour = checktime(datetime.getHours());
    let minute = checktime(datetime.getMinutes());
    let second = checktime(datetime.getSeconds());
    let time = hour + ':' + minute + ':' + second;
    $('.days span').text(day);
    $('.month').text(month);
    $('.time').text(time);

    // Calendar 元素中的时间
    let calendar_head = $('.card-header .card-calendar-header')
    let month_digit = checktime(datetime.getMonth() + 1)
    let fullyear = year + '/' + month_digit + '/' + day;
    let week = week_list[datetime.getDay()]
    $('#calendar-head-fullyear').text(fullyear);
    $('#calendar-head-week').text(week);

    // calendar模块中的倒计时功能
    let nexttime = $('#card-calendar-body').children('div:first-child').children('div:first-child').children('.calendar-time').text()
    if (!nexttime) {
        let remaining_time = 'Next Date:  00:00:00'
        $('#remaining-time').text(remaining_time)
    } else {
        let nexttime_list = nexttime.split(':')
        let lefttime = new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), parseInt(nexttime_list[0]), parseInt(nexttime_list[1]), parseInt(nexttime_list[2])) - datetime
        if (lefttime <= 0) {
            $('#card-calendar-body').children('div:first-child').remove();
            let remaining_time = 'Next Date: 00 H 00 M 00 S'
            $('#remaining-time').text(remaining_time)
        } else {
            let lefthour = checktime(parseInt(lefttime / 1000 / 60 / 60 % 24))     // 剩余的小时数
            let leftminute = checktime(parseInt(lefttime / 1000 / 60 % 60));       // 剩余的分钟数
            let leftsecond = checktime(parseInt(lefttime / 1000 % 60));        // 剩余的秒数
            let remaining_time = 'Next Date:  ' + lefthour + ':' + leftminute + ':' + leftsecond
            $('#remaining-time').text(remaining_time)
        }

    }

}, 1000)

// 加载calendar模块数据
function getCalendarList() {
    $.ajax({
        url: '/getcalendarlist/',
        type: "get",
        success: function (result) {
            console.log(result)
            if (!result.success) {
                $('.card-calendar-body').innerHTML = '<div>' + result.msg + '</div>';
            } else {
                let containerDiv = $('.card-calendar-body')
                for (let data of result.data) {
                    let parentDiv = $('<div class="calendar-box color-comment font-14"></div>')
                    let time_star = $('<div>\n' +
                        '     <div class="calendar-time">' + data.pub_date + '</div>' +
                        '</div>')
                    let country_title = $('<div>\n' +
                        '      <img src="/static/images/flag/' + data.country + '.png" class="flag" width="30" height="20" alt="">\n' +
                        '      <div class="countryCode">' + data.country + '</div>\n' +
                        '      <div class="calendar-title">' + data.title + '</div>\n' +
                        '</div>')
                    let pre_exp_act = $('<div>\n' +
                        '       <div class="pre">Pre:' + data.previous + '</div>\n' +
                        '       <div class="exp">Exp:' + data.consensus + '</div>\n' +
                        '        <div class="act">Act:' + data.actual + '</div>\n' +
                        '</div>')
                    let starDiv = $('<div class="calendar-star"></div>')
                    for (let lightStar = 0; lightStar < data.star; lightStar++) {
                        let lightStarDiv = $('<svg t="1583754430858" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" width="16" height="16">\n' +
                            ' <path d="M747.682255 638.235053c10.091846 49.955762 18.998703 95.172593 26.714432 135.6464 3.560082 17.076934 6.824429 34.151821 9.795087 51.227732 2.965541 17.070794 5.78475 32.564673 8.456602 46.479591 2.673899 13.908778 4.897543 25.76685 6.67912 35.573193 1.778506 9.801227 2.968611 15.965623 3.560082 18.492166 1.778506 12.650111-0.889253 21.029966-8.010441 25.142633-7.125281 4.102435-15.138792 6.163373-24.041556 6.163373-2.968611 0-7.271614-1.110287-12.911054-3.319605-5.637394-2.215458-9.943466-3.954055-12.909008-5.217838L512.616542 804.236807c-42.147936 26.559912-80.432891 50.276057-114.864074 71.146387-14.842033 8.849552-29.529547 17.705244-44.073798 26.553773-14.544251 8.854669-27.754111 17.081027-39.625486 24.662703-11.872399 7.590885-22.109554 13.920034-30.714536 18.97926-8.610098 5.053086-14.398942 8.214079-17.364483 9.484002-5.936199 3.162016-12.023848 4.266164-18.256806 3.314489-6.235005-0.946558-11.872399-3.314489-16.915251-7.109931-5.043876-3.796466-8.756431-8.378831-11.129478-13.755282-2.376117-5.376451-2.965541-10.911514-1.781576-16.594957 0.596588-2.532683 2.078335-8.702196 4.453429-18.502399 2.376117-9.801227 5.043876-21.50171 8.013511-35.098379 2.965541-13.596669 6.380314-28.615735 10.239202-45.057195 3.857864-16.440437 7.862062-33.199123 12.018731-50.275034 8.904811-39.210024 18.996656-83.474157 30.274514-132.798539-35.021631-32.254611-66.482157-61.028958-94.381577-86.322018-11.872399-10.749832-23.598464-21.344121-35.173081-31.776727-11.574616-10.437723-21.963221-19.919678-31.162744-28.461215-9.203616-8.535397-16.769942-15.490809-22.705118-20.866237-5.936199-5.373381-9.203616-8.378831-9.800203-9.012258-7.121188-6.957459-13.20372-14.70184-18.250666-23.23826-5.043876-8.541537-6.975878-17.231453-5.785773-26.086122 1.187035-8.853645 4.449335-15.812127 9.79611-20.871353 5.340635-5.057179 11.275811-8.218172 17.807574-9.487072l275.131221-26.557866L470.766388 102.288664c3.560082-10.122545 8.608052-18.818601 15.140839-26.085098 6.526647-7.272637 15.432481-10.911514 26.710338-10.911514 5.935176 0 11.129478 1.425466 15.582907 4.267187 4.451382 2.847861 8.16189 6.16542 11.133571 9.959839 2.963495 3.795443 5.485945 7.589862 7.563256 11.386328 2.079358 3.794419 3.713578 6.954389 4.897543 9.485025l99.729375 254.222005 275.136338 27.510564c11.872399 3.160993 20.177552 6.955412 24.927739 11.380188 4.751211 4.426823 7.121188 11.383258 7.121188 20.87033 0 8.853645-2.521426 16.59905-7.566326 23.237237-5.047969 6.643304-11.42726 14.705933-19.144012 24.193005L747.682255 638.235053 747.682255 638.235053zM747.682255 638.235053"\n' +
                            ' p-id="2560" fill="#e8c04c"></path>\n' +
                            '</svg>')
                        starDiv.append(lightStarDiv);
                    }
                    for (let darkStar = 0; darkStar < (5 - data.star); darkStar++) {
                        let darkStarDiv = $('<svg t="1583754505767" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3027" width="16" height="16">\n' +
                            ' <path d="M747.682255 638.235053c10.091846 49.955762 18.998703 95.172593 26.714432 135.6464 3.560082 17.076934 6.824429 34.151821 9.795087 51.227732 2.965541 17.070794 5.78475 32.564673 8.456602 46.479591 2.673899 13.908778 4.897543 25.76685 6.67912 35.573193 1.778506 9.801227 2.968611 15.965623 3.560082 18.492166 1.778506 12.650111-0.889253 21.029966-8.010441 25.142633-7.125281 4.102435-15.138792 6.163373-24.041556 6.163373-2.968611 0-7.271614-1.110287-12.911054-3.319605-5.637394-2.215458-9.943466-3.954055-12.909008-5.217838L512.616542 804.236807c-42.147936 26.559912-80.432891 50.276057-114.864074 71.146387-14.842033 8.849552-29.529547 17.705244-44.073798 26.553773-14.544251 8.854669-27.754111 17.081027-39.625486 24.662703-11.872399 7.590885-22.109554 13.920034-30.714536 18.97926-8.610098 5.053086-14.398942 8.214079-17.364483 9.484002-5.936199 3.162016-12.023848 4.266164-18.256806 3.314489-6.235005-0.946558-11.872399-3.314489-16.915251-7.109931-5.043876-3.796466-8.756431-8.378831-11.129478-13.755282-2.376117-5.376451-2.965541-10.911514-1.781576-16.594957 0.596588-2.532683 2.078335-8.702196 4.453429-18.502399 2.376117-9.801227 5.043876-21.50171 8.013511-35.098379 2.965541-13.596669 6.380314-28.615735 10.239202-45.057195 3.857864-16.440437 7.862062-33.199123 12.018731-50.275034 8.904811-39.210024 18.996656-83.474157 30.274514-132.798539-35.021631-32.254611-66.482157-61.028958-94.381577-86.322018-11.872399-10.749832-23.598464-21.344121-35.173081-31.776727-11.574616-10.437723-21.963221-19.919678-31.162744-28.461215-9.203616-8.535397-16.769942-15.490809-22.705118-20.866237-5.936199-5.373381-9.203616-8.378831-9.800203-9.012258-7.121188-6.957459-13.20372-14.70184-18.250666-23.23826-5.043876-8.541537-6.975878-17.231453-5.785773-26.086122 1.187035-8.853645 4.449335-15.812127 9.79611-20.871353 5.340635-5.057179 11.275811-8.218172 17.807574-9.487072l275.131221-26.557866L470.766388 102.288664c3.560082-10.122545 8.608052-18.818601 15.140839-26.085098 6.526647-7.272637 15.432481-10.911514 26.710338-10.911514 5.935176 0 11.129478 1.425466 15.582907 4.267187 4.451382 2.847861 8.16189 6.16542 11.133571 9.959839 2.963495 3.795443 5.485945 7.589862 7.563256 11.386328 2.079358 3.794419 3.713578 6.954389 4.897543 9.485025l99.729375 254.222005 275.136338 27.510564c11.872399 3.160993 20.177552 6.955412 24.927739 11.380188 4.751211 4.426823 7.121188 11.383258 7.121188 20.87033 0 8.853645-2.521426 16.59905-7.566326 23.237237-5.047969 6.643304-11.42726 14.705933-19.144012 24.193005L747.682255 638.235053 747.682255 638.235053zM747.682255 638.235053"\n' +
                            ' p-id="3028" fill="#c8c8c8"></path>\n' +
                            '</svg>')
                        starDiv.append(darkStarDiv)
                    }
                    time_star.append(starDiv)
                    parentDiv.append(time_star, country_title, pre_exp_act)
                    containerDiv.append(parentDiv)
                }

            }
        }
    })
}

// 加载blog模块数据’
function getBlogList() {
    $.ajax({
        url: '/indexgrouplist/',
        type: 'get',
        success: function (result) {
            console.log('加载blog模块数据:', result)
            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('.right-user-dynamic-scroll-box')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<span>Delete</span>\n' +
                            '</div>' +
                            '</div>')
                        content_header.append(content_account_status)
                    } else {
                        let content_account_status = $('<div class="content-account-status"></div>')
                        if (data.facebook_link) {
                            let facebook_link_div = $('<div class="content-facebook" data-url="' + data.facebook_link + '"><img src="/static/images/fb.png" alt=""></div>')
                            content_account_status.append(facebook_link_div)
                        }
                        content_header.append(content_account_status)
                    }

                    let content_data = $('<div class="content-data"></div>')
                    let content_text = $('<div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor) {
                        content_text.addClass('bg-color')
                        content_text.css('background-color', data.bgcolor)
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
                        let vote_box = $('<div class="vote-box" isvote="' + data.isallvote + '"></div>')
                        let vote_title = $('<div class="vote-title color-comment">' + data.votetitle + '</div>')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Person Vote</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" >' + vote_item.num + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('unchecked')
                                    }
                                    vote_choose.append(vote_choose_num, vote_percent)
                                } else {
                                    vote_percent.addClass('unchecked')
                                    vote_choose_num.css('display', 'none')
                                    vote_percent.css('width', '0%')
                                    vote_choose.append(vote_choose_num, vote_percent)
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
                        collect.attr('data', 'true')
                        let img = $('<img src="/static/images/collect2.png" alt="">')
                        let span = $('<span class="color-comment">Collect</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
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
                        like.attr('data', 'true')
                        let img = $('<img src="/static/images/like2.png" alt="" >')
                        let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                        like.append(img, likenum)
                    } else {
                        like.attr('data', 'false')
                        let img = $('<img src="/static/images/like1.png" alt="" >')
                        let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                        like.append(img, likenum)
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
                }
                let moreBlogBtn = $('<div class="main-data-div">\n' +
                    '<div class="main-data-info">\n' +
                    '<div class="main-footer cursor-pointer"  id="indexMoreGroup" ">MORE INFORMATION</div>\n' +
                    '</div>\n' +
                    '</div>')
                dom.append(moreBlogBtn)
            }
        }
    })
}

index_group_page = 1
index_group_limit = 10
// index 加载更多group
$(document).on('click', '#indexMoreGroup', function () {
    let moreBtn = $(this).parents('.main-data-div')
    let offset = $(this).parents('.right-user-dynamic-scroll-box').find('.user-dynamic-box').length
    $.ajax({
        type: 'get',
        url: '/indexgrouplist/?page=' + index_group_page + '&limit=' + index_group_limit + '&offset=' + offset,
        success: function (result) {
            console.log(result)
            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('.right-user-dynamic-scroll-box')
                moreBtn.remove()
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<span>Delete</span>\n' +
                            '</div>' +
                            '</div>')
                        content_header.append(content_account_status)
                    } else {
                        let content_account_status = $('<div class="content-account-status"></div>')
                        if (data.facebook_link) {
                            let facebook_link_div = $('<div class="content-facebook" data-url="' + data.facebook_link + '"><img src="/static/images/fb.png" alt=""></div>')
                            content_account_status.append(facebook_link_div)
                        }
                        content_header.append(content_account_status)
                    }
                    let content_data = $('<div class="content-data"></div>')
                    let content_text = $('<div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor) {
                        content_text.addClass('bg-color')
                        content_text.css('background-color', data.bgcolor)
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
                        let vote_box = $('<div class="vote-box" isvote="' + data.isallvote + '"></div>')
                        let vote_title = $('<div class="vote-title color-comment">' + data.votetitle + '</div>')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Person Vote</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" >' + vote_item.num + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('unchecked')
                                    }
                                    vote_choose.append(vote_choose_num, vote_percent)
                                } else {
                                    vote_percent.addClass('unchecked')
                                    vote_choose_num.css('display', 'none')
                                    vote_percent.css('width', '0%')
                                    vote_choose.append(vote_choose_num, vote_percent)
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
                        collect.attr('data', 'true')
                        let img = $('<img src="/static/images/collect2.png" alt="">')
                        let span = $('<span class="color-comment">Collect</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
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
                        like.attr('data', 'true')
                        let img = $('<img src="/static/images/like2.png" alt="" >')
                        let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                        like.append(img, likenum)
                    } else {
                        like.attr('data', 'false')
                        let img = $('<img src="/static/images/like1.png" alt="" >')
                        let likenum = $('<span class="color-comment">' + data.likenum + '</span>')
                        like.append(img, likenum)
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
                }
                dom.append(moreBtn)
                index_group_page += 1
            }
        }
    })
})

// index 获取group评论区
index_fbc_page = 1
index_fbc_limit = 5
$(document).on('click', '#all-comments', function () {
    let _this = $(this)
    let blog_id = _this.parents('.user-dynamic-box').attr('data')
    let container = _this.parents('.user-dynamic-box')
    $.ajax({
        type: 'get',
        url: '/fbc/?id=' + blog_id + '&page=' + index_fbc_page + '&limit=' + index_fbc_limit,
        success: function (res) {
            console.log('获取group评论区:', res)
            if (!res.success) {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                let parentDiv = $('<div class="dynamic-comment-box"></div>')
                for (let fbc of res.data) {
                    let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                    let fbc_header = $('<div class="user-header">\n' +
                        '                  <img src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                        '               </div>')
                    let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                    let fbc_comment_text = $('<div class="comment-text">\n' +
                        '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                        '                            <span>:&nbsp;</span>\n' +
                        '                        </div>')
                    if (fbc.ismine) {
                        let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        fbc_comment_text.append(fbc_delete)
                    }
                    let fbc_content = $('<div>' + fbc.content + '</div>')
                    fbc_comment_text.append(fbc_content)
                    let fbc_comment_op = $('<div class="comment-op">\n' +
                        '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                        '                            <div class="fbc-num">\n' +
                        '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                        '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                        '                            </div>\n' +
                        '                            <div class="reply">Reply</div>\n' +
                        '                       </div>')
                    fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                    fbc_box.append(fbc_header, fbc_commentDate)
                    if (fbc.sbc) {
                        for (let sbc of fbc.sbc.sbc_list) {
                            let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                '                  <div class="user-header">\n' +
                                '                       <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                '                  </div>\n' +
                                '            </div>')
                            let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                            let sbc_comment_text = $('<div class="comment-text">\n' +
                                '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                '                     </div>')
                            if (sbc.ismine) {
                                let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                sbc_comment_text.append(sbc_comment_delete)
                            }
                            let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                            sbc_comment_text.append(sbc_comment_content)
                            let sbc_comment_op = $('<div class="comment-op">\n' +
                                '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                '                        <div class="reply">Reply</div>\n' +
                                '                   </div>')
                            sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                            sbc_box.append(sbc_comment_data)
                            fbc_commentDate.append(sbc_box)
                        }
                        if (fbc.sbc_num > 2) {
                            let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/more2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                            fbc_commentDate.append(moreSBCBtn)
                        }
                    }
                    parentDiv.append(fbc_box)
                }
                if (res.fbc_num > 5) {
                    let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                        '<img src="/static/images/more1.png" alt="">\n' +
                        '</div>')
                    parentDiv.append(moreFBCBtn)
                }
                container.append(parentDiv)
            }
        }
    })
})

// 加载更多一级评论
$(document).on('click', 'div[class="dynamic-comment-footer"]', function () {
    console.log('开始加载更多一级评论')
    let btn = $(this)
    let page = btn.data('page')
    let blog_id = btn.parents('.user-dynamic-box').attr('data')
    console.log('当前page:', page)
    if (!page) {
        page = 2
    }
    $.ajax({
        type: 'get',
        url: '/fbc/?id=' + blog_id + '&page=' + page + '&limit=' + index_fbc_limit,
        success: function (result) {
            console.log('加载更多一级评论', result)
            if (result.success) {
                for (let fbc of result.data) {
                    let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                    let fbc_header = $('<div class="user-header">\n' +
                        '                  <img src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                        '               </div>')
                    let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                    let fbc_comment_text = $('<div class="comment-text">\n' +
                        '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                        '                            <span>:&nbsp;</span>\n' +
                        '                        </div>')
                    if (fbc.ismine) {
                        let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        fbc_comment_text.append(fbc_delete)
                    }
                    let fbc_content = $('<div>' + fbc.content + '</div>')
                    fbc_comment_text.append(fbc_content)
                    let fbc_comment_op = $('<div class="comment-op">\n' +
                        '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                        '                            <div class="fbc-num">\n' +
                        '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                        '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                        '                            </div>\n' +
                        '                            <div class="reply">Reply</div>\n' +
                        '                       </div>')
                    fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                    fbc_box.append(fbc_header, fbc_commentDate)
                    if (fbc.sbc) {
                        for (let sbc of fbc.sbc.sbc_list) {
                            let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                '                  <div class="user-header">\n' +
                                '                       <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                '                  </div>\n' +
                                '            </div>')
                            let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                            let sbc_comment_text = $('<div class="comment-text">\n' +
                                '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                '                     </div>')
                            if (sbc.ismine) {
                                let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                sbc_comment_text.append(sbc_comment_delete)
                            }
                            let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                            sbc_comment_text.append(sbc_comment_content)
                            let sbc_comment_op = $('<div class="comment-op">\n' +
                                '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                '                        <div class="reply">Reply</div>\n' +
                                '                   </div>')
                            sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                            sbc_box.append(sbc_comment_data)
                            fbc_commentDate.append(sbc_box)
                        }
                        if (fbc.sbc_num > 2) {
                            let moreSBCBtn = $('<div class="more-sbc">' +
                                '<img src="/static/images/more2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span>' +
                                '</div>')
                            fbc_commentDate.append(moreSBCBtn)
                        }
                    }
                    btn.before(fbc_box)
                }
                btn.data('page', page + 1)
                console.log('加载之后page的值：', btn.data('page'), typeof btn.data('page'))
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + result.msg + '</div>')
                btn.remove()
            }

        },
    })

})

// index 加载更多二级评论
$(document).on('click', '.more-sbc', function () {
    let _this = $(this)
    let fbc_id = _this.parents('.fbc-box').attr('data')
    let page = _this.data('page')
    if (!page) {
        page = 1
    }
    let offset = _this.parent('.comment-data').find('.sbc-box').length

    $.ajax({
        type: 'get',
        url: `/sbc/?id=${fbc_id}&page=${page}&limit=10&offset=${offset}`,
        success: function (res) {
            console.log('加载更多二级评论：', res)
            if (!res.success) {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                for (let sbc of res.data) {
                    let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                        '     <div class="user-header">\n' +
                        '         <img src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                        '     </div>\n' +
                        '</div>')
                    let sbc_comment_data = $('<div class="comment-data color-comment"></div>')
                    let sbc_comment_text = $('<div class="comment-text">\n' +
                        '              <span class="content-user-name">' + sbc.username + '</span>\n' +
                        '              <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                        '         </div>\n')
                    let sbc_comment_op = $('<div class="comment-op">\n' +
                        '             <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                        '             <div class="reply">Reply</div>\n' +
                        '       </div>\n')
                    if (sbc.ismine) {
                        let sbc_comment_delete = $('<div class="delete-comment"><span>Delete</span></div>\n')
                        sbc_comment_text.append(sbc_comment_delete)
                    }
                    let sbc_comment_content = $('<div>' + sbc.content + '</div>')
                    sbc_comment_text.append(sbc_comment_content)
                    sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                    sbc_box.append(sbc_comment_data)


                    _this.before(sbc_box)
                }
                let loadnum = _this.parent('.comment-data').find('.sbc-box').length
                let unloadnum = res.sbc_num - loadnum
                if (unloadnum == 0) {
                    _this.remove();
                } else {
                    _this.children('span').text(`(${unloadnum})`)
                    _this.data('page', page + 1)
                }

            }
        }
    })
})

// 点击跳转评论
$(document).on('click', '#user-message', function () {

    $.ajax({
        type: 'get',
        url: '/updateremind/',
        success: function (res) {

            location.href = '/user/?num=2'
        }
    })
})
