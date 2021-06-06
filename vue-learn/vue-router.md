## vue-router

- vue-router的作用：旨在让我们能够在客户端，而非服务端来处理一个应用
  的路由。之前的nodejs项目的开发，都是在服务器端处理路由。
- **后端路由：**对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

早期：通过后端路由返回的资源，来渲染页面，存在性能问题（存在频繁刷新）。后来出现ajax技术（实现局部刷新--无刷新），但是不支持浏览器的前进后端的历史操作。

- **前端路由：**对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；

- 在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由)

- SPA（Single Page Application）单页面应用程序：整个网站只有一个页面，内容的变化通过Ajax局部更新实现、同时支持浏览器地址栏的前进和后退操作SPA实现原理之一：基于URL地址的hash（hash的变化会导致浏览器记录访问历史的变化、但是hash的变化不会触发新的URL请求）在实现SPA过程中，最核心的技术点就是前端路由。

- 如何安装vue-router。

  - 添加如下代码来使用它的一个CDN .

    ~~~
    <script src="https://unpkg.com/vue-router></script>
    ~~~

  - 如果用的是npm ，还可以通过npm install - - sa ve vue - router来安装它

  - 如果用的是诸如webpack 的打包工具，那么就要调用Vue.use(VueRouter）来安装vue-router .

    ~~~
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    Vue.use(VueRouter);
    ~~~

### vue-router的基本使用

- 我们需要明确vue-router的作用就是在客户端处理路由分配资源。
- 既然涉及到路由处理我们可以大概猜出需要有哪些特性：请求方式、请求路径、资源。
- 注意:创建 router 实例，然后传 `routes` 配置,别把单词写错了。routes是路径的意思，routers是路由器的意思
~~~html
  <div id="app">
      <h1>Hello App!</h1>
      <p>
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
          <router-link to="/foo">Go to Foo</router-link>
          <router-link to="/bar">Go to Bar</router-link>
      </p>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
  </div>
  <script>
      // 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
      // 1. 定义 (路由) 组件。
      // 可以从其他文件 import 进来
      const Foo = { template: '<div>foo</div>' }
      const Bar = { template: '<div>bar</div>' }
      // 2. 定义路由
      // 每个路由应该映射一个组件。 其中"component" 可以是
      // 通过 Vue.extend() 创建的组件构造器，
      // 或者，只是一个组件配置对象。
      // 我们晚点再讨论嵌套路由。
      const routes = [
          { path: '/foo', component: Foo },
          { path: '/bar', component: Bar }
      ]
      // 3. 创建 router 实例，然后传 `routes` 配置
      // 你还可以传别的配置参数, 不过先这么简单着吧。
      const router = new VueRouter({
          routes // (缩写) 相当于 routes: routes
      })
      // 4. 创建和挂载根实例。
      // 记得要通过 router 配置参数注入路由，
      // 从而让整个应用都有路由功能
      const app = new Vue({
          router
      }).$mount('#app')
~~~

- 流程整理
  1. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)。在这里使用的是script导入导入Vue和VueRouter。
  2. 定义路由组件，可以从其他文件 import 进来（也就是要显示的内容（资源））
  3. 定义路由：每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。我们晚点再讨论嵌套路由。
  4. 创建 router 实例，然后把我们定义号的路由传`routes` 配置。
  5. 创建和挂载根实例。记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能。
  6. 然后我们就可以在模板中将 \<router-view>\</router-view>放到任何你想让路由所返回的组件被显示的地方。
### vue-router 默认存储路径的方式
- vue-router 默认使用URLhash来存储路径,也就是#号后面的字符串。
- 在这种默认情况下，我们为了访问<你的网站>.com上的about路由，我们需要修改url路径为http://<你的网站>. com/#about。
### HTML5 History 模式
- 如今浏览器都支持HTML5 History Api，这使得开发者无须跳转到一个新的页面就能更新页面的URL。
- 我们如何将路由器的model改为history模式
  在创建router实例时，将配置对象中的mode选项设置为history即可。
~~~javascript
const router = new VueRouter({
  model: 'history',
  routes: [
      {path: '/', component:pageHome },
      {path: '/about', component:pageAbout}
  ]
});
~~~

- 现在如果我们跳转到http://<你的网站>. com/about时，会出现404错误。
- 因为现在我们只是告诉**客户端**代码去观察整个路径，而不是它的hash。
- 我们还需要告诉**服务器**去对每一个它不能识别的请求做出响应，并返回你所依赖的HTML 页面（但请求诸如css 等其他静态文件时则不用）。
### 动态路由
- 我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：
- 比如在nodejs中我们经常会处理这样的路由: (./user/:id),此时id是动态，当我们访问 ./user/123时，此时id就是123，也就是说并不是固定的，其中123可以是任何内容。这样的内容就是动态路由。
- 我们们还可以在导航链接的to属性中拼接查询字符串。
- 在vue-router中我们也可以设置动态路由。

~~~javascript
const router = new VueRouter({
  routes: [
     // 动态路径参数 以冒号开头
      {path: '/user/:userId', component:pageHome },
      {path: '/about', component:pageAbout}
  ]
});
//这样任何匹配/user/:userId的路径都会渲染出pageHome组件。
~~~
### 组件实例中访问当前的路由对象
- 在组件实例中，可以通过使用属性**this.$route**来获取当前的路由对象。
- 这个对象包括了一些有用的属性，诸如当前被访问的完整路径、URL的查询参数（例如：？lang =en)等。
- 其中最有用的属性是：params，它包含了被动态匹配的URL的各个部分。
  例如访问/user/1234,那么parmas就等于 {"userId: 1234"}
~~~
  const pageHome = {
      template: '<p>这是home页</p>',
      data() {
          return {
             ss: this.$route
          }
      },
      created() {
          console.log(this.ss);
      },
  };
~~~
### 响应动态路由变化--导航守卫
- 在/user/1234与/user/5678切换时，其中其中相同的组件会被重用，于是第一章所涉及到的生命周期钩子，诸如mounted ，都不会被调用。
- 提醒一下，当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。
- 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象

~~~javascript
//我们响应动态路由变化，通过beforeRouteUpdate导航守卫，来做一些事情
        //我们可以简单的通过侦听器来监测$route的变化.
        const User = {
            template: '<div>User</div>',
            watch: {
                //这个格式是什么意思，以及to和from这两个参数是什么意思
                '$route' (to, from){
                    console.log(1);
                }
            },
        }   
~~~

- 或者使用 2.2 中引入beforeRouteUpdate 导航守卫（guard ）在**URL动态部分变化时**运行一些代码
~~~javascript
<body>
    
<div id="app">
    <router-view></router-view>
</div>
    <script>
        //通过导航守卫 beforeRouteUpdate 在url动态部分发生变化时做一些事情
        //定义一个组件配置对象，并不是一个组件
        const User = {
            template: '<div>User</div>',
            //这些参数是什么意思，next一定要调用(和中间件很像)。
            beforeRouteUpdate (to, from ,next) {
                console.log(1);
                next();
            }
        }   
        //创建一个router实例，传入一个配置对象，其中model是url的监听模式，默认是监听url.hash;
        //如果是history表示监听整个url。
        const router = new VueRouter( {
            model: 'history',
            routes: [
                {path: '/mm/:id' ,component: User}
            ]
        });
        //挂载到实例上，可以是Vue实例（根实例上）
        let app = new Vue({
            el: '#app',
            router,
        });
    </script>
~~~
### 路由组件传参
#### 使用\$route
- 在组件中我们可以使用\$route.params，但是会使$route与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，也就是这个组件，限定了其灵活性。
~~~javascript
    <div id="app">
       <router-view></router-view>
    </div>
    <script>
        //在组件中使用$route会使组件与路由产生高度的耦合性，导致组件只能在特定URL上使用，限制了组件的灵活性。
        //声明一个组件配置对象
        const User = {
            template: '<div>{{$route.params.id}}<div>',
        }
        //创建一个VueRouter实例
        const router = new VueRouter({
            model: 'history',
            routes: [
                {path: '/mm/:id',component:User}
            ]
        });
        //挂载到根实例（Vue实例）
        const app = new Vue({
            el: '#app',
            router,
        });        
    </script>
~~~
- 这样做的影响: 导致这个组件，只能在特定的url上使用。如果我们想在别的场合使用会出错,因为组件中有\$route.params.id，Vue会对这个js表达式进行解析，如果没有\$route.params.id存在会解析失败。
#### 使用props
- 为了避免组件与路由的耦合，我们可以props进行解耦。
- 此时我们想在组件中获取当前路由中的动态参数，但是又想不受限制的在其他地方使用这个组件。
~~~javascript
    <div id="app">
       <router-view></router-view>
    </div>
    <script>
        //在组件中使用$route会使组件与路由产生高度的耦合性，导致组件只能在特定URL上使用，限制了组件的灵活性。
        //声明一个组件配置对象
        const User = {
            template: '<div>{{$route.params.id}}<div>',
        }
        //创建一个VueRouter实例
        const router = new VueRouter({
            model: 'history',
            routes: [
                {path: '/mm/:id',component:User}
            ]
        });
        //挂载到根实例（Vue实例）
        const app = new Vue({
            el: '#app',
            router,
        });        
    </script>
    <div id="app">
        <router-view></router-view>
    </div>
    <script>
    //此时我们想在组件中获取当前路由中的动态参数，但是又想不受限制的在其他地方使用这个组件
    //我们需要使用prop来接受动态路由参数，需要在动态路由的配置对象上添加 props 为true
    //定义一个组件的配置对象
    const User = {
        props: ['id'],
        template: '<div>User{{id}}</div>'
    }
    //创建一个VueRouter对象
    const router = new VueRouter({
        model: 'history',
        routes: [
            //设置props: true，相当于把动态参数id与匹配路径参数，发送给User组件。此时User组件需要通过props接收，props值就是动态参数的值
            {path: '/mm/:id', component: User, props: true}
        ]
    });
    const app = new Vue({
        el: '#app',
        router,
    });
-------------------------------------------
    <div id="app2">
        <User></User>
    </div>
        //现在我们在其他地方使用User组件，也不会出现解析错误,如果props没有传值则默认是undefined
    const app2 = new Vue({
        el: '#app2',
        components: {
            User: User
        }
    });
~~~
### 嵌套路由
- 实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样URL 中各段动态路径也按某种结构对应嵌套的各层组件。
~~~
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
~~~
- 我们可以使用vue-router使用嵌套路由，就能够很轻松表示上面额关系。
~~~javascript
<div id="app">
    <!-- 这里的<router-view>是最顶层的出口，渲染最高级路由匹配到的组件 -->
    <router-view></router-view>
</div>
<script>
    // 假设有这么一个场景 /user/:id/profile 和 /user/:id/posts 都是嵌套在/user/:id这个路由下面，对于这两个动态的子路由，我们如何使用vue-router表上面的嵌套关系？
// ---------------------------------------------------------------
    //一个被渲染的组件同样可以包含自己的嵌套<router-view>
    //要在这个嵌套的出口中渲染组件，我们需要在VueRouter的参数中使用 children 配置。
    const User = {
        template: `<div></div>
        <router-view></router-view>
        `,
    }
    //创建一个VueRouter实例
    const router = new VueRouter({
        model: 'history',
        //routes中children参数是一个数组，每个元素都是一个路径配置对象
        routes: [
            {path: '/user/:id', component:User,children:[
                //当/user/:id/profile匹配成功时，UserProfile会被渲染到 User组件的<router-view>中
                {path: 'profile', component: UserProfile},
                //当/user/:id/posts匹配成功时，UserPosts会被渲染到 User组件的<router-view>中
                {path: 'posts', component: UserPosts}
            ]}
        ]
    });
    const app = new Vue({
        el: '#app',
        router
    });
</script>
~~~
- 注意事项：要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
### 路由的重定向和别名
#### 重定向 redirect
- 在某些场景下，我们决定把/user/:id/profile修改为/user/:id/pro，就会将一个网页重定向到另一个网页。在这种情况下，你肯定不希望习惯了前往/profile访问的用户看
  到一个错误页面，也不会希望搜索引擎链接到一堆不存在的页面上。
~~~
const router = new VueRouter({
    model: 'history',
    routes: [
        {path: '/profile',redirect: '/pro'}
    ]
});
现在，任何对/profile的访问都会被重定向到/pro.
~~~
#### 别名 alias
- 如果我们想让设置页面从/profile和/pro都可以被访问，我们给/profile起个**别名**/pro。
~~~
const router = new VueRouter({
    model: 'history',
    routes: [
        {path: '/profile',alias: '/pro',component:User}
    ]
});
~~~
- 想让/profile和/pro都指向同一个组件时，路由别名就很有用。
### 链接导航 
- 假如我们希望在不同的路由间切换，除了在地址栏进行修改（这对于用户明显是不适合），还有什么方法呢。
- 在以往我们希望从一个url地址跳转到另一个url地址，此时通过a链接是常用的方法。
- 虽然使用a链接是可以的，但是如果路由器中model设置为history，页面会在每次单击链接后重载，就跟在一个传统的网站里一样没区别（就相当于根本没使用history一样）。
  我们使用history就是希望不要强制刷新页面，而是尽可能从缓存的静态资源获取。
- 在vue-router中现在一切都由客户端掌控，在页面之间导航是可以做到不必重载页面的，路由甚至还会替你更新URL。
- 为此我们使用\<router-link>来代替传统的a链接。
~~~
 <router-link to="/user/1234">前往user#1234</router-link>
~~~
- 单击该链接，它就会直接将你带往/user/1234 ，而无须加载一个新的页面。这大幅度提升了网站性能。只要首页加载完毕，在不同页面之间的导航就会变得飞快，因为所有的HTML、Javascript 以及css 都已经被下载下来了。
- 除了不强制刷新页面的导航控制，vue-router 还能替你自动打理路由模式：**在hash模式下，前面的链接会带你前往#/user/1234，而使用history 模式的话，则会带你去向/user/1234 **。
#### 链接导航其他属性
- \<router-link>除了to以外还有一些属性，在这里列举最重要的几个，完整的属性列表需在API 文档中查看。
##### tag
- 在默认情况下，使用\<router-link>会在页面上渲染出\<a>标签，例如上一个例子的渲染结果就是
~~~
<a herf="/user/1234">前往user#1234</a>
~~~
- 当点击该链接是href属性不会起作用，因为Vue已经在上面添加一个事件监听器，它取消了单击事件产生的处理自身导航的默认行为。尽管如此，出于一些原因，保留它任然不失用处，比如在这个标签悬停就会看到这个链接跳转到哪里，或者能让你在新窗口打开页面（这个vue-router就处理不了）
- 有时候可能会需要渲染除了锚点以外的元素，比如导航栏的列表元素，这时就可以使用tag属性来做到。
~~~
<router-link to="/user/1234" tag="li">前往user#1234</router-link>
-----那么在页面上的渲染结果为----
<li>前往user#1234</li>
//然后Vue会往这个元素添加一个事件监听器，以监测它被单击的时机，从而处理导航.
~~~
- 然而，这还不是最优解一一因为我们就此失去了锚点标签以及它的href属性，同时也失去了几个重要的原生浏览器行为：浏览器这下就不知道这个列表项是一个链接，因此在它上面悬停也就不会给你带来任何关于这个链接的信息：也不能通过鼠标右键在新窗口打开这个链接；还有，一些诸如屏幕阅读器的辅助技术也不会把这个元素认为是一个链接了。
- 为了解决这个问题，可以在\<router-link>元素里面加上锚点标签
~~~
<router-link to="/user/1234" tag="li"><a>前往user#1234</a></router-link>
-----那么在页面上的渲染结果为----
<li><a href="/user/1234">前往user#1234</a></li>
~~~
##### active-class
- 当\<router-link>的to属性的路径与当前页面的路径匹配时，比如to属性的路径是/user/1234，而当前页面的路径就是/user/1234，那么这个链接就被激活了（active）。
- 当链接被撤活时，vue-router 会自动为生成的元素赋予一个类（class）。在默认情况下，这个类是router-link-active ，不过你可以通过使用active-class属性来配置这个类。
- 因为默认的样式太丑了，我们可以使用UI库中提供了样式，或者自己定义的样式。
~~~
//假设我们自己定义了一个样式 myactive，我们希望它替换默认的router-link-active样式。
<router-link to="/user/1234" tag="li" active-class="myactive">前往user#1234</router-link>
~~~
- 注意active-class默认是匹配行为是包容的，如路由地址\<http://localhost:8080>和\<http://localhost:8080/faq>，前一个路由是后一个路由的父级路由，当我们点击后一个路由时，由于该路由地址包含前一个路由地址，所以会导致这两个链接导航的active-class都会生效。我们可以使用exact prop，它是一个布尔值。如果设置其为true ，则仅在当前路径完全匹配时，链接才能获得active class 。所以我们在链接导航上加上这个属性即可。

##### linkActiveClass

- 我们还可以全局修改，路由链接导航的高亮样式。
- **在创建路由器的时候，与ruotes有个同级的配置属性linkActiveClass，它有默认值。我们可以修改为自己定义的样式**。

#### 给链接导航添加原生事件

- 链接导航是一个组件，我们学习过组件监听事件，原生事件需要添加.native修饰符。
### 编程式导航
- 除了使用 \<router-link>创建a标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。
- 注意：在Vue实例内部，你可以通过**\$router**访问路由实例。因此你可以调用 this.$router.push。
- 这些方法效仿浏览器原生的history方法一一－如histoty.pushState（）、history.replaceState()以及history.go。
- router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。当你点击 \<router-link> 时，这个方法会在内部调用，**所以说，点击 \<router-link :to="..."> 等同于调用 router.push(...)**
~~~html
<div id="app">
    <!-- 当点击这个组件时，会调用 handle-->
    <router-view  @click.native="handle"></router-view>
</div>
<script>
    const User = {
        template: '<div>User</div>',
        methods: {
            //也可以在组件实例中，使用this.$router.push。
            //现在我们是在组件的配置对象上，并有有实例化一个组件，但是vue-router会帮我们自动实例化一个组件实例.
            //如果组件实例中的方法与组件根实例的方法名称相同，那么组件实例中的方法会被忽略。
            handle(){
                //导航到/bar这个路由
                console.log(1);
                
                this.$router.push('/bar'); 
            }
        },
    }
    const Bar = {
        template: '<div>Bar</div>'
    }
    const router = new VueRouter({
        model: 'history',
        routes: [
            {path: '/user/:id', component: User},
            {path: '/bar',component:Bar}
        ],
    });
    
    var app = new Vue({
        el: '#app',
        router,
        methods: {
            handle(){
                console.log(2);
                //导航到/bar这个路由
                router.push('/bar'); 
            }
        },
    });
</script>
~~~
- router.replace()与router.push()方法的作用相同，但是有一点区别。
- router.push()会向hi st ory 枝添加一个新的记录一－因此，如果用户按下返回键，路由器就会跳转到上一个路由.而router.replace()则替换了当前的history记录，所以返回键只能让你回到之前的路由。
- router.go()能让你在历史记录中前进和后退，就像按了前进键和后退键。后退一条记录，你就router.go(-1)，而前进10条记录，就用router.go(10)。如果历史中没那么多条记录，函数的调用就会悄悄终止。
### 导航守卫
- 某些情况下的路由，是由限制的。比如某些东西只有用户登录或才能被访问，为了防止游客（未登录）从url中去访问这些需要登录（用户）才能访问的内容。我们应该需要对路由做一些限制。
- vue-router为我们提供了很好的解决方案: vue-router提供了能让你在导航发生之前运行某些代码的功能，并且遵照你的意愿去取消导航或将用户导航至其他地方。
#### 导航守卫的注册方法
##### 全局前置守卫 beforeEach
- 可以使用 router.beforeEach 注册一个全局前置守卫，**也就是给router实例注册router.beforeEach **。
- 当一个导航触发时，**全局前置守卫按照创建顺序调用**。守卫是异步解析执行，**此时导航在所有守卫 resolve 完之前一直处于 等待中**。
~~~
router.beforeEach((to, from, next)=>{
    //我们在这里做一些简单的业务判断，假设被导向的路由以/account开头，然而用户还没登录（一般前端是无法判断用户的登录状态的，通常时后端根据我们cookie里面的数据，来判断用户是否登录，此时我们就假设有一个方法，islogin().
    if(to.path.startsWith('/account') && !islogin()) {
        //此时表示用户没登陆，让其跳转到登录页面
        next('/login');
    } else {
        //表示用户已经登录
        next();
    }
});
~~~
- 注意别忘记调用next(),否则该守卫就永远不会被解析了。
- 参数分析：
    - to: Route: 即将要进入的目标 路由对象.
    - from: Route: 当前导航正要离开的路由.
    - next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数.
        - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
        - next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
        - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
        - ext(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
##### 全局解析守卫 beforeResolve
- 在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，**区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用**。
~~~javascript
// 除了全局前置守卫，我们还可以注册全局解析守卫。
//这个全局解析守卫的调用时机，是在导航确认之前，同时所有组件内守卫和异步路由组件解析之后，解析守卫就会被调用    。
router.beforeResolve((to, from, next)=>
});
~~~
##### 全局后置守卫 afterEach
- 这个钩子只接受两个参数：to 和 from，因此不会影响导航。
~~~
router.afterEach((to, from) => {
  // ...
})
~~~
##### 路由独享守卫 beforeEnter
- 除了在路由器上定义beforeEach 和afterEach 守卫，你还可以对每个单独的路由定义beforeEnter守卫。
- 可以在路由配置上直接定义.
~~~
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
~~~
**beforeEnter守卫与beforeEach 表现完全一致，只不过这种守卫作用于每一个单独的路由而非所有**。
##### 组件内部守卫
- 最后我们可以在组件内部指定守卫，能够使用的守卫有3个：
- beforeRouteEnter（等效于beforeEach）
  不能再这个守卫中获取组件实例this，因为组件实例还没被创建this是undefined。如何解决这个问题？
  我们可以调用next(),并且参数是一个回调函数，这个回调函数会被传入组件实例作为第一个参数，只有在beforeRouteEnter这个守卫中支持该方法，因为别的守卫都能够访问到当前组件的实例对象，因此没必要。
~~~
const User = {
    template: '<div>User</div>',
    beforeRouteEnter(to, from, next) {
        //在渲染该组件的对应路由被 confirm 前调用。
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建.
        //我们可以调用next(),并且参数是一个回调函数，这个回调函数会被传入组件实例作为第一个参数。
        next((vm)=>{
            //通过vm我们可以访问当前组件实例。
        })
    },
}
~~~

- beforeRouteUpdate (2.2 新增)，在路由变化时但，是该组件被复用时调用。
- beforeRouteLeave（在导航离开一个路由时调用）
~~~javascript
 const User = {
    template: '<div>User</div>',
    //beforeRouterEnter守卫与beforeEach作用是等效的。
    beforeRouteEnter(to, from, next) {
        //在渲染该组件的对应路由被 confirm 前调用。
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
    },
    //在当前路由发生变化时，但是该组件被复用时调用
    beforeRouteUpdate(to, from, next) {
    //也就是动态路径参数发生变化时，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    //由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    //可以访问组件实例 `this`
    },
    //导航离开该组件的对应路由时调用
    beforeRouteLeave (to, from, next) {
        //可以访问组件实例 `this`
    }
}
~~~
#### 导航守卫的完整解析流程
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
### vue-router如何匹配路由
- 对于一个路由器实例，里面的routes数组里面的路由。是通过遍历这个数组的方式，并选取其中匹配到当前URL的第一个路由。
- 此时routes数组中的元素的顺序就会有一定的影响。
~~~javascript
//对于一个路由器实例里面的routes，vue-router匹配路由的方式是从遍历这个数组，然后选取到其中匹配到当前url中的第一个路由。
//那么就会出现下面这种情况
const router = new VueRouter({
    model: 'history',
    routes: [
        {path: '/user/:Id', component: User},
        {path: '/user/page', component: Page}
    ]
});
//那么/user/page永远不会被匹配到，对应的组件Page也不会被渲染，因为会被上面的/user/:Id路由中的动态参数匹配到。
//为了解决这个问题，我们通常有个规范，把动态参数路径写在下面，静态路径写在上面，这样就会避免出现这样的问题。
const router = new VueRouter({
    model: 'history',
    routes: [
        {path: '/user/page', component: Page},
        {path: '/user/:Id', component: User}
    ]
});
~~~
#### 404页面
- 根据vue-router会按顺序搜索路由直到与通配符（*）匹配的特点，来渲染一个显示错误页面。
- 如何没有匹配到任何路由，我们可以利用通配符  * 给出一个404页面。
~~~
const router = new VueRouter({
    model: 'history',
    routes: [
        {path: '/user/page', component: Page},
        {path: '/user/:Id', component: User},
        {path: '*', component: PageNotFound}
    ]
});
~~~
- 如果此时用户发送了一个导航，但是匹配不到任何指定的路由，此时我们就利用通配符 * 来渲染一个PageNotFound组件。
- 对于嵌套路由，如果没有匹配到子路由，则路由器会继续往下对其父路由之外的路由列表进行搜寻。对于匹配不到的路由我们都希望返回用一个PageNotFount组件。
~~~
const router = new VueRouter({
    model: 'history',
    routes: [
        {
            path: '/settings',
            component: PageSettings,
            children: [
                { 
                    path: '/profile',
                    component: PageSettingProfile
                 },
                 {
                     path: '*',
                     component: PageNotFount
                 }
            ]
        },
        {
            path: '*',
            component: PageNotFount
        }
    ]
});
~~~
- 现在如果导航是/settings/hhhh 与 /ggggg,此时都匹配不到路由。都会显示同一个PageNotFount组件。
### 路由的元信息 meta
- 当我们在守卫中一个个去检查路径，会让程序变得冗长且使人迷惑，特别是当你维护的是一个拥有大量路由的网站时。
- 我们可以在路由上添加meta特性字段。
~~~
const router = new VueRouter({
    model: 'history',
    routes: [
        {
            path: '/foo',
            component: Foo,
            children: [
                {
                    path: '/bar',
                    component: Bar,
                    //设置一个meta字段
                    meta: { requiresAuth: true }
                }
            ]
        }
    ]
});
~~~
#### 如何访问meta字段
- 首先，我们称呼 **routes** 配置中的**每个路由对象为 -----路由记录**
- 路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录。
- 例如，根据上面的路由配置，/foo/bar 这个 URL **将会匹配父路由记录以及子路由记录**。
- 一个路由匹配到的所有路由记录会暴露为 \$route 对象 (还有在导航守卫中的路由对象) 的 \$route.matched 数组。
- 因此，我们需要遍历 \$route.matched 来检查路由记录中的 meta 字段.
~~~
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
~~~
- 在使用嵌套路由中to.meta是指向子路由，to.matched是包含了匹配到的所有的路由对象。
- 我们就可以遍历to.matched。

### 路由命名
- 有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。
~~~
<script>
    //我们可以给路由起个名字，来方便我们使用
    const router = new VueRouter({
        model: 'history',
        routes: [
            {
                path: '/user/:userId',
                component: Foo,
                name: 'user'
            }
        ]
    });
</script>
~~~
- 方便在哪使用呢？
- 要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
~~~
 <router-link :to="{name: 'user', params: {userId: 1234}}">
~~~
- 这跟代码调用 router.push() 是一回事：
~~~
router.push({ name: 'user', params: { userId: 123 }})
~~~
- 这两种方式都会把路由导航到 /user/123 路径
### 命名视图
- 什么是视图：就是\<router-view>\</router-view>,一个路由默认使用一个视图，一个视图默认一个组件去渲染。
- 当然一个路由可以有多个视图，既然有多个视图，那么就需要有多个组件。在多个视图和组件的情况下，如何规定：视图与组件的对应关系呢？
- 我们可以使用name属性，如果一个组件没有name属性，那么就是default。
- 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)。
~~~
<div id="app">
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
    <router-view name="c"></router-view>
    <router-view ></router-view>
</div>
<script>
    const router = new VueRouter({
        model: 'history',
        routes: [
            {
                path: '/user',
                components: {
                    a: FooA,
                    b: FooB,
                    c: FooC,
                    default: Foo
                }
            }
        ]
    });
</script>
~~~
#### 嵌套命名视图
- 我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 router-view 组件。
- 我们以一个设置面板为例。
~~~
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
~~~
- 这是一个UserSettings视图组件的示意图。其中NAV是一个常规组件，UserEmailsSubscriptions，UserProfile ，UserProfilePreview是嵌套视图组件，那么UserSettings组件的template属性大致应该这些写：
~~~
//这是UserSettings组件的template属性
<div>
    <h1>UserSettings</h1>
    <NAV></NAV>
    <router-view />
    <router-view name=helper>
</div>
~~~
- 对应的路由配置应该是这样的
~~~
const router = new VueRouter({
    model: 'history',
    routes: [
        {
            path: '/settings',
            component: UserSettings,
            children: [
                {
                    path: '/emails',
                    component: UserEmailsSubscriptions
                },
                {
                    path: '/profile',
                    components: {
                        default: UserProfile,
                        helper: UserProfilePreview
                    }
                }
            ]
        }
    ]
});
~~~
### 为路由视图添加动画效果

- 有时候我们希望切换组件的时候，有些过渡效果，可以通过transition组件把路由视图组件包裹起来。
- 然后为其设置组件进入和离开样式。

