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

    var h = $("#histDiagram").height();
    var w = $("#histDiagram").width();
    var svg = d3.select("#histDiagram").append('svg').attr('width', w).attr('height', h).attr("id","hist").style("background", "#ffffff");
    var xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, w - margin.right])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([h - margin.bottom, margin.top]);

    var xAxis = d3.axisBottom(xScale).tickFormat(i => data[i].key).tickSizeOuter(0);
    var yAxis = d3.axisLeft(yScale).ticks(null, data.format);

    svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d.value))
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth());
    svg.append("g").selectAll("text")
        .data(data)
        .attr("font-size", 12)
        .join("text")
        .attr("text-anchor", "begin")
        .attr("x", (d,i) => xScale(i) + xScale.bandwidth() / 3)
        .attr("y", d => yScale(d.value))
        .text(d => d.value);

    svg.append("g")
        .call(xAxis).attr("transform", `translate(0,${h - margin.bottom})`);

    svg.append("g")
        .call(yAxis).attr("transform", `translate(${margin.left},0)`);

}

function getColor(kItem) {
    return kItem.openPrice <= kItem.closePrice ? "red":"green";
}
