# react
- React 的理念 ，归结为一个公式，就像下面这样 UI =render( data) 
- 让我们来看看这个公式表达的含义，用户看到的界面（ UI) ，应该是 个函数（在这 里叫 render ）的执行结果，只接受数据（ data ）作为参数 这个函数是 个纯函数，所谓 纯函数，指的是没有任何副作用，输出完全依赖于输入的函数，两次函数调用如果输人 相同，得到的结果也绝对相同 如此一来，最终的用户界面，在 render 函数确定的情况 下完全取决于输入数据。
- 对于开发者来说，重要的是区分开哪些属于 data ，哪些属于 render ，想要更新用户 界面，要做的就是更新 data ，用户界面自然会做出响应，所以 React 实践的也是“响应 式编程”（ Reactive Programming ）的思想，这也就是 React 为什么叫做 React 的原因

## 组件设计原则

- 当开发者发现一个组件功能太多代码量太大的时候，就要考虑拆分这个组件，用多个小 的组件来代替 每个小的组件只关注实现单个功能，但是这些功能组合起来，也能满足复杂的实际需求。
- 这就是“分而治之”的策略，把问题分解为多个小问题，这样既容易解决也方便维 护，虽然“分而治之”是一个好策略，但是不要滥用，只有必要的时候才去拆分组件， 不然可能得不偿失。

### 拆分原则

- 作为软件设计的通则，组件的划分要满足高内聚（High Cohesion）和低搞合（Low Coupling）的原则。
- 高内聚指的是把逻辑紧密相关的内容放在一个组件中 用户界面无外乎内容 交互 行为和样式 传统上，内容由 HTML 表示，交互行放在 JavaScript 代码文件中，样式放 css 文件中定义 这虽然满足一个功能模块的需要，却要放在三个不同的文件中，这 其实不满足高内聚的原则 React 却不是这样，展示内容的 JSX 、定义行为的 JavaScript 代码，甚至定义样式的 css ，都可以放在一个 JavaScript 文件中，因为它们本来就是为 了实现 个目的而存在的，所以说 React 天生具有高内聚的特点。
- 低耦合指的是不同组件之间的依赖关系要尽量弱化，也就是每个组件要尽量独立 保持整个系统的低搞合度，需要对系统中的功能有充分的认识，然后根据功能点划分模 块，让不同的组件去实现不同的功能，这个功夫还在开发者身上，不过， React 组件的对 外接口非常规范，方便开发者设计低祸合的系统。

### 数据设计

- prop 是组件的对外接口， state 是组件的内部状态，对外用 prop ，内部用 state

## react与vue

- react是一个js库，而vue是一个及框架。注定react更加灵活，给开发人员更多自由操作的空间，以及更加轻便。
## 从hello world开始
- 在react中有自身的库，如ReactDOM这个库，就是负责渲染react元素等。
### react元素
- 在react中元素是基本单元。react元素可以是一个简单按钮，也可以是一个较复杂地区选择器。可以说react元素就是一个react组件
- 如何生成一个react元素呢？官方推荐JSX,我们首先从不使用JSX开始。
- react元素分为两类：ReactComponnet-Element 和 ReactElement。ReactElement是DOM元素的虚拟表示，ReactComponnet-Element对应着React的类、函数组件。
- react元素是可嵌套的，可以将其他react元素作为某个元素的子元素。
#### React.createElement(component, props, ...children)
- 参数： component 可以是一个html标签名称字符串，也可以是一个ReactClass（必须）; props 元素的属性值对对象（可选); children 元素的子节点（可选）
- 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。
- 返回值：一个给定类型的ReactElement元素。
~~~javascript
 const eg1 = React.createElement('div', null, 'hello world');
~~~
### 渲染react元素
- 对于react元素如何去渲染，react提供了ReactDOM这个库，主要负责DOM操作。
- ReactDOM.render(element, container[, callback])
- 渲染一个 React 元素到由 container 提供的 DOM 中，并且返回组件的一个 引用(reference) （或者对于 无状态组件 返回 null ）
~~~javascript
    const eg1 =  React.createElement('div', null, 'hello world');
    ReactDOM.render(eg1, document.querySelector('#app'));
~~~
## JSX
- JSX是JavaScript XML,是React提供的Syntax Sugar, 能让我们可以在JS中写html标记语言.
### JSX的语法
- React 的 JSX 里约定分别使用首字母大、小写来区分本地组件的类和 HTML 标签。
- 常规的html代码都可以写，可以通过{props}往html中插入变量或任意有效的JS表达式，而无须加上$
- 此外还可以插入带参数的函数{func(props)}
- JSX被编译后，是一个函数调用，返回值为JS对象，故JSX也可作为表达式，例如用于If判断
- 若JSX元素没有子元素/节点，可以单闭合
- 可以给html添加类但class需改写成className，另外若添加自定义的要渲染的属性，最好以data-开头。
#### 属性表达式
- 要使用 JavaScript 表达式作为属性值，只需把这个表达式用一对大括号 ({}) 包起来，不要用引号 ("")。
~~~javascript
// 输入 (JSX):
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// 输出 (JS):
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);
~~~
#### 子节点表达式
- 同样地，JavaScript 表达式可用于描述子结点：
~~~javascript
// 输入 (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// 输出 (JS):
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);
~~~
### 注释
- JSX 里添加注释很容易；它们只是 JS 表达式而已。你只需要在一个标签的子节点内(非最外层)小心地用 {} 包围要注释的部分。
~~~JavaScript
var content = (
  <Nav>
    {/* 一般注释, 用 {} 包围 */}
    <Person
      /* 多
         行
         注释 */
      name={window.isLoggedIn ? window.name : ''} // 行尾注释
    />
  </Nav>
);
~~~
### JSX转换
- JSX 把类 XML 的语法转成纯粹 JavaScript，XML 元素、属性和子节点被转换成 React.createElement 的参数。
~~~javascript
var esca = <a href='https://baidu.com'><span>5&gt;3{true && '--this is true'}</span></a>
// jsx转化React元素
React.createElement('esca', {color: 'blue'}, '一个标题')
~~~
- 这个esca其实就是一个对象。没有被{}包住的默认是字符串，会进行转义，而{}包住的则会被当作表达式，不被转义，由于true是真，故显示后面的值，但问题来了，若我们想在表达式里要进行转义成HTML呢？
### JSX延展属性
- 如果你事先知道组件需要的全部 Props（属性），JSX 很容易地这样写：
~~~javascript
  var component = <Component foo={x} bar={y} />;
~~~
#### 修改 Props 是不好的，明白吗
- 如果你不知道要设置哪些 Props，那么现在最好不要设置它：
~~~javascript
 var component = <Component />;
  component.props.foo = x; // 不好
  component.props.bar = y; // 同样不好
~~~
- 这样是反模式，因为 React 不能帮你检查属性类型（propTypes）。这样即使你的 属性类型有错误也不能得到清晰的错误提示。
- Props 应该被当作禁止修改的。修改 props 对象可能会导致预料之外的结果，所以最好不要去修改 props 对象。
#### 延展属性
- 现在你可以使用 JSX 的新特性 - 延展属性：
~~~javascript
 var props = {};
  props.foo = x;
  props.bar = y;
  var component = <Component {...props} />;
~~~
- 传入对象的属性会被复制到组件内。
- 它能被多次使用，也可以和其它属性一起用。注意顺序很重要，后面的会覆盖掉前面的。
~~~javascript
 var props = { foo: 'default' };
 var component = <Component {...props} foo={'override'} />;
 console.log(component.props.foo); // 'override'
~~~
### JSX转义
- 我们想在表达式里要进行转义成HTML可以有三种方法
1. 使用Unicode编码
~~~javascript
var esca = <a href='https://baidu.com'><span>5&gt;3 {true && '\u003Ethis is true'}</span></a>
//这样在表达式里也可以进行转义了
~~~
2. 使用dangerouslySetInnerHTML
~~~javascript
var esca = <a href='https://baidu.com'>5&gt;3{true &&<span dangerouslySetInnerHTML={{__html: ' &gt;this is true'}}></span>}</a>
//或者定义一个新的JS元素,将需要转义的内容放入
<AllowedHtml html={data}/>
等价于
var esca = React.createElement(
  'a',
  { href: 'https://baidu.com' },
  '5>3',
  true && React.createElement('span', { dangerouslySetInnerHTML: { __html: ' &gt;this is true' } })
);

~~~
3. 在{}通过数组将字符串和表达式包裹在一起
~~~javascript
<div>{['First ', <span>&middot;</span>, ' Second']}</div>
//这样在表达式里也可以进行转义了
~~~
### 关于JSX防范XSS攻击
1. 由于当你尝试通过{html}进行插入html代码时, React会自动将html转为字符串,故React可部分防止XSS攻击
~~~javascript
const username = "<img onerror='alert(\"Hacked!\")' src='invalid-image' />";
class UserProfilePage extends React.Component {
  render() {
    return (
      <h1> Hello {username}!</h1>
    );
  }
}
ReactDOM.render(<UserProfilePage />, document.querySelector("#app"));
~~~
2. JSX中是通过传入函数作为事件处理方式，而不是传入字符串，字符串可能包含恶意代码
- 尽管如此，还是可以通过一些手段进行XSS攻击，如：<a href="{...}" />, <img src={...} />, <iframe src="{...} />，css注入style={...} prop，还可利用上述所说的一些方法
~~~javascript
const aboutUserText = "<img onerror='alert(\"Hacked!\");' src='invalid-image' />";

class AboutUserComponent extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{"__html": aboutUserText}} />
    );
  }
}

ReactDOM.render(<AboutUserComponent />, document.querySelector("#app"))
// 或者通过设置a的href为javascript:xxx
const userWebsite = "javascript:alert('Hacked!');";

class UserProfilePage extends React.Component {
  render() {
    return (
      <a href={userWebsite}>My Website</a>
    )
  }
}

ReactDOM.render(<UserProfilePage />, document.querySelector("#app"));
// 以及使用base64 编码的数据进行替换
const userWebsite = "data:text/html;base64,PHNjcmlwdD5hbGVydCgiSGFja2VkISIpOzwvc2NyaXB0Pg==";

class UserProfilePage extends React.Component {
  render() {
    const url = userWebsite.replace(/^(javascript\:)/, "");
    return (
      <a href={url}>My Website</a>
    )
  }
}

ReactDOM.render(<UserProfilePage />, document.querySelector("#app"));
// 又或从用户处接受了被恶意控制的props
const customPropsControledByAttacker = {
  dangerouslySetInnerHTML: {
    "__html": "<img onerror='alert(\"Hacked!\");' src='invalid-image' />"
  }
};

class Divider extends React.Component {
  render() {
    return (
      <div {...customPropsControledByAttacker} />
    );
  }
}

ReactDOM.render(<Divider />, document.querySelector("#app"));
~~~
## React组件&& Props
- 定义react组件的有两种函数组件与 class 组件
### 函数组件
- 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。
- 函数组件不会继承React.Component，意味着不会活动react进行管理的实例支撑，没有生命周期方法，没有组件状态。它们只接受属性，而且对于给定的输入它们会返回相同的输出，基本上是纯函数。
~~~javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
~~~
- 该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。
- 无状态组件很强大，特别是与拥有支撑实例（有状态组件）的父组件结合使用使用时。与其在多个组件设置状态不如创建单个有状态的父组件并让其余部分使用轻量级的子组件。
### class组件
~~~javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
~~~
- 上述两个组件在 React 里是等效的。
#### 创建React组件
- React组件的创建主要时继承React.Component
#### constructor
- 在class中class是必须的，就是ES5的构造函数。主要接受参数来创建实例。
- constructor默认返回当前实例对象。
- 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
#### render
- Class组件内部必须有一个render函数，且这个函数需要返回react元素（虚拟DOM）
- render 函数应该是一个纯函数，完全根据 this.state this.props 来决定返 回的结果，而且不要产生任何副作用。在 render 函数中去调用 this.setState 毫无疑问是错 误的，因为一个纯函数不应该引起状态的改变

#### render函数的返回值

- react元素、数组或fragments、Protals、字符串或数值、布尔或null

### 渲染组件
- 之前，我们遇到的 React 元素都只是 DOM 标签：不过，React 元素也可以是用户自定义的组件：
- 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。
~~~javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
~~~
### Props的只读性
- 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。来看下这个 sum 函数：
~~~javascript
function sum(a, b) {
  return a + b;
}
~~~
- 这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。
- 相反，下面这个函数则不是纯函数，因为它更改了自己的入参：
~~~javascript
function withdraw(account, amount) {
  account.total -= amount;
}
~~~
- 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
## state 
~~~javascript
    class Clock extends React.Component {
      constructor(props) { // 构造函数,接受入参
        super(props); // 调头父类, 先创建 先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
        this.state = {  date: new Date() }
      }
      componentDidMount() {
        // 开启定时器
        this.timeId = setInterval(() => {
          this.tick();
        }, 1000)
      }
      componentWillUnmount () { // componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
        clearInterval(this.timeId)
      }
      tick() {
          this.setState({
          date: new Date()
        });
      }
      render() {
        return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        )
      }
    }
  ReactDOM.render(<Clock />, document.querySelector('#app'))  
~~~
1. 当 <Clock /> 被传给 ReactDOM.render()的时候，React 会调用 Clock 组件的构造函数。因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。
2. 之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。然后 React 更新 DOM 来匹配 Clock 渲染的输出。
3. 当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。
4. 浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render(). 方法来确定页面上该显示什么。这一次，render() 方法中的 this.state.date 就不一样了，如此以来就会渲染输出更新过的时间。React 也会相应的更新 DOM。
5. 一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。
### state注意事项
#### state的原则
- 定义一个合适的State，是正确创建组件的第一步。State必须能代表一个组件UI呈现的完整状态集，即组件的任何UI改变，都可以从State的变化中反映出来；同时，State还必须是代表一个组件UI呈现的最小状态集，即State中的所有状态都是用于反映组件UI的变化，没有任何多余的状态，也不需要通过其他状态计算而来的中间状态。
- 组件中用到的一个变量是不是应该作为组件State，可以通过下面的4条依据进行判断：
1. 这个变量是否是通过Props从父组件中获取？如果是，那么它不是一个状态。
2. 这个变量是否在组件的整个生命周期中都保持不变？如果是，那么它不是一个状态。
3. 这个变量是否可以通过其他状态（State）或者属性(Props)计算得到？如果是，那么它不是一个状态。
4. 这个变量是否在组件的render方法中使用？如果**不是**，那么它不是一个状态。这种情况下，这个变量更适合定义为组件的一个普通属性，例如组件中用到的定时器，就应该直接定义为this.timer，而不是this.state.timer。
#### 不要直接修改 State
#### State 的更新可能是异步的
- 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
- 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用，所以可能会是异步的
- 例如，此代码可能会无法更新计数器：
~~~javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
~~~
- 要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
~~~javascript
// Correct
this.setState(function(prevState, prevProps) {
  return {
    counter: state.counter + props.increment
  };
});
~~~
#### State 的更新会被合并
- 当你调用多次调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。
#### State 的更新是一个浅合并（Shallow Merge）的过程。
- 当调用setState修改组件状态时，只需要传入发生改变的State，而不是组件完整的State，因为组件State的更新是一个浅合并（Shallow Merge）的过程。
- 由于state是浅合并，只有顶级属性和它们的引用部分得到保留，因此name属性就会丢失。
~~~javascript
constructor(props) {
    super(props)
    this.state = {
      user: {
        name: '张三',
        color: {
          favorite: ''
        }
      }
    }
  }
  showColor() {
    // 由于state是浅合并，只有顶级属性和它们的引用部分得到保留，因此name属性就会丢失。
    // 解决方法是创建对象的副本，深层次更新它，然后使用更新后的对象
    // state是一对象，React合并的时候会把该对象的顶级属性合并到状态中。
    let obj = Object.assign({}, this.state.user)
    obj.color.favorite = 'blue'
    this.setState({
      user: obj
    })
  }
~~~
#### 状态类型数组时
- 注意不要使用push、pop、shift、unshift、splice等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改，而concat、slice、filter会返回一个新的数组，展开运算符。
#### 状态类型为普通对象
- 使用ES6 的Object.assgin方法
- 使用对象扩展语法
- 这两种都是生成一个新的对象，不影响原数据
#### 数据是向下流动的
- 不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。
- 这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。
- 组件可以选择把它的 state 作为 props 向下传递到它的子组件中：
~~~javascript
<FormattedDate date={this.state.date} />
~~~

- `FormattedDate` 组件会在其 props 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 state，或是 `Clock` 的 props，还是手动输入的

## 事件处理

- React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。所以可以抵御防止xss攻击.
- React中的事件需要注意写法 和 事件回调函数内部的this 以及传参。
~~~javascript
class Click extends React.Component {
      constructor(props) {
        super(props)
      }
      handleClick(a, e) {
        console.log(e)
        console.log(a)
      }
      render() {
        return (<div onClick={this.handleClick.bind(this, 12)}>{this.props.name}</div>)
      }
    }
ReactDOM.render(<Click name={1234} />, document.querySelector('#app'))
~~~

## React组件组件通信
- React组件中props组件通信的重要方式。props可以传数据，还可以传函数，甚至是React组件。
### 父子组件通信
- 父组件传递数据到子组件，同时把修改父组件state的方法传递给子组件
- React中state的修改，都是自身组件的修改，这给我们排查错误提供了方便
~~~javascript
 class Child extends React.Component {
    constructor(props){
      super(props)
    }
    change(e) {
      this.props.change(e.target.value)
    }
    render() {
      return (<input value={this.props.name} onChange={this.change.bind(this)} />)
    }
  }
  class Parent extends React.Component {
    constructor(props){
      super(props)
      this.state = {name: '小明'}
    }
    change(value) {
      this.setState({name: value})
      console.log(this.state)
    }
    render() {
      return (<Child name={this.state.name} change={this.change.bind(this)} />)
    }
  }
  ReactDOM.render(<Parent />, document.querySelector('#app'))
~~~
### React中的插槽
~~~javascript
  class Name extends React.Component {
    render() {
      return <span>name</span>
    }
  }
  class Gender extends React.Component {
    render() {
      return <span>gender</span>
    }
  }
  class Person extends React.Component {
    render() {
      return (
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.gender}</p>
        </div>
      )
    }
  }
  ReactDOM.render(<Person name={<Name/>} gender={<Gender/>}/>, document.querySelector('#app'))
~~~
### 组件共享数据 Context
- Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。
- 比如在设置主题颜色的时候
~~~javascript
 class ThemedButton extends React.Component {
    render() {
      return <button color={this.props.theme}></button>
    }
  }
  class ThemedCard extends React.Component {
    render() {
      return  <button color={this.props.theme}></button>
    }
  }
  class Bar extends React.Component {
    // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件
    render() {
      return (<div>
        <ThemedButton theme={this.props.theme} />
        <ThemedCard theme={this.props.theme} />
        </div>)
    }
  }
class App extends React.Component {
  render() {
    return <Bar theme="dark" />;
  }
}
ReactDOM.render(<App />, document.querySelector('#app'))
~~~
- 使用context
~~~javascript
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
~~~
#### React.createContext
- 创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
~~~javascript
const MyContext = React.createContext(defaultValue);
~~~
- 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
- Context 中有三个概念。React.createContext， Provider， Consumer。
- React.createContext，并包含Provider，Consumer 两个组件.
~~~javascript
 const {Provide, Consumer} = React.createContext('red');
~~~
#### Provider
- 数据的提供者, 通过value属性接收公共状态，来提供给子组件和后代组件。
- Provider 一定要传入value，context默认值要注意
~~~javascript
 <Provide value={} />
~~~
#### Consumer
- 数据的消费者，通过订阅Provide传入的context的值，来实时更新当前组件的状态。
- Consumer需要嵌套在生产者下面。才能通过回调的方式拿到共享的数据源。当然也可以单独使用，那就只能消费到上文提到的defaultValue.
#### 使用实例
- 在class组件中使用
- 注意点：React.createContext的默认值，只有在单独使用Consumer时才会生效。
- 消费组件中 要把函数作为子组件使用。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
~~~javascript
  const {Provider, Consumer} = React.createContext('red')
  class Son extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return <Consumer>
        {(color)=> <span>{color}</span>}
      </Consumer>
    }
  }
  class Parent extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return <Provider value={'blue'}>
      <Son />
      </Provider>
    }
  }
  ReactDOM.render(<Parent/>, document.querySelector('#app'))
~~~
#### contextType
- 指定后代组件的contextType。React会往上找最近的提供Provider，然后使用它的值。
- 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
~~~javascript
 const colorContext = React.createContext('white')
  class GrandFather extends React.Component {
    constructor(props) {
      super(props)
      this.state = {skinColor: 'yellow'}
    }
    render() {
      return <colorContext.Provider value={this.state.skinColor}>
      <Son />
      </colorContext.Provider>
    }
  }
  function Son () {
    return <Grandson />
  }
  class Grandson extends React.Component {
    // 也可以使用
    static contextType = colorContext; // 等价的
    constructor(props) {
      super(props)
    }
    render() {
      return <div>{this.context}</div>
    }
  }
  Grandson.contextType = colorContext;
  // 指定class 组件的contextType。React会往上找最近的提供Provider，然后使用它的值。
  // 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
  ReactDOM.render(<GrandFather /> , document.querySelector('#app'))
~~~
#### 动态context
- 之前的context，都是固定的，静态的。现在我们来使用动态的context，把组件的state当作共享的状态context传递，同时我们还去修改这个state。
- 在这里需要注意事件绑定需要绑定在真实DOM上，如果在react组件上只会当作poprs！！！
~~~javascript
 const themes = { // 主题
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    }
  }
  const ThemeContext = React.createContext(themes.dark) // 创建一个context
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {themes: themes.light} 
      
    }
    // 切换主题
    switchTheme() {
      console.log('----')
      this.setState( state => ({
        themes: state.themes === themes.dark ? themes.light : themes.dark
      }))
    }
    render() {
      return <ThemeContext.Provider value={this.state.themes}>
        <ToolBar change={this.switchTheme.bind(this)} />
      </ThemeContext.Provider>
    }
  }
  class ToolBar extends React.Component {
    constructor(props) {
      super(props)
    }
    text() {
      console.log('===')
    }
    render() {
      console.log(this.props.change)
      return (<div onClick={this.props.change}>
        <ThemeButton onClick={this.props.change} />
      </div>)
    }
  }
  class ThemeButton extends React.Component {
    static contextType = ThemeContext
    constructor(props) {
      super(props)
      console.log(props)
    }
    render() {
      let theme = this.context;
      return <button style={{background: theme.background}}>
          点击切换主题
        </button>
    }
  }
  ReactDOM.render(<App />,document.querySelector('#app'))
~~~
#### 在嵌套组件中更新 Context
- 从一个在组件树中嵌套很深的组件中更新 context 是很有必要的。在这种场景下，你可以通过 context 传递**一个函数**，使得 consumers 组件更新 context。
~~~javascript
  const themes = { // 主题
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    }
  }
  // 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
  const ThemesContext = React.createContext({
    themes: themes.dark,
    toggleTheme: () => {}
  })
  function ThemeToggleButton () {
   function aa(){
    console.log('ttttt')
   }
    return(
      <ThemesContext.Consumer>
        { 
          ({themes, toggleTheme}) => (
            <button onClick={toggleTheme} style={{background: themes.background}} >
              点击切换主题</button>
          )
        }
      </ThemesContext.Consumer>
    )
  }
  function Content () {
    return <ThemeToggleButton />
  }
  class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        themes: themes.light,
        toggleTheme: this.toggleTheme.bind(this)
      }
    }
    toggleTheme() {
      this.setState( state => ({
        themes: state.themes === themes.dark ? themes.light : themes.dark
      }))
    }
    render() {
      // 整个statte
      return <ThemesContext.Provider value={this.state}>
        <Content />
        </ThemesContext.Provider>
    }
  }
  ReactDOM.render(<App />, document.querySelector('#app'))
~~~
#### 消费多个 Context
- 为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。
#### 注意事项
- 因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象：
~~~javascript
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
~~~
- 为了防止这种情况，将 value 状态提升到父节点的 state 里：
~~~javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
~~~
## 错误边界
- 错误边界是一种 **React 组件**，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。
- 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。
- 错误边界的工作方式类似于 JavaScript 的 catch {}，不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件。大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。
- 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 catch {} 的工作机制.
- 自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。也就是react组件树发送错误，但是没有错误边界组件捕获，那么整个组件树都不会渲染。
~~~javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
~~~
## Refs
- Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。
- React提供的这个ref属性，表示为对组件真正实例的引用，其实就是ReactDOM.render()返回的组件实例
  - ReactDOM.render()渲染组件时返回的是组件实例；
  - 渲染dom元素时，返回是具体的dom节点。
- `ref`可以挂载到组件上也可以是dom元素上；
  - 挂到组件(`class`声明的组件)上的ref表示对组件实例的引用。不能在函数式组件上使用 ref 属性，因为它们没有实例：
  - 挂载到dom元素上时表示具体的dom元素节点。
- 获取ref引用组件对应的dom节点:
- 不管ref设置值是回调函数还是字符串，都可以通过ReactDOM.findDOMNode(ref)来获取组件挂载后真正的dom节点.
- 但是对于html元素使用ref的情况，ref本身引用的就是该元素的实际dom节点，无需使用ReactDOM.findDOMNode(ref)来获取，该方法常用于React组件上的ref。
- **函数式组件时没有ref的，但是如果想获取组件内部元素的ref，可以使用转发ref，forwardRef**
- 在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。
### 何时使用 Refs
- 下面是几个适合使用 refs 的情况：
1. 管理焦点，文本选择或媒体播放。
2. 触发强制动画。
3. 集成第三方 DOM 库。
- 避免使用 refs 来做任何可以通过声明式实现来完成的事情。
### 创建ref
- Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。
~~~javascript
class MyComponent extends React.Component {
   constructor(props) {
    super(props)
    this.myRef = React.createRef();
   }
   render() {
     return <div ref={this.myRef}></div>
   }
 }
~~~
### 访问ref
- 当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。
- ref 的值根据节点的类型而有所不同：
  - 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
  - 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
  - 你不能在函数组件上使用 ref 属性，因为他们没有实例。
### 示例
#### ref注册在DOM
- 可以通过current获取原生DOM
~~~javascript
class MyComponent extends React.Component {
   constructor(props) {
    super(props)
     // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
   }
   focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
   }
   render() {
     return <div>
      <input type="text" ref={this.textInput} />
      <input type="button" onClick={this.focusTextInput.bind(this)} value="点击我聚焦" />
      </div>
   }
 }
 ReactDOM.render(<MyComponent />, document.querySelector('#app'))
~~~
#### ref注册在React元素
~~~javascript
 class Son extends React.Component {
    constructor(props) {
      super(props)
      this.inputRef = React.createRef();
    }
   render() {
     return <input ref={this.inputRef} />
   }
  }
  class Parent extends React.Component {
    constructor(props) {
      super(props)
      this.myRef = React.createRef();
    }
    componentDidMount() {
      this.myRef.current.inputRef.current.focus()
    }
    render() {
      return <Son ref={this.myRef} />
    }
  }
  ReactDOM.render(<Parent />, document.querySelector('#app'))
~~~
### 回调 Refs
- React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

- 不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。
~~~javascript
 class TextFocus extends React.Component {
   constructor(props) {
    super(props)
    this.textInput = null;
    // ref的回调写法，就是用函数取代React.createRef()
    this.setTextInput = ele => {
      this.textInput = ele
    }
   }
   componentDidMount() {
     // 回调函数的ref，可以之前获取元素。没有current
     console.log(this.textInput.focus())
   }
   render() {
     return <input type="text" ref={this.setTextInput} />
   }
 }
~~~
- React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。
- 可以在组件间传递回调形式的 refs，就像你可以传递通过 React.createRef() 创建的对象 refs 一样。
~~~javascript
 class TextFocus extends React.Component {
   constructor(props) {
    super(props)
   }
   render() {
     return <input ref={this.props.inputRef}></input>
   }
 }
 // 我们想在父组件获取子组件的input
 class App extends React.Component {
   constructor(props) {
    super(props)
    this.textInput = null
    this.setTextInputRef = ele => {
      this.textInput = ele
    }
   }
   componentDidMount() {
     this.textInput.focus()
   }
   render() {
    //  把ref回调函数当作props 传下去
     return <TextFocus inputRef={this.setTextInputRef} />
   }
 }
~~~
- App 把ref的回调函数当作props传给TextFocus，而TextFocus把这个回调函数传给input特殊属性ref，结果就是App中的textInput会被设置为与TextFocus中input对于的原生DOM元素
### 转发ref到DOM
- 当使用其他React ui库时，如果我们想获取某个Input组件的引用。
- 这个组件，我们想获取button的引用，就比较麻烦。
~~~javascript
function FancyButton(props) {
  return (
    <button className="FancyButton">
      {props.children}
    </button>
  );
}
~~~
- Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。
- 正常来说，无论是原生DOM还是React元素如果有 ref（ref属于特殊属性，不会被当作props），就是这个元素的引用。但是我们可以通过React.forwardRef 来创建一个可以接受ref并将其转发。
~~~
  //  React.forwardRef是一个函数。参数：一个函数，这个函数的接受两个参数 props 和 ref,这个函数返回一个React元素。
  // 返回值：一个React元素
 const FancyButton = React.forwardRef( (props, ref) => (
   <button ref={ref}></button>
 ) )

const ref = React.createRef();
 ReactDOM.render(<FancyButton ref={ref} />, document.querySelector('#app'))
 console.log(ref) // ref获取了button原生的引用
~~~
## Fragments
- 这个相当于vue中的template标签，做不可见的包裹元素。
- 在jsx语法中必须有一个根节点，我们往往需要些很多不必要的div、span。现在可以使用Fragments来包裹它们。
- 短语法的支持性需要注意， 短语法是无法加key的！！
~~~javascript
 function MyComponent () {
    // 短语法
    return <>
    <button>sss</button>
    </>
    // return <React.Fragment>
    //     <button>sss</button>
    //   </React.Fragment>
  }
  ReactDOM.render(<MyComponent />, document.querySelector('#app'))
~~~
## 高阶组件
- 一个高阶组件只是一个包装了另外一个 React 组件的 React 组件。
- 至少满足以下条件之一：
  - 接受一个或者多个函数作为输入
  - 输出一个函数
- 高阶组件允许你做：代码复用，逻辑抽象，抽离底层准备（bootstrap）代码、渲染劫持、State 抽象和更改、Props 更改.
- 接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。对于高阶组件，它描述的便是接受React组件作为输入，输出一个新的React组件的组件。
- 更通俗地描述为，高阶组件通过包裹（wrapped）被传入的React组件，经过一系列处理，最终返回一个相对增强（enhanced）的React组件，供其他组件调用。
~~~javascript
 function withHeader(WrappedComponent) {
  return class HOC extends React.Component {
    render() {
      return <div>
        <div className="demo-header">
          我是标题
        </div>
        <WrappedComponent {...this.props}/>
      </div>
    }
  }
}
class Deom extends React.Component {
  render() {
    return <div>我是一个普通族居民</div>
  }
}
const EnhanceDemo = withHeader(Deom);
ReactDOM.render(<EnhanceDemo />, document.querySelector('#app'))
~~~
- 简单的例子里高阶组件只做了一件事，那便是为被包裹的组件添加一个标题样式。这个高阶组件可以用到任何一个需要添加此逻辑的组件上，只需要被此高阶组件修饰即可。
- 由此可以看出，高阶组件的主要功能是封装并抽离组件的通用逻辑，让此部分逻辑在组件间更好地被复用。
- 两种主流的在 React 中实现高阶组件的方法：**属性代理（Props Proxy）**和**反向继承（Inheritance Inversion）**。两种方法囊括了几种包装 WrappedComponent 的方法。
### 属性代理（Props Proxy)
- 属性代理是最常见的高阶组件的使用方式，上述描述的高阶组件就是这种方式。它通过做一些操作，将被包裹组件的props和新生成的props一起传递给此组件，这称之为属性代理。
#### 更改 props
- 在修改或删除重要 props 的时候要小心，你可能应该给高阶组件的 props 指定命名空间（namespace），以防破坏从外传递给 WrappedComponent 的 props。
- 利用高阶组件，可以把context数据抽出作为props传递
~~~javascript
import React, { Component } from 'react';
// 创建一个context
const defaultValue = [
    {name: '张三'},
    {name: '王五'}
]
let Context =  React.createContext(defaultValue)

function HocContext(WrappedComponent) {
    debugger
    return props => {
        return (
            <Context.Consumer>
                {
                    (list) => <WrappedComponent {...props} list={list}/>
                }
            </Context.Consumer>
        )
    }
}

function List(props) {
    debugger
    return(
       <>
        {
            props.list.map(item => <span key={item.name}>{item.name}</span>)
        }
       </>
    )
}
const HocList = HocContext(List)
function App() {
    return(
        <Context.Provider value={defaultValue}>
            <HocList />
        </Context.Provider>
    )
}
App.displayName = 'hoc-context'
export default App;

~~~
#### 通过 refs 获取组件实例
- 你可以通过 ref 获取关键词 this（WrappedComponent 的实例），但是想要它生效，必须先经历一次正常的渲染过程来让 ref 得到计算，这意味着你需要在高阶组件的 render 方法中返回 WrappedComponent，让 React 进行 reconciliation 过程，这之后你就通过 ref 获取到这个 WrappedComponent 的实例了
~~~javascript
// 通过 refs 获取组件实例
  function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    constructor(props) {
      super(props)
    }
    getChildRef(Wrapped) {
      Wrapped.method()
    }
    render() {
      return <WrappedComponent {...this.props} ref={this.getChildRef.bind(this)}/>
    }
  }
}
class Demo extends React.Component {
  method() {
    console.log('---')
  }
  render() {
    return  <div>sss</div>
  }
}
const EXDemo =  refsHOC(Demo)
~~~
#### 抽象 state
- 你可以通过向 WrappedComponent 传递 props 和 callbacks（回调函数）来抽象 state，这和 React 中另外一个组件构成思想 Presentational and Container Components 很相似。
~~~javascript
  // 创建一个高阶组件，抽象出一个state 和 一个回调函数
 function PPHOC (WrappedComponent) {
   return class PP extends React.Component {
     constructor(props) {
      super(props)
      this.state = {name: ''}
     }
     onChange(e) {
      e.persist() // 如果要以异步方式访问事件属性，则应调用event.persist()，该方法将从池中删除合成事件，并允许用户代码保留对事件的引用
       this.setState( (state) => ({
        name: e.target.value
       }) )
     }
     render() {
       const newProps = {
         value: this.state.name,
         onChange: this.onChange.bind(this)
       }
       return <WrappedComponent {...this.props} {...newProps} />
     }
   }
 } 
  class Input extends React.Component {
    render() {
      console.log(this.props)
      return <input name='name' {...this.props} />
    }
  }
  const HOCInput = PPHOC(Input)
ReactDOM.render(<HOCInput />, document.querySelector('#app'))
~~~
#### 把 WrappedComponent 与其它 elements 包装在一起
- 出于操作样式、布局或其它目的，你可以将 WrappedComponent 与其它组件包装在一起。一些基本的用法也可以使用正常的父组件来实现（附录 B），但是就像之前所描述的，使用高阶组件你可以获得更多的灵活性。
~~~javascript
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return (
        <div style={{display: 'block'}}>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}
~~~
### 反向继承
- 接收一个组件，返回继承了这个组件的组件。
- 这种方式返回的React组件继承了被传入的组件，所以它能够访问到的区域、权限更多，相比属性代理方式，它更像打入组织内部，对其进行修改。
~~~JavaScript
 function iiHOC(WrappedComponent) {
    return class Enhancer extends WrappedComponent {
      constructor(props) {
        super(props)
      }
      componentDidMount() {
      // 可以方便地得到state，做一些更深入的修改。
      console.log(this.state);
    }
      render() {
        // 在普通方法中 super是父类原型对象
        return super.render()
      }
    }
  }
~~~
 - 返回的高阶组件类（Enhancer）继承了 WrappedComponent。这被叫做反向继承是因为 WrappedComponent 被动地被 Enhancer 继承，而不是 WrappedComponent 去继承 Enhancer。通过这种方式他们之间的关系倒转了。
- 反向继承允许高阶组件通过 this 关键词获取 WrappedComponent，意味着它可以获取到 state，props，组件生命周期（component lifecycle）钩子，以及渲染方法（render）
#### 渲染劫持（Render Highjacking）
- 它被叫做渲染劫持是因为高阶组件控制了 WrappedComponent 生成的渲染结果，并且可以做各种操作。
- 通过渲染劫持你可以：
1. 『读取、添加、修改、删除』任何一个将被渲染的 React Element 的 props
2. 在渲染方法中读取或更改 React Elements tree，也就是 WrappedComponent 的 children
3. 根据条件不同，选择性的渲染子树
4. 给子树里的元素变更样式
- 渲染 指的是 WrappedComponent.render 方法
- 你无法更改或创建 props 给 WrappedComponent 实例，因为 React 不允许变更一个组件收到的 props，但是你可以在 render 方法里更改子元素/子组件们的 props。
- 就像之前所说的，反向继承的高阶组件不能保证一定渲染整个子元素树，这同时也给渲染劫持增添了一些限制。通过反向继承，你只能劫持 WrappedComponent 渲染的元素，这意味着如果 WrappedComponent 的子元素里**有 Function 类型的 React Element**，你不能劫持这个元素里面的子元素树的渲染。
- 条件性渲染：如果 this.props.loggedIn 是 true，这个高阶组件会原封不动地渲染 WrappedComponent，如果不是 true 则不渲染（假设此组件会收到 loggedIn 的 prop）
#### 反向继承的特点

- 在反向继承中，我们可以做非常多的操作，修改state、props甚至是翻转Element Tree。反向继承有一个重要的点: **反向继承不能保证完整的子组件树被解析**，开始我对这个概念也不理解，后来在看了[React Components, Elements, and Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html)这篇文章之后对这个概念有了自己的一点体会
- React Components, Elements, and Instances这篇文章主要明确了一下几个点:
  - 元素(element)是一个是用DOM节点或者组件来描述屏幕显示的纯对象，元素可以在属性(props.children)中包含其他的元素，一旦创建就不会改变。我们通过`JSX`和`React.createClass`创建的都是元素
  - 组件(component)可以接受属性(props)作为输入，然后返回一个元素树(element tree)作为输出。有多种实现方式:Class或者函数(Function)

~~~js
function hoc (Component) {
    return class extends Component {
        render() {
            return super.render()
        }
    }
}
~~~

- 来看一个例子

~~~js
import React, { Component } from 'react';

const MyFuncComponent = (props)=>{
    return (
        <div>Hello World</div>
    );
}

class MyClassComponent extends Component{

    render(){
        return (
            <div>Hello World</div>
        )
    }

}

class WrappedComponent extends Component{
    render(){
        return(
            <div>
                <div>
                    <span>Hello World</span>
                </div>
                <MyFuncComponent />
                <MyClassComponent />
            </div>

        )
    }
}

const HOC = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            console.log(elementsTree)
            return elementsTree;
        }
    }

export default HOC(WrappedComponent);

~~~

- 通过打印elementsTree 这个React元素对象（jsx），我们发现这个对象中props.children中第个children和第三个children中的props是空的，没有childrens属性（正常来说应该是hello world）。但是这个并不能体现出**反向继承不能保证完整的子组件树被解析**，因为这个部分脱离了HOC概念，单纯是用法问题导致的：为什么 `MyClassComponent`的 props 没有 children？因为用法是 `<MyClassComponent />` 而不是 `< MyClassComponent><span>xxxx<span></MyClassComponent>` 啊
- 所以这个问题还没有实际讨论出结论！！！

- 论证的例子

~~~js
import React, { Component } from 'react';

const MyFuncComponent = (props)=>{
    return (
        <div>Hello World</div>
    );
}

class MyClassComponent extends Component{

    render(){
        return (
            <div>Hello World</div>
        )
    }

}

class WrappedComponent extends Component{
    render(){
       const a  =  <div>
                <div>
                    <span>Hello World</span>
                </div>
                <MyFuncComponent />
                <MyClassComponent />
            </div>
            console.log(a)
        return a
    }
}

export default WrappedComponent

~~~

- 上面与HOC无关，但是打印的a对象，任然props.children子组件是不完整的

### 高阶组件的意义

- 可以对React组件做出更优雅的处理

- 代理mixin

### 高阶组件的缺陷

- HOC需要在原组件上进行包裹或嵌套，如果大量使用HOC，将会产生非常多的嵌套，让调试变得困难
- HOC可以劫持props，在不遵守约定的情况下也可能造成冲突
- Hooks的出现是开创性的，它解决了很多React之前存在的问题
  - 如this指向问题，hoc嵌套复杂程度的问题

##  JSX深入
### React 必须在作用域内
- 由于 JSX 会编译为 React.createElement 调用形式，所以 React 库也必须包含在 JSX 代码作用域内。
- 例如，在如下代码中，虽然 React 和 CustomButton 并没有被直接使用，但还是需要导入：
~~~javascript
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
~~~
### 在 JSX 类型中使用点语法
- 在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便。例如，如果 MyComponents.DatePicker 是一个组件，你可以在 JSX 中直接使用。
~~~javascript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
~~~
### 在运行时选择类型
- 你不能将通用表达式作为 React 元素类型。如果你想通过通用表达式来（动态）决定元素类型，你需要首先将它赋值给大写字母开头的变量。这通常用于根据 prop 来渲染不同组件的情况下:
~~~javascript
const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 类型不能是一个表达式。
  return <components[props.storyType] story={props.story} />;
}
// ---------------------
function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
~~~
### 函数作为子元素
- 在jsx中函数可以作为子元素，但是这个函数要返回一个React元素。
~~~javascript
 // 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    // 
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
~~~
## Portals
- 普通情况下，组件的render函数返回的元素会被挂载在它的父级组件上。
- Portals是reactjs16提供的官方解决方案，使得组件可以脱离父组件层级挂载在DOM树的任何位置。
- 然而，有些元素需要被挂载在更高层级的位置。最典型的应用场景：当父组件具有overflow: hidden、或者z-index的样式设置时，组件有可能被其他元素遮挡，这个时候你就可以考虑要不要使用Portal使组件的挂载脱离父组件。例如：对话框，tooltip。
- 组件的挂载点虽然可以脱离父组件，**但组件的事件通过冒泡机制仍可以传给父组件**。
~~~javascript
  // 在 DOM 中有两个容器是兄弟级 （siblings）
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');
// 利用 Modal 来把Diag组件挂载到 modalRoot 阶段
class Modal extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
     return  ReactDOM.createPortal(this.props.children, modalRoot)
  }
}
// 比如一个对话框：需要挂载到modal-root这个节点上面
class Diag extends React.Component {
  render() {
    return <React.Fragment>
      <div style={{width: 1000+'px', hiight: 1000+'px', background: 'red'}}>
      你好，我水水水水水水</div>
      <button>点击关闭对话框</button>
      </React.Fragment>
  }
}
// 一个Page 具有overflow属性
class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
  }
  open(e) {
    this.setState({show: true})
    e.stopPropagation()
  }
  close() {
    // 虽然Diag组件 和 Parent 分别处于不同的DOM节点，但是并不影响事件冒泡
    this.setState({show: false})
  }
  render() {
    return <div  onClick={this.close.bind(this)} style={{width: 200+'px', hiight: 200+'px', background: 'blue',  overflow: 'hidden'}}>
        {this.state.show ? 
          <Modal>
            <Diag />
          </Modal> : ''}
        <button onClick={this.open.bind(this)}>点击打开对话框</button>
      </div>
  }
}
ReactDOM.render(<Parent />, document.querySelector('#app-root'))
~~~
- 尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。
- 这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先.
## Render Props
- react 组件的render基本上都是自己定义的。但是有些render函数内部的逻辑是可以共享的，为此React提供了一个 render的props，这个props接受一个函数，该函数返回一个React元素并调用它。
- 假设现在一个追踪鼠标位置的组件，可以获取鼠标的位置。
~~~javascript
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标!</h1>
        <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
~~~
- 现在我们想在Cat组件里面使用 MouseTracker 的行为。根据现有的知识，我们知道要把MouseTracker 组件中state的状态传给 Cat。但是这样就不是真正的复用了，不同组件再使用追踪鼠标位置的行为时都要再写一次。
~~~javascript
  class CatWithMouse extends React.Component {
    constructor(props) {
      super(props)
      this.state = {x: 0, y: 0}
      console.log(this.props)
    }
    handleMouseMove(e) {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }
    render() {
      return <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove.bind(this)}>
        <h1>移动鼠标</h1>
        <p>当前鼠标的位置是({this.state.x}, {this.state.y})</p>
        <Cat mouse={this.state} />
      </div>
    }
  }
~~~
- 也可以使用this.props.children.
~~~javascript
  class Mouse extends React.Component {
    constructor(props) {
      super(props)
      this.state = {x: 0, y: 0}
      console.log(this.props)
    }
    handleMouseMove(e) {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }
    render() {
      return <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove.bind(this)}>
        <h1>移动鼠标</h1>
        <p>当前鼠标的位置是({this.state.x}, {this.state.y})</p>
        {this.props.children(this.state)}
      </div>
    }
  }
  function aa (mouse) {
    return  <div>
      <img src="./cat.jpg" alt="" style={{position: 'absolute', width: '100px', height: '100px', left: mouse.x, top: mouse.y}} />
      </div>
  }
 ReactDOM.render(<Mouse>{aa}</CatWithMouse>, document.querySelector('#app'))  
~~~
- render props 和 this.props.children的思想相同。Mouse 组件接受一个 render的props，这个函数接受一个参数返回一个React元素。
~~~javascript
{this.props.render(this.state)}
ReactDOM.render(<Mouse render={(mouse) => <Cat mouse={mouse} />} />, document.querySelector('#app'))
~~~
## PropTypes 进行类型检查 
- 要在组件的 props 上进行类型检查，你只需配置特定的 propTypes 属性：PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。在本例中, 我们使用了 PropTypes.string。当传入的 prop 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，propTypes 仅在开发模式下进行检查。

~~~javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
~~~
- 默认 Prop 值: 可以通过配置特定的 defaultProps 属性来定义 props 的默认值
~~~javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染出 "Hello, Stranger"：
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
~~~

## 受控组件与非受控组件

- 在React中，每当表单的状态发生变化时，都会被写入到组件的state中，这种组件在React被称为**受控组件**。受控组件中，组件渲染的状态与它的value或者checked相对应。**React通过这种方式消除了组件的局部状态。**React官方推荐使用受控组件。

- 简单的说，如果一个表单组件没有value props（单选按钮和复选框对应的是checked props）就可以称为**非受控组件**。这样，我们可以使用**defaultValue**和**defaultChecked**来表示组件的默认状态。

  **在React中，非受控组件是一种反模式，它的值不受组件自身的state或者props控制，通常需要为其添加ref prop来访问渲染后的底层DOM元素**

- **到受控组件和非受控组件的最大区别就是，非受控组件状态并不会受应用状态的控制，应用中也多了局部组件状态，而受控组件的值来源于state。**

## react动画

- react中添加动画可以使用react-transition-group完成过度动画

- react曾为开发者提供了动画插件 react-addons-css-transition-group 后由社区维护，形成了现在的 react-transition-group.

  - 这个库可以帮我我们方便的实现组件的入场和离场动画，使用时需要额外安装

- 提供了四个组件:

  1. Transition:该组件是一个和平台无关的组件（不一定要结合css）;在前端开发中，我们一般结合css来完成样式，所以比较经常使用的是csstransition
  2. CSSTransition: 前端开发中通常使用CSSTransition来完成过渡动画效果
  3. SwitchTransition: 两个组件显示和隐藏切换时使用
  4. TransitionGroup: 将多个动画组件包裹其中，一般用于列表中元素的动画
### 使用CSSTransition
1. 首先写css类名样式
- CSSTransition执行过程中，有三个状态：appear、enter、exit；
- 它们有三种状态，需要定义对应的CSS样式：
  - 第一类，开始状态：对于的类是-appear、-enter、-exit；
  - 第二类：执行动画：对应的类是-appear-active、-enter-active、-exit-active；
  - 第三类：执行结束：对应的类是-appear-done、-enter-done、-exit-done；
~~~css
.card-enter, .card-appear {
    opacity: 0;
    transform: scale(.8);
  }

  .card-enter-active, .card-appear-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .card-exit {
    opacity: 1;
  }

  .card-exit-active {
    opacity: 0;
    transform: scale(.8);
    transition: opacity 300ms, transform 300ms;
  }
~~~
2. CSSTransition组件属性
- in：触发进入或者退出状态
  - 如果添加了unmountOnExit={true}，那么该组件会在执行退出动画结束后被移除掉；
- 当in为true时，触发进入状态，会添加-enter、-enter-acitve的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
- 当in为false时，触发退出状态，会添加-exit、-exit-active的class开始执行动画，当动画执行结束后，会移除两个class，并且添加-enter-done的class；
classNames：动画class的名称
- classNames：动画class的名称
  - 决定了在编写css时，对应的class名称：比如card-enter、card-enter-active、card-enter-done；
- timeout：
  - 过渡动画的时间
- appear
  - 是否在初次进入添加动画（需要和in同时为true）
3. CSSTransition对应的钩子函数
- 主要为了检测动画的执行过程，来完成一些JavaScript的操作
- onEnter：在进入动画之前被触发；
- onEntering：在应用进入动画时被触发；
- onEntered：在应用进入动画结束后被触发
~~~jsx
import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group';
import '../style/ReactTransition.css'

interface IProps { }
interface IState {
    isShowCard: boolean
}
class ReactTransition extends Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            isShowCard: true
        }
    }
    render() {
        return (
            <div>
                <button onClick={e => this.setState({ isShowCard: !this.state.isShowCard })}>显示/隐藏</button>
                <CSSTransition
                    in={this.state.isShowCard}//为true进入显示组件（主要通过in属性来控制组件状态）
                    classNames="card"//设置类名的前缀
                    timeout={1000}//设置过渡动画事件
                    unmountOnExit={true}//消失动画结束后 + display:none
                >
                    <div>哈哈哈</div>
                </CSSTransition>
            </div>
        )
    }
}

export default ReactTransition
~~~
### 使用SwitchTransition
- SwitchTransition可以完成两个组件之间切换的炫酷动画：
  - 比如我们有一个按钮需要在on和off之间切换，我们希望看到on先从左侧退出，off再从右侧进入；
  - 这个动画在vue中被称之为 vue transition modes；
  - react-transition-group中使用SwitchTransition来实现该动画 
- SwitchTransition中主要有一个属性：mode，有两个值
  - in-out：表示新组件先进入，旧组件再移除；
  - out-in：表示就组件先移除，新组建再进入；
- **SwitchTransition还是需要通过CSSTransition来进行控制，使用key属性来控制（不能使用in属性**
  - SwitchTransition组件里面要有CSSTransition或者Transition组件，不能直接包裹你想要切换的组件；
  - SwitchTransition里面的CSSTransition或Transition组件不再像以前那样接受in属性来判断元素是何种状态，取而代之的是key属性
~~~jsx
import React, { Component } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import '../style/ReactTransitionSwitch.css'

interface IProps {

}
interface IState {
    isOn: boolean
}
class ReactTransitionSwitch extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            isOn: true
        }
    }
    render() {
        const { isOn } = this.state;
        return (
            <div>
                <SwitchTransition mode="out-in">
                    <CSSTransition classNames="btn"
                        timeout={500}
                        key={isOn ? "on" : "off"}>
                        {
                            <button onClick={() => {
                                this.setState({ isOn: !isOn })
                            }}>
                                {isOn ? "on" : "off"}
                            </button>
                        }
                    </CSSTransition>
                </SwitchTransition>
            </div>
        )
    }
}

export default ReactTransitionSwitch
~~~
### 使用TransitionGroup
- 当我们有一组动画时，需要将这些CSSTransition放入到一个TransitionGroup中来完成动画：
~~~jsx
import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../style/ReactTransitionGroup.css';

interface Iprops {

}
interface Istate {
    friends: Array<string>,
    count: number
}
class ReactTransitionGroup extends PureComponent<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            friends: [],
            count: 0
        }
    }

    render() {
        return (
            <div>
                <TransitionGroup>
                    {
                        this.state.friends.map((item, index) => {
                            return (
                                <CSSTransition classNames="friend" timeout={300} key={index}>
                                    <div>{item}
                                        <button onClick={() => {
                                            let friends = [...this.state.friends]
                                            friends.splice(index, 1)
                                            this.setState({ friends: friends })
                                        }}>&times;</button>
                                    </div>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
                <button className='buttonAdd' onClick={() => {
                    this.setState({
                        friends: [...this.state.friends, (this.state.count + 1).toString()],
                        count: this.state.count + 1
                    })
                }}>+friend</button>
            </div>
        )
    }
}
export default ReactTransitionGroup
~~~