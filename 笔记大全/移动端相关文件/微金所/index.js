// 判断屏幕大小动态生成脚本
$(function(){
    // 初始化工具提示
    $('[data-toggle="tooltip"]').tooltip();
     // 获取当前所有item
     var items = $(".carousel-inner").find(".item");
    // 监听屏幕大小改变
    $(window).on("resize",function(){
        // 获取当前屏幕的宽度
        var width = $(this).width();
        // 判断当前屏幕的宽度
        if (width >= 768) {
          // 非移动端,为每一个item添加子元素
          items.each(function(index,value){
            var item = $(this);
            // 添加非移动端子元素
             /* 原生Dom方法 */
            // console.dir(item[0]);  
            // var imgSrc = item[0].dataset.largeImg;
            // console.log(imgSrc);
            /* JQ中提供获取data自定义属性方法 */
            var imgSrc =  item.data("largeImg");
            // item.html('<a href="javascript:;" class="PcImg hidden-xs" style="background-image: url('+imgSrc+')"></a>'); 
            // 不易阅读
            item.html($('<a href="javascript:;" class="PcImg"></a>').css("backgroundImage", "url("+imgSrc+")"));

          });
        } else {
            items.each(function(index, vale){
              var item = $(this);
              var imgSrc = item.data("smallImg");
              item.html($(' <a href="javascript:;" class="mobileImg"> <img src="'+imgSrc+'" alt="..."></a>'));

            });
        }
        
    }).trigger("resize");

    // 添加移动端的滑动操作
    // 因为使用的是框架，不清楚内部是怎么具体实现滚动的，所以无法使用定位或着偏移来做
    // 获取当前轮播图
    var cour = $(".carousel");
    var startX, endX;
    var imgBox = $(".carousel-inner")[0];
    imgBox.addEventListener("touchstart",function(e){
        startX = e.targetTouches[0].clientX;
    });
    imgBox.addEventListener("touchend",function(e){
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            // 上一张
            cour.carousel('prev'); 
        } else if (endX - startX < 0) {
            // 下一张
            cour.carousel('next'); 
        }
    });

    // 计算产品快导航项的原始宽度
    var ul = $(".wjs_product .nav-tabs");
    var lis = ul.find("li");
    var totalWidth = 0;  //总宽度
    lis.each(function(index,value){
        totalWidth += $(this).innerWidth();
    }); 
    ul.width(totalWidth);

    var myScroll = new IScroll(".tabs_parent", {
        scrollX:true, scrollY:false
    });

})