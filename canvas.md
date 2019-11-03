## canvas

HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。

画布是一个矩形区域，您可以控制其每一像素。

canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法

canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成：

- JavaScript 使用 id 来寻找 canvas 元素：

~~~
var c=document.getElementById("myCanvas");
~~~

- 然后，创建 context 对象：

~~~
var cxt=c.getContext("2d"); 
~~~

- getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

  下面的两行代码绘制一个红色的矩形：

~~~
cxt.fillStyle="#FF0000";
cxt.fillRect(0,0,150,75); 
~~~

fillStyle 方法将其染成红色，fillRect 方法规定了形状、位置和尺寸。

### 绘制图片

- drawImage() 方法在画布上绘制图像、画布或视频。

  drawImage() 方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸

- 在画布上定位图像：

~~~
context.drawImage(img,x,y);
~~~

- 在画布上定位图像，并规定图像的宽度和高度：

~~~
context.drawImage(img,x,y,width,height);
~~~

- 剪切图像，并在画布上定位被剪切的部分：

~~~
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
~~~

- 参数值

  *img*规定要使用的图像、画布或视频。

  *sx*可选。开始剪切的 x 坐标位置。

  *sy*可选。开始剪切的 y 坐标位置。

  *swidth*可选。被剪切图像的宽度。

  *sheight*可选。被剪切图像的高度。

  *x*在画布上放置图像的 x 坐标位置。

  *y*在画布上放置图像的 y 坐标位置。

  *width*可选。要使用的图像的宽度。（伸展或缩小图像）

  *height*可选。要使用的图像的高度。（伸展或缩小图像）

