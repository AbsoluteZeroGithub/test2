
$(function(){
    // 取出本地数据flag 
    // 并作为 添加或者编辑 的判断条件
    var flag=localStorage.getItem('address');
    if(flag){
        var data=JSON.parse(flag);
        var html=template('add',data);
        $('#addAddress').html(html);
        $('h1').text('修改收货地址');
    }else{
        var html=template('add',{});
        $('#addAddress').html(html)
    }
    var picker = new mui.PopPicker({layer:3}); 
    picker.setData(cityData); 
    // 点击地址栏选择地址
    $('#addAddress').on('tap','#picker',function(){
        // picker.show()展示选择框,回调函数参数SelectedItems即为所选
        picker.show(function(SelectedItems){
            // console.log(SelectedItems);
            $('#picker').val(SelectedItems[0].text+SelectedItems[1].text+SelectedItems[2].text)
        }) 
    })
    // 点击确认提交数据
    $('#addAddress').on('tap','#confirm',function(){
         // 获取表单数据
         var recipients=$('[name="recipients"]').val().trim();
         var postCode=$('[name="postCode"]').val().trim();
         var address=$('[name="address"]').val().trim();
         var addressDetail=$('[name="addressDetail"]').val().trim();
         if(!recipients){
             mui.toast("请输入收货人");
             return;
         }
         if(!postCode){
             mui.toast("请输入邮编");
             return;
         }
         if(!address){
             mui.toast("请输入省市区");
             return;
         }
         if(!addressDetail){
             mui.toast("请输入详细地址");
             return;
         }
        //  定义传递的数据
         var datas={
            recipients:recipients,
            postcode:postCode,
            address:address,
            addressDetail:addressDetail
         }
        //  判断是何种操作类型
         if(flag){
             datas.id=data.id
             var url='/address/updateAddress'
         }else{
             var url='/address/addAddress'
         }
         $.ajax({
             type:'post',
             url:url,
             data:datas,
             success:function(res){
                 if(res.success){
                    if(flag){
                        mui.toast('修改成功')
                    }else{
                        mui.toast('添加成功')
                    }
                    
                    setTimeout(function(){
                        location.href='address.html'
                    },2000)
                 }
             }
         })
    })
    localStorage.removeItem('address')
})