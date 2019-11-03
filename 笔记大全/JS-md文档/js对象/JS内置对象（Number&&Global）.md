## Number对象的常用属性
### 创建Number对象：
~~~
var ss = new Number(10);     //创建一个对象。
console.log(ss.toString(10)); //返回字符串10，按照10进制返回字符串
console.log(ss.valueOf());  //返回数值10。
~~~
- 但是我们不建议直接实例化Number对象。
- 因为：基本包装类型与引用类型，在使用 typeof 和 instaceof 时结果完全不一样,容易让人混淆。
~~~
var mun = 99;
 var bb = new Number(99);
 console.log(typeof mun); // number
 console.log(typeof bb);  //object
 console.log(mun instanceof Number);  //FALSE
 console.log(bb instanceof Number);   //TRUE
~~~
### toString()
~~~
var ss = new Number(10);     //创建一个对象。
console.log(ss.toString(10)); //返回字符串10，按照10进制返回字符串
~~~
### valueOf()
~~~
var ss = new Number(10);     //创建一个对象。
console.log(ss.valueOf());  //数值型 10
~~~
### toFixed()
~~~
var mm = 10.005;        //基本包装类型对象。
console.log(mm.toFixed(2));   //toFixed 方法，不仅可以按照指定的位数显示，而且还可以自动舍入，
                            //10，005自动按照指定的位数舍入10.01
                            //多用于货币。
~~~
### toExponential()
- exponential 指数的 幂数的。
- toExponential() 该方法可以返回以 （指数表示法）e表示法 表示的数值的字符串形式。
~~~
var  cc = 10;
console.log(cc.toExponential());  //  返回字符串形式的 e表示法 1e + 1
console.log(cc.toExponential(2)); //还可以指定 返回字符串的 e 表示法的小数位数 1.00e+1;
~~~
### toPrecision()
- 对于数值来说，该方法可能返回固定大小格式（fixed），也可能返回指数格式对象（exponential）格式。
- 这个方法只接收一个参数，即表示数值的所有数字的位数（不包括指数部分）。
~~~
  var mun = 99;
  console.log(mun.toPrecision(1));  
  //1e+2,即100.因为1位数无法准确表示99，所以该方法就将它向上舍入为100，这样才能用1位数表示。
  console.log(mun.toPrecision(2)); //99
  console.log(mun.toPrecision(3)); //99.0
~~~
## Global全局对象
- 不属于任何其他对象的属性和方法，最终都是Global对象的属性和方法。
- 所有在全局作用域中定义的属性和函数，都是Global对象的属性。
### URI编码方法
URI（Uniform Resource Identifiers）	
通用资源表示符。
就是：https://developer.mozilla.org/zh-CN/ 网址
注意：URI不能包含空格。
#### encodeURI()
encodeURI():
该方法不会对属于 URI 本身的特殊字符进行编码，例如冒号、正斜杠、问号、井号。
~~~
var uri = "https://developer.mozilla.org/ #zh-CN/"
    console.log(encodeURI(uri));
//https://developer.mozilla.org/%20#zh-CN/
//该方法不会修改 属于URI 的特殊字符。
//它的作用是把 URI 里面的空格 转换为%20
~~~
#### encodeURIComponent()
该方法会修改 URI 中所有的非字母数字字符。
var uri = "https://developer.mozilla.org/ #zh-CN/";
console.log(encodeURIComponent(uri));
//https%3A%2F%2Fdeveloper.mozilla.org%2F%20%23zh-CN%2F
//该方法会修改 URI 里面的所有非数字字母字符。
#### decodeURI()
- 该方法与encodeURI相对。该方法只能对 使用过encodeURI() 编码方法的 字符串，就是把使用过encodeURI() 编码方法的 字符串 还原到之前的样子。
~~~
var uri = "https%3A%2F%2Fdeveloper.mozilla.org%2F%20%23zh-CN%2F";
console.log(decodeURI(uri));
//该方法，只能用于使用过 encodeURI() 方法 的字符。
//把 %20 转换成空格。
~~~
#### decodeURIComponent()
- 该方法与encodeURIComponent()方法相对。也是把 使用encodeURIComponent()方法 编码过的字符串，还原到之前的样子。
~~~
var uri = "https%3A%2F%2Fdeveloper.mozilla.org%2F%20%23zh-CN%2F";
console.log(decodeURIComponent(uri));
~~~
- 注意：
  例如: 在MDNz中显示搜索Math.max的结果为：Math.max([value1[,value2,....]])小括号为里面的参数类型，[]表示里面的参数是可选的，可以有也可以没有。

