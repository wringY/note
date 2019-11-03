####什么是html5

1.H5并不是新的语言，而是html语言的第五次重大修改--版本

2.支持：所有的主流浏览器都支持h5.（chrome,firefox,safari。。。）。IE9及以上支持h5(有选择的支持，并不会全部支持),但是ie8及以下不支持h5.

3.改变了用户与文档的交互方式：多媒体：video  audio canvas

4.增加了其它的新特性：语义特性，本地存储特性，网页多媒体，以及动画

5.相对于h4:
	1.进步：抛弃了一些不合理不常用的标记和属性
	2.新增了一些标记和属性--表单
	3.从代码角度而言，h5的网页结构代码更简洁。
#### 什么是语义化标签

语义化标签：很直观的清楚这个标签的作用

+ header: 页眉 头部
+ nav：导航
+ main：主体内容
+ article：文章
+ aside：侧边栏
+ footer：页脚，底部

#### 语义标签兼容处理

ie9 及以下:   变成行内元素，手动变成块元素

ie8以下：根本不识别html5,手动创建html5标签或者引入html5shiv.min.js

#### 表单新增的type属性	 

+ email：对邮箱可以进行验证
+ tel：不会进行验证，会在手机端会切换成数字键盘
+ url：会对输入的网址进行验证，网站必需带http前缀
+ number：可以进行数字的输入，不是数字类型无法输入，并且带有初始值、最大值、最小值。
+ search：会携带清除的X
+ range：范围限制的拉动杆，并且带有初始值、最大值、最小值。
+ color: 颜色的选择
+ time: 时分的选择
+ date：年月日的选择
+ datetime-local：年月日时分的完整时间选择
+ month：年份和月份的选择
+ week: 最终显示的格式为周，年份和周的选择。

#### 表单新增的属性

+ placeholder：默认占位符，当输入文本的时候，会自动将默认的占位清除
+ autofocus：自动获取焦点
+ autocomplete：会有提示之前填过的内容，前提条件：1.必须提交过，必须要有name属性
+ required：为必填项，输入框不能为空，如果为空，会有提示
+ pattern：正则表达式验证
+ multiple：如果input类型为file，提交多个文件，如果类型email，可以输入多个邮箱，以逗号分开
+ form：值为form表单的id名，可以把当前的input控件关联到指定ID名的form表单，提交的时候会一起提交

#### 表单新增事件

+ oninput：只要内容发生变化，即触发事件

+ onchange： 当内容改变，且**失去焦点**时触发事件。

+ onkeyup：键盘弹起时触发

+ oninvalid：代表当前输入框验证没有通过即可触发

  setCustomValidity：修改默认的提示内容，是一个方法

#### 媒体标签

audio：播放音频文件的

+ src：音频文件的地址
+ controls：控制面板
+ autoplay：自动播放
+ loop：循环播放
+ muted：静音

video

+ src：视频的文件地址
+ controls：控制面板
+ autoplay：自动播放
+ muted：静音
+ loop：循环播放
+ poster：定义视频封面图，如果不设置，视频画面的第一帧
+ width：视频的width
+ height：视频height
+ 设置视频宽高时的问题：视频是需要等比例缩放的，如果我们不清楚视频的比例，而设置 宽 和 高 时，会变成设置视频所占区域的大小，并不是视频本身的大小
+ 解决视频宽高的方法：简单方式：设宽、高中任意一项，会自动等比例缩放 
+ 其他方式1：其他方式：查看videoHeight 和 videoWidth ,计算比例，进行设置 。
+ 其他发生2：object-fit语法。
+ source标签：可以设置多个资源文件，浏览器在加载的时候，从上到下加载，如果不支持该文件类型，继续加载，一直到找到兼容该浏览器的资源文件

#### DOM 获取元素

+ querySelector：该方法可以传递任何选择器，但是只会查抄到满足条件的第一个
+ querySelectorAll：该方法可以传递任何选择器。会查找到满足条件的所有的元素，最终返回的是伪数组，如果想设置样式，遍历该数组，拿到每一个元素，设置样式即可

#### 类名的操作

所有关于类样式操作的都在classList，classList属于dom元素上的，有以下几个方法。

+ add：为当前元素添加类名，如果想添加多个用逗号进行分隔。
+ remove：移除类名，如果移除多个用逗号分隔。
+ toggle：进行类名的切换，参数只有一个，有删除，没有添加 。
+ contains：判断是否包含某一个类名，只有一个参数，如果包含，返回true，不包含返回false

#### DOM 自定义属性

+ 如何自定义一个属性？

  凡是以data-开头的都是一个自定义属性

+ 如何获取自定义属性的值？

  所有的自定义属性都在dom元素下面的dataset里面以属性的形式进行存储

+ 如何修改自定义属性？

  给dataset里面对应的属性重新赋值，即修改完成


~~~
<!-- 如何添加自定义属性：data- 开头， 后面每个需要分隔地方以 - 进行分隔 -->
    <div data-contry-province="中国" id="box"></div>
    <script>
    // 如何获取自定义属性的值：
    // 自定义属性都在DOM元素的dataset属性（是个对象）中，它显示在标签内部，以键值对的形式保存着，它的原型DOMStringMap.
      console.log(document.getElementById('box').dataset.contryProvince);
    //   修改
    document.getElementById('box').dataset.contryProvince = '美国';
    console.log(document.getElementById('box').dataset.contryProvince);
    
    // 我们可以通过DOM.property 的方法，自定义属性，自定义属性的值可以是对象类型。
    document.getElementById('box').index  = {name:'黑麻麻',age:21};
    console.dir(document.getElementById('box'));
    console.log(document.getElementById('box').index);

    // 还可以通过DOM的attribute 的方法，创建自定义属性并赋值。
    // 注意这种方法不是写在：DOM元素的属性中，而是写在标签中，并且我们无法以对象的形式调用属性。
    document.getElementById('box').setAttribute("log",{dogName: "小明明",age: 3});
    console.dir(document.getElementById('box'));
    console.log(document.getElementById('box').getAttribute('log'));
~~~

