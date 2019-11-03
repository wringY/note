// 轮播功能
// 无缝轮播
// 点击序号轮播
// 自动轮播 
// 1.点击序号轮播
// 给序号添加自定义属性对应图片，并注册事件
$(function(){
    var ul = $(".jd_banner_img")[0];
    var count = $(".jd_banner_img").children().length;  //count 8
    var bannerFlag =document.getElementsByClassName("jd_banner_flag")[0];
    var imgWidth = $(".jd_banner_img li")[0].offsetWidth;
  var banner = document.querySelector(".jd_banner");
    for (var i =0; i < bannerFlag.children.length; i++) {
        // 添加序号
        bannerFlag.children[i].index = i;
        // 注册点击事件
        bannerFlag.children[i].onclick  = liClick;
    }
    // 点击序号切换图片，实现轮播。
    function liClick ()　{
        var Liindex = this.index;
        index = Liindex; //同步
        var ss = - Liindex * imgWidth + "px";
    //   如果为最后一张，则继续滚动到克隆的那张
    console.log(index);
      $(ul).animate({
     left: ss
     },500);
     // 同时让第一张高亮     
    //  切换高亮样式
    $(bannerFlag).children().removeClass("current");
    $(this).addClass("current");
      }
    // 自动轮播
    // 相当于设置定时器，每次点击当前页面的下一个序号
    var index = 0; //对应当前默认是第0张图片
 var timerId =  setInterval(function(){
      //  如果为克隆的那张需要将ul的style-left设为第一张，且把index替换
       if(index >= count){
         console.log(index);
         
          $(ul)[0].style.left = 0+"px";
          index = 0;
       }
      index++;
      var ss = -index * imgWidth + "px";
       if(index < count) {
      
    //   如果为最后一张，则继续滚动到克隆的那张
      $(ul).animate({
     left: ss
     },500);
     setTimeout(function(){
      $(bannerFlag).children().removeClass("current");  
     },500)
     // 同时让第一张高亮 
    //  切换高亮样式
   
  $(".jd_banner_flag li:eq("+index+")").addClass("current");
       } else if(index === count) {
         console.log(index);
         
        $(ul).animate({
          left: ss
          },500);
          setTimeout(function(){
            $(bannerFlag).children().removeClass("current");  
            $(".jd_banner_flag li:eq(0)").addClass("current");
          },500)
         
       }
     },2000);
//    无缝滚动
// 先克隆第一张图片，放到ul里面。
var coloneLi = $(".jd_banner_img li")[0].cloneNode(true);
coloneLi.index = count;

ul.appendChild(coloneLi);


    



})
