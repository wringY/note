写代码：

第一步：我们要做什么事情

第二步：这件事情应该在什么时候去做

#### 网络接口

+ ononline：网络连通时触发
+ onoffline：网络断开时触发

#### 全屏接口

+ requestFullScreen： 

  在div这个 DOM元素的原型对象：HTMLDivElement的原型对象：HTMLElement 的原型对象：Element 中，有一个requestFullScreen。

    除此之外还有：cancelFullScreen  和 fullScreenElement 。

  ~~~
  // 封装请求全屏兼容性函数
      function fitAllRequestFullScreen (element) {
          if (element.requestFullScreen) {
              element.requestFullScreen();
          } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.msRequestFullScreen) {
              element.msRequestFullScreen();
          }
      }
  ~~~

  ​

+ cancelFullScreen：取消全屏，**这个方法只属于 document对象**。

  ~~~
   // 封装退出全屏兼容性函数
      function exitFullScreen (element) {
          if (element.cancelFullScreen) {
              console.log(1);
              element.cancelFullScreen();
          } else if (element.webkitCancelFullScreen) {
              console.log(1);
              element.webkitCancelFullScreen();
          } else if (element.mozCancelFullScreen) {
              console.log(1);
              element.mozCancelFullScreen();
          } else if (element.msCancelFullScreen) {
              console.log(1);
              element.msCancelFullScreen();
          } else if (element.exitFullscreen) {
              element.exitFullscreen()
          }
      }
  ~~~

  ​

+ fullscreenElement：获取全屏元素，如果有全屏元素可以拿到全屏的元素，如果没有返回的就是null，**这个方法属于 document对象，且能获取一个**。

  这个方法的格式很奇葩：语法格式：fullscreenElement，里面的s不大写。

  该方法只有**添加火狐前缀moz 后面的格式才符合驼峰命名法**（mozFullScreenElement），其他情况下f可能大写，但是s没有大写的可能。

  ~~~
   // 封装获取全屏元素兼容性函数   
      // 注意这个方法很奇葩： 语法格式：fullscreenElement，里面的s不大写
      function getFullScreenElement (element) {
          var fullscreenElement = null;
        if (element.fullscreenElement){
          fullscreenElement = element.fullscreenElement;
        } else if (element.webkitFullscreenElement) {  // webkit 加了后缀s还是不大写
          fullscreenElement = element.webkitFullscreenElement;
        } else if (element.mozFullScreenElement) {  //火狐里面 s 大写  emm......
          fullscreenElemen = element.mozFullScreenElement;
        } else if (element.msFullscreenElement) {     // IE 里面 s 不大写
          fullscreenElement =  element.msFullscreenElement;
        }
        return fullscreenElement;
      }
  ~~~

  通过不同的前缀来解决兼容问题

  **这些方法都有兼容性问题**：在chrome （因为blink是webkit的二次封装）中需要加前缀webkit ； 在firefox 需要加前缀 moz ；在IE中需要加 ms. 

    注意这些**前缀都是小写**。

  **格式问题**：如果加了前缀那么request的r 需要大写R。

#### FileReader异步读取文件、readFileSync同步读取文件
##### 禁止读取磁盘地址
- 谷歌浏览器禁止直接访问磁盘文件
  举例：
   input 表单flie控件的 value 属性是 C:\fakepath\l1.jpg，很奇怪的东西，是磁盘上的路径，而谷歌浏览器禁止直接访问磁盘文件
  var fileValue = this.value;
  console.log(fileValue);
  document.getElementById('img').src = fileValue;
  报错信息：
   Not allowed to load local resource: 
##### 异步读取文件和同步读取文件的差异
- 结论 ：异步读取文件时由**操作系统在后台读取**，不会阻碍下面代码的执行；同步读取时会阻碍下面代码的执行。
##### files属性简介
 - files属性介绍：表单控件还有一个 files 的属性, 里面存储了 **伪数组FlieList**。
 - files属性可以是来自用户在一个**input元素**上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。/ 此特性在 Web Worker 中可用。 每一个File对象，提供了三个属性：
    1. type属性，保存了文件的类型，**是文件的 MIME类型，并且是一个只读属性**，当类型不确定是为"";
    2. name属性,文件名称，只读字符串。只包含文件名称，不包含任何路径信息。
    3. size属性，文件大小，按字节数(bytes)计算，只读的64位整数。
- FileList对象介绍：FileList 对象由DOM提供，列出了所有用户选择的文件，每一个代表了一个 File 对象。可以通过检查文件列表的**length属性**决定用户可以选则多少文件。
##### FileReader对象简介 
- 允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
- FileReader 就是一个构造函数，我们先查看一下
     FileReader是一个构造函数，我们可以实例化一个FileReader对象
    var reader = new FileReader;
    console.dir(reader);
     主要查看属性 和 方法
     方法：参数是伪数组FlieList里面的File对象。
     1.readSAsText()  读取txt文件,只要可以用txt打开的文件都可以。
     2.readAsBinaryString()  读取任何形式的文件，并返回2进制形式的字符串。
     3.readAsDataURl() 这个方法url资源读取到的文件会获取到data开头的一段字符串。
     4.abort() 中止读取
     属性：
     1.readState 读取文件的状态
     2.result 读取文件的结果。
     事件》》在实例的原型上  对应的还有几个属性》》在实例本身
     1.onload  当成功读取文件后触发  对应的属性在 实例上 onload 默认是null
     2.onabort 当文件读取中止是触发  对应的属性在 实例上 onabort 默认是null
     3.onloadend 当文件读取完毕（此时读取不一定成功）时触发  对应的属性在 实例上 onloadend 默认值是 null
     4.onloadstart 当文件开始读取时触发 对应的属性在 实例上 onloadstart 默认值是 null
     5.onprogress 当文件在读取过程中触发 对应的属性在 实例上 onprogress 默认值是 null
- abort()方法：该方法可以取消 FileReader 的读取操作，触发之后**readyState 为已完成(DONE)**
- readSAsText(): 该方法可以将 Blob 或者 File 对象转根据特殊的编码格式转化为内容(字符串形式)。
  这个方法是异步的，也就是说，只有当执行完成后才能够查看到结果，如果直接查看是无结果的，并返回undefined
  也就是说必须要挂载 实例下的 onload 或 onloadend 的方法处理转化后的结果。
  当转化完成后， readyState 这个参数就会转换 为 done 即完成态， event("loadend") 挂载的事件会被触发，并可以通过事件返回的形参得到中的 FileReader.result 属性得到转化后的结果。
   **语法**：instance of FileReader.readAsText(blob[, encoding]);
   **参数**：二进制对象Blob类型 或 File类型，编码类型 (可选)传入一个字符串类型的编码类型，如缺省，则默认为“utf-8”类型.
 - readAsBinaryString(): **该特性是非标准的，请尽量不要在生产环境中使用它！从 2012 年 7 月 12 日起，该方法已从 W3C 工作草案废除。**
    readAsBinaryString 方法会读取指定的 Blob 或 File 对象，当读取完成的时候，readyState  会变成DONE（已完成），并触发 loadend 事件，同时 result 属性将包含所读取文件原始二进制格式。
     **语法**：instanceOfFileReader.readAsBinaryString(blob);
     **参数**：blob，即将被读取的 Blob 或者 File 对象。
 - readAsDataURL(): 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
     **语法**:instanceOfFileReader.readAsDataURL(blob);
       **参数**:即将被读取的 Blob 或 File 对象。
#####readFileSync对象简介：
FileReaderSync接口允许以同步的方式读取File或Blob对象中的内容。
**该接口只在workers里可用,因为在主线程里进行同步I/O操作可能会阻塞用户界面**
- 注意：**该对象只有方法，没有属性**。且**方法与 FileReader 对象的方法相同**。
#### 百度地图使用

1. 找到你想要的效果，复制代码
2. 申请秘钥，并且使用秘钥
3. 开发文档》工具支持》坐标拾取器
4. 利用百度工具生成地图名片

#### sessionStorage（会话存储）和localStorage（本地存储）的使用

   sessionStorage 是window对象中的属性，window.sessionStorage.

  把数据以键值对的形式，保存到 webstorage 中。

- 特性:内容只有5M ,里面的数据生命周期 是关闭当前页面 或者关闭浏览器。
- 里面的数据只有当前页面可以访问。

 该属性有几个方法：

sessionStorage作用：将数据保存到本地，存储的容量5mb左右

sessionStorage.setItem():向本地存储数据，第一个参数：key（name）通常是我们自定义有明显语义的字符串，第二个参数：value（值）

sessionStorage.getItem():获取本地sessionStorage的数据，参数为key

sessionStorage.removeItem()：移除本地sessionStorage的某一个数据，参数为key

sessionStorage.clear(): 清除保存的所有数据.

localStorage的特性：

localStorage.setItem,localStorage.getItem,localStorage.removeItem,loaclStorage.clear用法和sessionStorage一模一样

+ 存储的内容大概20mb
+ 但是在同一个浏览器的不同窗口中可以共享数据
+ 永久存储，只有卸载浏览器或者手动清除浏览器缓存才能清除

  在开发中，使用localStorage更多一些

#### 播放器案例

 Html5中video元素，提供了一系列的整套模型，供开发者去自定义视频播放的一系列事情。

​    注意：这些属性和方法都是DOM元素中的，不能使用JQ元素去调用。

​     1.方法：play()播放、pause()暂停

​     2.属性：currentTime 视频播放的当前时间，单位是S

​                   duration：视频的总时间单位是S

​                    paused ：判断当前视频是否处于暂停状态，返回布尔值。

​     3.事件：

​                  oncanplay: 表示当前视频加载完成时触发。

​                  ontimeupdate: 表示视频的的时间发生变化，就会祝福

​                  onended: 视频播放完毕时触发

1.   准备工作：因为我们要大量操作video，我们可以在全局声明一个变量，来存储video元素

```
var video = $('video')[0]
```

+ 播放和暂停功能

  1. 给暂停播放按钮注册点击事件 

  2. 在事件函数内部写逻辑：判断，如果当前状态为暂停，那么就播放，如果当前状态为播放，那么就暂停

  3. video.paused 判断当前状态是否为暂停  是暂停  true   播放状态  false

     ```
     if(video.paused){
     	video.play();
         /*移除暂停样式，添加播放样式*/
     }
     else{
     	video.pause();
         /*移除播放样式，添加暂停样式*/
     }
     ```

  4. toggleClass("fa-play fa-pause")；进行类名的切换

+ 全屏功能

  1. 利用$拿到全屏按钮，给注册点击事件

  2. 在事件函数内部：video.requestFullScreen该方法可以让视频全屏，有兼容性，加前缀

     ```
     if(video.requestFullScreen){
         video.requestFullScreen();
     }
     else if(video.webkitRequestFullScreen){
         video.webkitRequestFullScreen();
     }
     else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();
     }
     else if(video.msRequestFullscreen){
         video.msRequestFullscreen();
     }
     ```

     ​

+ 视频显示和总时长处理

  视频什么时候可以显示？

  ```
  video.oncanplay = function(){
    // 视频显示
    video.style.display="block";
  }
  ```

  怎么拿到视频的总时长？

  ```
  var total = video.duration   //  3680
  ```

  1. 问题：首先秒数，并且还有小数

  2. 格式化时分秒

     ```
     var hour = Math.floor(total/3600);
     hour = hour<10? '0'+hour:hour

     var minute = Math.floor(total%3600/60)
     minute=minute<10?"0"+minute:minute;

     var second=Math.floor(total%60);
     second=second<10?"0"+second:second;

     var str = hour+':'+minute+':'+'second'
     $('.totalTime').html(str)

     ```

     ​

+ 播放时，时间跟随变化，进度条跟随变化

  1. 视频播放的时候设置 时间跟随变化

     ontimeupdate：时间发生变化会触发

     在ontimeupdate事件函数中拿到当前的时间currentTime ，将当前时间格式化成时分秒

     ```
     video.ontimeupdate = function(){
       var current = video.currentTime 
       var result = time(current)   //  00:00:01
       $('.currentTime').html(result)
     }
     ```

     封装格式化时分秒的函数

     ```

     function time(total){
       var hour = Math.floor(total/3600);
       hour = hour<10? '0'+hour:hour

       var minute = Math.floor(total%3600/60)
       minute=minute<10?"0"+minute:minute;

       var second=Math.floor(total%60);
       second=second<10?"0"+second:second;
       return hour+':'+minute+':'+second
     }

     ```

  2. 让进度条跟随变化，其实就是视频播放的时候设置进度条的当前进度，实际进度条的进度=视频的当前播放进度

     求：视频的当前播放进度    =  当前视频播放的时间/视频总时间

     ​                  var  percent =         video.currentTime/video.duration

     将进度转化为百分比 percent  = percent *100+‘%’

     最终将得到的百分比设置给进度条的宽度

     ```
     $(".elapse").css("width",percent);
     ```

     ​

+ 实现视频的跳播和播放之后的设置




http://getcrx.cn/#/










