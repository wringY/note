## vue-loader
- vue-loader是专门用来处理.vue后缀文件的加载器。
- 在编写组件时，我们上面将方法不是很方便，特别是处理更加复杂的组件时，肯定不想在组件的template属性中编写大量的HTML代码。
- vue-loader提供了一种方法，可以在.vue文件中以**有条理并且易于理解的语法编写基于单个文件的组件**。
- 经过webpack 和vue-loader 处理后，上面的代码的执行效果就和之前示例中的displaynumber组件一样。你必须使用预处理器，因为它无法直接在浏览器中工作。
## vue-loader 的构成
- vue-loader是用来写单文组件的，其中有3个组成部分。
- template标签（组件的内容） script标签（组件逻辑） style标签（组件样式）
- 单文件组件可以有多个style标签。

## 如何在.vue文件中定义组件的数据、方法

- 我们在template写组件的模板，script标签中定义组件的数据、方法等。

~~~javascript
<template>  
    <div>
  		//组件中的属性和方法可以在模板中访问
        <h1>login  .vue---{{msg}}</h1>
    </div>
</template>

<script>
    export default {
        data() {  // 注意：组件中的data必须是个function
            return {
                msg: 123
            }
        },
        methods: {
            show(){

            }
        }
    }
</script>
<style>

</style>
~~~

