# 继承
继承分为两种：
- 接口继承和实现继承。
- 接口继承：只继承方法签名。
- 实现继承：继承实际的方法。
- 由于函数没有接口，所以我们JS只支持实现继承。
- 继承的目的：把子类中共同的成员提取到父类型中，代码重用。
## 原型链
- 原生链是实现继承的主要方法。
- 原生链的基本思想：利用原型 让一个引用类型继承另一个引用类型的属性和方法。
- 就是把一个引用类型（类、构造函数）的原型，等于另一个实例，然后通过原生链继承另一个原型的方法和属性。
### 继承与原生链的例子
~~~
  //原生链是怎么构成的。
    function  Fun1 () {
        this.property = true;     //设置构造函数实例中的property属性。
    }
    
    //此时 Fun1的原型对象，里面只有继承Object类的方法，和constructor属性指向构造函数实例Fun1。
    Fun1.prototype.getFun1Value = function () {
    return this.property;   //给 Fun1 原型对象中，添加一个方法。
    };
    //此时 Fun1的原型对象，里面有继承Object类的方法，和constructor属性 和 getFun1Value方法。
    function Fun2 () {
        this.fun2property = false;
    }
    //继承了Fun1
    Fun2.prototype = new Fun1();
    //Fun2的原型是 Fun1构造函数的实例，所以Fun2.prototype 里面有 Fun1实例的如下属性：
    //内部指针[[prototy]]，指向Fun1的原型，我设置的property属性。

    Fun2.prototype.getFun2Value = function () {
        return this.fun2property;
    };
    //给Fun2的原型即Fun1构造函数的实例，添加新的getFun2Value方法。
    //此时Fun2的原型里面有如下属性：
    //内部指针[[prototy]]，指向Fun1的原型；我设置的property属性；添加的getFun2Value方法。
    var fun3 = new Fun2();
    console.log(fun3.getFun1Value()); //true

//注意：Fun2.prototype 原型被修改了。Fun2.prototype 原型指向了另一个原型（Fun1.prototype ），而这个原型的
constructor指向了这个Fun1这个构造函数。

    //访问fun3.getFun1Value方法的流程：现在fun3实例中寻找，然后再搜索Fun2.prototype，然后再搜索Fun1.prototype。
~~~
#### 确定原型和实例的关系
~~~
alert(fun3 instanceof Object);
alert(fun3 instanceof Fun1);
alert(fun3 instanceof Fun2);
~~~
- 由于原型链的关系，所以 fun3是 Object、Fun1、
- Fun2构造函数的一个实例。
---------------------------------
- 可以使用isPrototypeOf的方法，只要是原型链中出现过的原型，都可以说是该实例的原型。
~~~
console.log(Object.prototype.isPrototypeOf(fun3));
console.log(Fun1.prototype.isPrototypeOf(fun3));
console.log(Fun2.prototype.isPrototypeOf(fun3));
~~~
#### 原生链的问题
1. 因为原生链的关键就是把原型替换为别的构造函数实例。这就导致了，构造函数实例里面的属性，作为原型被共享了。
2. 原型继承无法设置构造函数的参数。
- 注意：尤其实例属性是引用类型（如数组），我们不能在希望这种类型能被所有实例共享。
#### 需要注意的问题
1. 在写原生链时：有时需要覆盖超类型中的某个方法，或者添加超类型中不存在的方法，必须先替换原型，在给超类型添加新方法。
~~~
function  Fun1 () {
    }
    
    Fun1.prototype.getFun1Value = function () 	{
    return this.property;   //给 Fun1 原型对象中，添加一个方法。
    };

    function Fun2 () {
    }
   
    Fun2.prototype = new Fun1(); //替换原型
   
    Fun2.prototype.getFun2Value = function () {  //给原型添加新方法
        return  'aaa';
    };
    //重写超类型的方法
    //超类型的方法，被覆盖了。也就是说fun3获得到的getFun1Value方法是重写的方法。
    Fun2.prototype.getFun1Value = function () { 
        return 1;
    }
    var fun3 = new Fun2();
     // 从fun3获得到的getFun1Value方法是重写的方法。
    console.log(fun3.getFun1Value());
    var fun4 = new Fun1(); //fun4是Fun1的实例。
    //从fun4 获得到的getFun1Value方法是被覆盖的方法。
    console.log(fun4.getFun1Value());  
~~~
2. 在写原生链时：不能使用字面量{} 添加新方法。
~~~
Fun2.prototype = {
方法。。。。
}
~~~
### 借用构造函数
- 借用构造函数可以很好的解决原生链的负面影响。
- 借用构造函数的实质：
- 不再把 构造函数的实例作为原型 而是借用构造函数，这样通过构造函数继承了原型。
- 这样做的好处：避免了函数实例作为原生链中的一环时，实例的引用属性（数组）被别的派生的实例共享了。
#### 例子
~~~
function Fun1 (name) {
    this.name = name;
}
//借用构造函数
function Fun2 () {
//继承了Fun1，同时还传递了参数
Fun1.call(this,'AAA');
//实例属性
this.age = 12;
}
var fun3 = new Fun2();
console.log(fun3.name);
console.log(fun3.age);
//注意借用构造函数，应该先借用，在添加实例。
~~~
#### 借用构造函数的问题
- 借用构造函数的问题:
- 所有的方法都在构造函数中，因此函数就不具有复用性了（就是共享方法）。
###组合继承
- 组合继承的概念：就是属性使用借用函数；需要共享的方法和属性通过原生链。
~~~
  function Fun1 (name) {
        this.name = name;
        this.color = ['red', 'blue', 'green'];
    }
    Fun1.prototype.sayName = function () {   //给原型添加新方法。
        console.log(this.name);      
    };
    function Fun2 (name,age) {
        //继承属性，借用构造函数
        Fun1.call(this,name);
        //添加实例属性
        this.age = age;
    }
    //通过原生链继承方法
    Fun2.prototype = new Fun1();
    Fun2.prototype.sayAge = function () {
        console.log(this.age);
        
    };
    var fun3 = new Fun2('AAA',29);
    fun3.color.push('black');
    console.log(fun3.color);  //['red', 'blue', 'green','black']
    fun3.sayName();   //AAA
    fun3.sayAge();    //29

    var fun4 = new Fun2('BBB',80); 
    console.log(fun4.color);  //['red', 'blue', 'green']
    fun4.sayAge();    //80
    fun4.sayName();   //BBB
    //组合继承的特点：
    // 这样两个Fun2 实例：fun3和fun4，就拥有了各自的属性（color不同），有共享相同的方法sayAge、sayName
    //而且instanceof 还可以识别它们。
~~~
#### 组合继承的缺点
- 组合继承的缺点：
- 调用了两次Fun1函数：第一次是原生链继承第二次是构造函数继承。
- 其实我们不需要第一次调用，我们只需要一个原型的副本。
  第一次调用的时候，会得到位于Fun1原型里面的属性，而且是给原型上添加了属性。
  第二次调用：调用Fun1构造函数，又在在新对象上创建了实例，并创建了属性。
### 原型式继承
#### 简单的原型式继承
~~~
function object (o) {
            function F () {}; //创建一个临时的构造函数。
            F.prototype = o;  //把参数 o 作为构造函数的原型。
            return new F();  //返回构造函数实例
        }
    var person = {
        name: 'AAA',
        color: ['red', 'blue', 'green']
    };
    var person1 = object(person);
    person1.name = 'BBB';
    person1.color.push('black');

    var person2 = object(person);
    person1.name = 'CCC';
    person1.color.push('white');
    console.log(person.color);
    //原生式继承的问题：
    //相当于创建了两个person的副本：person1和person2。
    //问题：引用类型的属性会被共享。
~~~
#### ECMA5中的原型继承Object.create()
~~~
 var person = {
    name: 'AAA',
    color: ['red', 'blue', 'green']
    };
    //Object.create有两个参数：用作新原型的对象，描述符。
    var person1 = Object.create(person,{
        name: {
            value: 'BBB'
        }
    });
    console.log(person1.name);  //BBB
   //这种方法的好处：不要大量的创建构造函数，直接使用该方法生成副本。
问题：引用类型的属性会被共享。
~~~
### 寄生组合模式继承
- 寄生组合模式继承：该模式可以很好的解决，组合继承模式的不足。
- 思路;在于创建一个原型的副本，而不需要在原生链继承时再次调用函数Fun1。所以我们使用寄生模式，创建一个原型的副本，并将其继承Fun2函数。
  function object (o) {
    function F () {}; 
    F.prototype = o; 
    return new F();  
  }
#### 例子
~~~
function object (o) {
            function F () {}; //创建一个临时的构造函数。
            F.prototype = o;  //把参数 o 作为构造函数的原型。
            return new F();  //返回构造函数实例
        }

        //注意使用寄生，必须有一个对象作为新对象的基础，在这里就是Fun1.
        function inprototype (Fun2,Fun1) {
            //利用函数object，返回一个构造函数的实例，
            //在这里就是var prototype = F.prototype=Fun1.prototype。
          var prototype =   object(Fun1.prototype);  
          //给这个原型副本添加constructor，弥补重写原型而默认失去的constructor属性。    
          prototype.constructor = Fun2;
          Fun2.prototype = prototype;  //实现原生链继承
        }
------------------------------------------
        function Fun1 (name) {
            this.name = name;
            this.color = ['red', 'blue', 'green'];
        }
        Fun1.prototype.sayName = function () {   //给原型添加新方法。
        console.log(this.name);      
        };
        function Fun2 (name,age) {
        //继承属性，借用构造函数
        Fun1.call(this,name);
        //添加实例属性
        this.age = age;
        }
        inprototype(Fun2,Fun1);
        Fun2.prototype.sayAge = function () {
        console.log(this.age);
        };
        //注意寄生组合模式继承与组合继承相比，少了一次Fun1的调用。
        //可以提高效率，减少原型上的不必要属性
~~~