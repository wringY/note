## async/awit

- async/awit是ES7的新语法，可以更方便的进行异步操作
- promise虽然避免了node中的回调地狱的现象，但是我们还是需要通过.then的方式实现链式编程去进行异步操作。async/awit可以让我们更加简便的进行异步操作。
- async顾名思义是“异步”的意思，async用于声明一个函数是异步的。而await从字面意思上是“等待”的意思，就是用于等待异步完成。并且await只能在async函数中使用
- 通常async、await都是跟随Promise一起使用的。为什么这么说呢？因为async返回的都是一个Promise对象同时async适用于任何类型的函数上。这样await得到的就是一个Promise对象(如果不是Promise对象的话那async返回的是什么 就是什么)；
- await得到Promise对象之后就等待Promise接下来的resolve或者reject
- **其中async必须用在函数上，await必须用在async的内部**。

### async/awit基本用法

~~~javascript
# 1.  async 基础用法
    # 1.1 async作为一个关键字放到函数前面
	async function queryData() {
      # 1.2 await关键字只能在使用async定义的函数中使用      await后面可以直接跟一个 Promise实例对象。
      //有await标识符的 promise对象，我们不能使用.then的方法了，因为 await会一直等待 Promise 对象成功响应，我们可以直接获取到响应返回的结果（是个对象，我们可以通过ret.data的形式拿到实际的数据）。
      var ret = await new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('nihao')
        },1000);
      })
      return ret;
    }
	# 1.3 任何一个async函数都会隐式返回一个promise   我们可以使用then 进行链式编程
    queryData().then(function(data){
      console.log(data)
    })


	#2.  async    函数处理多个异步函数
    axios.defaults.baseURL = 'http://localhost:3000';

    async function queryData() {
      # 2.1  添加await之后 当前的await 返回结果之后才会执行后面的代码   
      //当await会依次执行，必须等到 await 后面的axios.get返回结果之后，才会执行后面的代码，因此我们可  		以有多个await，并且让下一个await基于上一个await，这样就形成的异步的嵌套，十分优雅
      var info = await axios.get('async1');
      #2.2  让异步代码看起来、表现起来更像同步代码
      var ret = await axios.get('async2?info=' + info.data);
      return ret.data;
    }
	/而且有async标识的函数，会隐式的返回Promise对象，我们也可以通过.then的方式实现链式编程
    queryData().then(function(data){
      console.log(data)
    })
~~~

### async和await在干什么

- 任意一个名称都是有意义的，先从字面意思来理解。async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

- 另外还有一个很有意思的语法规定，await 只能出现在 async 函数中。然后细心的朋友会产生一个疑问，如果 await 只能出现在 async 函数中，那这个 async 函数应该怎么调用？

- 如果需要通过 await 来调用一个 async 函数，那这个调用的外面必须得再包一个 async 函数，然后……进入死循环，永无出头之日……

  如果 async 函数不需要 await 来调用，那 async 到底起个啥作用？

### async 起什么作用

- 这个问题的关键在于，async 函数是怎么处理它的返回值的！

- 我们当然希望它能直接通过 `return` 语句返回我们想要的值，但是如果真是这样，似乎就没 await 什么事了。所以，写段代码来试试，看它到底会返回什么

- 看到输出就恍然大悟了——输出的是一个 Promise 对象。

- ```javascript
  async function testAsync() {
      return "hello async";
  }

  const result = testAsync();
  console.log(result);
  ```

- 所以，async 函数返回的是一个 Promise 对象。从[文档](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function)中也可以得到这个信息。async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，**如果在函数中 `return` 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象**。

- async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，我们当然应该用原来的方式：`then()` 链来处理这个 Promise 对象，就像这样

~~~
testAsync().then(v => {
    console.log(v);    // 输出 hello async
});
~~~

- 现在回过头来想下，如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。
- 联想一下 Promise 的特点——无等待，所以在没有 `await` 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。

### await在等待什么

- 一般来说，都认为 await 是在等待一个 async 函数完成。不过按[语法说明](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await)，await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。
- 因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行。

~~~javascript
function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
~~~

### await 等到了要等的，然后呢

- await 等到了它要等的东西，一个 Promise 对象，或者其它值，然后呢？我不得不先说，`await` 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。
- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 Promise 对象，await 就忙起来了，**它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果，同时会让出当前的JS线程**。
- 看到上面的阻塞一词，心慌了吧……放心，这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。

### 有价值的例子

~~~javascript
 async function async1() {
      console.log( 'async1 start');
      await async2();
      console.log( 'async1 end');
 }
 async function async2() {
      console.log( 'async2');
 }
 console.log( 'script start');
 setTimeout(function() {
      console.log( 'setTimeout');
 }, 0)
 async1();
 new Promise (function ( resolve ) {
      console.log( 'promise1');
      resolve();
 }).then(function() {
      console.log( 'promise2');
 })
 console.log( 'script end')
~~~

- 分析以上代码的打印顺序:

~~~javascript
// 结果为
 script start
 async1 start
 async2
 promise1
 script end
 promise2
 async1 end
 setTimeout
~~~

