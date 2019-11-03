##语法
### 语句
- 单独一行语句不用加分号，多行语句在一行需要用分号隔开，推荐：每条语句末尾加上一个分号。
- 语句是基本单位。
#### lable语句
lable 语句就是跳转的意思，经常和break、continue语句搭配使用。
语法如下：
ss：
ttt : 
lable名自己定义。
#### break语句和continue语句
- break语句和continute语句.
- 举一个比较典型的例子，看完后即明白 Label 的应用：（未添加 Label）
~~~
var num = 0;
for (var i = 0 ; i < 10 ; i++){
     for (var j = 0 ; j < 10 ; j++){
          if( i == 5 && j == 5 ){
                break;
          }
     num++;
     }
}
alert(num); // 循环在 i 为5，j 为5的时候跳出 j循环，但会继续执行 i 循环，输出 95
~~~
- 对比使用了 Label 之后的程序：（添加 Label 后）
~~~
var num = 0;
outPoint:
for (var i = 0 ; i < 10 ; i++){
     for (var j = 0 ; j < 10 ; j++){
          if( i == 5 && j == 5 ){
                break outPoint;
          }
     num++;
     }
}
~~~
- alert(num); // 循环在 i 为5，j 为5的时候跳出双循环，返回到outPoint层继续执行，输出 55
- 对比使用了break、continue语句：
- 从alert(num)的值可以看出，continue outPoint;语句的作用是跳出当前循环，并跳转到outPoint（标签）下的for循环继续执行
#### try、catch、throw语句
- try:测试代码块的错误
- catch: 语句错误处理
- throw: 创建并跑出错误
- 语法：
~~~
try {

//这这里运行代码，抛出错误
}
catch (err){
//处理错误
}
~~~
- 例子
~~~html
<input type="text" id="demo">
<input type="button" value="测试" id="btn">
<p id="mess" ></p>
<script>
var btn = document.getElementById('btn');
btn.addEventListener('click', test, false);
    function test () {
        try {
            //这里面运行代码并抛出错误
            var x = document.getElementById('demo').value; //取得元素的值
            if (x == '')  throw '值为空';
            if (isNaN(x))  throw '非数字';
            if (x > 10)  throw '数值过大';
            if (x < 10) throw '数值过小';
        } catch(err) {
            var mess = document.getElementById('mess');
            mess.innerText = '错误'+err+'。';
        }
    }
~~~
### 变量
1. 使用变量不需要声明，可以直接赋值。
- 语法规范：mood = "happy";推荐做法: 还是声明变量，在使用。
- 可以:一次声明多个变量: var mood, age; 可以声明多个变量并同时赋值 var mood=''happy'', age=33;
- 注意：
1. 变量与其他语法元素的名字都是区分字母大小写的。
2. 变量名不能包含空格，或标点符号（美元符号$例外）。
3. 变量名可以包含字母、数字、美元符号和下划线（但是第一个字符不能是数字）。
4. 当变量名过长时，为了方便阅读可以加下划线，另一种做法是：驼峰格式。
5. 驼峰格式是函数名、方法名、对象属性名命名的首选格式，语法 var myMood=“happy”，第二个单词首字母大写。
### 常量
- 使用const 声明一个常量，常量不允许修改,声明一个常量的同时必须初始化。
### 数据类型
- 字符串、数值、和布尔值都是标量。它们在任意时刻只能有一个值。
- 简单型;undefined、null、boolean、number、string
  复杂型;object.
- 注意：我们创建的自定义对象就是Object类型。new Object ，包括构造函数。
- 注意：保存浮点数的内存是整数的2倍，所以ECMA会不失时机的将浮点数转为整数（小数点后面没有跟数字，或者小数点后面的数字是0）.
#### 字符串
- 字符串由零个或多个字符构成。
1. 字符可以包括(不限于)字母、数字、标点符号、和空格。
2. 字符串包含着引号里，单双引号都可以。
3. 如果字符串包含双引号，最好用单引号将其包起来，反之亦然。
4. 如果双引号中包含的字符中有双引号则需要使用转义字符\，单引号亦然。
##### 字符串转义字符
字面量             含义
\n					换行符（重要）      newline
\ \					斜杠 \
\'					单引号 '
\"					双引号 "
\t					Tab
\b					空格   blank
\r					回车符
- 注意: n 和 \r 都起到换行的作用，但平时用 \n 比较合适。因为 \n 是 windows/mac/ninux 都支持，\r 只有 windows 支持。
##### 字符串长度
- length属性。length属性是可写的。
##### 字符串的拼接
- 注意：当变量和字符串拼接时，千万不要把变量名括在引号里面，这样变量名就相当于普通的字符了。
  例如：
  var age= 12；
  alert（“岁数”+age）
  显示：岁数12
  错误示例：
  var age = 12;
  alert("岁数+age")；
  显示;岁数age
#### 数值
##### 实数和负数
八进制数前面加0；（如果字面中的数值超出范围，那么前导0将被忽略，当作10进制）
var ss =080;  //十进制的8.
在ECMA5中已经废弃
注意：在严格模式下，字面量的8八进制数是错误的。
Octal literals are not allowed in strict mode.
十六进制数前面加0x；后面跟任何16进制（0~f）,其中字母可大写可小写。
- 注意：在进行算术计算时，都会转换成10进制。
- js中可以保存正0（+0）和负0（-0），正0和负0会被认为相等。
##### 浮点数的精度问题
- 浮点数值的最高精度是 17 位小数，但在进行算术计算时其精确度远远不如整数。
  如：0.1+0.2 =0.30000000000000004;
  这是IEEE754数值规范的通病。
- 注意：不要直接判断两个浮点数是否相等！
- 浮点数用科学计数法表示：
  3.125e7 ==3.125*10的7次方。
##### 数值范围
- JavaScript中 数值的最大和最小值：
- 最大值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308
- 最小值：Number.MIN_VALUE，这个值为：5e-324
- 语法：
  alert(Number.MAX_VALUE); // 1.7976931348623157e+308
  alert(Number.MIN_VALUE); // 5e-324
##### 三个特殊数值
- 无穷大：Infinity ，代表无穷大，大于任何数值。任何正值乘以 Infinity 为 Infinity
- 任何数值（除了Infinity 和 -Infinity）除以  Infinity 为 0。
- 可以用isFinite()函数判断是否为有限的（有限true，无限false），finite有限的。
- 可以用下面的代码得到正负无穷大。
  console.log(Number.NEGATIVE_INFINITY); negative 负的意思。
  console.log(Number.POSITIVE_INFINITY); positive 正的意思。
- 无穷小：-Infinity ，代表无穷小，小于任何数值
- 非数值：NaN ，Not a Number，代表一个非数值
###### 详解NaN
- 表示本来要返回数值的操作数未返回数值得情况。在ECMA-262中，任何数值除以0都会得NaN，
- 但是在ECMA5中，任何数值除以0都会得到无穷大，除以+0正无穷，-0负无穷。
##### isNaN(X)方法
- 用来判断一个变量是否为非数值 的类型，NaN就代表非数值。isNaN(X) 判断x的是否为非数值，非数值true，数值false.
- 注意：即使变量的值如果是双引号包住的数字，也会被认为是数字。
  var ss = '123';
  console.log(isNaN(ss));   //false
  console.log(isNaN(true)); //false
- NaN不等于任何值，包括NaN本身.
#### 布尔值（boolean）
- true 和 false
##### 布尔类型的隐式转换
- if 语句会把 一些值 隐式转换 成 布尔类型，如：
  if('哈哈' && 12 ){
    console.log('非空字符串  非0数字 会被自动转成 true');
  }
  // 可以 看成 下面的代码
  if(true && true ){
    console.log('非空字符串  非0数字 会被自动转成 true');
  }
- 注意：
- true：   非空字符串  非0数字  true 任何对象
- false：  空字符串  0  false  null  undefined NaN
#### 数组
- 声明数组：Array。
- 填充数组：需要给出下标（index），Array[index]
- 注意;下标从0开始。
- 数组的元素可以是任何数据类型的混合（字符串、数值、布尔值、变量、数组）。
  语法：var beatles =[。。。。。] 方括号 或者var beatles =new Array（）
##### 传统数组
- 如果在填充数组时，只给出的元素的值，这个数组中的元素下标将自动创建和刷新。
##### 关联数组
- 可以在填充数组时，为每个新元素明确低给出下标来改变这种默认的行为。为新元素给出下标时，不必局限于整数数字，可以用字符串。这样的数组叫关联数组。
  - 使用字符串代替数字下标，使代码更具可读性。
- 但是不推荐：在js中，每个变量都是某种类型的对象。如数组就是一个Array对象，使用字符串下标就相当于给Array对象添加了属性，我们不应该修改原有对象的属性，而应该使用通用的对象。
- 例如： array['name'] 给数组添加字符串下标，就相当于给Array对象添加了新的属性。
- 数组的属性有 length。调用方法：Array.length
##### 给数组扩容
- 如果一个数组，给定长度。我们可以通过给数组添加新下标方法来达到扩容的目的。
  例如：
      var mm = [12,22,33];
      mm[4];
      alert(mm[3]);
  未赋值的数组元素为未定义。
##### 数组sort方法的比较函数
1.当用于比较字符串和数组时，比较函数格式如下：
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

#### 数据类型转化
- 我们前面说过，表单获取过来的数据默认是字符型，我们需要转换为数值型。
##### 转化为字符串 toString() 
- toString()    把变量转成字符串，var num= 1;  alert(num.toString());对象、数字和布尔值可以通过toString()方法。	
  toString() 方法可把一个逻辑值转换为字符串，并返回结果，成功true，失败false。可以把布尔值true  or false 转化为字符串。
  例如：var mm = false; 布尔值。
  	var ss = mm.toString();
    alert(typeof(ss));  字符串。
- 注意：
1. null和undefined没有toString()方法，因此会报错.
2. 即使是字符串也有toString()方法，对象也有toString()方法。
- 技巧：
  toString()可以不写参数，但是我们将数值转换成字符串的时候可以添加一个参数（基数），toString()方法以十进制格式返回数值的字符表现，我们可以用二、八、十等进制。
  如：
  var num = 10;
  console.log(num.toString());  //默认10进制
  console.log(num.toString(8)); //12
  console.log(num.toString(10));  //10
  console.log(num.toString(16));  //a
##### String()
- String()对象 强制转换   把特殊值转成字符串。String()对象存在的意义：有些值没有toString()，这个时候可以使用String()。
  String(undefined); //返回类型string
  String（null）；//返回类型string
##### 转化为数值
- 我们前面说过，表单获取过来的数据默认是字符型，我们需要转换为数值型。
- 注意：Number（）方法可以用于任何数据类型，parseInt（）只能用于字符型。
- 小例子
~~~
var person = {
    name: '刘德华',
    age: 18,
    active: function() {
        alert('忘情水');
    }
}
var num = console.log( typeof person.age.valueOf().toString());  //返回string

console.log(typeof Number(num)); //返回number
~~~
##### parseInt(string)
1. parseInt(string) 函数，将string类型参数转成整数。parseInt('78')
- 规则：
1. 永远记住它是取整函数
2. 如果第一个字符不是数字符号或者负号，返回NaN
3. 如果第一个字符是数字，则继续解析直至字符串解析完毕 或者 遇到一个非数字符号为止.
- 注意：该方法可以识别16进制的数，并将其转换成10进制。
- 在ecma3与ecma5有冲突，ECMA3中该方法可以识别八进制，ECMA5中取消了识别八进制。
  //ECMA3中 认为是56八进制，ECMA5中认为是70十进制
  console.log(parseInt('070'));  //70
- 技巧：可以给parseInt(string)方法添加第2个参数，如
  parseInt(string，16)；就表示该字符串按16进制解析，（这种情况下字符串中可以没有0X）
   var ss = 'a';
   console.log(parseInt(ss,16)); //10
  var ss = '10';
  console.log(parseInt(ss,8)); //8
2. parseInt(string, radix)
- 参数描述：string ，必需。要被解析的字符串。radix: 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
- 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
- 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。
- 返回值：返回解析后的数字。
##### parseFloat(string)
1. parseFloat(string) 函数将string类型参数转成浮点数
  parseFloat('78.21')
- 注意：
1. parseFloat函数如果用来转换 整型数值字符串，则也是返回 整型数值。
  var num = parseFloat("12"); // 12，而不是 12.0
2. 字符串中只有第一个小数点有效，如122.22.3 会被解析122.22 第二个小数点后面的字符被忽略了。
3. 该方法只能按照十进制解析，故出现16进制的字符就是0.
~~~
console.log(parseFloat('1234abc'));  //1234
console.log(parseFloat('0xaa'));    //0
console.log(parseFloat('123.00')); //123
console.log(parseFloat('123'));  //123
console.log(parseFloat('123.44')); //123.44
console.log(parseFloat('123.44.55')); //123.44
console.log(parseFloat('0099.12'));  //99,12
console.log(parseFloat('3.124e4')); // 21240
~~~
#####  js 隐式转换
1. js 隐式转换
- 利用算术运算隐式转换  -  *  /
- 利用了js的弱类型的特点，进行算术运算，实现了字符串到数字的类型转换，我们也成为隐式转换
  var   str= '123 ';
  var   x   =   str-0;
  var   x   =   x*1; 
##### Number()
- Number() 强制转换函数
  - 注意：里面如果只要出现非数字字符或者undefined， 则就返回 NaN
1. 如果该值是空字符串、数字0、或null、false   则返回 0      如果是 true  则返回 1 
2. 如果字符串只包含数字（包括符号），将其转换成10进制，如果是“011”也转换成11；
3. 如果字符串中包含有效的十六进制格式如“0xff”,则将其转换成十进制。
4. 如果字符串中包含有效的浮点数格式如’‘1.001’‘，则转换为相应的浮动数（忽略前导的0）；
5. 如果是对象，则调用对象的valueOf()方法，如果返回NaN,就调用对象的toString（）方法，再来一次。
##### 转化为布尔值
- Boolean()函数
- 将字符串转成布尔值。Boolean('true');
- 注意：代表 空、否定的值 会被转换为 false， 有五种  “ ''、0、NaN、null、undefined  。
~~~
var res = Boolean(''); // false
res = Boolean(0); // false
res = Boolean(NaN); // false
res = Boolean(null); // false
res = Boolean(undefined); // false

只有字符串和数字才能被转化为true
var res2 = Boolean('小白'); // true
var res2 = Boolean(12); // true
~~~
- 注意：
  其他类型转换成布尔类型时通过Boolean()和!!可以把其他类型转换成布尔类型,
#### null
- null 代表什么都不确定（数据类型，数值）。null代表空对象的指针。所以类型是object。一个变量用来未来保存数据，我们用null将其赋值。
- 注意:
  在ECMA-262规定 null ==undefined 的结果是true，而在ECMA5中null是对象。
#### Undefined
- Undefined类型的数据只有一个值：undefined
- 注意：
     var ss;
        // alert(ss);  // 变量声明为赋值，undefined;
    //alert(mm);  //未声明，未赋值   错误
    alert(typeof ss);   //类型都是undefined
    alert( typeof mm);  //类型都是undefined
- 技巧：我们在声明变量时最好，将其赋值。这样我们用typeof 得到undefined就不会迷惑了。
#### 判断数据类型
- typeof 判断简单数据类型。instanceof 判断复杂数据类型
### 变量命名规范
1. 命名变量是用下划线分割单词。
2. 命名函数，对象属性和方法时，从第二个单词开始把每个单词的首字母大写。

### 执行环境及作用域
- 执行环境（简称环境）
- 环境：定义了变量和函数有权访问的其他数据类型，决定了它们各自的行为。
- 每个环境中都有一个与之相关变量对象，环境中定义的所有变量和函数都保存在这个对象中。
- 全局执行环境：是最外层的执行环境，根据宿主对象的不同，web中全局执行环境就是window，因此所有全局变量和函数都是window对象的属性和方法创建的。保存在某个执行环境内的变量和函数定义，将在该环境中所有代码执行完后销毁。对于全局变量直到应用程序退出或关闭网页时才会销毁。
#### 例子
~~~
function test(f) {
		 f(123);
}

test( function(v){
	alert(v + 3);
} );
//解析过程
//1.函数声明function test(f) {。。。},
//2.函数调用 test（）；
//创建 形参f 和字面量123
//3.函数作为参数传递给 f =  function （v）{。。。}
//4.解析f 里面的函数声明
//5. function （v） {...} ，同时创建var v
//6.f（123），把 123实参传递给形参，
//7.执行alert（123+3）；
~~~
### 变量作用域
- 全局变量：脚本里声明的变量。
- 局部变量：函数内部声明的变量，只有在函数内部声明 var（包括函数的形参）
- 因此全局变量也可以在函数内生效。
- 可以用var关键词，在函数内使用var声明变量，那么该变量就是一个局部变量，所以即使全局变量与局部变量的名字相同，也可以限定其作用域。如果函数的变量没用var，就是全局变量。
- 推荐做法; 总在函数里使用var 关键字，就可以避免任何形式的二线义隐患（就是全局变量与局部变量的名字相同，而且局部变量没有使用关键字var，这就导致了全局变量会被二次定义）。
- 块级作用域：在c语言，java中 
  声明变量，并用花括号包着 {
   int i = 5；
  }
### 基础输入输出
函数;   alert(msg)   用浏览器提示框显示msg。prompt(info)   用浏览器对话框接收用户输入，info是提示信息。console.log(msg)   用浏览器控制台显示msg。
- 注;以上函数皆是BOM的属性和方法。
- prompt（info）获取输入
  消息输入窗：
1. 在 JS 中可以使用浏览器提供的 prompt 函数从键盘接收用户的输入。
2. 括号中的参数 info 是用来显示在输入窗给用户看的提示信息
3. 用户输入的 任何内容 都是一个 字符串
- 语法如下：
  var usrName = prompt('请输入您的名字'); //会在输入窗显示给用户看的提示信息
  alert(usrName); // 打印用户名字
  console.log(控制台输出)
- 360极速浏览器、谷歌浏览器、火狐浏览器、IE11 等新浏览器 支持 开发者工具。console.log(msg) 可以把 页面JS 执行过程中，把需要的数据 显示在 开发者工具 的 控制台界面
### 关键字、保留字、标识符
- 标识符：就是指开发人员为 变量、属性、函数、参数 取的名字。标识符不能是 关键字 或 保留字
- 关键字：是指 JS本身已经使用了，不能再用它们充当变量名啊方法。名括：break、case、catch、continue、default、delete、do、else、finally、for、function、if、in、instanceof、new、return、switch、this、throw、try、typeof、var、void、while、with 等。
- 保留字:实际上就是预留的“关键字”，意思是现在虽然现在还不是关键字，但是未来可能会成为关键字的，你一样是不能使用它们当变量名或方法名。
  包括：boolean、byte、char、class、const、debugger、double、enum、export、extends、fimal、float、goto、implements、import、int、interface、long、mative、package、private、protected、public、short、static、super、synchronized、throws、transient、volatile 等。
  注意:如果将保留字用作变量名或函数名，那么除非将来的浏览器实现了该保留字，否则很可能收不到任何错误消息。当浏览器将其实现后，该单词将被看做关键字，如此将出现关键字错误。
### 严格模式
ECMAscript5引入严格模式，要在整个脚本中使用严格模式，在脚本的顶部添加
 ’‘use strict’‘；
这其实是个编译指示，告诉js引擎切换到严格模式。
严格模式下js执行结果会有很大的不同，支持严格模式的浏览器：IE10+，Firefox 4+，Safari 5.1+
Opera 12+ 和chrome
## 条件语句
### if语句
- 基本语法：
~~~
if（condition） {
	statements
}
else {
	statements
}
~~~
注意：条件必须放在指定位置。条件的结果永远是布尔值，非真即假。
### switch case
- 语法： 使用结果表达式 的值 和 各个 case 中的值 进行相等比较。
~~~
switch( condition ){ 
    case value1:
        //表达式结果 等于 value1 时 要执行的代码
        break;
    case value2:
        //表达式结果 等于 value2 时 要执行的代码
        break;
    default:
        //表达式结果 不等于任何一个 value 时 要执行的代码
}
~~~
- 代码解析：
1. 先从条件中 获取一个 值，随后 表达式的值 会与结构中的 case 的值 做比较。
2. 如果存在匹配 全等(===)  即（ 变量值  ===  value 值）  注意：是全等，则与该 case 关联的 代码块 会被执行，
   并在遇到 break 时停止，整个 switch 代码执行结束。
3. 如果所有的 case 的值 都和 表达式值 不匹配，则 执行 default里的代码。
4. 我们case 后面的值 通常都是一个常量。
#### switch语句的高级使用
~~~
var num = 123;
switch (true) {
  case num < 0:
  alert('小于0');
  break;

  case num > 0 && num < 100:
  alert('大于0小于100');
  break;

  case num > 100:
  alert('大于100');
  break;

  default:
  break;
  
}
~~~
- switch 语句甚至可以这么用，true代表逐个执行每个case，直到default。
### switch 与 if 的对比
switch...case通常处理case为比较确定值（常量）的情况，而if…else…更加灵活范围判断。
### 循环语句
- 语法：
~~~
while（condition） {
	statements
}
do {
	statements
}while（condition） 循环语句
~~~
#### for 循环 
- for循环可以这样写 
~~~
for（var count=1；count<11 ;count++）{
		....
}
~~~
- for 语句的用途之一：对某个数组里的全体元素进行遍历处理，需要用到数组的length属性。
### break和 continue
- break:是中途退出循环，switch case 语句 for循环。退出循环或者switch语句，在其他地方使用会导致错误
- continue : 只能用于循环语句，并且是退出当前循环。不是退出一个循环，而是开始循环的一次新迭代。continue语句只能用在while语句、do/while语句、for语句、或者for/in语句的循环体内，在其它地方使用都会引起错误！
