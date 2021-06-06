# 基于 props 的单向数据流
- 既然 props 是组件的入参，那么组件之间通过修改对方的入参来完成数据通信就是天经地义的事情了。不过，这个“修改”也是有原则的——你必须确保所有操作都在“单向数据流”这个前提下。

- 所谓单向数据流，指的就是当前组件的 state 以 props 的形式流动时，只能流向组件树中比自己层级更低的组件。 比如在父-子组件这种嵌套关系中，只能由父组件传 props 给子组件，而不能反过来。

- 听上去虽然限制重重，但用起来却是相当的灵活。基于 props 传参这种形式，我们可以轻松实现父-子通信、子-父通信和兄弟组件通信。
## 父-子组件通信
- 不做过多讲解
## 子-父组件通信
- 考虑到 props 是单向的，子组件并不能直接将自己的数据塞给父组件，但 props 的形式也可以是多样的。假如父组件传递给子组件的是一个绑定了自身上下文的函数，那么子组件在调用该函数时，就可以将想要交给父组件的数据以函数入参的形式给出去，以此来间接地实现数据从子组件到父组件的流动。
## 兄弟组件通信
- 兄弟组件之间共享了同一个父组件，如下图所示，这是一个非常重要的先决条件。然后父组件当作中间沟通的桥梁.

![](C:\Users\97432\Desktop\react\react-md\imgs\conn1.png)

- 至此，我们给出了 props 传参这种形式比较适合处理的三种场景。尽管这并不意味着其他场景不能用 props 处理，但如果你试图用简单的 props 传递完成更加复杂的通信需求，往往会得不偿失。
# 利用“发布-订阅”模式驱动数据流
- 发布-订阅”模式可谓是解决通信类问题的“万金油”，在前端世界的应用非常广泛，比如：
1. 前两年爆火的 socket.io 模块，它就是一个典型的跨端发布-订阅模式的实现；
2. 在 Node.js 中，许多原生模块也是以 EventEmitter 为基类实现的；
3. 不过大家最为熟知的，应该还是 Vue.js 中作为常规操作被推而广之的“全局事件总线” EventBus。
- 使用发布-订阅模式的优点在于，**监听事件的位置和触发事件的位置是不受限的**，就算相隔十万八千里，只要它们在同一个上下文里，就能够彼此感知。这个特性，太适合用来应对“任意组件通信”这种场景了。
## 发布-订阅模型 API 设计思路
- 事件的监听（订阅）和事件的触发（发布），这两个动作自然而然地对应着两个基本的 API 方法。
- on()：负责注册事件的监听器，指定事件触发时的回调函数。
- emit()：负责触发事件，可以通过传参使其在触发的时候携带数据 
- off()：负责监听器的删除。
### 问题一：事件和监听函数的对应关系如何处理？
- 提到“对应关系”，应该联想到的是“映射”。在 JavaScript 中，处理“映射”我们大部分情况下都是用对象来做的。所以说在全局我们需要设置一个对象，来存储事件和监听函数之间的关系
~~~
constructor() {

  // eventMap 用来存储事件和监听函数之间的关系

  this.eventMap= {}

}

~~~
### 问题二：如何实现订阅？
- 所谓“订阅”，也就是注册事件监听函数的过程。这是一个“写”操作，具体来说就是把事件和对应的监听函数写入到 eventMap 里面去：
~~~javascript
// type 这里就代表事件的名称

on(type, handler) {

  // hanlder 必须是一个函数，如果不是直接报错

  if(!(handler instanceof Function)) {

    throw new Error("哥 你错了 请传一个函数")

  }

  // 判断 type 事件对应的队列是否存在

  if(!this.eventMap[type]) {

   // 若不存在，新建该队列

    this.eventMap[type] = []

  }

  // 若存在，直接往队列里推入 handler

  this.eventMap[type].push(handler)

}

~~~
### 问题三：如何实现发布？
- 订阅操作是一个“写”操作，相应的，发布操作就是一个“读”操作。发布的本质是触发安装在某个事件上的监听函数，我们需要做的就是找到这个事件对应的监听函数队列，将队列中的 handler 依次执行出队：
~~~javascript
// 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体

emit(type, params) {

  // 假设该事件是有订阅的（对应的事件队列存在）

  if(this.eventMap[type]) {

    // 将事件队列里的 handler 依次执行出队

    this.eventMap[type].forEach((handler, index)=> {

      // 注意别忘了读取 params

      handler(params)

    })

  }

}

~~~
- 最终实现
~~~JavaScript
class myEventEmitter {

  constructor() {

    // eventMap 用来存储事件和监听函数之间的关系

    this.eventMap = {};

  }

  // type 这里就代表事件的名称

  on(type, handler) {

    // hanlder 必须是一个函数，如果不是直接报错

    if (!(handler instanceof Function)) {

      throw new Error("哥 你错了 请传一个函数");

    }

    // 判断 type 事件对应的队列是否存在

    if (!this.eventMap[type]) {

      // 若不存在，新建该队列

      this.eventMap[type] = [];

    }

    // 若存在，直接往队列里推入 handler

    this.eventMap[type].push(handler);

  }

  // 别忘了我们前面说过触发时是可以携带数据的，params 就是数据的载体

  emit(type, params) {

    // 假设该事件是有订阅的（对应的事件队列存在）

    if (this.eventMap[type]) {

      // 将事件队列里的 handler 依次执行出队

      this.eventMap[type].forEach((handler, index) => {

        // 注意别忘了读取 params

        handler(params);

      });

    }

  }

  off(type, handler) {

    if (this.eventMap[type]) {

      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);

    }

  }

}
~~~
# 使用 Context API 维护全局状态 