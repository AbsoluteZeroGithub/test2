 // 获取地址栏关键字
 function getKeyword(url, name) {
    var k = ''
    var index = location.href.indexOf('?');
    var key = location.href.substr(index + 1);
    var arr = key.split('$');
    for (var i = 0; i < arr.length; i++) {
        var current = arr[i].split('=');
        if (current[0] == name) {
            k = current[1];
            return k
        }
    }
    return null;
}
$(function () {
   
    // 恢复点击事件
    $('body').on('click', 'a', function () {
        var src = $(this).attr('href');
        if (src) {
            mui.openWindow({
                url: src
            })
        }
    })
})