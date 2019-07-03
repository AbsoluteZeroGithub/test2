// 检测用户是否登陆，已登录跳回用户页
$.ajax({
	type: 'get',
	url: '/employee/checkRootLogin',
	async: false,
	success: function (res) {
		// console.log(res);
		if (res.success) {
			location.href = 'user.html'
		}

	}
})
$(function(){
	// 点击登录按钮
	$('#loginBtn').click(function(){
		var username=$('#username').val().trim();
		var password=$('#password').val().trim();
		if(!username){
			alert('请输入用户名');
			return;
		}
		if(!password){
			alert('请输入密码');
			return;
		}
		$.ajax({
			type:'post',
			url:'/employee/employeeLogin',
			data:{
				username:username,
				password:password
			},
			success:function(res){
				if(res.success){
					location.href='user.html'
				}
			}
		})
	})
	
});
