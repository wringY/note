## vue
### vue 框架
- vue是一个js框架，Vue的核心库只关注视图层，也就是意味着我们不需要关心DOM（如jquery那样去操作DOM，进行渲染）。
#### vue安装
- 安装vue不需要使用任何的特殊工具，只需要引入框架库即可。

#### vue-loader 和 webpack 
- vue-loader是一个webpack的加载器，允许我们将一个组件的所有html、css、js代码编写到一个文件中。其余待补充。
#### vue-cli 脚手架工具 
- 说白了就是一个**自动帮你生成好项目目录，配置好Webpack，以及各种依赖包的工具**，它可以通过
  npm install vue-cli -g 的方式安装，后面的-g表示全局安装的意思，意味着你可以打开命令行之后直接通过vue命令调用它。
- 如何用vue-cli 初始化一个 webpack 工具。
   vue init webpack
#### 第一个vue工程
- npm install vue-cli -g   vue init webpack  之后在命令行启动服务器，即可在访问。
### vue 遵循视图层(MVVM)架构
#### MVVM(Model-View-ViewModel) 模型-视图-视图模型架构
- 这个架构是说View（用户界面或视图）和Model（数据）是独立的，ViewModel（这里指Vue）是View和Model交互的桥梁。
  因此当View的某个部分需要更新时，开发者不需要特别值定，Vue会选择恰当的方法和时机去更新。

## vue 核心
- vue的核心是将数据显示在页面上，这个功能由模板实现（template）。
- 给正常的html添加特殊的属性---被称为指令，这些指令告诉vue我们想要实现的效果以及如何处理提供给它的数据，指令支持简单的表达式。
- 数据可以是字符串、数字、数组、对象。
### Vue核心功能概述
- 一个响应式的数据系统，能通过轻量级的虚拟DOM 引擎和最少的优化工作来自动更新用
  户界面。
- 灵活的视图声明，包括优雅友好的HTML 模板、JSX （在JavaScript 中编写HTML 的技术）
  以及hyperscript 渲染函数（完全使用JavaScript ）。
- 由可维护、可复用组件构成的组件化用户界面。
### vue实例（ViewModel）
- 当我们引入Vue框架后，此时我们需要一个视图View和数据Model的桥梁，也就是创建一个Vue实例。
~~~
//创建一个Vue实例
var app = new Vue({
    //根DOM元素的CSS选择器
    el: '#root',
    //一些数据
    data() {
        return {
            message: 'Hello Vue.js'
        }
    },
});
~~~
在上面的代码中，我们通过Vue构造函数new一个vue实例，Vue构造函数有一个参数是--option对象。该参数可以携带多个属性（称为选项），我们会在后面的章节中逐渐学习。这里只使用其中的两个属性。
通过el 选项，我们使用css 选择器告知Vue 将实例添加（挂载）到Web 页面的哪个DOM元素中。在这个示例中，Vue实例将使用＜div id ＝”root ”＞DOM 元素作为其根元素。另外，也可以使用Vue实例的$mount方法替代el选项：
~~~
var app = new Vue({
    data () {
        return {
            message: 'Hello Vue.js'
        }
    },
});
//添加Vue实例到页面上,Vue实例的大多特殊方法和属性都是以美元符号（$）开头。
app.$mount('#root');
//我们可以通过name选项修改Vue实例的名字。
var app = new Vue({
    name: 'Myapp',
    //....
});
~~~
- 在单个Web页面中，可以添加任意多个Vue应用。只需要为每个应用创建出新的Vue实例并挂载到不同的DOM元素即可。当想要将Vue集成到已有的项目中时，这非常方便。
- Vue实例中的created()函数会在实例创建后执行。
### View（视图）的编写----模板引擎
- 在Vue中可以有多种方式编写View。我们现在学习模板，模板是描述View最简单的方法，因为它看起来很像HTML ，并且只需要少量额外的语法就能轻松实现DOM的动态更新，模板引擎支持简单的表达式。
#### 模板的第一个功能--文本插值
- 文本插值用于在Web 页面中显示动态的文本。文本插值的语法是在双花括号内包含**单个任意类型的JavaScript表达式**。
- 当Vue 处理模板时，该JavaScript 表达式的结果将会替换掉双花括号标签。
~~~
<div id=” root ’'>
<p> {{ message }} </p>
</div>
在这个模板中，有一个p元素，其内容是js表达式message的结果。
该表达式将返回Vue 实例中message 属性的值。
现在应该可以在Web 页面中看到输出了一行新的文本内容：Hello Vue . js ！。这看起来只是显示了一个字符串，但是Vue 已经为开发者做了很多事情一－DOM 和数据连通了。
为了证明这一点，我们打开浏览器控制台并修改app . message 的值，然后按回车键：
app . message = ' Awesome! ’
可以发现显示的文本发生了改变。这背后的技术称为数据绑定。也就是说每当数据有改变时，
Vue 都能够自动更新DOM ，不需要开发者做任何事情。Vue 框架中包含一个非常强大且高效的
响应式系统，能对所有的数据进行跟踪，并且能在数据发生改变时按需自动更新View。所有这
些操作都非常快。
~~~
#### 在模板中使用指令添加基本的交互
- 允许用户通过输入文本修改页面中显示的内容。要达到这样的交互效果，可以在模板中使用称为**指令的特殊HTML属性**。
- Vue 中所有的指令名都是带v－前缀的，并遵循短横线分隔式（kebab-case ）语法。这意味着采用短横线将单词分开。HTML 属性是不区分大小写的（大写或小写都没有任何问题）。
- v-model指令，它将元素的值与指定的属性进行绑定。
~~~javascript
<div id="root">
    <p>{{message}}</p>
    <input type="text" v-model='message'>
</div>
//当我们修改被v-model指令绑定的input元素时，Vue会自动更新v-model指令对应的message属性。
~~~
### Vue指令与模板的结合使用

#### v-cloak

- 使用 v-cloak 能够解决 插值表达式闪烁的问题，当用户的网络比较慢时此时vuejs还没有加载完毕，此时页面的上文本插值无法被渲染成想要的数据，将会暴露在用户面前，等到vuejs加载完毕后文本插值才会被渲染成相应的数据，如何解决这个问题。
- 我们给相应的文本插值添加 v-cloak指令，同时给一个css样式display为none，这样当vuejs没有加载时这些文本插值不会被显示，只有等vuejs加载完毕，后会把v-cloak把display为属性清除。

~~~javascript
<style type="text/css">
  /* 
    1、通过属性选择器 选择到 带有属性 v-cloak的标签  让他隐藏
 */
  [v-cloak]{
    /* 元素隐藏    */
    display: none;
  }
  </style>
<body>
  <div id="app">
    <!-- 2、 让带有插值 语法的   添加 v-cloak 属性 
         在 数据渲染完场之后，v-cloak 属性会被自动去除，
         v-cloak一旦移除也就是没有这个属性了  属性选择器就选择不到该标签
		 也就是对应的标签会变为可见
    -->
    <div  v-cloak  >{{msg}}</div>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    var vm = new Vue({
      //  el   指定元素 id 是 app 的元素  
      el: '#app',
      //  data  里面存储的是数据
      data: {
        msg: 'Hello Vue'
      }
    });
</script>
</body>
</html>
~~~

#### v-once

- 执行一次性的插值【当数据改变时，插值处的内容不会继续更新】

~~~
  <!-- 即使data里面定义了msg 后期我们修改了 仍然显示的是第一次data里面存储的数据即 Hello Vue.js  -->
     <span v-once>{{ msg}}</span>    
<script>
    new Vue({
        el: '#app',
        data: {
            msg: 'Hello Vue.js'
        }
    });
</script>
~~~

#### v-pre

- 显示原始信息跳过编译过程
- 跳过这个元素和它的子元素的编译过程。
- **一些静态的内容不需要编译加这个指令可以加快渲染**

~~~html
    <span v-pre>{{ this will not be compiled }}</span>    
	<!--  显示的是{{ this will not be compiled }}  -->
	<span v-pre>{{msg}}</span>  
     <!--   即使data里面定义了msg这里仍然是显示的{{msg}}  -->
<script>
    new Vue({
        el: '#app',
        data: {
            msg: 'Hello Vue.js'
        }
    });

</script>
~~~

#### v-text

- 使用v-text也可以渲染数据

~~~
<p v-text="msg"></p>
~~~

文本插值与v-text的区别：

1. v-text不存在闪烁问题。
2. v-text会覆盖元素中原本的内容，但是 插值表达式  只会替换自己的这个占位符，不会把 整个元素的内容清空

#### v-if

- 在一个DOM元素上设有v-if指令，那么只有在传递给指令的值为真时，这个元素才会显示。
- 如果v-if 指令的值为假 ，那么这个元素不会被插入DOM。假指false、undefined、null ,""和NaN。
~~~
<div id="app">
    <p v-if="hours < 12">早上好！</p>
    <p v-if="hours >= 12 && hours < 18">中午好</p>
    <p v-if="hours >= 18">晚上好</p>
</div>
<script>
var app =  new Vue({
   el: '#app',
   data: {
     hours: new Date().getHours()
   }
});
------------------------
<div id="app">
    <p v-if="path === '/'">你位于首页</p>
    <p v-else>你位于{{path}}</p>
</div>
<script>
    //实例化一个Vue对象
    var app = new Vue({
        //根元素
        el: '#app',
        // 数据
        data: {
            //获取当前url的路径
            path: location.pathname
        }
    });
</script>
~~~
#### v-model 
- v-model指令，它将元素的值与指定的属性进行绑定。
~~~
<div id="root">
    <p>{{message}}</p>
    <input type="text" v-model='message'>
</div>
//当我们修改被v-model指令绑定的input元素时，Vue会自动更新v-model指令对应的message属性。
~~~
#### v-if与v-show对比
- v-if 指令可以控制一个元素的显示和隐藏，那么它是如何实现的？它和看起来很像的v-show 指令有什么区别呢？
- 如果v-if指令的值为假，那么这个元素不会被插入DOM。
~~~
<div v-if="true">one</div>
<div v-if="false">two</div>
会输出如下内容：
<div>one</div>
可以看出 为v-if为假的元素，Vue不会生成DOM
~~~
- v-show 该指定使用CSS样式控制元素的显示和隐藏。当v-show的值为假时，这个元素会被隐藏，注意还是会被插入到DOM树中，只是不显示罢了。
~~~
<div v-shoW="true">one</ div>
<div v-show="false">two</div>
会输出如下内容：
<div>one</div>
<div style="display: none">two</div>
~~~
- 隐藏尚未加载的内容时，v-if更好一些。下面这个例子如果使用v-show就会出现异常,使用v-if就会正常。
  因为v-if只有当为真时，才会生成元素的内部内容，而v-show会导致Vue去尝试use.name一个尚不存在的对象的属性。
~~~
<div id="app" v-show="username">
        <p>{{username.name}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            username: undefined
        },
    });
</script>
~~~
- v-show的优点
  v-if会有性能开销。每次插入或者移除元素时都必须要生成元素内部的DOM树，操作DOM过于频繁时会消耗很大的性能。
  而v-show 除了在初始创建开销时之外没有额外的开销。如果希望频繁地切换某些内容，那么v-show 会是最好的选择。
  此外，如果元素包含任何图片，那么仅使用css 隐藏父节点可以使浏览器在图片显示之前就加载它，这意味着一旦v - show 变为真值，图片就可以显示出来。如果是v-if 指令，图片会直到要显示时才开始加载。
#### v-if与v-else-if和v-else
- 两个条件语句和v －if 有关：v-else-if 和v - else。它们的行为非常符合预期：
~~~
div v-if="state === loading">加载中....</div>
    <div v-else-if="state === error">出错了</div>
    <div v-else>...我们的内容</div>
当state 值为loading 时会显示第一个div , state 值为error时会显示第二个，state
为其他任意值时会显示第三个div。同一时间只有一个元素会显示。
~~~
#### v-for 
- v-for遍历数组时的格式是 遍历数组是 （value，key) in array，我们可以把数组的键值key（也就是索引i），也进行遍历。也可以不遍历key值，直接使用 value in array。
~~~
<ul>
    <!-- 遍历数组是 （value，key) in array -->
    <!-- 我们可以把数组的键值key（也就是索引i），也进行遍历。也可以不遍历key值，直接使用 value in array-->
    <!-- <li v-for="dog in dogs">{{dog}}</li> -->
    <li v-for="(dog, i) in dogs">{{i}}==={{dog}}</li>
</ul>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            dogs:['多多','毛毛','黑黑','小明']
        },
    });
</script>
~~~
- v-for 遍历对象（value，key) in object，我们可以把对象的键值key，也进行遍历。也可以不遍历key值，直接使用 value in object。
~~~javascript
div id="app">
    <ul>
        <!-- 遍历对象 （value，key) in object -->
        <!-- 我们可以把对象的键值key，也进行遍历。也可以不遍历key值，直接使用 value in object-->
        <!-- <li v-for="price in info">{{price}}</li> -->
        <li v-for="(price, city) in info">{{price}}==={{city}}</li>
    </ul>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            info: {
                A: '2000',
                B: '3000',
                C: '4000',
            }
        },
    });
</script>
~~~
- 对于v-for我们还可以数字作为参数。
~~~
<li v-for="n in 10">{{n}}</li>
类似js中的for循环，注意n的默认值是1，如果我们想获得从0开始的结果需要设为 n-1
<li v-for="n in 10">{{n-1}}</li>
~~~
#### 属性绑定指令 v-bind
- v-bind可以接受参数。v-bind指令用于将一个值绑定到一个HTML属性上。
  下面这个例子把buttonType的值绑定按钮的type属性上。
  v - bind 是指令的名称，type 是指令的参数：在这个示例中即为属性的名称，我们想要
  将给定的变量绑定到该属性上。buttonType 即是给定的变量。
~~~
<div id="app">
        <input v-bind:type="buttonType" value="测试">
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                buttonType: 'submit'
            }
    });
~~~
我们还可以绑定其它属性，如disable和checked之类的属性。
如果传入的表达式为真，则输出的元素会带有这个属性；如果为假，元素不会带有这个属性。
- v-bind的简写形式 ：---就是冒号。
~~~
<input :type="buttonType" value="测试">
~~~
#### 动态设置html v-html
- 在网站上动态渲染任意HTML是非常危险的，因为容易导致XSS攻击。只在可信内容上使用v-html，永不用在用户提交的内容上。
~~~
div id="app">
    <div v-html="html"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            html: "<strong>123</strong>"
        }
    });
</script>
~~~
### 响应式特点
- 除了在一开始创建HTML,Vue还监控data对象的变化，并在数据变化时更新DOM 。
#### 响应式原理
~~~javascript
//响应式原理
const data = {userId:10};
const storeData = {};    
storeData.userId = data.userId;
// console.log(storeData.userId);
//利用对象的访问器属性，设置一个属性值发生变化时会导致其他属性的变化。
//设置data对象的访问器属性
Object.defineProperty(data,'userId',{
    get:function() {
        return storeData.userId;
    },
    set:function(value) {
        console.log('数据被修改了');
        storeData.userId = value;
    },
    configurable: true,
    enumerable: true
});
//当我们修改data的userId时，storeData的userId也发生了变化
~~~
#### 响应式注意事项 v-set
- 因为Vue在设置响应式的时候，是在实例化Vue对象的时候。此时会把data属性的值的添加getter和setter方法。这也就意味着只有实例化Vue对象的时候，data里面的数据是响应式的。如果我们在这之后向data属性里面添加数据，这个数据就不是响应式的。
~~~
var app = new Vue({
    el: '#app',
    data: {
            fromData:{
                username: 'someuser'
            }
        }
    });  
app.fromData.nickname = 'nickname';
//此时nickname属性的数据不是响应式的。
~~~
- 如何解决这个问题，我们有以下方法
- **Vue.set( target, propertyName/index, value )**
- 参数：
  - `{Object | Array} target`
  - `{string | number} propertyName/index`
  - `{any} value`
  - 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性。
  - 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
~~~javascript
var app = new Vue({
    el: '#app',
    data: {
            fromData:{
                username: 'someuser',
                //虽然不知道你的值是什么，但是可以占位，当你把值确定后直接重新赋值。
                nickname: undefined
            }
        }
}); 
--------------------
我们还可以使用Object.assign()来创建一个新的对象然后覆盖原有对象，当一次需要更新多个数据时，这是最有效的方法。
app.fromData = Object.assign({},app.fromData,{nickname:'nickname'});
-----------------------
Vue提供了Vue.set()方法，可以使用它将属性设置为响应式的
Vue.set(app.fromData,"nickname","nickname");
~~~
- 对于data属性的值是数组，我们不能直接通过索引来设置数组元素。
~~~javascript
//这个方法是行不通的
const vm = new Vue({
    data:{
        dogs:['duoduo','maomao','小明']
    }
});
vm.dogs[2]= '小黑'; //错误
--------------------
可以使用数组的splice方法，来移除旧元素并添加新元素。
vm.dog.splice(2,1,'小黑');
或者使用Vue.set()
Vue.set(vm.dogs,2,'小黑');
~~~
### 双向数据绑定
~~~javascript
<div id="app">
    <input type="text" :value="inputText">
    <p>inputText: {{inputText}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            inputText: 'innital value'
        }
    });
</script>
~~~
- 这个例子的问题在于 我们修改input元素的值，但p标签里面的文本会保持不变。
- 这是因为v-bind只会在inputText值变化时才更新输入框的值，反过来则不行。也就是单向绑定。
#### 双向绑定 v-model
- v-model只能用于具有value属性的元素。
- 在这个例子中v-model作用于输入框元素，将输入框的value值绑定到data对象的对应属性上，因此输入框
  不但会接收data 上的初始值，而且当输入内容更新时，data 上的属性值也会更新。
~~~javascript
<div id="app">
    <input type="text" v-model="inputText">
    <p>inputText: {{inputText}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            inputText: 'innital value'
        }
    });
</script>
~~~
- 使用v-model的注意事项：
  使用v-model 时一定要记住，如果设置了value 、checked 和selected 属性，这些属性会被忽略。
  如果需要设置表单元素的初始值，可以placeholder属性。
~~~javascript
 <div id="app">
        <input type="text" v-model="inputText" placeholder="初始值">
        <p>inputText: {{inputText}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            inputText: ''
        }
    });
</script>
~~~
- 至于输入元素（input）、多行文本框（textareas）、下拉列表和复选框，这些元素基本上都不会有什么意外：输入的值和data 对象中的值都能保持一致（对于复选框，data 对象中的值是一个布尔值）。单选框有一点不同，因为同一个v-model 会对应多个不同的元素，其name 属性也会被忽略，存储在data 中的值等于当前选中的单选输入框的value属性的值：
~~~javascript
<div id="app">
    <input type="radio" v-model="value" value="一" id=""><br>
    <input type="radio" v-model="value" value="二" id=""><br>
    <input type="radio" v-model="value" value="三" id=""><br>
    <p> {{value}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            value: '一'
        }
    });
</script>
~~~
当第一个选择框选中时，value 的值是一；当第二个选择框选中时，value 的值是二，以此类推。尽管可以继续使用name属性，但Vue会忽略它，况且单选框没有这个属性也可以正常运行（同一时间只有一个单选框被选中）。

- `v-model` 指令在表单 `<input>` 及 `<textarea>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。
- 对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)。对于复选框有如下方式：

~~~javascript
<input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>
 //注意：选项data中，要声明checked变量，默认值为false，checked：false，页面操作，勾选上，那么v-model会自动绑定更新checked变量，更新为true
~~~

- 多个复选框，可绑定到同一个数组（这里是要显示选择的复选框的值）

~~~javascript
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
		  <label for="jack">Jack</label>
		  <input type="checkbox" id="john" value="John" v-model="checkedNames">
		  <label for="john">John</label>
		  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
		  <label for="mike">Mike</label>
		  <br>
--------------------- 
data{
  checkedNames:['Jack','Mike']  //那么第一个和第三个复选框会被默认选中
}
~~~

- 对于下拉菜单，分为两种情况

~~~html
 <span>职业：</span>
        <select v-model="occupation">
          <option value="0">请选择职业...</option>
          <option value="1">教师</option>
          <option value="2">软件工程师</option>
          <option value="3">律师</option>
        </select>
//对于select，如果是单选，那么v-model绑定的应该是单个数据
 occupation: 2   ----默认选中软件工程师
 <span>职业：</span>
        <select v-model="occupation" multiple>
          <option value="0">请选择职业...</option>
          <option value="1">教师</option>
          <option value="2">软件工程师</option>
          <option value="3">律师</option>
     	</select>

//对于select，如果是单选，那么v-model绑定的应该是个数组
occupation: [2,3]  ----默认选中软件工程师,律师
~~~

- 对于\<textarea>与input元素，使用v-model是同样的用法。

####  v-model表单修饰符

- .number  转换为数值
  - 注意点：	
  - 当开始输入非数字的字符串时，因为Vue无法将字符串转换成数值
  - 所以属性值将实时更新成相同的字符串。即使后面输入数字，也将被视作字符串。
- .trim  自动过滤用户输入的首尾空白字符
  - 只能去掉首尾的 不能去除中间的空格
- .lazy   将input事件切换成change事件
  - .lazy 修饰符延迟了同步更新属性值的时机。即将原本绑定在 input 事件的同步逻辑转变为绑定在 change 事件上
- 在失去焦点 或者 按下回车键时才更新。

~~~html
<!-- 自动将用户的输入值转为数值类型 -->
<input v-model.number="age" type="number">

<!--自动过滤用户输入的首尾空白字符   -->
<input v-model.trim="msg">

<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
~~~

## Vue方法 methods

- 在vue中，函数被定义为方法来使用。只要将一个函数存储为methods对象的一个属性，就可以在模板中使用它。
~~~
<div id="app">
    <p>{{statusFromId(status)}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            status: 2
        },
        methods: {
            statusFromId(id) {
                const status = {
                    0:"书籍",
                    1:"音乐",
                    2:"电影"
                }[id];
            return status;
            }
        }
    });
</script>
~~~
- 除了在插值中使用方法，还可以在属性绑定中使用它们一一实际上，任何可以使用JavaScript 表达式的地方都可以使用方法。
~~~javascript
<div id="app">
    <ul>
        <!-- <li v-for="number in fliterPositive(numbers)">{{numbers}}</li> -->
        <li>{{fliterPositive(numbers)}}</li>
    </ul>
</div>
<script>
    //把一个数字进行过滤，把负数全部去掉，用v-for指令遍历这个非负数组，然后通过模板插值写到页面上。
    var app = new Vue({
        el: '#app',
        data: {
            numbers: [1,2,0,-1,-5,9,4]
        },
        methods: {
            fliterPositive(numbers) {
                return numbers.filter((number)=> {return number>=0});
            }
        },
});
~~~
### 方法中this的指向
- 在vue中，**方法中的this指向该方法所属的组件**。可以使用this访问data对象的属性和其他方法。
- this还可以访问其他的东西
~~~
<div id="app">
    <p>所有正数的和是{{getPositiveNumberSum()}}</p>
</div>
<script>
    //把一个数组进行过滤成为一个非负数组，在把这个数组求和
    var app = new Vue({
        el: '#app',
        data: {
            numbers: [1,2,-8,-3,-4,6,7]
        },
        methods: {
            getPositiveNumber(){
                //这里是this
                return this.numbers.filter((number)=> number>=0);
            },
            getPositiveNumberSum() {
              return  this.getPositiveNumber().reduce((sum,val)=> sum+val);
            }
        },
    });
</script>
~~~
## Vue计算属性 computed
- 计算属性介于data对象的属性和方法住两者之间：可以**像访问data对象的属性那样访问它**，但**需要以函数的方式定义它**。
- 同样，不论是在方法中，还是在其他计算属性中，亦或是这个组件的任意地方，都可以通过this 来访问到这个计算属性。
- 和Vue 方法一样，当numbers发生变化时，numbeTotal也会同时变化，并且这种变化会体现在模板上。
~~~
<div id="app">
    <p>数字的总和是:{{numberTotal}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            numbers: [5,8,3]
        },
        computed: {
            numberTotal() {
                return this.numbers.reduce((sum,val)=>sum + val);
            }
        },
    });
</script>
~~~
- 除了语法的明显区别外，计算属性和方法存在什么区别呢？
1. 计算属性会被缓存：如果在模板中多次调用一个方法，方法中的代码在每一次调用时都会执行一遍；但如果计算属性被多次调用，其中的代码只会执行一次，之后的每次调用都会使用被缓存的值。只有当计算属性的**依赖**发生变化时，代码才会被再次执行。例如在上面这个例子中，如果向numbers 中添加一项，numberTotal中的代码会再次执行以获取新的计算值。
  因为这种方式可以确保代码只在必要的时刻执行，所以适合处理一些潜在的资源密集型工作。
2. 计算属性和方法的另外一个区别是，除了能像上例展示的那样获取计算属性的值，还可以设置计算属性的值，并且在设置过程中做一些操作。实现这一点需要将**计算属性由函数改为带有get和set属性的对象**。
~~~javascript
<div id="app">
    <p>{{numberToatl}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            numbers: [5,8,3]
        },
        computed: {
            numberToatl: {
                get() {
                    return this.numbers.reduce((sum,val)=> sum+val);
                },
                //我们可以在numberToatl原有基础上进行，添加数据，那么这个添加的数据就会被推入到numbers中
                set(newValue){
                    const oldvalue = this.numberToatl;
                    const diff = newValue - oldvalue;
                    this.numbers.push(diff);
                }
            }
        },
    });
</script>
~~~
### 使用data 对象、方法还是计算属性？
已经了解了data 对象，可以使用它来存储字符串、数字、数组和对象等数据，也了解了方法，可以使用它来存储函数并在模板中调用，还了解了计算属性，可以使用它将函数存储下来，然后像访问data对象中的属性一样调用。但是，应该使用哪一个？又应该在何时使用呢？
上述每一种选择都有适合的场景，而且最好和其他方式组合使用。但是对于一些特定任务而言，有的方式妥比另外一些更好。例如，如采需妥接收一个参数，那么肯定妥用方法，而不是data对象或者计算属性这两者都不能接收参数。

data对象最适合纯粹的数据：如果想将数据放在某处，然后在模板、方法或者计算属性中使用，那么可以把它放在data 对象中。后面也许还会更新它。

当你希望为模板添加函数功能时，最好使用方法：给方法传递数据，然后它们会对数据进行处理，最终可能返回不同的数据结果。

计算属性适用于执行更加复杂的表达式，这些表达式往往太长或者需要频繁地重复使用，所以不想在模板中直接使用。计算属性往往和其他计算属性或者data对象一起使用，基本上就像是data对象的一个扩展和增强版本。
可以在表格中比较这些处理数据的方法一－data 对象、方法和计算属性。
- 表格1-1, data 对象vs 方法vs 计算属性
|         | 可读？  | 可写？  | 可以接受参数？ | 需要运算？ |    有缓存？     |
| :-----: | :--: | :--: | :-----: | :---: | :---------: |
| data 对象 |  是   |  是   |    否    |   否   | 无效，因为它不需要运算 |
|   方法    |  是   |  否   |    是    |   是   |      否      |
|  计算属性   |  是   |  是   |    否    |   是   |      是      |
## 侦听器 watch
- 侦听器可以侦听**data对象属性或者计算属性的变化**。
- **侦听器应用场景: 数据变化时执行异步或开销较大的操作**。
- 如果从其他框架切换到Vue，那么你可能一直好奇如何侦听数据的变化，而且一直期待着这个功能。但是，要小心。在Vue中，通常有比侦听器更好的方式来处理问题－一通常会使用计算属性。例如，和设置数据然后侦听它的变化相比，使用一个带有setter的计算属性会是更好的方式。
- 侦听器的使用很简单,只要设置要侦听的属性名就可以。
  尽管大部分简单的例子用不到侦听器，但侦听器很适合用于处理异步操作。假设我们有一个可以让用户输入的输入框，但是想将5 秒前的输入内容显示到页面上。要做到这一点，可以使用v-model 将输入框的值绑定到data 对象中的一个属性，然后侦听该属性的变化，井且在侦听器中将这个值在一定的延迟之后赋值给data 对象的另一个属性：
~~~
  <div id="app">
      <input type="text" v-model="inputValue"><br>
      <p>5秒之后显示{{oldInputValue}}</p>
  </div>
  <script>
  var app = new Vue({
      el: '#app',
      data: {
          inputValue: '',
          oldInputValue: ''
      },
      computed: {
      },
      watch: {
          inputValue(){
              let newValue = this.inputValue;
              setTimeout(()=>{
                  this.oldInputValue = newValue;
              },5000);
          }
          ----等价于下面的代码，但是不支持箭头函数---
          <!-- inputValue: function(){
              let newValue = this.inputValue;
              setTimeout(()=>{
                  this.oldInputValue = newValue;
              },5000);
          } -->
      },
  });
~~~
- 在这个例子中我们需要注意一点，如果我们想要正确的显示每次inputValue值更新的情况，我们用一个局部变量接收inputValue的值，不然当我们多次更新inputValue值时，只能显示最近一次更新的值。
- 对这个注意点进行说明：我们侦听器当侦听到inputValue属性发生变化时，会开辟一个空间。我们在函数内部声明一个变量，那么每次inputValue属性发生变化时都会开辟空间，内部保存inputValue更新的值。我们就可以访问到inputValue每次更新的值。

### 侦听data 对象中某个对象的属性
- 有些时候会将一整个对象存储在data 对象中。为了侦听这个对象的属性变化，可以在侦听器的名称中使用．操作符，就像访问这个对象属性一样：

~~~
<div id="app">
        <input type="text" v-model="formData.username">
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        formData: {
            username: "小明"
        },
        nickname: '小张'
    },
    computed: {
    },
    watch: {
    'formData.username'(){
            console.log("username变化了");     
        }
    },
});
</script>
~~~
### 侦听器的参数
- 当监听的属性发生变化时，侦听器会被传入两个参数：所监听属性的当前值和原来的旧值。这一特性可以用来了解到底发生了什么变化：
~~~
 watch: {
  inputValue: function(val,oldVal){
      setTimeout(()=>{
          //this.inputValue 等价于 val
          this.oldInputValue = this.inputValue;
      },5000);
  }
  }
~~~
### 深度监听
- 当监听一个对象时，可能想监听整个对象的变化，而不仅仅是某个属性。但在默认情况下，如果你正在监听formData 对象井且修改了formData.username ，对应的侦听器并不会触发，它只在formData 对象被整个替换时触发。
- 监听整个对象被称作深度监听，通过将deep 选项设置为true开启这一特性：
- deep 选项设置为true时告诉Vue以递归的方式侦听嵌套对象内部的得变化。
~~~
watch: {
    formData: {
        headler(val,oldVal) {
            },
        deep: true
        }
    }
~~~
## 过滤器 filters
- 过滤器是一种在模板中处理数据的便捷方式，而且经常会在其他模板语言中见到。它们特别适合对字符串和数字进行简单的显示变化：例如，将字符串变为正确的大小写格式，或者用更容易阅读的格式显示数字。
- 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道  | ”符号指示：
- 过滤器格式 A | B | C | D，其中| 是管道符，后面跟过滤器。意思就是把A的数据传给B，B进行运算后再把结果传给C以此类推。
~~~javascript
<div id="app">
    <p>A的价钱：{{moneryA | format}}</p>
    <p>B的价钱：{{moneryB | format}}</p>
    <p>C的价钱：{{moneryC | format}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            moneryA: 998,
            moneryB: 2399,
            moneryC: 5300,
        },
        filters: {
            format(value) {
                return '￥'+ (value/100).toFixed(2);
            }
        }
    });
</script>
~~~
- 过滤器的第一个参数是接收数据或者上一个过滤器传过来的数据，过滤器可以接收其他参数。
~~~
<div id="app">
    <p>A的价钱：{{moneryA | format("$")}}</p>
    <p>B的价钱：{{moneryB | format("￥")}}</p>
    <p>C的价钱：{{moneryC | format("￥")}}</p>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            moneryA: 998,
            moneryB: 2399,
            moneryC: 5300,
        },
        filters: {
            format(value,symbol) {
                return symbol + (value/100).toFixed(2);
            }
        }
    });
</script>
~~~
- 除了在插值中使用，还可以在v-bind 中使用过滤器（当绑定数值到属性时）：
~~~
<div id ="app">
<input type="text" v-bind:value="moneryA | format("$")"〉
</div>
~~~
- 也可以使用Vue. filter（）来注册一个全局的过滤器，而不是将过滤器逐一注册到各个组件上。
  这种方式适合注册整个应用中都会用到的过滤器。我一般把我所有的过滤器都放到单独的filter.js 文件中。
~~~
Vue.filter('format',function(value, symbol){
     return symbol + (value/100).toFixed(2);
});
~~~
#### 过滤器注意事项
- 一个是过滤器是组件中**唯一不能使用this来访问数据或者方法的地方**。这一点是故意设计成这样的：因为过滤器应该是纯函数，也就是说
  对于同样的输入每次都返回同样的输出，而不涉及任何外部数据。如果想在过滤器中访问其他数据，可以将它作为参数传入。
- 另外一个注意事项是只可以在插值和v-bind 指令中使用过滤器。而在Vue1中，可以在任何可以使用表达式的地方使用过滤器，Vue2取消了这种做法。
## 使用ref直接访问元素和组件
- reference  ref  是 英文单词 【reference】   值类型 和 引用类型  referenceError
- 有时你会发现需要直接访问一个DOM 元素；也许你正在使用一个不支持Vue的第三方库，或者希望做一些Vue 自身不能完全处理的事情。可以使用ref 直接访问元素，而不选择DOM节点的原生方法。
  使用ref访问一个元素，只需要将这个元素的ref属性设置为字符串，然后可以使用这个字符串访问元素：
~~~
 <p ref='myPara'></p>
~~~
这个元素会被存储到this.$ref 这个对象中，对应的键名就是
为元素的ref 属性设置的值。在这个例子中，可以使用this.$ref.myPara 访问这个元素。
- 在组件中使用ref尤为有用。同一组件的代码可能在页面上出现多次，这意味着根本不能为组件内的元素添加一个唯一的类名然后使用querySelector来选择该元素。相比之下，this.\$ref 只包含当前组件内部元素的引用，这意味着如果在组件内调用this.$refs.myPara，它总是指向该组件内的对应元素，而不是页面其他地方的元素。
- 关于ref注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$ref 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。
- **我们可以通过ref拿到某个组件的引用，我们可以通过这个引用去获取组件的属性和方法。**
## 监听元素事件 v-on
- Vue中的事件绑定用v-on,来完成。
- 用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。
- 语法：v-on:事件名="方法" 或者 v-on:事件名="方法调用"。
- 如果事件直接绑定函数名称，那么默认会传递事件对象作为事件函数的第一个参数。
- 如果事件绑定函数调用，那么事件对象必须作为最后一个参数显示传递， 并且事件对象的名称必须\$event。v-on:click='handle2(123, 456, $event)'。
- 我们可以直接使用内联代码，@click="counter++"。
- v-on的简写形式 v-on:click 简写形式为 **@click**
~~~javascript
<div id="app">
        <button @click="counter++">单击增加次数</button>
        <button v-on:click="hi">单击log打印hello</button>
        <p>{{counter}}</p>
    </div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0
        },
        methods: {
            hi(e) {
                console.log('hello');
            }
        },
    });
</script>
~~~
## 事件修饰符
- 可以使用很多修饰符来修改事件监听器或者事件本身。@事件名.事件修饰符="";
- .stop - 调用 event.stopPropagation()。
- .prevent - 调用 event.preventDefault()。
- .capture - 添加事件侦听器时使用 capture 模式。
- .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
- .native - 监听组件根元素的原生事件。
- .once - 只触发一次回调。
- .left - (2.2.0) 只当点击鼠标左键时触发。
- .right - (2.2.0) 只当点击鼠标右键时触发。
- .middle - (2.2.0) 只当点击鼠标中键时触发。
- .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
### 按键修饰符
- 除了事件修饰符之外还提供了按键修饰符。
- 它们用在键盘事件上，只有在特定按键按下时才会触发事件
~~~
//只有在Esc键被按下时才会触发,因为Esc键的e.keyCode为27.
<input type="button" @keyup.27="..">
~~~
- Vue 还为最常用的按键提供了别名：.enter、 tab 、.delete 、.esc 、.space 、.up 、down 、.left 和.right 。不想使用@keyup.27 并且记住键值27 所代表的含义的话，只要使用@keyup.esc 就可以了。
- Vue 从2.5. 版本开始可以使用键盘事件对象中key属性的所有可能值作为修饰符。
  例如，按下左侧的Shift键时，e.key等于Shiftleft 。因此要想监听出Shift键何时松开，可以使用下面的代码：
~~~
<input type="button" @keyup.shift-left="..">
~~~
和按键修饰符类似，有3 个鼠标按钮修饰符可以添加到鼠标事件上：.left 、.middle 和.right 。

还有一些用于Ctrl和Shift 等系统修饰键的修饰符：.ctrl、.alt、.shift和.meta。前3个修饰符可以很简单地从名字了解其含义，但.meta却不是很明确：在Windows 系统中，它代表Windows键；在macOS 中，它代表Command 键。

最后，如果想在只有被指定的按键被按下但没有其他按键被按下的时候才触发事件侦听
器，可以使用.exact 修饰符。例如：
~~~
<input type="button" @keydown.enter.exact="..">
~~~
在上面这个例子中，当Enter键被按下，且没其他任何按键一一例如Command-Enter或者Ctrl-Enter一一被按下时，侦听器才会被触发。

### 自定义全局按键修饰符

Vue.config.keyCodes.f2=113;

- 这样我们就把f2与其键盘码113，在监听f2按键时，不用再@keyup.113，直接写@keyup.f2即可。

## Vue实例生命周期钩子
- 生命周期钩子是一系列会在组件生命周期————从组件被创建并添加到DOM,到组件销毁的整个过程————的各个阶段调换的函数。
- 虽然Vue 有8个生命周期钩子，但是很容易记住，因为其中4 个是带有before前缀的钩子，它们会先于其他钩子被调用。
  ![]()

### 基本的生命周期与钩子的调用时机
1. 首先vue实例会在执行new Vue()时初始化。此时第一个钩子函数beforeCreate会被调用，同时响应式功能会被初始化，然后created钩子会被调用————从钩子的名字就能明白它们的执行机制：带有“before”前缀的钩子会在相关工作开始之前被调用，然后，真正执行相关工作的钩子才会被触发。
2. 解析模板内容————模板内容可以从template或render选项获取，或者从Vue初始化时所挂载元素的outerHTML获取。此时就可以开始创建DOM元素了，因此会先触发beforeMounted然后创建DOM 节点，之后再触发mounted钩子。
  **注意事项**： 在Vue2.0 中，mounted 钩子触发时并不保证元素已经被添加到DOM上。如果想保证元素已经被添加，可以调用Vue.nextTick()方法（也可以通过this.$nextTick()调用）并传入一个回调函数，在回调函数中添加需要在元素被添加到DOM 之后运行的代码。
~~~
 <script>
    var app = new Vue({
        el: '',
        mounted() {
            //此时元素可能还没添加到DOM上
            this.$nextTick(()=>{
                //确定元素已被添加到DOM上
            });
        }
    });
</script>
~~~
3. 此时已经有4个钩子被触发了，此时组件实例已经被初始化并添加到DOM上，并且用户已经可以看到我们的组件。也许我们的数据会更新，但是DOM 也会被更新以响应数据的变化。在处理更新前，beforeUpdate钩子函数会被触发，而且在应用更新之后，updated钩子会被触发。当数据多次变化时，这一钩子函数可以被多次触发。
4. 我们已经看到了组件的创建和运行，现在终于到了组件“离开”的时候了。在组件从DOM上被移除前，beforeDestroy 钩子会被触发，并且在它被移除后，destroyed 钩子会被触发。
- 这就是在Vue 实例的生命周期中会触发的所有钩子函数。现在，我们从这些钩子本身而不是Vue 实例的角度再将它们梳理一遍.
    - beforeCreate 在实例初始化前被触发。
    - created 会在实例初始化之后、被添加到DOM 之前触发。
    - beforeMount 会在元素已经准备好被添加到DOM ，但还没有添加的时候触发。
    - mounted 会在元素创建后触发（但并不一定已经添加到了DOM ，可以用nextTick 来保证这一点）。
    - beforeUpdate 会在由于数据更新将要对DOM 做一些更改时触发。
    - updated 会在DOM 的更改已经完成后触发。
    - beforeDestroy 会在组件即将被销毁并且从DOM 上移除时触发。
    - destroyed 会在组件被销毁后触发。
## 自定义指令
- 除了v-if 、v-model 以及v-html 等内置的指令，还可以创建自定义指令。当你想直接对DOM 进行某些操作时，指令非常好用一一如果发现自己并不需要访问DOM ，那么使用不带指令的组件就好。
- 如何添加自定义指令：添加一个指令类似于添加一个过滤器可以在**将它传入Vue实例或者组件的directives属性**，或者使用**Vue.directive()注册一个全局指令**。需要**传入指令的名字**，以及**一个包含钩子函数的对象**，这些钩子函数会在设置了该指令的元素的生命周期的各个阶段运行。
- 在定义自定义指令的时候，不需要加  v- 前缀，在使用的时候需要添加 v- 前缀。
- 注意踩的坑：如果需要在Vue这个构造函数上调用方法，那么应该先调用，在实例化对象。比如使用Vue.directive()注册一个全局指令，先注册再去实例化Vue，这样这个Vue实例（组件）中的自定义指令才会生效。
- 当全局指令和局部指令同名时以局部指令为准.
~~~
//在Vue.directive()中添加自定义指令。
<div id="app">
    <p v-blink>炫</p>
</div>
<script>
Vue.directive('blink',{
    bind(el){
        let isVisible = true;
        setInterval(()=>{
            isVisible = !isVisible;
            el.style.visibility= isVisible? 'visible':'hidden';
        },1000);
    }
});  
var app = new Vue({
    el: '#app',
});
</script>
-----------------------
//在Vue实例或者组件的directives属性中添加自定义指令.
var app = new Vue({
    el: '#app',
    directives: {
        blink: {
            bind(el) {
                let isVisible = true;
                setInterval(() => {
                    isVisible = !isVisible;
                    el.style.visibility = isVisible ? 'visible' : 'hidden';
                }, 1000);
            }
        }
    }
});
~~~
### 指令的生命周期钩子
- 指令生命周期是指：指令从绑定到拆除。
1. bind 钩子函数会在指令绑定到元素时被调用。
2. inserted 钩子会在绑定的元素被添加到父节点时被调用一一但和mounted 一样，此时还不能保证元素已经被添加到DOM 上。可以使用this.$nextTick 来保证这一点。
3. update 钩子会在绑定该指令的组件节点被更新时调用，但是该组件的子组件可能此时还未更新。
4. componentUpdated 钩子和updated 钩子类似，但它会在组件的子组件都更新完成后调用。
5. unbind 钩子用于指令的拆除，当指令从元素上解绑时会被调用。
- 不必每次都调用所有的钩子。事实上，它们都是可选的，所以它们中的任何一个都不是必须要调用的。
- 我们最常用的都是bind 和 update。
### 自定义指令的简写

- 对于只关心bind 和 update的自定义指令，我们可以采用简写形式：

  ~~~javascript
  var app = new Vue({
      el: '#app',
      directives: {
          blink: { //相当于把代码写到了 bind 和 update上去。	
              bind(el) {
                  let isVisible = true;
                  setInterval(() => {
                      isVisible = !isVisible;
                      el.style.visibility = isVisible ? 'visible' : 'hidden';
                  }, 1000);
              }
          }
      },
    	blink(el){  //相当于把代码写到了 bind 和 update上去。
         let isVisible = true;
                  setInterval(() => {
                      isVisible = !isVisible;
                      el.style.visibility = isVisible ? 'visible' : 'hidden';
                  }, 1000);
              }
  	}
  });
  ~~~


### 指令钩子函数参数

- Vue内置的指令，可以接受参数（v-bind:class）、修饰符(v-on.once) 和值（v-if="expression"）。
- 自定义指令也允许我们设置参数、修饰符、值,我们可以通过**传入钩子函数的第二个参数binding来访问它们**。
- 如果我们自定义了一条非常复杂的指令，那么在binding对象中会把复杂的指令进行拆分为特点的属性供我们访问。
~~~
//假设我们设置了这么一条指令,那么binding对象会包含以下属性
v-my-directive:example.one.two = "someExpression"
~~~
1. name属性是指令的名称，但不包含v-。在这个例子中，name的值为my-directive。
2. value属性是传入指令的值。在这个例子中，它将会是someExpression**表达式的计算值**。例如，假设data对象等于{someExpression：hello world}，那么value的值就是hello world。
3. oldValue 属性是上一次传入指令的值，它只有在update和componentUpdated钩子函数中才可以使用。在例子中，如果改变someExpression的值，update钩子就会被调用，此时value属性为新的值，oldValue属性为旧的值。
4. expression属性是指令表达式的字符串形式，之后会对该表达式求值。在这个例子中，它的值为someExpression。
5. arg属性是传入指令的参数，在这个例子中也就是example。
6. modifiers属性是一个包含所有传入指令的修饰符的对象。在这个例子中它等于{one: true, two: true}。
~~~javascript
var app = new Vue({
    el: '#app',
    directives: {
        blink: {
            bind(el,binding) {
                let isVisible = true;
               let timeId = setInterval(() => {
                    isVisible = !isVisible;
                    el.style.visibility = isVisible ? 'visible' : 'hidden';
                }, binding.value||1000);
                el.dataset['timeId'] = timeId;
            },
            updated(el,binding) {
                clearInterval(el.dataset['timeId']);
            },
        }
    }
});
~~~
## 过渡和动画
### 过渡
- Vue提供了提供了大量功能来为你的Vue应用增加动画和过渡效果一一从在元素进入、离开页面或者修改时使用css过渡和JavaScript动画，到实现多个组件间的过渡，甚至数据元素本身的动效。我们在此学习一些最常用的。
- Vue提供了一个\<transition\>组件，它会向内部的带有v-if、v-show指令的元素添加类名，因此可以使用这个组件来为**进入或离开的元素**添加css 过波动画。
- \<transition\>是一个幽灵元素，并不会出现在DOM树上，和template的效果一样
- 举例说明：
~~~
<style>
     .fade-enter-active {
         transition: color .5s;
     }
     .fade-leave-active {
         transition: color .5s;
     }
     .fade-enter {
         color: red;
     }
     .fade-leave-to {
         color: green;
     }
</style>
<div id="app">
    <button @click="divVisble = !divVisble">点我</button>
    <transition name="fade">
        <div v-if="divVisble">就是这么last炫</div>
    </transition>   
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            divVisble: true
        }
    });
    //没有过渡效果，添加过渡效果
</script>
~~~
- 将需要过渡的元素，包含在transition组件。然后再添加上固定的格式的类名。
- transition组件中提供了很多过渡形式，这个例子中只用到了enter和leave。
- 下面是enter和leave两种过渡形式常用的类名。
    - {name}-enter:使用这个类名设置在**进入过渡阶段需要过渡的css属性**。
    - {name}-enter-active:使用这个类名设置**进入过渡的transitionCSS属性**。
    - {name}-leave-active:使用这个类名设置**离开过渡的transitionCSS属性**。
    - {name}-leave-to:使用这个类名设置在**离开过渡阶段需要过渡的css属性**
### JS动画
- \<transition\>组件还提供了用于实现JavaScript动画的钩子。使用这些钩子，可以使用自己的代码或者类似于GreenSock或者Velocity的库来实现动画。

- 这些钩子和用于css过渡的类名类似：
    - beforeEnter:
      这个钩子会在进入动画开始前被触发，适合设置初始值。

    - enter:
      这个钩子会在进入动画开始时被触发，可以在这里运行动画。可以使用done回调来标明动画已经完成。

      通过调用done这个回调函数去尽可能早的执行afterEnter钩子。

    - afterEnter:
      这个钩子会在进入动画执行完成时被触发。

    - enterCancelled:
      这个钩子会在进入动画被取消时触发。

    - beforeleave:
      这个钩子对于离开动画而言等同于进入动画的beforeEnter钩子，会在离开动画开始前被调用。

    - leave:
      这个钩子对于离开动画而言等同于进入动画的enter钩子，可以在这里运行进入动画。

    - afterLeave:
      这个钩子会在离开动画执行完成时被触发。

    - leaveCancelled:
      这个钩子会在离开动画被取消时触发。

    这些钩子会以事件的形式在transition 组件上触发，像下面这样：

    ~~~
    <transition
    v-on:before-enter="handleBeforeEnter"
    v-on:enter="handleEnter"
    v-on :leave="handleleave">
    <div v-if ＝"divVisible" >. .. </div>
    </transition>
    ~~~

- 动画钩子函数的第一个参数，是要执行动画的DOM元素，是个原生的元素。

-  Vue 把一个完整的动画，使用钩子函数，拆分为了两部分：我们使用 flag 标识符，来表示动画的切换；刚一开始，flag = false  ->   true   ->   false。我们有时候只想要前半场动画，我们可以在afterEnter中控制flag，直接让flag变为fasle，从而跳过后半场动画。

- \<transition-group>组件，为元素列表添加动画效果，当元素**被添加、移除和移动**时，该组件将对它的子元素做出动画效果。

- 注意事项:\<transition-group>的子元素必须由唯一的key 做标识。

- 给 ransition-group 添加 appear 属性，实现页面刚展示出来时候，入场时候的效果

- 跟 \<transition>元素不同的是，\<transition-group>默认情况下会作为\<span>元素出现在DOM 中。你可以使用tag prop 修改这个HTML 元素：

    ~~~
    <transition-group tag="ul">
    	<li v-for="item in items" />
    <transition-group>
    ~~~

- **列表过渡有一个额外的类v-move ，用于元素的移动**。Vue**将使用css 的transform 属性对元素进行移动**，所以我们只需要应用一个css 过渡效果，并至少带上一个过渡时长即可。

    ~~~
    .ul-move{
      transition: transform .3s
    }
    ~~~
### 过渡组件可以监听事件
- \<transition-group\>和\<transition\>可以会触发事件，并且可以监听事件。
- 对应每个过渡阶段的事件：before-enter、enter、atfer-enter、after-leave等。 

## Vuejs基础总结

- 了解了一些使用Vue 的原因。
- 了解了如何使用CDN 或者webpack 安装和配置Vue 。
- 了解了Vue 的语法：如何使用模板、data对象和指令将数据显示到页面上。
- 了解了v-if 指令和v-show指令的区别。
- 了解了如何使用v-for在模板中进行循环。
- 了解了如何使用v-bind指令将data 对象的属性绑定到HTML 元素的属性上。
- 了解了Vue如何在数据更新时自动地更新页面上显示的内容：这一特性被称作响应式。
- 了解了双向数据绑定：使用v-model 将数据显示在输入框中，以及当输入框的输入值被改变时更新data对象。
- 了解了如何使用v-html 指令将data 对象中的数据直接设置为一个元素内部的HTML 内容。
- 了解了如何使用方法，从而可以在模板中和整个Vue 实例中访问函数。同时我们还了解了方法中this 的指向。
- 了解了如何使用计算属性来创建可访问的值，就像访问data 对象的属性一样，但是它们是在运行时计算得到的，并且是以函数的形式被定义的。
- 了解了如何使用侦听器来监听data 对象的属性或计算属性的变化，并且在变化发生时进行一些处理一一但是通常情况下应该避免使用侦昕器，计算属性往往是不错的选择。
- 了解了过滤器，一种在模板中处理数据的便捷方住例如，格式化数据。
- 了解了如何使用ref直接访问元素，在使用Vue不支持的第三方库或者是做一些Vue自身不支持的操作时，可以使用它。
- 了解了使用v-on实现事件绑定，以及它的简写语怯：在事件名称前添加@前缀。
- 了解了Vue 实例的生命周期，以及如何在钩子函数中运行代码。
- 了解了如何创建自定义指令。
- 了解了如何使用Vue 提供的css 过搜和JavaScript 动画功能。




















