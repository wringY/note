# Flux
- Flux 核心单向数据流。
## MVC架构
- MVC 框架是业界广泛接受的一种前端应用框架类型，这种框架把应用分为三个部分：
1. Model （模型）负责管理数据 ，大部分业务逻辑也应该放在 Model 中；
2. View （视图）负责渲染用户界面，应该避免在 View 中涉及业务逻辑；
3. Controller （控制器）负责接受用户输入 根据用户输入调用对应的 Model 部分逻辑，把产生的数据结果交给 View 部分，让 View 渲染出必要的输出.

![](C:\Users\v_zynyzhang\Desktop\react\my_react-master\react-md\imgs\mvc.png)

- MVC 框架提出的数据流很理想，用户请求先到达 Controller ，由 Controller 调用 Model 获得数据，然后把数据交给 View ，但是，在实际框架实现中，总是允许 View Model 可以直接通信。

![](C:\Users\v_zynyzhang\Desktop\react\my_react-master\react-md\imgs\MVCbad.png)
## Flux架构
- 更严格的数据流控制.
![](C:\Users\v_zynyzhang\Desktop\react\my_react-master\react-md\imgs\Flux.png)
- Flux 应用包含四个部分，我们先粗略了解一下：
1. Dispatcher ，处理动作分发，维持 Store 之间的依赖关系；
2. Store ，负责存储数据和处理数据相关逻辑
3. Action ，驱动 Dispatcher JavaScript 对象；
4. View ，视图部分，负责显示用户界面。
### Dispatcher
- 首先，我们要创造一个 Dispatcher ，几乎所有应用都只需要拥有一个Dispatcher。	
- Dispatcher 存在的作用就是把action 对象分发给多个注册了的 Store 。
~~~javascript
// 首先，我们要创造一个 Dispatcher ，几乎所有应用都只需要拥有 Dispatcher,
// 对于我们这个简单的应用更不例外
import { Dispatcher } from 'flux'
export default new Dispatcher()
~~~
- Dispatcher 存在的作用，就是用来派发 action ，接下来我们就来定义应用中涉及的 action
### action
- action 顾名思义代表一个“动作”，不过这个动作只是一个普通的 JavaScript 对象，代表一个动作的纯数据，类似于 DOMAPI 中的事件（ event 甚至，和事件相比， action其实还是更加纯粹的数据对象，因为事件往往还包含 些方法，比如点击事件就有preventDefault 方法，但是 action 对象不自带方法，就是纯粹的数据.
- 作为管理， action 对象必须有一个名为 type 的字段，代表这个 action 对象的类型，为了记录日志和 debug 方便，这个 type 应该是字符串类型
- 定义 action 通常需要两个文件，一个定义 action 的类型，一个定义 action 的构造函数（也称为 action creator 分成两个文件的主要原因是在 Store 中会根据 action 类型做不同操作，也就有单独导入 action 类型的需要
~~~javascript
// 定义动作构造函数
import * as ActionTypes from './type'
// 导入派发器
import AppDispatcher from '../Dispatcher/index'
// AppDispatcher.dispatch 用来派发动作，参数是一个对象，有type 类型 和 数据两部分构造
// 动作构造函数，接受参数payload:  数据。
export const increment = (payload) => {
    AppDispatcher.dispatch({
        type: ActionTypes.INCREMENT
    })
}
export const decrement = () => {
    AppDispatcher.dispatch({
        type: ActionTypes.DECREMENT
    })
}
~~~
### Store
- 一个 Store 是一个对象，这个对象存储应用状态，同时还要接受 Dispatcher 派发的动作，根据动作来决定是否要更新应用状态。
~~~javascript
// 定义在counter组件中的Store
import {EventEmitter} from 'events';
// 定义事件类型
const CHANGE_ENENT = 'change'
// 定义初始值
const conuterValue = {
    apple: 0,
    banana: 5,
    orange: 6
}
// 通过nodejs 中 event 模块，来生成store
const conuterStore = Object.assign({}, EventEmitter.prototype, {
    // 定义获取值方法
    getCounterValues() {
        return conuterValue
    },
    // 借助EventEmitter原型，通过事件机制（注册事件，触发事件，删除事件）
    // 注册事件接口
    addEventListener(callBack) {
        this.on(CHANGE_ENENT, callBack)
    },
    // 触发事件接口
    emitChange() {
        this.emit(CHANGE_ENENT)
    },
    // 删除事件
    removeChangeListener(callBack) {
        this.removeListener(CHANGE_ENENT, callBack)
    }
    
})
~~~
- Store 的状态发生变化的时候， 需要通知应用的其他部分做必要的响应 在我们的应用中，做出响应的部分当然就是 View 部分，但是我们不应该硬编码这种联系，应该用消息的方式建立 Store View 的联系 这就是为什么们让 CounterStore 扩展了EventEmi tter. prototype ，等于让 CounterStore 成了 EventEmitter 对象， EventEmitter实例对象支持下列相关函数:
1. emit 函数，可以广播一个特定 件，第一个参数是字符串类型的事件名称
2. on 函数，可以增加一个挂在这个EventEmitter对象特定事件上的处理函数，第一个参数是字符串类型de事件名称，第二个参数是处理函数；
3. removeListener 函数，和on 函数做的事情相反，删除挂在这个 EventEmitter对象特定事件的处理函数，和 on 函数 样， 第一个参数是事件名称 ，第二个参数是处理函数 要注意，如果要调 removeListener 函数 一定要 留对 处理理函的引用
~~~javascript
import {EventEmitter} from 'events';
// 导入事件派发器
import AppDispacther from '../Dispatcher/index'
// 导入动作类型
import * as ActionTypes from '../ActionTypes.js';
import counterStore from './counterStore'
// 定义事件类型
// 定义sumStore 数据
function sumValues (values) {
    let sum = 0;
    for(let key in values) {
        if(values.hasOwnProperty(key)) {
            sum  += values[key]
        }
    }
    return sum
}
// 定义事件类型
const CHANGE_ENENT = 'change'
const SumStore = Object.assign({}, EventEmitter.prototype, {
    // SummaryStore 并没有存储自己的状态，当 getSummary 被调用时，它是直接从 CounterStore 里获取状态计算的。
    getSum() {
        return sumValues(counterStore.getCounterValues())
    },
    emitChange() {
        this.emit(CHANGE_ENENT)
    },
    addChangeListener(callBack) {
        this.on(CHANGE_ENENT, callBack)
    },
    removeChangeEvent(callBack) {
        this.removeListener(CHANGE_ENENT, callBack)
    }
})
SumStore.dispacthToken = AppDispacther.register((action) => {
    if((action.type === ActionTypes.INCREMENT) || (action.type === ActionTypes.INCREMENT)) {
        AppDispacther.waitFor([conuterStore.dispatchToken])
        SumStore.emitChange()
    }
})
~~~
- 既然一个 action 对象会被派发给所有回调函数，这就产生了一个问题，到底是按照什么顺序调用各个回调函数呢？
- 即使 Flux 按照 register 调用的顺序去调用各个回调函数，我们也完全无法把握各个Store 哪个先装载从而调用 register 函数 所以，可以认为 Dispatcher 调用回调函数的顺序完全是无法预期的，不要假设它会按照我们期望的顺序逐个调用设想一下，当 INCREMENT 类型的动作被派发了，如果首先调用 SummaryStore的回调函数，在这个回调函数中立即用 emitChange 通知了监昕者，这时监听者会立即通SummaryStore getSummary 获取结果，而这个 getSummary 是通过 CounterStore 暴露的getCounterValues 函数获取当前计数器值，计算出总和返回……然而，这时候， INCREMENT动作还没来得及派发到 CounterStore 啊！也就是说， CounterStore的getCounterValues的还是一个未更新的值，那样 SummaryStore getSummary 返回值也就是 个错误的值了。
- 怎么解决这个问题呢？这就要靠 Dispatcher waitFor 函数了 SummaryStore回调函数中，之前在 CounterStore 注册回调函数时保存下来的 dispatchToken 终于派上了用场。
- Dispatcher waitFor 可以接受一个数组作为参数，数组中每个元素都是 Dispatcherregister 函数的返回结果，也就所谓的 dispatchToken 这个 waitFor 函数告诉 Dispatcher,当前的处理必须要暂停，直到 dispatchToken 代表的那些已注册回调函数执行结束才能继续。
- 这里要注意一个事实， Dispatcher 的register 函数，只提供了注册一个回调函数的功能，但却不能让调用者在 register 时选择只监听某些 action ，换句话说，每个 register调用者只能这样请求：“ 当有任何动作被派发时，请调用我 ”但不能够这么请求：“当这种类型还有那种类型的动作被派发的时候，请调用我”
- 当一个动作被派发的时候， Dispatcher 就是简单地把所有注册的回调函数全都调用遍，至于这个动作是不是对方关心的， Flux Dispatcher 不关心，要求每个回调函数去鉴别。
### View 
- 首先需要说明， Flux 框架下， View 并不是说必须要使用 React, View 本身是 个独立的部分，可以用任何一种 UI 库来实现。
- 不过，话说回来，既然我们都使用上 Flux 了，除非项目有大量历史遗留代码需要利用，否则实在没有理由不用 React 来实现 View
- 存在于 Flux 框架中的 React 组件需要实现以下几个功能：
1. 创建时要读取 Store 上状态来初始化组件内部状态；
2. 当Store 上状态发生变化时，组件要立刻同步更新内部状态保持一致；
3. View 如果要改变 Store 状态，必须而且只能派发 action
~~~ javascript
import React, {Component} from 'react'
import propTypes from 'prop-types'
import * as Actions from '../Action/index'
import CounterStore from '../Store/counterStore'

class Control extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: CounterStore.getCounterValues()[props.title]
        }
        this.add = this.add.bind(this)
        this.del = this.del.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        // 注册事件接口
        CounterStore.addEventListener(this.onChange);
    }
    add() {
       // 触发动作，然后Dispatcher就会调用注册回调
       Actions.increment(this.props.title)
    }
    del() {
        Actions.decrement(this.props.title)
    }
    onChange() {
        const newCount = CounterStore.getCounterValues()[this.props.title]
        this.setState({count: newCount})
    }
    render() {
        const {title} = this.props
    return <div>{title}----------<button onClick={this.add.bind(this)}>+</button><button onClick={this.del.bind(this)}>-</button>》》》》count: {this.state.count}</div>
    }
}
Control.propTypes = {
    title: propTypes.string.isRequired,
}

class ControlPanel extends Component {
    render() {
        return <div>
            <Control title="apple" />
            <Control title="banana" />
            <Control title="orange" />
        </div>
    }
}
export default ControlPanel
~~~
### 整体流程
- 首先Dispatcher是关系网，负责把Flux整个架构的流程，负责action分派。
- Action 是指有哪些行为
- Store 定义一下状态，同时决定Dispacther如何分配行为。
- View 根据需求触发行为。
- Flux 的架构下，应用的状态被放在了 Store 中， React 组件只是扮演 View 的作用，被动根据 Store 的状态来渲染 在上面的例子中， React 组件依然有自己的状态，但是已经完全沦为 Store 组件的一个映射，而不是主动变化的数据
- 在完全只用 React 实现的版本里，用户的交互操作，比如点击“＋”按钮，引发的时间处理函数直接通过 this.setState 改变组件的状态 Flux 的实现版本里，用户的操作引发的是一个“动作”的派发，这个派发的动作会发送给所有的 Store 对象，引起 Store对象的状态改变，而不是直接引发组件的状态改变 因为组件的状态是 Store 状态的映射，所以改变了 Store 对象也就触发了 React 组件对象的状态改变，从而引发了界面的重新渲染
### 好处
- Flux 的理念里，如果要改变界面，必须改变 Store 中的状态，如果要改变 Store的状态，必须派发一个 action 对象，这就是规矩 在这个规矩之下，想要追溯 个应用的逻辑就变得非常容易。
### 不足
1. Store 之间依赖关系： Flux 的体系中，如果两个 Store 之间有逻辑依赖关系，就必须用上 DispatcherwaitFor 函数。
2. 难以进行服务器端渲染： 关于服务器端渲染，我们在后面第 12 章“同构”中会详细介绍，在这里，我们只需要知道，如果要在服务器端渲染，输出不是一个 DOM 树，而是一个字符串，准确来说就是一个全是 HTML 的字符串。
3. Store 混杂了逻辑和状态： Store 封装了数据和处理数据的逻辑，用面向对象的思维来看，这是一件好事，毕竟对象就是这样定义的 但是，当我们需要动态替换一个 Store 的逻辑时，只能把这个Store 整体替换掉，那也就无法保持 Store 中存储的状态.