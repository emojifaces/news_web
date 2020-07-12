function getWeekDate(date) {
    var day = date.getDay();
    var weeks = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    var week = weeks[day];
    return week;
}

function formatDate(date) {
    if (date.getMonth() + 1 < 10) {
        month = "0" + String(date.getMonth() + 1)
    } else {
        month = String(date.getMonth() + 1)
    }
    if (date.getDate() < 10) {
        day = "0" + String(date.getDate())
    } else {
        day = String(date.getDate())
    }
    year = date.getFullYear()
    week = getWeekDate(date);
    return {'week': week, 'date': day + '/' + month,'fullDate':year + '-' + month + '-' + day}
}


function getAllDateList() {
    rlist = [];
    for (i = -14; i <= 14; i++) {
        var date1 = new Date(),
            date2 = new Date(date1);
        date2.setDate(date1.getDate() + i);
        rlist.push(formatDate(date2))
    }
    return rlist
}

$(function () {
    if ($('#timeSelect').length > 0) {
        timeList = getAllDateList();
        // 添加last按钮
        $('#timeSelect').append('<div class="timeSelect-last">\n' +
            '                <svg t="1583919548963" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3233" width="20" height="20">\n' +
            '                    <path d="M629.291 840.832l60.331-60.331-268.501-268.501 268.501-268.501-60.331-60.331-328.832 328.832z" p-id="3234" fill="#ffffff"></path>\n' +
            '                </svg>\n' +
            '                <span>Last</span>\n' +
            '            </div>')
        var box = $('<div class="timeSelect-date-box"><ul class="timeSelect-date"></ul></div>')
        timeStr = '';
        for (i = 0; i < timeList.length; i++) {
            if (i == 14) {
                timeStr += '<li data-id="' + i + '" data-date="'+ timeList[i].fullDate +'" class="timeSelect-active timeSelect-now">' + timeList[i].week + ' ' + timeList[i].date + '</li>'
                 $('#main-left-data input[name="choose-date"]').val(timeList[i].fullDate);
                $('.main-calendar-title-left span:first-child').text(timeList[i].fullDate);
            } else {
                timeStr += '<li data-id="' + i + '" data-date="'+ timeList[i].fullDate +'">' + timeList[i].week + ' ' + timeList[i].date + '</li>'
            }
        }
        $('#timeSelect').append(box);
        $('#timeSelect ul').append(timeStr);
        $('#timeSelect').append("<div class=\"timeSelect-next\">\n" +
            "                <span>Next</span>\n" +
            "                <svg t=\"1583919601399\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4303\" width=\"20\" height=\"20\">\n" +
            "                    <path d=\"M689.621 512l-328.832-328.832-60.331 60.331 268.501 268.501-268.501 268.501 60.331 60.331z\" p-id=\"4304\" fill=\"#ffffff\"></path>\n" +
            "                </svg>\n" +
            "            </div>")
    };

    $('#timeSelect').on('click', ' .timeSelect-date > li', function () {
        $('#timeSelect .timeSelect-active').removeClass('timeSelect-active');
        $(this).addClass('timeSelect-active');
        $('#main-left-data input[name="choose-date"]').val($(this).data('date'));
        $('#main-left-data input[name="choose-date"]').change();
        console.log($(this).data('date'));
        complatePosition()
    });
    blockWidth = $('.timeSelect-date >li').outerWidth(true);
    divWidth = $('.timeSelect-date').outerWidth(true);
    $('#timeSelect .timeSelect-date .timeSelect-active').each(function () {
        id = $(this).data('id');
        $('#timeSelect ul li').css('left', -((Number(id) + 1) * blockWidth - (divWidth) / 2))

    });

    function complatePosition() {
        id = $('#timeSelect .timeSelect-active').data('id');
        lastId = $('#timeSelect ul li:last-child').data('id');
        rightPoint = -((Number(lastId) + 1) * blockWidth - divWidth);
        left = -((Number(id) + 1) * blockWidth - (divWidth) / 2);
        if (left >= 0) {
            left = 0
        } else if (left <= rightPoint) {
            left = rightPoint
        }
        ;
        $('#timeSelect ul li').animate({'left': left + 'px'})
    }

    $('#timeSelect').on('click', '.timeSelect-next', function () {
        if ($('#timeSelect .timeSelect-active').data('id') == 28) {
            $('#timeSelect ul li:first-child').click()
        } else {
            $('#timeSelect .timeSelect-active').next().click()
        }

    });

    $('#timeSelect').on('click', '.timeSelect-last', function () {
        if ($('#timeSelect .timeSelect-active').data('id') == 0) {
            $('#timeSelect ul li:last-child').click()
        } else (
            $('#timeSelect .timeSelect-active').prev().click()
        )

    });


});

