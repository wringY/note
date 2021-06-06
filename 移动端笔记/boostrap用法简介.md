### boostrap基本使用

#### boosstrap的使用步骤

bootstrap基本使用

- 找到起步里面的基本模板

- 第二步修改基本模板里面的路

  ```
  !--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
  ```

    这个条件注释代表只在ie9或以下才将里面引入的js真正引入，如果不符合条件，他就是一段真正的注释

#### 栅格布局

布局容器

- container：这是一个响应式容器，会根据屏幕大小的不同设置不同的宽度，但是这个宽度是px固定
- container-fluid：宽百分之百

栅格系统布局就是默认将栅格系统的父容器分成12等份，然后设置栅格系统子容器，占据12等分中的几等份

写一个子容器，类名为row，如何去设置栅格系统子容器占据父容器的几等份

在row里面写几个子容器，col-xs（屏幕大小）-4（占据的份数）

- col-xs：设置栅格系统超小屏幕的等份设置
- col-sm：设置栅格系统小屏幕的等份设置
- col-md：设置栅格系统中等屏幕的等份设置
- col-lg：设置栅格系统大屏幕的等份设置


- col-xs-offset：实现的原理利用margin-left实现
- push：向右边推，实现原理是定位
- pull：向左边拉，实现原理是定位

#### 响应式工具

响应式工具不存在向上兼容的特性，因为判断范围是写死的。               

​                                                    超小屏幕                   平板                            中等屏幕                    大屏幕

| `.hidden-xs` | 隐藏   | 可见   | 可见   | 可见   |
| ------------ | ---- | ---- | ---- | ---- |
| `.hidden-sm` | 可见   | 隐藏   | 可见   | 可见   |
| `.hidden-md` | 可见   | 可见   | 隐藏   | 可见   |
| `.hidden-lg` | 可见   | 可见   | 可见   | 隐藏   |

#### 导航条组件的介绍和使用

~~~
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display：toggle模块和Brand模块在移动端得到了更好的展示 -->
    <div class="navbar-header">
    //navbar-toggle collapsed：说明在移动端会有手风琴菜单的效果
    //data-toggle="collapse"：它是一个手风琴组件
    //data-target="#bs-example-navbar-collapse-1"：说明当前手风琴菜单是控制哪一个导航条的
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      //class="sr-only"：屏幕阅读器
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
~~~

#### 轮播图组件的介绍和使用

~~~
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators 点标记-->
        <ol class="carousel-indicators">
            <!-- #carousel-example-generic：当前这个li元素控制的是哪个轮播图 -->
            <!-- data-slide-to：当前的li指向哪一个索引的图片 -->
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
          <li data-target="#carousel-example-generic" data-slide-to="3"></li>
        </ol>
      
        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <!-- 每一个item项就是一个轮播的图片内容 -->
          <div class="item active">
            <img src="./images/slide_01_2000x410.jpg" alt="...">
            <!-- carousel-caption：图片说明 -->
            <div class="carousel-caption">
              这是第一张图片
            </div>
          </div>
          <div class="item">
            <img src="./images/slide_02_2000x410.jpg" alt="...">
            <div class="carousel-caption">
              这是第二张图片
            </div>
          </div>
          ...
        </div>
      
        <!-- Controls  PC端的上一张和下一张按钮-->
        <!-- #carousel-example-generic：设置控制的是哪一个轮播图 
        data-slide="prev"：作用是上一张-->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
~~~

#### 响应式轮播图的案例

-  <!-- 分析：

  ​     移动端

  当屏幕<=768时，图片会随着屏幕的缩小自适应。

  ​    通过img宽度100%来实现（采用小图片）

  PC端

  ​      当屏幕>=768时，把图片做成背景，当屏幕变宽时，会显示更多的图片的两边区域（采用大图片）

  ​      1.backimg

  ​      2.backposition center center

  ​      3.backsize cover

  ​    -->

- 第一种方式：直接写两套标签，利用响应式工具，在移动端屏幕时PC端隐藏；在PC端时移动屏幕隐藏。

  - 缺点：因为是两套标签，所以不论是在那种屏幕下，都会请求所有图片资源，造成资源浪费。

- 第二张方式：js代码，判断当前设备的屏幕大小，然后动态的生成标签，可以避免资源请求的浪费。



### boostrap注意事项

- boostrap是基于JQ的框架，但JQ中不支持touch事件。