
$(function () {
    var page = 1;
    var that =null;
    var price = 1;
    var html = '';
    var keyword = getKeyword(location.href, 'keyword');
    if(!keyword){
        return;
    }
  
    // 获取数据函数
    function getData() {
        if (!that) {
            that = this
        }
        // console.log(that);
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                page: page++,
                pageSize: 3,
                price: price,
                proName: keyword
            },
            success: function (res) {
                console.log(res);
                if (res.data.length > 0) {
                    html += template('search-result', res);
                    $('.item ul').html(html);
                    that.endPullupToRefresh(false);
                } else {
                    that.endPullupToRefresh(true);
                }

            }
        })
    }

    // 初始化上拉加载
    mui.init({
        pullRefresh: {
            container: '.search-content',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    // 点击价格排序删选
    $('#price').on('tap', function () {
        // console.log(123);
        price = price == 1 ? 2 : 1;
        page=1;
        html='';
        mui('.search-content').pullRefresh().refresh(true);
        getData();
    })
})