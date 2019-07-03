$(function () {
    // 请求数据
    var products=null;
    var size=null;
    var maxNum=null;
    var num=null;
    $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        success: function (res) {
            console.log(res);
            products=res;
            var html = template('detailTpl', { list: res });
            $('ul').html(html);
        }
    })
    // 点击删除按钮
    $('ul').on('tap', '.delete', function () {
        var id = $(this).data('id');
        var li = $(this).parents('li')[0]
        mui.confirm('确认要从购物车里删除吗', function (result) {
            if (result.index == 1) {
                $.ajax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        $(li).remove()
                    }
                })
            } else {
                mui.swipeoutClose(li);
            }
        })
    })

    // 点击编辑按钮
    $('ul').on('tap','.edit',function(){
        // 获取当前商品
        var id=$(this).data('id');
        for(var i=0;i<products.length;i++){
            if(products[i].id==id){
                var target=products[i];
                maxNum=products[i].productNum
                break;
            }
        }
        // 拼接需要展示在弹窗界面的结构
        var html=template('editTpl',target);
        // 去除换行
        html=html.replace(/\n/g,'');
        mui.confirm(html,'编辑商品',['取消', '确定'],function(e){
            if(e.index==1){
                $.ajax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function(res){
                        if(res.success){
                            mui.toast('修改成功,返回购物车');
                            location.reload()
                        }
                    }
                })
            }
        })
    })

    // 点击选择尺码
    $('body').on('tap','.editSize span',function(){
        $(this).addClass('active').siblings().removeClass('active');
        size=$(this).text();
    })

    // 点击增减商品数量
    $('body').on('tap', '.number #down', function () {
        num = $('.editNum').val();
        num--;
        if (num < 1) {
            num = 1
        }
        $('.editNum').val(num)
    })
    $('body').on('tap', '.number #up', function () {
        num = $('.editNum').val();
        num++;
        if (num > maxNum) {
            num = maxNum
        }
        $('.editNum').val(num)
    })

    // 监听复选框变化 计算总价

    $('ul').on('change','input', function () {
        var sum=0;
        $.each($('ul input:checked'), function (i, e) {
            var price = $(e).siblings('.current').text();
            var num = $(e).parents('li').find('.num').text();
            sum+=parseFloat(price*num)
        })
        $('.money').html(sum.toFixed(2));
    })
})