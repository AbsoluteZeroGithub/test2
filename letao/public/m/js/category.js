
$(function(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(res){
            var html='';
            for(var i=0;i<res.rows.length;i++){
                html+=`<a href="javascript:;" data-id="${res.rows[i]['id']}">${res.rows[i]['categoryName']}</a>`
            }
            $('.scroll-left').html(html);
            // 默认展示第一个分类
            $('.scroll-left a').eq(0).addClass('active');
            getBrand(res.rows[0]['id']);

        }
    })
    // 一级分类点击事件
    $('.scroll-left').on('click','a',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var id=$(this).data('id');
        getBrand(id);
    })
    // 获取分类品牌数据 函数
    function getBrand(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(res){
                // console.log(res);
                var content=template('second',{list:res.rows});
                $('.scroll-right').html(content)
            }
        })
    }
    // 启动区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})