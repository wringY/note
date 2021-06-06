# 组件化中css的方案应该满足的标准

- 局部css，css具备自己的作用域，不会随意污染其他组件内的样式
- 动态css：获取组件的一些状态、根据状态的变化生成不同的css样式
- 支持所有的css特性，伪类、动画、媒体查询等
- 编写简洁方便、最好与css风格一致
- etc

# react中css方案

- react官方没有给出react中统一的样式风格：由此从普通的css、到cssmodule、再到css in js，有十几种不同的解决方案。

## 内联样式

- 内联样式是官方推荐的一种css写法
  - style接受一个采用小驼峰命名属性的js对象，而不是css字符串
  - 并且可以引用state中的状态来设置相关样式

~~~jsx
<div style={{width: 100}}></div>
~~~

### 优点

1. 不会有冲突
2. 可以使用state中的状态

### 缺点

1. 写法需要驼峰标识
2. 没有语法提示
3. 大量样式、代码混乱
4. 某些样式无法编写（伪类、伪元素）

## 普通css

- 存在样式冲突
- react添加原生class，比较麻烦

~~~jsx
<h2 className="foo bar active title"></h2>
<h2 className={"foo" + isActive ? ' active' : ''}></h2>
<h2 className={['title', (isActive ? 'active' : '')].join("")}></h2>

~~~

- 可以使用classnames这个第三方的包

- 安装classnames,类似与vue中class写法

~~~jsx
import classNames from 'classnames'
<h1 classname={classNames("foo","bar","active")}></h1>
<h1 classNAME={classnames({"active": isActive, 'bar': isBar}, 'title')}></h1>

~~~

## CSSmodule

- css方案采用cssmodule， Css Modules 并不是React专用解决方法，适用于所有使用 webpack 等打包工具的开发环境。以 webpack 为例，在 css-loader 的 options 里打开modules：true 选项即可

- 由于cssmoudele方案，会把我们的css样式的class名随机生成hash字符串来做到模块化，我们可以设置生成的名字，在调试的时候比较方便

~~~js
loader: 'css-loader',
	options: {
		importLoaders: 2, // 之前有2个loaders
		modules: {
		localIdentName: devMode ? '[name]-[hash:base64:5]' : '[hase:base64:8]'
		}, // 启用cssModules

~~~

- Less 允许导入CSS文件，在webpack配置 less loader中开启 javascriptEnabled: true

### 存在问题

1. 引用类名，不能使用短-链接符号，只能使用小驼峰。
2. 不方便动态修改某些样式，需要使用内联样式来辅助

## CSS IN JS

- CSS IN JS 是指一种模式，其中css有js生成而不是外部定义的
- 此功能并不是react的一部分，而是有第三方库提供。 

### styled-components

- 随然有不同的声音，但是我们看来许多css in js 的库依然非常强大、方便
- css-in-js 通过js来为css赋予一些能力，包括类似css预处理器一样的样式嵌套、函数定义、逻辑服用、动态修改状态等。
- 虽然css预处理器也具备这些能力，但是动态获取状态依然是不好处理的点
- 所有css-in-js是react编写样式最为欢迎的一个方案

- 目前流行的css-in-js库有：styled-component、emotion、glamorous

### 安装styled-components

~~~jsx
 import styled from 'styled-component'
  cons HomeWrapper = styled.div`
	font-sizeL 50px;
	color: red;
	.bannnder {
		color: red 
		span {
			color: blue
			&.avtive {
				pink
			}
		}
	}
}
  `
  render() {
      return(
      	<HomeWrapper name="111">
              <h2 className="bannner">
                  <span>1</span>
                  <span className="active">2</span>
                  <span>3</span>
              </h2> 
         </HomeWrapper>
      )
  }
~~~

1. styled-components props 具有穿透性, <HomeWrapper name="111"> 会穿透到styled.div上。也可以styled.div.attrs({name: '1111'})``.
2. styled.div.attrs({bColor: 'red'})`background: ${props => props.color}`. 我们还可以 <HomeWrapper name="111">，styled.div`background: ${props => props.name}`
3. 因为HomeWrapper是一个组件，因此其他组件可以继承这个组件来获取统一的样式。我们通过传入不同的参数来动态配置里面的css样式

~~~
const HYbutttom = styled.button1`
	padding: 10
	color: red
	bgc: blue
`

const HY111bUTTON = styled(HYbutttom)
~~~

3. 设置主题

~~~jsx
import styled { ThemeProvider } from 'styled-components'
render() {
    return(
        <ThemeProvider theme={{themeColor: "rellow", font-size: 20}}>
            <h1></h1>
            <div></div>
        </ThemeProvider>
    )
}
~~~

- theme 里面的属性会被 所有的styled-components共享。