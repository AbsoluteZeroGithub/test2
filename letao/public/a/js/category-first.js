
$(function(){
	var page=1;
	var pageSize=3;
	var pageTotal=null;
	getData()
	function getData(){
		$.ajax({
			type:'get',
			url:'/category/queryTopCategoryPaging',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function(res){
				// console.log(res);
				pageTotal=Math.ceil(res.total/pageSize)
				var html=template('categoryFfirstTpl',res);
				$('table').html(html)
				
			}
		})
	}
	$('#prew').click(function(){
		page--;
		if(page<1){
			page=1;
			alert('已经是第一页了');
			return;
		}
		getData()
	})
	$('#next').click(function(){
		page++;
		if(page>pageTotal){
			page=pageTotal;
			alert('已经是最后一页了');
			return;
		}
		getData()
	})
	$('#save').click(function(){
		var categoryName=$('#categoryName').val().trim();
		if(!categoryName){
			alert('请输入分类名称');
			return;
		}
		$.ajax({
			type:'post',
			url:'/category/addTopCategory',
			data:{
				categoryName:categoryName
			},
			success:function(res){
				if(res.success){
					location.reload();
				}
			}
		})
	})
});

