window.onload = function () {
    // 到计时案例
    backTime();
    document.onscroll = function () {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var bannerHight = document.querySelector(".jd_banner").offsetHeight;
        var opacity = scrollTop / bannerHight;
        if (scrollTop < bannerHight) {
            document.querySelector(".jd_search_arra").style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        }


    }
    // 修改html结构
    bannerFrame();



    // 到计时案函数
    function backTime() {
        var endtime = 3700;
        var timerId = setInterval(function () {
            endtime--;
            if (endtime < 0) {
                clearInterval(timerId);
                return;
            }
            var hours = Math.floor(endtime / 3600);
            var munites = Math.floor(endtime % 3600 / 60);
            var seconds = Math.floor(endtime % 60);
            document.querySelectorAll(".jd_sk_countTime")[0].innerHTML = Math.floor(hours / 10);
            document.querySelectorAll(".jd_sk_countTime")[1].innerHTML = Math.floor(hours % 10);
            document.querySelectorAll(".jd_sk_countTime")[3].innerHTML = Math.floor(munites / 10);
            document.querySelectorAll(".jd_sk_countTime")[4].innerHTML = Math.floor(munites % 10);
            document.querySelectorAll(".jd_sk_countTime")[6].innerHTML = Math.floor(seconds / 10);
            document.querySelectorAll(".jd_sk_countTime")[7].innerHTML = Math.floor(seconds % 10);

        }, 1000);
    }




    function bannerFrame() {
        // 获得图片大小
        var banner = document.querySelector(".jd_banner");
        var ul = document.querySelector(".jd_banner_img");
        var index = 1;
        // 获得序号
        var flags = document.querySelector(".jd_banner_flag");
        // 获得第一张和最后一张图片
        var firstImg = ul.querySelector("li:first-of-type");
        var lastImg = ul.querySelector("li:last-of-type");
        // 把图片插入到ul里面
        ul.insertBefore(lastImg.cloneNode(true), firstImg);
        ul.appendChild(firstImg.cloneNode(true));
        // 动态根据ul里面的个数修改ul的宽度 
        var bannerWidth = banner.offsetWidth;
        var ulWidth = ul.childElementCount * bannerWidth + "px";
        ul.style.width = ulWidth;
        for (var i = 0; i < ul.childElementCount; i++) {
            ul.children[i].style.width = bannerWidth + "px";
        }
        ul.style.left = -bannerWidth + "px";

        window.onresize = function () {
            // 动态根据ul里面的个数修改ul的宽度 
            bannerWidth = banner.offsetWidth;
            ulWidth = ul.childElementCount * bannerWidth + "px";
            ul.style.width = ulWidth;
            //  修改图片的宽度
            for (var i = 0; i < ul.childElementCount; i++) {
                ul.children[i].style.width = bannerWidth + "px";
            }
            ul.style.left = -index * bannerWidth + "px";


        }
        // 自动轮播
        var timerId;
        function autoSwitch() {
            timerId = setInterval(function () {
                index++;
                // 添加过渡过渡效果
                ul.style.transition = "left 0.5s ease";
                ul.style.left = -index * bannerWidth + "px";
                // 给相应序号的高亮
                $(flags).children().removeClass("current");
                $(flags.children[index - 1]).addClass("current");
                // 
                // 如果为最后一张index为9，需要瞬间移动到index为1的那张
                // html在执行CSS过渡时，并不影响js代码的执行，为了避免在执行过渡的时候，js代码又对过渡样式进行操作出现错乱，认为添加延时。
                if (index === ul.childElementCount - 1) {
                    index = 1;
                    $(flags.children[index - 1]).addClass("current");
                    setTimeout(function () {
                        // 清除过渡样式，瞬间移动到index为1的那张
                        ul.style.transition = "none";
                        ul.style.left = -index * bannerWidth + "px";
                    }, 500);
                }

            }, 2000);
        }
        autoSwitch();


        // 手动轮播
        var startX, moveX, distanceX;
        ul.addEventListener("touchstart", function (e) {
            // 清除定时器
            clearInterval(timerId);
            startX = e.targetTouches[0].clientX;
        }, { passive: true });
        ul.addEventListener("touchmove", function (e) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            // 因为ul有一个过渡效果，left需要花费0.5s的时间，我们手动拖拽也会引发过渡效果，外在的表现形式为：手指滑动改变left，当手指滑动结束时left会以过渡的形式继续移动一段时间。
            ul.style.transition = "none";
            ul.style.left = -index * bannerWidth + distanceX + "px";
        }, { passive: true });

        ul.addEventListener("touchend", function (e) {    
            // 判断手动拖动的距离，如果大于100px，那么滚动到下一张，否则回弹到第上一张。
            if (Math.abs(distanceX) > 100) {
                //   判断方向,大于0上一张
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                ul.style.transition = "left 0.5s ease";
                ul.style.left = -index * bannerWidth  + "px";
                // 让当前序号高亮显示
                $(flags).children().removeClass("current");
                $(flags.children[index - 1]).addClass("current");
                // 
            } else if (Math.abs(distanceX) > 0) {
                // 确保用户有进行滑动操作，回弹
                ul.style.transition = "left 0.5s ease";
                ul.style.left = -index * bannerWidth + "px";
            }
            // 当手指离开屏幕时，重新开启定时器
            autoSwitch();
        });
    // 给ul添加webkitTransitionEnd,过渡效果执行完毕后执行
    // ul.addEventListener("webkitTransition");













    }











}