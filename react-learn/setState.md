# setState
- setState可能是异步更新的，会把多个操作合成一次在适当的去统一更新，提示不必要渲染
- setState被设计为异步，但是某些场合下，我们可以通过异步任务的方式帮助setStata逃脱React异步的掌控
## 异步的动机和原理——批量更新的艺术
- 假如说“一次 setState 就触发一个完整的更新流程”这个结论成立，那么每一次 setState 的调用都会触发一次 re-render，我们的视图很可能没刷新几次就卡死了
- 事实上，这正是 setState 异步的一个重要的动机——避免频繁的 re-render。
- 在实际的 React 运行时中，setState 异步的实现方式有点类似于 Vue 的 $nextTick 和浏览器里的 Event-Loop：每来一个 setState，就把它塞进一个队列里“攒起来”。等时机成熟，再把“攒起来”的 state 结果做合并，最后只针对最新的 state 值走一次更新流程。这个过程，叫作“批量更新”
## “同步现象”背后的故事：从源码角度看 setState 工作流
~~~javascript
reduce = () => {

  setTimeout(() => {

    console.log('reduce setState前的count', this.state.count)

    this.setState({

      count: this.state.count - 1

    });

    console.log('reduce setState后的count', this.state.count)

  },0);

}

~~~
- 从题目上看，setState 似乎是在 setTimeout 函数的“保护”之下，才有了同步这一“特异功能”。事实也的确如此，假如我们把 setTimeout 摘掉，setState 前后的 console 表现将会与 increment 方法中无异：
- **并不是 setTimeout 改变了 setState，而是 setTimeout 帮助 setState “逃脱”了 React 对它的管控。只要是在 React 管控下的 setState，一定是异步的。**
## 解读 setState 工作流
- 先把主流程提取为一张大图：

![](C:\Users\97432\Desktop\react\react-md\imgs\state1.png)
- 接下来我们就沿着这个流程，逐个在源码中对号入座。首先是 setState 入口函数：
~~~javascript
ReactComponent.prototype.setState = function (partialState, callback) {

  this.updater.enqueueSetState(this, partialState);

  if (callback) {

    this.updater.enqueueCallback(this, callback, 'setState');

  }

};

~~~
- 入口函数在这里就是充当一个分发器的角色，根据入参的不同，将其分发到不同的功能函数中去。这里我们以对象形式的入参为例，可以看到它直接调用了 this.updater.enqueueSetState 这个方法：
~~~javascript
enqueueSetState: function (publicInstance, partialState) {

  // 根据 this 拿到对应的组件实例

  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

  // 这个 queue 对应的就是一个组件实例的 state 数组

  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);

  queue.push(partialState);

  //  enqueueUpdate 用来处理当前的组件实例

  enqueueUpdate(internalInstance);

}
~~~
- 这里我总结一下，enqueueSetState 做了两件事：
1. 将新的 state 放进组件的状态队列里；
2. 用 enqueueUpdate 来处理将要更新的实例对象。\
- 继续往下走，看看 enqueueUpdate 做了什么
~~~javascript
function enqueueUpdate(component) {

  ensureInjected();

  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段

  if (!batchingStrategy.isBatchingUpdates) {

    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件

    batchingStrategy.batchedUpdates(enqueueUpdate, component);

    return;

  }

  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”

  dirtyComponents.push(component);

  if (component._updateBatchNumber == null) {

    component._updateBatchNumber = updateBatchNumber + 1;

  }

}

~~~
- 这个 enqueueUpdate 非常有嚼头，它引出了一个关键的对象——batchingStrategy，该对象所具备的isBatchingUpdates属性直接决定了当下是要走更新流程，还是应该排队等待；其中的batchedUpdates 方法更是能够直接发起更新流程。由此我们可以大胆推测，batchingStrategy 或许正是 React 内部专门用于管控批量更新的对象。
~~~javascript
/**

 * batchingStrategy源码

**/

var ReactDefaultBatchingStrategy = {

  // 全局唯一的锁标识

  isBatchingUpdates: false,

  // 发起更新动作的方法

  batchedUpdates: function(callback, a, b, c, d, e) {

    // 缓存锁变量

    var alreadyBatchingStrategy = ReactDefaultBatchingStrategy. isBatchingUpdates

    // 把锁“锁上”

    ReactDefaultBatchingStrategy. isBatchingUpdates = true

    if (alreadyBatchingStrategy) {

      callback(a, b, c, d, e)

    } else {

      // 启动事务，将 callback 放进事务里执行

      transaction.perform(callback, null, a, b, c, d, e)

    }

  }

}

~~~
- batchingStrategy 对象并不复杂，你可以理解为它是一个“锁管理器”。
- 这里的“锁”，是指 React 全局唯一的 isBatchingUpdates 变量，isBatchingUpdates 的初始值是 false，意味着“当前并未进行任何批量更新操作”。每当 React 调用 batchedUpdate 去执行更新动作时，会先把这个锁给“锁上”（置为 true），表明“现在正处于批量更新过程中”。当锁被“锁上”的时候，任何需要更新的组件都只能暂时进入 dirtyComponents 里排队等候下一次的批量更新，而不能随意“插队”。此处体现的“任务锁”的思想，是 React 面对大量状态仍然能够实现有序分批处理的基石。
- 理解了批量更新整体的管理机制，还需要注意 batchedUpdates 中，有一个引人注目的调用
~~~javascript
transaction.perform(callback, null, a, b, c, d, e)

~~~
- 这行代码为我们引出了一个更为硬核的概念——React 中的 Transaction（事务）机制。

# 理解 React 中的 Transaction（事务） 机制

- Transaction 在 React 源码中表现为一个核心类，React 官方曾经这样描述它：Transaction 是创建一个黑盒，该黑盒能够封装任何的方法。因此，那些需要在函数运行前、后运行的方法可以通过此方法封装（即使函数运行中有异常抛出，这些固定的方法仍可运行），实例化 Transaction 时只需提供相关的方法即可。

~~~javascript
* <pre>

 *                       wrappers (injected at creation time)

 *                                      +        +

 *                                      |        |

 *                    +-----------------|--------|--------------+

 *                    |                 v        |              |

 *                    |      +---------------+   |              |

 *                    |   +--|    wrapper1   |---|----+         |

 *                    |   |  +---------------+   v    |         |

 *                    |   |          +-------------+  |         |

 *                    |   |     +----|   wrapper2  |--------+   |

 *                    |   |     |    +-------------+  |     |   |

 *                    |   |     |                     |     |   |

 *                    |   v     v                     v     v   | wrapper

 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants

 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained

 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->

 *                    | |   | |   |   |         |   |   | |   | |

 *                    | |   | |   |   |         |   |   | |   | |

 *                    | |   | |   |   |         |   |   | |   | |

 *                    | +---+ +---+   +---------+   +---+ +---+ |

 *                    |  initialize                    close    |

 *                    +-----------------------------------------+

 * </pre>

~~~

- Transaction 就像是一个“壳子”，它首先会将目标函数用 wrapper（一组 initialize 及 close 方法称为一个 wrapper） 封装起来，同时需要使用 Transaction 类暴露的 perform 方法去执行它。在 anyMethod 执行之前，perform 会先执行所有 wrapper 的 initialize 方法，执行完后，再执行所有 wrapper 的 close 方法。这就是 React 中的事务机制。

- 下面结合对事务机制的理解，我们继续来看在 ReactDefaultBatchingStrategy 这个对象。ReactDefaultBatchingStrategy 其实就是一个批量更新策略事务，它的 wrapper 有两个：FLUSH_BATCHED_UPDATES 和 RESET_BATCHED_UPDATES。

# isBatchingUpdates 是什么时候锁上的
~~~js
// ReactMount.js
_renderNewRootComponent: function( nextElement, container, shouldReuseMarkup, context ) {
  // 实例化组件
  var componentInstance = instantiateReactComponent(nextElement);
  // 初始渲染直接调用 batchedUpdates 进行同步渲染
  ReactUpdates.batchedUpdates(
    batchedMountComponentIntoNode,
    componentInstance,
    container,
    shouldReuseMarkup,
    context
  );
  ...
}
~~~
- 这段代码是在**首次渲染组件时会执行的一个方法**，我们看到它**内部调用了一次 batchedUpdates**，**这是因为在组件的渲染过程中，会按照顺序调用各个生命周期函数。开发者很有可能在声明周期函数中调用 setState。因此，我们需要通过开启 batch 来确保所有的更新都能够进入 dirtyComponents 里去，进而确保初始渲染流程中所有的 setState 都是生效的。**

~~~js
// ReactEventListener.js
dispatchEvent: function (topLevelType, nativeEvent) {
  ...
  try {
    // 处理事件
    ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
  } finally {
    TopLevelCallbackBookKeeping.release(bookKeeping);
  }
}
~~~
- 这是 React 事件系统的一部分。当我们在组件上绑定了事件之后，事件中也有可能会触发 setState。为了确保每一次 setState 都有效，React 同样会在此处手动开启批量更新。
- isBatchingUpdates 这个变量，在 React 的生命周期函数以及合成事件执行前，已经被 React 悄悄修改为了 true，这时我们所做的 setState 操作自然不会立即生效。当函数执行完毕后，事务的 close 方法会再把 isBatchingUpdates 改为 false。
~~~js
increment = () => {

  // 进来先锁上

  isBatchingUpdates = true

  console.log('increment setState前的count', this.state.count)

  this.setState({

    count: this.state.count + 1

  });

  console.log('increment setState后的count', this.state.count)

  // 执行完函数再放开

  isBatchingUpdates = false

}

~~~