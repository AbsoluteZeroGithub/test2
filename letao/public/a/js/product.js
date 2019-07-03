
$(function(){
	var page=1;
	var pageSize=100;
	var pageTotal=null;
	var brandLogo='';
	getData();

	$.ajax({
		type:'get',
		url:'/category/querySecondCategoryPaging',
		data:{
			page:1,
			pageSize:100
		},
		success:function(res){
			console.log(res);
			var html=template('categorySecondTpl',res);
			$('#categoryId').html(html)
			
		}
	})
	function getData(){
		$.ajax({
			type:'get',
			url:'/product/queryProductDetailList',
			data:{
				page:page,
				pageSize:pageSize
			},
			success:function(res){
				// console.log(res);
				pageTotal=Math.ceil(res.total/pageSize)
				var html=template('productTpl',res);
				$('table').html(html)
			}
		})
	}
	// 上传图片
	var imgArr=[];
	$('#pic1').fileupload({
        dataType: 'json',
        done: function (e, data) {
			// console.log(data.result);
			// brandLogo=data.result.picAddr
			// $('img').prop('src',brandLogo)
			imgArr.push(data.result);
			// 展示图片
			var img=$('<img src="" alt="">');
			img.prop('src',data.result.picAddr);
			$('.imgBox').append(img);
		}
    });

	// 添加二级分类
	$('#save').click(function(){
		var categoryId = $('#categoryId').val();
		var proName = $("#proName").val();
		var proDesc = $("#proDesc").val();
		var productNum = $("#productNum").val();
		var productSize = $("#productSize").val();
		var oldPrice = $("#oldPrice").val();
		var price = $("#price").val();


		if(categoryId == -1){

			alert('请选择品牌');

			return;

		}

		if(!proName){

			alert('请输入产品名称');

			return;

		}

		if(!proDesc){

			alert('请输入产品描述');

			return;

		}

		if(!productNum){

			alert('请输入产品数量');

			return;

		}

		if(!productSize){

			alert('请输入产品尺寸');

			return;

		}

		if(!oldPrice){

			alert('请输入产品原价格');

			return;

		}

		if(!price){

			alert('请输入产品折扣价');

			return;

		}

		if(imgArr.length == 0){

			alert('请上传产品图片');

			return;

		}

		$.ajax({
			type:'post',
			url:'/product/addProduct',
			data:{
				proName:proName,
				oldPrice:oldPrice,
				price:price,
				proDesc:proDesc,
				size:productSize,
				statu:0,
				num:productNum,
				brandId:categoryId,
				pic:imgArr
			},
			success:function(result){
				
				if(result.success){

					location.reload();

				}else{

					alert('商品添加失败');
				}

			}
		})
	})

})

