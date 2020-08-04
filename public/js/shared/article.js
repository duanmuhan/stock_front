$(function(){
    fetchArticle()
})

function fetchArticle() {
    var releaseDate = getBeforeDate(3);
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/stock/news/list?" + "releaseDate=" + releaseDate,
        async: false,
        beforeSend:function(){
            console.log("start to request /stock/news/list")
        },
        success:function (result) {
            if (result.code != 200){
                alert("error:" + result.message);
            }
            drawNews(result.data);
        },
        error:function(e){
            console.log("function error")
        }
    });

}

function drawNews(data){
    if (data == null){
        return;
    }
    var innerHTML = "";
    for (i=0; i<data.length; i++){
        var title =  data[i].title;
        var platform = data[i].platform;
        var releaseDate = data[i].releaseDate;
        var source = data[i].source;

        var plateStr = "";
        for (j=0;j<data[i].platePairList.length; j++){
            plateStr = plateStr + "<label id="+ data[i].platePairList[j].key + " class='badge badge-danger'" + " onclick=displayStockItems(this) " + ">" + data[i].platePairList[j].value + "</label>"
        }

        var platformStr = "<a href = " + source + ">" + platform + "</a>";

        var str = "<div class=\"card-body\">" +"<h4 >" + title + "<small class=\"text-muted\"> 发布时间：" +　releaseDate + "</small></h4>" +
            "<p class='card-title text-primary'>" + "命中板块：" +  plateStr + "</p>"  +
            "<p class='card-title text-info'>" + "信息来源：" + platformStr  + "</p>"+
            "</div>"

        innerHTML = innerHTML + str;
    }
    var articleDiv = document.getElementById("articleDiv");
    articleDiv.innerHTML = innerHTML;

}

function displayStockItems(element) {
    var plateId=element.id;
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:8080/plate/stock/list?" + "plateId=" + plateId,
        async: false,
        beforeSend:function(){
            console.log("start to request /plate/stock/list")
        },
        success:function (result) {
            if (result.code != 200){
                alert("error:" + result.message);
            }
            drawStockItemsDisplayPanel(result.data,element);
        },
        error:function(e){
            console.log("function error")
        }
    });
}

function drawStockItemsDisplayPanel(data,object) {
    var x = object.offsetTop;
    var y = object.offsetLeft;
    $("#stock-panel").css("position", "absolute");
    $("#stock-panel").css("top", x-100);
    $("#stock-panel").css("left", y+400);
    $("#stock-panel-tbody").empty();
    for(i=0;i<data.length; i++){
        var $trTemp = $("<tr class='parent'></tr>");
        $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
        $trTemp.append("<td>"+ data[i].stockName +"</td>");
        $trTemp.append("<td>"+ data[i].price +"</td>");
        $trTemp.append("<td>"+ data[i].dealAmount +"</td>");
        $trTemp.append("<td>"+ data[i].date +"</td>");
        $trTemp.appendTo("#stock-panel-tbody");

    }
    $("#stock-panel").fadeIn("100");

}

function getStockPanelDraggable() {

}

function getBeforeDate(days) {
    var time = (new Date()).getTime() - days*24*60*60*1000;
    var targetTime=new Date(time);
    var month=targetTime.getMonth()+1;//一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
    var date=targetTime.getDate();
    var seperator1="-";//设置成自己想要的年月日格式：年-月-    var seperator2=":";//设置成自己想要的时分秒格式：时:分:秒
    if(month>=1&&month<=9){
        month="0"+month;
    }
    if(date<=9){
        date="0"+date;
    }
    var currentDate=targetTime.getFullYear()+seperator1+month+seperator1+date;
    return currentDate;
}