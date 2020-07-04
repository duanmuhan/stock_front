

$(function () {

    var kitem=null;
    var currentStockId = "000001";
    var paramName;
    var paramValue;
    $("#stock-input").typeahead({
        source: function (query,process) {
            var data=new Array();
            var objMap = new Map();
            if (!isNaN(query)){
                paramName="stockId";
                paramValue=query;
            }else {
                paramName="stockName";
                paramValue=query;
            }
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/stockList?" + paramName + "=" + paramValue,
                async: false,
                beforeSend:function(){
                    console.log("start to request /stockList")
                },
                success:function (result) {
                    data = result.data;
                },
                error:function(e){
                    console.log("function error")
                    console.log(e.status)
                    console.log(e.responseText)
                }
            });
            var displayData = data.map(x => {
                objMap[x.stockName] = x.stockId;
                return x.stockId + "(" + x.stockName + ")"
            });
            process(displayData);
        },
        scrollBar: true,
        updater:function(item){
            var currentStockId = item.substr(0,6);
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/kitem?" + "stockId=" + currentStockId,
                async: false,
                beforeSend:function(){
                    console.log("start to request /stockList")
                },
                success:function (result) {
                    kitem = result.data;
                    drawKitem(result.data);
                },
                error:function(e){
                    console.log("function error")
                    console.log(e.status)
                    console.log(e.responseText)
                }
            })
            return item;
        },
        afterSelect:function (item) {
            console.log("fuckyou")
        },
        items:10
    })

});

function drawKitem(kDataSet) {
    var h = $("#stock-kitem").height;
    var w = $("#stock-kitem").width;
    var dataCnt = kDataSet.kitemList.length;
    var barPadding = 4;
    var svg = d3.select("#stock-kitem").append('svg').attr('width', w).attr('height', h).style("background", "#ffffff");
    var minPrice = d3.min(kDataSet,getLow);
    var maxPrice = d3.max(kDataSet,getHigh);
    var yscale = d3.scaleLinear().domain([minPrice, maxPrice]).range([0, h]);
    svg.selectAll("line").data(kDataSet).enter().append('line').attr('x1',function (d,i) {
        return i * (w/dataCnt) + (w/dataCnt - barPadding)/2;
    }).attr('x2',function (d,i) {
        return i * (w / dataCnt) + (w / dataCnt - barPadding) / 2
    }).attr('y1',function (d,i) {
        return h - yscale(getHigh(d));
    }).attr('y2',function (d,i) {
        return h - yscale(getLow(d));
    }).attr("stroke",getColor);

    svg.selectAll("rect").data(kDataSet).enter().append('rect').attr('x',function (d,i) {
        return i * (w / dataCnt)
    }).attr('y', function(d, i) {
        return h - yscale(d3.max(getOpenPrice(d),getClosePrice(d)));
    }).attr('width', function(d, i) {
        return w / dataCnt - barPadding;
    }).attr('height', function(d, i) {
        var vv = Math.abs(yscale(getOpenPrice(d)) - yscale(getClosePrice(d)));
        if (vv < 0.5) {
            vv = 0.5; // 防止数据为0或高度过小
        }
        return vv;
    }).attr("fill", getColor)
        .attr('title', function(d, i) {
            return "交易日期：" + getDate(d) + "&#13;交易量：" + getDealAmount(d);
     });
}

function getLow(kItem) {
    return kItem.get("low");
}

function getHigh(kItem) {
    return kItem.get("high");
}

function getColor(kItem) {
    return kItem.get("openPrice") > kItem.get("closePrice") ? "red":"green";
}

function getOpenPrice(kItem) {
    return kItem.get("openPrice");
}

function getClosePrice(kItem) {
    return kItem.get("closePrice");
}

function getDate(kItem) {
    return kItem.get("date");
}

function getDealAmount(kItem) {
    return kItem.get("dealAmount");
}
