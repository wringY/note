# react生命周期

- 现有父子两个组件，ChildComponent， ParentComponent。我们从父子组件的关系来理解React生命周期

~~~javascript
import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

class ChildComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string
  };
  static defaultProps = (function() {
    console.log('@@@子组件的默认props')
    return {};
  })();
  constructor(props) {
    super(props);
    console.log("@@@子组件的constructor ");
    this.state = {
      name: "Mark"
    };
    this.oops = this.oops.bind(this);
  }
  componentWillMount() {
    console.log("@@@子组件 : componentWillMount");
  }
  componentDidMount() {
    console.log("@@@子组件 : componentDidMount");
  }
  componentWillReceiveProps(nextProps) {
    console.log("@@@子组件 : componentWillReceiveProps()");
    console.log("nextProps: ", nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("@@@子组件- shouldComponentUpdate()");
    console.log("nextProps: ", nextProps);
    console.log("nextState: ", nextState);
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("@@@子组件- componentWillUpdate");
    console.log("nextProps: ", nextProps);
    console.log("nextState: ", nextState);
  }
  componentDidUpdate(previousProps, previousState) {
    console.log("@@@子组件-: componentDidUpdate");
    console.log("previousProps:", previousProps);
    console.log("previousState:", previousState);
  }
  componentWillUnmount() {
    console.log("@@@子组件-: componentWillUnmount");
  }
  oops() {
    this.setState(() => ({ oops: true }));
  }
  render() {
    if (this.state.oops) {
      throw new Error("Something went wrong");
    }
    console.log("@@@子组件-: render");
    return [
      <div key="name">Name: {this.props.name}</div>,
      <button key="error" onClick={this.oops}>
        Create error
      </button>
    ];
  }
}

class ParentComponent extends React.Component {
  static defaultProps = (function() {
    console.log("$$$父组件-: defaultProps");
    return {
      true: false
    };
  })();
  constructor(props) {
    super(props);
    console.log("$$$父组件-: constructor");
    this.state = { text: "" };
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentWillMount() {
    console.log("$$$父组件: componentWillMount");
  }
  componentDidMount() {
    console.log("$$$父组件: componentDidMount");
  }
  componentWillUnmount() {
    console.log("$$$父组件: componentWillUnmount");
  }
  onInputChange(e) {
    const text = e.target.value;
    this.setState(() => ({ text: text }));
  }
  componentDidCatch(err, errorInfo) {
    console.log("componentDidCatch");
    console.error(err);
    console.error(errorInfo);
    this.setState(() => ({ err, errorInfo }));
  }
  render() {
    console.log("$$$父组件: render");
    if (this.state.err) {
      return (
        <details style={{ whiteSpace: "pre-wrap" }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </details>
      );
    }
    return [
      <h2 key="h2">Learn about rendering and lifecycle methods!</h2>,
      <input
        key="input"
        value={this.state.text}
        onChange={this.onInputChange}
      />,
      <ChildComponent key="ChildComponent" name={this.state.text} />
    ];
  }
}

export default ParentComponent
~~~

## 挂载过程（父子组件）

- 挂载只会被执行一次。

![](C:\Users\97432\Desktop\react\react-md\imgs\父子组件生命周期-挂载.png)

## 挂载（单个组件）

- constructor -> getlnitialState -> getDefaultProps -> componentWillMount -> render -> 生成 html -> innerHTML 填充 -> componentDidMount
- etlnitialState 这个函数的返回值会用来初始化组件的 this.state ，但是，这个方法只 有用 React. createClass 方法创造的组件类才会发生作用,getDefaultProps 函数的返回值可以作为 props 的初始值，和 getlni tia!S tate 一样，这 个函数只在 React.createClass 方法创造的组件类才会用到.
- ES6 的话，在构造函数中通过给 this.state 赋值完成状态的初始化，通过给类属性 （注意是类属性，而不是类的实例对象属性） defaultProps 赋值指定 props 初始值，达到的 效果是完全一样的。
- 我们通常不用定义 componentWillMount 函数，顾名思义， componentWilJMount 发生在“将要装载”的时候，这个时候没有任何渲染出来的结果，即使调用 this setState 修改状态也不会引发重新绘制，一切都迟了 换句话说，所有可以在这个 componentWillMount 中做的事情，都可以提前到 constructor 中间去做，可以认为这个函数存在的 主要目的就是为了和 componentDidMount 对称。
- 需要注意的是， render 函数被调用完之后， componentDidMount 函数并不是会被立 刻调用， componentDidMount 被调用的时候， render 函数返回的东西已 经引发了渲染， 组件已经被“装载”到了 DOM 树上

## 更新

- 更新要看是props 还是 state更新。

### componentWillReceiveProps

- 只 要是父组件的 render 函数被调用，在 render 函数里面被谊染的子组件就会 历更新过 程，不管父组件传给子组件的 props 有没有改变，都会触发子组件的 componentWillReceiveProps 函数。
- 通过 this.setState 方法触发的更新过程不会调用这个函数，这是因为这个函数 适合根据新的 props 值（也就是参数 nextProps ）来计算出是不是要更新内部状态 state 更新组件内部状态的方法就是 this.setState ，如果 this.setState 的调用导致 componentWillReceiveProps 次被调用，那就是一个死循环了

### shouldComponentUpdate 

- 这个钩子比较特别。返回false,那么render()会被跳过直到下次状态发生改变。这意味组件可以避免不必要的更新。因为组件不会更新所以接下来的componentWillUpdate() 和 componentDidUpdate()。
- 这个钩子默认返回true. React已经采用了先进、高级的方法来确定应该更新什么已经什么时候更新。
- render shouldComponentUpdate 函数，也是 React 生命周期函数中唯 两个要求有 返回结果的函数 render 函数的返回结果将用于构造 DOM 对象，而 shouldComponentUpdate 函数返回一个布尔值，告诉 React 库这个组件在这次更新过程中是否要继续

### porps更新

![](C:\Users\97432\Desktop\react\react-md\imgs\react生命周期-更新.png)

### state更新

- setState -> shouldComponentUpdate -> render -> componentDidUpdate -> diff(内部) -> change dom

### forceUpdate 

- forceUpdate -> render -> componentDidUpdate ->  diff(内部) -> change dom