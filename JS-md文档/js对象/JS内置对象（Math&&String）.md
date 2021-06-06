# js的内置对象----Mtah和字符对象
- js语言预定义好的对象，就叫内建对象。
- 内置对象就是指JS语言自带的一些对象，供开发者使用，这些对象提供了一些常用的或是最基本而必要的功能
- JavaScript 提供多个内置对象：Math/Array/Number/String/Boolean...
- 对象只是带有属性和方法的特殊数据类型。学习一个内置对象的使用，只要学会其常用的成员的使用（通过查文档学习），也可以通过MDN/W3C来查询
- 内置对象的方法很多，我们只需要知道内置对象提供的常用方法，使用的时候查询文档。
- 注意:
  Mozilla 开发者网络（MDN）提供有关开放网络技术（Open Web）的信息，包括 HTML、CSS 和万维网及 HTML5 应用的 API。
## Math数学对象
- Math对象不是构造函数，它具有数学常数和函数的属性和方法，它是静态的不需要用new，可以直接使用。
- 跟数学相关的运算来找Math中的成员（求绝对值，取整）
~~~
Math.PI						// 圆周率
Math.floor() 	              // 向下取整
Math.ceil()                   // 向上取整
Math.round()				// 四舍五入版 就近取整   注意 -3.5   结果是  -3 
Math.abs()					// 绝对值
Math.max()/Math.min()		 // 求最大和最小值
Math.sin()/Math.cos()		 // 正弦/余弦
Math.pow()/Math.sqrt()	 // 求指数次幂/求平方根
~~~
### Math.max
### Math.round
- 就近取整函数，**如果出现  .5的情况，往大了取**。
  例如：0.5  取 1
  	-0.5  取 0 
  	  -1.5  取 -1
- round方法的原代码实现：
  把传入的数值 x ，然后 x+ 0.5， 然后再向下取整。
### Math.random
- 随机返回一个小数，取值范围 是  范围[0，1)        左闭右开     0  <= x  < 1   
#### 得到两个数之间的随机整数
~~~
function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(getRandom(10, 20)).
// 分析公式
// 1. math.random()   [0, 1)  0 <= x  < 1   这是最恶心的
// 2.  Math.random() * (max - min + 1)   公式  注意先计算乘数
// 3. 带入数据
// 4. Math.random() * (20 - 10 + 1)
// 5.  Math.random() * (11)  
// 6.  [0, 1) * 11   ==>  [0, 11)  
// 7. [0, 11)  + min     ==>  [0, 11) + 10  ==>  [10, 21)   //各自加10
// 8. Math.floor([10, 21));  ==> [10, 20]    //10和21之间的随机数，向下取整
// Math.floor(Math.random() * (max - min + 1) + min)
~~~
### Math.abs
- Math.abs() 里面的参数可以是字符型和数值型。如果里面的参数是非数字符型的字符串，返回NaN.
## 字符对象的常用方法
- 字符串的不可变性在JS中，字符串被认为是很重要的值。所以：
  var ss = 'red';
  ss = 'pink';
- 给ss重新赋值，相当于，开辟了两空间（red,pink），只是改变了变量的指向。
- 那么red 空间，怎么重新被调用呢？（可能被销毁了 red = null）
- 产生的影响：
~~~
var str = 'abc';
str = 'hello';
// 当重新给str赋值的时候，常量'abc'不会被修改，依然在内存中
// 重新给字符串赋值，会重新在内存中开辟空间，这个特点就是字符串的不可变
// 由于字符串的不可变，在大量拼接字符串的时候会有效率问题
var str = '';
for (var i = 0; i < 100000; i++) {
    str += i;
}
console.log(str); // 这个结果需要花费大量时间 来 显示 因为需要不断的开辟新的空间。
~~~
- 字符串所有的方法，都不会修改字符串本身(字符串是不可变的)，操作完成会返回一个新的字符串。
### 获取字符串位置方法(根据字符获得位置)
#### indexOf('要查找的字符', 开始的位置)
~~~
//1.indexOf('要查找的字符', 开始的位置)
    //返回指定内容在原字符串中的位置， 如果找不到就返回 -1，开始的位置是index 索引号。
    var ss = 'myname nl';  //空格也可以是字符
    console.log(ss.indexOf('n',3));  // 7
    //如果没有指定开始位置，就从索引0开始，
    //如果没有指定开始位置，字符串里面有相同的字符，那么只返回第一个的下标。
    //如果字符串里面有相同的字符，我们可以指定开始位置来获得不同的索引。

举例：
 var ff = 'xyxuxixxooooo' ;
    //要求显示所有的字符x的下标
     var index = ff.indexOf('x');   //获得x字符的下标
    while (index != -1) {      //如果找的到继续找。
        console.log(index);   
        index = ff.indexOf('x',index+1);  //从已得到的下标+1开始找 
    }
~~~

#### lastIndexOf()
- 从后往前找，只找第一个匹配的。
~~~
var dd = "what the ???";
    console.log(dd.lastIndexOf('?'));  //只有一个参数，即需要查找的字符。
                                        //注意是从后往前找的。
~~~
### 根据位置获取字符
#### charAt（index）
- 返回指定位置的字符(index 字符串的索引号)。使用：str.charAt(0)；
- 举例：可以用该方法，遍历字符串。
~~~
var ss = '1234456789';           
    // console.log(typeof ss.charAt(0));      //获取下标为0的字符串,

    for (var i = 0; i < ss.length; i++) {
        console.log(ss.charAt(i));  
    }
~~~
#### charCodeAt(index) 获取指定位置（下标）的字符的ASCII编码
- 获取指定位置（下标）的字符的ASCII编码。
~~~
var ss = '123456';
console.log( typeof ss.charCodeAt(0));
~~~
#### str[index] 获取指定位置处字符
- 获取指定位置处字符，有兼容性问题。直接给字符串添加下标。HTML5，IE8+支持 和charAt()等效。
~~~
var cc = '1234456';
console.log(cc[0]);
~~~
### 字符串操作方法
#### concat() 拼接字符串
- 语法：concat(str1,str2,str3...)  
- concat() 方法用于连接两个或多个字符串。拼接字符串，等效于+，+更常用.不改变原字符串，只是相当于开辟一个空间，并没有改变变量的指向。
~~~
var ss = '1111';
var dd = '2222';
console.log(ss.concat(ss,dd));
console.log(ss)；
~~~
#### substr(start,length)获取指定长度的字符串
- substr(start,length)  该方法返回指定长度的字符串, start是开始位置（索引） 与 length 长数（包含自身）
~~~
var ss = '1234566789';
console.log(ss.substr(0));;   // 无参数、只写1个参数0，默认获得全部字符串  
console.log(ss.substr(0,2)); //从0索引开始，获取length为2（包含自身）的字符串  12
console.log(ss.substr(2,5));   //  34566
~~~
#### slice(start, end)获取指定位置的字符串
- 从start位置开始，截取到end位置，end取不到 (他们俩都是索引号).
~~~
 var ss = '1234566789';
console.log(ss.slice(0));   //0或不写默认全部
console.log(ss.slice(0,4));  //从0索引开始，到索引4结束，不包含（4）.
~~~
#### substring(start,end) 获取指定位置的字符串
- 从start位置开始，截取到end位置，end取不到   基本和slice 相同 但是不接受负值
- 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
- 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
- 如果任一参数小于 0 或为 NaN，则被当作 0。
- 如果任一参数大于 stringName.length，则被当作 stringName.length。
- 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。见下面的例子。
#### replace()
- replace() 方法用于在字符串中用一些字符替换另一些字符.replace(被替换的字符串， 要替换为的字符串)；
~~~
 var ss = 'abcf';
    console.log( ss.replace('bc','ee'));  //(被替换的字符串， 要替换为的字符串) 返回一个新的字符串
    console.log(ss);   //不修改字符串
举例：
var ss = 'xyuuuuddduoou';
        //把字符串里面u全部替换成z
        while (ss.indexOf('u') !== -1 ) {   //利用indexOf 可以检查指定字符是否存在u
           ss = ss.replace('u','z');
        }
        console.log(ss);
~~~
####例子     
- 判断字符串中出现次数最多的字符，并计数
~~~
//思路： 首先遍历整个字符串，其次获得每个字符，把每个字符都存起来，碰到相同的字符就加1。
//可以用变量，保存每个字符。然后再此遍历进行比较，但是太麻烦了。
//我们可以用对象，把每次获得的字符，都保存在对象的属性里（不用我们重复声明），然后判断对象的属性是否存在。
//为什么要用到对象，因为对象的属性就相当于声明变量，可以减少重复的变量声明。
~~~
#### trim()
- ECMA5为所有字符串定义了 trim()方法。这个方法会创建一个字符串的副本，删除前置及后缀的所有空格。
~~~
var ss = '   hello  world   ';
console.log(ss.trim());
//返回字符串 hello  world,该方法删除字符串中 前置 和 后置 的所有空格。
~~~
#### localeCompare()该方法比较两个字符串。
~~~
var ss = 'yellow';
console.log(ss.localeCompare("brick"));  //1   在字母表中，字符串位于字符串参数之后，返回1.
console.log(ss.localeCompare('yellow')); // 0  字符串等于字符串参数，返回0
console.log(ss.localeCompare('zoo')); //  -1   在字母表中，字符串位于字符串参数之前，返回-1
//注意：该方法区分大小写。
~~~
#### String.fromCharCode()
- 该方法属于一个静态方法。该方法接收一个或多个字符的ASCII编码，然后根据ASCII字母表，转换成字符。
~~~
console.log(String.fromCharCode(104,101,108,108,111)); //返回字符 hello
//根据ASCII表，转换成字符
~~~
#### 转换大小写
- toUpperCase() 	//转换大写
  - toLowerCase() //转换小写
~~~
var str = 'ANDY';
console.log(str.toLowerCase()); // andy
var str = 'andy';
console.log(str.toUpperCase()); // ANDY
~~~
#### split() 切割字符串为数组
注意，切割完毕之后，返回的是一个新数组。参数里面的字符，是根据字符串决定的。
~~~
var str = 'a,b,c,d';
console.log(str.split(',')); //返回的是一个数组 [a, b, c, d]。
var ss = 'a&b&c&';
split('&');  返回[a,b,c];
~~~















