$(function(){

     render(currentStartPagePage);
     renderHighestIncreaseShare(currentStartPagePage);
     renderHighestPeriodIncreaseShare(currentStartPagePage);
     renderStockAchievement(currentStartPagePage);
     renderStockScore(currentStartPagePage);
})
var pageSize = 10;
var currentStartPagePage = 1;
function render(currentPage){
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/topValuePerPrice/form",
                data:{
                    pageNo : currentPage,
                    pageSize : pageSize
                },
                async: false,
                beforeSend:function(){
                    console.log("start to request /topValuePerPrice/form")
                },
                success:function (result) {
                    if (result.code != 200){
                        alert("error:" + result.message);
                    }
                    latestShareBonus(result.data.list);
                    $("#pagination").html(buildPagination(currentPage,200,render));
                },
                error:function(e){
                    console.log("function error:{}",e)
                }
            });

}

function renderHighestIncreaseShare(currentPage){
                $.ajax({
                    type:"GET",
                    url:"http://127.0.0.1:8080/stock/increase/rank",
                    data:{
                        pageNo : currentPage,
                        pageSize : pageSize
                    },
                    async: false,
                    beforeSend:function(){
                        console.log("start to request /stock/increase/rank")
                    },
                    success:function (result) {
                        if (result.code != 200){
                            alert("error:" + result.message);
                        }
                        highestIncreaseShare(result.data);
                        $("#stockIncrease-pagination").html(buildPagination(currentPage,200,renderHighestIncreaseShare));
                    },
                    error:function(e){
                        console.log("function error:{}",e)
                    }
                });
}

function renderHighestPeriodIncreaseShare(currentPage){
                $.ajax({
                    type:"GET",
                    url:"http://127.0.0.1:8080/stock/rate/rank",
                    data:{
                        pageNo : currentPage,
                        pageSize : pageSize
                    },
                    async: false,
                    beforeSend:function(){
                        console.log("start to request /stock/rate/rank")
                    },
                    success:function (result) {
                        if (result.code != 200){
                            alert("error:" + result.message);
                        }
                        highestPeriodIncreaseShare(result.data);
                        $("#stock-period-Increase-pagination").html(buildPagination(currentPage,200,renderHighestPeriodIncreaseShare));
                    },
                    error:function(e){
                        console.log("function error:{}",e)
                    }
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
                            $("#ststock-achievement-Increase-pagination").html(buildPagination(currentPage,200,renderStockAchievement));
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
                        }
                        stockTechnology(result.data);
                        $("#stockScore-ul-pagination").html(buildPagination(currentPage,200,renderHighestPeriodIncreaseShare));
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

