$(function(){
    getStockPanelDraggable();
    fetchArticle();
})

function fetchArticle() {
    var releaseDate = getBeforeDate(3);
    $.ajax({
        type:"GET",
        url:"http://124.70.139.25:8083/stock/news/list?" + "releaseDate=" + releaseDate,
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
            plateStr = plateStr + "<label id="+ data[i].platePairList[j].first + " class='badge badge-danger'" + " onclick=displayStockItems(this) " + ">" + data[i].platePairList[j].second + "</label>"
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
    var x = element.offsetTop;
    var y = element.offsetLeft;
    $("#stock-panel").css("position", "absolute");
    $("#stock-panel").css("top", y);
    $("#stock-panel").css("left", x);
    $('#stock-panel-tbody').bootstrapTable({
        url: "http://127.0.0.1:8083/plate/stock/list",
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序                 //排序方式
        queryParams: function(params){
            return {
                pageSize: params.limit,
                pageNo: params.offset/params.limit,
                plateId:plateId
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
            title:'股票价格',
        },{
            field:'date',
            title:'更新日期',
        }],
    });
    $("#stock-panel").fadeIn("100");
}

function drawStockItemsDisplayPanel(data,object) {


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

function turnoff() {
    $("#stock-panel").fadeOut("100");
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