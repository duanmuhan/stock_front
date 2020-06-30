$(function () {
    $("#stock-input").bind('keyup',function () {
        getStockInfo();
    })
    
    function getStockInfo() {
        $.ajax({
            type:"GET",
            url:"127.0.0.1:8080/stockList",
            async: false,
            beforeSend:function(){
                console.log("start to request /stockList")
            },
            success:function (result) {
                console.log(result)
            },
            error:function(e){
                console.log("function error")
                console.log(e.status)
                console.log(e.responseText)
            }
        });
    }
});