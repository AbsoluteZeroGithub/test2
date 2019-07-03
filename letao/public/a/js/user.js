
$(function () {
	// 请求数据渲染页面
	$.ajax({
		type: 'get',
		url: '/user/queryUser',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function (res) {
			var html = template('userTpl', res);
			$('table').html(html);
		}
	})
	// 点击更改用户状态
	$('table').on('click', '#changeDel', function () {
		var id = $(this).data('id');
		var isDelete = $(this).data('isdelete');
		isDelete =  isDelete ==1 ? 0 : 1;
		$.ajax({
			type:'post',
			url:'/user/updateUser',
			data:{
				id:id,
				isDelete:isDelete
			},
			success:function(res){
				// console.log(res);
				if(res.success){
					location.reload();
				}
				
			}
		})
	})
})