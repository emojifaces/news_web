// 初始化mygroup模块数据
mygroup_page = 1
mygroup_limit = 10
function initMyGroup() {
    $.ajax({
        type:'get',
        url:'/user/mygroup/',
        success:function (res) {
            console.log('mygroup初始化:',res)
            if(res.success){
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#my-group')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/head/' + data.header + '" width="40" height="40" alt="">\n' +
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

                    let content_data = $('<div class="content-data">\n' +
                        '                <div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>\n' +
                        '            </div>')
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/images/' + img + '" class="alert-img" alt="">')
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
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img src="/media/head/' + fbc.header + '" width="40" height="40" alt="">\n' +
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
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
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
                        '<div class="main-footer cursor-pointer"  id="moreMyGroup" ">MORE INFORMATION</div>\n' +
                        '</div>\n' +
                        '</div>')
                dom.append(moreBlogBtn)
            }
        }
    })
}

// 加载更多mygroup数据
$(document).on('click','#moreMyGroup',function () {
    let _this = $(this)
    let offset = _this.parents('#my-group').find('.user-dynamic-box').length
    let moreBtn = _this.parents('.main-data-div')
    $.ajax({
        type:'get',
        url: '/user/mygroup/?page='+mygroup_page+'&limit='+mygroup_limit+'&offset='+offset,
        success:function (res) {
            console.log('加载更多mygroup:',res)
            if(res.success){
                moreBtn.remove()
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = res.data;    //  动态列表
                let dom = $('#my-group')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/head/' + data.header + '" width="40" height="40" alt="">\n' +
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

                    let content_data = $('<div class="content-data">\n' +
                        '                <div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>\n' +
                        '            </div>')
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/images/' + img + '" class="alert-img" alt="">')
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
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img src="/media/head/' + fbc.header + '" width="40" height="40" alt="">\n' +
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
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
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
                mygroup_page += 1
            }
        },
        error:function () {
            layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            moreBtn.remove()
        }
    })
})


// 加载mycomment模块数据
mycomment_page = 1
mycomment_limit = 10
function initMyComment() {
    console.log(comment)
    $.ajax({
        type:'get',
        url:'/user/mycomment/?page='+mycomment_page+'&limit='+mycomment_limit,
        success:function (result) {
            console.log(result)
            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('#comment')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/head/' + data.header + '" width="40" height="40" alt="">\n' +
                        '        </div>')
                    info.append(header)
                    let content = $('<div class="dynamic-content"></div>')
                    info.append(content)
                    let content_header = $('<div class="content-header">\n' +
                        '                <div class="content-user-data">\n' +
                        '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                        '                    <div class="content-time">' + data.pub_date + '</div>\n' +
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
                    let content_data = $('<div class="content-data">\n' +
                        '                <div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>\n' +
                        '            </div>')
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/images/' + img + '" class="alert-img" alt="">')
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
                    let discuss = $('<div class="discuss">\n' +
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
                    if (data.commentData) {
                        let comment_box = $('<div class="dynamic-comment-box"></div>')
                        for (let fbc of data.commentData.first_comment) {
                            let fbc_box = $('<div class="dynamic-comment-group" data="' + fbc.id + '">')
                            let fbc_header = $('<div class="user-header">\n' +
                                '                  <img src="/media/head/' + fbc.header + '" width="40" height="40" alt="">\n' +
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
                                    let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
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
                            }
                            comment_box.append(fbc_box)
                        }
                        for (let sbc of data.commentData.sbc_comment){
                            let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
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
                            comment_box.append(sbc_box)
                        }
                        let more_fbc = $('<div class="dynamic-comment-footer">\n' +
                            '                    <span>More Comments</span>\n' +
                            '             </div>')
                        if(data.commentData.count>3){
                            comment_box.append(more_fbc)
                        }

                        parentDiv.append(comment_box)
                    }

                    dom.append(parentDiv)

                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '            <div class="main-data-info">\n' +
                    '                <div class="main-footer cursor-pointer" id="moreMyComment">MORE INFORMATION</div>\n' +
                    '            </div>\n' +
                    '        </div>')
                dom.append(moreBtn)
            }
        }
    })
}

// 加载更多mycomment数据
$(document).on('click','#moreMyComment',function () {
    mycomment_page += 1
    let _this = $(this)
    $.ajax({
        type:'get',
        url:'/user/mycomment/?page='+mycomment_page+'&limit='+mycomment_limit,
        success:function (result) {
            console.log(result)
            _this.parents('.main-data-div').remove()
            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('#comment')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/head/' + data.header + '" width="40" height="40" alt="">\n' +
                        '        </div>')
                    info.append(header)
                    let content = $('<div class="dynamic-content"></div>')
                    info.append(content)
                    let content_header = $('<div class="content-header">\n' +
                        '                <div class="content-user-data">\n' +
                        '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                        '                    <div class="content-time">' + data.pub_date + '</div>\n' +
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
                    let content_data = $('<div class="content-data">\n' +
                        '                <div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>\n' +
                        '            </div>')
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/images/' + img + '" class="alert-img" alt="">')
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
                    let discuss = $('<div class="discuss">\n' +
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
                    if (data.commentData) {
                        let comment_box = $('<div class="dynamic-comment-box"></div>')
                        for (let fbc of data.commentData.first_comment) {
                            let fbc_box = $('<div class="dynamic-comment-group" data="' + fbc.id + '">')
                            let fbc_header = $('<div class="user-header">\n' +
                                '                  <img src="/media/head/' + fbc.header + '" width="40" height="40" alt="">\n' +
                                '               </div>')
                            let fbc_commentDate = $('<div class="comment-data color-comment">\n' +
                                '                        <div class="comment-text">\n' +
                                '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                                '                            <span>:&nbsp;</span>\n' +
                                '                            <span>' + fbc.content + '</span></div>\n' +
                                '                        <div class="comment-op">\n' +
                                '                            <div class="content-time">' + fbc.pub_date + '</div>\n' +
                                '                            <div class="reply">Reply</div>\n' +
                                '                    </div>')
                            fbc_box.append(fbc_header, fbc_commentDate)
                            if (fbc.secondComment) {
                                for (let sbc of fbc.secondComment) {
                                    let sbc_box = $('<div class="dynamic-comment-group" data="'+sbc.id+'">\n' +
                                        '                        <div class="user-header">\n' +
                                        '                            <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
                                        '                        </div>\n' +
                                        '                        <div class="comment-data color-comment">\n' +
                                        '                            <div class="comment-text">\n' +
                                        '                                <span class="content-user-name">' + sbc.username + '</span>\n' +
                                        '                                <span>to&nbsp;' + sbc.reply_name + ':&nbsp;</span>\n' +
                                        '                                <span>' + sbc.content + '</span></div>\n' +
                                        '                            <div class="comment-op">\n' +
                                        '                                <div class="content-time">' + sbc.pub_date + '</div>\n' +
                                        '                                <div class="reply">Reply</div>\n' +
                                        '                            </div>\n' +
                                        '                        </div>')
                                    fbc_commentDate.append(sbc_box)
                                }
                            }
                            comment_box.append(fbc_box)
                        }
                        let more_fbc = $('<div class="dynamic-comment-footer">\n' +
                            '                    <span>More Comments</span>\n' +
                            '             </div>')
                        if(data.commentData.count>3){
                            comment_box.append(more_fbc)
                        }

                        parentDiv.append(comment_box)
                    }

                    dom.append(parentDiv)

                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '            <div class="main-data-info">\n' +
                    '                <div class="main-footer cursor-pointer" id="moreMyComment">MORE INFORMATION</div>\n' +
                    '            </div>\n' +
                    '        </div>')
                dom.append(moreBtn)
            }
        },
        error:function () {
            layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            _this.parents('.main-data-div').remove()
        }
    })
})

// 加载mycollect模块数据
mycollect_page = 1
mycollect_limit = 10
function initMyCollect() {
    $.ajax({
        type:'get',
        url:'/user/mycollect/?page='+mycollect_page+'&limit='+mycollect_limit,
        success:function (result) {
            console.log(result)
            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('#collect')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/head/' + data.header + '" width="40" height="40" alt="">\n' +
                        '        </div>')
                    info.append(header)
                    let content = $('<div class="dynamic-content"></div>')
                    info.append(content)
                    let content_header = $('<div class="content-header">\n' +
                        '                <div class="content-user-data">\n' +
                        '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                        '                    <div class="content-time">' + data.pub_date + '</div>\n' +
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
                    let content_data = $('<div class="content-data">\n' +
                        '                <div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>\n' +
                        '            </div>')
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/images/' + img + '" class="alert-img" alt="">')
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
                    let discuss = $('<div class="discuss">\n' +
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
                    if (data.commentData) {
                        let comment_box = $('<div class="dynamic-comment-box"></div>')
                        for (let fbc of data.commentData.first_comment) {
                            let fbc_box = $('<div class="dynamic-comment-group" data="' + fbc.id + '">')
                            let fbc_header = $('<div class="user-header">\n' +
                                '                  <img src="/media/head/' + fbc.header + '" width="40" height="40" alt="">\n' +
                                '               </div>')
                            let fbc_commentDate = $('<div class="comment-data color-comment">\n' +
                                '                        <div class="comment-text">\n' +
                                '                            <span class="content-user-name">' + fbc.username + '</span>\n' +
                                '                            <span>:&nbsp;</span>\n' +
                                '                            <span>' + fbc.content + '</span></div>\n' +
                                '                        <div class="comment-op">\n' +
                                '                            <div class="content-time">' + timeformat(fbc.pub_date) + '</div>\n' +
                                '                            <div class="reply">Reply</div>\n' +
                                '                    </div>')
                            fbc_box.append(fbc_header, fbc_commentDate)
                            if (fbc.secondComment) {
                                for (let sbc of fbc.secondComment) {
                                    let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
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
                            }
                            comment_box.append(fbc_box)
                        }
                        let more_fbc = $('<div class="dynamic-comment-footer">\n' +
                            '                    <span>More Comments</span>\n' +
                            '             </div>')
                        if(data.commentData.count>3){
                            comment_box.append(more_fbc)
                        }

                        parentDiv.append(comment_box)
                    }

                    dom.append(parentDiv)

                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '            <div class="main-data-info">\n' +
                    '                <div class="main-footer cursor-pointer" id="moreMyCollect">MORE INFORMATION</div>\n' +
                    '            </div>\n' +
                    '        </div>')
                dom.append(moreBtn)
            }
        }
    })
}

// 加载更多mycollect数据
$(document).on('click','#moreMyCollect',function () {
    mycollect_page += 1
    let _this = $(this)
    $.ajax({
        type:'get',
        url:'/user/mycollect/?page='+mycollect_page+'&limit='+mycollect_limit,
        success:function (result) {
            console.log('加载mycollect:',result)
            _this.parents('.main-data-div').remove()
            if (result.success != true) {
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            } else {
                let headerUrl = $('#user-header>img').attr('src');
                let groupList = result.data;    //  动态列表
                let dom = $('#collect')
                for (let data of groupList) {
                    let parentDiv = $('<div class="user-dynamic-box" data="' + data.id + '">')
                    let info = $('<div class="dynamic-info"></div>')
                    parentDiv.append(info)
                    let header = $('<div class="user-header">\n' +
                        '            <img src="/media/head/' + data.header + '" width="40" height="40" alt="">\n' +
                        '        </div>')
                    info.append(header)
                    let content = $('<div class="dynamic-content"></div>')
                    info.append(content)
                    let content_header = $('<div class="content-header">\n' +
                        '                <div class="content-user-data">\n' +
                        '                    <div class="content-user-name">' + data.user_name + '</div>\n' +
                        '                    <div class="content-time">' + data.pub_date + '</div>\n' +
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
                    let content_data = $('<div class="content-data">\n' +
                        '                <div class="content-text color-comment">\n' +
                        '                    <span>' + data.content + '</span>\n' +
                        '                </div>\n' +
                        '            </div>')
                    if (data.img) {
                        // blog有图片
                        let content_img = $('<div class="content-img"></div>')
                        for (let img of data.img) {
                            let image = $('<img src="/media/images/' + img + '" class="alert-img" alt="">')
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
                    let discuss = $('<div class="discuss">\n' +
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
                    if (data.commentData) {
                        let comment_box = $('<div class="dynamic-comment-box"></div>')
                        for (let fbc of data.commentData.first_comment){
                        let fbc_box = $('<div class="dynamic-comment-group fbc-box" data="' + fbc.id + '"></div>')
                        let fbc_header = $('<div class="user-header">\n' +
                            '                  <img src="/media/head/' + fbc.header + '" width="40" height="40" alt="">\n' +
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
                                let sbc_box = $('<div class="dynamic-comment-group sbc-box" data="'+sbc.id+'">\n' +
                                    '                  <div class="user-header">\n' +
                                    '                       <img src="/media/head/' + sbc.header + '" width="30" height="30" alt="">\n' +
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
                        let more_fbc = $('<div class="dynamic-comment-footer">\n' +
                            '                    <span>More Comments</span>\n' +
                            '             </div>')
                        if(data.commentData.count>3){
                            comment_box.append(more_fbc)
                        }

                        parentDiv.append(comment_box)
                    }

                    dom.append(parentDiv)

                }
                let moreBtn = $('<div class="main-data-div">\n' +
                    '            <div class="main-data-info">\n' +
                    '                <div class="main-footer cursor-pointer" id="moreMyCollect">MORE INFORMATION</div>\n' +
                    '            </div>\n' +
                    '        </div>')
                dom.append(moreBtn)
            }
        },
        error:function () {
            layer.msg('<div style="color: black;text-align: center;">' + '没有更多数据</div>')
            _this.parents('.main-data-div').remove()
        }
    })
})

// 加载myblacklist模块数据

function initBlackList() {
    $.ajax({
        type:'get',
        url:'/user/blacklist/',
        success:function (result) {
            console.log(result)
            if (!result.success){
                layer.msg('<div style="color: black;text-align: center;">' + '连接超时</div>')
            }else{
                let dom = $('#blacklist')
                for (let data of result.data){
                    let container = $('<div class="black-box"></div>')
                    let user_head = $('<img class="black-head" src="/media/head/'+data.black_img+'">')
                    let user_name = $('<span class="black-name">'+data.black_name+'</span>')
                    let user_gender = data.gender
                    let gender = null
                    if (user_gender==1){
                        gender = $('<img src="/static/images/male.png">')
                    }else{
                        gender = $('<img src="/static/images/famale.png">')
                    }
                    let user_slogan = $('<span class="black-slogan">'+data.black_slogan+'</span>')
                    container.append(user_head,user_name,gender,user_slogan)
                    dom.append(container)
                }
            }
        }
    })
}