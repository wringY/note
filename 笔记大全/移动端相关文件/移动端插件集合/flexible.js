// 封装自执行函数
(function flexible(window, document) {
    // 获取根元素 html
    var docEl = document.documentElement
    // window.devicePixelRatio 
    // 设备物理像素(px)和设备独立像素(dp)的比例,
    // 如果没有那么就取1，即1dp等于1px
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    // 调整字体大小
    function setBodyFontSize() {
        if (document.body) {
            // 把字体大小设置为12 dp 。
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    //   设计图是 750px 推荐改成 7.5
    //   设计图如果是640px  推荐改成  6.4
    function setRemUnit() {
        // 获取当前屏幕的宽度，除以7.5,是把设计图分为7.5份（7.5个rem），这个rem在当前设计图对应的100px像素。
        // 我们可以自己定义要分割的份数，但是最好保证当前rem对应的px为整数。
        var rem = docEl.clientWidth / 7.5
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    // 在屏幕大小发生变化时，即我们在模拟器上进行拖拽时，重新调用设置rem的函数
    window.addEventListener('resize', setRemUnit)
    // 在网页重新加载，指从浏览器缓存中获取页面，经常用于前进和后退场合。
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    // 查明0.5px的支持
    // 如果dp>=2,1dp >= 1 px,此时重新生成body，div
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            // 这个class类名在哪啊？
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))