# React 所有的api
## 组件类
### 基类组件
- 第一类说白了就是我平时用于继承的基类组件, Component,PureComponent,
#### Component
- Component是class组件的根基。类组件一切始于Component。对于React.Component使用，我们没有什么好讲的。我们这里重点研究一下react对Component做了些什么。
react/src/ReactBaseClasses.js
~~~js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
~~~
- 这就是Component函数，其中updater对象上保存着更新组件的方法。
- **我们声明的类组件是什么时候以何种形式被实例化的呢？**
react-reconciler/src/ReactFiberClassComponent.js
~~~js
function constructClassInstance(
    workInProgress,
    ctor,
    props
){
   const instance = new ctor(props, context);
    instance.updater = {
        isMounted,
        enqueueSetState(){
            /* setState 触发这里面的逻辑 */
        },
        enqueueReplaceState(){},
        enqueueForceUpdate(){
            /* forceUpdate 触发这里的逻辑 */
        }
    }
}
~~~
- 对于Component， react 处理逻辑还是很简单的，实例化我们类组件，然后赋值updater对象，负责组件的更新。然后在组件各个阶段，执行类组件的render函数，和对应的生命周期函数就可以了
#### PureComponent
- PureComponent和 Component用法，差不多一样，唯一不同的是，纯组件PureComponent会浅比较，props和state是否相同，来决定是否重新渲染组件。所以一般用于性能调优，减少render次数。
### 内置组件    
- 就是react提供的内置的组件，比如Fragment,StrictMode
#### Fragment
- 以react提供Fragment碎片概念，能够让一个组件返回多个元素.<></> 与Fragment区别是，Fragment可以支持key属性。<></>不支持key属性。
- 温馨提示。我们通过map遍历后的元素，react底层会处理，默认在外部嵌套一个<Fragment>。
~~~js
{
   [1,2,3].map(item=><span key={item.id} >{ item.name }</span>)
}
~~~
- react底层处理之后，等价于：
~~~js
<Fragment>
   <span></span>
   <span></span>
   <span></span>
</Fragment>
~~~
#### Profiler
- Profiler这个api一般用于开发阶段，性能检测，检测一次react组件渲染用时，性能开销。
- Profiler 需要两个参数：
    第一个参数：是 id，用于表识唯一性的Profiler。
    第二个参数：onRender回调函数，用于渲染完成，接受渲染参数。
- 实践：
~~~js
const index = () => {
  const callback = (...arg) => console.log(arg)
  return <div >
    <div >
      <Profiler id="root" onRender={ callback }  >
        <Router  >
          <Meuns/>
          <KeepaliveRouterSwitch withoutRoute >
              { renderRoutes(menusList) }
          </KeepaliveRouterSwitch>
        </Router>
      </Profiler> 
    </div>
  </div>
}
~~~
0 -id: root  ->  Profiler 树的 id 。
1 -phase: mount ->  mount 挂载 ， update 渲染了。
2 -actualDuration: 6.685000262223184  -> 更新 committed 花费的渲染时间。
3 -baseDuration:  4.430000321008265  -> 渲染整颗子树需要的时间
4 -startTime : 689.7299999836832 ->  本次更新开始渲染的时间
5 -commitTime : 698.5799999674782 ->  本次更新committed 的时间
6 -interactions: set{} -> 本次更新的 interactions 的集合
#### StrictMode
- StrictMode见名知意，严格模式，用于检测react项目中的潜在的问题，。与 Fragment 一样， StrictMode 不会渲染任何可见的 UI 。它为其后代元素触发额外的检查和警告。
- 生产模式下严格模式没有作用
- StrictMode目前有助于：
①识别不安全的生命周期。
②关于使用过时字符串 ref API 的警告
③关于使用废弃的 findDOMNode 方法的警告
④检测意外的副作用: constructor会被调用两次， 这是严格模式下故意的操作，用来检查是否有多余的逻辑代码。 
⑤检测过时的 context API
### 高阶组件
- 另一部分就是高阶组件forwardRef,memo等。
#### memo
- React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。
- 如果你的函数组件在给定相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
- React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。
- 默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
~~~js
    function TestMemo(props) {
        console.log('子组件渲染')
        if(props) return <div>hellow</div>
      }
      function controlRender(pre, next) {
        if(pre.number === next.number) return true // number 不改变，返回true
        if(pre.number !== next.number && next.number > 5) return true
        return false
      }
      const newTestMemo = controlRender(TestMemo)
~~~
#### forwardRef
- 转发ref，react不允许ref通过props传递，因为组件上已经有 ref 这个属性,在组件调和过程中，已经被特殊处理，forwardRef出现就是解决这个问题，把ref转发到自定义的forwardRef定义的属性上，让ref，可以通过props传递。
#### lazy
- 在你的应用中引入代码分割的最佳方式是通过动态 import() 语法。
- 当 Webpack 解析到该语法时，会自动进行代码分割。如果你自己配置 Webpack，你可能要阅读下 Webpack 关于代码分割的指南，当使用 Babel 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。对于这一要求你需要 babel-plugin-syntax-dynamic-import 插件。
>React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库
- 此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包。
- React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件

~~~js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
~~~
#### Suspense
- 然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）。
~~~js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
~~~
- fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。
~~~js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
~~~
## 工具类
- 探究一下react工具类函数的用法。
### createElement
- 一提到createElement，就不由得和JSX联系一起。我们写的jsx，最终会被 babel，用createElement编译成react元素形式。我写一个组件，我们看一下会被编译成什么样子
- 如果我们在render里面这么写：
~~~JS
render(){
    return <div className="box" >
        <div className="item"  >生命周期</div>
        <Text  mes="hello,world"  />
        <React.Fragment> Flagment </React.Fragment>
        { /*  */ }
        text文本
    </div>
}
~~~
- 会被编译成这样：
~~~JS
render() {
    return React.createElement("div", { className: "box" },
            React.createElement("div", { className: "item" }, "\u751F\u547D\u5468\u671F"),
            React.createElement(Text, { mes: "hello,world" }),
            React.createElement(React.Fragment, null, " Flagment "),
            "text\u6587\u672C");
    }

~~~
- 当然我们可以不用jsx模式，而是直接通过createElement进行开发。
createElement模型:
~~~JS
React.createElement(
  type,
  [props],
  [...children]
)
~~~
- createElement参数：
- 第一个参数:如果是组件类型，会传入组件，如果是dom元素类型，传入div或者span之类的字符串。
- 第二个参数:第二个参数为一个对象，在dom类型中为属性，在组件类型中为props。
- 其他参数:，依次为children，根据顺序排列。
- createElement做了些什么？
经过createElement处理，最终会形成 $$typeof = Symbol(react.element)对象。对象上保存了该react.element的信息。
### cloneElement
- createElement把我们写的jsx，变成element对象;  而cloneElement的作用是以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
- 那么cloneElement感觉在我们实际业务组件中，可能没什么用，但是在一些开源项目，或者是公共插槽组件中用处还是蛮大的，比如说，我们可以在组件中，劫持children element，然后通过cloneElement克隆element，混入props。经典的案例就是 react-router中的Swtich组件，通过这种方式，来匹配唯一的 Route并加以渲染。
- 我们设置一个场景，在组件中，去劫持children，然后给children赋能一些额外的props:
~~~js
function FatherComponent({ children }){
    const newChildren = React.cloneElement(children, { age: 18})
    return <div> { newChildren } </div>
}

function SonComponent(props){
    console.log(props)
    return <div>hello,world</div>
}

class Index extends React.Component{    
    render(){      
        return <div className="box" >
            <FatherComponent>
                <SonComponent name="alien"  />
            </FatherComponent>
        </div>   
    }
}
~~~
### createContext
- createContext用于创建一个Context对象，createContext对象中，包括用于传递 Context 对象值 value的Provider，和接受value变化订阅的Consumer。
### createFactory
- 返回用于生成指定类型 React 元素的函数。类型参数既可以是标签名字符串（像是 'div' 或 'span'），也可以是 React 组件 类型 （ class 组件或函数组件），或是 React fragment 类型。
- 这个api将要被废弃，我们这里就不多讲了，如果想要达到同样的效果，请用React.createElement
### createRef
- createRef可以创建一个 ref 元素，附加在react元素上。
- 个人觉得createRef这个方法，很鸡肋，我们完全可以class类组件中这么写，来捕获ref
~~~js
class Index extends React.Component{
    node = null
    componentDidMount(){
        console.log(this.node)
    }
    render(){
        return <div ref={(node)=> this.node } > my name is alien </div>
    }
}
~~~
- 或者在function组件中这么写：
~~~js
function Index(){
    const node = React.useRef(null)
    useEffect(()=>{
        console.log(node.current)
    },[])
    return <div ref={node} >  my name is alien </div>
}

~~~
### isValidElement
- 这个方法可以用来检测是否为react element元素,接受待验证对象，返回true或者false。这个api可能对于业务组件的开发，作用不大，因为对于组件内部状态，都是已知的，我们根本就不需要去验证，是否是react element 元素。
但是，对于一起公共组件或是开源库，isValidElement就很有作用了。
### Children.map
- 接下来的五个api都是和react.Chidren相关的，我们来分别介绍一下，我们先来看看官网的描述，React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
- 有的同学会问遍历 children用数组方法,map ，forEach 不就可以了吗？ 请我们注意一下不透明数据结构,什么叫做不透明结构? 就是数组层级比较深的那种。不能正常的遍历了，即使遍历也不能遍历，每一个子元素。此时就需要 react.Chidren 来帮忙了。
~~~js
function WarpComponent(props){
    const newChildren = React.Children.map(props.children,(item)=>item)
    console.log(newChildren)
    return newChildren
} 
~~~
- 注意 如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历。
### Children.forEach
- Children.forEach和Children.map 用法类似，Children.map可以返回新的数组，Children.forEach仅停留在遍历阶段。
~~~js
function WarpComponent(props){
    React.Children.forEach(props.children,(item)=>console.log(item))
    return props.children
}   
~~~
### Children.count
- children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。对于更复杂的结果，Children.count可以返回同一级别子组件的数量。
### Children.toArray
- 将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时
- React.Children.toArray() 在拉平展开子节点列表时，更改 key 值以保留嵌套数组的语义。也就是说，toArray 会为返回数组中的每个 key 添加前缀，以使得每个元素 key 的范围都限定在此函数入参数组的对象内。
### Children.only
- 验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。
- React.Children.only() 不接受 React.Children.map() 的返回值，因为它是一个数组而并不是 React 元素。
## react-hooks
## react-dom
### render
- render 是我们最常用的react-dom的 api，用于渲染一个react元素，一般react项目我们都用它，渲染根部容器app。
- ReactDOM.render会控制container容器节点里的内容，但是不会修改容器节点本身。
### hydrate
- 服务端渲染用hydrate。用法与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。
~~~js
ReactDOM.hydrate(element, container[, callback])
~~~
### createPortal
- Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。createPortal 可以把当前组件或 element 元素的子节点，渲染到组件之外的其他地方
- 那么具体应用到什么场景呢？
    比如一些全局的弹窗组件model,<Model/>组件一般都写在我们的组件内部，倒是真正挂载的dom，都是在外层容器，比如body上。此时就很适合createPortalAPI。
- createPortal接受两个参数：
~~~js
ReactDOM.createPortal(child, container)
~~~
- 第一个： child 是任何可渲染的 React 子元素 第二个： container是一个 DOM 元素。
### unstable_batchedUpdates
- 在react-legacy模式下，对于事件，react事件有批量更新来处理功能,但是这一些非常规的事件中，批量更新功能会被打破。所以我们可以用react-dom中提供的unstable_batchedUpdates 来进行批量更新。
- 一次点击实现的批量更新
~~~js
class Index extends React.Component{
    constructor(props){
       super(props)
       this.state={
           numer:1,
       }
    }
    handerClick=()=>{
        this.setState({ numer : this.state.numer + 1 })
        console.log(this.state.numer)
        this.setState({ numer : this.state.numer + 1 })
        console.log(this.state.numer)
        this.setState({ numer : this.state.numer + 1 })
        console.log(this.state.numer)
    }
    render(){
        return <div  style={{ marginTop:'50px' }} > 
            <button onClick={ this.handerClick } >click me</button>
        </div>
    }
}
~~~
- 渲染次数一次。
- 批量更新条件被打破
~~~js
 handerClick=()=>{
    Promise.resolve().then(()=>{
        this.setState({ numer : this.state.numer + 1 })
        console.log(this.state.numer)
        this.setState({ numer : this.state.numer + 1 })
        console.log(this.state.numer)
        this.setState({ numer : this.state.numer + 1 })
        console.log(this.state.numer)
    })
  }

~~~
- 渲染次数三次。
- unstable_batchedUpdate助力
~~~js
 handerClick=()=>{
        Promise.resolve().then(()=>{
            ReactDOM.unstable_batchedUpdates(()=>{
                this.setState({ numer : this.state.numer + 1 })
                console.log(this.state.numer)
                this.setState({ numer : this.state.numer + 1 })
                console.log(this.state.numer)
                this.setState({ numer : this.state.numer + 1 })
                console.log(this.state.numer)
            }) 
        })
    }
~~~
- 渲染次数一次,完美解决批量更新问题。
### flushSync
- flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中。我们知道react设定了很多不同优先级的更新任务。如果一次更新任务在flushSync回调函数内部，那么将获得一个较高优先级的更新。比如
~~~js
ReactDOM.flushSync(()=>{
    /* 此次更新将设置一个较高优先级的更新 */
    this.setState({ name: 'alien'  })
})
~~~
### findDOMNode
- findDOMNode用于访问组件DOM元素节点，react推荐使用ref模式，不期望使用findDOMNode
### unmountComponentAtNode
- 从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。