$(function(){
$.extend($.fn.bootstrapTable.Defaults, $.fn.bootstrapTable.locales['zh-CN'])
     renderTopValuePerPrice();
     renderHighestIncreaseShare();
     renderHighestPeriodIncreaseShare();
     renderStockAchievement(currentStartPagePage);
     renderStockScore(currentStartPagePage);
     renderStockTechnology(currentStartPagePage)
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

function renderStockAchievement(currentPage){
                    $.ajax({
                        type:"GET",
                        url:"http://127.0.0.1:8080/stock/achievement/list",
                        data:{
                            pageNo : currentPage,
                            pageSize : pageSize
                        },
                        async: false,
                        beforeSend:function(){
                            console.log("start to request /stock/achievement/list")
                        },
                        success:function (result) {
                            if (result.code != 200){
                                alert("error:" + result.message);
                            }
                            stockAchievement(result.data);
                            $("#stock-achievement-Increase-pagination").html(buildPagination(currentPage,200,renderStockAchievement));
                        },
                        error:function(e){
                            console.log("function error:{}",e)
                        }
                    });
}

function renderStockScore(currentPage){
                $.ajax({
                    type:"GET",
                    url:"http://127.0.0.1:8080/stock/technology/score",
                    data:{
                         pageNo : currentPage,
                         pageSize : pageSize
                    },
                    async: false,
                    beforeSend:function(){
                        console.log("start to request /stock/technology/score")
                    },
                    success:function (result) {
                        if (result.code != 200){
                            alert("error:" + result.message);
                        }
                        stockScore(result.data);
                        $("#stockScore-ul-pagination").html(buildPagination(currentPage,200,renderHighestPeriodIncreaseShare));
                    },
                    error:function(e){
                        console.log("function error:{}",e)
                    }
                });

}

function renderStockTechnology(currentPage){
                $.ajax({
                    type:"GET",
                    url:"http://127.0.0.1:8080/stock/technology",
                    data:{
                        pageNo : currentPage,
                        pageSize : pageSize
                    },
                    async: false,
                    beforeSend:function(){
                        console.log("start to request /stock/technology")
                    },
                    success:function (result) {
                        if (result.code != 200){
                            alert("error:" + result.message);
                            return;
                        }
                        stockTechnology(result.data);
                        $("#stockTechnology-ul-pagination").html(buildPagination(currentPage,200,renderHighestPeriodIncreaseShare));
                    },
                    error:function(e){
                        console.log("function error:{}",e)
                    }
                });
}


function latestShareBonus(data){
    $("#latestShareBonus").empty();
    for(i=0;i<data.length; i++){
        var $trTemp = $("<tr class='parent'></tr>");
        $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
        $trTemp.append("<td>"+ data[i].stockName +"</td>");
        $trTemp.append("<td>"+ data[i].changeRate +"</td>");
        $trTemp.append("<td>"+ data[i].earningsPerPrice +"</td>");
        $trTemp.append("<td>"+ data[i].date +"</td>");
        $trTemp.appendTo("#latestShareBonus");

    }
}

function highestIncreaseShare(data){
    $("#highestStockIncrease").empty();
    for(i=0; i<data.length; i++){
       var $trTemp = $("<tr class='parent'></tr>");
       $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
       $trTemp.append("<td>"+ data[i].stockName +"</td>");
       $trTemp.append("<td>"+ data[i].price +"</td>");
       $trTemp.append("<td>"+ data[i].changeRate*100 + "%" +"</td>");
       $trTemp.append("<td>"+ data[i].date +"</td>");
       $trTemp.appendTo("#highestStockIncrease");
    }
}

function highestPeriodIncreaseShare(data){
    $("#highesePeriodIncreaseShare").empty();
    for(i=0; i<data.length; i++){
       var $trTemp = $("<tr class='parent'></tr>");
       $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
       $trTemp.append("<td>"+ data[i].stockName +"</td>");
       $trTemp.append("<td>"+ data[i].price +"</td>");
       $trTemp.append("<td>"+ data[i].changeRate +"</td>");
       $trTemp.append("<td>"+ data[i].toDate +"</td>");
       $trTemp.append("<td>"+ data[i].fromDate +"</td>");
       $trTemp.appendTo("#highesePeriodIncreaseShare");
    }
}

function stockAchievement(data){
    $("#stockAchievement").empty();
    for(i=0; i<data.length; i++){
           var $trTemp = $("<tr class='parent'></tr>");
           $trTemp.append("<td>"+ i +"</td>");
           $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
           $trTemp.append("<td>"+ data[i].stockName +"</td>");
           $trTemp.append("<td>"+ data[i].achievementType +"</td>");
           $trTemp.append("<td>"+ data[i].achievementTitle +"</td>");
           $trTemp.append("<td>"+ data[i].profileChangeRate +"</td>");
           $trTemp.append("<td>"+ data[i].profileLastYear +"</td>");
           $trTemp.append("<td>"+ data[i].releaseDate +"</td>");
           $trTemp.appendTo("#stockAchievement");
     }
}

function stockScore(data){
    $("#stockScore").empty();
        for(i=0; i<data.length; i++){
           var $trTemp = $("<tr class='parent'></tr>");
           $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
           $trTemp.append("<td>"+ data[i].stockName +"</td>");
           $trTemp.append("<td>"+ data[i].score +"</td>");
           $trTemp.append("<td>"+ data[i].releaseDate +"</td>");
           $trTemp.appendTo("#stockScore");
        }
}

function stockTechnology(data){
    $("#stockTechnologyForm").empty();
        for(i=0; i<data.length; i++){
           var $trTemp = $("<tr class='parent'></tr>");
           $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
           $trTemp.append("<td>"+ data[i].stockName +"</td>");
           $trTemp.append("<td>"+ data[i].buy +"</td>");
           $trTemp.append("<td>"+ data[i].buyCount +"</td>");
           $trTemp.append("<td>"+ data[i].sell +"</td>");
           $trTemp.append("<td>"+ data[i].sellCount +"</td>");
           $trTemp.append("<td>"+ data[i].event +"</td>");
           $trTemp.append("<td>"+ data[i].releaseDate +"</td>");
           $trTemp.appendTo("#stockTechnologyForm");
        }
}

// 初始状态
 function initPage() {
     return '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">上一页</a></li>' +
          '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">1</a></li>' +
          '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">下一页</a></li>';
 }

function buildPagination(currentPage, totalPage,funcName){
    currPage = Number(currentPage);
    totalPage = Number(totalPage);
    let pageStr = '';
    if (totalPage > 1) {
       if (totalPage <= 10) {
            pageStr += prePage(currPage, funcName);
            pageStr += startNPage(currPage, totalPage, funcName);
            pageStr += nextPage(currPage, totalPage, funcName);
        } else if (totalPage > 10) {
       if (currPage < 10) {
            pageStr += prePage(currPage, funcName);
            pageStr += startNPage(currPage, totalPage, funcName);
            pageStr += lastPage(totalPage, funcName);
            pageStr += nextPage(currPage, totalPage, funcName);
        } else {
        if (currPage <= (totalPage - 10)) {
            pageStr += prePage(currPage, funcName);
            pageStr += firstPage(funcName);
            pageStr += plusAndMinusTwoPages(currPage, funcName);
            pageStr += lastPage(totalPage, funcName);
            pageStr += nextPage(currPage, totalPage, funcName);
         } else {
             pageStr += prePage(currPage, funcName);
             pageStr += firstPage(funcName);
             pageStr += endNPage(currPage, totalPage, funcName);
             pageStr += nextPage(currPage, totalPage, funcName);
        }
     }
    }
 } else {
        pageStr += initPage();
    }
        return pageStr;
}


// 上一页
 function prePage(currPage, funcName) {
     let str = '';
     if (currPage === 1) {
        str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">上一页</a></li>';
     } else {
         str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(\'pre\');">上一页</a></li>';
 }
    return str;
 }

function firstPage(funcName) {
    return '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(1);">1</a></li>' +
         '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">...</a></li>';
}

function startNPage(currentPage,totalPage,funcName){
    var str='', total;
    if(totalPage >10){
        total = 10;
    }else{
        total = totalPage;
    }
    for (i=1; i< total +1; i++){
         if (i === currPage) {
                    str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">' + i + '</a></li>';
                } else {
                     str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + i + ');">' + i + '</a></li>';
                }
    }
    return str;
}

function plusAndMinusTwoPages(currPage, funcName) {
   let str = '', start = currPage - 2, end = currPage + 3;
       for (let i = start; i < end; i++) {
                if (i === currPage) {
                             str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">' + i + '</a></li>';
                 } else {
                             str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + i + ');">' + i + '</a></li>';
                }
        }
       return str;
}

function endNPage(currPage, totalPage, funcName) {
     let str = '', start = totalPage - 5 + 1, end = totalPage + 1;
     for (let i = start; i < end; i++) {
         if (i === currPage) {
             str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">' + i + '</a></li>';
         } else {
             str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + i + ');">' + i + '</a></li>';
         }
     }
     return str;
}

function lastPage(totalPage, funcName) {
    return '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">...</a></li>' +
         '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + totalPage + ');">' + totalPage + '</a></li>';
}

// 下一页
function nextPage(currPage, totalPage, funcName) {
     let str = '';
     if (currPage === totalPage) {
         str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">下一页</a></li>';
     } else {
         str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(\'next\');">下一页</a></li>';
     }
     return str;
}

