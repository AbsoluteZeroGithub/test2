$(function () {
    var id = getKeyword(location.href, 'id');
    var size;
    var max = null;
    // 请求商品数据
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            max = res.num;
            var html = template('detailTpl', res);
            $('.product').html(html);
            // 初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    })
    // 点击选择尺码 并记录所选尺码
    $('.product').on('tap', '.size span', function () {
        $(this).addClass('active').siblings().removeClass('active')
        size = $(this).text();
    })
    // 点击增减商品数量
    $('.product').on('tap', '#down', function () {
        var num = $('.num').val();
        num--;
        if (num < 1) {
            num = 1
        }
        $('.num').val(num)
    })
    $('.product').on('tap', '#up', function () {
        var num = $('.num').val();
        num++;
        if (num > max) {
            num = max
        }
        $('.num').val(num)
    })
    // 点击加入购物车
    $('#addcar').click(function () {
        var num = $('.num').val();
        if (!size) {
            mui.toast('请选择尺码');
            return
        }
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    mui.confirm('添加成功，前往购物车查看？', function (result) {
                        if (result.index == 1) {
                            location.href = 'cart.html'
                        }
                    })
                }
            }
        })
    })
})