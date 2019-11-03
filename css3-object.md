## **object-fit 属性**

- 这个属性决定了像img和videos这样的**替换元素**的内容应该如何使用他的宽度和高度来填充其容器。
- object-fit 具体有5个值：

fill: 中文解析“填充”。默认值。替换内容拉伸填满整个contentbox,不保证保持原有的比例。

contain: 中文解析“包含”。保持原有尺寸比例。保证替换内容尺寸一定可以在容器里面放得下。因此，此参数可能会在容器内留下空白。

cover: 中文解析“覆盖”。保持原有尺寸比例。保证替换内容尺寸一定大于容器尺寸，宽度和高度至少有一个和容器一致。因此，此参数可能会让替换内容（如图片）部分区域不可见（上面讲解的例子就是如此）。

none: 中文解析“无”。保持原有尺寸比例。同时保持替换内容原始尺寸大小。

scale-down: 中文解析“降低”。就好像依次设置了none或contain, 最终呈现的是尺寸比较小的那个

- 替换元素

其内容不受CSS视觉格式化模型控制的元素,比如img,嵌入的文档(iframe之类)或者applet,叫做替换元素。比：img元素的内容通常会被其src属性指定的图像替换掉。替换元素通常有其固有的尺寸:一个固有的宽度,一个固有的高度和一个固有的比率。比如一幅位图有固有用绝对单位指定的宽度和高度,从而也有固有的宽高比率。另一方面,其他文档也可能没有固有的尺寸,比如一个空白的html文档。

CSS渲染模型不考虑替换元素内容的渲染。这些替换元素的展现独立于CSS。object,video,textarea,input也是替换元素,audio和canvas在某些特定情形下为替换元素。使用CSS的content属性插入的对象是匿名替换元素。

## **object-position 属性**

object-position 用来控制**替换内容位置**

- 语法：object-position:x轴距离 y轴距离;

object-position属性定义时可以用像素，也可以用百分比，也可以用关键字。例如，object-position: 10px 10px 是左上角各空出10px，object-position: 100% 100%是右下角，object-position: center 是中间 和 object-position: 50% 50% 效果一样。

- 注意：1、object-position属性与background-position很相似，其取值和background-position属性取值一样，但是它的默认值是50% 50%， background-position的默认值是0% 0%
  2、如果仅指定了一个值，其他值将是50％

## 总结

这两个属性，主要是解决在布局时遇到的 尺寸 和 宽高比问题，说简单点就是处理图片会变形的问题，而object-position默认值是 50% 50% ，就是居中的意思，也可以用这两个属性来做 替换元素 的内容的水平垂直居中。

