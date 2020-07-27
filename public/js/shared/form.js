$(function(){

     render(currentStartPagePage);
     renderHighestIncreaseShare(currentStartPagePage);

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
                        $("#stockIncrease-pagination").html(buildPagination(currentPage,200,render));
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

