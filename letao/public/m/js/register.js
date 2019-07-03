$(function(){
    // 点击获取验证码
    $('#getCode').click(function(){
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(res){
                console.log(res.vCode); 
            }
        })
    })
    $('#register').click(function(){
        // 获取表单数据
        var username=$('[name="username"]').val().trim();
        var mobile=$('[name="mobile"]').val().trim();
        var password=$('[name="password"]').val().trim();
        var again=$('[name="again"]').val().trim();
        var vcode=$('[name="vcode"]').val().trim();
        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        var reg=/^1[3-9]\d{9}$/;
        if(!reg.test(mobile)){
            mui.toast("请输入正确的手机号");
            return;
        }
        if(!password){
            mui.toast("请输入密码");
            return;
        }
        if(password!=again){
            mui.toast("密码输入不一致");
            return;
        }
        if(!vcode){
            mui.toast("请输入验证码");
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vcode
            },
            success:function(res){
                // console.log(res);
                if(res.success){
                    mui.toast("注册成功");
                   setTimeout(function(){
                    location.href='login.html'
                   },2000)
                }else{
                    mui.toast(res.message)
                }
                
            }
        })
    })
    
})
