# ReactDOM.render 是如何串联渲染链路的
在宏观角度对 Fiber 的架构分层和迭代动机有了充分的把握。从本讲开始，我们将以**首次渲染*8为切入点，拆解 Fiber 架构下 ReactDOM.render 所触发的渲染链路，结合源码理解整个链路中所涉及的初始化、render 和 commit 等过程。
- ReactDOM.render 方法对应的调用栈非常深，中间涉及的函数量也比较大，就这张图来说，你首先需要把握的，就是整个调用链路中所包含的三个阶段：
![](C:\Users\v_zynyzhang\Desktop\react\react-md\imgs\fiber6.png)
- 图中 scheduleUpdateOnFiber 方法的作用是调度更新，在由 ReactDOM.render 发起的首屏渲染这个场景下，它触发的就是 performSyncWorkOnRoot。performSyncWorkOnRoot 开启的正是我们反复强调的 render 阶段；而 commitRoot 方法开启的则是真实 DOM 的渲染过程（commit 阶段）。因此以scheduleUpdateOnFiber 和 commitRoot 两个方法为界，我们可以大致把 ReactDOM.render 的调用栈划分为三个阶段：
1. 初始化阶段
2. render 阶段
3. commit 阶段
# 拆解 ReactDOM.render 调用栈——初始化阶段
- 首先我们提取出初始化过程中涉及的调用栈大图：
![](C:\Users\v_zynyzhang\Desktop\react\react-md\imgs\fiber7.png
- 图中的方法虽然看上去又多又杂，但做的事情清清爽爽，那就是**完成 Fiber 树中基本实体的创建**。
- 首先是 legacyRenderSubtreeIntoContainer 方法。在 ReactDOM.render 函数体中，以下面代码所示的姿势调用了它：
~~~javascript
return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
~~~
- 而 legacyRenderSubtreeIntoContainer 的关键逻辑如下（解析在注释里）：
~~~js
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {

  // container 对应的是我们传入的真实 DOM 对象

  var root = container._reactRootContainer;

  // 初始化 fiberRoot 对象

  var fiberRoot;

  // DOM 对象本身不存在 _reactRootContainer 属性，因此 root 为空

  if (!root) {

    // 若 root 为空，则初始化 _reactRootContainer，并将其值赋值给 root

    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);

    // legacyCreateRootFromDOMContainer 创建出的对象会有一个 _internalRoot 属性，将其赋值给 fiberRoot

    fiberRoot = root._internalRoot;

    // 这里处理的是 ReactDOM.render 入参中的回调函数，你了解即可

    if (typeof callback === 'function') {

      var originalCallback = callback;

      callback = function () {

        var instance = getPublicRootInstance(fiberRoot);

        originalCallback.call(instance);

      };

    } // Initial mount should not be batched.

    // 进入 unbatchedUpdates 方法

    unbatchedUpdates(function () {

      updateContainer(children, fiberRoot, parentComponent, callback);

    });

  } else {

    // else 逻辑处理的是非首次渲染的情况（即更新），其逻辑除了跳过了初始化工作，与楼上基本一致

    fiberRoot = root._internalRoot;

    if (typeof callback === 'function') {

      var _originalCallback = callback;

      callback = function () {

        var instance = getPublicRootInstance(fiberRoot);

        _originalCallback.call(instance);

      };

    } // Update

    updateContainer(children, fiberRoot, parentComponent, callback);

  }

  return getPublicRootInstance(fiberRoot);

}

~~~
- 这里我为你总结一下首次渲染过程中 legacyRenderSubtreeIntoContainer 方法的主要逻辑链路：
![](C:\Users\v_zynyzhang\Desktop\react\react-md\imgs\fiber8.png)
- 可以看出，root 对象（container._reactRootContainer）上有一个 _internalRoot 属性，**这个 _internalRoot 也就是 fiberRoot**。**fiberRoot 的本质是一个 FiberRootNode 对象，其中包含一个 current 属性**
- “current 对象是一个 FiberNode 实例”这一点，而 **FiberNode，正是 Fiber 节点对应的对象类型**。current 对象是一个 Fiber 节点，不仅如此，它还是**当前 Fiber 树的头部节点**。
- 考虑到 current 属性对应的 FiberNode 节点，在调用栈中实际是由 createHostRootFiber 方法创建的，React 源码中也有多处以 rootFiber 代指 current 对象，因此下文中我们将以 rootFiber 指代 current 对象。
![](C:\Users\v_zynyzhang\Desktop\react\react-md\imgs\fiber9.png)
- 其中，fiberRoot 的关联对象是真实 DOM 的容器节点；而 rootFiber 则作为虚拟 DOM 的根节点存在。这两个节点，将是后续整棵 Fiber 树构建的起点。
- 接下来，fiberRoot 将和 ReactDOM.render 方法的其他入参一起，被传入 updateContainer 方法，从而形成一个回调。这个回调，正是接下来要调用的 unbatchedUpdates 方法的入参。我们一起看看 unbatchedUpdates 做了什么，下面代码是对 unbatchedUpdates 主体逻辑的提取：
~~~js
function unbatchedUpdates(fn, a) {

  // 这里是对上下文的处理，不必纠结

  var prevExecutionContext = executionContext;

  executionContext &= ~BatchedContext;

  executionContext |= LegacyUnbatchedContext;

  try {

    // 重点在这里，直接调用了传入的回调函数 fn，对应当前链路中的 updateContainer 方法

    return fn(a);

  } finally {

    // finally 逻辑里是对回调队列的处理，此处不用太关注

    executionContext = prevExecutionContext;

    if (executionContext === NoContext) {

      // Flush the immediate callbacks that were scheduled during this batch

      resetRenderTimer();

      flushSyncCallbackQueue();

    }

  }

}

~~~
- 在 unbatchedUpdates 函数体里，当下你只需要 Get 到一个信息：它直接调用了传入的回调 fn。而在当前链路中，fn 是什么呢？fn 是一个针对 updateContainer 的调用：
~~~js
unbatchedUpdates(function () {

  updateContainer(children, fiberRoot, parentComponent, callback);

});

~~~
- 很有必要去看看 updateContainer 里面的逻辑。这里我将主体代码提取如下
~~~js
function updateContainer(element, container, parentComponent, callback) {

  ......

  // 这是一个 event 相关的入参，此处不必关注

  var eventTime = requestEventTime();

  ......

  // 这是一个比较关键的入参，lane 表示优先级

  var lane = requestUpdateLane(current$1);

  // 结合 lane（优先级）信息，创建 update 对象，一个 update 对象意味着一个更新

  var update = createUpdate(eventTime, lane); 

  // update 的 payload 对应的是一个 React 元素

  update.payload = {

    element: element

  };

  // 处理 callback，这个 callback 其实就是我们调用 ReactDOM.render 时传入的 callback

  callback = callback === undefined ? null : callback;

  if (callback !== null) {

    {

      if (typeof callback !== 'function') {

        error('render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback);

      }

    }

    update.callback = callback;

  }

  // 将 update 入队

  enqueueUpdate(current$1, update);

  // 调度 fiberRoot 

  scheduleUpdateOnFiber(current$1, lane, eventTime);

  // 返回当前节点（fiberRoot）的优先级

  return lane;

}

~~~