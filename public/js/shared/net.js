$(function () {
    var dataset;
    $("#stock-input").bind('keyup',function () {
        var value = $("#stock-input").val();
        if (!isNaN(value)){
            getStockInfo("stockId",value);
        }else {
            getStockInfo("stockName",value);
        }
    })
    
    function getStockInfo(paramName,paramValue) {
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:8080/stockList?" + paramName + "=" + paramValue,
            async: false,
            beforeSend:function(){
                console.log("start to request /stockList")
            },
            success:function (result) {
                fillData(result.data)
            },
            error:function(e){
                console.log("function error")
                console.log(e.status)
                console.log(e.responseText)
            }
        });
    }

    function fillData(data) {
        var displayData = data.map(x => {return x.stockId + "(" + x.stockName + ")"})
        $('#stock-input').typeahead({

        })
    }

});