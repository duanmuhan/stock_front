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
        var str = "<div class=\"card-body\">" +"<h4>" + title + "<small class=\"text-muted\"> 发布时间：" +　releaseDate + "</small></h4>" +
            "<p class='card-description'>" + "命中板块：" + "</p>" +
            "</div>"

        innerHTML = innerHTML + str;
    }
    var articleDiv = document.getElementById("articleDiv");
    articleDiv.innerHTML = innerHTML;

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