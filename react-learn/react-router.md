# React-Router
- React-Router是React的官方路由，由三个核心库构成：
1. react-router 核心组件
2. react-router-dom 应用于浏览器端的路由库（单独使用包含了react-router的核心部分）
3. react-router-native 应用于native端的路由
- 对于web端来说 学习react-router-dom即可
- ReactRouter中提供了以下三大组件：
1. Router是所有路由组件共用的底层接口组件，它是路由规则制定的最外层的容器。
2. Route路由规则匹配，并显示当前的规则对应的组件。
3. Link路由跳转的组件
## Router 与 Route 与 Link的关系
- 如果说我们的应用程序是一座小城的话，那么Route就是一座座带有门牌号的建筑物，而Link就代表了到某个建筑物的路线。有了路线和目的地，那么就缺一位老司机了，没错Router就是这个老司机。
~~~javascript
// web端的react路由，只使用react-dom就够用了
import React from 'react';
// eslint-disable-next-line
import { Router, Link, Route } from 'react-dom';
// 需要通过url的变化，来匹配不同的组件展示，这就是路由的作用
// 首先我们想监听url哈希值的变化来匹配 不同的组件。如果不使用react-router，也可以实现。
// 利用windlow的location api
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props)
    // 获取当前 url哈希部分的路径
    this.state = {route: window.location.hash.substr(1)}
  }
  componentDidMount() {
     // 监听url哈希的变化
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }
  render() {
    // 根据route来 匹配元素
    let Clild 
    switch (this.state.route) {
      case '/about':
        Clild = About
        break;
      case '/dashboard':
        Clild = Dashboard
      break;     
      default: Clild = Home
    }
    return (
      <div>
        <ul>
          <li><a href="#/about">about</a></li>
          <li><a href="#/dashboard">dashboard</a></li>
        </ul>
        <Clild />
      </div>
    )
  }
}
export default App;
~~~
- 使用react-router, 可以看的react-router的思想是差不多的。
- 注意在导入Router时要 BrowserRouter as Router 来确定类型
~~~javascript
// web端的react路由，只使用react-dom就够用了
import React from 'react';
// eslint-disable-next-line
import {BrowserRouter as Router , Link, Route, Switch} from 'react-router-dom';
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
class App extends React.Component {
  render() {
    return (
      // Router 是路由器，所有通过路由匹配的组件的容器
      // link 组件取改变当前路由
      // Route 是具有匹配规则的路由组件
      <Router>
        <Link to='/'>Home</ Link>
        <Link to='/about'>About</ Link>
        <Link to='/dashboard'>Dashboard</ Link>
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route path='/about'><About /></Route>
          <Route path='/dashboard'><Dashboard /></Route>
        </Switch>
      </Router>
    )
  }
}
export default App;
~~~
- 接下来深入了解这三个组件
## Router
### BrowserRouter
- 浏览器的路由组件: 一个<Router>，它使用HTML5历史API (pushState, replaceState和popstate事件)来保持你的UI与UR同步.
- 使用
~~~JavaScript
import {BrowserRouter as Router , Link, Route, Switch} from 'react-router-dom';
~~~
#### basename
- 字符串类型，路由器的默认根路径
- 当前位置的基准 URL。如果你的页面部署在服务器的二级（子）目录，你需要将 basename 设置到此子目录。正确的 URL 格式是前面有一个前导斜杠，但不能有尾部斜杠。
- 例如：有时候我们的应用只是整个系统中的一个模块，应用中的URL总是以 http://localhost/admin/ 开头。这种情况下我们总不能每次定义Link和Route的时候都带上admin吧？react-router已经考虑到了这种情况，所以为我们提供了一个basename属性。为BrowserRouter设置了basename之后，Link中就可以省略掉admin了，而最后渲染出来的URL又会自动带上admin。
~~~ javascript
<BrowserRouter basename="/admin">
~~~
#### getUserConfirmation: func
- 当导航需要确认时执行的函数。默认使用 window.confirm。
~~~BrowserRouter
// 使用默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
~~~
#### forceRefresh: bool
- 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true。
~~~javascript
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
~~~
#### keyLength: number
- location.key 的长度。默认是 6。key 是用来Route组件的属性，keyLength设置它的长度。
#### children: node
- 渲染单一子组件（元素）。
### HashRouter
- 一个<Router>，它使用URL的哈希部分(例如window.location.hash)来保持你的UI与URL同步。
- 使用 hash 的方式记录导航历史不支持 location.key 和location.state。在以前的版本中，我们为这种行为提供了 shim，但是仍有一些问题我们无法解。任何依赖此行为的代码或插件都将无法正常使用。由于该技术仅用于支持传统的浏览器，因此在用于浏览器时可以使用 <BrowserHistory> 代替。
- 跟BrowserRouter类似，它也有：basename、getUserConfirmation、children属性，而且是一样的。
#### hashType: string
- window.location.hash 使用的 hash 类型。有如下几种：
1. "slash" - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops
2. "noslash" - 后面没有斜杠，例如 # 和 #sunshine/lollipops
3. "hashbang" - Google 风格的 "ajax crawlable"，例如 #!/ 和 #!/sunshine/lollipops
- 默认为 "slash"。
### 注意事项

- 哈希路由器,您可以通过在浏览器的地址栏上键入它来直接访问地址,但是您必须添加#到URL。
- 使用BrowserRouter,它具有漂亮且用户友好的URL结构但是你不能直接键入地址以呈现路线，如果您使用的是webpack-dev-server,则需要在配置文件中设置historyApiFallback：true.

### MemoryRouter
- 一个<Router>，在内存中保存你的URL的历史(不读或写地址栏)。在测试和非浏览器环境中很有用，比如React Native。
### StaticRouter
- 地址不改变的静态路由组件
## Link
- Link就像是一个个的路牌，为我们指明组件的位置。Link使用声明式的方式为应用程序提供导航功能，定义的Link最终会被渲染成一个a标签。
### to
- Link使用to这个属性来指明目标组件的路径，可以直接使用一个字符串，也可以传入一个对象, 也可以是一个函数，这函数接受当前位置为参数，返回路由的字符串或对象。
~~~javascript
<Link to={
          {
            pathname: '/about', // 路由路径
            search: '?key=111', // 查询参数的字符串形式
            hash: '#-hash', // 设置url中的hash部分
            state: {b:2 } // 放在location.state中的数据
          }
        }>About</Link>
// to 属性 传入函数        
<Link to={route}>About</Link>
 function route (curRoute) {
  console.log(curRoute)
  return {
    pathname: '/about', // 路由路径
    search: '?key=111', // 查询参数的字符串形式
    hash: '#-hash', // 设置url中的hash部分
    state: {b:2 } // 放在location.state中的数据
  }         
~~~
### replace: bool
- 当设置为 true 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址。
- 当设置为 false 时，点击链接后将在原有访问历史记录的基础上添加一个新的纪录。
- 默认为 false。
### Component
- 传入Link组件的children, 用来控制Link组件子组件内容
## NavLink组件
- NavLink是一个特殊版本的Link，可以使用activeClassName来设置Link被选中时被附加的class，使用activeStyle来配置被选中时应用的样式。此外，还有一个exact属性,此属性要求location完全匹配才会附加class和style。这里说的匹配是指地址栏中的URl和这个Link的to指定的location相匹配。
- activeClassName默认值为 active
~~~javascript
// 选中后被添加class selected
<NavLink to={'/'} exact activeClassName='selected'>Home</NavLink>
// 选中后被附加样式 color:red
<NavLink to={'/gallery'} activeStyle={{color:red}}>Gallery</NavLink>
~~~
to 可以是字符串或者对象，同Link组件
exact 布尔类型，完全匹配时才会被附件class和style
activeStyle Object类型
activeClassName 字符串类型
strict: bool类型，当值为 true 时，在确定位置是否与当前 URL 匹配时，将考虑位置 pathname 后的斜线。
isActive: func， 添加额外逻辑以确定链接是否处于活动状态的函数。如果除了验证链接的路径名是否与当前URL的路径名匹配之外，还需要使用此选项。
## Route组件
- Route应该是react-route中最重要的组件了，它的作用是当location与Route的path匹配时渲染Route中的Component。如果有多个Route匹配，那么这些Route的Component都会被渲染。
### path属性: string | string[]
- 每个Route都需要一个path属性，path属性是一个url，当URL匹配一个Route时，这个Route中定义的组件就会被渲染出来。
- 当一个路由的方式http://localhost:3000/about?key=111，对于的路由path 也需要写出动态参数的形式.
~~~
<Route path="/users/:id">
<Route path={["/users/:id", "/profile/:id"]}>
~~~
### Route的props
- Route可以通过 Component, Render, Children props 渲染子元素，这些渲染 props，可以接受到Route的props。如：match、location、history。
#### history
- 本文档中的「history」以及「history对象」请参照 history 包中的内容。 History 是 React Router 的两大重要依赖之一（除去 React 本身），在不同的 Javascript 环境中，history 以多种形式实现了对于 session 历史的管理。
- 我们会经常使用以下术语：
1. 「browser history」 - history 在 DOM 上的实现，经常使用于支持 HTML5 history API 的浏览器端。
2. 「hash history」 - history 在 DOM 上的实现，经常使用于旧版本浏览器端。
3. 「memory history」 - 一种存储于内存的 history 实现，经常用于测试或是非 DOM 环境（例如 React Native）。
- history 对象通常会具有以下属性和方法：
- length -（ number 类型）指的是 history 堆栈的数量。
- action -（ string 类型）指的是当前的动作（action），例如 PUSH，REPLACE 以及 POP 。
- location -（ object类型）是指当前的位置（location），location 会具有如下属性：
- pathname -（ string 类型）URL路径。
- search -（ string 类型）URL中的查询字符串（query string）。
- hash -（ string 类型）URL的 hash 分段。
- state -（ string 类型）是指 location 中的状态，例如在 push(path, state) 时，state会描述什么时候 location 被放置到堆栈中等信息。这个 state 只会出现在 browser history 和 memory - history 的环境里。
- push(path, [state]) -（ function 类型）在 hisotry 堆栈顶加入一个新的条目。
- replace(path, [state]) -（ function 类型）替换在 history 堆栈中的当前条目。
- go(n) -（ function 类型）将 history 对战中的指针向前移动 n 。
- goBack() -（ function 类型）等同于 go(-1) 。
- goForward() -（ function 类型）等同于 go(1) 。
- block(prompt) -（ function 类型）阻止跳转，（请参照 history 文档）
#### match
- match 对象包含了 <Route path> 如何与URL匹配的信息。match 对象包含以下属性：
- params -（ object 类型）即路径参数，通过解析URL中动态的部分获得的键值对。
- isExact - 当为 true 时，整个URL都需要匹配。
- path -（ string 类型）用来做匹配的路径格式。在需要嵌套 <Route> 的时候用到。
- url -（ string 类型）URL匹配的部分，在需要嵌套 <Link> 的时候会用到。
### Route渲染组件的方式（render methods）
#### Component
- component的值是一个组件，当URL和Route匹配时，Component属性定义的组件就会被渲染。
~~~javascript
<Route path="/mycom" component={MyCom} >
~~~
#### Render
- Render 值是一个函数，这个函数返回一个React元素。这种方式方便地为待渲染的组件传递额外的属性。
~~~javascript
<Route path='/mycom'  render={(props) => {

 <MyCom {…props} data={extraProps} /> //MyCom 组件接收了一个额外的data属性

}}>

</Route>
~~~
#### Children
Children的值也是一个函数，函数返回要渲染的React元素。与前面不同是，无论是否匹配成功，children返回的组件都会被渲染。匹配不成功时，match属性为null。
~~~javascript
// 在匹配时，容器的calss是light，<Home />会被渲染
// 在不匹配时，容器的calss是dark，<About />会被渲染
<Route path='/home' children={({ match }) => (
    <div className={match ? 'light' : 'dark'}>
      {match ? <Home/>:<About>}
    </div>
  )}/>
~~~
### 路由传参方式
- search 传参、params传参、state传参
~~~javascript
function User(props) {
  console.log(props)
  return <h1>Hello</h1>;
}
class App extends React.Component {
  render() {
    return (
      <Router>
        <Link to={{
          pathname: '/user/2',
          search: 'name=12',
          state: {a: 1},
        }}>User</Link>
        <Route path='/user/:name' component={User}></Route>
      </Router>  
    )
  }
}
export default App
~~~
## Redirect
- 当这个组件被渲染是，location会被重写为Redirect的to指定的新location。它的一个用途是登录重定向，比如在用户点了登录并验证通过之后，将页面跳转到个人主页。
~~~javascript
Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
~~~
## Swicth组件
- 渲染匹配地址(location)的第一个 <Route>或者<Redirect>
### 与使用一堆的Route有什么不同
- <Switch>的独特之处是独它仅仅渲染一个路由。相反地，每一个包含匹配地址(location)的<Route>都会被渲染。思考下面的代码：
~~~javascript
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
~~~
- 如果现在的URL是 /about ，那么 <About>, <User>, 还有 <NoMatch> 都会被渲染，因为它们都与路径(path)匹配。这种设计，允许我们以多种方式将多个 <Route> 组合到我们的应用程序中，例如侧栏(sidebars)，面包屑(breadcrumbs)，bootstrap tabs等等。 然而，偶尔我们只想选择一个<Route> 来渲染。如果我们现在处于 /about，我们也不希望匹配 /:user （或者显示我们的 "404" 页面 ）。以下是使用 Switch 的方法来实现：
~~~javascript
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
~~~
- 现在，如果我们处于 /about, <Switch> 将开始寻找匹配的 <Route>。 <Route path="/about"/> 将被匹配， <Switch> 将停止寻找匹配并渲染<About>。 同样，如果我们处于 /michael ， <User> 将被渲染

## react路由嵌套

- 现在/home，匹配home组件。想使用/home/uer去匹配，home组件里面嵌套user组件
~~~js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../../components/Header/Header";
import User from "../User/User";
import Article from "../Article/Article";

function Home() {
  return (
    <div>
      <Header />
      <Route path="/home/user" component={User} />
      <Route path="/home/article" component={Article} />
      <Redirect from="*" to="/home/user" />
    </div>
  );
}

export default Home;
~~~
- 在Home组件中引入react-router-dom的Route和Redirect，这里我们没有再引入Router和Switch，因为他们是在App组件中，会全局适配。
- 用法与之前一样，只不过我们匹配的路径path成了/home下的二级路由模式/home/user
- 并引入我们之前写的Header组件实现二级路由跳转，其更深层级的路由与这个一样，只需要在子组件中再嵌套就行

### 项目封装

- 在实际项目中我们会对react-router做些封装，如路由嵌套和权限校验。路由配置如下：

~~~js
const authRoutes = [
    {
        path: '/home',
        roles: ['user', 'viper', 'admin'],
        token: true,
        backUrl: '/login',
        component: Home,
        exact: true
    },
    {
        path: '/sildeSelect',
        roles: ['user', 'viper', 'admin'],
        token: true,
        backUrl: '/login',
        component: SildeClass,
        childrens: [
            {
                path: '/sildeSelect/class',
                component: SildeClass,
                token: true,
                roles: ['user', 'viper', 'admin'],
                backUrl: '/login',
                exact: true
            }
        ]
    }
]
~~~

- 下面是封装

~~~js
// 校验权限
function AuthWithRoute(props, route, user) {
    let {roles: routeRole, backUrl, childrens = []} = route
    const { role: userRole = ''} = user
    if(routeRole && routeRole.includes(userRole)) {
        return <route.component {...props} childrens={childrens}  />
    } else {
        return <Redirect to={backUrl} />
    }
}

/**
 * 路由render + 权限校验
*/
const renderRoutes = (routes, user = role) => {
    return routes.map((route, index) => {
      const { path, exact = false } = route;
      return (
        <Route
          path={path}
          exact={exact}
          key={`${route.path}-${index}`}
          render={props => AuthWithRoute(props, route, user) }
        />
      )
    })
  }
~~~

- 在组件内部进行判断

~~~js
function WithMainLayout(WarppedComponent) {
    return class HOCMainLayoutSildeSlelct extends Component {
        constructor(props) {
            super(props)
        }
        render() {
            let { childrens = [] } =  this.props
            console.log(renderRoutes(childrens))
            return childrens.length > 0 ? renderRoutes(childrens) : (
            <MainLayout>
                <WarppedComponent />
            </MainLayout>
            )
        }
    } 
}
~~~

