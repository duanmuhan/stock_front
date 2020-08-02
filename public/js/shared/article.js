$(
    fetchArticle();
)

function fetchArticle() {
    var releaseDate = "";
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
            drawOverView(result.data);
        },
        error:function(e){
            console.log("function error")
        }
    });

}

function drawNews(data){

    $("articleDiv").append()
}