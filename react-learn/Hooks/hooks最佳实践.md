# hooks
- React Hooks 很酷，但真的需要很强的编程思维去追随它。我们写 Hooks，然后重新思考它，然后重构代码，一种循环
## 函数式组件
- 简而言之，就是在一个函数中返回 React Element。
~~~js
const App = (props) => {
    const { title } = props;
    return (
        <h1>{title}</h1>
    );  
};
~~~
- 一般的，该函数接收唯一的参数：props 对象。从该对象中，我们可以读取到数据，并通过计算产生新的数据，最后返回 React Elements 以交给 React 进行渲染。此外也可以选择在函数中执行副作用。
- 在本文中，我们给函数式组件的函数起个简单一点的名字：render 函数。
~~~js
// React.createElement(App, {
//     title: "XXX"
// });
const appElement = <App title="XXX" />;
ReactDOM.render(
    appElement,
    document.getElementById('app')
);
~~~
- 在 React 内部，它会决定在何时调用 render 函数，并对返回的 React Elements 进行遍历，如果遇到函数组件，React 便会继续调用这个函数组件。在这个过程中，可以由父组件通过 props 将数据传递到该子组件中。最终 React 会调用完所有的组件，从而知晓如何进行渲染。
- **这种把 render 函数交给 React 内部处理的机制**，为引入状态带来了可能。
- 在本文中，为了方便描述，对于 render 函数的每次调用，我想称它为一帧。
## 每一帧拥有独立的变量
~~~js
function Example(props) {
    const { count } = props;
    const handleClick = () => {
        setTimeout(() => {
            alert(count);
        }, 3000);
    };
    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>Alert Count</button>
        </div>
    );
}
~~~
- 重点关注 <Example> 函数组件的代码，其中的 count 属性由父组件传入，初始值为 0，每隔一秒增加 1。点击 "Alert Count" 按钮，将延迟 3 秒钟弹出 count 的值。操作后发现，弹窗中出现的值，与页面中文本展示的值不同，而是等于点击 "alert Count" 按钮时 count 的值。
- 也就是函数组件，每次被调用。都通过父类传递props，每一帧中props都是独立的，而且由于闭包的存在，使得定时器的回调函数是在未来发生的，但 props.count 的值是在声明 handleClick 函数时就已经决定好的。
~~~js
class Example2 extends Component {
    handleClick = () => {
        setTimeout(() => {
            alert(this.props.count);
        }, 3000);
    };

    render() {
        return (
            <div>
                <h2>Example2</h2>
                <p>{this.props.count}</p>
                <button onClick={this.handleClick}>Alert Count</button>
            </div>
        );
    }
}
~~~
- class组件有自己的状态管理，this。this 是固定指向同一个组件实例的。在 3 秒的延时器生效后，组件重新进行了渲染，this.props 也发生了改变。当延时的回调函数执行时，读取到的 this.props 是当前组件最新的属性值。
## 状态
- 可以简单的认为，在某个组件中，对于返回的 React Elements 树形结构，某个位置的 element ，其类型与 key 属性均不变，React 便会选择重用该组件实例；否则，比如从 <A/> 组件切换到了 <B/> 组件，会销毁 A，然后重建 B，B 此时会执行第一帧。
- 在实例中，可以通过 useState 等方式拥有局部状态。在重用的过程中，这些状态会得到保留。而如果无法重用，状态会被销毁。
- 例如 useState，为当前的函数组件创建了一个状态，这个状态的值独立于函数存放。 useState 会返回一个数组，在该数组中，得到该状态的值和更新该状态的方法。通过解构，该状态的值会赋值到当前 render 函数作用域下的一个常量 state 中。
~~~js
const [state, setState] = useState(initialState);
~~~
- 当组件被创建而不是重用时，即在组件的第一帧中，该状态将被赋予初始值 initialState，而之后的重用过程中，不会被重复赋予初始值。
- 通过调用 setState ，可以更新状态的值。
## 每一帧拥有独立的状态
- 需要明确的是，state 作为函数中的一个常量，就是普通的数据，并不存在诸如数据绑定这样的操作来驱使 DOM 发生更新。在调用 setState 后，React 将重新执行 render 函数，仅此而已。
- 因此，状态也是函数作用域下的普通变量。我们可以说每次函数执行拥有独立的状态。
~~~js
function Example2() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setTimeout(() => {
            setCount(count + 1);
        }, 3000);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>
                setCount
            </button>
            <button onClick={handleClick}>
                Delay setCount
            </button>
        </div>
    );
}

~~~
- 在第一帧中，p 标签中的文本为 0。点击 "Delay setCount"，文本依然为 0。随后在 3 秒内连续点击 "setCount" 两次，将会分别执行第二帧和第三帧。你将看到 p 标签中的文本由 0 变化为 1, 2。但在点击 "Delay setCount" 3 秒后，文本重新变为 1。
~~~js
// 第一帧
const count_1 = 0;

const handleClick_1 = () => {
    const delayAction_1 = () => {
        setCount(count_1 + 1);
    };
    setTimeout(delayAction_1, 3000);
};

//...
<button onClick={handleClick_1}>
//...

// 点击 "setCount" 后第二帧
const count_2 = 1;

const handleClick_2 = () => {
    const delayAction_2 = () => {
        setCount(count_2 + 1);
    };
    setTimeout(delayAction_2, 3000);
};

//...
<button onClick={handleClick_2}>
//...

// 再次点击 "setCount" 后第三帧
const count_3 = 2;

const handleClick_3 = () => {
    const delayAction_3 = () => {
        setCount(count_3 + 1);
    };
    setTimeout(delayAction_3, 3000);
};

//...
<button onClick={handleClick_3}>
//...

~~~
- count，handleClick 都是 Example2 函数作用域中的常量。在点击 "Delay setCount" 时，定时器设置 3000ms 到期后的执行函数为 delayAction_1，函数中读取 count_1 常量的值是 0，这和第二帧的 count_2 无关。
## 获取过去或未来帧中的值
- 对于 state，如果想要在第一帧时点击 "Delay setCount" ，在一个异步回调函数的执行中，获取到 count 最新一帧中的值，不妨向 setCount 传入函数作为参数。
- 其他情况下，例如需要读取到 state 及其衍生的某个常量，相对于变量声明时所在帧过去或未来的值，就需要使用 **useRef，通过它来拥有一个在所有帧中共享的变量**。
- 如果要与 class 组件进行比较，useRef 的作用相对于让你在 class 组件的 this 上追加属性。
~~~js
const refContainer = useRef(initialValue);
~~~
- 在组件的第一帧中，refContainer.current 将被赋予初始值 initialValue，之后便不再发生变化。但你可以自己去设置它的值。**设置它的值不会重新触发 render 函数。**
- 例如，我们把第 n 帧的某个 props 或者 state 通过 useRef 进行保存，在第 n + 1 帧可以读取到过去的，第 n 帧中的值。我们也可以在第 n + 1 帧使用 ref 保存某个 props 或者 state，然后在第 n 帧中声明的异步回调函数中读取到它。
- 获取未来帧中的值
~~~js
function Example() {
    const [count, setCount] = useState(0);

    const currentCount = useRef(count);

    currentCount.current = count;

    const handleClick = () => {
        setTimeout(() => {
            setCount(currentCount.current + 1);
        }, 3000);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>
                setCount
            </button>
            <button onClick={handleClick}>
                Delay setCount
            </button>
        </div>
    );
}
~~~
- 获取过去帧中的值
~~~js
function Example4() {
    const [count, setCount] = useState(1);

    const prevCountRef = useRef(1); // 设置相同的初始值
    const prevCount = prevCountRef.current; // 之前帧的值
    prevCountRef.current = count; // 同步当前帧

    const handleClick = () => {
        setCount(prevCount + count);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={handleClick}>SetCount</button>
        </div>
    );
}

~~~
- 这段代码实现的功能是，count 初始值为 1，点击按钮后累加到 2，随后点击按钮，总是用当前 count 的值和前一个 count 的值进行累加，得到新的 count 的值。
- prevCountRef 在 render 函数执行的过程中，与最新的 count state 进行了同步。由于在同步前，我们将该 ref 保存到函数作用域下的另一个变量 prevCount 中，因此我们总是能够获取到前一个 count 的值。
- 同样的方法，我们可以用于保存任何值：某个 prop，某个 state 变量，甚至一个函数等。在后面的 Effects 部分，我们会继续使用 refs 为我们带来好处。
## 每一帧可以拥有独立的 Effects
- effect 为作用，或者副作用。
- 如果弄清了前面的『每一帧拥有独立的变量』的概念，你会发现，若某个 useEffect/useLayoutEffect 有且仅有一个函数作为参数，那么每次 render 函数执行时该 Effects 也是独立的。因为它是在 render 函数中选择适当时机的执行
- 对于 useEffect 来说，执行的时机是完成所有的 DOM 变更并让浏览器渲染页面后，而 useLayoutEffect 和 class 组件中 componentDidMount, componentDidUpdate一致——在 React 完成 DOM 更新后马上同步调用，会阻塞页面渲染
- 如果 useEffect 没有传入第二个参数，那么第一个参数传入的 effect 函数在每次 render 函数执行是都是独立的。每个 effect 函数中捕获的 props 或 state 都来自于那一次的 render 函数（帧）。
~~~js
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log(`You clicked ${count} times`);
        }, 3000);
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
        </div>
    );
}
~~~
- 在这个例子中，每一次对 count 进行改变，重新执行 render 函数后，延迟 3 秒打印 count 的值。
- 如果我们不停地点击按钮，打印的结果是什么呢？
- 我们发现经过延时后，每个 count 的值被依次打印了，他们从 0 开始依次递增，且不重复。
- 如果换成 class 组件，尝试使用 componentDidUpdate 去实现，会得到不一样的结果：
~~~js
componentDidUpdate() {
    setTimeout(() => {
        console.log(`You clicked ${this.state.count} times`);
    }, 3000);
}
~~~
- this.state.count 总是指向最新的 count 值，而不是属于某次调用 render 函数时的值。  
- 因此，在使用 useEffect 时，应当抛开在 class 组件中关于生命周期的思维。他们并不相同。在 useEffect 中刻意寻找那几个生命周期函数的替代写法，将会陷入僵局，无法充分发挥 useEffect 的能力。
## 在比对中执行 Effects
- React 针对 React Elements 前后值进行对比，只去更新 DOM 真正发生改变的部分。对于 Effects，能否有类似这样的理念呢？
- 某个 Effects 函数一旦执行，函数内的副作用已经发生，React 无法猜测到函数相比于上一次做了哪些变化。但我们可以给 useEffect 传入第二个参数，作为依赖数组 (deps)，避免 Effects 不必要的重复调用。
- 这个 deps 的含义是：当前 Effect 依赖了哪些变量。
- 但有时问题不一定能解决。比如官网就有 这样的例子：
~~~js
const [count, setCount] = useState(0);

useEffect(() => {
    const id = setInterval(() => {
        setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
}, [count]);

~~~
- 如果我们频繁修改 count，每次执行 Effect，上一次的计时器被清除，需要调用 setInterval 重新进入时间队列，实际的定期时间被延后，甚至有可能根本没有机会被执行。
- 但是下面这样的实践方式也不宜采用：
- 在 Effect 函数中寻找一些变量添加到 deps 中，需要满足条件：其变化时，需要重新触发 effect。
按照这种实践方式，count 变化时，我们并不希望重新 setInterval，故 deps 为空数组。这意味着该 hook 只在组件挂载时运行一次。Effect 中明明依赖了 count，但我们撒谎说它没有依赖，那么当 setInterval 回调函数执行时，获取到的 count 值永远为 0。
- 可以看到，在 setCount 中用到了 count，为的是把 count 转换为 count + 1 ，然后返回给 React。React 其实已经知道当前的 count，我们需要告知 React 的仅仅是去递增状态，不管它现在具体是什么值。
- 所以有一个最佳实践：状态变更时，应该通过 setState 的函数形式来代替直接获取当前状态。
~~~js
setCount(c => c + 1);
~~~
- 另外一种场景是：
~~~js
const [count, setCount] = useState(0);

useEffect(() => {
    const id = setInterval(() => {
        console.log(count);
    }, 1000);
    return () => clearInterval(id);
}, []);
~~~
- 在这里，同样的，当count 变化时，我们并不希望重新 setInterval。但我们可以把 count 通过 ref 保存起来
~~~js
const [count, setCount] = useState(0);
const countRef = useRef();
countRef.current = count;

useEffect(() => {
    const id = setInterval(() => {
        console.log(countRef.current);
    }, 1000);
    return () => clearInterval(id);
}, []);
~~~
- 这样，count 的确不再被使用，而是用 ref 存储了一个在所有帧中共享的变量。
- 另外的情况是，Effects 依赖了函数或者其他引用类型。与原始数据类型不同的是，在未优化的情况下，每次 render 函数调用时，因为对这些内容的重新创建，其值总是发生了变化，导致 Effects 在使用 deps 的情况下依然会频繁被调用。
- 对于这个问题，官网的 FAQ 已经给出了答案：**对于函数，使用 useCallback 避免重复创建；对于对象或者数组，则可以使用 useMemo。从而减少 deps 的变化**
## 使用 ESLint 插件
- 使用 ESLint 插件 eslint-plugin-react-hooks@>=2.4.0，很有必要。
- 该插件除了帮你检查使用 Hook 需要遵循的两条规则外，还会向你提示在使用 useEffect 或者 useMemo 时，deps 应该填入的内容。
- 如果你正在使用 VSCode，并且安装了 ESLint 扩展。当你编写 useEffect 或者 useMemo ，且 deps 中的内容并不完整时，deps 所在的那一行便会给出警告或者错误的提示，并且会有一个快速修复的功能，该功能会为你自动填入缺失的 deps。
- 对于这些提示，不要暴力地通过 eslint-disable 禁用。未来，你可能再次修改该 useEffect 或者 useMemo，如果使用了新的依赖并且在 deps 中漏掉了它，便会引发新的问题。有一些场景，比如 useEffect 依赖一个函数，并且填入 deps 了。但是这个函数使用了 useCallback 且 deps 出现了遗漏，这种情况下一旦出现问题，排查的难度会很大，所以为什么要让 ESLint 沉默呢？
- 尝试用上一节的方法进行分析，对于一些变量不希望引起 effect 重新更新的，使用 ref 解决。对于获取状态用于计算新的状态的，尝试 setState 的函数入参，或者使用 useReducer 整合多个类型的状态。
## 使用 useMemo/useCallback
- useMemo 的含义是，通过一些变量计算得到新的值。通过把这些变量加入依赖 deps，当 deps 中的值均未发生变化时，跳过这次计算。useMemo 中传入的函数，将在 render 函数调用过程被同步调用。
- 可以使用 useMemo 缓存一些相对耗时的计算。
- 除此以外，useMemo 也非常适合用于存储引用类型的数据，可以传入对象字面量，匿名函数等，甚至是 React Elements
~~~js
const data = useMemo(() => ({
    a,
    b,
    c,
    d: 'xxx'
}), [a, b, c]);

// 可以用 useCallback 代替
const fn = useMemo(() => () => {
    // do something
}, [a, b]);

const memoComponentsA = useMemo(() => (
    <ComponentsA {...someProps} />
), [someProps]);
~~~
- 在这些例子中，useMemo 的目的其实是尽量使用缓存的值。
- 对于函数，其作为另外一个 useEffect 的 deps 时，减少函数的重新生成，就能减少该 Effect 的调用，甚至避免一些死循环的产生;
- 对于对象和数组，如果某个子组件使用了它作为 props，减少它的重新生成，就能避免子组件不必要的重复渲染，提升性能。
- 未优化的代码如下：
~~~js
const data = { id };

return <Child data={data}>;
~~~
- 此时，每当父组件需要 render 时，子组件也会执行 render。如果使用 useMemo 对 data 进行优化：
~~~js
const data = useMemo(() => ({ id }), [id]);

return <Child data={data}>;
~~~
- 当父组件 render 时，只要满足 id 不变，data 的值也不会发生变化，子组件也将避免 render。
- 对于组件返回的 React Elements，**我们可以选择性地提取其中一部分 elements，通过 useMemo 进行缓存，也能避免这一部分的重复渲染**。
- 在过去的 class 组件中，我们通过 shouldComponentUpdate 判断当前属性和状态是否和上一次的相同，来避免组件不必要的更新。**其中的比较是对于本组件的所有属性和状态而言的，无法根据 shouldComponentUpdate 的返回值来使该组件一部分 elements 更新，另一部分不更新**。
- 为了进一步优化性能，我们会对大组件进行拆分，拆分出的小组件只关心其中一部分属性，从而有更多的机会不去更新。
- 而函数组件中的 useMemo 其实就可以代替这一部分工作。为了方便理解，我们来看
~~~js
function Example(props) {
    const [count, setCount] = useState(0);
    const [foo] = useState("foo");

    const main = (
        <div>
            <Item key={1} x={1} foo={foo} />
            <Item key={2} x={2} foo={foo} />
            <Item key={3} x={3} foo={foo} />
            <Item key={4} x={4} foo={foo} />
            <Item key={5} x={5} foo={foo} />
        </div>
    );

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            {main}
        </div>
    );
}
~~~
- 假设 <Item> 组件，其自身的 render 消耗较多的时间。默认情况下，每次 setCount 改变 count 的值，便会重新对 <Example> 进行 render，其返回的 React Elements 中3个 <Item> 也重新 render，其耗时的操作阻塞了 UI 的渲染。导致按下 "setCount" 按钮后出现了明显的卡顿。
- 为了优化性能，我们可以将 main 变量这一部分单独作为一个组件 <Main>，拆分出去，并对  <Main> 使用诸如 React.memo , shouldComponentUpdate 的方式，使 count 属性变化时，<Main> 不重复 render。
~~~js
const Main = React.memo((props) => {
    const { foo }= props;
    return (
        <div>
            <Item key={1} x={1} foo={foo} />
                <Item key={2} x={2} foo={foo} />
                <Item key={3} x={3} foo={foo} />
                <Item key={4} x={4} foo={foo} />
                <Item key={5} x={5} foo={foo} />
        </div>
    );
});
~~~
- 而现在，我们可以使用 useMemo，避免了组件拆分，代码也更简洁易懂：
~~~js
function Example(props) {
    const [count, setCount] = useState(0);
    const [foo] = useState("foo");

    const main = useMemo(() => (
        <div>
            <Item key={1} x={1} foo={foo} />
            <Item key={2} x={2} foo={foo} />
            <Item key={3} x={3} foo={foo} />
            <Item key={4} x={4} foo={foo} />
            <Item key={5} x={5} foo={foo} />
        </div>
    ), [foo]);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            {main}
        </div>
    );
}

~~~

## 惰性初始值
- 对于 state，其拥有 惰性初始化的方法。可能有人不明白它的作用。
- someExpensiveComputation 是一个相对耗时的操作。如果我们直接采用
~~~js
const initialState = someExpensiveComputation(props);
const [state, setState] = useState(initialState);
~~~
- 注意，虽然 initialState 只在初始化时有其存在的价值，但是 someExpensiveComputation 在每一帧都被调用了。只有当使用惰性初始化的方法：
~~~js
const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
});
~~~
- 因 someExpensiveComputation 运行在一个匿名函数下，该函数当且仅当初始化时被调用，从而优化性能。
- 我们甚至可以跳出计算 state 这一规定，来完成任何昂贵的初始化操作。
~~~js
useState(() => {
    someExpensiveComputation(props);
    return null;
});
~~~
## 避免滥用 refs
- 当 useEffect 的依赖频繁变化，你可能想到把频繁变化的值用 ref 保存起来。然而，useReducer 可能是更好的解决方式：使用 dispatch 消除对一些状态的依赖。官网的 FAQ 有详细的解释.
- 最终可以总结出这样的实践: 
**useEffect 对于函数依赖，尝试将该函数放置在 effect 内，或者使用 useCallback 包裹；useEffect/useCallback/useMemo，对于 state 或者其他属性的依赖，根据 eslint 的提示填入 deps；如果不直接使用 state，只是想修改 state，用 setState 的函数入参方式（setState(c => c + 1)）代替；如果修改 state 的过程依赖了其他属性，尝试将 state 和属性聚合，改写成 useReducer 的形式。当这些方法都不奏效，使用 ref，但是依然要谨慎操作。**

## 避免滥用 useMemo
- 使用 useMemo 当 deps 不变时，直接返回上一次计算的结果，从而使子组件跳过渲染。
- 但是当返回的是原始数据类型（如字符串、数字、布尔值）。**即使参与了计算，只要 deps 依赖的内容不变，返回结果也很可能是不变的**。**此时就需要权衡这个计算的时间成本和 useMemo 额外带来的空间成本（缓存上一次的结果）了**。
- 此外，如果 useMemo 的 deps 依赖数组为空，这样做说明你只是希望存储一个值，这个值在重新 render 时永远不会变。
- 比如：
~~~js
const Comp = () => {
    const data = useMemo(() => ({ type: 'xxx' }), []);
    return <Child data={data}>;
}
~~~
- 可以被替换为：
~~~js
const Comp = () => {
    const { current: data } = useRef({ type: 'xxx' });
    return <Child data={data}>;
}

~~~
- 此外，如果 deps 频繁变动，我们也要思考，使用 useMemo 是否有必要。因为 useMemo 占用了额外的空间，还需要在每次 render 时检查 deps 是否变动，反而比不使用 useMemo 开销更大。
## 受控与非受控
### 非受控
- 在一个自定义 Hooks，我们可能有这样一段逻辑：
~~~js
useSomething = (inputCount) => {
    const [ count, setCount ] = setState(inputCount);
};
~~~
- 这里有一个问题，外部传入的 inputCount 属性发生了变化，使其与 useSomething Hook 内的 count state 不一致时，是否想要更新这个 count ？
- 默认不会更新，因为 useState 参数代表的是初始值，仅在 useSomething 初始时赋值给了 count state。后续 count 的状态将与 inputCount 无关。**这种外部无法直接控制 state 的方式，我们称为非受控**。
### 受控
- 如果想被外部传入的 props 始终控制，比如在这个例子中，useSomething 内部，count 这一 state 的值需要从 inputCount 进行同步，需要这样写：
~~~js
useSomething = (inputCount) => {
    const [ count, setCount ] = setState(inputCount);
    setCount(inputCount);
};
~~~
- setCount后，React 会立即退出当前的 render 并用更新后的 state 重新运行 render 函数。这一点，官网文档 是有说明的。
- 在这种的机制下，state 由外界同步的同时，内部又有可能通过 setState 来修改 state，可能引发新的问题。例如 useSomething 初始时，count 为 0，后续内部通过 setCount 修改了 count 为 1。当外部函数组件的 render 函数重新调用，也会再一次调用 useSomething，此时传入的 inputCount 依然是 0，就会把 count 变回 0。这很可能不符合预期。

- 遇到这样的问题，建议将 inputCount 的当前值与上一次的值进行比较，只有确定发生变化时执行 setCount(inputCount) 。
- 当然，在特殊的场景下，这样的设定也不一定符合需求。官网的这篇文章 有提出类似的问题。
## 应用场景
### 我该使用单个 state 变量还是多个 state 变量？
- useState 的出现，让我们可以使用多个 state 变量来保存 state，比如：
~~~js
const [width, setWidth] = useState(100);
const [height, setHeight] = useState(100);
const [left, setLeft] = useState(0);
const [top, setTop] = useState(0);
~~~
- 但同时，我们也可以像 Class 组件的 this.state 一样，将所有的 state 放到一个 object 中，这样只需一个 state 变量即可：
~~~js
const [state, setState] = useState({
  width: 100,
  height: 100,
  left: 0,
  top: 0
});
~~~
- so, 到底该用单个 state 变量还是多个 state 变量呢？
- 如果使用单个 state 变量，每次更新 state 时需要合并之前的 state。因为 useState 返回的 setState 会替换原来的值。这一点和 Class 组件的 this.setState 不同。this.setState 会把更新的字段自动合并到 this.state 对象中。
- 使用多个 state 变量可以让 state 的粒度更细，更易于逻辑的拆分和组合。比如，我们可以将关联的逻辑提取到自定义 Hook 中：
~~~js
const handleMouseMove = (e) => {
  setState((prevState) => ({
    ...prevState,
    left: e.pageX,
    top: e.pageY,
  }))
};
~~~
- 在使用 state 之前，我们需要考虑状态拆分的「粒度」问题。如果粒度过细，代码就会变得比较冗余。如果粒度过粗，代码的可复用性就会降低。那么，到底哪些 state 应该合并，哪些 state 应该拆分呢?
1. 将完全不相关的 state 拆分为多组 state。比如 size 和 position。
2. 如果某些 state 是相互关联的，或者需要一起发生改变，就可以把它们合并为一组 state。比如 left 和 top。
### deps 依赖过多，导致 Hooks 难以维护？
- 使用 useEffect hook 时，为了避免每次 render 都去执行它的 callback，我们通常会传入第二个参数「dependency array」（下面统称为依赖数组）。这样，只有当依赖数组发生变化时，才会执行 useEffect 的回调函数。
- **依赖数组中必须包含在 callback 内部用到的所有参与 React 数据流的值，比如 state、props 以及它们的衍生物**。如果有遗漏，可能会造成 bug。这其实就是 JS 闭包问题
- 在 React 中，除了 useEffect 外，接收依赖数组作为参数的 Hook 还有 useMemo、useCallback 和 useImperativeHandle。我们刚刚也提到了，依赖数组中千万不要遗漏回调函数内部依赖的值。但是，如果依赖数组依赖了过多东西，可能导致代码难以维护。我在项目中就看到了这样一段代码：
~~~js
const refresh = useCallback(() => {
  // ...
}, [name, searchState, address, status, personA, personB, progress, page, size]);
~~~
- 不要说内部逻辑了，光是看到这一堆依赖就令人头大！如果项目中到处都是这样的代码，可想而知维护起来多么痛苦。如何才能避免写出这样的代码呢？
1. 首先，**你需要重新思考一下，这些 deps 是否真的都需要？**看下面这个例子：
~~~js
function Example({id}) {
  const requestParams = useRef({});

  useEffect(() => {
    requestParams.current = {page: 1, size: 20, id};
  });

  const refresh = useCallback(() => {
    doRefresh(requestParams.current);
  }, []);


  useEffect(() => {
    id && refresh();
  }, [id, refresh]); // 思考这里的 deps list 是否合理？
}
~~~
2. 其次，**如果这些依赖真的都是需要的，那么这些逻辑是否应该放到同一个 hook 中？**
~~~js
function Example({id, name, address, status, personA, personB, progress}) {
  const [page, setPage] = useState();
  const [size, setSize] = useState();

  const doSearch = useCallback(() => {
    // ...
  }, []);

  const doRefresh = useCallback(() => {
    // ...
  }, []);


  useEffect(() => {
    id && doSearch({name, address, status, personA, personB, progress});
    page && doRefresh({name, page, size});
  }, [id, name, address, status, personA, personB, progress, page, size]);
}
~~~
- 可以看出，在 useEffect 中有两段逻辑，这两段逻辑是相互独立的，因此我们可以将这两段逻辑放到不同 useEffect 中：
~~~js
useEffect(() => {
  id && doSearch({name, address, status, personA, personB, progress});
}, [id, name, address, status, personA, personB, progress]);

useEffect(() => {
  page && doRefresh({name, page, size});
}, [name,  page, size]);
~~~
3. **如果无法拆分，考虑合并这些依赖项**
~~~js
useEffect(() => {
  id && doSearch({name, address, status, personA, personB, progress});
}, [id, name, address, status, personA, personB, progress]);
~~~
- 这段代码中的 useEffect 依赖了七个值，还是偏多了。仔细观察上面的代码，可以发现这些值都是「过滤条件」的一部分，通过这些条件可以过滤页面上的数据。因此，我们可以将它们看做一个整体，也就是我们前面讲过的合并 state：
~~~js
const [filters, setFilters] = useState({
  name: "",
  address: "",
  status: "",
  personA: "",
  personB: "",
  progress: ""
});

useEffect(() => {
  id && doSearch(filters);
}, [id, filters]);
~~~
4. **如果 state 不能合并，在 callback 内部又使用了 setState 方法，那么可以考虑使用 setState callback 来减少一些依赖**。比如
~~~js
const useValues = () => {
  const [values, setValues] = useState({
    data: {},
    count: 0
  });

  const [updateData] = useCallback(
      (nextData) => {
        setValues({
          data: nextData,
          count: values.count + 1 // 因为 callback 内部依赖了外部的 values 变量，所以必须在依赖数组中指定它
        });
      },
      [values], 
  );

  return [values, updateData];
};
~~~
- 上面的代码中，我们必须在 useCallback 的依赖数组中指定 values，否则我们无法在 callback 中获取到最新的 values 状态。但是，通过 setState 回调函数，我们不用再依赖外部的 values 变量，因此也无需在依赖数组中指定它。就像下面这样：
~~~js
const useValues = () => {
  const [values, setValues] = useState({});

  const [updateData] = useCallback((nextData) => {
    setValues((prevValues) => ({
      data: nextData,
      count: prevValues.count + 1, // 通过 setState 回调函数获取最新的 values 状态，这时 callback 不再依赖于外部的 values 变量了，因此依赖数组中不需要指定任何值
    }));
  }, []); // 这个 callback 永远不会重新创建

  return [values, updateData];
};
~~~
5. **最后，还可以通过 ref 来保存可变变量**
- 以前我们只把 ref 用作保持 DOM 节点引用的工具，可 useRef Hook 能做的事情远不止如此。我们可以用它来保存一些值的引用，并对它进行读写。举个例子：
~~~js
const useValues = () => {
  const [values, setValues] = useState({});
  const latestValues = useRef(values);

  useEffect(() => {
    latestValues.current = values;
  });

  const [updateData] = useCallback((nextData) => {
    setValues({
      data: nextData,
      count: latestValues.current.count + 1,
    });
  }, []);

  return [values, updateData];
};
~~~
- 在使用 ref 时要特别小心，因为它可以随意赋值，所以一定要控制好修改它的方法。特别是一些底层模块，在封装的时候千万不要直接暴露 ref，而是提供一些修改它的方法。
- 总结: 说了这么多，归根到底都是为了写出更加清晰、易于维护的代码。如果发现依赖数组依赖过多，我们就需要重新审视自己的代码。
>
依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
如果发现依赖数组依赖的值过多，我们应该采取一些方法来减少它。
    去掉不必要的依赖。
    将 Hook 拆分为更小的单元，每个 Hook 依赖于各自的依赖数组。
    通过合并相关的 state，将多个依赖值聚合为一个。
    通过 setState 回调函数获取最新的 state，以减少外部依赖。
    通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径。
>
### 该不该使用 useMemo？
- 首先，我们需要知道**useMemo本身也有开销**。useMemo 会「记住」一些值，同时在后续 render 时，将依赖数组中的值取出来和上一次记录的值进行比较，如果不相等才会重新执行回调函数，否则直接返回「记住」的值。这个过程本身就会消耗一定的内存和计算资源。因此，过度使用 useMemo 可能会影响程序的性能。
- 要想合理使用 useMemo，我们需要搞清楚 useMemo 适用的场景：
1. 有些计算开销很大，我们就需要「记住」它的返回值，避免每次 render 都去重新计算
2. 由于值的引用发生变化，导致下游组件重新渲染，我们也需要「记住」这个值。
- 让我们来看个例子：
~~~js
interface IExampleProps {
  page: number;
  type: string;
}

const Example = ({page, type}: IExampleProps) => {
  const resolvedValue = useMemo(() => {
    return getResolvedValue(page, type);
  }, [page, type]);

  return <ExpensiveComponent resolvedValue={resolvedValue}/>;
};
~~~
- 在上面的例子中，渲染 ExpensiveComponent 的开销很大。所以，当 resolvedValue 的引用发生变化时，作者不想重新渲染这个组件。因此，作者使用了 useMemo，避免每次 render 重新计算 resolvedValue，导致它的引用发生改变，从而使下游组件 re-render。
- 这个担忧是正确的，但是使用 useMemo 之前，我们应该先思考两个问题
>
1. 传递给 useMemo 的函数开销大不大？在上面的例子中，就是考虑 getResolvedValue 函数的开销大不大。JS 中大多数方法都是优化过的，比如 Array.map、Array.forEach 等。如果你执行的操作开销不大，那么就不需要记住返回值。否则，使用 useMemo 本身的开销就可能超过重新计算这个值的开销。因此，对于一些简单的 JS 运算来说，我们不需要使用 useMemo 来「记住」它的返回值。
2. 当输入相同时，「记忆」值的引用是否会发生改变？在上面的例子中，就是当 page 和 type 相同时，resolvedValue 的引用是否会发生改变？这里我们就需要考虑 resolvedValue 的类型了。如果 resolvedValue 是一个对象，由于我们项目上使用「函数式编程」，每次函数调用都会产生一个新的引用。但是，如果 resolvedValue 是一个原始值（string, boolean, null, undefined, number, symbol），也就不存在「引用」的概念了，每次计算出来的这个值一定是相等的。也就是说，ExpensiveComponent 组件不会被重新渲染。
>
- 因此，如果 getResolvedValue 的开销不大，并且 resolvedValue 返回一个字符串之类的原始值，那我们完全可以去掉 useMemo，就像下面这样：
~~~js
interface IExampleProps {
  page: number;
  type: string;
}

const Example = ({page, type}: IExampleProps) => {
  const resolvedValue = getResolvedValue(page, type);
  return <ExpensiveComponent resolvedValue={resolvedValue}/>;
};
~~~
- 还有一个误区就是对创建函数开销的评估。有的人觉得在 render 中创建函数可能会开销比较大，为了避免函数多次创建，使用了 useMemo 或者 useCallback。但是对于现代浏览器来说，创建函数的成本微乎其微。因此，我们没有必要使用 useMemo 或者 useCallback 去节省这部分性能开销。当然，如果是为了保证每次 render 时回调的引用相等，你可以放心使用 useMemo 或者 useCallback。
-**在编写自定义 Hook 时，返回值一定要保持引用的一致性。因为你无法确定外部要如何使用它的返回值。如果返回值被用做其他 Hook 的依赖，并且每次 re-render 时引用不一致（当值相等的情况），就可能会产生 bug**。比如：
~~~js
function Example() {
  const data = useData();
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    setDataChanged((prevDataChanged) => !prevDataChanged); // 当 data 发生变化时，调用 setState。如果 data 值相同而引用不同，就可能会产生非预期的结果。
  }, [data]);

  console.log(dataChanged);

  return <ExpensiveComponent data={data} />;
}

const useData = () => {
  // 获取异步数据
  const resp = getAsyncData([]);

  // 处理获取到的异步数据，这里使用了 Array.map。因此，即使 data 相同，每次调用得到的引用也是不同的。
  const mapper = (data) => data.map((item) => ({...item, selected: false}));

  return resp ? mapper(resp) : resp;
};
~~~
- 在上面的例子中，我们通过 useData Hook 获取了 data。每次 render 时 data 的值没有发生变化，但是引用却不一致。如果把 data 用到 useEffect 的依赖数组中，就可能产生非预期的结果。另外，由于引用的不同，也会导致 ExpensiveComponent 组件 re-render，产生性能问题
>
如果因为 prop 的值相同而引用不同，从而导致子组件发生 re-render，不一定会造成性能问题。因为 Virtual DOM re-render ≠ DOM re-render。但是当子组件特别大时，Virtual DOM 的 Diff 开销也很大。因此，还是应该尽量避免子组件 re-render。
>
- 因此，在使用 useMemo 之前，我们不妨先问自己几个问题：
>
1. 要记住的函数开销很大吗？
2. 返回的值是原始值吗？
3. 记忆的值会被其他 Hook 或者子组件用到吗？
>
- 应该使用 useMemo 的场景
1. 保持引用相等
>
- 对于组件内部用到的 object、array、函数等，如果用在了其他 Hook 的依赖数组中，或者作为 props 传递给了下游组件，应该使用 useMemo。
- 自定义 Hook 中暴露出来的 object、array、函数等，都应该使用 useMemo 。以确保当值相同时，引用不发生变化。
- 使用 Context 时，如果 Provider 的 value 中定义的值（第一层）发生了变化，即便用了 Pure Component 或者 React.memo，仍然会导致子组件 re-render。这种情况下，仍然建议使用 useMemo 保持引用的一致性。
>
2. 成本很高的计算
>
- 比如 cloneDeep 一个很大并且层级很深的数据
>
- 无需使用 useMemo 的场景
1. 如果返回的值是原始值： string, boolean, null, undefined, number, symbol（不包括动态声明的 Symbol），一般不需要使用 useMemo。
2. 仅在组件内部用到的 object、array、函数等（没有作为 props 传递给子组件），且没有用到其他 Hook 的依赖数组中，一般不需要使用 useMemo。
### Hooks 能替代高阶组件和 Render Props 吗？
- 在 Hooks 出现之前，我们有两种方法可以复用组件逻辑：Render Props 和高阶组件。但是这两种方法都可能会造成 JSX「嵌套地域」的问题。Hooks 的出现，让组件逻辑的复用变得更简单，同时解决了「嵌套地域」的问题。Hooks 之于 React 就像 async / await 之于 Promise 一样
- 那 Hooks 能替代高阶组件和 Render Props 吗？官方给出的回答是，在高阶组件或者 Render Props 只渲染一个子组件时，Hook 提供了一种更简单的方式。不过在我看来，Hooks 并不能完全替代 Render Props 和高阶组件。接下来，我们会详细分析这个问题。
#### 高阶组件 HOC
- 高阶组件采用了装饰器模式，让我们可以增强原有组件的功能，并且不破坏它原有的特性。例如：
~~~js
const RedButton = withStyles({
  root: {
    background: "red",
  },
})(Button);
~~~
- 在上面的代码中，我们希望保留 Button 组件的逻辑，但同时我们又不想使用它原有的样式。因此，我们通过 withStyles 这个高阶组件注入了自定义的样式，并且生成了一个新的组件 RedButton。
#### Render Props
- **Render Props 通过父组件将可复用逻辑封装起来，并把数据提供给子组件。至于子组件拿到数据之后要怎么渲染，完全由子组件自己决定**，灵活性非常高。而高阶组件中，渲染结果是由父组件决定的。Render Props 不会产生新的组件，而且更加直观的体现了「父子关系」。
~~~js
<Parent>
  {(data) => {
    // 你父亲已经把江山给你打好了，并给你留下了一堆金币，至于怎么花就看你自己了
    return <Child data={data} />;
  }}
</Parent>
~~~
- Render Props 作为 JSX 的一部分，可以很方便地利用 React 生命周期和 Props、State 来进行渲染，在渲染上有着非常高的自由度。同时，它不像 Hooks 需要遵守一些规则，你可以放心大胆的在它里面使用 if / else、map 等各类操作
- 在大部分情况下，高阶组件和 Render Props 是可以相互转换的，也就是说用高阶组件能实现的，用 Render Props 也能实现。只不过在不同的场景下，哪种方式使用起来简单一点罢了。
- 小结：没有 Hooks 之前，高阶组件和 Render Props 本质上都是将复用逻辑提升到父组件中。而 Hooks 出现之后，我们将复用逻辑提取到组件顶层，而不是强行提升到父组件中。这样就能够避免 HOC 和 Render Props 带来的「嵌套地域」。但是，像 Context 的 <Provider/> 和 <Consumer/> 这样有父子层级关系（树状结构关系）的，还是只能使用 Render Props 或者 HOC。
- 对于 Hooks、Render Props 和高阶组件来说，它们都有各自的使用场景：
- Hooks：
    - 替代 Class 的大部分用例，除了 getSnapshotBeforeUpdate 和 componentDidCatch 还不支持。
    - 提取复用逻辑。除了有明确父子关系的，其他场景都可以使用 Hooks。
- Render Props：在组件渲染上拥有更高的自由度，可以根据父组件提供的数据进行动态渲染。适合有明确父子关系的场景。
- 高阶组件：适合用来做注入，并且生成一个新的可复用组件。适合用来写插件。
- 不过，能使用 Hooks 的场景还是应该优先使用 Hooks，其次才是 Render Props 和 HOC。当然，Hooks、Render Props 和 HOC 不是对立的关系。我们既可以用 Hook 来写 Render Props 和 HOC，也可以在 HOC 中使用 Render Props 和 Hooks。
### 使用 Hooks 时还有哪些好的实践？
1. 若 Hook 类型相同，且依赖数组一致时，应该合并成一个 Hook。否则会产生更多开销。
~~~js
const dataA = useMemo(() => {
  return getDataA();
}, [A, B]);

const dataB = useMemo(() => {
  return getDataB();
}, [A, B]);

// 应该合并为

const [dataA, dataB] = useMemo(() => {
  return [getDataA(), getDataB()]
}, [A, B]);
~~~
2. 参考原生 Hooks 的设计，自定义 Hooks 的返回值可以使用 Tuple 类型，更易于在外部重命名。但如果返回值的数量超过三个，还是建议返回一个对象。
~~~js
export const useToggle = (defaultVisible: boolean = false) => {
  const [visible, setVisible] = useState(defaultVisible);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return [visible, show, hide] as [typeof visible, typeof show, typeof hide];
};

const [isOpen, open, close] = useToggle(); // 在外部可以更方便地修改名字
const [visible, show, hide] = useToggle();
~~~
3. ref 不要直接暴露给外部使用，而是提供一个修改值的方法。
4. 在使用 useMemo 或者 useCallback 时，确保返回的函数只创建一次。也就是说，函数不会根据依赖数组的变化而二次创建。举个例子：
~~~js
export const useCount = () => {
  const [count, setCount] = useState(0);

  const [increase, decrease] = useMemo(() => {
    const increase = () => {
      setCount(count + 1);
    };

    const decrease = () => {
      setCount(count - 1);
    };
    return [increase, decrease];
  }, [count]);

  return [count, increase, decrease];
};
~~~
- 在 useCount Hook 中， count 状态的改变会让 useMemo 中的 increase 和 decrease 函数被重新创建。由于闭包特性，如果这两个函数被其他 Hook 用到了，我们应该将这两个函数也添加到相应 Hook 的依赖数组中，否则就会产生 bug。比如：
~~~js
function Counter() {
  const [count, increase] = useCount();

  useEffect(() => {
    const handleClick = () => {
      increase(); // 执行后 count 的值永远都是 1
    };

    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []); 

  return <h1>{count}</h1>;
}
~~~
- 在 useCount 中，increase 会随着 count 的变化而被重新创建。但是 increase 被重新创建之后， useEffect 并不会再次执行，所以 useEffect 中取到的 increase 永远都是首次创建时的 increase 。而首次创建时 count 的值为 0，因此无论点击多少次， count 的值永远都是 1。
- 那把 increase 函数放到 useEffect 的依赖数组中不就好了吗？事实上，这会带来更多问题
>
- increase 的变化会导致频繁地绑定事件监听，以及解除事件监听。
- 需求是只在组件 mount 时执行一次 useEffect，但是 increase 的变化会导致 useEffect 多次执行，不能满足需求。
>
- 如何解决这些问题呢？
一、通过 setState 回调，让函数不依赖外部变量。例如：
~~~js
export const useCount = () => {
  const [count, setCount] = useState(0);

  const [increase, decrease] = useMemo(() => {
    const increase = () => {
      setCount((latestCount) => latestCount + 1);
    };

    const decrease = () => {
      setCount((latestCount) => latestCount - 1);
    };
    return [increase, decrease];
  }, []); // 保持依赖数组为空，这样 increase 和 decrease 方法都只会被创建一次

  return [count, increase, decrease];
};
~~~
二、通过 ref 来保存可变变量。例如：
~~~js
export const useCount = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  });

  const [increase, decrease] = useMemo(() => {
    const increase = () => {
      setCount(countRef.current + 1);
    };

    const decrease = () => {
      setCount(countRef.current - 1);
    };
    return [increase, decrease];
  }, []); // 保持依赖数组为空，这样 increase 和 decrease 方法都只会被创建一次

  return [count, increase, decrease];
};
~~~
### 最后
- 我们总结了在实践中一些常见的问题，并提出了一些解决方案。最后让我们再来回顾一下：
1. 将完全不相关的 state 拆分为多组 state。
2. 如果某些 state 是相互关联的，或者需要一起发生改变，就可以把它们合并为一组 state。
3. 依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
4. 如果发现依赖数组依赖的值过多，我们应该采取一些方法来减少它。
    - 去掉不必要的依赖。
    - 将 Hook 拆分为更小的单元，每个 Hook 依赖于各自的依赖数组。
    - 通过合并相关的 state，将多个依赖值聚合为一个。
    - 通过 setState 回调函数获取最新的 state，以减少外部依赖。
    - 通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径。
5. 应该使用 useMemo 的场景：
    - 保持引用相等
    - 成本很高的计算
6. 无需使用 useMemo 的场景：
    - 如果返回的值是原始值： string, boolean, null, undefined, number, symbol（不包括动态声明的 Symbol），一般不需要使用 useMemo。
    - 仅在组件内部用到的 object、array、函数等（没有作为 props 传递给子组件），且没有用到其他 Hook 的依赖数组中，一般不需要使用 useMemo。
7. Hooks、Render Props 和高阶组件都有各自的使用场景，具体使用哪一种要看实际情况。
8. 若 Hook 类型相同，且依赖数组一致时，应该合并成一个 Hook。
9. 自定义 Hooks 的返回值可以使用 Tuple 类型，更易于在外部重命名。如果返回的值过多，则不建议使用。
10. ref 不要直接暴露给外部使用，而是提供一个修改值的方法。
11. 在使用 useMemo 或者 useCallback 时，可以借助 ref 或者 setState callback，确保返回的函数只创建一次。也就是说，函数不会根据依赖数组的变化而二次创建。
## 总结
- 在使用Hooks时，忽略掉 class 组件的生命周期，重新审视函数式组件的意义，是用好 React Hooks 的关键一步。
