// 检测用户是否登陆，未登录跳回登录页
$.ajax({
	type: 'get',
	url: '/employee/checkRootLogin',
	async: false,
	success: function (res) {
		// console.log(res);
		if (res.error && res.error == 400) {
			location.href = 'login.html'
		}
	}
})
$(function () {
	//  退出登录
	$('.login_out_bot').click(function () {
		$.ajax({
			type: 'get',
			url: '/employee/employeeLogout',
			success: function (res) {
				if (res.success) {
					location.href = 'login.html';
				}
			}
		})
	})

});