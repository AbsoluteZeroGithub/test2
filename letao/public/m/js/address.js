
$(function(){
    // 获取收货地址并展示
    var data=null
    $.ajax({
        type:'get',
        url:'/address/queryAddress',
        success:function(res){
            if(res){
                data=res;
                var html=template('addressList',{list:res});
                $('#address').html(html);
            }
        }
    })
    // 点击删除删除数据
    $('#address').on('tap','span',function(){
        var id=$(this).data('id');
        var li=$(this).parents('li')[0];
        mui.confirm('确认删除吗？','提示',['再想想','想好了'],function(res){
            if(res.index==1){
                $.ajax({
                    type:'post',
                    url:'/address/deleteAddress',
                    data:{id:id},
                    success:function(res){
                       if(res.success){
                           $(li).remove()
                       }
                    }
                })
            }else{
                mui.swipeoutClose(li);
            }
        })
       
    })
    // 点击编辑收货地址
    $('#address').on('tap','.edit',function(){
        var id=$(this).data('id');
        for(var i=0;i<data.length;i++){
            if(data[i].id==id){
                console.log(data[i]);
                localStorage.setItem('address',JSON.stringify(data[i]));
                location.href='addAddress.html'
            }
        }
    })
})