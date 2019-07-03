$(function(){

	$('#searchBtn').on('click',function(){

		var keyword = $('#keyword').val();

		if(!keyword){

			alert('请输入关键字');

			return;

		}

		if(localStorage.getItem('keywords')){

			var keywords = JSON.parse(localStorage.getItem('keywords'));
			// 判断搜索关键词是否已存在，存在就删除之前的，重新添加
			var index=keywords.indexOf(keyword)
			if(index!=-1){
				keywords.splice(index,1);
			}	
			keywords.push(keyword);
			localStorage.setItem('keywords',JSON.stringify(keywords));

		}else{

			localStorage.setItem('keywords',JSON.stringify([keyword]));

		}

		location.href = "search-list.html?key="+keyword;


	});


	if(localStorage.getItem('keywords')){

		var keywords = JSON.parse(localStorage.getItem('keywords'));

		$('#historySearch').html(template('historySearchTpl',{data:keywords}));

	}

	$('#clearHistory').on('tap',function(){

		localStorage.removeItem('keywords');

		$('#historySearch').html('');

	})

});