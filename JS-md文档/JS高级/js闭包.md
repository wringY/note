
# 函数表达式
- 函数声明：就是声明函数。
- 函数表达式就是把匿名函数赋值给变量。
- 例如：
  var mm = function() {.....}
- 匿名函数不能单独存在必须赋值给变量，或者当作其他函数的参数。
## 递归
- 递归就是函数自己调用自己，我们可以用callee,来替代函数名。
### 普通递归
~~~
//普通的递归
  /*  function mm (num) {
       if (num <= 1) {
           return 1;
       } else {
           return num * mm(num-1)
       }
   }
   //这段函数会出错的原因在于：我们把mm函数名 赋值给ss，那么ss就指向mm函数。
   //紧接着吧 mm的指向清空，但是我们在使用mm函数时，我们还要用到mm函数名，就会出错。
   var ss = mm;   
   mm = null;
  ss(4); //not a function */
~~~
### 利用arguments的callee属性的递归
~~~
 //利用arguments的callee属性。
      //'use strict'
     /*  function mm (num) {
          if (num <= 1) {
              return 1;
          } else {
              return num * arguments.callee(num-1)
          }
      }
      var ss = mm;   
      mm = null;
      console.log(ss(4)); */
      //这种方法的缺陷，就是在严格模式下会出错。
~~~
### 使用命名函数的递归
~~~
//不再使用函数声明,而是使用命名函数。
 var ss = function mm (num){
     if (num <= 1) {
         return 1;
     } else {
         return num * mm(num-1)
     }
 };
 mm = null;
 console.log(ss(4));
 //这样即把函数赋值给一个变量ss,即使mm执行null,但是在ss中mm任然有效
 //这种形式是比较好的。
~~~
## 闭包
- 谈到闭包，就不得不说到JS中垃圾回收机制（内存管理），在其他文档中介绍。
- 闭包： closure
- 闭包是一个函数，但是这个函数可以访问另一个函数作用域中的变量。
- 在一个作用域中可以访问另一个作用域
- 创建闭包的方法：在一个函数内部创建另一个函数。
- 闭包的价值就在于返回。
- 闭包的特点：
1. 在一个函数内部创建函数就产生了闭包。
2. 一旦返回闭包，那么这个函数作用域将一直存在，直到闭包被销毁。
3. 如何销毁闭包 闭包 = null
4. 返回的闭包，就可以访问其他函数中的私有变量了。
- 在chrome开发工具中我们可以通过Scope(作用域)来观察闭包现象的发生。
- 因为内部函数在被创建时，其作用域链对外部函数对应的变量对象存在一个引用，而JS采用引用计数的方法进行内存管理，所以当外部函数被执行完毕后，其对应的变量对象不会被回收。
- 这样就发生了闭包，在外部函数执行完毕后，我们在内部函数中仍然可以访问外部函数作用域中的变量。
### 普通函数第一次调用发生了什么
首先在compare函数在第一次调用时：
 会创建一个执行环境（execution context）及相应的作用域链，
并把作用链赋值给执行环境中的一个内部属性[[Scope]]。
其次：
 //使用this、arguments、和形参的值来初始化函数的活动对象（activation object）。
然后：
    //[[Scope]]属性中的作用域链会指向 函数的活动对象 和外部函数的活动对象
注意：在[[Scope]]属性中， 函数的活动对象活动对象是第0位，外部函数的活动对象第1位，
    //外部函数的外部函数的活动对象第3位以此类推。
    //作用域链的本质是一个指向变量对象的指针列表。
    //当[[Scope]]属性中作用链指定完毕时，无论什么时候在函数中访问一个变量，就会从从作用域链寻找指定变量。
~~~
//函数在第一次调用的时候发生了什么
function compare (value1, value2) {
    if (value1 < value2) {
    return -1;
} else if (value1 > value2) {
    return 1;
} else {
    return 0;
    }
}
var result = compare(5, 10);
//以上代码先定义compare函数，然后又在全局环境中调用它。
//首先在compare函数在第一次调用时：
//会创建一个执行环境（execution context）及相应的作用域链，
//并把作用链赋值给执行环境中的一个内部属性[[Scope]].
//其次：
//使用this、arguments、和形参的值来初始化函数的活动对象（activation object）。
//activation object里面包含： arguments对象和value1、value2.
//然后：
//[[Scope]]属性中的作用域链会指向 函数的活动对象 和外部函数的活动对象。
//此时外部函数的活动对象里面包含：result、compare，comepare指向该函数的执行环境（execution context）
//注意：在[[Scope]]属性中， 函数的活动对象活动对象是第0位，外部函数的活动对象第1位，
//外部函数的外部函数的活动对象第3位以此类推。

//作用域链的本质是一个指向变量对象的指针列表。
//当[[Scope]]属性中作用链指定完毕时，无论什么时候在函数中访问一个变量，就会从从作用域链寻找指定变量。
~~~
### 产生闭包的函数调用时的情况
~~~
function creatCompareFunction (propertyName) {
    return function(object1,object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2) {
    return -1;
} else if (value1 > value2) {
    return 1;
} else {
    return 0;
        }
    };
}
//调用creatCompareFunction函数。
var compare = creatCompareFunction ('name');
//此时返回的是一个匿名函数，并将其赋值给变量compare
//这个函数调用时：创建执行环境1，产生作用链1，
//0级是活动对象里面包含arguments和name形参。
//1级是外部函数对象（全局）：
//creatCompareFunction指向执行环境，和result（此时未定义）。
var result = compare({name: 'AAA'},{name: 'BBB'}); //调用匿名函数
//匿名函数调用时：创建执行环境2，产生作用域链2，
//0级是活动对象里面包含arguments和object1、object2形参。
//1级是其外部函数的活动对象：creatCompareFunction的活动对象。
//2级是其外部函数的外部函数活动对象：全局。
compare = null;
//解除匿名函数的引用，就相当于通知垃圾回收机制将其清除。
//一旦匿名函数的作用域链被销毁，那么其他的作用域被销毁（除了全局。）
~~~
### 使用闭包需要注意什么
- 注意：闭包会占用很多内存。V8JS引擎可以尝试回收被闭包占用的内存。
### 闭包与变量的关系
~~~
//闭包里面存放的是变量对象，而不是某个特定的值。
        //就是闭包里面的活动对象，里面是变量对象。
        function creatFunctions () {
                var result = new  Array();
                for (var i = 0; i < 10; i++) {
                   result[i] =  function() {
                        return i;
                    };
                }
                return  result;
        }
       console.log(creatFunctions());
		var arr = creatFunctions();
 		console.log(arr[8]());
//不管arr的索引是多少都是10
       
        //当creatFunctions函数返回时，i的值是10，此时因为作用域的关系，每个匿名函数都可以访问到creatFunctions的活动对象里面的i，所以每个匿名函数的i都是10.
        //所以当最终for循环后i的最终值是10，所以当外部函数creatFunctions访问result里面的i时，
        //结果是10。
------------
        //我们可以通过chrome工具查看
        //[[Scopes]]: Scopes[2]
       // 0: Closure (creatFunctions)
        //    i: 10
       // 1: Global {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
~~~
### 使用强制匿名函数包含闭包
~~~
 function creatFunctions () {
        var result = new  Array();
        for (var i = 0; i < 10; i++) {   
            //创建匿名函数，并且调用它（i）
            //这样num将接受参数，函数是值传递。
            //然后通过闭包返回变量对象 num闭包。
            //这样result数组中的每个元素num副本。
         result[i] = function(num){
            return function () {
                return num;
                 };
            }(i);
        }
    return  result;
  }
       console.log(creatFunctions());
~~~
- 分析：每次循环创建了一个自执行函数，但是由于内部的函数还要访问自执行函数中的变量，所以自执行函数结束后不会销毁。
#### 闭包经典案例
~~~
var heroes = document.getElementById('heroes');
    var list = heroes.children;
    for (var i = 0; i < list.length; i++) {
      var li = list[i];

      (function (i) {
        li.onclick = function () {
          console.log(i);
        }
      })(i);
    }
~~~
- 分析：每次循环创建了一个自执行函数，但是由于内部的函数还要访问自执行函数中的变量，所以自执行函数结束后不会销毁，产生了闭包 closure。
### 关于this对象
- 函数在调用时，其活动对象都会自动获得特殊变量arguments和this,在这个函数内部在搜索变量时，只搜索到活动变量.所以闭包不可能获得直接访问外部函数中的两个变量。
- 我们可以通过把外部作用域中的this和arguments 存放到闭包可以访问的变量。
~~~
var name = 'windows';
var object = {
    name: 'OBJECT',
    getNm: function() {
    //我们把外部函数作用域中this，存放到闭包可以访问到的变量。
       // var that = this;
        return function () {
           
           // return that.name;
           return this.name;
        }
    }
};
console.log(object.getNm()());  // window，匿名函数一般this指向window
console.log(object.getNm()());  //OBJECT
~~~
### 一句话形容闭包
- 闭合是一种现象：当一个作用域中访问到另一个作用域中的变量，就产生了闭包现象。
~~~
 // 1.父级函数 包含子级函数，子级函数访问父级函数中的变量 和 通用兄弟函数。
       ;(function(){
           var aa = 12;
           var bb = 13;
           function ss (){
               mm();
               console.log(aa);
               console.log(bb);
           }
           function mm () {
            console.log("嘿嘿");
           }
           ss();
       })();
    // 返回一个函数，然后再外部调用这个返回的函数。
        function ss () {
            var mm = 12;
            return function(){
                return mm;
            }
        }   
     console.log(ss()());
~~~
### 模仿块级作用域
- 模仿块级作用域：所谓的模仿块级作用域就是：利用自执行函数，在函数的内部添加变量。
  函数表达式可以用圆括号包起来。
~~~
(function () {

})();
~~~
- 这样的写法可以减少闭包函数占用内存的问题。
- 闭包函数就是某个函数内部的匿名函数。
- 而自执行函数，没有可以指向匿名函数的引用，因为该匿名函数被自调用了。
- 注意：
  使用多个自调用函数时，一定要在调用后面加；分号，表示语句执行结束，否则解释器会把上一个自调用函数的返回值（undefined）当作下一个自调用函数的声明进行调用。
~~~
// 自执行函数A
        (function(){
            console.log(1);
            
        })()
        // 上述代码执行完毕后返回值undefined，
        // 此时系统会把B的小括号前面的undefined，当作函数调用。
        // 自执行函数B
       undefined(function(){   //出错
            console.log(2);
        })()
~~~
- 注意：规范性的写法：
- 在自调用函数前面加分号 ； ，放止自调用函数与不确定的值进行结合。
#### 自调用函数规范
- 自调用函数传入参数的目的：是让变量名可以压缩。
- 在老版本的浏览器中 undefined 可以被重新赋值
- 传入undefined，防止undefined的值被改变。
~~~
;(function(window,undefined){
    var tools = {
        getRandom: function (min, max) {
            max = Math.floor(max);
            min = Math.ceil(min);
          return Math.floor(Math.random() * (max - min +1) + min);  
         }
     };
     window.tools = tools;
   })(window,undefined);
~~~
### 如何访问私有变量
- 函数内部定义的变量和函数都是私有的，不能被其他函数访问，除了内部的闭包函数。
- 但是我们可以，利用return 返回一个对象。
- 这个对象里面被赋值了，函数内部的私有变量。
~~~
function mm () {
            //私有变量和私有函数
            var ss = 'aaa';
            var bb = 111;
            function qwe () {
                alert('qwe')
            }
           //可以返回闭包函数，这样就能在外部调用私有变量和函数。
          /*  return function () {
               return [ss,bb,qwe]
           } */
             //定义一个对象，把私有变量和函数赋值给它
            var obj = {};
            obj.pub = function() {
                ss++;
                return qwe ();
            }
            return obj; 
        }
    /* var nn =  mm ();
    console.log(nn());
    var ll = nn();
    ll[2]();
     */
         var pp = mm();
         pp.pub();
~~~