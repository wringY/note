# 深入理解redux
- redux中核心就是一个单一的state。state通过闭包的形式存放在redux store中，保证其是只读的。如果你想要更改state，只能通过发送action进行，action本质上就是一个普通的对象.
- 你的应用可以通过redux暴露的subscribe方法，订阅state变化。如果你在react应用中使用redux，则表现为react订阅store变化，并re-render视图。
- 最后一个问题就是如何根据action来更新视图，这部分是业务相关的。 redux通过reducer来更新state，关于reducer的介绍，我会在后面详细介绍。
## 最小化实现REDUX
- 其实写一个redux并不困难。redux源码也就区区200行左右。 里面大量使用高阶函数，闭包，函数组合等知识。让代码看起来更加简短，结构更加清晰。
- 我们要实现的redux主要有如下几个功能：
1. 获取应用state
2. 发送action
3. 监听state变化
- 让我们来看下redux store暴漏的api
~~~js
const store = {
  state: {}, // 全局唯一的state，内部变量，通过getState()获取
  listeners: [], // listeners，用来诸如视图更新的操作
  dispatch: () => {}, // 分发action
  subscribe: () => {}, // 用来订阅state变化
  getState: () => {}, // 获取state
}
~~~
### creteStore
- 我们来实现createStore，它返回store对象， store的对象结构上面已经写好了。createStore是用来初始化redux store的，是redux最重要的api。 我们来实现一下：
~~~js
 // 生成store
    const createStore = (reducer, initValue) => {
        // 初始化数据
        const store = {};
        store.state = initValue;
        store.listeners = [] // 回调队列
        // 实现subscribe：把回调函数放进队列
        store.subscribe = (listener) => {
            store.listeners.push(listener)
        }
        // 实现dispatch: disptach, 接收action对象，把listners里面的回调函数全部执行
        store.dispatch = (action) => {
            store.state = reducer(store.state, action)
            store.listeners.forEach(listener => listener())
        }
        // 实现getState:
        store.getState= () => store.state
        return store
    }
~~~
- 可以看出我们已经完成了redux的最基本的功能了。 如果需要更新view，就根据我们暴漏的subscribe去更新就好了，这也就解释了 redux并不是专门用于react的，以及为什么要有react-redux这样的库存在。
## REDUX核心思想
- redux的核心思想出了刚才提到的那些之外。 个人认为还有两个东西需要特别注意。 一个是reducer, 另一个是middlewares
### reducer 和 reduce
- reducer可以说是redux的精髓所在。我们先来看下它。reducer被要求是一个纯函数。
    - 被要求很关键，因为reducer并不是定义在redux中的一个东西。而是用户传进来的一个方法
    - 纯函数也很关键，reducer应该是一个纯函数，这样state才可预测(这里应证了我开头提到的Redux is a predictable state container for JavaScript apps.)。
- 日常工作我们也会用到reduce函数，它是一个高阶函数。reduce一直是计算机领域中一个非常重要的概念。
- reducer和reduce名字非常像，这是巧合吗？
   我们先来看下reducer的函数签名：
~~~js
fucntion reducer(state, action) {
    const nextState = {};
    // xxx
    return nextState;
}

~~~
    再看下reduce的函数签名
~~~js
[].reduce((state, action) => {
    const nextState = {};
    // xxx
    return nextState;
}, initialState)

~~~
- 可以看出两个几乎完全一样。最主要区别在于reduce的需要一个数组，然后累计变化。 reducer则没有这样的一个数组。
- 更确切地说，reducer累计的时间上的变化，reduce是累计空间上的变化。
- 如何理解reducer是累计时间上的变化？我们每次通过调用dispatch(action)的时候，都会调用reducer，然后将reducer的返回值去更新store.state。每次dispatch的过程，其实就是在空间上push(action)的过程，类似这样：
~~~js
[action1, action2, action3].reduce((state, action) => {
    const nextState = {};
    // xxx
    return nextState;
}, initialState)
~~~
- 因此说，reducer其实是时间上的累计，是基于时空的操作。
### middlewares
- 中间件就是一个函数，**对store.dispatch方法进行了改造**，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
- 看下代码逻辑
- 中间件函数的特点点：利用闭包的特点，来实现对action 和 reducer 之间进行操作，类似插件。
~~~js
// 定义一个中间件, 这个中间件什么也没做。
function testMiddle({getState}) {
    return function test (dispatch) {
        return function(action) {
            let result = dispatch(action)
            console.log('state', getState())
            return result
        }
    }
}
~~~
- 至于为什么写成这个形式，与applyMiddleware的实现有密不可分的关系。
- applyMiddleware(...middlewares) 这个函数就是对dispatch进行改造，然后对传入的中间件保证有顺序的调用。
- 源码分析
~~~js
// 用reduce实现compose，很巧妙。
function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
    console.log(funcs.reduce((a, b) => (...args) => {
      return  a(b(...args))
    }))
    debugger
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }

// applyMiddleware 的源码
// 首先定义三个中间件函数
// function testMiddle1({dispatch, getState}) {
//   return function compose1 (next) {
//       debugger
//       return function realLogic1 (action) {
//           debugger
//           console.log('realLogic1')
//           let result = next(action)
//           return result
//       }
//   }
// }
// function testMiddle2({dispatch, getState}) {
//   return function compose2 (next) {
//       return function realLogic2 (action) {
//           console.log('realLogic2')
//           let result = next(action)
//           return result
//       }
//   }
// }
// function testMiddle3({dispatch, getState}) {
//   return function compose3 (next) {
//       return function realLogic3 (action) {
//           console.log('realLogic3')
//           let result = next(action)
//           return result
//       }
//   }
// }

function applyMiddleware(...middlewares) {
    // middlewares 是三个中间件函数[testMiddle1, testMiddle2, testMiddle3]
    // 返回一个函数，这个函数会有Redux进行调用，把React.createStore传进来，然后再次调用，把store的initValue和reducer传入。
    return createStore => (...args) => {
      // 生成Store
      const store = createStore(...args)
      // 定义一个dispatch，我们会对这个disptach进行改造
      let dispatch = () => null;
      // 定义中间件，保证有序性
      let chain = [];
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      // 生成中间链：就把中间件依次调用（这些中间件（闭包形式）都会返回一个函数）
      // [testMiddle1, testMiddle2, testMiddle3] 就是依次调用它们，把middlewareAPI传进入，返回值组成的函数是 [compose1, compose2, compose3]
      chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 将这些中间件变成一个函数：
      // 利用compose把 [compose1, compose2, compose3] 把这函数进行组合，返回一个匿名函数 function(...args) {
        // compose1(compose2(compose3(...args)))
      // }
      let testCompose =  compose(...chain)
      // 然后调用这个匿名函数就形成一条作用域链testCompose(store.dispatch), 把store.dispatch传进来。
      //  就相当于先调用 compose3, compose3入参store.dispatch，是返回一个函数realLogic3（真实代码逻辑），
      // 然后再调用compose2入参是realLogic3返回时函数realLogic2， 然后再调用compose1, 入参是realLogic2，返回值是：realLogic1。
      // 最后的返回值是 realLogic1，realLogic1就是我们改造好的dispatch
      dispatch = testCompose(store.dispatch)
      // 让Redux会根据action，去调用这个改造后的dispatch
      // dispatch({test: 1})
      // 此时先调用 realLogic1，把action对象传过来，发现realLogic1中调用了 realLogic2； 执行realLogic2，realLogic2里面调用了realLogic3， realLogic3里面调用了原生的Store.dispatch
      // 我们发现，最后函数返回Store.dispatch，没有影响到原功能，但是在action 到 reducer 之间增加了功能！！
      // 真是太厉害了，好巧秒的闭包
      dispatch({test: 1})
      return {
        ...store,
        dispatch
      }
    }
}
~~~
## 中间件机制
~~~js
  // reduce方法实现 
        Array.prototype.myReduce = function (fn, init) {
            var len = this.length;
            var pre = init;
            var i = 0;
            //判断是否传入初始值
            if (init == undefined) {
                //没有传入初始值，数组第一位默认为初始值，当前元素索引值变为1。
                pre = this[0];
                i = 1;
            }
            for (i; i < len; i++) {
                //当前函数返回值为下一次的初始值
                pre = fn(pre, this[i], i)
            }
            return pre;
        }
        // 组合函数 fa, fb, fc 组合成 (...args) => fa(fb(fc(...args)))
        function compose(...funs) {
            if (funs.length === 0) {
                // 为0返回一个无意义函数，函数直接返回参数
                return arg => arg
            }
            if (funs.length === 1) {
                //1个的话没必要组和
                return funs[0]
            }
            return funs.myReduce((a, b) => {
                let ggg = ''
                return ggg = (...args) => {
                    return a(b(...args))
                }
            })
        }

        // 中间件机制的实现: 对某个函数的增强、改造
        // 定义一个函数disptach,这个函数的功能就是对参数进行求和
        let dispacth = (args) => {
            debugger
            return args.myReduce((pre, cur) => {
                return pre + cur
            }, 0)
        }
        // 现在我们需要对这个函数增强，添加打印功能，求乘功能，所有项乘以2被功能
        // 最主要不影响其原功能。我们就把dispacth函数想成Redux的dispacth函数，内部封装好了，我们需要对其加强。
        // 我们加强主要：是调用这个dispatch时，相当于Redux dispacth(action)，我们在action 到 reducer 做些增强

        function testMiddle1(next) { // 参数next就相当于我们的中间件
            return function realLogic1(action) { // action 对象
                console.log('打印action功能:', action)
                let res = next(action)
                return res
            }
        }
        function testMiddle2(next) { // 参数next就相当于我们的中间件
            return function realLogic2(action) { // action 对象
                console.log('求action的乘功能:', action.myReduce((pre, cur) => pre * cur), 1)
                let res = next(action)
                return res
            }
        }
        function testMiddle3(next) { // 参数next就相当于我们的中间件
            return function realLogic3(action) { // action 对象
                console.log('action的项乘以2功能:', action.map(item => item * 2))
                let res = next(action)
                return res
            }
        }

        // 下面如何把这些中间函数组合起来，我们使用compose函数，把testMiddle1，testMiddle2，testMiddle3 变成 一个匿名函数 (..args)=> { 
        // testMiddle1(testMiddle2(testMiddle3(...args))) 
        // }
        let result = compose(testMiddle1, testMiddle2, testMiddle3)
        // 如果调用这个匿名函数，会先调用testMiddle3 入参就是我们要增强的 dispatch 返回值是realLogic3函数 2.然后再调用testMiddle2 入参是realLogic3， 返回值是realLogic2;
        // 3. 调用testMiddle1 入参是realLogic2， 返回值是realLogic1。这个realLogic1就是我们增强后的 dispatch.
        let storeDispatch = result(dispacth)
        // 使用storeDispatch时：相当于调用realLogic1，接受action作为入参，首先完成打印功能; 然后调用 realLogic2，完成求乘功能; 然后调用realLogic3，完成所有项目乘以2功能后调用 dispacth保证了原功能
        storeDispatch([1, 2, 3]) 
~~~