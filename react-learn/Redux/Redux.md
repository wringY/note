# Redux
- 我们把 Flux 看作一个框架理念的话， Redux Flux 种实现，除了 Redux 之外，还有很多实现 Flux 的框架，比如 Reflux, Fluxible 等，毫无疑问 Redux 获得的关注最多，这不是偶然的，因为 Redux 有很多其他框架无法比拟的优势。
## Redux的基本原则
- Flux 的基本原则是“单向数据流”， Redux 在此基础上强调3个基本原则：
1. 唯一数据源（ Single Source of Truth);
2. 保持状态只读（ State is read-only);
3. 数据改变只能通过纯函数完成（Changes are made with pure functions)
### 唯一数据源
- 唯一数据源指的是应用的状态数据应该只存储在唯一的一个 Store上。
- 我们已经知道，在 Flux 中，应用可以拥有多个 Store ，往往根据功能把应用的状态数据划分给若干个 Store 分别存储管理。
- 如果状态数据分散在多个 Store 中，容易造成数据冗余，这样数据一致性方面就会出问题 虽然利用 Dispatcher waitFor 方法可以保证多个 Store 之间的更新顺序，但是这又产生了不同 Store 之间的显示依赖关系，这种依赖关系的存在增加了应用的复杂度，容易带来新的问题
- Redux 对这个问题的解决方法就是，整个应用只保持一个Store ，所有组件的数据源就是这个 Store 上的状态。
- 这个唯 Store 上的状态，是一个**树形的对象**，每个组件往往只是用树形对象上一部分的数据，而如何设计 Store 上状态的结构，就是 Redux 应用的核心问题。
### 保持状态只读
- 保持状态只读，就是说不能去直接修改状态，要修改 Store 的状态，必须要通过派发一个action 对象完成，这一点 ，和 Flux 的要求并没有什么区别。
- 如果只看这个原则的字面意思，可能会让读者感觉有点费解，还记得那个公式吗？UI =render( state ），我们已经说过驱动用户界面更改的是状态，如果状态都是只读的不能
修改，怎么可能引起用户界面的变化呢？当然，要驱动用户界面渲染，就要改变应用的状态，但是改变状态的方法不是去修改状态上值，而是创建一个新的状态对象返回给 Redux ，由 Redux 完成新的状态的组装。
### 数据改变只能通过纯函数完成
- 这里所说的纯函数就是 Reducer, Redux 这个名字的前 3字母 Red 代表的就是Reducer 按照创作者 Dan Abramov 的说法， Redux名字的含义 Reducer+Flux
- Reducer 不是一个 Redux特定的术语， 而是一个计算机科学中的通用概念，很多语言和框架都有对 Reducer 函数 支持 就以 JavaScript 为例，数组类型就有 reduce 函数，
接受的参数就是一个 reducer, reduce 做的事情就是把数组所有元素依次做“规约”，对每个元素都调用一次参数 reducer ，通过 reducer 函数完成规约所有元素的功能。
- Redux 中， 每个 reducer 的函数签名 reducer(state , action ), 第一个参数 state 是当前的状态，第二个参数 action 是接收到的 action 对象，而 reducer
函数要做的事情，就是根据 state action 的值产生一个新的对象返回，注意 reducer 必须是纯函数，也就是说函数的返回结果必须完全由参数 state action 决定，而且不产生任何副用。
~~~javascript
function reducer(state, action) {
    const {kind} = action
    switch(action.type) {
        case ActionType.INCREMENT: {
            return {...state, kind: state[kind]+1}
        }
        case ActionType.DECREMENT : {
            return {...state, kind: state[kind]-1}
        }
        default: return state
    }
}
~~~
- reducer 函数不光接受 action 为参数，还接受 state 为参数 也就是说， Redux的reducer 只负责计算状态，却并不负责存储状态
## Redux 实例
### action
- 与Flux的Action的构造函数直接把构造的动作函数立刻通过调用 Dispatcher的 dispatch 函数派发出去。Redux的Action是直接返回一个action对象.
~~~javascript
import * as ActionTypes from './type'

export const increment = (kind) => {
    return {
        type: ActionTypes.INCREMENT,
        kind
    }
}
~~~
### Dispatcher
- Flux 中我们要用到一个 Dispatcher 对象，但是在 Redux 中，就没有 Dispatcher这个对象了， Dispatcher 存在的作用就是把一个 action 对象分发给多个注册了的 Store ，既然
Redux 让全局只有 Store ，那么再创造一个 Dispatcher 也的确意义不大 所以， Redux中“分发”这个功能，从一个 Dispatcher 对象简化为 Store 对象上的一个函数 dispatch,毕竟只有一个 Store ，要分发也是分发给这个 Store ，就调用 Store 上一个表示分发的函数，合情合理。
### Store
~~~javascript
// 导入createStore函数
import { createStore } from 'redux'
// 导入reducer函数
import reducer from '../Reducer/index'
// 定义初始值
const initValues = {
    apple: 1,
    banana: 5,
    orange: 6
}

const store = createStore(reducer, initValues)
export default store
~~~
- Redux 库提供的 create Store 函数，这个函数第一个参数代表更新状态的 reducer ，第二个参数是状态的初始值，第三个参数可选，代表 Store Enhancer, 
- 确定 Store 状态，是设计好 Redux 应用的关键 Store 状态的初始值看得出来，我们的状态是这样一个格式：状态上每个字段名代表 Counter 组件的名（ caption ），字段的值就是这个组件当前的计数值，根据这些状态字段，足够支撑 Counter 组件
- 那么，为什么没有状态来支持 Summary 组件呢？因为 Summary 组件的状态，完全可以通过把 Counter 状态数值加在一起得到，没有必要制造冗余数据存储，这也符合Redux “唯一数据源”的基本原则 记住， Redux Store 状态设计的一个主要原则：避免冗余的数据
### reducer
- Redux 中把存储的state的工作作抽取出来交给 Redux 框架本身， 让reducer 只用关心如何更新 state 而不要管state 怎么存.
~~~javascript
import * as ActionTypes from '../Action/type'
// 这个就相当于 Flux中 派发action的逻辑
export default (state, action) => {
    const kind = {action}
    switch (ActionTypes) {
        case ActionTypes.INCREMENT:
            return {...state, kind: state[kind]+ 1}
        case ActionTypes.DECREMENT:
            return {...state, kind: state[kind]- 1}
        default:
            break;
    }
}
~~~
### View
~~~javascript
import React, {Component} from 'react'
import Store from '../Store/index'
import * as Action from '../Action/index'
class Counter extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.getOwnState = this.getOwnState.bind(this)
        // 从Store获取状态
        this.state = this.getOwnState()
    }
    componentDidMount() {
        // 也是监听Store的变化
        Store.subscribe(this.onChange)
    }
    // 监听Store变化的回调函数
    onChange() {
        this.setState(this.getOwnState())
    }
    componentWillUnmount() {
        // 移除监听
        Store.subscribe(()=> {})
    }
    increment() {
        Store.dispatch(Action.increment(this.props.kind))
    }
    decrement() {
        Store.dispatch(Action.decrement(this.props.kind))
    }
    getOwnState() {
        return {
            value: Store.getState()[this.props.kind]
        }
    }
    render() {
        const { kind } = this.props
        return <div>
            {kind} <button onClick={this.increment}>+</button><button onClick={this.decrement}>-</button>-----{this.state.value}
        </div>
    }
}
export default Counter
~~~
## Redxu 配合 Context
- 看现在的 Counter Summary 组件文件，发现它们都直接导人 Redux Store, import store from ’.. /Store . js’; 
- 虽然 Redux 应用全局就一个 Store 这样的直接导人依然有问题.
- 在实际工作中， 个应用的规模会很大，不会所有的组件都放在一个代码库中，有时候还要通过 npm 方式引入第 方的组件 想想看，当开发一个独立的组件的时候，都不知道自己这个组件会存在于哪个应用中，当然不可能预先知道定义唯一 Redux Store文件位置了，所以，在组件中直接导人 Store 是非常不利于组件复用的.
- 一个应用中，最好只有一个地方需要直接导 Store ，这个位置当然应该是在调用最顶层 React 组件的位置.
- 不让组件直接导人 Store ，那就只能让组件的上层组件把 Store 传递下来了, 使用Context，可以必须层层透传的情况

## Flux与Redux的区别

- Redux是唯一数据源，全局只有一个store。redux的createStore api内置实现了 事件系统（监听、触发、移除）。而且redux是重新组装store，action返回一个修改过后的store由redux去组装。
- flux存在多个store，存在Store的依赖关系，触发一个action => dispatcher派发action => 把action派发到所有注册（regisiter）了dispatcher的store内部处理逻辑 => 更新store => 触发事件 => view监听事件 => 更新组件内state。
- redux不存在这个问题，因为只有一个store，每次都是直接更新这个store，所以可以保证store的数据是最新的。 派发dispatcher(参数为：对应的action) => reducer函数根据当前state和当前action来返回一个新的store，由redux重新组装store => 触发事件 => view监听事件 => 更新组件内state

# react-redux
- 我们之前在使用redux时，改进应用的两个方法，第一是把一个组件拆分为容器组件和傻瓜组件，第二是使用 React Context 来提供一个所有组件都可以直接访问的Context ，也不难发现，这两种方法都有套路，完全可以把套路部分抽取出来复用，这样每个组件的开发只需要关注于不同的部分就可以了
- 实际上，已经有这样的 个库来完成这些工作了，这个库就是 react-redux
- 用React和Redu来构建前端网页应用，这两者都奉行这样一个公式 UI=render( state ）来产生用户界面 React 才适合于视图层面的东西，但是不能指望靠React来管理应用的状态， Redux 才适合担当应用状态的管理工作
- 从架构出发，当我们开始一个新的应用的时候，有几件事情是一定要考虑清楚的；
1. 代码文件的组织结构；
2. 确定模块的边界；
3. Store 的状态树设计
## 代码文件的组织方式
### 按角色组织
- MVC 中，应用代码分为 Controller Model View ，分别代表三种模块角色，就是把所有的 Controller 代码放在 controllers 目录下，把所有的 Model 代码放在 models目录下，把 View 代码放在 views 目录下 这种组织代码的方式，叫做“按角色组织”(Organized by Roles)
- 虽然按照角色组织”的方式 起来不错，但是实际上非常不利于应用的扩展。当修改功能时需要牵扯三个角色，需要在三个目录下跳转，，或者需要滚动文件列表跳过无关的分发器文件才能找到你想要修改的那一个分发器文件,这真的就是浪费时间
### 按功能组织
- Redux 应用适合于“按功能组织”（ Organzied by Feature ），也就是把完成同一应用功能的代码放在一个目录下，一个应用功能包含多个角色的代码 Redux 中，不同的角色就是 reducer actions 和视图 而应用功能对应的就是用户界面上的交互模块。
- 在这种组织方式下，当你要修改某个功能模块的代码的时候，只要关注对应的目录就行了，所有需要修改的代码文件都在能这个目录下找到
## 模块接口
- React 组件本身应该具有低搞合性和高内聚性的特点，不过，在 Redux 的游乐场中React 组件扮演的就是一个视图的角色，还有 reducer actions 这些角色参与这个游戏
对于整个 Redux 应用而言，整体由模块构成，但是模块不再是 React 组件，而是由 React组件加上相关 reducer 和 actions 构成的一个小整体
## 状态树的设计
- “代码文件组织结构”和“确定模块的边界”更多的只是确定规矩，然后在每个应用中我们只要都遵循这个规矩就足够了，而要注意的第三点“ Store 上状态树的设计”，更像是一门技术，需要我们动一动脑子。
- 因为所有的状态都存在 Store 上， Store 的状态树设计，直接决定了要写哪些 reducer,还有 action 怎么写，所以是程序逻辑的源头。
### 一个状态节点只属于一个模块
- 这个规则与其说是规则，不如说是 Redux 中模块必须遵守的限制，完全无法无视这个限制。
- Redux 应用中， Store 上的每个 state 都只能通过 reducer 来更改，而我们每个模块都有机会导出一个自己的 reducer ，这个导出的 reducer 只能最多更改 Redux 的状态树上一个节点下的数据，因为 reducer 之间对状态树上的修改权是互斥的，不可能让两个reducer 都可以修改同一个状态树上的节点。
- 这里所说的“拥有权”指的是“修改权”，而不是“读取权”，实际上， Redux Store上的全部状态，在任何时候，对任何模块都是开放的，通过 store.getState （）总能够读取当整个状态树的数据，但是只能更新自己相关那一部分模块的数据。
### 避免冗余数据
- 冗余数据是一致性的大敌，如果在 Store 上存储冗余数据，那么维持不同部分数据一致就是一个大问题
### 树形结构扁平
- 理论上，一个树形结构可以有很深的层次，但是我们在设计 Redux Store 的状态树时，要尽量保持树形结构的扁平
- 如果树形结构层次很深，往往意味着树形很复杂，一个很复杂的状态树是难以管理的，从代码的角度出发，深层次树形状态状态结构会让代码冗长。
# react-redux API
## Provider
- Provider: <Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法.
- 如果你真的不想把根组件嵌套在 <Provider> 中，你可以把 store 作为 props 传递到每一个被 connect() 包装的组件，但是我们只推荐您在单元测试中对 store 进行伪造 (stub) 或者在非完全基于 React 的代码中才这样做。正常情况下，你应该使用 <Provider>
- store (Redux Store): 应用程序中唯一的 Redux store 对象
- children (ReactElement) 组件层级的根组件
~~~javascript
import {Provider} from 'react-redux'
function WrapState() {
    return <Provider store={Store}>
        <TodoAPP />
    </Provider>
}
~~~
## connect
- connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) - 连接容器组件和傻瓜组件
### mapStateToProps(state, ownprops)
- 这个参数是一个函数， 把Store上的状态转化为内层傻瓜组件的prop;
- 组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用。
~~~javascript
function mapStateToProps(state, ownProps) {
 return {
     value: state[ownProps.kind]
 }
}
~~~
### mapDispatchToProps(dispatch, ownProps)
- 把内层傻瓜组件中用户动作转化为派送给 Store 的动作，也就是把内层傻瓜组件暴露出来的函数类型的 prop 关联上 dispatch 函数的调用，每个 prop 代表的回调函数的主要区别就是 dispatch 函数的参数不同，这就是 mapDispatchToProps 函数做的事情
~~~javascript
function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement: () => {
      dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption));
    }
  }
}
~~~
### 用法
- 函数将被调用两次。第一次是设置参数，第二次是组件与 Redux store 连接：connect(mapStateToProps, mapDispatchToProps, mergeProps)(MyComponent)。
- export default connect(mapStateToProps, mapDispatchToProps) (Counter);
## createStore(reducer, [preloadedState], enhancer)
~~~javascript
import * as ActionTypes from '../Action/type'
// 这个就相当于 Flux中 派发action的逻辑
export default (state, action) => {
    console.log('00')
    const {kind} = action
    switch (action.type) {
        case ActionTypes.INCREMENT:
            return {...state, [kind]: state[kind]+ 1}
        case ActionTypes.DECREMENT:
            return {...state, [kind]: state[kind]- 1}
        default:
            return  {...state}
    }
}
// 定义初始值
const initValues = {
    apple: 1,
    banana: 5,
    orange: 6
}

const store = createStore(reducer, initValues)
~~~
# redux api
## Store
### createStore
### getState()
- 返回应用当前的 state 树。它与 store 的最后一个 reducer 返回值相同
### dispatch(action)
- 分发 action。这是触发 state 变化的惟一途径。
- 会使用当前 getState() 的结果和传入的 action 以同步方式的调用 store 的 reduce 函数。返回值会被作为下一个 state。从现在开始，这就成为了 getState() 的返回值，同时变化监听器(change listener)会被触发。
### subscribe(listener)
- 添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state
~~~javascript
function select(state) {
  return state.some.deep.property
}

let currentValue
function handleChange() {
  let previousValue = currentValue
  currentValue = select(store.getState())

  if (previousValue !== currentValue) {
    console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
  }
}

let unsubscribe = store.subscribe(handleChange)
unsubscribe()
~~~
### combineReducers(reducers) 组合reducer
- 当我们按照 功能来设计文件目录时，我们有两个reducer.js文件，而Redux create Store 函数只能接受一个 reducer ，那么怎么办？
- 这是 Redux 最有意思的一部分，虽然 Redux create Store 只接受一个 reducer ，却可以把多个 reducer 组合起来，成为一体，然后就可以被 createStore 函数接受.
- combineReducers 函数接受一个对象作为参数，参数对象的每个字段名对应了 State状态上的宇段名（在上面的例子中宇段名分别是 todos filter ）每个字段的值都是一个
reducer 函数（在上面的例子中分别是 todoReducer filterReducer ), combineReducers数返回一个新的 reducer 函数 当这个新的 reducer 函数被执行时会把传入的 state 参数
对象拆开处理， todo 字段下的子状态交给 todoReducer, filter 宇段下的子状态交给 filterReducer ，然后再把这两个调用的返回结果合并成一个新的 state ，作为整体 reducer 函数的返回结果。
- 所以不同reducer的接受的state，不再是整个state节点，而是根据combineReducers 传入对象key 与 state 节点树上对应的节点。
### applyMiddleware(...middlewares) 中间件
- 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
- 类似于插件，可以在不影响原本功能、并且不改动原本代码的基础上，对其功能进行增强。在Redux中，中间件主要用于增强dispatch函数, 实现Redux中间件的基本原理，是更改仓库中的dispatch函数。
- 中间件本身是一个函数，该函数接收一个store参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含getState，dispatch。该函数运行的时间，是在仓库创建之后运行。
- 由于创建仓库后需要自动运行设置的中间件函数，因此，需要在创建仓库时，告诉仓库有哪些中间件。需要调用applyMiddleware函数，将函数的返回结果作为createStore的第二或第三个参数
- 中间件函数必须返回一个dispatch创建函数，applyMiddleware函数，用于记录有哪些中间件，它会返回一个函数，该函数用于记录创建仓库的方法，然后又返回一个函数.
~~~javascript
const next = store.dispatch // 保留原功能
store.dispatch = function dispatchAndLog(action) { // 改写dispatch 添加新功能
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
~~~
## 注意事项
- reducer函数接收state，注意state初始化的时候立刻可以从store里面传过来的，所以需要设置一个默认置。
~~~js
const pageReducer = (state = [], action) => {
~~~