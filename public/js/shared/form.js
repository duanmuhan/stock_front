$(function(){

     render()

})

var pageSize = 20;
var currentPage = 0;

function render(){
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
                    setPage(currentPage,Math.cell(result.size/pageSize),render);
                },
                error:function(e){
                    console.log("function error")
                }
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

    }
}

function setPage(currentPage,pageSum, callback){
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 4,
            // 显示第几页
            currentPage: currentPage,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,page) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                currentPage = page
                callback && callback()
            }
        })

}