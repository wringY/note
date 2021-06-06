<!--
 * @Desc: 
 * @Author: wringY
 * @Date: 2021-05-23 12:59:37
 * @LastEditTime: 2021-05-23 14:19:41
 * @FilePath: \react-appc:\Users\97432\Desktop\react\TS\learn\react+ts开始.md
-->


# react引入

~~~ts
import * as React from 'react'

import * as ReactDOM from 'react-dom'

~~~

- 这种引用方式[被证明](https://www.reddit.com/r/reactjs/comments/iyehol/import_react_from_react_will_go_away_in_distant/)是最可靠的一种方式， **推荐使用**。
- 而另外一种引用方式:

~~~ts
import React from 'react'

import ReactDOM from 'react-dom'

~~~

- 需要添加额外的配置："allowSyntheticDefaultImports": true

~~~ts
ReactDOM.render(<App />, document.querySelector('#app') as HTMLElement );
~~~

# 组件创建

- 与正常创建组件一样，只不过类组件的 construct函数中，需要把props：any
- 对应函数组件, 第一种：也是比较**推荐**的一种，使用 **React.FunctionComponent**，简写形式：**React.FC:**

~~~tsx
interface FooProps {
    bbb: string
}
const Foo: React.FC<FooProps> = ({bbb, children}) => (
    <div>
        {bbb}
        {children}
    </div>
)
export default Foo
~~~

- React.FC显式地定义了返回类型，其他方式是隐式推导的
- React.FC对静态属性：displayName、propTypes、defaultProps提供了类型检查和自动补全
- React.FC为children提供了隐式的类型（ReactElement | null），但是目前，提供的类型存在[一些 issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006)（问题）
- 比如以下用法 React.FC 会报类型错误:

~~~js


const App: React.FC = props => props.children



const App: React.FC = () => [1, 2, 3]



const App: React.FC = () => 'hello'

~~~

解决方案：

~~~js


const App: React.FC<{}> = props => props.children as any

const App: React.FC<{}> = () => [1, 2, 3] as any

const App: React.FC<{}> = () => 'hello' as any



// 或者



const App: React.FC<{}> = props => (props.children as unknown) as JSX.Element

const App: React.FC<{}> = () => ([1, 2, 3] as unknown) as JSX.Element

const App: React.FC<{}> = () => ('hello' as unknown) as JSX.Element

~~~

- 在通常情况下，使用 **React.FC** 的方式声明最简单有效，推荐使用；如果出现类型不兼容问题，建议使用**以下两种方式：**
- 第二种：使用 **PropsWithChildren**，这种方式可以为你省去频繁定义 children 的类型，自动设置 children 类型为 ReactNode:

~~~js


type AppProps = React.PropsWithChildren<{ message: string }>



const App = ({ message, children }: AppProps) => (

  <div>

    {message}

    {children}

  </div>

)

~~~

- 第三种：直接声明:

~~~ts


type AppProps = {

  message: string

  children?: React.ReactNode

}



const App = ({ message, children }: AppProps) => (

  <div>

    {message}

    {children}

  </div>

)
~~~

# 状态管理

- 一般是state，state是一个对象，ts描述对象还是要用接口

~~~ts
interface HelloStates {
    name: string
}
class Hello extends React.Component<HelloProps, HelloStates> {
    constructor(props: HelloProps) {
        super(props)
        this.state = {
            name: '测试'
        }
    }
    render() {
        return(
            <div>
                Hello{this.props.title}{this.state.name}
            </div>
        )
    }
}
~~~

# 数据传递

- 指的是props， props是一个对象，是外界传递给组件的。TS描述一对象的类型通常是interface，表示对象应该有哪些属性，只要一个具备这个这些属性我就认为你是符合interface的
- 那么如何把interface传递给React.Componnet呢，把鼠标移动React.Componnet上在vscode中会显示，class React.Component<P = {}, S = {}, SS = any>， 这是一个**泛型的占位符**，代表我们可以用泛型变量的方式把我们的interface传进去。
- 第一个对应 props默认值是{}，第二个state类型默认值{}，第三个默认是any

~~~tsx
export interface HelloProps {
    title: string
}

import {HelloProps} from '../router/index'
class Hello extends React.Component<HelloProps> {
    constructor(props: HelloProps) {
        super(props)
    }
    render() {
        return(
            <div>
                Hello{this.props.title}
            </div>
        )
    }
}
export default Hello
~~~

- 通常我们使用 **type** 来定义 **Props**，为了提高可维护性和代码可读性，在日常的开发过程中我们希望可以添加清晰的注释。因为type的约束性更强，interface会有合并的情况，type不会

## 常用Props ts类型

### 基础属性类型

~~~ts


type AppProps = {

  message: string

  count: number

  disabled: boolean

  /** array of a type! */

  names: string[]

  /** string literals to specify exact string values, with a union type to join them together */

  status: 'waiting' | 'success'

  /** 任意需要使用其属性的对象（不推荐使用，但是作为占位很有用） */

  obj: object

  /** 作用和`object`几乎一样，和 `Object`完全一样 */

  obj2: {}

  /** 列出对象全部数量的属性 （推荐使用） */

  obj3: {

    id: string

    title: string

  }

  /** array of objects! (common) */

  objArr: {

    id: string

    title: string

  }[]

  /** 任意数量属性的字典，具有相同类型*/

  dict1: {

    [key: string]: MyTypeHere

  }

  /** 作用和dict1完全相同 */

  dict2: Record<string, MyTypeHere>

  /** 任意完全不会调用的函数 */

  onSomething: Function

  /** 没有参数&返回值的函数 */

  onClick: () => void

  /** 携带参数的函数 */

  onChange: (id: number) => void

  /** 携带点击事件的函数 */

  onClick(event: React.MouseEvent<HTMLButtonElement>): void

  /** 可选的属性 */

  optional?: OptionalType

}

~~~

### 常用React属性类型

~~~ts


export declare interface AppBetterProps {

  children: React.ReactNode // 一般情况下推荐使用，支持所有类型 Great

  functionChildren: (name: string) => React.ReactNode

  style?: React.CSSProperties // 传递style对象

  onChange?: React.FormEventHandler<HTMLInputElement>

}



export declare interface AppProps {

  children1: JSX.Element // 差, 不支持数组

  children2: JSX.Element | JSX.Element[] // 一般, 不支持字符串

  children3: React.ReactChildren // 忽略命名，不是一个合适的类型，工具类类型

  children4: React.ReactChild[] // 很好

  children: React.ReactNode // 最佳，支持所有类型 推荐使用

  functionChildren: (name: string) => React.ReactNode // recommended function as a child render prop type

  style?: React.CSSProperties // 传递style对象

  onChange?: React.FormEventHandler<HTMLInputElement> // 表单事件, 泛型参数是event.target的类型

}

~~~



# 事件处理

- change事件有两个定义参数类型的方法
- 第一种方法使用推断的方法签名（例如：**React.FormEvent <HTMLInputElement>** **：void**）

~~~ts


import * as React from 'react'



type changeFn = (e: React.FormEvent<HTMLInputElement>) => void



const App: React.FC = () => {

  const [state, setState] = React.useState('')



  const onChange: changeFn = e => {

    setState(e.currentTarget.value)

  }



  return (

    <div>

      <input type="text" value={state} onChange={onChange} />

    </div>

  )

}

~~~

- 如果不太关心事件的类型，可以直接使用 **React.SyntheticEvent**，如果目标表单有想要访问的自定义命名输入，可以使用类型扩展

~~~js


import * as React from 'react'



const App: React.FC = () => {

  const onSubmit = (e: React.SyntheticEvent) => {

    e.preventDefault()

    const target = e.target as typeof e.target & {

      password: { value: string }

    } // 类型扩展

    const password = target.password.value

  }

  return (

    <form onSubmit={onSubmit}>

      <div>

        <label>

          Password:

          <input type="password" name="password" />

        </label>

      </div>

      <div>

        <input type="submit" value="Log in" />

      </div>

    </form>

  )

}

~~~



# HOOKS 与TS

## useState<T>

- 大部分情况下，TS 会自动为你推导 **state** 的类型:

~~~ts


// `val`会推导为boolean类型， toggle接收boolean类型参数

const [val, toggle] = React.useState(false)



// obj会自动推导为类型: {name: string}

const [obj] = React.useState({ name: 'sj' })



// arr会自动推导为类型: string[]

const [arr] = React.useState(['One', 'Two'])

~~~

- 使用推导类型作为接口/类型:

~~~ts


export default function App() {

  // user会自动推导为类型: {name: string}

  const [user] = React.useState({ name: 'sj', age: 32 })

  const showUser = React.useCallback((obj: typeof user) => {

    return `My name is ${obj.name}, My age is ${obj.age}`

  }, [])



  return <div className="App">用户: {showUser(user)}</div>

}

~~~

- 但是，一些状态初始值为空时（**null**），需要显示地声明类型：

~~~ts


type User = {

  name: string

  age: number

}



const [user, setUser] = React.useState<User | null>(null)

~~~

## useRef<T>

- 当初始值为 **null** 时，有两种创建方式:
- **const** ref2 = React.useRef<HTMLInputElement | null>(null)

- **这两种的区别在于**

  >- 第一种方式的 ref1.current 是**只读的（read-only）**，并且可以传递给内置的 ref 属性，绑定 DOM 元素 **；**
  >
  >- 第二种方式的 ref2.current 是**可变的**（类似于声明类的成员变量）

  ~~~ts
  
  
  const ref = React.useRef(0)
  
  
  
  React.useEffect(() => {
  
    ref.current += 1
  
  }, [])
  
  ~~~

- 这两种方式在使用时，都需要对类型进行检查:

~~~ts


// Bad

function MyComponent() {

  const ref1 = React.useRef<HTMLDivElement>(null!)

  React.useEffect(() => {

    //  不需要做类型检查，需要人为保证ref1.current.focus一定存在

    doSomethingWith(ref1.current.focus())

  })

  return <div ref={ref1}> etc </div>

}

~~~

## useEffect

- **useEffect** 需要注意回调函数的返回值只能是函数或者 **undefined**

~~~ts


function App() {

  // undefined作为回调函数的返回值

  React.useEffect(() => {

    // do something...

  }, [])



  // 返回值是一个函数

  React.useEffect(() => {

    // do something...

    return () => {}

  }, [])

}

~~~

## useMemo<T> / useCallback<T>

- **useMemo** 和 **useCallback** 都可以直接从它们返回的值中推断出它们的类型

  **useCallback** 的参数必须制定类型，否则ts不会报错，默认指定为 **any**

~~~ts
useMemo 和 useCallback 都可以直接从它们返回的值中推断出它们的类型

useCallback 的参数必须制定类型，否则ts不会报错，默认指定为 any
~~~

- 同时也支持传入泛型， **useMemo** 的泛型指定了返回值类型，**useCallback** 的泛型指定了参数类型

~~~ts


// 也可以显式的指定返回值类型，返回值不一致会报错

const result = React.useMemo<string>(() => 2, [])

// 类型“() => number”的参数不能赋给类型“() => string”的参数。



const handleChange = React.useCallback<

  React.ChangeEventHandler<HTMLInputElement>

>(evt => {

  console.log(evt.target.value)

}, [])

~~~

## 自定义Hooks

- 需要注意，自定义 Hook 的返回值如果是**数组类型**，TS 会自动推导为 **Union** 类型，而我们实际需要的是数组里里每一项的具体类型，需要手动添加 **const** **断言** 进行处理：

~~~ts


function useLoading() {

  const [isLoading, setState] = React.useState(false)

  const load = (aPromise: Promise<any>) => {

    setState(true)

    return aPromise.then(() => setState(false))

  }



  // 实际需要: [boolean, typeof load] 类型

  // 而不是自动推导的：(boolean | typeof load)[]

  return [isLoading, load] as const

}

~~~

- 如果使用 **const** 断言遇到[问题](https://github.com/babel/babel/issues/9800)，也可以直接定义返回类型:

~~~ts


export function useLoading(): [

  boolean,

  (aPromise: Promise<any>) => Promise<any>

] {

  const [isLoading, setState] = React.useState(false)

  const load = (aPromise: Promise<any>) => {

    setState(true)

    return aPromise.then(() => setState(false))

  }

  return [isLoading, load]

}

~~~

- 如果有大量的自定义 Hook 需要处理，这里有一个方便的工具方法可以处理 tuple 返回值:

~~~ts


function tuplify<T extends any[]>(...elements: T) {

  return elements

}



function useLoading() {

  const [isLoading, setState] = React.useState(false)

  const load = (aPromise: Promise<any>) => {

    setState(true)

    return aPromise.then(() => setState(false))

  }



  // (boolean | typeof load)[]

  return [isLoading, load]

}



function useTupleLoading() {

  const [isLoading, setState] = React.useState(false)

  const load = (aPromise: Promise<any>) => {

    setState(true)

    return aPromise.then(() => setState(false))

  }



  // [boolean, typeof load]

  return tuplify(isLoading, load)

}

~~~
