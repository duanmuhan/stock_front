$(function(){
     $.extend($.fn.bootstrapTable.Defaults, $.fn.bootstrapTable.locales['zh-CN'])
     renderTopValuePerPrice();
     renderHighestIncreaseShare();
     renderHighestPeriodIncreaseShare();
     renderStockAchievement(currentStartPagePage);
     renderStockScore();
     renderStockTechnology()
})
var pageSize = 10;
var currentStartPagePage = 1;
function renderTopValuePerPrice(){
                $('#latestShareBonus').bootstrapTable({
                    url: "http://127.0.0.1:8080/topValuePerPrice/form",
                    toolbar: '#toolbar',
                    striped: true,                      //是否显示行间隔色
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination : true,                   //是否显示分页（*）
                    sortable: false,                     //是否启用排序                 //排序方式
                    queryParams: function(params){
                        console.log(params);
                        return {
                            pageSize: params.limit,
                            pageNo: params.offset/params.limit
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
                    onLoadSuccess: function(data){
                       $('#latestShareBonus').bootstrapTable('load', data.data);
                    },
                    columns: [
                        {
                            field:'stockId',
                            title:'股票id',
                        },{
                            field:'stockName',
                            title:'股票名称',
                        },{
                            field:'price',
                            title:'股票价格',
                        },{
                            field:'earningsPerPrice',
                            title:'单位价格分红',
                        },{
                            field:'date',
                            title:'更新日期',
                        }
                    ],
                });

}

function renderHighestIncreaseShare(){
    var dataList;
    $('#highestIncreaseTable').bootstrapTable({
        url: "http://127.0.0.1:8080/stock/increase/rank",
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序                 //排序方式
        queryParams: function(params){
            console.log(params);
            return {
                pageSize: params.limit,
                pageNo: params.offset/params.limit
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
        onLoadSuccess: function(data){
           $('#highestIncreaseTable').bootstrapTable('load', data.data);
        },
        columns: [
            {
                field:'stockId',
                title:'股票id',
            },{
                field:'stockName',
                title:'股票名称',
            },{
                field:'price',
                title:'股票价格',
            },{
                field:'changeRate',
                title:'股票涨幅',
            },{
                field:'date',
                title:'更新日期',
            }
        ],
    });
}

function renderHighestPeriodIncreaseShare(){
    $('#highestPeriodIncreaseShare').bootstrapTable({
        url: "http://127.0.0.1:8080/stock/rate/rank",
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序                 //排序方式
        queryParams: function(params){
            console.log(params);
            return {
                pageSize: params.limit,
                pageNo: params.offset/params.limit
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
        onLoadSuccess: function(data){
           $('#highestPeriodIncreaseShare').bootstrapTable('load', data.data);
        },
        columns: [
            {
                field:'stockId',
                title:'股票id',
            },{
                field:'stockName',
                title:'股票名称',
            },{
                field:'price',
                title:'当前股票价格',
            },{
                field:'changeRate',
                title:'股票涨幅',
            },{
                field:'fromDate',
                title:'起始日期',
            },{
                field:'toDate',
                title:'截止日期',
             }
        ],
    });
}

function renderStockAchievement(){
                 $('#stockAchievement').bootstrapTable({
                    url: "http://127.0.0.1:8080/stock/achievement/list",
                    toolbar: '#toolbar',
                    striped: true,                      //是否显示行间隔色
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination : true,                   //是否显示分页（*）
                    sortable: false,                     //是否启用排序                 //排序方式
                    queryParams: function(params){
                           console.log(params);
                           return {
                                       pageSize: params.limit,
                                       pageNo: params.offset/params.limit
                           }
                    },         //传递参数（*）
                    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber:1,                       //初始化加载第一页，默认第一页
                    pageSize: 20,                       //每页的记录行数（*）
                    pageList: [20, 50, 100],        //可供选择的每页的行数（*）
                    smartDisplay:false,
                    undefinedText: '---',
                    showColumns: false,                 //是否显示所有的列
                    showRefresh: false,                 //是否显示刷新按钮
                    minimumCountColumns: 1,             //最少允许的列数
                    clickToSelect: true,                //是否启用点击选中行
                    showToggle:false,                   //是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    //是否显示详细视图
                    detailView: false,                 //是否显示父子表
                    onLoadSuccess: function(data){
                           console.log(data.data);
                          $('#stockAchievement').bootstrapTable('load', data.data);
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

}

function renderStockScore(currentPage){
                    $('#stockScore').bootstrapTable({
                        url: "http://127.0.0.1:8080/stock/technology/score",
                        toolbar: '#toolbar',
                        striped: true,                      //是否显示行间隔色
                        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                        pagination : true,                   //是否显示分页（*）
                        sortable: false,                     //是否启用排序                 //排序方式
                        queryParams: function(params){
                            console.log(params);
                            return {
                                pageSize: params.limit,
                                pageNo: params.offset/params.limit
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
                        onLoadSuccess: function(data){
                           $('#stockScore').bootstrapTable('load', data.data);
                        },
                        columns: [
                            {
                                field:'stockId',
                                title:'股票id',
                            },{
                                field:'stockName',
                                title:'股票名称',
                            },{
                                field:'score',
                                title:'股票评分',
                            },{
                                field:'releaseDate',
                                title:'更新日期',
                            }
                        ],
                    });

}

function renderStockTechnology(){
                 $('#stockTechnologyForm').bootstrapTable({
                    url: "http://127.0.0.1:8080/stock/technology",
                    toolbar: '#toolbar',
                    striped: true,                      //是否显示行间隔色
                    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination : true,                   //是否显示分页（*）
                    sortable: false,                     //是否启用排序                 //排序方式
                    queryParams: function(params){
                           console.log(params);
                           return {
                                       pageSize: params.limit,
                                       pageNo: params.offset/params.limit
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
                    onLoadSuccess: function(data){
                          $('#stockTechnologyForm').bootstrapTable('load', data.data);
                    },
                    columns: [{
                                field:'stockId',
                                title:'股票id',
                     },{
                                field:'stockName',
                                title:'股票名称',
                     },{
                                field:'buy',
                                title:'买入指标',
                     },{
                                field:'buyCount',
                                title:'买入指标个数',
                     },{
                                field:'sell',
                                title:'卖出指标',
                     },{
                                field:'sellCount',
                                title:'卖出指标个数',
                    },{
                                field:'event',
                                title:'其他信息',
                    },{
                                field:'releaseDate',
                                title:'更新日期',
                    }
                      ],
                     });
}


