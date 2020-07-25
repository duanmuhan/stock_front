$(function(){
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:8080/topValuePerPrice/form",
                async: false,
                beforeSend:function(){
                    console.log("start to request /stock/overview")
                },
                success:function (result) {
                    if (result.code != 200){
                        alert("error:" + result.message);
                    }
                    latestShareBonus(result.data);
                },
                error:function(e){
                    console.log("function error")
                }
            });
})

function bindClickEvent(){
    $(".parent").on('click',function(event){
            var flag = $(this).attr("data-flag");
     });
}

function latestShareBonus(data){
    for(i=0;i<data.length; i++){
        var $trTemp = $("<tr class='parent'></tr>");
        $trTemp.append("<td> <i class=" + "fa fa-chevron-right" + "data-flag=" + i + "></i> "+ data[i].stockId +"</td>");
        $trTemp.append("<td>"+ data[i].stockName +"</td>");
        $trTemp.append("<td>"+ data[i].price +"</td>");
        $trTemp.append("<td>"+ data[i].earningsPerPrice +"</td>");
        $trTemp.append("<td>"+ data[i].date +"</td>");

        var $trChild = $("<tr class='click1'>"+ "所属板块" +"</tr>");
        var platelist = data[i].plate.split(";");
        for(j=0; j<platelist.length; j++){
            $trChild.append("<td>"+ platelist[j] +"</td>");
        }
        $trTemp.appendTo("#latestShareBonus");
        $trChild.appendTo("#latestShareBonus");

    }
}