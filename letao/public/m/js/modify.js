$(function () {
    // 点击获取验证码
    $('#getCode').click(function () {
        $.ajax({
            type: 'get',
            url: '/user/vCodeForUpdatePassword',
            success: function (res) {
                console.log(res.vCode);
            }
        })
    })
    $('#modify').click(function () {
        // 获取表单数据
        var oldPassword = $('[name="oldPassword"]').val().trim();
        var newPassword = $('[name="newPassword"]').val().trim();
        var confirm = $('[name="confirm"]').val().trim();
        var vcode = $('[name="vcode"]').val().trim();
        if (!oldPassword) {
            mui.toast("请输入原密码");
            return;
        }
        if (newPassword != confirm) {
            mui.toast("密码输入不一致");
            return;
        }
        if (!vcode) {
            mui.toast("请输入验证码");
            return;
        }
        $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: vcode
            },
            success: function (res) {
                if (res.success) {
                    mui.toast("修改密码成功，请重新登录");
                    setTimeout(function () {
                        location.href = 'login.html'
                    }, 2000)
                } else {
                    mui.toast(res.message)
                }

            }
        })
    })

})
