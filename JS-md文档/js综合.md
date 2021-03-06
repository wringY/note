## js综合
### 简单类型与复杂类型
- 简单类型又叫做基本数据类型或者值类型，复杂类型又叫做引用类型。
- 值类型：简单数据类型/基本数据类型，在存储时，变量中存储的是值本身，因此叫做值类型。
- 引用类型：复杂数据类型，在存储时，变量中存储的仅仅是地址（引用），因此叫做引用数据类型。比如js中，将简单的数据类型可以包装成复杂数据类型（string、number、boolean）。
#### 简单数据类型
1. 简单数据类型有 string、 number、 boolean、undefined 、null（指向空对象的指针） 
~~~
  var timer = null;
    console.log(typeof timer);           //返回的数据类型是 object  是历史遗留的一个bug
    //如果有一个变量，不知道将来是什么数据类型或者给什么值 
    var s = null;  //变量存在了，但不知道什么类型，什么值   //null在转换成布尔值是当作0
    console.log(undefined + 1);   //NaN
    console.log(null + 1);   //1  相当于0+1
    //1.1.简单数据类型的特点。
    //简单数据类型是存到栈里的
    //每声明一个简单数据类型，就会开辟一个相应的内存里面放的是值。
    //我们想要改变变量的值，只能重新改变内存里的值，重新赋值。
var num1 =  1;
    var num2 = num1;     
    num1 = 2;
//即使num1的值发生变化，也不会影响到num2（因为num2的值在内存里，除非重新赋值。）
~~~
#### 复杂数据类型
1.复杂数据类型   有关键字 new 的 如 Array ，Object。 复杂数据类型存放到堆里面。
~~~
//当我们把复杂数据类型赋值给一个变量（普通数据类型），其实是把复杂数据类型在堆里面的地址给了在栈里面的普通数据类型。
function stars (name,age) {
    this.name = name;
    this.age = age;
}
var sta = new stars('刘德华',18);   //stars 存放到堆里面，sta里面存放的是stars在堆里面的地址（16进制0x）。
var sta1 = sta;  //把里面的值（地址）赋值给sta1
sta1.name = '这种';  //修改的是堆里面的数据。
console.log(sta.name);   // 这种
~~~
#### 复杂数据类型与基本包装类型的区别
1. 复杂类型，就是创建一个对象实例，我们可以动态的给其添加属性，和访问属性。
2. 基本包装类型，也是创建一个对象实例，然后再立即销毁，所以我们不能动态的访问属性。
~~~
  var ss = 'sometext';
      console.log(ss.color = 'red');
      //基本包装类型创建的对象，只存在这条代码中,之后会立马用 null 销毁
      console.log(ss.color);  //undefined
//这条代码立即创建个对象，然后访问，是未定义的
~~~
### JS解析器如何解析代码
- 例如：
~~~
fn();
var  fn = function() {
    console.log('想不到吧');
}
~~~
- JavaScript代码是由浏览器中的JavaScript解析器来执行的。JavaScript解析器在运行JavaScript代码的时候，分为两步：预解析和代码执行.
- 注意：预解析分为当前作用域和子作用域
- 学习预解析能够让我们知道 为什么在变量声明之前访问变量 值是undefined 为什么在函数声明之前就可以调用函数。
1. 预解析过程
  JavaScript解析器会在全局环境下查找 var、function关键字，变量只声明不赋值，函数声明不调用。
  预解析只发生在当前作用域下
2. 预解析也叫做变量、函数提升
- 变量提升
  定义变量的时候，变量的声明会被提升到当前作用域的最上面，变量的赋值不会提升。
  例如 var i = 0 ； 作用域是全局，在解析的时候 var i 会被 提到当前作用域的最前面。
- 函数提升
  JavaScript解析器首先会把当前作用域的函数声明提前到整个作用域的最前面
3. 执行过程
  变量名和函数名相同，会先把函数名进行预解析。此外预解析不会跨script标签去解析
- 注意：
1. 在解析过程中，变量不会被赋值。
  一般来说：解析的时候先把 全局变量声明，函数声明，放到前面，然后再进入函数调用里面进行解析，整个过程不 赋值。
2. 函数表达式
  var ss = function () {}
  所以在解析时，只把变量进行提升。
#### 举例
~~~
fn();
var fn = function () {
    。。。
}
~~~
注意：在此段代码中，先是赋值再是声明函数。声明变量和声明函数用赋值操作了。所以在解析时，只把变量进行提升。
~~~
1.---------
f1();
console.log(c);  
console.log(b);
console.log(a);
function f1() {
  var a = b = c = 9;    //这里a是局部变量，b和c是全局变量。 声明多个全局变量：var a =9,b = 9,c= 9;
  console.log(a);
  console.log(b);
  console.log(c);
}
2.-------------
 var a = 15;
 function geta () {
     //不管代码是否执行，只要声明变量，就会被提升。 var a
     if (false) {    
        var a = 1;
        this.a = 2;
     }
     console.log(a);  //undefined      
 }
 geta();
~~~
#### 举例
~~~
var ss = function (){
console.log(1);
}
function ss (){
console.log(2);
}
ss(); //1
解析：
函数声明会被提升，所以 function ss (){
console.log(2);
} 在最上面，
接着因为 var  ss 与 函数 ss 相同，
所以 函数 ss 会被 变量 ss 覆盖。

alert(ss);//C函数
var ss = function() { //A
    console.log(1);
}
var ss = 123456; //B

function ss() { //C
    console.log(2);
}
alert(ss);//123456
~~~
###js如何引入到html
- 和css引入方式一样,语法：
~~~
1. <script> js</script>内部
2. 外部<script src="js.js"></script>
~~~
3. 推荐做法：把scpirt标签放到html文档的最后，</body>的前面,这样能使浏览器更块的加载。
#### script标签的可选属性
##### async
- async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他的资源或者脚本。只对外部文件有效。该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。html5支持
  注意：
~~~
<script src="...." async="async" ></script>
 <script src="...." async="async" ></script>
~~~
- 如果出现多个js文件，使用该属性则不能保证js的执行顺序，所以我们需要保证js文件互不影响。
##### type
- type：可选。默认为text/javascript
##### defer
- 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。如果缺少 src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。对动态嵌入的脚本使用 `async=false` 来达到类似的效果。
- 注意：defer属性可以让脚本在文档完全呈现后再执行。延迟的脚本总是按照指定它们的顺序执行。
##### 小结
1. 在不使用asnys和defer属性的前提下，在script标签里所有的js代码按照先后顺序执行。
2. 由于浏览器会先解析不使用asnys和defer属性的js代码，所以我们需要把js代码放到html标签的最后（这样可以保证页面上的文件异步加载，而不是js代码加载完再加载其他代码，这样会让浏览器有短暂的空白期）。
#### src属性
- src属性是外部js文件不可缺少的属性。
- src的属性值，甚至可以是其他外域文件。比如：百度等网站的js文件。
#### 外部引入的优点
1. 可维护性
2. 可缓存，浏览器能够根据具体的设置缓存链接的所有外部JavaScript文件。也就是说多个页面使用一个js文件，那么这个文件只需下载一次，提高页面加载速度。
#### noscript标签
如何让不支持js的浏览器平稳退化，我们可以使用\<noscript>\</noscript>标签。
当用户的浏览器不支持js时，该标签里面的内容显示，这时候为了保证网页的基本内容需要备用代码。
~~~

<body>
    <noscript>
        <p>本页面需要浏览器支持（启用）JS</p>
    </noscript>
</body>
当用户浏览器不支持js时，我们向用户显示一个信息。
~~~
### 浏览器对js和html的不同待遇
- 浏览器对JS非常严格，如果js代码不符合规范，那么浏览器拒绝执行并报错。
- 浏览器碰到不符合规范的html时，会千方百计地呈现出来。
### 调试工具的使用
调试错误的 步骤：
- 1.先到 console 控制台 tab 页 去看 是不是 有 报错！（JS语法错误）
- 2.如果 没有语法错误，就应该 source  资源 tab页 去页面js代码中设置断点，并 f11 逐句调试。
### JS中内存的问题
#### 栈（基本类型和变量）
- 这种乒乓球的存放方式与栈中存取数据的方式如出一辙。处于盒子中最顶层的乒乓球5，它一定是最后被放进去，但可以最先被使用。而我们想要使用底层的乒乓球1，就必须将上面的4个乒乓球取出来，让乒乓球1处于盒子顶层。这就是**栈空间先进后出，后进先出**的特点。图中已经详细的表明了栈空间的存储原理。

#### 堆（stack）（引用类型）
- 堆存取数据的方式，不存在先进后进的区别，与书架与书非常相似。
- 书虽然也整齐的存放在书架上，但是我们只要知道书的名字，我们就可以很方便的取出我们想要的书，而不用像从乒乓球盒子里取乒乓一样，非得将上面的所有乒乓球拿出来才能取到中间的某一个乒乓球。好比在JSON格式的数据中，我们存储的key-value是可以无序的，因为顺序的不同并不影响我们的使用，我们只需要关心书的名字。
#### 队列
- 队列是一种先进先出的结构。
  - 队列也是一种表结构，不同的是队列只能在队尾插入元素，在队首删除元素，可以将队列想象成一个在超时等待排队付钱的队伍，或者在银行拿的号子，排在前面的人拥有优先服务权。队列是一种FIFO(First In First Out)。队列用在很多地方，比如提交操作系统执行一系列的进程，打印任务池等，一些仿真系统使用队列来模拟银行或者超时里排队的顾客。
- 队列允许的操作：
1. 它只允许在表的前端（front）进行删除操作
2. 在表的后端（rear）进行插入操作
### json
#### JSON对象转JSON字符串 JSON.stringify(jsonObject);
##### 优雅的输出格式
JSON.stringify() 方法的可选参数space，可以指定缩进用的空白字符串，用于美化输出（pretty-print）space参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数没有提供（或者为null）将没有空格。
~~~
// replacer 分隔符 space 缩进
JSON.stringify(value[, replacer [, space]])

var  formatJsonStr=JSON.stringify(jsonObject,undefined, 2);
~~~
#### JSON字符串转JSON对象  JSON.parse(jsonstr)
- 比较常用的工作场景--json字符串的替换。利用js中字符串对象的方法，和正则表达式结合。
