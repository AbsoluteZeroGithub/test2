
var userInfo = null;
$.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    async: false,//是否发送异步请求，默认为true
    success: function (res) {
        if (res.error && res.error == 400) {
            location.href = 'login.html'
        } else {
            userInfo = res;

        }
    }
})
$(function () {
    var html = template('user-content', userInfo);
    $('#user').html(html);
    // 退出登录事件
    $('#loginOut').on('tap', function () {
        $.ajax({
            type: 'get',
            url: '/user/logout',
            success: function (res) {
                if (res.success) {
                    location.href = 'login.html'
                }
            }
        })
    })
})