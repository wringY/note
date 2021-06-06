# React.createElement
- 附上源码逐行解析
~~~javascript
export function createElement(type, config, children) {
  let propName;
  // propName 变量用于储存后面需要用到的元素属性
  const props = {};
  // key、ref、self、source 均为 React 元素的属性，此处不必深究
  let key = null;
  let ref = null;
  let self = null; // 用于dev
  let source = null; // 用于dev

  if (config != null) { // 处理config中的属性
    if (hasValidRef(config)) {
      // config里存在合理的ref就将其放入之前声明的ref变量
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      // config里存在合理的key就将其放入之前声明的key变量
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    // config.__self存在就放入self 用于dev
    source = config.__source === undefined ? null : config.__source;
    // config.__source存在就放入source 用于dev

 // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
    for (propName in config) {
      if (
        //筛选出可以提进 props 对象里的属性  
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        // 如果config里有props并且RESERVED_PROPS里没有，就将其放到props对象里
        /*
          const RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true,
          };
        */
        props[propName] = config[propName];
      }
    }
  }

// childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
  const childrenLength = arguments.length - 2;
  // 除去type 和 config 剩下的是children
  if (childrenLength === 1) {
    // children的长度为1时props的children就是传入的最后一个参数children,一般意味着文本节点出现了
    props.children = children;
  } else if (childrenLength > 1) {
    // children的长度大于1时，说明有多个子节点，就生成一个数组childArray，将所有children放入childArray里
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (__DEV__) {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    // props.children 赋值为 childArray
    props.children = childArray;
  }

  // 处理 defaultProps
  // 如果是继承于React.Component的class Comp时，可以设置defaultProps默认值。
  if (type && type.defaultProps) { // 如果组件存在并存在默认值
    const defaultProps = type.defaultProps; // 定义defaultProps为默认值
    for (propName in defaultProps) {
      if (props[propName] === undefined) { // props[propName]为null时 不使用默认值
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (__DEV__) {
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  // 返回一个ReactElement
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
    $$typeof: REACT_ELEMENT_TYPE,
    // $$typeof表示element的类型,通过creatElement创建的都是REACT_ELEMENT_TYPE

    // Built-in properties that belong on the element
    // 内置属性赋值
    type: type,
    key: key,
    ref: ref,
    props: props,
    // 记录创造该元素的组件
    // Record the component responsible for creating this element.
    _owner: owner,
  };

  if (__DEV__) {
    // 这里是一些针对 __DEV__ 环境下的处理，对于大家理解主要逻辑意义不大，此处我直接省略掉，以免混淆视听
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
~~~
- eateElement 就像是开发者和 ReactElement 调用之间的一个“转换器”、一个数据处理层。它可以从开发者处接受相对简单的参数，然后将这些参数按照 ReactElement 的预期做一层格式化，最终通过调用 ReactElement 来实现元素的创建。整个过程如下图所示：

![](C:\Users\v_zynyzhang\Desktop\react\react-md\imgs\11.png)

- ReactElement 的代码出乎意料的简短，从逻辑上我们可以看出，ReactElement 其实只做了一件事情，那就是“创建”，说得更精确一点，是“组装”：ReactElement 把传入的参数按照一定的规范，“组装”进了 element 对象里，并把它返回给了 React.createElement，最终 React.createElement 又把它交回到了开发者手中。整个过程如下图所示：

![](C:\Users\v_zynyzhang\Desktop\react\react-md\imgs\22.png)

# React生命周期
## React 15

在 React 15 中，大家需要关注以下几个生命周期方法：

~~~javascript
constructor()

componentWillReceiveProps()

shouldComponentUpdate()

componentWillMount()

componentWillUpdate()

componentDidUpdate()

componentDidMount()

render()

componentWillUnmount()

~~~
- 如果你接触 React 足够早，或许会记得还有 getDefaultProps 和 getInitState 这两个方法，它们都是 React.createClass() 模式下初始化数据的方法。由于这种写法在 ES6 普及后已经不常见，这里不再详细展开。
- 这些生命周期方法是如何彼此串联、相互依存的呢？这里我为你总结了一张大图：
![](C:\Users\97432\Desktop\react\react-md\imgs\e3.png)
### Mounting 阶段：组件的初始化渲染（挂载）
- componentWillMount、componentDidMount 方法同样只会在挂载阶段被调用一次。其中 componentWillMount 会在执行 render 方法前被触发，一些同学习惯在这个方法里做一些初始化的操作，但这些操作往往会伴随一些风险或者说不必要性（这一点大家先建立认知，具体原因将在“03 课时”展开讲解）。
- 接下来 render 方法被触发。注意 render 在执行过程中并不会去操作真实 DOM（也就是说不会渲染），它的职能是把需要渲染的内容返回出来。真实 DOM 的渲染工作，在挂载阶段是由 ReactDOM.render 来承接的。
- componentDidMount 方法在渲染结束后被触发，此时因为真实 DOM 已经挂载到了页面上，我们可以在这个生命周期里执行真实 DOM 相关的操作。此外，类似于异步请求、数据初始化这样的操作也大可以放在这个生命周期来做（侧面印证了 componentWillMount 真的很鸡肋）
- componentReceiveProps 并不是由 props 的变化触发的，而是由父组件的更新触发的，这个结论，请你谨记。

## React16.3
- 关于 React 16 以来的生命周期, 我们先来看 React 16.3 的大图：
![](C:\Users\97432\Desktop\react\react-md\imgs\ee4.png)
- 这里之所以特意将版本号精确到了小数点后面一位，是因为在React 16.4之后，React 生命周期在之前版本的基础上又经历了一次微调。不过你先不用着急，在理解 16.3 生命周期的基础上，掌握这个“微调”对你来说将易如反掌
### Mounting 阶段：组件的初始化渲染（挂载）

![](C:\Users\97432\Desktop\react\react-md\imgs\16-1.png)

### 消失的 componentWillMount，新增的 getDerivedStateFromProps
- getDerivedStateFromProps 不是 componentWillMount 的替代品, 事实上，componentWillMount 的存在不仅“鸡肋”而且危险，因此它并不值得被“代替”，它就应该被废弃。 为了证明这点，我将在本文后续的“透过现象看本质”环节为大家细数 componentWillMount 的几宗“罪”。
- 而 getDerivedStateFromProps 这个 API，其设计的初衷不是试图替换掉 componentWillMount，而是试图替换掉 componentWillReceiveProps，因此它有且仅有一个用途：使用 props 来派生/更新 state。
- React 团队为了确保 getDerivedStateFromProps 这个生命周期的纯洁性，直接从命名层面约束了它的用途（getDerivedStateFromProps 直译过来就是“从 Props 里派生 State”）。所以，如果你不是出于这个目的来使用 getDerivedStateFromProps，原则上来说都是不符合规范的。
- 认识 getDerivedStateFromProps，这个新生命周期方法的调用规则如下：
~~~jsx
static getDerivedStateFromProps(props, state)
~~~
- 在使用层面，你需要把握三个重点:
1. 第一个重点是最特别的一点：getDerivedStateFromProps 是一个静态方法。静态方法不依赖组件实例而存在，因此你在这个方法内部是访问不到 this 的
2. 第二个重点，该方法可以接收两个参数：props 和 state，它们分别代表当前组件接收到的来自父组件的 props 和当前组件自身的 state
3. 第三个重点，getDerivedStateFromProps 需要一个对象格式的返回值。如果你没有指定这个返回值，那么大概率会被 React 警告一番.
- getDerivedStateFromProps 的返回值之所以不可或缺，是因为 React 需要用这个返回值来更新（派生）组件的 state。因此当你确实不存在“使用 props 派生 state ”这个需求的时候，最好是直接省略掉这个生命周期方法的编写，否则一定记得给它 return 一个 null。
- getDerivedStateFromProps 方法对 state 的更新动作并非“覆盖”式的更新，而是针对某个属性的定向更新。如果派生的组件的state有这个定向的属性则更新，否则新增

### Updating 阶段：组件的更新

![](C:\Users\97432\Desktop\react\react-md\imgs\16-2.png)
### React 16.4 微调
- React 16.4 的挂载和卸载流程都是与 React 16.3 保持一致的，差异在于更新流程上：
- 在 React 16.4 中，任何因素触发的组件更新流程（包括由 this.setState 和 forceUpdate 触发的更新流程）都会触发 getDerivedStateFromProps
- 而在 v 16.3 版本时，只有父组件的更新会触发该生命周期。
### 改变背后的第一个“Why”：为什么要用 getDerivedStateFromProps 代替 componentWillReceiveProps？
- 对于 getDerivedStateFromProps 这个 API，React 官方曾经给出过这样的描述：与 componentDidUpdate 一起，这个新的生命周期涵盖过时componentWillReceiveProps 的所有用例。
- 在这里，请你细细品味这句话，这句话里蕴含了下面两个关键信息
1. getDerivedStateFromProps 是作为一个试图代替 componentWillReceiveProps 的 API 而出现的；
2. getDerivedStateFromProps不能完全和 componentWillReceiveProps 画等号，其特性决定了我们曾经在 componentWillReceiveProps 里面做的事情，不能够百分百迁移到getDerivedStateFromProps 里。
- 接下来我们就展开说说这两点。
1. 关于 getDerivedStateFromProps 是如何代替componentWillReceiveProps 的，在“挂载”环节已经讨论过：getDerivedStateFromProps 可以代替 componentWillReceiveProps 实现基于 props 派生 state。
2. 至于它为何不能完全和 componentWillReceiveProps 画等号，则是因为它过于“专注”了。这一点，单单从getDerivedStateFromProps 这个 API 名字上也能够略窥一二。原则上来说，它能做且只能做这一件事。
- getDerivedStateFromProps 这个 API，它相对于早期的 componentWillReceiveProps 来说，正是做了“合理的减法”。而做这个减法的决心之强烈，从 getDerivedStateFromProps 直接被定义为 static 方法这件事上就可见一斑—— static 方法内部拿不到组件实例的 this，这就导致你无法在 getDerivedStateFromProps 里面做任何类似于 this.fetch()、不合理的 this.setState（会导致死循环的那种）这类可能会产生副作用的操作。
- 因此，getDerivedStateFromProps 生命周期替代 componentWillReceiveProps 的背后，是 React 16 在强制推行“只用 getDerivedStateFromProps 来完成 props 到 state 的映射”这一最佳实践。意在确保生命周期函数的行为更加可控可预测，从根源上帮开发者避免不合理的编程方式，避免生命周期的滥用；同时，也是在为新的 Fiber 架构铺路。
### 消失的 componentWillUpdate 与新增的 getSnapshotBeforeUpdate
~~~javascript  
// 组件更新时调用

getSnapshotBeforeUpdate(prevProps, prevState) {

  console.log("getSnapshotBeforeUpdate方法执行");

  return "haha";

}

// 组件更新后调用

componentDidUpdate(prevProps, prevState, valueFromSnapshot) {

  console.log("componentDidUpdate方法执行");

  console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);

}

~~~
- 这个方法和 getDerivedStateFromProps 颇有几分神似，它们都强调了“我需要一个返回值”这回事。区别在于 getSnapshotBeforeUpdate 的返回值会作为第三个参数给到 componentDidUpdate。它的执行时机是在 render 方法之后，真实 DOM 更新之前。在这个阶段里，我们可以同时获取到更新前的真实 DOM 和更新前后的 state&props 信息。
- 这里我举一个非常有代表性的例子：实现一个内容会发生变化的滚动列表，要求根据滚动列表的内容是否发生变化，来决定是否要记录滚动条的当前位置
- 这个需求的前半截要求我们对比更新前后的数据（感知变化），后半截则需要获取真实的 DOM 信息（获取位置），这时用 getSnapshotBeforeUpdate 来解决就再合适不过了。
- getSnapshotBeforeUpdate 要想发挥作用，离不开 componentDidUpdate 的配合。
- 那么换个角度想想，为什么 componentWillUpdate 就非死不可呢？说到底，还是因为它“挡了 Fiber 的路”。各位莫慌，咱们离真相越来越近了~
## React生命周期变化的原因
- 是为了新的 Fiber 架构，Fiber 是 React 16 对 React 核心算法的一次重写.