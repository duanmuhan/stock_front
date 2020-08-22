$(function () {
    getStockPanelDraggable();
    fetchPriceAndShare();
    fetchStockMarketValue();
    fetchStockChangeValue();
    fetchStockPriceHistValue();
    fetchStockHolderConcentrate();
    fetchStockHolderAchievement();
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
        url:"http://127.0.0.1:8080/stock/market/hist",
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

function fetchStockChangeValue() {
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/stock/change/hist",
        async: false,
        beforeSend:function(){
            console.log("start to request /stock/change/hist")
        },
        success:function (result) {
            console.log(result.data)
            d3.select("#stockStockPriceChart").remove()
            drawStockChangeHistChart(result.data.list);
        },
        error:function(e){
            console.log("function error")
            console.log(e.status)
            console.log(e.responseText)
        }
    })
}

function fetchStockPriceHistValue() {
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/stock/price/hist",
        async: false,
        beforeSend:function(){
            console.log("start to request /stock/market")
        },
        success:function (result) {
            console.log(result.data)
            d3.select("#stockPriceHistSvg").remove()
            drawStockPriceHist(result.data.list);
        },
        error:function(e){
            console.log("function error")
            console.log(e.status)
            console.log(e.responseText)
        }
    })
}

function fetchStockHolderConcentrate() {
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/stockholder/rate/hist",
        async: false,
        beforeSend:function(){
            console.log("start to request /stockholder/rate/hist")
        },
        success:function (result) {
            console.log(result.data)
            d3.select("#stockHolderConcentrateHist").remove()
            drawStockHolderConcentrate(result.data.list);
        },
        error:function(e){
            console.log("function error")
            console.log(e.status)
            console.log(e.responseText)
        }
    })
}

function fetchStockHolderAchievement() {
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/stock/achievement/group",
        async: false,
        beforeSend:function(){
            console.log("start to request /stock/achievement/group")
        },
        success:function (result) {
            d3.select("#stockAchievementHistGraph").remove()
            drawStockAchievementHist(result.data.list);
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
    var margin = ({top: 30, right: 0, bottom: 30, left: 40})
    var svg = d3.select("#mixed-chart").append('svg').attr('width', w).attr('height', h).style("background", "#ffffff");
    var maxPrice = d3.max(data.map(e=>e.price));
    var minPrice = d3.min(data.map(e=>e.price));
    var perCommonMaxShare = d3.max(data.map(e=>e.basicEarningsPerCommonShare));
    var perCommonMinShare = d3.min(data.map(e=>e.basicEarningsPerCommonShare));
    var x_scale = d3.scaleLog().domain([minPrice, maxPrice]).range([margin.left, w - margin.right]);
    var y_scale = d3.scalePow().exponent(0.3).domain([perCommonMinShare, perCommonMaxShare]).nice().range([h - margin.bottom, margin.top]);;
    var tooltip = d3.select("circle").append("div")
        .attr("class","tooltip")
    svg.selectAll("circle").data(data).enter()
        .append("circle")
        .attr("id","scatterDiagram")
        .attr("cx", function(d) {
            return x_scale(d.price);
        })
        .attr("cy", function(d) {
            return h - y_scale(d.basicEarningsPerCommonShare);
        })
        .attr("r", 4)
        .attr("fill","red")
        .on("mouseenter",function (d) {
            var x = x_scale(d.price);
            var y = h - y_scale(d.basicEarningsPerCommonShare);
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
            var y = h - y_scale(d.basicEarningsPerCommonShare);
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
    svg.append("g")
        .call(x_scale).attr("transform", `translate(0,${h - margin.bottom})`);

    svg.append("g")
        .call(y_scale).attr("transform", `translate(${margin.left},0)`);
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

function drawStockChangeHistChart(data){

    var margin = ({top: 30, right: 0, bottom: 30, left: 40})

    var h = $("#upAndDownStockHist").height();
    var w = $("#upAndDownStockHist").width();
    var svg = d3.select("#upAndDownStockHist").append('svg').attr('width', w).attr('height', h).attr("id","hist").style("background", "#ffffff");
    var xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, w - margin.right])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.changeNum)]).nice()
        .range([h - margin.bottom, margin.top]);

    var xAxis = d3.axisBottom(xScale).tickFormat(i => data[i].changeRate).tickSizeOuter(0);
    var yAxis = d3.axisLeft(yScale).ticks(null, data.format);

    svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d.changeNum))
        .attr("height", d => yScale(0) - yScale(d.changeNum))
        .attr("width", xScale.bandwidth());
    svg.append("g").selectAll("text")
        .data(data)
        .attr("font-size", 12)
        .join("text")
        .attr("text-anchor", "begin")
        .attr("x", (d,i) => xScale(i) + xScale.bandwidth() / 3)
        .attr("y", d => yScale(d.changeNum))
        .text(d => d.changeNum);

    svg.append("g")
        .call(xAxis).attr("transform", `translate(0,${h - margin.bottom})`);

    svg.append("g")
        .call(yAxis).attr("transform", `translate(${margin.left},0)`);

}

function drawStockPriceHist(data) {

    var margin = ({top: 30, right: 0, bottom: 30, left: 40})

    var h = $("#stockPriceHist").height();
    var w = $("#stockPriceHist").width();
    var svg = d3.select("#stockPriceHist").append('svg').attr('width', w).attr('height', h).attr("id","stockPriceHistSvg").style("background", "#ffffff");
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
        .attr("fill", "CadetBlue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d.value))
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth())
        .on("mousedown",function (d,i) {
            fetchStockPriceByType(d.key,this);
        });
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

function drawStockHolderConcentrate(data) {
    var margin = ({top: 30, right: 0, bottom: 30, left: 40})
    var h = $("#stockHolderHist").height();
    var w = $("#stockHolderHist").width();
    var svg = d3.select("#stockHolderHist").append('svg').attr('width', w).attr('height', h).attr("id","stockHolderConcentrateHist").style("background", "#ffffff");
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
        .attr("fill", "#952FFE")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d.value))
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth())
        .on("mousedown",function (d,i) {
            fetchStockHolderDetailByData(d.key,this);
        });
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

function drawStockAchievementHist(data) {
    var margin = ({top: 30, right: 0, bottom: 30, left: 40})
    var h = $("#stockAchievementHist").height();
    var w = $("#stockAchievementHist").width();
    var svg = d3.select("#stockAchievementHist").append('svg').attr('width', w).attr('height', h).attr("id","stockAchievementHistGraph").style("background", "#ffffff");
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
        .attr("fill", "#952ffe")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d.value))
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth())
        .on("mousedown",function (d,i) {
            fetchStockAchievementDetailByData(d.key,this);
        });

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

function fetchStockPriceByType(data,object) {
    var x = d3.event.clientX;
    var y = d3.event.clientY;
    console.log(object)
    $("#stock-panel").css("position", "absolute");
    $("#stock-panel").css("top", x);
    $("#stock-panel").css("left", y+800);
    $('#stock-panel-tbody').bootstrapTable('destroy');
    $('#stock-panel-tbody').bootstrapTable({
        url: "http://127.0.0.1:8080/stock/price/type",
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序                 //排序方式
        queryParams: function(params){
            console.log(data);
            return {
                pageSize: params.limit,
                pageNo: params.offset/params.limit,
                type:data,
                date:null
            }
        },         //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        smartDisplay:false,
        undefinedText: '---',
        showColumns: false,                 //是否显示所有的列
        showRefresh: false,                 //是否显示刷新按钮
        minimumCountColumns: 1,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        showToggle:false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                 //是否显示父子表
        onLoadSuccess: function(result){
            console.log(result.data);
            $('#stock-panel-tbody').bootstrapTable('load', result.data);
        },
        columns: [{
            field:'stockId',
            title:'股票id',
        },{
            field:'stockName',
            title:'股票名称',
        },{
            field:'price',
            title:'价格',
        },{
            field:'releaseDate',
            title:'更新时间',
        }
        ],
    });
    $('#stock-panel').fadeIn(100);
}

function fetchStockHolderDetailByData(data,object) {
    var x = d3.event.clientX;
    var y = d3.event.clientY;
    $("#stock-panel").css("position", "absolute");
    $("#stock-panel").css("top", x+1200);
    $("#stock-panel").css("left", y+800);
    $('#stock-panel-tbody').bootstrapTable('destroy');
    $('#stock-panel-tbody').bootstrapTable({
        url: "http://127.0.0.1:8080/stockholder/marketValue/type",
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序                 //排序方式
        queryParams: function(params){
            console.log(data);
            return {
                pageSize: params.limit,
                pageNo: params.offset/params.limit,
                type:data
            }
        },         //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        smartDisplay:false,
        undefinedText: '---',
        showColumns: false,                 //是否显示所有的列
        showRefresh: false,                 //是否显示刷新按钮
        minimumCountColumns: 1,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        showToggle:false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                 //是否显示父子表
        onLoadSuccess: function(result){
            console.log(result.data);
            $('#stock-panel-tbody').bootstrapTable('load', result.data);
        },
        columns: [{
            field:'stockId',
            title:'股票id',
        },{
            field:'stockName',
            title:'股票名称',
        },{
            field:'numberOfShareholders',
            title:'股东人数',
        },{
            field:'perCapitaTradableShares',
            title:'人均流通股',
        },{
            field:'lastChange',
            title:'较上期变化',
        },{
            field:'stockConvergenceRate',
            title:'筹码集中度',
        },{
            field:'price',
            title:'股价',
        },{
            field:'perCapitaHoldingAmount',
            title:'人均持股金额',
        },{
            field:'topTenStockHolder',
            title:'前十大股东持股合计',
        },{
            field:'topTenStockFlowHolder',
            title:'前十大流通股东持股合计',
        },{
            field:'releaseDate',
            title:'日期',
        }
        ],
    });
    $('#stock-panel').fadeIn(100);
}

function fetchStockAchievementDetailByData(data,object) {
    var x = d3.event.clientX;
    var y = d3.event.clientY;
    console.log(object)
    $("#stock-panel").css("position", "absolute");
    $("#stock-panel").css("top", x+1200);
    $("#stock-panel").css("left", y+800);
    $('#stock-panel-tbody').bootstrapTable('destroy');
    $('#stock-panel-tbody').bootstrapTable({
        url: "http://127.0.0.1:8080/stock/achievement/type/list",
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序                 //排序方式
        queryParams: function(params){
            console.log(data);
            return {
                pageSize: params.limit,
                pageNo: params.offset/params.limit,
                type:data
            }
        },         //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        smartDisplay:false,
        undefinedText: '---',
        showColumns: false,                 //是否显示所有的列
        showRefresh: false,                 //是否显示刷新按钮
        minimumCountColumns: 1,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        showToggle:false,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                 //是否显示父子表
        onLoadSuccess: function(result){
            console.log(result.data);
            $('#stock-panel-tbody').bootstrapTable('load', result.data);
        },
        columns: [{
            field:'stockId',
            title:'股票id',
        },{
            field:'stockName',
            title:'股票名称',
        },{
            field:'achievementType',
            title:'业绩预告类型',
        },{
            field:'achievementTitle',
            title:'业绩预告摘要',
        },{
            field:'profileChangeRate',
            title:'净利润变动幅度',
        },{
            field:'profileLastYear',
            title:'上年同期净利润',
        },{
            field:'releaseDate',
            title:'公告日期',
        }
        ],
    });
    $('#stock-panel').fadeIn(100);
}

function getStockPanelDraggable() {
    $("#stock-panel").mousedown(function (e) {

        $(document).mousemove(function (e) {
            var x = e.pageX;
            var y = e.pageY;

            if (x < 0) {
                x = 0;
            } else if (x > $(document).width() - $('#stock-panel').outerWidth(true)) {
                x = $(document).width() - $('#stock-panel').outerWidth(true);
            }

            if (y < 0) {
                y = 0;
            } else if (y > $(document).height() - $('#stock-panel').outerHeight(true)) {
                y = $(document).height() - $('#stock-panel').outerHeight(true);
            }

            $("#stock-panel").css({
                'left': x + 'px',
                'top': y + 'px'
            });
        });
        $(document).mouseup(function() {
            $(document).off('mousemove');
        });
    });
}

function drawTargetForm(data) {

}

function turnoff() {
    $("#stock-panel").fadeOut("100");
}

function arcLabel() {
    const radius = Math.min(width, height) / 2 * 0.8;
    return d3.arc().innerRadius(radius).outerRadius(radius);
}

function getColor(kItem) {
    return kItem.openPrice <= kItem.closePrice ? "red":"green";
}
