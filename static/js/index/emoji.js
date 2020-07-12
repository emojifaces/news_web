var popIndex = "";
$('body').on('click', '.emojiBtn', function () {
    var _self = this;
    if ($(_self).data('pop')) {
        layer.close($(_self).data('pop'));
        $(_self).removeData('pop');
    }
    // 外层
    var div1 = $('<div>');
    // 内层
    var div2 = $('<div>');
    div1.css({"width": "100%", "height": "100%", "overflow": "hidden"});
    div2.css({'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'width': 'calc(100% + 17px)', 'height': '100%', 'align-items': 'center', 'overflow-y': 'scroll'});
    var arr = ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','😋','😛','😜','🤪','😝','🤑','🤗',
    '🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵',
        '🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩',
        '😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠','🤡','👹','👺','👻','👽','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','💋','💌','💘','💝','💖','💗','💓','💞','💕','💔','❤','🧡','💛','💚','💙','💜','🤎','🖤','🤍','💬','👅','👄'
    ];
    for (b=0;b<arr.length;b++){
        var div = $('<div>')
        div.addClass('emoji-icon');
        div.attr('data-value', arr[b]);
        div.append(arr[b])
        div2.append(div)
    }
    div1.append(div2)
    popIndex = layer.tips(div1[0].outerHTML, $(_self), {
        closeBtn: 2,
        shade :[0.000001, '#ffffff'],
        shadeClose:true,
        time: 0,
        skin: 'default',
        area: ['22rem', '22rem'],
        tips: [3, '#ffffff'],
    });
    $(_self).attr('data-pop', popIndex);

});

$('body').on('click', '.emoji-icon', function () {
    var dom, dom1, dom2,dom3,dom4;
    $('.emojiBtn').each(function () {
        console.log($(this).data('pop'))
        if ($(this).data('pop') == popIndex) {
            dom1 = $(this).parents('.VN-input-group').find('textarea');
            dom3 = $(this).parents('.VN-input-group-1').find('textarea');
            dom2 = $(this).parents('.VN-input-group').find('input');
            dom4 = $(this).parents('.VN-input-group-1').find('input');
        }
    });
    if (dom1.length) {
        dom = dom1
    } else if (dom2.length) {
        dom = dom2
    } else if (dom3.length) {
        dom = dom3
    } else if (dom4.length) {
        dom = dom4
    }
    if (dom) {
        dom.val(dom.val() + $(this).data('value'))
    }
})