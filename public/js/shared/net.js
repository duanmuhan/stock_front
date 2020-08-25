

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
                url:"http://127.0.0.1:8080/stock/overview?" + "stockId=" + currentStockId,
                async: false,
                beforeSend:function(){
                    console.log("start to request /stock/overview")
                },
                success:function (result) {
                    if (result.code != 200){
                        alert("error:" + result.message);
                    }
                    drawOverView(result.data);
                },
                error:function(e){
                    console.log("function error")
                }
            });
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/average?" + "stockId=" + currentStockId,
                async: false,
                beforeSend:function(){
                    console.log("start to request /average")
                },
                success:function (result) {
                    var dataList = result.data.fiveDayList;
                    drawAverage(dataList)
                },
                error:function(e){
                    console.log("function error")
                }
            });
            return item;
        },
        afterSelect:function (item) {
            console.log("fuckyou")
        },
        items:10
    })

});

function f() {

}

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

    var tooltip = d3.select("body").append("div")
        .attr("class","tooltip") //用于css设置类样式
        .attr("opacity",0.0);

    var scale_x = d3.scaleLinear().domain([minDate,maxDate]).range([20,w]);
    var scale_y = d3.scaleLinear().domain([0.8*minPrice,1.2*maxPrice]).range([h-20,0]);

    var yscale = d3.scaleLinear().domain([0.8*minPrice, 1.2*maxPrice]).range([0,height-20]);
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
     }).on("touchmove mousemove",function (d,i) {
        tooltip.html("开盘价格: " + d.closePrice + "<br/>"
            + "收盘价格: " + d.openPrice + "<br/>"
            + "最高价格: " + d.high + "<br/>"
            + "最低价格: " + d.low + "<br/>"
            + "日期: " + d.date)
            .style("left",(d3.event.pageX)+"px")
            .style("top",(d3.event.pageY+20)+"px")
            .style("opacity",1.0);
    }).on("mouseout",function(d,i) {
        tooltip.style("opacity",0.0);
    });

    svg.append("g").attr("font-size","20").attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(scale_x));
    svg.append("g").attr("font-size","20").attr('transform', 'translate(20,0)').call(d3.axisLeft().scale(scale_y));
}

function callout(g,value) {
    if (!value) return g.style("display", "none");
    g.style("display", null).style("pointer-events", "none").style("font", "10px sans-serif");
    const path = g.selectAll("path")
        .data([null])
        .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

    const text = g.selectAll("text")
        .data([null])
        .join("text")
        .call(text => text
            .selectAll("tspan")
            .data((value + "").split(/\n/))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i) => `${i * 1.1}em`)
            .style("font-weight", (_, i) => i ? null : "bold")
            .text(d => d));
    const {x, y, width: w, height: h} = text.node().getBBox();

    text.attr("transform", `translate(${-w / 2},${15 - y})`);
    path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
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

function drawAverage(averageDataSet) {
    var h = $("#stock-index").height();
    var w = $("#stock-index").width();
    var rightPadding = 30;
    var height = h-rightPadding;
    var width = w-rightPadding;
    var dataCnt = averageDataSet.length;
    var barPadding = 4;
    var svg = d3.select("#stock-index").append('svg').attr('width', w).attr('height', h).style("background", "#ffffff");
    var listArray = averageDataSet.map(e=>parseFloat(e.price));
    var maxPrice = d3.max(listArray);
    var minPrice = d3.min(listArray);
    var dateArray = averageDataSet.map(e=>parseInt(e.date));
    var maxDate = d3.max(dateArray)
    var minDate = d3.min(dateArray)
    var scale_x = d3.scaleLinear().domain([minDate,maxDate]).range([20,w]);
    var scale_y = d3.scaleLinear().domain([0.8*minPrice,1.2*maxPrice]).range([h-20,0]);

    var line_generator = d3.line().x(function(d){return scale_x(d.date);}).y(function(d){return scale_y(d.price);}).curve(d3.curveBasis);//把曲线设置光滑

    svg.append("g").append("path").attr("d", line_generator(averageDataSet)).attr('fill','none').attr('stroke','blue').attr('stroke-width','2');
    svg.append("g").attr("font-size","20").attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(scale_x));
    svg.append("g").attr("font-size","20").attr('transform', 'translate(20,0)').call(d3.axisLeft().scale(scale_y));

}

function drawOverView(overView) {
    $("#stockName").empty()
    $("#stockPrice").empty();
    $("#deal-amount").empty();
    $("#deal-cash").empty();
    $("#changeRate").empty();
    $("#rise-percent").empty();

    $("#stockName").html(overView.stockName);
    $("#stockPrice").html(overView.price);
    $("#deal-amount").html(overView.dealAmount);
    $("#deal-cash").html(overView.dealCash);
    $("#changeRate").html(overView.averageTurnoverRate);
    $("#rise-percent").html(overView.change);
    if (overView.priceRate > 0){
        $('#stockName').css('color','red');
        $('#stockPrice').css('color','red');
        $("#deal-cash").css('color','red');
        $('#deal-amount').css('color','red');
        $('#changeRate').css('color','red');
        $('#rise-percent').css('color','red');
    }else {
        $('#stockName').css('color','green');
        $('#stockPrice').css('color','green');
        $("#deal-cash").css('color','green');
        $('#deal-amount').css('color','green');
        $('#changeRate').css('color','green');
        $('#rise-percent').css('color','green');
    }
}

function bisect(e) {
    var bisect = d3.bisector(d => d.date).left;
    return mx => {
        const date = x.invert(mx);
        const index = bisect(data, date, 1);
        const a = data[index - 1];
        const b = data[index];
        return b && (date - a.date > b.date - date) ? b : a;
    };
}

function formatValue(value) {
    return value.toLocaleString("en", {
        style: "currency",
        currency: "USD"
    });
}

function formatDate(date) {
    return date.toLocaleString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    });
}
