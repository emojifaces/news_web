// 初始化mygroup模块数据
mygroup_page = 1
mygroup_limit = 10

function initMyGroup() {
    $.ajax({
        type: 'get',
        url: '/user/mygroup/',
        success: function (res) {
            console.log('mygroup初始化:', res)
            if (res.success) {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#my-group')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<img src="/static/images/delete_icon.png" alt="">\n' +
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
                        '                    <span class="group-content">' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor && (data.type == 0) && (data.img.length == 0)) {
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
                        let vote_title = $('<img class="vote_icon" src="/static/images/vote_icon.png">')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Người đã bình chọn</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" data-num="' + vote_item.num + '">' + calper(vote_item.num, data.votenum) + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('un-checked')
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
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss group-extend-comment" id="all-comments">\n' +
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
                        // '            <textarea class="group-1-input commentBox" rows="1"></textarea>\n' +
                        '            <textarea class="group-1-input commentBox" rows="1" id="textarea"></textarea>\n' +
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
                    for (let fbc of data.commentData.first_comment) {
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img class="fbc-head-img" src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        // if (fbc.ismine) {
                        //     let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        //     fbc_comment_text.append(fbc_delete)
                        // }
                        let fbc_content = $('<div class="fbc-content">' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                            '                            </div>\n' +
                            '                            <div class="reply fbc-reply">Bình luận</div>\n' +
                            '                       </div>')
                        if (fbc.ismine) {
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                            fbc_comment_op.append(fbc_delete)
                        }
                        fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img class="sbc-head-img" src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                // if (sbc.ismine) {
                                //     let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                //     sbc_comment_text.append(sbc_comment_delete)
                                // }
                                let sbc_comment_content = $('<div class="sbc-content">' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Bình luận</div>\n' +
                                    '                   </div>')
                                if (sbc.ismine) {
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                                    sbc_comment_op.append(sbc_comment_delete)
                                }
                                sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                            }
                            if (fbc.sbc_num > 2) {
                                let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/morecomment2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                fbc_commentDate.append(moreSBCBtn)
                            }
                        }
                        comment_box.append(fbc_box)
                    }
                    if (data.fbc_num > 5) {
                        let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                            '<img src="/static/images/morecomment1.png" alt="">\n' +
                            '</div>')
                        comment_box.append(moreFBCBtn)
                    }
                }


                let moreBlogBtn = $('<div class="main-data-div">\n' +
                    '<div class="main-data-info">\n' +
                    '<div class="main-footer cursor-pointer"  id="moreMyGroup" >Xem thêm</div>\n' +
                    '</div>\n' +
                    '</div>')
                dom.append(moreBlogBtn)
            }
        },
        beforeSend: function () {
            $('.user-load-div').show()
        },
        complete: function () {
            $('.user-load-div').hide()
            $('#my-group').find('.user-dynamic-box').each(function () {
                $(this).find('#textarea').flexText()
            })
        }
    })
}

// 加载更多mygroup数据
$(document).on('click', '#moreMyGroup', function () {
    let _this = $(this)
    let offset = _this.parents('#my-group').find('.user-dynamic-box').length
    let moreBtn = _this.parents('.main-data-div')
    moreBtn.remove()
    $.ajax({
        type: 'get',
        url: '/user/mygroup/?page=' + mygroup_page + '&limit=' + mygroup_limit + '&offset=' + offset,
        success: function (res) {
            console.log('加载更多mygroup:', res)
            if (res.success) {

                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#my-group')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<img src="/static/images/delete_icon.png" alt="">\n' +
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
                        '                    <span class="group-content">' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor && (data.type == 0) && (data.img.length == 0)) {
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
                        let vote_title = $('<img class="vote_icon" src="/static/images/vote_icon.png">')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Người đã bình chọn</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" data-num="' + vote_item.num + '">' + calper(vote_item.num, data.votenum) + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('un-checked')
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
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss group-extend-comment" id="all-comments">\n' +
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
                        // '            <textarea class="group-1-input commentBox" rows="1"></textarea>\n' +
                        '            <textarea class="group-1-input commentBox" rows="1" id="textarea"></textarea>\n' +
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
                    for (let fbc of data.commentData.first_comment) {
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img class="fbc-head-img" src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        // if (fbc.ismine) {
                        //     let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        //     fbc_comment_text.append(fbc_delete)
                        // }
                        let fbc_content = $('<div class="fbc-content">' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                            '                            </div>\n' +
                            '                            <div class="reply fbc-reply">Bình luận</div>\n' +
                            '                       </div>')
                        if (fbc.ismine) {
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                            fbc_comment_op.append(fbc_delete)
                        }
                        fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img class="sbc-head-img" src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                // if (sbc.ismine) {
                                //     let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                //     sbc_comment_text.append(sbc_comment_delete)
                                // }
                                let sbc_comment_content = $('<div class="sbc-content">' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Bình luận</div>\n' +
                                    '                   </div>')
                                if (sbc.ismine) {
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                                    sbc_comment_op.append(sbc_comment_delete)
                                }
                                sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                            }
                            if (fbc.sbc_num > 2) {
                                let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/morecomment2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                fbc_commentDate.append(moreSBCBtn)
                            }
                        }
                        comment_box.append(fbc_box)
                    }
                    if (data.fbc_num > 5) {
                        let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                            '<img src="/static/images/morecomment1.png" alt="">\n' +
                            '</div>')
                        comment_box.append(moreFBCBtn)
                    }
                }
                dom.append(moreBtn)
                mygroup_page += 1
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
                moreBtn.remove()
            }
        },
        error: function () {
            layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            moreBtn.remove()
        },
        beforeSend: function () {
            $('.user-load-div').show()
        },
        complete: function () {
            $('.user-load-div').hide()
            $('#my-group').find('.user-dynamic-box').each(function () {
                $(this).find('#textarea').flexText()
            })
        }
    })
})


// 加载mycomment模块数据
mycomment_page = 1
mycomment_limit = 10

// 初始化 我的评论
function initMyCommentList() {
    $.ajax({
        type: 'get',
        url: '/user/getmycomment/',
        success: function (res) {
            console.log('初始化--comment：', res)
            let dom = $('#comment')
            if (res.success) {
                for (let data of res.data) {
                    let comment_box = null
                    let comment_content = null
                    if (data.type == '1') {
                        comment_box = $('<div class="user-fbc-box" data="' + data.id + '" uid="' + data.userId + '"></div>')
                        comment_content = $('<div class="comment-content"><span>' + data.comment_content + '</span></div>')
                    } else {
                        comment_box = $('<div class="user-sbc-box" data="' + data.id + '" uid="' + data.userId + '"></div>')
                        comment_content = $('<div class="comment-content"><span class="name-link">@' + data.reply_user_name + '</span><span>:  ' + data.comment_content + '</span></div>')
                    }

                    let comment_container = $('<div class="comment-container"></div>')
                    let user_face = $('<div class="user-face"><img src="/media/' + data.comment_user_img + '" alt=""></div>')
                    comment_box.append(user_face, comment_container)

                    let comment_top = $('<div class="comment-top"></div>')
                    comment_container.append(comment_top)
                    let user_info = $('<div class="user-info">\n' +
                        '                       <div class="content-user-name">' + data.comment_user_name + '</div>\n' +
                        '                       <div>' + timeformat(data.pub_date) + '</div>\n' +
                        '              </div>')
                    comment_top.append(user_info)
                    if (data.ismine) {
                        let deleteBtn = $('<div class="delete-mycomment"><img src="/static/images/delete_icon.png" alt=""></div>')
                        comment_top.append(deleteBtn)
                    }
                    let comment_blog_box = $('<div class="comment-blog-box">\n' +
                        '                          <div class="blog-user-info">\n' +
                        '                               <div class="blog-user-name">@' + data.blog_user_name + '</div>\n' +
                        '                               <div class="comment-blog-content">' + data.blog_content + '</div>\n' +
                        '                           </div>\n' +
                        '                      </div>')
                    comment_container.append(comment_content, comment_blog_box)
                    dom.append(comment_box)
                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '            <div class="main-data-info">\n' +
                    '                <div class="main-footer cursor-pointer" id="moreMyComment">Xem thêm</div>\n' +
                    '            </div>\n' +
                    '        </div>')
                dom.append(moreBtn)
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            }
        },
    })
}

// 加载更多mycomment数据
$(document).on('click', '#moreMyComment', function () {
    let _this = $(this)
    let fbc_num = _this.parents('#comment').find('.user-fbc-box').length
    let sbc_num = _this.parents('#comment').find('.user-sbc-box').length
    let moreBtn = _this.parents('.main-data-div')
    moreBtn.remove()
    $.ajax({
        type: 'get',
        url: '/user/getmycomment/?fbc=' + fbc_num + '&sbc=' + sbc_num,
        success: function (res) {
            console.log('加载更多--comment：', res)

            let dom = $('#comment')
            if (res.success) {
                for (let data of res.data) {
                    let comment_box = null
                    let comment_content = null
                    if (data.type == '1') {
                        comment_box = $('<div class="user-fbc-box" data="' + data.id + '" uid="' + data.userId + '"></div>')
                        comment_content = $('<div class="comment-content"><span>' + data.comment_content + '</span></div>')
                    } else {
                        comment_box = $('<div class="user-sbc-box" data="' + data.id + '" uid="' + data.userId + '"></div>')
                        comment_content = $('<div class="comment-content"><span class="name-link">@' + data.reply_user_name + '</span><span>:  ' + data.comment_content + '</span></div>')
                    }

                    let comment_container = $('<div class="comment-container"></div>')
                    let user_face = $('<div class="user-face"><img src="/media/' + data.comment_user_img + '" alt=""></div>')
                    comment_box.append(user_face, comment_container)

                    let comment_top = $('<div class="comment-top"></div>')
                    comment_container.append(comment_top)
                    let user_info = $('<div class="user-info">\n' +
                        '                       <div class="content-user-name">' + data.comment_user_name + '</div>\n' +
                        '                       <div>' + timeformat(data.pub_date) + '</div>\n' +
                        '              </div>')
                    comment_top.append(user_info)
                    if (data.ismine) {
                        let deleteBtn = $('<div class="delete-mycomment"><img src="/static/images/delete_icon.png" alt=""></div>')
                        comment_top.append(deleteBtn)
                    }
                    let comment_blog_box = $('<div class="comment-blog-box">\n' +
                        '                          <div class="blog-user-info">\n' +
                        '                               <div class="blog-user-name">@' + data.blog_user_name + '</div>\n' +
                        '                               <div class="comment-blog-content">' + data.blog_content + '</div>\n' +
                        '                           </div>\n' +
                        '                      </div>')
                    comment_container.append(comment_content, comment_blog_box)
                    dom.append(comment_box)
                }
                dom.append(moreBtn)
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            }
        },
        beforeSend: function () {
            $('.user-load-div').show()
        },
        complete: function () {
            $('.user-load-div').hide()
        }
    })
})

// 加载mycollect模块数据
mycollect_page = 1
mycollect_limit = 10

function initMyCollect() {
    $.ajax({
        type: 'get',
        url: '/user/mycollect/?page=' + mycollect_page + '&limit=' + mycollect_limit,
        success: function (res) {
            console.log('mycollect初始化:', res)
            if (res.success) {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#collect')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<img src="/static/images/delete_icon.png" alt="">\n' +
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
                        '                    <span class="group-content">' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor && (data.type == 0) && (data.img.length == 0)) {
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
                        let vote_title = $('<img class="vote_icon" src="/static/images/vote_icon.png">')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Người đã bình chọn</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" data-num="' + vote_item.num + '">' + calper(vote_item.num, data.votenum) + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('un-checked')
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
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss group-extend-comment" id="all-comments">\n' +
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
                        // '            <textarea class="group-1-input commentBox" rows="1"></textarea>\n' +
                        '            <textarea class="group-1-input commentBox" rows="1" id="textarea"></textarea>\n' +
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
                    for (let fbc of data.commentData.first_comment) {
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img class="fbc-head-img" src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        // if (fbc.ismine) {
                        //     let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        //     fbc_comment_text.append(fbc_delete)
                        // }
                        let fbc_content = $('<div class="fbc-content">' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                            '                            </div>\n' +
                            '                            <div class="reply fbc-reply">Bình luận</div>\n' +
                            '                       </div>')
                        if (fbc.ismine) {
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                            fbc_comment_op.append(fbc_delete)
                        }
                        fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img class="sbc-head-img" src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                // if (sbc.ismine) {
                                //     let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                //     sbc_comment_text.append(sbc_comment_delete)
                                // }
                                let sbc_comment_content = $('<div class="sbc-content">' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Bình luận</div>\n' +
                                    '                   </div>')
                                if (sbc.ismine) {
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                                    sbc_comment_op.append(sbc_comment_delete)
                                }
                                sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                            }
                            if (fbc.sbc_num > 2) {
                                let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/morecomment2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                fbc_commentDate.append(moreSBCBtn)
                            }
                        }
                        comment_box.append(fbc_box)
                    }
                    if (data.fbc_num > 5) {
                        let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                            '<img src="/static/images/morecomment1.png" alt="">\n' +
                            '</div>')
                        comment_box.append(moreFBCBtn)
                    }
                }


                let moreBlogBtn = $('<div class="main-data-div">\n' +
                    '<div class="main-data-info">\n' +
                    '<div class="main-footer cursor-pointer"  id="moreMyCollect" ">Xem thêm</div>\n' +
                    '</div>\n' +
                    '</div>')
                dom.append(moreBlogBtn)
            }
        },
        complete: function () {
            $('.user-load-div').hide()
            $('#collect').find('.user-dynamic-box').each(function () {
                $(this).find('#textarea').flexText()
            })
        }
    })
}

// 加载更多mycollect数据
$(document).on('click', '#moreMyCollect', function () {
    mycollect_page += 1
    let _this = $(this)
    _this.parents('.main-data-div').remove()
    $.ajax({
        type: 'get',
        url: '/user/mycollect/?page=' + mycollect_page + '&limit=' + mycollect_limit,
        success: function (result) {
            console.log('加载mycollect:', result)

            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + result.msg + '</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('#collect')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<img src="/static/images/delete_icon.png" alt="">\n' +
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
                        '                    <span class="group-content">' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor && (data.type == 0) && (data.img.length == 0)) {
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
                        let vote_title = $('<img class="vote_icon" src="/static/images/vote_icon.png">')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Người đã bình chọn</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" data-num="' + vote_item.num + '">' + calper(vote_item.num, data.votenum) + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('un-checked')
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
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss group-extend-comment" id="all-comments">\n' +
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
                        // '            <textarea class="group-1-input commentBox" rows="1"></textarea>\n' +
                        '            <textarea class="group-1-input commentBox" rows="1" id="textarea"></textarea>\n' +
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
                    for (let fbc of data.commentData.first_comment) {
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img class="fbc-head-img" src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        // if (fbc.ismine) {
                        //     let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        //     fbc_comment_text.append(fbc_delete)
                        // }
                        let fbc_content = $('<div class="fbc-content">' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                            '                            </div>\n' +
                            '                            <div class="reply fbc-reply">Bình luận</div>\n' +
                            '                       </div>')
                        if (fbc.ismine) {
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                            fbc_comment_op.append(fbc_delete)
                        }
                        fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img class="sbc-head-img" src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                // if (sbc.ismine) {
                                //     let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                //     sbc_comment_text.append(sbc_comment_delete)
                                // }
                                let sbc_comment_content = $('<div class="sbc-content">' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Bình luận</div>\n' +
                                    '                   </div>')
                                if (sbc.ismine) {
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                                    sbc_comment_op.append(sbc_comment_delete)
                                }
                                sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                            }
                            if (fbc.sbc_num > 2) {
                                let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/morecomment2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                fbc_commentDate.append(moreSBCBtn)
                            }
                        }
                        comment_box.append(fbc_box)
                    }
                    if (data.fbc_num > 5) {
                        let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                            '<img src="/static/images/morecomment1.png" alt="">\n' +
                            '</div>')
                        comment_box.append(moreFBCBtn)
                    }
                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '            <div class="main-data-info">\n' +
                    '                <div class="main-footer cursor-pointer" id="moreMyCollect">Xem thêm</div>\n' +
                    '            </div>\n' +
                    '        </div>')
                dom.append(moreBtn)
            }
        },
        error: function () {
            layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            _this.parents('.main-data-div').remove()
        },
        beforeSend: function () {
            $('.user-load-div').show()
        },
        complete: function () {
            $('.user-load-div').hide()
            $('#collect').find('.user-dynamic-box').each(function () {
                $(this).find('#textarea').flexText()
            })
        }
    })
})

// 加载myblacklist模块数据

function initBlackList() {
    $.ajax({
        type: 'get',
        url: '/user/blacklist/',
        success: function (result) {
            console.log(result)
            if (!result.success) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let dom = $('#blacklist')
                for (let data of result.data) {
                    let container = $('<div class="black-box" uid="' + data.userId + '"></div>')
                    let user_head = $('<img class="black-head" src="/media/' + data.black_img + '">')
                    let user_name = $('<span class="black-name">' + data.black_name + '</span>')
                    let remove_btn = $('<span class="black-remove">Remove</span>')
                    let user_gender = data.gender
                    let gender = null
                    if (user_gender == 1) {
                        gender = $('<img src="/static/images/male.png">')
                    } else {
                        gender = $('<img src="/static/images/famale.png">')
                    }
                    // let user_slogan = $('<span class="black-slogan">'+data.black_slogan+'</span>')
                    container.append(user_head, user_name, gender, remove_btn)
                    dom.append(container)
                }
            }
        },

    })
}

// 初始化用户详情动态
function initUserDetail() {
    let user_id = window.location.pathname.split('/').pop()
    $.ajax({
        type: 'get',
        url: '/user/usergrouplist/' + user_id,
        success: function (res) {
            console.log('user-group初始化:', res)
            if (res.success) {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#user-detail-group')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<img src="/static/images/delete_icon.png" alt="">\n' +
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
                        '                    <span class="group-content">' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor && (data.type == 0) && (data.img.length == 0)) {
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
                        let vote_title = $('<img class="vote_icon" src="/static/images/vote_icon.png">')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Người đã bình chọn</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" data-num="' + vote_item.num + '">' + calper(vote_item.num, data.votenum) + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('un-checked')
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
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss group-extend-comment" id="all-comments">\n' +
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
                        // '            <textarea class="group-1-input commentBox" rows="1"></textarea>\n' +
                        '            <textarea class="group-1-input commentBox" rows="1" id="textarea"></textarea>\n' +
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
                    for (let fbc of data.commentData.first_comment) {
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img class="fbc-head-img" src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        // if (fbc.ismine) {
                        //     let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        //     fbc_comment_text.append(fbc_delete)
                        // }
                        let fbc_content = $('<div class="fbc-content">' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                            '                            </div>\n' +
                            '                            <div class="reply fbc-reply">Bình luận</div>\n' +
                            '                       </div>')
                        if (fbc.ismine) {
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                            fbc_comment_op.append(fbc_delete)
                        }
                        fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img class="sbc-head-img" src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                // if (sbc.ismine) {
                                //     let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                //     sbc_comment_text.append(sbc_comment_delete)
                                // }
                                let sbc_comment_content = $('<div class="sbc-content">' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Bình luận</div>\n' +
                                    '                   </div>')
                                if (sbc.ismine) {
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                                    sbc_comment_op.append(sbc_comment_delete)
                                }
                                sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                            }
                            if (fbc.sbc_num > 2) {
                                let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/morecomment2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                fbc_commentDate.append(moreSBCBtn)
                            }
                        }
                        comment_box.append(fbc_box)
                    }
                    if (data.fbc_num > 5) {
                        let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                            '<img src="/static/images/morecomment1.png" alt="">\n' +
                            '</div>')
                        comment_box.append(moreFBCBtn)
                    }
                }


                let moreBlogBtn = $('<div class="main-data-div">\n' +
                    '<div class="main-data-info">\n' +
                    '<div class="main-footer cursor-pointer"  id="moreUserGroup" >Xem thêm</div>\n' +
                    '</div>\n' +
                    '</div>')
                dom.append(moreBlogBtn)
            }
        },
        beforeSend: function () {
            $('.user-load-div').show()
        },
        complete: function () {
            $('.user-load-div').hide()
            $('#user-detail-group').find('.user-dynamic-box').each(function () {
                $(this).find('#textarea').flexText()
            })
        }
    })
}

user_detail_page = 1
user_detail_limit = 10
// 加载更多用户详情动态
$(document).on('click', '#moreUserGroup', function () {
    let user_id = window.location.pathname.split('/').pop()
    user_detail_page += 1
    let _this = $(this)
    let moreBtn = _this.parents('.main-data-div')
    moreBtn.remove()
    $.ajax({
        type: 'get',
        url: '/user/usergrouplist/' + user_id + '/?page=' + user_detail_page + '&limit=' + user_detail_limit,
        success: function (res) {
            console.log('加载更多user-group:', res)
            if (res.success) {

                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#user-detail-group')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '" >')
                    let info = $('<div class="dynamic-info" uid="' + data.userId + '"></div>')
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
                    if (data.ismine) {
                        let content_account_status = ('<div class="content-account-status">' +
                            '<div class="delete-group">\n' +
                            '<img src="/static/images/delete_icon.png" alt="">\n' +
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
                        '                    <span class="group-content">' + data.content + '</span>\n' +
                        '                </div>')
                    if (data.bgcolor && (data.type == 0) && (data.img.length == 0)) {
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
                        let vote_title = $('<img class="vote_icon" src="/static/images/vote_icon.png">')
                        let all_vote = $('<div class="allVote color-comment" id="allVote">' + data.votenum + ' Người đã bình chọn</div>')
                        vote_box.append(vote_title)
                        if (data.votedata) {
                            for (let vote_item of data.votedata) {
                                let vote_choose = $('<div class="vote-choose" vote="' + vote_item.id + '" data="' + vote_item.isVote + '">\n' +
                                    '                     <div class="vote-choose-txt">' + vote_item.content + '</div>\n' +
                                    '                </div>')
                                let vote_choose_num = $('<div class="vote-choose-num" data-num="' + vote_item.num + '">' + calper(vote_item.num, data.votenum) + '</div>')
                                let vote_percent = $('<div class="vote-percent" ></div>')
                                if (data.isallvote) {
                                    vote_choose_num.css('display', 'block')
                                    let percent = (parseInt(vote_item.num) / parseInt(data.votenum)) * 100
                                    let width = percent + '%'
                                    vote_percent.css('width', width)
                                    if (vote_item.isVote) {
                                        vote_percent.addClass('checked')
                                    } else {
                                        vote_percent.addClass('un-checked')
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
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    } else {
                        collect.attr('data', 'false')
                        let img = $('<img src="/static/images/collcet1.png" alt="">')
                        let span = $('<span class="color-comment">Sưu tầm</span>')
                        collect.append(img, span)
                    }
                    let discuss = $('<div class="discuss group-extend-comment" id="all-comments">\n' +
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
                        // '            <textarea class="group-1-input commentBox" rows="1"></textarea>\n' +
                        '            <textarea class="group-1-input commentBox" rows="1" id="textarea"></textarea>\n' +
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
                    for (let fbc of data.commentData.first_comment) {
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '" uid="' + fbc.userId + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img class="fbc-head-img" src="/media/' + fbc.header + '" width="40" height="40" alt="">\n' +
                            '               </div>')
                        let fbc_commentDate = $('<div class="comment-data color-comment"></div>')
                        let fbc_comment_text = $('<div class="comment-text">\n' +
                            '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                            '                            <span>:&nbsp;</span>\n' +
                            '                        </div>')
                        // if (fbc.ismine) {
                        //     let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><span>Delete</span></div>')
                        //     fbc_comment_text.append(fbc_delete)
                        // }
                        let fbc_content = $('<div class="fbc-content">' + fbc.content + '</div>')
                        fbc_comment_text.append(fbc_content)
                        let fbc_comment_op = $('<div class="comment-op">\n' +
                            '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                            '                            <div class="fbc-num">\n' +
                            '                                  <img src="/static/images/commentnumicon.png" alt="">\n' +
                            '                                  <span>(' + fbc.sbc_num + ')</span>\n' +
                            '                            </div>\n' +
                            '                            <div class="reply fbc-reply">Bình luận</div>\n' +
                            '                       </div>')
                        if (fbc.ismine) {
                            let fbc_delete = $('<div class="delete-comment" id="delete-fbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                            fbc_comment_op.append(fbc_delete)
                        }
                        fbc_commentDate.append(fbc_comment_text, fbc_comment_op)
                        fbc_box.append(fbc_header, fbc_commentDate)
                        if (fbc.secondComment.sbc_list) {
                            for (let sbc of fbc.secondComment.sbc_list) {
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="' + sbc.id + '" uid="' + sbc.userId + '">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img class="sbc-head-img" src="/media/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                    '                  </div>\n' +
                                    '            </div>')
                                let sbc_comment_data = $('<div class="comment-data color-comment"></div>')

                                let sbc_comment_text = $('<div class="comment-text">\n' +
                                    '                          <span class="content-user-name">' + sbc.username + '</span>\n' +
                                    '                          <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                    '                     </div>')
                                // if (sbc.ismine) {
                                //     let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><span>Delete</span></div>')
                                //     sbc_comment_text.append(sbc_comment_delete)
                                // }
                                let sbc_comment_content = $('<div class="sbc-content">' + sbc.content + '</div>')
                                sbc_comment_text.append(sbc_comment_content)
                                let sbc_comment_op = $('<div class="comment-op">\n' +
                                    '                        <div class="content-time">' + timeformat(sbc.pub_date) + '</div>\n' +
                                    '                        <div class="reply">Bình luận</div>\n' +
                                    '                   </div>')
                                if (sbc.ismine) {
                                    let sbc_comment_delete = $('<div class="delete-comment" id="delete-sbc"><img src="/static/images/delete_icon.png" alt=""></div>')
                                    sbc_comment_op.append(sbc_comment_delete)
                                }
                                sbc_comment_data.append(sbc_comment_text, sbc_comment_op)
                                sbc_box.append(sbc_comment_data)
                                fbc_commentDate.append(sbc_box)
                            }
                            if (fbc.sbc_num > 2) {
                                let moreSBCBtn = $('<div class="more-sbc"><img src="/static/images/morecomment2.png" alt="">&nbsp;&nbsp;<span>(' + (fbc.sbc_num - 2) + ')</span></div>')
                                fbc_commentDate.append(moreSBCBtn)
                            }
                        }
                        comment_box.append(fbc_box)
                    }
                    if (data.fbc_num > 5) {
                        let moreFBCBtn = $('<div class="dynamic-comment-footer">\n' +
                            '<img src="/static/images/morecomment1.png" alt="">\n' +
                            '</div>')
                        comment_box.append(moreFBCBtn)
                    }
                }
                dom.append(moreBtn)
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                moreBtn.remove()
            }
        },
        error: function () {
            layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            moreBtn.remove()
        },
        beforeSend: function () {
            $('.user-load-div').show()
        },
        complete: function () {
            $('.user-load-div').hide()
            $('#my-group').find('.user-dynamic-box').each(function () {
                $(this).find('#textarea').flexText()
            })
        }
    })
})

// 点击添加黑名单按钮添加黑名单
$(document).on('click', '.add-black-btn', function () {
    let _this = $(this)
    let id = $(this).attr('data')
    $.ajax({
        type: 'get',
        url: '/user/addblacklist/?id=' + id,
        success: function (res) {
            if (res.success) {
                _this.remove()
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            }

        }
    })
})

// 点击修改按钮修改个人信息
$(document).on('click', '#modify-personal-information', function () {
    console.log('开始修改')

    let _this = $(this)
    let btn = _this.parents('.personal-info')
    if (btn.find('.personal-info-submit').length) {
        return null
    } else {
        let nameNode = btn.find('.personal-name')
        let genderNode = btn.find('.personal-gender')
        let birthdayNode = btn.find('.personal-birthday')
        // let phoneNode = btn.find('.personal-phone')
        // let facebookNode = btn.find('.personal-facebook')
        let facebook_linkNode = btn.find('.personal-facebook-link')
        // let sloganNode = btn.find('.personal-slogan')
        let submit_btn = $('<div class="personal-info-submit"><button type="button">gửi đi</button></div>')
        _this.parents('.personal-info').append(submit_btn)
        let old_name = nameNode.text().trim()
        let old_gender = genderNode.text().trim()
        let old_birthday = birthdayNode.text().trim()
        // let old_phone = phoneNode.text().trim()
        // let old_facebook = facebookNode.text().trim()
        let old_facebook_link = facebook_linkNode.text().trim()
        // let old_slogan = sloganNode.text().trim()
        nameNode.html('<input type="text" value="' + old_name + '">')
        if (old_gender == 'Man') {
            var gender_html = '<input type="radio" value="1" name="gender" checked>Man<input type="radio" value="2" name="gender">Woman'
        } else {
            var gender_html = '<input type="radio" value="1" name="gender">Man<input type="radio" value="2" name="gender" checked>Woman'
        }
        genderNode.html(gender_html)
        if (old_birthday == "INPUT BIRTHDAY") {
            birthdayNode.html('<input class="personal-birthday-input" type="text" placeholder="Sinh nhật" readonly="readonly">')
        } else {
            birthdayNode.html('<input class="personal-birthday-input" type="text" value="' + old_birthday + '" readonly="readonly">')
        }

        // if (old_phone == "INPUT PHONE") {
        //     phoneNode.html('<input type="text" placeholder="Điện thoại di động">')
        // } else {
        //     phoneNode.html('<input type="text" value="' + old_phone + '">')
        // }

        // if (old_facebook == 'INPUT FACEBOOK') {
        //     facebookNode.html('<input type="text" placeholder="Đường dẫn Facebook">')
        // } else {
        //     facebookNode.html('<input type="text" value="' + old_facebook + '">')
        // }
        if (old_facebook_link == 'INPUT FACEBOOK-LINK') {
            facebook_linkNode.html('<input type="text" placeholder="Đường dẫn Facebook">')
        } else {
            facebook_linkNode.html('<input type="text" value="' + old_facebook_link + '">')
        }
        // if (old_slogan == "INPUT SLOGAN") {
        //     sloganNode.html('<input type="text" placeholder="Chữ ký cá nhân">')
        // } else {
        //     sloganNode.html('<input type="text" value="' + old_slogan + '">')
        // }

        bindDateTimePicker()
    }

})


// 封装datetimepicker方法
function bindDateTimePicker() {
//     $('.personal-birthday input').datepicker({
//     format: 'yyyy-mm-dd',
//     orientation: "bottom auto",
//     todayHighlight: true,
//     autoclose: true
// })
    let input = $('.personal-birthday-input')
    laydate.render({
        elem: '.personal-birthday input',//指定元素
        lang: 'en',
        trigger: 'click',
        done: function (value, date, endDate) {

            input.val(value)
        }
    });
}


// 提交修改后的个人信息
$(document).on('click', '.personal-info-submit button', function () {
    console.log('提交个人信息')
    let _this = $(this)

    let new_name = _this.parents('.personal-info').find('.personal-name input').val()
    let new_gender = _this.parents('.personal-info').find('.personal-gender input[name="gender"]:checked').val()
    let new_birthday = _this.parents('.personal-info').find('.personal-birthday input').val()
    // let new_phone = _this.parents('.personal-info').find('.personal-phone input').val()
    // let new_facebook = _this.parents('.personal-info').find('.personal-facebook input').val()
    let new_facebook_link = _this.parents('.personal-info').find('.personal-facebook-link input').val()
    // let new_slogan = _this.parents('.personal-info').find('.personal-slogan input').val()

    let nameNode = _this.parents('.personal-info').find('.personal-name')
    let genderNode = _this.parents('.personal-info').find('.personal-gender')
    let birthdayNode = _this.parents('.personal-info').find('.personal-birthday')
    // let phoneNode = _this.parents('.personal-info').find('.personal-phone')
    // let facebookNode = _this.parents('.personal-info').find('.personal-facebook')
    let facebook_link_Node = _this.parents('.personal-info').find('.personal-facebook-link')
    // let sloganNode = _this.parents('.personal-info').find('.personal-slogan')

    let regexp = new RegExp("^https\\:/{2}w{3}\\.facebook\\.com.*", "i");
    if (new_facebook_link != '') {
        if (regexp.test(new_facebook_link)) {
            $.ajax({
                url: '/user/modifypersonalinfo/',
                type: 'post',
                data: {
                    'name': new_name,
                    'gender': new_gender,
                    'birthday': new_birthday,
                    // 'phone': new_phone,
                    // 'facebook': new_facebook,
                    'facebook_link': new_facebook_link,
                    // 'slogan': new_slogan
                },
                success: function (res) {
                    if (res.success) {
                        nameNode.html(new_name)
                        if (new_gender == '1') {
                            genderNode.html('Man')
                            $('.gender').attr('src', '/static/images/male.png')
                        } else {
                            genderNode.html('Woman')
                            $('.gender').attr('src', '/static/images/famale.png')
                        }
                        birthdayNode.html(new_birthday)
                        // if (new_phone == '') {
                        //     phoneNode.html('<span class="blank-info">INPUT PHONE</span>')
                        // } else {
                        //     phoneNode.html(new_phone)
                        // }
                        // if (new_facebook == '') {
                        //     facebookNode.html('<span class="blank-info">INPUT FACEBOOK</span>')
                        // } else {
                        //     facebookNode.html(new_facebook)
                        // }
                        if (new_facebook_link == '') {
                            facebook_link_Node.html('<span class="blank-info">INPUT FACEBOOK-LINK</span>')
                        } else {
                            facebook_link_Node.html(new_facebook_link)
                        }
                        // if (new_slogan == '') {
                        //     sloganNode.html('<span class="blank-info">INPUT SLOGAN</span>')
                        //     $('.user-profile').html('')
                        // } else {
                        //     sloganNode.html(new_slogan)
                        //     $('.user-profile').html(new_slogan)
                        // }

                        $('.user-name').html(new_name)


                        _this.parent('div').remove()
                        layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                    } else {
                        layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                        location.reload()
                    }
                }
            })
        } else {
            layer.msg('<div style="color: black;text-align: center;">Incorrect Facebook link format</div>')
        }
    } else {
        $.ajax({
            url: '/user/modifypersonalinfo/',
            type: 'post',
            data: {
                'name': new_name,
                'gender': new_gender,
                'birthday': new_birthday,
                // 'phone': new_phone,
                // 'facebook': new_facebook,
                'facebook_link': new_facebook_link,
                // 'slogan': new_slogan
            },
            success: function (res) {
                if (res.success) {
                    nameNode.html(new_name)
                    if (new_gender == '1') {
                        genderNode.html('Man')
                        $('.gender').attr('src', '/static/images/male.png')
                    } else {
                        genderNode.html('Woman')
                        $('.gender').attr('src', '/static/images/famale.png')
                    }
                    birthdayNode.html(new_birthday)
                    // if (new_phone == '') {
                    //     phoneNode.html('<span class="blank-info">INPUT PHONE</span>')
                    // } else {
                    //     phoneNode.html(new_phone)
                    // }
                    // if (new_facebook == '') {
                    //     facebookNode.html('<span class="blank-info">INPUT FACEBOOK</span>')
                    // } else {
                    //     facebookNode.html(new_facebook)
                    // }
                    if (new_facebook_link == '') {
                        facebook_link_Node.html('<span class="blank-info">INPUT FACEBOOK-LINK</span>')
                    } else {
                        facebook_link_Node.html(new_facebook_link)
                    }
                    // if (new_slogan == '') {
                    //     sloganNode.html('<span class="blank-info">INPUT SLOGAN</span>')
                    //     $('.user-profile').html('')
                    // } else {
                    //     sloganNode.html(new_slogan)
                    //     $('.user-profile').html(new_slogan)
                    // }

                    $('.user-name').html(new_name)


                    _this.parent('div').remove()
                    layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                } else {
                    layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
                    location.reload()
                }
            }
        })
    }

})

// 解除黑名单
$(document).on('click', '.black-remove', function () {
    let _this = $(this)
    let userId = _this.parent('.black-box').attr('uid')
    $.ajax({
        type: 'get',
        url: '/user/removeblacklist/?id=' + userId,
        success: function (res) {
            if (res.success) {
                _this.parent('.black-box').remove()
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            }
        }
    })
})

// 黑名单页面跳转用户详情
$(document).on('click', '.black-head', function () {
    let uid = $(this).parent('.black-box').attr('uid')
    location.href = '/user/userdetail/' + uid
})
$(document).on('click', '.black-name', function () {
    let uid = $(this).parent('.black-box').attr('uid')
    location.href = '/user/userdetail/' + uid
})

$(document).on('click', '.blog-left-top', function () {
    let url = $(this).attr('data-url')
    window.open(url)
})

// 修改用户头像
$(document).on('click', '#user-head-img', function () {
    $('#user-head-img-input').click();
})
$(document).on('change', '#user-head-img-input', function () {
    let fd = new FormData();
    let img = $(this)[0].files[0];
    fd.append('img', img)
    console.log(fd)
    $.ajax({
        type: 'post',
        url: '/user/moduserhead/',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.success) {
                location.reload()
            } else {
                layer.msg('<div style="color: black;text-align: center;">' + res.msg + '</div>')
            }
        }
    })
})

