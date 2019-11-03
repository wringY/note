## render函数和JSX
- 我们已经使用了在组件中设置组件的template属性来设置组件的HTML，也使用了vue-loader中在\<template\>标签中编写组件的HTML.
- 其实，在Vue的实例中我们也可以设置template属性。那么在它会自动添加到我指定的Vue挂载的元素中。
~~~
<div id="app">
</div>
<script>
    var app = new Vue({
        el: '#app',
        template: '<i>hello world</i>'
    });    
</script>
~~~
- 但是我们不仅可以使用template来设置组件的HTML属性，我们有另一种方法使用render函数。
- 同时也可以在Vue中应用JSX
### render函数
- 当我们在组件或者Vue实例中添加render函数时，这个函数会传入一个createElement函数，可以使用它来指定页面上显示的HTML。

- render函数会把组件或者实例的中的内容全部替换。

  下面这个案例会输出<h1>hello world</h1>
~~~
<div id="app">
</div>
<script>
    var app = new Vue({
        el: '#app',
        render(createElement) {
            return createElement('h1','hello world');
        },
    });      
</script>
~~~
### render函数的参数createElement
- createElement接收三个参数：**将要生成的元素的标签名称**、**包含配置信息的数据对象**（诸如HTML 特性、属性、事件侦听器以及要绑定的class和style等）和**一个子节点或是包含子节点的数组**。
- 标签名称是**必需的**，**另外两个是可选的**（如果不需要指定数据对象，可以让子节点作为第二个参数）
#### createElement参数————标签名
- 标签名称是最简单的，也是唯一一个必需的参数。它可以是一个字符串，或是一个返回字符串的函数。
- render函数中也可以访问this，所以可以将标签名称设置为data 对象的某个属性、prop 、计算属性或是任何类似的东西。
~~~
<div id="app">
</div>
<script>
    var app = new Vue({
        el: '#app',
        //render函数的参数是一个函数声明，我们只需要拿一个形参接收而不用在乎形参的名称
        render(h) {
            return h(this.tagName,'HELLO WORLD');
        },
        data() {
            return {
                tagName: 'h1'
            }
        },
    });    
</script>
~~~
- 这是render函数优于template的一个很大的优势，在template中动态设置标签名称并不是那么容易的，并且代码可读性也不好。<{{tagName}}>写法是无效的（而且依然不易于阅读！）。
#### createElement参数————数据对象
- 数据对象是设置一系列配置属性的地方，这些属性会影响生成的组件或元素。如果是在编写template，那么它就是包括出现在标签名称与闭合尖括号>之间的所有东西。例如，对于\<custom-button type=" submit" v-bind: text=" buttonText"\>，相应的属性就是type="submit"v-bind:text="buttonText"
- 在这个示例中，type是传递给组件的一个普通的HTML属性，而text是一个组件prop，与变量buttonText绑定。下面用render函数来完成。
~~~
<div id="app">
</div>
<script>
    var app = new Vue({
        el: '#app',
        data() {
            return {
                customButton: "button",
                buttonText: 10
            }
        },
        render(h) {
            return h(this.customButton,{
                attrs: {
                    type: 'submit'
                },
                props: {
                    text: this.buttonText
                }
            },"hhh");
        },
    });
</script>
~~~
- 注意到不再使用v-bind了，这是因为可以直接通过this.buttonText引用变量。由于
  this.buttonText是render函数的一个依赖，无论何时只要buttonText更新，render函数就会被再次调用，然后DOM也会自动更新，就和template一样。
##### 数据对象中可配置的选项（常用）
~~~
{
     //HTML特性
     attrs: {
        type: 'submit'
     },
     //传递给组件的prop属性
     props: {
         text: '单击我'
     },
     //DOM属性，比如innerHtml（而不是v-html）
     domProps: {
        innerHtml: '一些html'
     },
     // 事件侦听器
     on: {
         click: this.handleClick
     },
    
     //与slot="exampleSlot"相同一一当组件是某个组件的子组件时使用
     slot: 'exampleSlot'    

     //与key="exampleKey"相同一一用于某个循环产生的组件
     key: 'exampleKey'  

     //与ref="exampleRef"相同
     ref: 'exampleRef   

     //与v-bind:class="['example-class', {'conditional-class':true]"相同
     class: ['example-class', {'conditional-class':true]   

     //与v-bind:style="{ backgroundColor:'red'}"相同
     style: {background:'red'}
}
~~~
- 请注意，class和style并没有在attrs属性中，它们是单独设置的。这是因为v-bind指令的特性；如果仅仅将clas 或者style设置为attrs对象的一个属性，就不能将class设置为数组或是对象，或者将style设置为对象。
#### createElement参数————子节点
- 第三个也是最后一个参数是用来设置元素的子节点的。
- 它可以是一个数组也可以是一个字符串。
- 如果是一个**字符串**，那么它的值**会作为元素的文本内容被输出**。
- 如果是一个**数组**，可以在数组中再次调用CreateElement函数，来构建一个复杂的DOM树。
- 如果不需要设置数据对象，那么字节点就是第二个参数。
- 来个例子，我们想要生成一个如下的模板，使用render函数来完成
~~~

//我们想生成如下的模板
 <div>
    <button v-on:click="count++">单击增加次数</button>
    <p>你已经单击了按钮{{ counter }}次</p>
</div>
-----------------
//用render函数来实现
    <div id="app">

    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data() {
                return {
                    count: 0
                }
            },
            render(h) {
                return h('div', [
                    h('button', {
                        on: {
                            click: ()=> this.count++
                        },
                    }, '单击次数'),

                    h('p', `你已经单击了按钮${this.count}次。`)
                ]);
            },
        });      
    </script>
~~~
### JSX
- JSX是基于Javascript的语言扩展，它允许在Javascript代码中插入XML语法风格的代码。
- Vue框架并没有特意地去支持JSX，其实它也没必要去支持，因为JSX最后都会编译为标准的JavaScript代码。既然这样， 那Vue和JSX为什么能配合在一起使用呢？ 很简单，因为Vue支持虚拟DOM，你可以用JSX或者其他预处理语言，只要能保证render方法正常工作即可。
- Vue官方提供了一个叫做babel-plugin-transform-vue-jsx的插件来编译JSX。
- 为什么要在Vue中使用JSX:其实Vue并没有强迫你去使用JSX， 它只是提供了一种新的方式而已。正所谓萝卜青菜，各有所爱。有的人觉得在render方法中使用JSX更简洁，有的人却觉得在JavaScript代码中混入HTML代码很恶心。反正你喜欢就用，不喜欢就不用呗。
- 如何使用JSX语法：直接在npm网站上搜索插件，找到其在Github上的说明按照即可。
~~~
npm install -d babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props  babel-preset-env
~~~
紧接着编辑.babelrc文件
~~~
{
"presets": ["es2015"],
"plugins": ["transform-vue-jsx"]
}
~~~
- 然后就可以在render函数中，是JSX语法。但是我不喜欢这种语法，目前只做简单了解吧。

