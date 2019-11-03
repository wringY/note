# 函数

- 函数就是一组允许在你的代码里随时调用的语句。
~~~
function 函数名（函数参数） {
	函数体
}
~~~
- 使用时先定义后调用。调用方法：函数名（参数，参数，参数）;
- 注意：函数中return语句之后的语句不会被执行。如果return  表示退出函数。
- 函数声明：function 函数名 （） {}
- 函数表达式：var ss = function 函数名 （） {};
- 这两者几乎没有任何区别，只有在预解析的时候有区别（什么时候可以通过变量访问函数）
## 定义函数的方式

- 函数声明

~~~
function name( param1[ , param2[, ...] ] ){
    return
}
~~~

如果 return 省略，那么浏览器将自动添加 return undefined

`function` 是关键字，它只能用来声明函数，而 `var` 则可以用来声明7   种数据类型（number、string、boolean、null、undefined、symbol、    object）中的任意一种。

- 函数表达式

~~~
var x = function( param1[ , param2[, ...] ] ){
    return 
}
~~~

匿名函数需要赋给变量，之后才能调用。**这个匿名函数称为函数表达式**

- 混合式

~~~
var fn = function name( param1[ , param2[, ...] ] ){
    return 
}
~~~

混合式中，函数名 name 只在函数体内部有效，指代函数表达式本身，在函数体外部无效。

- Function 构造函数

最后一个参数被始终看成函数体，而前面的参数则枚举了新函数的参数。

~~~
var fn = new Function( 'param1'[ , 'param2'[,' ...'] ] , functionBoby ){
    return 
}
~~~

例子:

~~~
let n = 1;
let fn = new Function( 'x' , 'y' , 'return x + ' + n + ' + y' );
fn( 1,2 )  //4，此时的 n 是1
~~~

## 参数

- 传递给函数的数据称为参数。ECMA函数中所有的参数都是按值传递。
- 重要例子：
~~~
function ss (mm) {
  //函数的参数传递是值传递，意思就是形参mm 是实参dd所指对象的值的复制，
  //目前先把对象的值的复制理解成把对象里的内容进行了复制
  mm.name = '值传递';  
  //如果函数参数的传递时引用传递，那么mm.name值应该是'引用传递'，很显然不是。
  mm = new Object();
  mm.name = '引用传递';
}
var dd = new Object();
ss(dd);
console.log(dd.name);   //'值传递
~~~
- 变量有两种访问方式：
1. 按照值（简单数据类型）访问
2. 按照引用（地址）复杂数据类型，按照地址访问。
### 参数为其它函数
- 函数可以接受任何类型的数据作为参数， 数值  字符 甚至是函数类型。
- 应用场景:吃晚饭之后，要做的事情不确定，心情好工作，心情不好唱歌。
~~~
// 高阶函数
    // 1 函数作为参数
    // function eat(fn) {
    //   setTimeout(function () {
    //     console.log('吃晚饭');
    //     // 吃完晚饭之后做的事情
    //     fn();
    //   }, 2000);
    // }

    // eat(function () {
    //   console.log('去唱歌');
    // });
~~~
### 案例
// 模拟sort的内部实现
    // arr.sort(function (a, b) {
    //   return a - b;   //从小到大
    // });
    // console.log(arr);
### 详解sort方法的实现原理
- 给数组原型里面添加一个mysort方法。
~~~
Array.prototype.mySort = function (fn) {
      console.log(this);  //此时this指向arr
      for (var i = 0; i < this.length - 1; i++) {  
        var isSort = true; // 假设排好序
        for (var j = 0; j < this.length - i - 1; j++) {
          if (fn(this[j], this[j + 1]) > 0) {  //根据穿进来的函数的调用结果来判断，注意这个函数的返回值 是 0 大于1 小于1 三种情况的一种
            isSort = false;
            var tmp = this[j];       //从小到大排序
            this[j] = this[j + 1];
            this[j + 1] = tmp;
          }
        }
        if (isSort) {
          break;
        }
      }
    }
    var arr = [35, 1, 6, 20];
    arr.mySort(function (a, b) {
      return b - a;
    })
    console.log(arr);
~~~
## 返回数据
- return 语句。
- return false ;相当于退出函数。
- 函数如果没有指定返回值，默认的返回类型是undefined。return 语句 后面只能跟一个语句。
### 函数的返回值可以是其他函数
~~~
一个函数的函数的返回值可以是其他函数，下面是一个比较有用的场景。

    // 求两个数的和
//m的变化频率很快，前面的100变化频率很慢
    // 100 + m
    // 1000 + m
    // 10000 + m

    function getFun(n) {
      return function (m) {
        return n + m;
      }
    }
var fn100 = getFun(100); //调用这个方法得到100 + m的函数。
 var fn1000 = getFun(1000); //调用这个方法得到1000 + m的函数。
~~~
## 函数的调用结果
- 函数的调用结果可以赋值给变量。
## arguments
- javaScript中，arguments对象是比较特别的一个对象，实际上是当前函数的一个内置属性。也就是说所有函数都内置了一个arguments对象，arguments对象中存储了传递的所有的实参。arguments是一个伪数组，因此及可以进行遍历
~~~
 function sumFun() {
      var sum = 0;
      for (var i = 0; i < arguments.length; i++) {
          sum += arguments[i];
      }
      return sum;
  }
console.log(sumFun(1, 3, 5));
console.log(sumFun(2, 4, 6));
~~~
#### arguments注意事项
- 注意：arguments 甚至可以影响函数的形参。
~~~
function arg (num1,num2) {
  arguments[1] = 10;
  alert(arguments[0]+num2);
}
arg(20,20);
~~~
- 每次调用该函数，num2都会被重写。
- 注意事项：
1. 这种影响是单向。也就是形参和arguments的内存空间是独立的，但是值是同步了。
2. 修改形参不会改变
## 函数的调用
- 有名字的函数，定义函数后，无论在哪都可以调用。只有函数可以这样！！
- 没有函数名的函数，函数调用必须写到函数体下面。
## 匿名函数（拉姆达lamda函数）
- 匿名函数除了作为参数传递外，也可以作为启动函数，定义后立即自执行（当页面加载后立即执行）
~~~
(function () {
  alert('我是匿名函数，被自执行啦~~！');
})();
~~~
- 注意;()就相当于调用了。
- 匿名函数自动执行写法的，最大的好处，就是  防止命名冲突， 这种函数永远不会冲突。
- 注意：
1. 匿名函数不能单独存在必须将其赋值变量或者将其当作函数的参数。
2. 匿名函数的作用就是当作自执行函数，必须按照上面的写法（匿名函数）（）；
- 使用：利用函数内部变量，执行后自动销毁的特性，可以用来将不必要的全局变量当垃圾清除，从而达到优化的目的。
### 利用自执行函数，优化内存
~~~
(function(){     //自执行函数，页面加载立即执行。
    var num =1 ;  //此时 num 相当于全局变量，但是又是在自执行函数内部，当函数结束自动销毁。
    function fu () {

    }
    fu();
})();
~~~
## 父函数的变量作用域包括其子函数
- 根据在内部函数可以访问外部函数变量的这种机制，用链式查找决定哪些数据能被内部函数访问。 就称作作用域链。

## 没有重载
- ECMAscript 里面的函数不能像传统意义上进行重载。
- 重载的含义：可以为一个函数，做二次声明（只要接受的形参类型和数量不同即可）。而ECMAscript函数不能重载。
## 函数内部属性
- 在函数内部，有两个特殊的对象：arguments 和 this。
1. arguments是一个类数组对象，它还拥有callee（被召者），该属性是一个指针，指向拥有 该arguments 对象的函数。
- callee属性的应用场合：如阶乘函数。
~~~
//阶乘函数。 3的阶乘 1*2*3
     function factorial (num) {
         if (num <= 1) {
             return 1;
         } else {
             return num * factorial(num-1);  //如果函数名修改了，那么此处也要修改
         }
     }
 console.log(factorial(5));  //120
 //可以利用，函数里面的arguments的callee属性，减少与函数名的耦合。
 function  somename (num) {
     if (num <= 1) {
         return 1;
     } else {
         return num * arguments.callee(num-1); //函数名随便改
     }
 }
 console.log(somename(5));  //120
~~~
## 函数的属性和方法
- 每个函数包含两个属性：length、prototype
### length
- length属性保存了函数形参的个数。
### prototype
- ECMA中的引用类型而言，prototype是保存它们所有实例方法的真正所在。
- 比如：对象的valueOf() 和toString() 等方法，实际上都保存在protopyte，只不过通过各自对象的实例访问罢了。
- 在ECMA5中，prototype是不可枚举的，因此无法用for-in发现。 
### call（）
- 该方法的用途：在特定的作用域调用函数，实际上等于设置函数体内this对象的值。
- call()方法与apply()方法基本没有任何区别，唯一的区别：传递给函数的参数必须逐个列举出来。
~~~
//call 和 apply 看情况使用。
  function ss1 (num1,num2) {
      return num1 + num2; 
  }
  function ss2 (num1,num2) {
  
      return ss1.call(this,num1,num2);  
  //ss2()在调用，是在全局环境下调用的，所以在执行ss1()时，把this（执行全局环境 window）,
  //传递给this值. 传递给函数的参数需要逐个列举出来。
  }
  console.log(ss2(10,10));
~~~
#### call的应用
- 这两种方法的强大之处在于可以：扩展函数赖以运行的作用域。
- 比如：一个伪数组（或者集合）有数组的属性，但是没有数组的方法，我们可以通过call,让数组对象原型中的方法，在伪数组中调用。
~~~
// 伪数组
    var obj = {
      0: 100,
      1: 10,
      2: 11,
      3: 20,
      length: 4
    };
	Array.prototype.push.call(obj, 30);
    Array.prototype.splice.call(obj, 0, 3);
    console.dir(obj);

var obj = {
      name: 'zs'
    };
    console.log(obj.toString()); //[object object]
    var arr = [5, 9];
    console.log(arr.toString());  //字符串5，9
    console.log(Object.prototype.toString.call(arr)); //[Object Array]
~~~
### apply()
- 该方法的用途：在特定的作用域调用函数，实际上等于设置函数体内this对象的值。
~~~
//apply()方法需要两个参数，第一个：在其中 运行函数 的作用域
    //第二个：参数数组，可以是数组的实例，也可以是arguments对象
    function ss1 (num1,num2) {
        return num1 + num2; 
    }
    function ss2 (num1,num2) {
        // 隐藏的 this，因为是在全局环境中调用的所以 this指向window对象。
        return ss1.apply(this,arguments);  
    //ss2()在调用，是在全局环境下调用的，所以在执行ss1()时，把this（执行全局环境 window）,
    //传递给this值，和arguments对象。
    }
    console.log(ss2(10,10));

    function ss3 (num1,num2) {
        return ss1.apply(this,[num1,num2]);
        //此处传递的this值与上一处相同，只是第二个参数不同。
    }
    console.log(ss3(10,10));
~~~
#### apply的应用
~~~
 var arr = [5, 10, 1, 3, 6];
    // Math.max不能求数组中的最大值
    // console.log(Math.max(arr));
    console.log(Math.max.apply(null, arr));
    console.log(Math.max.apply(Math, arr));
    // console.log(1, 2, 3);
    // console.log(arr);
    console.log.apply(console, arr);
~~~
### bind()
- bind()方法主要就是将函数绑定到某个对象，然后做为一个新函数返回，函数体内的this对象的值会被绑定到传入bind()第一个参数的值，例如，f.bind(obj)，实际上可以理解为obj.f()，这时，f函数体内的this自然指向的是obj。
#### bind的应用
- 简单的应用场景
~~~
var a = {
	b : function(){
		var func = function(){
			console.log(this.c);
		}.bind(this);
		func();
	},
	c : 'Hello!'
}
a.b();  //Hello!


var a = {
	b : function(){
		var func = function(){
			console.log(this.c);
		}
		func.bind(this)();
	},
	c : 'Hello!'
}
a.b(); //Hello!
~~~
#### bind的另一种应用
~~~
function f(y, z){
	return this.x + y + z;
}
var m = f.bind({x : 1}, 2);
console.log(m(3)); //6
~~~
- 注意：这里bind方法会把它的第一个实参绑定给f函数体内的this，所以这里的this即指向{x : 1}对象，从第二个参数起，会依次传递给原始函数，这里的第二个参数2，即是f函数的y参数，最后调用m(3)的时候，这里的3便是最后一个参数z了，所以执行结果为1 + 2 + 3 = 6
  分步处理参数的过程其实是一个典型的函数柯里化的过程（Curry）
### callee
- 函数的应召者，在全局范围调用的时候callee 是null
### name
- 函数的名称 字符串类型
## 详细分析函数的过程
### 函数的创建过程
- 函数声明会发生的事情：
- 首先会在当前作用域中声明一个函数名（声明的函数名和使用var 声明的变量名是一样的。比如var sum；function sum(){}；这两个名字算重复）浏览器会开辟一块内存空间（分配一个16进制的地址），将函数体内的JS代码以字符串的形式存储在内存空间中
- 把内存空间的地址赋值给刚刚声明的那个函数名
### 函数的执行过程
- 函数调用的时候发生的事情：
- 首先浏览器会开辟一块新的内存空间（函数作用域）
- 形参赋值
- 变量提升
- 将函数名引用地址里储存的JS字符串拿到函数作用域，把它们变成JS表达式，从上到下执行