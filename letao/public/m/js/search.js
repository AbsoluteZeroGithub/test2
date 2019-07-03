
$(function () {
    // 点击跳转并存入本地存储
    $('#search').click(function () {
        var keyword = $('.input').val();
        if (!keyword) {
            alert('请输入关键字');
            return;
        }
        // 如果搜索子已存在就删除之前的，重新插入数组
        var index = keywords.indexOf(keyword)
        if (index != -1) {
            keywords.splice(index, 1);
        }
        keywords.unshift(keyword);
        localStorage.setItem('key', JSON.stringify(keywords));
        location.href = 'search-list.html?keyword=' + keyword;

    })
    var keywords = [];
    var keys = localStorage.getItem('key');
    // 取本地数据渲染历史记录
    if (keys) {
        keywords = JSON.parse(keys);
        var html = template('history', { list: JSON.parse(keys) })
        $('.mui-table-view').html(html);
    }
    // 清空历史记录
    $('#clearall').click(function () {
        localStorage.removeItem('key');
        $('.mui-table-view').html('');
    })
    // 点击历史记录跳转
    $('.mui-table-view').on('click','li',function(){
        var keyword=$(this).text();
        var index = keywords.indexOf(keyword)
        keywords.splice(index, 1);
        keywords.unshift(keyword);
        localStorage.setItem('key', JSON.stringify(keywords));
        location.href = 'search-list.html?keyword=' + keyword;
    })
})