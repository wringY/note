### 声明变量的两个关键字
#### let
- let声明的变量不存在预解析
~~~
console.log(flag); // undefined 
// var flag = 123; 
// let flag = 456;  //不存在预解析会报错
~~~
- let声明的变量不允许重复（在同一个作用域内）
~~~javascript
// var flag = 123;
// var flag = 456;
// console.log(flag);  //456
------------------------------
// let flag = 123;
// let flag = 456;
// console.log(flag); //会输出标识符已经被声明了
~~~
- ES6引入了块级作用域，块内部定义的变量，在外部是不可以访问的。
- 什么情况下会生成块，在一对花括号内部就是块。
~~~javascript
// if(true){
//     // var flag = 123;
// 
// }
//console.log(flag);  //ES3和ES5不存在块级作用域，只有全局作用域和函数作用域
--------------------------------------
// if(true){
//     let flag = 123;
// 
// }
console.log(flag); // 会报错，因为块级作用域内部的变量，外部访问不到。
--------------------
// for (let i = 0; i < 3; i++) {
//     // for循环括号中声明的变量只能在循环体中使用
//     console.log(i);
// }
// console.log(i); 每次循环都开辟一个独立的块级作用域，。
---------------------
在块级作用域内部，变量只能先声明再使用
// if(true){
//     console.log(flag);
//     let flag = 123;
// }
~~~
#### const
-  const用来声明常量
-  const声明的常量必须初始化,且不能重新赋值
### 变量解构赋值
~~~javascript
之前我们是这样做的
// var a = 1;
// var b = 2;
// var c = 3;

// var a = 1,b = 2,c = 3;
~~~
####  数组形式的解构赋值
~~~javascript
用var声明的变量，也存在这种赋值方式
//var [a,b,c] = [1,2,3];
//console.log(a,b,c);
-----------
// let [a,b,c] = [1,2,3]; //相当于声明了3个变量，并赋值。
// let [a,b,c] = [,123,]; //相等于声明了3个变量，并且a和c是undefined，c是123
// let [a=111,b,c] = [,123,]; //相当于给a一个默认值111，当a没有赋值的时候就是默认值，如果赋值就是新的赋值。
~~~
#### 对象形式的解构赋值
~~~javascript
用var声明的变量，也存在这种赋值方式
var {a,b,c} = {a:1,b:2,c:3};
console.log(a,b,c);
-----------------
// let {foo,bar} = {foo : 'hello',bar : 'hi'};
//没有顺序影响
// let {foo,bar} = {bar : 'hi',foo : 'hello'};
 对象属性别名(如果有了别名，那么原来的名字就无效了)
// let {foo:abc,bar} = {bar : 'hi',foo : 'nihao'};
// console.log(foo,bar);
// 对象的解构赋值指定默认值
let {foo:abc='hello',bar} = {bar : 'hi'}; //相等于给了一个默认值，如果没有赋值的时候就是默认值。
console.log(abc,bar);
~~~
- 对象的属性或方法和对象的解构赋值
  比如Math对象有许多属性和方法，我们使用的时候需要Math.属性的形式进行调用，为了方便我们可以把对象的属性和方法与对象本身进行解构赋值，这样我们就可以直接使用对象的属性，而不需要对象.属性的形式。
~~~javascript
//注意：属性和对象必须是对应的，要确保对象里面有这个属性。
let {cos,sin,random} = Math;
console.log(typeof cos);
console.log(typeof sin);
console.log(typeof random);
console.log(random(1,10));
-------------------
 let ss = {
	username:'zs',
   age:18
 }
const {username,age} = ss;
console.log(username);
--------- 
//还有基本包装类型，如字符串，number等，可以进行对象的解构赋值
//let {length} = "asdsds";
//console.log(length);
~~~
#### 字符串解构赋值
我们可以把字符串中的每个字符，赋值给各个变量
~~~javascript
//我们甚至可以，给字符串加一个长度属性length
	let [a,b,c,d] = 'qwer';
    console.log(a,b,c,d,);
    let {length} = 'qwer';
    console.log(length);
~~~
###  字符串相关扩展(api)
- includes() 判断字符串中是否包含指定的字串（有的话返回true，否则返回false）
  参数一：匹配的字串；参数二：从第几个开始匹配(可以不写，默认从索引为0开始)

- startsWith()  判断字符串是否以特定的字串开始

- endsWith()  判断字符串是否以特定的字串结束

- **padStart() **用于头部补全；接受两个参数：

  第一个参数是用来指定字符串的长度，如果该值低于当前字符串的长度，则将按原样返回当前字符串

  第二个参数是用来补全的字符串，如果此字符串太长而无法保持在目标长度内，则会截断该字符串并应用最左侧的部分，如果省略，将会用空格补全。

- **padEnd()** 用于尾部补全。接受两个参数：

  第一个参数是用来指定字符串的长度，如果该值低于当前字符串的长度，则将按原样返回当前字符串

  第二个参数是用来补全的字符串，如果此字符串太长而无法保持在目标长度内，则会截断该字符串并应用最左侧的部分，如果省略，将会用空格补全。
~~~javascript
console.log('hello world'.includes('world',7));
var ss = "hello world";
console.log(ss.includes("world"));
~~~
### 字符串模板
- 在以往我们拼接字符串是需要通过 + 号来完成的。如：
~~~javascript
let obj = {
    username : 'lisi',
    age : '12',
    gender : 'male'
}

let tag = '<div><span>'+obj.username+'</span><span>'+obj.age+'</span><span>'+obj.gender+'</span></div>';
console.log(tag);  //这个结果就是一个字符串的拼接
~~~
- 现在我们可以这么使用
~~~javascript
let obj = {
    username : 'lisi',
    age : '12',
    gender : 'male'
}
let fn = function(info){
    return info;
}
// 反引号表示模板，模板中的内容可以有格式（空格或换行等），通过${}方式填充数据,${}里面支持一些简单的表单式运算。
let tpl = `
    <div>
        <span>${obj.username}</span>
        <span>${obj.age}</span>
        <span>${obj.gender}</span>
        <span>${1+1}</span>
        <span>${fn('nihao')}</span>
    </div>
`;
console.log(tpl);  // 就是有格式的字符串
~~~
### 函数相关的扩展
#### 参数默认值
- 在之前我们想在函数的没有传入参数时，给函数参数一个默认值，我们需要这么做
~~~javascript
// function foo(param){
//     let p = param || 'hello';
//     console.log(p);
// }
// foo('hi');  
~~~
- 在ES6中我们可以这么做
~~~javascript
//param = 'nihao' 就是函数的形参 = 默认值，就相当于给形参一个默认值。 
// function foo(param = 'nihao'){
//     console.log(param);
// }
// foo('hello kitty');
~~~
#### 参数解构赋值
- 当我们传递给函数多个参数时
~~~javascript
// function foo(uname='lisi',age=12){
//     console.log(uname,age);
// }
// // foo('zhangsan',13);
// foo();
当传递多个参数时会很麻烦，我们可以这么写
我们把参数写成对象形式，然后再赋值给一个空对象
// function foo({uname='lisi',age=13}={}){
//     console.log(uname,age);
// }
// foo({uname:'zhangsan',age:15});
~~~
#### rest参数（剩余参数）
- 函数中实参与形参数量可以是不匹配的，我们可以在函数的arguments中查看，函数传过来的所有实参。
- rest参数与扩展运算符好比互逆运算
~~~javascript
function ss (a,b,c) {
    console.log(arguments);
    
    console.log(a,b,c);
 }
 ss(1,2,3,4,5,6,7);
~~~
- 现在ES6中我们可以私有剩余参数的形式，去获取这些多余的实参。
  **剩余参数以扩张运算符+参数名组成，这样多余的实参就会组成一个数组**。
~~~javascript
function foo(a,b,...param){
    console.log(a);
    console.log(b);
    console.log(param); // [3,4,5]
}
foo(1,2,3,4,5);
~~~
#### 扩展运算符（...）
- 在一个函数有多个形参的情况下，我们需要传入同样数量的实参
~~~javascript
function foo(a,b,c,d,e,f,g){
    console.log(a + b + c + d + e + f + g);
}
// foo(1,2,3,4,5,6,7);
~~~
- 如果我们想把数组作为实参传过去，我们可以采用 函数的apply方法
~~~javascript
function foo(a,b,c,d,e,f,g){
    console.log(a + b + c + d + e + f + g);
}
let arr = [1,2,3,4,5,6,7];
// foo.apply(null,arr)
~~~
- 现在我们可以使用扩展运算符
~~~javascript
function foo(a,b,c,d,e,f,g){
    console.log(a + b + c + d + e + f + g);
}
let arr = [1,2,3,4,5,6,7];
foo(...arr);  
console.log(...arr); // 一个数组前面添加了扩展运算符，那么就会被拆分一个参数一个参数的形式
~~~
- 根据这个特性我们可以实现两个数组的合并操作
~~~javascript
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1,...arr2];
console.log(arr3); //[1,2,3,4,5,6]
~~~
#### 箭头函数
- 我们需要拿普通函数与箭头函数进行对比
~~~javascript
//普通函数声明
// function foo () {
//     console.log("hello");  
// }
// foo();
// // 这两种方式的函数声明和调用是等价的
//箭头函数声明
// let ff = () => console.log("hi");
// ff();
---------------------
//普通函数，没有return返回值是undefined
function foo (v) {
    return v;
}
console.log(foo(7));
//在箭头函数中，不需要return 
//当有一个参数时，不需要加()
let ss = v => v;
console.log(ss(9));
----------
// 多个参数必须用小括号包住
// let foo = (a,b) => {let c = 1; console.log(a + b + c);}
// foo(1,2);
---------- 
//普通匿名函数 与 箭头匿名函数
//一个数组，我们用forEACH迭代,数组每一项都执行这个匿名函数
 //let arr = [123,456,789];
// arr.forEach(function(element,index){
//     console.log(element,index);
// });
//这是箭头匿名函数
// arr.forEach((element,index)=>{
//     console.log(element,index);
// });
~~~
##### 箭头函数的注意事项
- 1、ES6中普通函数，还是谁调用指向谁，只不过执行代码执行环境不一样，指向的东西也发生变化
  当我们声明一个函数时，此时这个函数内部的this就指向了nodejs的环境，我们一般用不到。所以我们经常需要修改箭头函数中的this
~~~javascript
function foo () {
    console.log(this); //这里的this执行nodejs环境
}
foo();
-----------------
var ss = {
    fun:function(){
        console.log(this); 
    }
}
ss.fun(); //指向ss这个对象
-------------------
// function foo(){
//     // 使用call调用foo时，这里的this其实就是call的第一个参数
//     // console.log(this);
// }
// foo.call({num:1});
----------------
 定时器函数中的this，指向一个node特殊生成的定时器对象。
setTimeout(function(){
    console.log(this);  
},1000)
~~~
- 2、箭头函数中this取决于函数在哪个环境下定义的，而不是调用。

  **箭头函数的this是在定义函数时绑定的，不是在执行过程中绑定的。简单的说，函数在定义时，this就继承了定义函数的对象。**
~~~javascript
// 1、箭头函数中this取决于函数的定义，而不是调用
// function foo(){
//     // 使用call调用foo时，这里的this其实就是call的第一个参数
//     // console.log(this);
//     setTimeout(()=>{
//         console.log(this.num); //这里的this，就是在foo环境下定义时得this。
//     },100);
// }
// foo.call({num:1});
~~~
- 3、箭头函数不可以new
~~~javascript
// let foo = () => { this.num = 123;};
// new foo();  //这种情况是错误的
~~~
- 4、箭头函数不可以使用arguments获取参数列表，可以使用rest参数代替
~~~javascript
// let foo = (a,b) => {
//     // console.log(a,b);
//     console.log(arguments);//这种方式获取不到形参列表
// }
// foo(123,456);
--------------------
let foo = (...param) => {
    console.log(param);
}
foo(123,456 );
~~~
- 5、箭头函数后面不加大括号，默认只能有一行代码，默认return; 箭头函数后面加大括号，默认没有return;
  如果箭头函数后面不加大括号直接返回一个对象，let res4 = () => {key: value} //undefined，需要用()将这个对象包起来，let res5 = () => ({key: value}) //{key: value}
- 6、如果箭头函数在定义时没有父级作用域，那么箭头函数中的this指向window。
### 类与继承
- 在es5中没有明确的类的概念，ES6中明确提出了类
~~~javascript
普通创建类以及实现继承
function Animal(name){
    this.name = name;
}
Animal.prototype.showName = function(){
    console.log(this.name);
}
var a = new Animal('Tom');
a.showName();
var a1 = new Animal('Jerry');
a1.showName();
--------------------------
 class Animal{
//     // 静态方法(静态方法只能通过类名调用，不可以使用实例对象调用)
   		//比如Math对象里面的方法	
//     static showInfo(){
//         console.log('hi');
//     }
//     // 构造函数：就当作是接收实参。 //如果没有设置构造函数，就不能接收实参。
//     constructor(name){
//         this.name = name;
//     }

//     showName(){
//         console.log(this.name);
//     }
// }
// let a = new Animal('spike');
// a.showName();
// a.showInfo();  //这种会出错的，因为实例化对象无法调用函数的静态成员
// Animal.showInfo();
~~~
- 如何实现继承：
~~~javascript
class Animal{
    // 静态方法(静态方法只能通过类名调用，不可以使用实例对象调用)
    static showInfo(){
        console.log('hi');
    }
    // 构造函数
    constructor(name){
        this.name = name;
    }

    showName(){
        console.log(this.name);
    }
}
let a = new Animal('spike');
a.showName();
a.showInfo();
Animal.showInfo();
// ------------------------------
class Animal {
    static showinfo () {
        console.log("hi");
    }
   constructor(name){
    this.name = name;
    this.action = "咬人"; //属性需要定义在这个地方
   }
   showName() {
       console.log(this.name);  
   }
}
//类的继承extends
//如何把Animal中的数性和方法扩展到Dog类里面
// 想把Animal类里面的方法扩展到Dog类里面，需要这么做：
// 1.创建类Dog 扩展关键字 extends  父类写在后面
// 2. 在constructor中接收父类需要的参数，然后用super调用父类
// 这样我们就可以，在Dog类实例化的对象里面，调用父类的属性和方法了
class Dog extends Animal {

constructor(name,color) {
    //调用父类
    super(name);
    this.color =color;
    }
showColor(){
    console.log(this.color);
    }
}
let a = new Dog("duoduo","yellow");
a.showColor();
Dog.showinfo();
a.showName();
console.log(a.action);
~~~
### ES6中定义属性和方法的快捷方式

~~~
let name = 'zs';
let age = 18;
function show () {
	console.log('hi');
}
------------以前我们是这样把上面变量和函数挂载到对象上
var obj = {
  name: name,
  age:age,
  show:show
}
--------------在ES6中我们可以这样挂载,与上面的代码是等效的。
//在底层会这样解析：把变量名当作属性名，把变量值当作属性值。
var obj = {
  name,  //等价于 name: 'zs'
  age,
  show,
  say: function(){  //等价的
  	console.log(1);
	}
}
//我们还可以使用简单语法来声明一个函数
var obj = {
  name,  //等价于 name: 'zs'
  age,
  show,
  say(){       //等价的
  	console.log(1);
	}
}
~~~

### promise

- 为什么需要promise?
- 首先因为我们发送请求的时候都是异步的，如果我们发送了多次异步请求。那么多次异步调用的结果顺序不确定，因为需要响应需要耗时，所以多次异步调用的结果不一定是我们代码书写的结果。
- 在实际开发中，我们有时候希望多次异步调用的结果是按照我们指定的顺序，因此这些异步调用就产生了依赖。比如：当A请求响应后，在其回调函数中发送B请求，在B请求响应后再其回调函数调用C请求。这样多次异步处理的结果就是我们希望的结果。但是会产生请求依赖，当前请求依赖的嵌套过于复杂时，我们的代码就没有可读性了。

~~~javascript
$.ajax({
      url: 'http://localhost:3000/data',
      success: function(data) {
        console.log(data)
        $.ajax({
          url: 'http://localhost:3000/data1',
          success: function(data) {
            console.log(data)
            $.ajax({
              url: 'http://localhost:3000/data2',
              success: function(data) {
                console.log(data)
              }
            });
          }
        });
      }
    });
~~~

- promise:主要解决异步深层嵌套的问题。promise 提供了简洁的API  使得异步操作更加容易

#### promise的基本用法

- 从语法上讲promise是一个对象，我们需要通过Promise构造函数实例化一个promise实例对象。

~~~
let promise = new Promise();
~~~

- 我们在实例化Promise，需要传入一个参数`executor`,它是一个执行器函数，它有两个参数`resolve`和`reject`

resolve，reject， 分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

~~~javascript
   //promise是承诺的意思，我们规定好异步处理成功执行哪个方案，异步处理失败执行哪个方案.
        //promise是构造函数Promise的实例对象。
        let promise = new Promise(
            //executor
            function(resolve,reject){
                //成功时调用 resolve
                //失败时调用 reject     
        } 
        );
~~~

#### resolve、reject

- 我们已经规定了当异步处理成功执行resolve，当异步处理失败执行reject。那么它会做些什么呢？
- 当我们执行resolve()，会把promise实例的状态设置为fulfilled(完成的) ；如果我们执行reject(),会把promise实例的状态设置为rejected(失败的)。

#### promise的状态分析

- 我们**可以把Promise对象看成是一条工厂的流水线**，对于流水线来说，从它的工作职能上看，它只有三种状态，一个是初始状态（刚开机的时候），一个是加工产品成功，一个是加工产品失败（出现了某些故障）。同样对于Promise对象来说，它也有三种状态：

1. pending：初始状态,也称为未定状态，就是初始化Promise时，调用executor执行器函数后的状态。
2. fulfilled：完成状态，意味着异步操作成功。
3. rejected：失败状态，意味着异步操作失败。

- 它只有两种状态可以转化，即
  - 操作成功：*pending -> fulfilled*
  - 操作失败：*pending -> rejected*
  - 并且这个状态转化是**单向的，不可逆转**，已经确定的状态（fulfilled/rejected）无法转回初始状态（pending）。

#### Promise.prototype.then()

- Promise对象含有then方法，**then()调用后返回一个Promise对象**，意味着实例化后的Promise对象可以进行**链式调用**，而且这个then()方法可以接收两个函数，一个是处理成功后的函数，一个是处理错误结果的函数。

~~~javascript
  function queryDate(url){
            let promise = new Promise(function(resolve, reject){
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                  if(xhr.readyState !=4) return;
                    if(xhr.status === 200 && xhr.readyState === 4) {
                        //如果是正常的请况，我们需要把数据传递给resolve
                        resolve(xhr.responseText);
                    }else {
                        reject('请求失败')
                    }
                };
                xhr.open('get', url);
                xhr.send(null)
            });
            return promise;
        }
        //===============   这是基本用法   ==============
        // queryDate('http://localhost:3000/data').then(function(data){
        //         //这是异步处理成功
        //         console.log(data);   
        // },function(info){
        //     //异步处理失败
        //     console.log(info); 
        // })
        // ===========================  这是异步嵌套  ========
        //现在我们只关心成功的情况
        queryDate('http://localhost:3000/data').then(function(data){
                //这是异步处理成功
                console.log(data);
                //再次调用 queryDate 函数
                //如果我们在then方法返回一个新的promise，那么后面的then都是被新的promise调用
               return  queryDate('http://localhost:3000/data1');  //这里返回的是promise
        }).then(function(data1){
            //这是异步处理成功
            console.log(data1);
            //再次调用 queryDate 函数
            return  queryDate('http://localhost:3000/data2');
        }).then(function(data2){
            console.log(data2);
            return  queryDate('http://localhost:3000/data3');
        }).then(function(data3){
            console.log(data3);
            //此时异步嵌套处理完毕
        })
~~~

- **promise其实就是把我们之前的异步嵌套用then重构了，我们就可以在then中去处理其他异步，这样我们的代码就不再是多层的嵌套，而是变成了线性结构**。

- 在then中我们最需要关心的是promise的状态：在then中我们会修改promise的状态。

- **返回的这个Promise对象的状态主要是根据promise.then()方法返回的值**，大致分为以下几种情况：

  1. ***如果then()方法中返回了一个参数值，那么返回的Promise将会变成接收状态**。
  2. 如果then()方法中抛出了一个异常，那么返回的Promise将会变成拒绝状态。
  3. 如果then()方法调用resolve()方法，那么返回的Promise将会变成接收状态。
  4. 如果then()方法调用reject()方法，那么返回的Promise将会变成拒绝状态。
  5. 如果then()方法返回了一个未知状态(pending)的Promise新实例，那么返回的新Promise就是未知状态。
  6. 如果then()方法没有明确指定的resolve(data)/reject(data)/return data时，那么返回的新Promise就是接收状态，可以一层一层地往下传递。
  7. **如果我们在then方法返回一个新的promise，那么后面的then都是被新的promise调用**。

  ~~~javascript
  queryData('http://localhost:3000/data')
        .then(function(data){
          return queryData('http://localhost:3000/data1');
        })
        .then(function(data){
    		//我们在then方法返回一个新的promise，那么后面的then都是被新的promise调用
          return new Promise(function(resolve, reject){
            setTimeout(function(){
              resolve(123);
            },1000)
          });
        })
        .then(function(data){
    			//所以我们可以获得在上一个then方法中return的 新的promise
          	console.log(data) //123
    			//如果then()方法中返回了一个普通值，那么返回的Promise将会变成接收状态
    			return 'hello';
        })
  	.then(function(data){
    		//我们可以接受上个then中返回的 普通值
          console.log(data)   //hello
        })
  ~~~

#### Promise.prototype.catch()

- catch()方法和then()方法一样，都会返回一个新的Promise对象，它主要**用于捕获异步操作时出现的异常**。因此，我们通常省略then()方法的第二个参数，把错误处理控制权转交给其后面的catch()函数:

~~~javascript
    function foo() {
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          // resolve(123);
          reject('error');
        }, 100);
      })
    }
     foo()
      .then(function(data){
        console.log(data)
      })
      .catch(function(data){
      //catch()方法可以捕获在这一条Promise链上的异常
         console.log(data)
       })
		//finally()成功与否都会执行（尚且不是正式标准）
       .finally(function(){
         console.log('finished')
       });
~~~

#### Promise.all()

- Promise.all()接收一个参数，它必须是**可以迭代的**，比如**数组**。

  它通常用来处理一些并发的异步操作（一次触发多个异步任务），即它们的结果互不干扰，但是又需要异步执行。它最终只有两种状态：**成功或者失败**。

  它的状态受参数内各个值的状态影响，即里面状态全部为`fulfilled`时，它才会变成`fulfilled`，否则变成`rejected`。

  成功调用后返回一个数组，数组的值是**有序**的，即按照传入参数的数组的值操作后返回的结果。如下：

~~~javascript
    function queryData(url) {
      return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if(xhr.readyState != 4) return;
          if(xhr.readyState == 4 && xhr.status == 200) {
            // 处理正常的情况
            resolve(xhr.responseText);
          }else{
            // 处理异常情况
            reject('服务器错误');
          }
        };
        xhr.open('get', url);
        xhr.send(null);
      });
    }
    var p1 = queryData('http://localhost:3000/a1');
    var p2 = queryData('http://localhost:3000/a2');
    var p3 = queryData('http://localhost:3000/a3');
     Promise.all([p1,p2,p3]).then(function(result){
       console.log(result)
     })
----------------------------------体现成功调用后返回数组的有序性--------------------------
// 置为fulfilled状态的情况
var arr = [1, 2, 3];
var promises = arr.map(function(e) {
  return new Promise(function(resolve, reject) {
    resolve(e * 5);
  });
});

Promise.all(promises).then(function(data) {
    // 有序输出
  console.log(data); // [5, 10, 15]
  console.log(arr); // [1, 2, 3]
});
~~~

#### Promise.race

- Promise.race()和Promise.all()类似，都接收一个可以迭代的参数，但是**不同之处是Promise.race()的状态变化不是全部受参数内的状态影响，一旦参数内有一个值的状态发生的改变，那么该Promise的状态就是改变的状态**。就跟`race`单词的字面意思一样，谁跑的快谁赢

~~~javascript
var p1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 300, 'p1 doned');
});

var p2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 50, 'p2 doned');
});

var p3 = new Promise(function(resolve, reject) {
  setTimeout(reject, 100, 'p3 rejected');
});

Promise.race([p1, p2, p3]).then(function(data) {
  // 显然p2更快，所以状态变成了fulfilled
  // 如果p3更快，那么状态就会变成rejected
  console.log(data); // p2 doned
}).catch(function(err) {
  console.log(err); // 不执行
});
~~~

#### Promise.resolve()

- Promise.resolve()接受一个参数值，可以是`普通的值`，`具有then()方法的对象`和`Promise实例`。正常情况下，它返回一个Promise对象，状态为`fulfilled`。但是，当解析时发生错误时，返回的Promise对象将会置为`rejected`态。如下：

~~~javascript
// 参数为普通值
var p4 = Promise.resolve(5);
p4.then(function(data) {
  console.log(data); // 5
});


// 参数为含有then()方法的对象
var obj = {
  then: function() {
    console.log('obj 里面的then()方法');
  }
};

var p5 = Promise.resolve(obj);
p5.then(function(data) {
  // 这里的值时obj方法里面返回的值
  console.log(data); // obj 里面的then()方法
});


// 参数为Promise实例
var p6 = Promise.resolve(7);
var p7 = Promise.resolve(p6);

p7.then(function(data) {
  // 这里的值时Promise实例返回的值
  console.log(data); // 7
});

// 参数为Promise实例,但参数是rejected态
var p8 = Promise.reject(8);
var p9 = Promise.resolve(p8);

p9.then(function(data) {
  // 这里的值时Promise实例返回的值
  console.log('fulfilled:'+ data); // 不执行
}).catch(function(err) {
  console.log('rejected:' + err); // rejected: 8
});
~~~

#### Promise.reject()

- Promise.reject()和Promise.resolve()正好相反，它接收一个参数值`reason`，即*发生异常的原因*。此时返回的Promise对象将会置为`rejected`态。如下：

~~~javascript
var p10 = Promise.reject('手动拒绝');
p10.then(function(data) {
  console.log(data); // 这里不会执行，因为是rejected态
}).catch(function(err) {
  console.log(err); // 手动拒绝
}).then(function(data) {
 // 不受上一级影响
  console.log('状态：fulfilled'); // 状态：fulfilled
});
~~~

- **总之，除非Promise.then()方法内部抛出异常或者是明确置为rejected态，否则它返回的Promise的状态都是fulfilled态，即完成态，并且它的状态不受它的上一级的状态的影响。**

#### 总结

大概常用的方法就写那么多，剩下的看自己实际需要再去了解。

解决Node回调地狱的不止有`Promise`，还有`Generator`和ES7提出的`Async`实现

### fetch

- Fetch API是新的ajax解决方案， Fetch会返回Promise，也就是fetch支持promise的语法格式和其api
- **fetch不是ajax的进一步封装，而是原生js，不使用XMLHttpRequest对象**。

#### fetch的兼容性
![](./img/fetch兼容性.png)
#### fetch的基本用法

- fetch(url, options).then()
- HTTP协议，它给我们提供了很多的方法，如POST，GET，DELETE，UPDATE，PATCH和PUT


- text方法属于fetchAPI的一部分，它返回一个promise实例对象，用于获取后台数据

~~~javascript
fetch('http://localhost:3000/fdata').then(function(data){
      // text()方法属于fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台返回的数据
  		//我们不能直接在这里获取数据，必须返回 data.text()的调用结果
      return data.text();
    }).then(function(data){
  	//在这里才可以获取最终的数据
      console.log(data);
    })
~~~

#### fetch的配置选项

- 我们在发送请求的时候，经常需要指定请求方式，携带参数，指定返回数据格式。因此我们需要设置配置选项。
- method(String)------请求使用的方式，默认是Get
- body(String)------HTTP请求的参数
- headers(Object)-----HTTP的请求头，默认{}
- get请求携带参数

~~~javascript
//常见传统url传参
fetch('http://localhost:3000/fdata?id=123',{
//默认就是get
  method: 'get'
})
.then(function(data){
 return data.text();
})
.then(function(data){
  	console.log(data)
})
//restful 风格 url
fetch('http://localhost:3000/fdata/123',{
//默认就是get
  method: 'get'
})
.then(function(data){
 return data.text();
}).
then(function(data){
  	console.log(data)
})
~~~

- post请求携带参数，设置请求头信息

~~~javascript
//x-www-form-urlencoded传参格式
fetch('http://localhost:3000/fdata/123',{
  method: 'post',
  body: 'uname=lisi&pwd=123',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(function(data){
 return data.text();
}).
then(function(data){
  	console.log(data)
})
//json格式传参
fetch('http://localhost:3000/fdata/123',{
  method: 'post',
  body: JSON.stringify({
      uname: 'lisi',
      pwd: '456'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(function(data){
 return data.text();
}).
then(function(data){
  	
~~~

- 设置相应数据格式
- 在上面我们得到的响应数据都是text文本，我们也可以获取json格式的字符串

~~~javascript
fetch('http://localhost:3000/json',{
	method: 'get',
	headers: new Headers({
      'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
    })
}).then(function(data){
  //这里调用fetchAPI的json方法
      return data.json();
    }).then(function(data){
       console.log(data.uname)
       console.log(typeof data)
      var obj = JSON.parse(data);
      console.log(obj.uname,obj.age,obj.gender)
    })
~~~

#### 强制带Cookie

- 默认情况下, fetch 不会从服务端发送或接收任何 cookies, 如果站点依赖于维护一个用户会话，则导致未经认证的请求(要发送 cookies，必须发送凭据头).

~~~javascript
// 通过fetch获取百度的错误提示页面
fetch('https://www.baidu.com/search/error.html', {
    method: 'GET',
    credentials: 'include' // 强制加入凭据头
  })
  .then((res)=>{
    return res.text()
  })
  .then((res)=>{
    console.log(res)
  })
~~~

```
fetch是一个低层次的API，你可以把它考虑成原生的XHR，所以使用起来并不是那么舒服，需要进行封装。
1）fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
2）fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
4）fetch没有办法原生监测请求的进度，而XHR可以
```