## 使用Vue添加样式
- Vue提供了几种方式来为网站或是应用添加样式。v-bind:class和v-bind:style两者都有专门的功能，帮助你通过数据设置class属性和内联样式。**当结合vue-loader使用组件时，可以使用scopedCSS来添加样式，井且只在该css所在的组件中有效**。
### Class绑定
- 通常使用v-bind绑定class属性，从而可以根据数据的变化添加或删除类名。
- 下面是传递一个数组给v-bind:class,数组中的类名将会在拼接在一起。我们通常用于想要根据数据或是计算属性设置class的场景。
~~~
<style>
    .foo {
        background: red;
    }
    .bar {
        color: blue;
    }
</style>

<div id="app">
    <div :class="[firstClass,SecondClass]">
        123
    </div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            firstClass: 'foo'
        },
        computed: {
            SecondClass() {
                return 'bar'
            }
        },
    });    
</script>      
~~~
- 除了可以使用数组，还可以使用对象。对象的格式是{'键名':'表达式'}。当键名所对应的值（表达式的结果）为真时，会把这个键名作为class类添加到元素上。
~~~
<div :class="{'my-class': shoudAddClass}"></div>
~~~
- 也可以在这个对象中指定多个class。
~~~
<div id="app">
    <div :class="classes"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            shouldBeBar: true
        },
        computed: {
            classes(){
                return {
                    foo: true,
                    bar: this.shouldBeBar,
                    hello: false
                }
            }
        },
});
~~~
- 当你想要同时使用变量和条件判断来添加class时，也可以将数组和对象棍合在一起使用，只需将对象放在数组中：
~~~
 <div :class="[my-class,class2,{'addClass':hasClass}]"></div>
~~~
### 内联样式style的绑定
- 与前面介绍的v-bind:class相似，Vue也为style属性的设置提供了专门的功能。
~~~
<div :style="{fontWeight: 'blod',color: 'red'}"></div>
~~~
- 注意，我们用的是fontWeight，而不是font-weight。Vue会自动将该对象的属性由驼峰命名转为它们对应的css属性，这意味着不用再操心如何转义属性名中的短横杠了。
- 来个例子
~~~
<div id="app">
    <div v-for="n in 12" class="color" :style="{backgroundColor: getColor(n)}">
        111
    </div>
</div>
<script>
var app = new Vue({
    el: '#app',
   methods: {
       getColor(n){
           let ss = `hsl(${(n-1) * 30}, 100%, 75%)`;
           console.log(ss);
           return `hsl(${(n-1) * 30}, 100%, 75%)`;
       }
   },
}); 
</script>   
~~~
- 给style传入一个数组,可以使用一个数组来指定多个样式对象.
~~~
<div :style="[baseStyle,moreStyle]">...</div>
~~~
两个对象中的样式都会应用到元素上，如果有相同的样式名，那么moreStyles 中的样式会覆盖baseStyle 中的同名样式。
- 还可以使用数组提供多个值，来设置浏览器最终支持的值：
~~~
<div :style="{display:['-webkit-box','-ms-flesbox','flex']}"></div>
~~~
浏览器可以会自动匹配支持的属性。
### 在vue-loader中设置CSS样式
- 在前面我们学到vue-loader中有更简洁的语法来定义一个单文件组件。那么我们想在这个单文件组件中添加CSS样式，怎么办？
- vue-loader除了\<template\> \<script\> 标签还提供一个\<style\>标签，来供我们设置CSS样式。
~~~
<template>
    <p class="num">当前数字是{{number}}</p>
</template>
<script>
export default {
    props: {
        number: {
            type:Number,
            required:true
        }
    }
}
</script>
<style>
    .num {
        font-weight: 700;
    }
</style>
~~~
#### 在vue-loader中设置CSS样式存在的问题(scopedCSS) 
- 与JavaScript不同，组件中的css不仅会影响自身，还会影响到页面上所有的HTML元素。
- 为了解决这个问题,Vue提供了一个方法:scopedCSS, 如果我们在style标签上添加了scoped特性**\<style scoped\>\<style>**，Vue就会自动处理关联的css与HTML，使编写的css只影响到该组件中的HTML。
- 让我们看一下Vue是如何实现的。
~~~
如果在之前的style 标签上添加了scoped 属性，下面是输出的HTML:
<p data-v-e0e8ddca>当前数字是<span data-v-e0e8ddca class=number>10</span></p>
<style>
.number[data-v-e0e8ddca]{
font-weight: bold;
</style>
可以看到Vue 已经为组件中的每个元素添加了一个data属性，然后又将它添加到了css选择器中，使样式只应用在这些元素上。
~~~
#### 在vue-loader中scoped CSS的代替方案CSS Modules
- 作为scoped CSS的替代方案，可以用vue-loader实现CSS Modules。
- class表示式中添加**$style.** ,然后再style标签里面添加**module**特性。
~~~
<template>
    <p class="$style.num">当前数字是{{number}}</p>
</template>
<script>
export default {
    props: {
        number: {
            type:Number,
            required:true
        }
    }
}
<style module>
    .num {
        font-weight: 700;
    }
</style>
~~~
- .number样式会被一个随机的样式名称所替换，可以通过$style.number来引用这个名称，所以通过.number设置的样式将只会应用在那个单独的元素上。
### 预处理器
- 预处理器的作用：可以设置vue-loader来让预处理器处理css、JavaScript、和HTML。如果我们不设置预处理器，那么我们无法使用后缀为.vue的文件。
- 假设想要使用scss而不是css ，以利用诸如嵌套和变量这样的特性，我们需要预处理器和在**style标签上添加lang="scss"**。
~~~
<style lang="scss" scoped>
    .num {
        font-weight: 700;
    }
</style>
~~~
- 预处理器有很多，如：Sass、Less、PostCss等，我们可以选择安装
   npm install -D sass-loader node-sass
    npm install -d less
- 当我们做了上述设置后，scopedCSS就会被自动处理，不需要额外的步骤。


