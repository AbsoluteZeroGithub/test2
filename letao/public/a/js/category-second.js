
$(function(){
	var page=1;
	var pageSize=3;
	var pageTotal=null;
	var brandLogo='';
	getData();

	$.ajax({
		type:'get',
		url:'/category/queryTopCategoryPaging',
		data:{
			page:1,
			pageSize:100
		},
		success:function(res){
			// console.log(res);
			pageTotal=Math.ceil(res.total/pageSize)
			var html=template('categoryFirstTpl',res);
			$('#categoryId').html(html)
			
		}
	})
	function getData(){
		$.ajax({
			type:'get',
			url:'/category/querySecondCategoryPaging',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function(res){
				// console.log(res);
				pageTotal=Math.ceil(res.total/pageSize)
				var html=template('categorySecondTpl',res);
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
		getData();
	})
	$('#next').click(function(){
		page++;
		if(page>pageTotal){
			page=pageTotal;
			alert('已经是最后一页了');
			return;
		}
		getData();
	})
	// 上传图片
	$('#brandLogo').fileupload({
        dataType: 'json',
        done: function (e, data) {
			// console.log(data.result);
			brandLogo=data.result.picAddr
			$('img').prop('src',brandLogo)
		}
    });

	// 添加二级分类
	$('#save').click(function(){
		var categoryId=$('#categoryId').val().trim();
		var brandName=$('#brandName').val().trim();
		if(categoryId=='all'){
			alert('请选择分类');
			return;
		}
		if(!brandName){
			alert('请输入品牌名称');
			return;
		}
		if(!brandLogo){
			alert('请输入图片');
			return;
		}
		$.ajax({
			type:'post',
			url:'/category/addTopCategory',
			data:{
				categoryId:categoryId,
				brandLogo:brandLogo,
				brandName:brandName,
				hot:1
			},
			success:function(res){
				if(res.success){
					location.reload();
				}
			}
		})
	})
});

