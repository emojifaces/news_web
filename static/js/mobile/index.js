// let month_list = new Array("Jan","Jan","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
// let week_list = new Array("Sun","Mon","Tues","Wed","Thurs","Fri","Sat","Sun");
// 格式化时间函数
function checktime(str){
    return str>9?str:'0'+str;
}
// index 时间计时器
setInterval(function () {
    // main-time 元素中的时间
    let datetime = new Date()
    let year = datetime.getFullYear();
    let day = checktime(datetime.getDate());

    let month = month_list[datetime.getMonth()-1];
    let hour = checktime(datetime.getHours());
    let minute = checktime(datetime.getMinutes());
    let second = checktime(datetime.getSeconds());
    let time = hour+':'+minute+':'+second;
    $('.days span').text(day);
    $('.month').text(month);
    $('.time').text(time);


},1000)