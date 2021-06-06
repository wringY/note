## vue组件测试

### 组件测试的必要性

- 通过将代码划分为多个组件，为应用程序编写单元测试将会变得卡分容易。现在代码已
  经被划分为多个小块，每个小块仅负责单个功能，每个功能只有相对较少的配置项一一
  这些都十分有利于测试。为代码增加单元测试，可以确保在未来对代码做出更改时，不
  会破坏那些你不希望发生改变的功能。只要编写的应用程序具备一定的规模，你就可能
  应该为它编写一些单元测试。

### 测试单个组件

- 如果我们去测试单个组件，我们往往写测试代码的数量都比实现组件功能代码的数量多。

  因此我们通常借助其它测试库。

### vue-test-utils 

- vue-test-utils是一个协助你编写测试的Vue 官方库。它提供多种在为组件编写测试时常用的功能，比如查询DO M 节点、设置props 和data 、模拟组件和其他参数、处理事件等。
- 它不会帮助你运行测试用例（应当使用类似的J est 或Mocha ）或者断言（应当使用类似
  的Chai 或Should . js），所以你需要分别安装这些库。在这－章中不会涉及关于测试运行
  器（test runner ）的内容。当测试失败时，所编写的代码仅会抛出错误，同时假设错误也
  会被捕获。
- 如同使用其他库那样，可以使用unpckg 或者别的CDN 来使用vue-test-util s ，但通常会
  使用npm 来安装：$ npm inst all --save-dev vue-test -utils

~~~
import { mount } from 'vue-test-utils'
const wrapper = mount(需要测试的组件,配置参数);
~~~

#### mount函数

- 这个函数接受组件和它的一些配置作为参数，并返回一个wrapper 对象。
- 这个对象是由vue-test­utils 提供的，它将需要进行模拟的组件封装起来以便对它执行不同的操作，并可以在不使用过多原生浏览器DOM 方i法的情况下查询这些组件。

#### find方法

- .find()是wrapp er 实例提供的方法之一，当提供一个用于查询wrapper 实例子元素的选择器时，它会返回DOM 中第一个匹配该选择器的元素节点。从本质上讲，它等价于DOM 元素节点的.querySelector()方法。在. find()方法定位到目标元素节点之后，它**会返回该元素节点的wrapper 对象**， 而不是节点本身。

#### findAll

- .find()仅返回第一个满足选择器规则的元素节点。如果希望得到多个，需要使用.findAll()。
- .findAll()会返回一个WrapperArray对象，而不是Wrapper，但是它具有类似的方法，不过我们需要使用.at()方法，来返回WrapperArray中指定索引的目标元素节点。

####  .text()/.html()

- 我们可以通过wrapper实例提供的方法，去获得指定的元素。我们可以通过.html()/.text()方法去获得指定元素的内容。

#### mount函数的第二个参数

- mount （）提供一个对象作为它的第二个参数。这里提供最常见的用法：
- PropsData 是用来传递props 的:
- slots 是用来传递components 或者HTML 字符串的
- mocks 是用来为组件实例增加属性的。

~~~
const wrapper = mount(testComponent,{
	propsData: {
      
	},
	slots: {
      
	},
	mocks: {
      
	}
})
~~~

#### 测试事件

- vue-test-utils 还包含能够使处理事件变得容易的功能。
- Wrapper 对象拥有一个. trigger()方法，可以使用它来触发单击事件：

~~~
wrapper.find('a').trigger('click')
~~~

- 每个wrapp e r 对象都存储了所有它触发的事件并可以通过. emitted （）方法获取，这非常有用，意味着你无须添加任何监听器，因为事件都已被捕获！



