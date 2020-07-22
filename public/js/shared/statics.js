$(function () {
    fetchPriceAndShare();
    fetchStockMarketValue();
})

function fetchPriceAndShare() {

    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/topValuePerPrice",
        async: false,
        beforeSend:function(){
            console.log("start to request /topValuePerPrice")
        },
        success:function (result) {
            console.log(result.data)
            d3.select("#scatterDiagram").remove()
            drawScatterDiagram(result.data);
        },
        error:function(e){
            console.log("function error")
            console.log(e.status)
            console.log(e.responseText)
        }
    })
}

function fetchStockMarketValue(){
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/stock/market",
        async: false,
        beforeSend:function(){
            console.log("start to request /stock/market")
        },
        success:function (result) {
            console.log(result.data)
            d3.select("#hist").remove()
            drawHistDiagram(result.data.valuePairList);
        },
        error:function(e){
            console.log("function error")
            console.log(e.status)
            console.log(e.responseText)
        }
    })
}

function drawScatterDiagram(data) {
    var h = $("#mixed-chart").height();
    var w = $("#mixed-chart").width();
    var rightPadding = 30;
    var height = h-rightPadding;
    var width = w-rightPadding;
    var svg = d3.select("#mixed-chart").append('svg').attr('width', w).attr('height', h).style("background", "#ffffff");
    var maxPrice = d3.max(data.map(e=>e.price));
    var minPrice = d3.min(data.map(e=>e.price));
    var perCommonMaxShare = d3.max(data.map(e=>e.basicEarningsPerCommonShare));
    var perCommonMinShare = d3.min(data.map(e=>e.basicEarningsPerCommonShare));
    var x_scale = d3.scaleLog().domain([minPrice, maxPrice]).range([0,width]);
    var y_scale = d3.scalePow().exponent(0.3).domain([perCommonMinShare, perCommonMaxShare]).range([0,height]);
    var tooltip = d3.select("circle").append("div")
        .attr("class","tooltip")
    svg.selectAll("circle").data(data).enter()
        .append("circle")
        .attr("id","scatterDiagram")
        .attr("cx", function(d) {
            return x_scale(d.price);
        })
        .attr("cy", function(d) {
            return height - y_scale(d.basicEarningsPerCommonShare);
        })
        .attr("r", 4)
        .attr("fill","red")
        .on("mouseenter",function (d) {
            var x = x_scale(d.price);
            var y = height - y_scale(d.basicEarningsPerCommonShare);
            console.log("mouseover");
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-setif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "blue")
                //文本内容
                .text("股票id" + d.stockId);
        })
        .on("mouseout",function (d) {
            d3.select("#tooltip").remove();
        }).on("mouseover",function(d) {
            var x = x_scale(d.price);
            var y = height - y_scale(d.basicEarningsPerCommonShare);
            console.log("mouseover");
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-setif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "blue")
                //文本内容
                .text("股票id" + d.stockId);
        }
    )
    var scale_x = d3.scaleLog().domain([minPrice,maxPrice]).range([20,w]);
    var scale_y = d3.scalePow().domain([perCommonMinShare,perCommonMaxShare]).range([h-20,0]);
    svg.append("g").attr("font-size","20").attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(scale_x));
    svg.append("g").attr("font-size","20").attr('transform', 'translate(30,0)').call(d3.axisLeft().scale(scale_y));
}

function drawHistDiagram(data) {

    var margin = ({top: 30, right: 0, bottom: 30, left: 40})

    var xRange = data.map(e=>e.key);
    var yRange = data.map(e=>e.value)
    var h = $("#histDiagram").height();
    var w = $("#histDiagram").width();
    var svg = d3.select("#histDiagram").append('svg').attr('width', w).attr('height', h).attr("id","hist").style("background", "#ffffff");
    var xScale = d3.scaleOrdinal()
        .domain(xRange)
        .range([0,w/10, 2*w/10, 3*w/10, 4*w/10, 5*w/10, 6*w/10, 7*w/10,8*w/10,9*w/10,w]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(yRange)])
        .range([h - 20, 0]);

    var xAxis = d3.axisBottom().scale(xScale);

    svg.append('g')
        .call(xAxis)
        .attr("transform", "translate(0," + (h-20) + ")")
        .selectAll("text")
        .attr("dx", "50px");

    var bar = svg.selectAll(".bar")
        .data(yRange)
        .enter().append("g")
        .attr("class", "bar")
        .attr("fill", "steelblue")
        .attr("transform", function(d, i) {
            return "translate(" + xScale(i * w/10) + "," + yScale(d) + ")";
        });
    bar.append("rect")
        .attr("x", 1)
        .attr()
        .attr("width", 100)
        .attr("height", function(d) {
            return h - yScale(d);
        })
        .attr("stroke", "White");

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", 50)
        .attr("text-anchor", "middle")
        .attr("font-size", "8px")
        .attr("fill", "White")
        .text(function(d) {
            return d;
        });
}

function getColor(kItem) {
    return kItem.openPrice <= kItem.closePrice ? "red":"green";
}
