# 中间件
- 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
- 类似于插件，可以在不影响原本功能、并且不改动原本代码的基础上，对其功能进行增强。在Redux中，中间件主要用于增强dispatch函数, 实现Redux中间件的基本原理，是更改仓库中的dispatch函数。
- 中间件本身是一个函数，该函数接收一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含getState，dispatch。该函数运行的时间，是在仓库创建之后运行。
- 由于创建仓库后需要自动运行设置的中间件函数，因此，需要在创建仓库时，告诉仓库有哪些中间件。需要调用applyMiddleware函数，将函数的返回结果作为createStore的第二或第三个参数
- 中间件函数必须返回一个dispatch创建函数，applyMiddleware函数，用于记录有哪些中间件，它会返回一个函数，该函数用于记录创建仓库的方法，然后又返回一个函数.
## 最简单的中间件
~~~javascript
const next = store.dispatch // 保留原功能
store.dispatch = function dispatchAndLog(action) { // 改写dispatch 添加新功能
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result // store.dispatch 的返回值 ===  要 dispatch 的 action
}
~~~
## 多个中间件
~~~javascript
const next = Store.dispatch // 保留原功能
const next1 = function dispatchAndLog1(action) {
  console.log('dispatching1', action)
  let result = next(action)
  console.log('next state1', Store.getState())
  return result // store.dispatch 的返回值 ===  要 dispatch 的 action
}
const next2= function dispatchAndLog2(action) {
  console.log('dispatching2', action)
  let result = next1(action)
  console.log('next state2', Store.getState())
  return result // store.dispatch 的返回值 ===  要 dispatch 的 action
}
const next3 = Store.dispatch = function dispatchAndLog3(action) { // 改写dispatch 添加新功能
  console.log('dispatching2', action)
  let result = next2(action)
  console.log('next state3', Store.getState())
  return result // store.dispatch 的返回值 ===  要 dispatch 的 action
}
~~~
- 为了添加多个中间件， 利用原生store.dispatch的返回值是传入的action的特性，通过层层函数调用嵌套来实现，那么有没有什么办法，可以不要这么恶心的函数嵌套调用。
- 我们需要想办法通过组合的方式来处理这些中间件的嵌套关系，这里使用数组的reducer.
~~~javascript
const next1 = function(next) { // 这个next 就是中间件函数，根据数据的栈特性，最先入栈最后调用。
  return () => {
      let res = next()
      return res
  }
}
const next2 = function (next) { // 这个next 就是中间件函数，根据数据的栈特性，最先入栈最后调用。
    return () => {
        let res = next()
        return res
    }
  }
const next3 = function(next) { // 这个next 就是中间件函数，根据数据的栈特性，最先入栈最后调用。
  return () => {
      let res = next()
      return res
  }
}
const _dispatch=Store.dispatch;
function compose(){
    let middlewares=Array(arguments.length).join(",").split(",")
    middlewares=middlewares.map((i,index)=>{
        return arguments[index];
    })
    return middlewares.reduce((prevFunction,currentFunction)=>{
        return function (next) {
            return prevFunction(currentFunction(next))
        }
    })
}
Store.dispatch=compose(next1,next2, next3)(_dispatch)
~~~
- 这里我定义了一个next作为我的最初的next参数，传入中间件的集合之中，**最先推入栈的函数，是最后执行的**，因次我们的next会在最后一层函数执行。细心如你们应该发现了。我的每个自定义函数都返回了上方next的返回值。其实就是为了将next的值返回。这样compose函数执行之后所得到的值就是dispatch的值。这样我们就可以获取原版store.dispatch的值了。顺便科普下原版store.dispatch返回的值就是传入action.
- 根据上述思路，我们来写下合并中间件的compose函数，首先将store.dispatch给_dispatch备用，然后compose这个高阶函数的第一层参数是中间件，第二层就是初始next函数，也就是原版的store.dispatch，我们传入副本_dispatch就可以了。最后改造store.dispatch
~~~javascript
const _dispatch=store.dispatch;
function compose(){
    let middlewares=Array(arguments.length).join(",").split(",")
    middlewares=middlewares.map((i,index)=>{
        return arguments[index];
    })
    return middlewares.reduce((prevFunction,currentFunction)=>{
        return function (next) {
            return prevFunction(currentFunction(next))
        }
    })
}
store.dispatch=compose(dispatchAndLog1,dispatchAndLog2)(_dispatch)
~~~
## 官方的中间件函数
- 但是，官方的中间件可不是这么些的。我翻译了下官方对于应用中间件函数applyMiddleware()的一个定义，其实就是对createStore的一个增强enhance，也就是封装啦。但是有以下几点需要注意下
1. 自定义中间件可以获取到createStore的dispatch(action)和getState()方法。
- 我们现在写的中间件是无法从函数内部中获取到dispatch(action)和getState()，所以我们需要多写一层函数，传入dispatch(action)和getState()。为了简洁，我们可以传入一个对象，包含了入dispatch(action)和getState()两个方法
~~~javascript
function dispatchAndLog2({dispatch,getState}){
    return function (next){
        return function (action) {
            console.log('dispatching1', action)
            let result = next1(action)
            console.log(result,'next state1', store.getState())
            return result
        }
    }
}
// 简化为
const dispatchAndLog2=({dispatch,getState})=>next=>action{
    ....
}
~~~
2. store.dispatch(action)执行时，中间件的链也会执行，也就是绑定的中间件都要执行。
3. 中间件只执行一次，并且作用于在createStore，而不是createStore返回的对象store。也就是说在store创建的时候，中间件已经执行完毕了。
4. applyMiddleware()要返回一个createStore，也就是经过改造之后的createStore
- 这样调用applyMiddlewareTest()(createStore)(reducer)不就等同于createStore(reducer)。
~~~javascript
function applyMiddlewareTest(){
    return (createStore)=>{
        return function (reducer) {
            return createStore(reducer)
        }
    }
}
~~~
