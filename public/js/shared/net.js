

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
            currentStockId = item.substr(0,6);
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/kitem?" + "stockId=" + currentStockId,
                async: false,
                beforeSend:function(){
                    console.log("start to request /stockList")
                },
                success:function (result) {
                    d3.select("svg").remove()
                    kitem = result.data;
                    drawKitem(result.data);
                },
                error:function(e){
                    console.log("function error")
                    console.log(e.status)
                    console.log(e.responseText)
                }
            })
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/average?" + "stockId=" + currentStockId,
                async: false,
                beforeSend:function(){
                    console.log("start to request /stockList")
                },
                success:function (result) {
                    d3.select("svg").remove()
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
    var h = $("#stock-kitem").height();
    var w = $("#stock-kitem").width();
    var rightPadding = 30;
    var height = h-rightPadding;
    var width = w-rightPadding;
    var dataCnt = kDataSet.kitemList.length;
    var barPadding = 4;
    var svg = d3.select("#stock-kitem").append('svg').attr('width', w).attr('height', h).style("background", "#ffffff");
    var dateArray = kDataSet.kitemList.map(e=>parseInt(e.date));
    var maxDate = d3.max(dateArray)
    var minDate = d3.min(dateArray)
    var minPrice = d3.min(kDataSet.kitemList.map(e=>e.low));
    var maxPrice = d3.max(kDataSet.kitemList.map(e=>e.high));

    var yscale = d3.scaleLinear().domain([minPrice, maxPrice]).range([0,height]);
    svg.selectAll("line").data(kDataSet.kitemList).enter().append('line').attr('x1',function (d,i) {
        return i * (width/dataCnt) + (w/dataCnt - barPadding)/2 + rightPadding;
    }).attr('x2',function (d,i) {
        return i * (width / dataCnt) + (w / dataCnt - barPadding) / 2 + rightPadding;
    }).attr('y1',function (d,i) {
        return height - yscale(getHigh(d));
    }).attr('y2',function (d,i) {
        return height - yscale(getLow(d));
    }).attr("stroke",getColor);

    svg.selectAll("rect").data(kDataSet.kitemList).enter().append('rect').attr('x',function (d,i) {
        return i * (width / dataCnt) + rightPadding;
    }).attr('y', function(d, i) {
        return height - yscale(Math.max(getOpenPrice(d),getClosePrice(d)));
    }).attr('width', function(d, i) {
        return width / dataCnt - barPadding;
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

    var scale_x = d3.scaleLinear().domain([minDate,maxDate]).range([20,w]);
    var scale_y = d3.scaleLinear().domain([minPrice,maxPrice]).range([h-20,0]);
    svg.append("g").attr("font-size","20").attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(scale_x));
    svg.append("g").attr("font-size","20").attr('transform', 'translate(30,0)').call(d3.axisLeft().scale(scale_y));
}


function getLow(kItem) {
    return kItem.low;
}

function getHigh(kItem) {
    return kItem.high;
}

function getColor(kItem) {
    return kItem.openPrice <= kItem.closePrice ? "red":"green";
}

function getOpenPrice(kItem) {
    return kItem.openPrice;
}

function getClosePrice(kItem) {
    return kItem.closePrice;
}

function getDate(kItem) {
    return kItem.date;
}

function getDealAmount(kItem) {
    return kItem.dealAmount;
}
