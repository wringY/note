# Vue自定义插件

- 要创建插件，只有一个规则————插件应该是一个带有install 方法的对象，该方法接收Vue
  构造函数作为第一个参数以及一个可选的options 参数。然后，该方法将通过修改构造函数为
  框架添加新特性。

~~~javascript
let baseUrl
export default {
    install (Vue,options){
        console.log('Installed')
        baseUrl = options.baseUrl

        Vue.prototype.$fetch = $fetch
    }
}
export async function $fetch (url) {
    const response = await fetch(`${baseUrl}${url}`)
    if (response.ok) {
        const data = await response.json()
        return data
    }else {
        const error = new Error('error')
        throw error
    }
}
~~~

- 我们创建了一个插件用来发送fetch请求。里面配置了baseUrl，以及一个挂载在全局的$fetch方法。
- 我们就在入口文件中导入这个插件，import VueFetch from './plugins/fetch.js' 之后再挂载到Vue身上。

~~~
Vue.use(VueFetch,{

  baseUrl: 'http://localhost:3000/'

})

~~~

## 自定义 v-model

v-model默认监听valueprop，和input事件。

~~~vue
//这是子组件，FormInput。接收父组件传递过来的vale prop。
<template>
    <div class="row">
        <input :value.prop="value" @input="update">
      //在数据绑定的时候，使用prop告诉Vue直接设置DOM节点的value属性，而不是HTML属性
    </div>
</template>

<script>
  export default {
    props: {
        value: {
            required: true
        },
    },
       methods: {
        update (event) {     
            this.$emit('input',event.currentTarget.value)
        }
   }
  </script>

//这是父组件
<template>
    <main class="login">
        <h1>请登录</h1>
        <form>
            <FormInput v-model="username"
            />
        </form>
    </main>
</template>
export default {
    data(){
        return {
           username: '' 
        }
    },
  
}
</script>
~~~

- v-model就绑定了FormInput组件的valueprop，监听input事件。

但是我们可以自定义v-model，在子组件内部添加model选项：

~~~javascript
model: {
  prop: 'text',  //修改v-model的prop
  event: 'update'  //修改监听事件
}
//修改子组件的value prop 为text
   props: {
        text: {
            required: true
        },
    }
  //修改模板
<input :value.prop="text">
//修改事件名
   methods: {
       update (event) {     
            this.$emit('update',event.currentTarget.value)
       }
~~~

- 这样子组件中，已经修改了v-model绑定的prop属性和监听的事件。此时在父组件中使用v-model指令，监听的就是子组件中指定的v-model设置。