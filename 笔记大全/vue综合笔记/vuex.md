## vuex
### vuex的概念
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex也集成到Vue的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。
- 这个概念我明显是看不懂的，那么我们如何来理解vuex，其实理解一个概念，需要知道为什么会出现，它的应用场景。
### vuex的应用场景
- 在学习vuex之前我们都学习到了哪些内容？
  我们主要学习的组件，组件中的数据都是保存在组件内部。组件之间的通信都是采用事件（events）方式：子组件向父组件进行通信,属性（props）父组件向子组件通信。
  我们可以看出组件的通信，都是发生在嵌套关系的组件中。假如我们有两个组件需要进行通信，但不是父子关系，而是两个独立的组件。（什么时候需要进行组件的嵌套，而什么时候需要独立的组件）
- 那么两个独立的组件如何进行通信呢：
  用一个社交网络应用来举个例，就说其中的消息部分。比如说，你想在应用顶部导航栏上放一个图标，用来显示收到的消息数量，同时在页面底部，还想要一个消息弹窗，同样是告诉你收到的消息数量。因为图标和弹窗这两个组件彼此在页面上并无直接联系，所以用events 和props 来连接它们将会是一场噩梦：与消息通知无关的组件将不得不传递这些额外的事件（注：因为那两个与消息通知有关的组件之间没有直接联系，并非父子关系，如果用事件方式或属性方式通信，则必然要经过其他组件传递事件或属性）。另外一种方法是，不通过连接两个组件的方式来共享数据，而是每个组件各自发送API请求。但这么做会更糟：不同的组件将会在不同的时间点更新，这就意味着它们会渲染不一样的数据，并且页面所发送的API 请求也会远远超过其实际所需。
- 至此vuex应用而生，帮助开发者**管理Vu 应用中的状态**。它提供了一种**集中式存储（centralizedstore）**，可以**在整个应用中使用它来存储和维护全局状态**。它**同时还使你能够对存入的数据进行校验，以保证当这个数据再次被取出时是可预见而且正确的**。
### 安装
- 既然这么好用，我们如何使用呢？
- 第一种通过CDN
~~~
<script src="https://unpkg.com/vuex></script>
~~~
- 如果使用的是npm，可以通过 npm install --save vuex来安装。
- 如果使用的是webpack打包工具，那么就像使用vue-router那样，调用Vue.use();
### vuex的核心 store
- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
### 创建最简单的store
- 前提是我们已经安装了vuex
~~~
<script src="./vuex.js"></script>
 //我们需要创建一个store实例,
        const store = new Vuex.Store({
           state: {}
        })
  //然后在Vue实例化时作为一个属性传入
 var app = new Vue({
    el: '',
    store,
  });
 现在，已经把这个store 引人应用中了，并且可以用this.$store 来访问它。

~~~
### 描述vuex作用 
- 嗯可以，在了解这个概念之前，我们需要去了解WeBScoket,还好网上教程很多（收藏、点赞加评论是我的回馈方式。。。）
- vuex可以满足复杂应用中多个组件进行状态共享的需求。
### State 及其辅助函数
- state 表示数据在vuex中的存储状态，它就像一个在应用的任何角落都能访问到的庞大对象一一是的，它就是单一数据源（single source of truth）。
- 既然vuex是多个组件共享状态，那么我们如何在组件中获取在vuex中集中管理的状态呢?
~~~
 <div id="app">
     <p>{{messageCount}}</p>
 </div>
 <script>
     //VUEX的作用：就是多个组件共享状态。
     //创建一个store实例
     const store = new Vuex.Store({
         state: {
             messageCount: 10
         }
     });
     //既然是多个组件共享状态，那么我们如何在组件中获取，在vuex中集中管理的状态呢?
     var app = new Vue({
         el: '#app',
         store,
         computed: {
             messageCount() {
                 return this.$store.state.messageCount;
             }
         },
     });
 </script>
~~~
- 这里可以通过this.$store.state.messageCount来访问应用中state对象的messageCount 属性。不过这么做有点儿烦琐，通常把它放入一个计算属性中会更好。
- 每当 store.state.messageCount 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。
#### State辅助函数 mapState
- 当引用store的属性不多时，直接在计算属性中访问store是没问题的，但是当你引用
  大量的store 属性时，**多次引用就会变得很重复**。鉴于此，vuex 提供了一个辅助函数mapState ，它**返回一个被用作计算属性的函数对象**。
- 我们需要在按需导入 mapState

~~~
import {mapState} from 'vuex' //由此可见在vuex这个包中通过export向外暴露了一个mapState函数
~~~

- 我们在需要访问保存在store的state属性的组件的computed属性中，调用这个方法。我们需要给这个函数传一个字符串数组，如果我们想访问state中多个属性，直接在这个数组中添加即可。

~~~
const store = new Vuex.Store({
    state: {
        messageCount: 10,
        name: 'hello'
    }
});
import {mapState} from 'vuex'
var app = new Vue({
    el: '#app',
    store,
    data: {

    },
    computed: mapState(['messageCount','name']),
    watch: {

    },
});
//然后我们使用这些计算属性了
<div>
	{{messageCount}}
	{{name}}
</div>
~~~

#### mapState函数的原理

- 我们发现在computed:  mapState(['数据1','数据2']),我们就可以使用对应的计算属性，那么它做了什么呢？
- 其实mapState函数的完成写法是：

~~~
	computed: mapState({
		// 箭头函数可使代码更简练
        messageCount: (state)=> state.messageCount,
        name: (state)=> state.name
    })	
~~~

- mapState 函数以一个对象作为参数，并将其中的各个键值分别映射到一个计算属性。在这里
  键值给定的是函数，则该函数会以state 作为其第一个参数被调用，从而使你能够从这个参数上获取state 的值，并且返回一个对象。
- 如果我们想要从state 上获取一个属性作为计算属性，也可以只赋予它一个字符串。

~~~
	computed: mapState({
		// 箭头函数可使代码更简练
        messageCount: (state)=> state.messageCount,
        // 传字符串参数 'name' 等同于 `state => state.name`
         name: 'name'
    })	
~~~

- 如果我们想在mapState函数生成的计算属性中，访问当前组件，我们可以使用this，但是不是使用箭头函数，因为箭头函数的this指向定义箭头函数时候的作用域。在常规函数中this指向当前组件（实例）。

~~~javascript
const store = new Vuex.Store({
    state: {
        messageCount: 10,
        name: 'hello',
        action: '打招呼'
    }
});

var app = new Vue({
    el: '#app',
    store,
    data: {
        hi: 'hi'
    },
    computed: mapState({
        messageCount: state=> state.messageCount,
        name: 'name',
        action(state){
            return state.action + this.hi;
        }
    }),
~~~

- mapState函数返回值与组件上已有的计算属性合并

  - `mapState` 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？
  - 我们可以借助对象展开运算符：

  ~~~
   computed:{
   		//这是组件的原有计算属性
          hhhh() {
              return '我是本地的'
          },
          /// 使用对象展开运算符将此对象混入到外部对象中
          ... mapState({
              messageCount: state=> state.messageCount,
              name: 'name',
              action(state){
                  return state.action + this.hi;
              }
          })
      }
  ~~~

  - 最终的展开结果为:

  ~~~
  computed: {
  	//这是组件原本的计算属性
    localComputed () { 
    	return 我是本地的'
    },
      messageCount(){
      return this.$store.state.messageCount
  	} ,
  	name() {
  	return this.$store.state.name
  	},
  	action() {
  		return this.$store.state.action + this.hi
  	}
  }
  ~~~

#### 是否应该把组件的所有状态放到vuex中

- 我们知道vuex可以存放组件状态，那么是否意味着我们可以把组件的所有状态放到vuex中
- Vue官方推荐的做法： 组件仍然保有局部状态。
- 使用 Vuex 并不意味着你需要将**所有的**状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。
- 我们应该把应用级的state放到vuex中方便各个组件进行共享，而只用干单个组件内部的状态我们应该放到组件本地。

### Getter

#### 为什么需要Getter

- 什么是Getter，我们可以认为是 store 的计算属性。
- 一个场景：现在我们有个需要，把list进行过滤，需要把大于2的元素组成一个新数组

~~~javascript
const store = new Vuex.Store({
    state: {
      list: [1,2,3,4,5]
    }
});
//现在我们有个需要，把list进行过滤，需要把大于2的元素组成一个新数组
var app = new Vue({
    el: '#app',
    store,
    data: {
        hi: 'hi'
    },
    computed: {
        mylist() {
            return this.$store.state.list.filter((item)=>{return item > 2})
        }
    }  
});

~~~

- 如果多个组件都需要对state.list进行过滤操作，为了提高代码的可用性，我们不推荐在需要对state.list进行过滤操作的组件上都赋值该代码，或者把这些代码放到一个共享函数也不太理想。

#### Getter的定义

- getters是创建store时候定义的，并且与state同级。
- Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- Getter 接受 state 作为其第一个参数。
- Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

~~~
const store = new Vuex.Store({
    state: {
      list: [1,2,3,4,5]
    },
    getters: {
        mylist: (state)=>state.list.filter((item)=>{return item > 2})
    }
});
----------------------
var app = new Vue({
    el: '#app',
    store,
    data: {
        hi: 'hi'
    },
    computed: {
    //Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值
        mylist() {
            return this.$store.getters.mylist
        }
    }  
});
~~~

#### Getter的其它用法

- 我们可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
- 一个场景，我们有个需求，通过getter返回一个方法，在组件（实例）中通过this.$store.xxx的方式得到这个方法，并调用这个方法传入一个参数，可以得到与list数组索引对应的值

~~~javascript
const store = new Vuex.Store({
    state: {
      list: [1,2,3,4,5]
    },
    getters: {
        mylist: (state)=>state.list.filter((item)=>{return item > 2}),
        //现在我们有个需求，我们返回一个方法，调用这个方法传入一个参数，可以得到与list数组索引对应的值。
        mylist1: (state)=>(id)=>{
            return state.list.find((item,index)=>index === id);
        },
        //上面是箭头函数的形式，我已经转换为常规函数，mylist1 与 mylist2 等价的 
        mylist2(state) {
            return function(id){
                return state.list.find((item, index)=>index === id)
            }
        }
    }
});
-------------------------------------
var app = new Vue({
    el: '#app',
    store,
    data: {
        hi: 'hi'
    },
    computed: {
        mylist() {
            return this.$store.getters.mylist
        },
        mylist1(){
            return this.$store.getters.mylist1(2)
        },
        mylist2(){
            return this.$store.getters.mylist2(0)
        }
    }  
});

~~~

- 在getter中还可以调用其它getter：第二个参数为getters，就可以通过getters访问到其他getter。

~~~javascript
  getters: {
        mylist: (state)=>state.list.filter((item)=>{return item > 2}),
        //现在我们有个需求，我们返回一个方法，调用这个方法传入一个参数，可以得到与list数组索引对应的值。
        mylist1: (state)=>(id)=>{
            return state.list.find((item,index)=>index === id);
        },
        mylist2(state) {
            return function(id){
                return state.list.find((item, index)=>index === id)
            }
        },
          //在这个getter中我们调用了其他getter
        mylist3: (state,getters)=> getters.mylist.toString() + '哈哈哈'
    }
~~~

#### Getter辅助函数

- 和state一样，getter 方能也有辅助函数，省去了每次都要调用this.$store.getters 。getter辅助函数和mapState 用起来类似，不过**不支持函数写法** 。
- 也就意味着我们使用Getter辅助函数，getter不能返回一个方法。

~~~javascript
   getters: {
        mylist: (state)=>state.list.filter((item)=>{return item > 2}),
        //现在我们有个需求，我们返回一个方法，调用这个方法传入一个参数，可以得到与list数组索引对应的值。
        mylist1: (state)=>(id)=>{
            return state.list.find((item,index)=>index === id);
        },
        mylist2(state) {
            return function(id){
                return state.list.find((item, index)=>index === id)
            }
        },
        mylist3: (state,getters)=> getters.mylist.toString() + '哈哈哈'

    }
    //数组形式
  computed: mapGetters(['mylist','mylist1'])  
  -------------------------
  此时mylist1计算属性在页面上被渲染成为一个函数。
~~~

- 如果你想将一个 getter 属性另取一个名字，使用对象形式：

~~~
    computed: mapGetters({
        myform: 'mylist',
        myform1: 'mylist1'
    })
~~~

- 与mapState函数的原理一样。也可以通过扩展运算符混入组件中原有的computed计算属性

### Mutation

- Mutation译为突变，变化。
- 我们已经知道如何在组件中去访问vuex中存储的状态，但是我们如何修改vuex中的状态呢？更改 Vuex 的 store 中的状态的**唯一方法是提交 mutation**。
- Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
- 我们如何去触发mutation里面的回调函数呢？我们可以通过**store.commit** 方法，我们需要mutation的**type** 传递进去，把让它根据mutation的type，来调用我们相应mutation的回调函数。

~~~javascript
    //我们希望给state的list数组添加一个新元素
    mutations: {
    //addListEl对应了mutations的type属性，第一个参数会把state自动传入，第二个参数是提交过来的载荷（参数）
        addListEl(state, newEl) {
            state.list.push(newEl)
        }
    }
    //我们不能直接去调用addListEl这个mutations，我们需要发起一个提交。
    //当调用addlist方法的时候，去发起这个提交。
    //我们需要把相应的 mutations的type属性给它，已经需要新增的数据（官方称为载荷--Payload）
     methods: {
      addlist() {
          this.$store.commit('addListEl',5);
          alert(this.$store.state.list)
      } 
    }
~~~

- 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

~~~
  mutations: {
        addListEl(state, payLoad) {
            state.list.push(payLoad.newEl)
        },
        
    }
 -------------------------------------
 methods: {
      addlist() {
          this.$store.commit('addListEl',{
              newEl: 8
          });
          alert(this.$store.state.list)
      } 
    },
~~~

- 我们还可以使用对象风格的提交方式

~~~
  mutations: {
        addListEl(state, payLoad) {
            state.list.push(payLoad.newEl)
        },
    }
 -------------------------------------
 methods: {
      addlist() {
          this.$store.commit({
			type: 'addListEl',
			newEl: 8
		});
          alert(this.$store.state.list)
      } 
    },
~~~

#### 使用mutat需遵守 Vue 的响应规则

- 既然 Vuex 的 **store 中的状态是响应式**的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

  1. 最好提前在你的 store 中初始化好所有所需属性。

  2. 当需要在对象上添加新属性时，你应该

     - 使用 `Vue.set(obj, 'newProp', 123)`, 或者
     - 以新对象替换老对象。利用对象的展开运算符

     ~~~
     state.obj = { ...state.obj, newProp: 123 }
     ~~~

#### Mutation 必须是同步函数

#### Mutation辅助函数

- 不太理解

### Action

- 用mutation只能做到同步变更，而action则用于实现异步变更。
- 我们先实现一个action ，**Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象**，因此你**可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters**。当我们在之后介绍到 [Modules](https://vuex.vuejs.org/zh/guide/modules.html) 时，你就知道 context 对象为什么不是 store 实例本身了。

~~~
//在这个actions，我们通过context，提交了一个mutations
actions: {
        addListEl (context) {
            context.commit('addListEl');
        }
    }
~~~

- 我们如何在组件（实例）触发actions？我们**通过store.dispatch触发。dispatch的意思就为分派**。

~~~
 this.$store.dispatch('addListEl');
~~~

- 乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 **mutation 必须同步执行**这个限制么？Action 就不受约束！我们可以在 action 内部执行**异步**操作：
- Actions 支持同样的载荷方式和对象方式进行分发。

~~~
this.$store.dispatch('addListEl',{
  amount: 10
});
~~~

#### 实际的actions案例

- 我们先实现一个action ，它基于之前所看到的state 和mutation 。这个action 会使用fetchAPI 来向服务器发送请求，以检查是否有新的悄息，然后再把新消息追加到message 数组的末尾。

~~~
actions: {
        getMessage(content){
            fetch('/api/new-messages').then((res)=>res.json()).then((data)=>{
                if(data.messages.length){
                    content.commit('addMessages', data.messages)
                }
            })
        }
    }
~~~

- 这个例子中有两处新事物：首先是一个名为addMessages 的mutation ，它与add阴essage
  类似，不过可以一次性追加多条消息；然后是名为getMessages 的action, 它 检查服务
  器上的新消息，井且如果存在，则 调用addMessages 并传入这些新消息。

#### Action 辅助函数

- 你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用。
- 不太理解

#### 参数解构

- 在action中使用参数解构是一种相当标准的做法，以代替对context 对象的引用

~~~
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
~~~

#### 如何判断Action中的异步请求完成

- action是异步函数，我们怎么知道它们已经完成了呢？可以观察计算属性的改变，但这不够理想。
- 其实可以在action中返回一个promise对象来代替上述做告。另外，调用dispatch 也会返回一个promise对象，运用它就可以在action 运行结束时去运行其他代码。

~~~javascript
getMessage({ commit }) {
            return fetch('./api/new-message')
            .then((res)=>res.json())
            .then(data=>{
                if(data.messages.length) {
                    commit('addMessages', data.messages);
                }
            });
        }
~~~

- 我们可以利用asnyc和await，我们可以如下组合action:

~~~javascript
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
~~~
### module
- 鉴于你已经知道了如何在vuex s tore 中存储数据，也知道了如何修改数据，现在来谈谈
  如何组织store。
- 在较小的应用中，目前为止你所看到的组织方蓓一一即在单一的文件中维护应用中所有的state 、getter、mutation 以及action一－尚且行之有效。但是在较大型的应用中，就会显得有点杂乱，**因此vuex允许你将你的store拆分到各个模块（module）中**。
- 每个module 都只是一个对象，并且拥有其自身的state 、getter 、mutati on 以及action,通过使用modules 属性即可将它们添加到store 当中
~~~
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
~~~
- 当我们做完上述变动后，此时store的运行方式就发生的变化：
- 1. 首先一个变化是mutation和getter中的state现在**指向的则是该模块的state** ，而非根节点的state（即主store的state），**井且action 当中的context 对象指向的也是module而非store**。在该模块内部所做的处理，都只影响该模块，而不会影响到其他任何模块。在
    getter 中，可以通过其第三个参数rootState 属性来访问根节点状态，而在action 中，则可以通过context 对象的rootState 属性来访问。
- 2. 当你从sto re 中取数据时必须指定从哪个模块取 store.a.state // -> moduleA 的状态
### 文档结构
- 通常，我会乐于将各个模块拆分到其各自的文件中。这会让代码变得更优雅也更有组织性，而且还可以用ES6 的export 语法让模块做到真正的简洁。因此我们把关于消息处理的代码移入一个模块文件，并保存为store/modules/messages.js 。
### 带命名空间的模块
- 在上面我们已经把store单独的抽离到一个模块文件，且命名为message.js。
- 在默认情况下，只有state 是带命名空间的。而模块内部的getter 、mutation 和action 仍然与未做模块拆分时的调用方式完全相同，而且如果被分发的action 同时存在于多个模块中时，则每个模块中的该action 都会被分发。这种特性有其用处，但也是个潜在的隐患。而为整个模块创建命名空间的做越则有可能避免这种隐患的发生。
- export canst namespaced = true;
- 现在要访问getter ，则应在其名称之前指定命名空间的名称。
~~~
computed: {
    unreadFrom(){
        // message 就是定义store的文件名，此时它就是命名空间
        return this.$store.getters['message/unreadFrom'];
    }
}
~~~
- 而触发mutation和分布action时，也是一样的做法----在其名称之前指定命名空间名称：
~~~
store.commit('message/addMessage', newMessage)
store.dispacth('message/getMessage')
~~~
- 同mapState一样，其他3个辅助函数-mapGetters、mapMutations、mapActions------也接受带命名空间的模块名称作为其第一个参数。
那么我们在组件中如何使用它们？
~~~
computed：mapState('message', ['message']),
methods: {
    handleUpdated() {
        this.$store.dispacth('message/getMessages')
    }
}
~~~
### 总结
- 本章，我们介绍了使用vuex来管理复杂应用中的状态，以及vuex中各种各样的概念：
- vuex store是一切事物一－state 、getter、mutation和action一一被存储和访问的
必由之所。
- state是应用中所有数据存放的对象。
-  getter使你能够将通用的逻辑聚合起来，以获取store中的数据。
- mutation用于同步变更store中的数据。
-  action用于异步变更store中的数据。
state 、getter 、mutation和action都有其各自的辅助函数，用于协助你将它们加入组件当中，它们分别是mapState 、mapGetters 、mapMutations 和mapActions 。
最后，还看到了使用模块来切分vuexstore，使其成为一个个包含各自逻辑的代码块。




