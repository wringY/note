## Vue组件
### 组件概念
- 组件是一段独立的、代表了**页面的一个部分的代码片段**。它拥有自己的数据、JavaScrirpt脚本，以及样式标签。
- **组件可以包含其他的组件，并且它们之间可以相互通信**。
- 组件可以是按钮或者图标这样很小的元素，也可以是一个更大的元素，比如在整个网站或者整个页面上重复使用的表单。
- 模块化： 是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
- 组件化： 是从UI界面的角度进行划分的；前端的组件化，方便UI组件的重用；
### 组件的优势
- 将代码从页面中分离到组件中的主要优势是，负责页面每一部分的代码都很靠近该组件中的其余代码。因此当你想要知道哪个元素有添加事件监听器，不必再在一堆JavaScript文件中搜索相应的选择器，因为JavaScript代码就在对应的HTML旁边！而且由于组件是独立的，还可以确保组件中的代码不会影响任何其他组件或产生任何副作用。
### 组件基础
- 我们如何自定义组件呢：
- 我们可以在Vue实例对象上的components属性，添加组件。
  需要注意的细节是：组件名myButton在添加到页面上时需要注意格式问题\<my-button\>\</my-button\>
- **template是组件中的必备属性**,在template中可以使用指令。
- template属性必须有一个唯一的根元素。
~~~
//使用Vue实例的components属性，添加组件。
<div id="app">
       <my-button></my-button>
    </div>
<script>
//也可以这么写
//const myButton = {
//    template: '<button>自定义按钮</button>'
//    }
    var app = new Vue({
        el: '#app',
        data: {
    
        },
        components:{
            //myButton
            myButton: {
                template: '<button>自定义按钮</button>'
            }
        }
    });
</script>
~~~
- 全局组件：也可以在Vue构造函数的component方法，添加组件。
  需要注意格式问题，第一个参数是组件名称（以-分隔），第二个参数是个对象。
~~~
<div id="app">
       <my-button></my-button>
</div>
Vue.component('my-button',{
    template: '<button>自定义按钮</button>'
});
~~~
### template属性
- 不止组件中有template属性，在Vue实例中也有template属性。
- 注意：在Vue实例中template的值必须是字符串模板格式。
~~~
var app = new Vue({
    el: '#app',
    //通过name属性可以重命名
    name: 'game',
    //我们完全可以不在html文件中写内容，我们在此使用template属性
    template: `<div id="#app">
        hello World
    </div>`
});
~~~
### 组件中的数据、方法、计算属性
- 组件是可复用的Vue实例，且带有一个名字。那么Vue实例中拥有的东西我们组件也可以具有。
- 注意：组件中的data必须是一个函数。因此每个实例可以维护一份被返回对象的独立的拷贝。
~~~
<div id="app">
  <positive-numbers></positive-numbers>
</div>
<script>
   Vue.component('positive-numbers',{
       template: '<p>有{{getPositive.length}}个整数</p>',
       data() {
           return {
               numbers: [-4,-3,1,2,5,6,-7]
           }
       },
       computed: {
           getPositive(){
               return this.numbers.filter((number)=>number>=0);
           }
       },
   });
   var app = new Vue({
       el: '#app',
   });
</script>
~~~
- 然后就可以在Vue模板的任何地方， 通过\<positive-numbers\>\</positive-numbers\>标签来使用这个组件。
- 细节分析：
  Vue 实例中的data属性是一个对象，然而组件中的data属性是一个函数。这是因为一个组件可以在同一个页面上被多次引用，我们希望组件的计算属性等其他被共享，但是绝对不希望数据被共享。所以data属性是个函数，返回一个对象。
### component标签

-  Vue提供了 component ,来展示对应名称的组件
-  component 是一个占位符, :is 属性,可以用来指定要展示的组件的名称

### 向组件传递数据 props属性

- 组件很有用，但当你开始传递数据到它内部时，组件才真正地展示出力量。可以使用props属性来传递数据。
- Props是通过HTML属性传入组件的,这个HTML属性是我们自定义的（格式：键=值），我们需要将它放在组件标签中。
- 然后在组件内部使用props属性，这个属性的值就是HTML属性中的键，然后在这个组件内部就可以使用this.值，获取到HTML属性中的值。
~~~
<div id="app">
    <!-- color是自定义HTML属性 -->
    <color-show color="red"></color-show>
    <color-show color="green"></color-show>
</div>
<script>
Vue.component('color-show',{
    template: '<div :style="style">1111</div>',
    //props属性中，存储着自定义HTML属性的键值。
    props: ['color'],
    computed: {
        style() {
            //在组件中可以通过this.color获取到自定义HTML属性的值。
            return {backgroundColor: this.color}
        }
    },
});
var app = new Vue({
    el: '#app',
});
~~~
### props验证
- props属性的值可以是一个数组，用来表明组件可以接收的属性的名称。
- props属性的值还可以是一个对象，用来描述属性的信息：如它的类型，是否必须，默认值，以及用于高级验证的自定义验证函数。
- 用来描述属性信息的对象，有着自己的语法要求。属性名：描述对象。
~~~
Vue.component('price-show',{
    //props属性的值是一个对象，用来描述接收属性的信息.
    //如果要检测一个属性的类型，可以传递一个原生的构造函数，或者是我们自定义的构造函数（这个构造函数内部是用instancof操检测）。
    props: {
        price: Number,
        //检测多个类型，用数组。其中Price是我们自定义的构造函数
        unit: [String,Number,Price]
    }
});
~~~
上面的例子只能检测属性的类型，我们通常需要描述属性的其他信息。
- type检测属性的类型，值是构造函数String,Number,Object或者自定义构造函数。
- required该属性是否必须，布尔值。
- default属性的默认值。
- 函数名（value）{},这个函数的参数是prop的值，如果prop有效就返回true，否则就返回false。
~~~
 <script>
    Vue.component('price-show',{
        //props属性的值是一个对象，用来描述接收属性的信息.
        props: {
            price: {
                type: Number,
                required: true,
                validator(value){
                    return value>0
                }
            },
            unit: {
                type: String,
                default: '$'
            }
        }
    });
</script>
~~~
在这个示例中，price是一个必需的prop，如果没有传递值给它，就会抛出警告。unit不是必需的，但是有个默认值\$，如果你没有传入任何值，在组件内this.unit将会等于$。
最后，你可以传递一个验证函数，该函数以prop的值为参数，在prop 有效时应该返回true ，而无效时则返回false。例如下面的例子，验证了price 是否大于零，这样你就不会在无意间为商品设置一个负数的价格。
#### Prop语法形式转换
- 我们可以发现，在HTML中prop我们采用kebab(my-prop)形式，而在组件内部prop我们采用camel形式(this.myProp)。这是因为Vue自己做了处理。我们就可以使用这这种方便的形式。
### 实现组件的响应式
- 你应该已经发现了，对于data对象、方法还有计算属性，当它们的值发生变化时，模板也会更新。同样，props也是这样的。
- 我们只需要在组件标签中把使用v-bind指令将该prop与某个值绑定。那么无论何时只要这个值发生变化，在组件内任何使用该prop的地方都会更新。
- 我们把组件中prop属性的值绑定到Vue实例中data属性的数据上，这样的关系我们称为Vue实例是父级组件。当然父级组件可以是任何组件，包含但不限于Vue实例（因为Vue实例本身也是组件）。
~~~
<div id="app">
    <display-number :number="number"></display-number>
</div>
<script>
    //我们来创建一个组件，这个组件的prop属性是number
    Vue.component('display-number',{
        template: '<p>当前数字是{{number}}</p>',
        props: {
            number: {
                type: Number,
                default: 0
            }
        }
    });
        //然后使用v-bind指令将number与某个值绑定起来
    var app = new Vue({
        el: '#app',
        data: {
            number: 12
        },
        created() {
            setInterval(()=>{
                this.number++
            },1000);
        },
    });
~~~
- 注意事项：
  如果prop的值不是字符串，那么就必须使用v-bind指令。因为HTML属性默认值是字符串，而v-bind会把传入的值当作表达式求值，再传给prop。
### 单向下行绑定和实现双向绑定(.sync)
- 当存在父子组件时，我们数据通过prop从父级组件传递到子组件中，当父级组件中的数据更新时，传递给子组件的prop也会更新。但是你不可以在子组件中修改prop 。这就是所谓的单向下行绑定，防止子组件在无意中改变父级组件的状态。
- 然而我们需要实现双向绑定时，我们可以采用.sync修饰符实现。
- 它只是一个语法糖：语法糖(syntactic sugar)是指编程语言中可以更容易的表达一个操作的语法，它可以使程序员更加容易去使用这门语言：操作可以变得更加清晰、方便，或者更加符合程序员的编程习惯。
  语法糖是语言中的一个构件，当去掉该构件后，并不影响语言的功能和表达能力。简而言之，语法糖是一种便捷写法
- 使用方法也非常简单：
~~~
<display-number :number.sync="number"></display-number>
//上面的代码等价于
<display-number :number="number" @update:number="(val)=>numberToDisplay=val">
所以，如果想要更改父级组件的值，需要触发update:number 事件，该指令的参数一一示例中为number是将要更新的值的名称。
~~~
- 这个this.$emit('update:number',this.number+1);是触发事件，参数应该是事件名，这个写法是什么意思。
  然后这个事件应该在谁身上（父组件）。
- 其次如何定义父子组件关系。
~~~
//定义一个组件，其prop获取一个初始值并且计时更新，同时更新父组件的值。
Vue.component('count-from-number',{
    template: "<span>子{{this.number}}</span>",
    props: {
        number: {
            type: Number,
            required: true
        }
    },
    //mounted:Vue实例生命周期钩子，在元素创建之后触发。
    mounted() {
        //设置一个定时器，让prop属性 number计时加一
        setInterval(()=>{
            //自动触发当前实例上的update事件，同时把 this.number+1 数据传过去
            this.$emit('update:number',this.number+1);
        },1000); 
    },
}); 
~~~
### 自定义输入组件与v-model
- 与.sync修饰符相似，可以在组件上使用v-model 指令来创建自定义输入组件。
~~~
<my-input v-model="number"></my-input>
上面的代码等致于：
<my-input :value="username" @input="value=>username=value"></my-input>
~~~
- 所以，为了创建inputUsername组件，我们需要它做两件事情：首先，它需要通过value属性获取初始值，然后不论何时只要value 的值发生变化，它必须触发一个input事件。在这个例子中，我们要让组件将value的值转化为小写形式，再通过事件将它传递出去。
### 使用插槽（slot）将内容传递给组件
- 除了将数据作为prop传入到组件中，Vue也允许传入HTML，甚至是其他的Vue组件。
- 组件的最大特性就是复用性，而用好插槽能大大提高组件的可复用能力。
- 插槽就是Vue实现的一套内容分发的API，将\<slot>\</slot>元素作为承载分发内容的出口。
- 这句话的意思就是，没有插槽的情况下在组件标签内些一些内容是不起任何作用的，当我在组件中声明了slot元素后，在组件元素内写的内容就会跑到它这里了！
- 传入HTML的时候格式如下：
~~~javascript
#在组件标签中写入内容，如果组件的template属性里面没有<slot></slot>,那么写入的内容无效。
<my-button>sssss</my-button>
Vue.component("my-button",{
    template: "<button><slot></slot></button>",
}
~~~
- 传入其他组件的时候格式如下
~~~
<my-button></my-button>
--------
Vue.component('my-p',{
    template:"<p>我是p</p>"
});
Vue.component("my-button",{
    template: "<button><slot><my-p></my-p></solt></button>"
});
~~~
- 这样可以创建复杂的页面，而不至于让组件的体积变得过于庞大。
- slot可以设置默认内容，当没有在组件标签里面输入内容时，会显示默认内容。
~~~
<my-button>我是输入内容</my-button>
template: "<button><slot>我是默认内容</slot></button>"
~~~
### 具名插槽

- 有时我们需要多个插槽。
- 对于这样的情况，\<slot\> 元素有一个特殊的特性：name。这个特性可以用来定义额外的插槽：
~~~javascript

  <div id="app">
    <base-layout>
       <!-- 2、 通过slot属性来指定, 这个slot的值必须和下面slot组件得name值对应上
				如果没有匹配到 则放到匿名的插槽中   --> 
      <p slot='header'>标题信息</p>
      <p>主要内容1</p>
      <p>主要内容2</p>
      <p slot='footer'>底部信息信息</p>
    </base-layout>

    <base-layout>
      <!-- 注意点：template临时的包裹标签最终不会渲染到页面上     -->  
      <template v-slot:'header'>
        <p>标题信息1</p>
        <p>标题信息2</p>
      </template>
      <p>主要内容1</p>
      <p>主要内容2</p>
      <template v-slot:'footer'>
        <p>底部信息信息1</p>
        <p>底部信息信息2</p>
      </template>
    </base-layout>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      具名插槽
    */
    Vue.component('base-layout', {
      template: `
        <div>
          <header>
			###	1、 使用 <slot> 中的 "name" 属性绑定元素 指定当前插槽的名字
            <slot name='header'></slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
			###  注意点： 
			###  具名插槽的渲染顺序，完全取决于模板，而不是取决于父组件中元素的顺序
            <slot name='footer'></slot>
          </footer>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        
      }
    });
  </script>
</body>
</html>
</div>
~~~
- 一个不带name的\<slot\>出口会带有隐含的名字“default”。
### 作用域插槽

- 说白了就是我在组件上的属性，可以在组件元素内使用！

~~~javascript
    <div id="app">
        <user-data></user-data>
    </div>
    <script>
        Vue.component('user-data',{
            template: '<div><slot>{{user.name}}</solt></div>',
            data() {
                return {
                    user: {
                        name: '张三',
                        age: 18
                    }
                }
            },
        });
~~~
- 我现在想在 \<user-data>\</user-data>元素内去获取user。但是普通情况下我们无法直接访问到user。我们必须做出如下处理。
- 在子级作用域模板中，给\<slot\>插槽做出修改，绑定在\<slot\>元素上的特性被称为插槽prop。

~~~
<div><slot v-bind:user="user">{{user.name}}</solt></div>
~~~
- 我们**在template标签中**需要用v-slot:'名称'='值'，其中名称对应\<slot>的name属性，如果没有就是default，值就是插槽prop,值的名称是自定义的，因为这两者没有必要联系。
- 我们通过v-slot:'名称'='值'，接收到插槽prop，其中可以接受多个插槽prop，以属性的形式保存到我们自定义的值中。
- 现在我们就能够在 \<user-data>\</user-data>元素内去获取user。

~~~javascript
 <div id="app">
     <user-data>
          <template v-slot="data">
                {{data}}
            </template>
              <template v-slot:content="data">
                //我们的data是一个对象，接受到所有的插槽props，都作为属性保存到data对象上。
                    {{data}}
              </template>
        </user-data>   
  </div>
  <script>
      Vue.component('user-data',{
          template: `
         <div>
              <slot :data="user">我是默认内容</slot>
	          //我们可以有多个插槽props。
              <slot :data="user" name="content" :hi="say">我是默认内容</slot>
          </div>
          `,
          data() {
              return {
                  user: {
                      name: '张三',
                      age: 18
                  },
                 say: 'hello'
              }
          },
      }); 
    <script>
~~~
### 组件中自定义事件
- 除了可以处理原生DOM事件，v-on指令也可以处理组件内部触发的自定义事件。
- 自定义事件如何定义：就是按照DOM原生事件的格式，@click="内联语句or方法".
- 如何触发自定义事件：调用this.$emit()函数可以触发一个自定义事件，它接收一个事件名称以及其他任何你想要传递的参数，emit 英文原意： 是触发，调用、发射的意思
- 在组件内部代码中，还可以使用\$on方法来监听组件自身触发的事件。它和任何事件分发器（event dispatcher ）的工作原理几乎相同：当使用\$emit方法触发一个事件，通过\$on方在是添加的事件处理函数就会执行。不过不能使用this.\$on 方法监听子组件触发的事件；如果这么做，可以在组件上使用v-on指令，或者可以使用组件上的ref属性来调用子组件自身的.\$on方法。
- 还有另外两种处理事件的方法：\$once 和\$off 。\$once 的行为和$on 一样，但绑定的监听器只会执行一次一一在事件第一次被触发时；而\$off方法则用于移除一个事件监听器。这两个方法的行为与标准事件触发器(event emitter)里的方陆相似，例如Node.js
  里的EventEmitter模块与jQuery中的.on()、.once()、.off()和.trigger()。
- 由于Vue内置了完整的事件触发器，当你使用Vue时，不需要再引入自己的事件触发器了。甚至在开发Vue组件的局部代码时也可以利用Vue的事件触发器，只需要用newVue()创建一个实例。
- 这在处理基于Vue的代码与非Vue的代码之间的通信时，极为有用一一但总的来说，只要情况允许，vuex往往是更好的选择。
### 组件中的原生事件
- 如果想在组件模板中监听DOM原生事件，我们必须添加.native修饰符,如@click.native。否则事件处理函数不会被调用。
### 通过组件自定义事件实现---子组件向父组件传递数据

- 大概思路，子组件通过$emit可以传递（触发）一个自定义事件，还可以携带参数，然后在**父组件中可以在子组件的标签上监听这个自定义函数**。
- 子组件用`$emit()`触发事件
- `$emit()`  第一个参数为 自定义的事件名称     第二个参数为需要传递的数据
- 父组件用v-on 监听子组件的事件

~~~html

 <div id="app">
    <div :style='{fontSize: fontSize + "px"}'>{{pmsg}}</div>
     <!-- 2 父组件用v-on 监听子组件的事件
		这里 enlarge-text  是从 $emit 中的第一个参数对应   handle 为对应的事件处理函数	
	-->	
    <menu-item :parr='parr' @enlarge-text='handle($event)'></menu-item>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      子组件向父组件传值-携带参数
    */
    
    Vue.component('menu-item', {
      props: ['parr'],
      template: `
        <div>
          <ul>
            <li :key='index' v-for='(item,index) in parr'>{{item}}</li>
          </ul>
			###  1、子组件用$emit()触发事件
			### 第一个参数为 自定义的事件名称   第二个参数为需要传递的数据  
          <button @click='$emit("enlarge-text", 5)'>扩大父组件中字体大小</button>
          <button @click='$emit("enlarge-text", 10)'>扩大父组件中字体大小</button>
        </div>
      `
    });
    var vm = new Vue({
      el: '#app',
      data: {
        pmsg: '父组件中内容',
        parr: ['apple','orange','banana'],
        fontSize: 10
      },
      methods: {
        handle: function(val){
          // 扩大字体大小
          this.fontSize += val;
        }
      }
    });
  </script>
~~~

### 非兄弟组件传值

- 兄弟之间传递数据需要借助于事件中心，通过事件中心传递数据   
  - 提供事件中心    var hub = new Vue()
- 传递数据方，通过一个事件触发hub.$emit(方法名，传递的数据)
- 接收数据方，通过mounted(){} 钩子中  触发hub.$on()方法名
- 销毁事件 通过hub.$off()方法名销毁之后无法进行传递数据

~~~html
<div id="app">
    <div>父组件</div>
    <div>
      <button @click='handle'>销毁事件</button>
    </div>
    <test-tom></test-tom>
    <test-jerry></test-jerry>
  </div>
  <script type="text/javascript" src="js/vue.js"></script>
  <script type="text/javascript">
    /*
      兄弟组件之间数据传递
    */
    //1、 提供事件中心
    var hub = new Vue();

    Vue.component('test-tom', {
      data: function(){
        return {
          num: 0
        }
      },
      template: `
        <div>
          <div>TOM:{{num}}</div>
          <div>
            <button @click='handle'>点击</button>
          </div>
        </div>
      `,
      methods: {
        handle: function(){
          //2、传递数据方，通过一个事件触发hub.$emit(方法名，传递的数据)   触发兄弟组件的事件
          hub.$emit('jerry-event', 2);
        }
      },
      mounted: function() {
       // 3、接收数据方，通过mounted(){} 钩子中  触发hub.$on(方法名
        hub.$on('tom-event', (val) => {
          this.num += val;
        });
      }
    });
    Vue.component('test-jerry', {
      data: function(){
        return {
          num: 0
        }
      },
      template: `
        <div>
          <div>JERRY:{{num}}</div>
          <div>
            <button @click='handle'>点击</button>
          </div>
        </div>
      `,
      methods: {
        handle: function(){
          //2、传递数据方，通过一个事件触发hub.$emit(方法名，传递的数据)   触发兄弟组件的事件
          hub.$emit('tom-event', 1);
        }
      },
      mounted: function() {
        // 3、接收数据方，通过mounted(){} 钩子中  触发hub.$on()方法名
        hub.$on('jerry-event', (val) => {
          this.num += val;
        });
      }
    });
    var vm = new Vue({
      el: '#app',
      data: {
        
      },
      methods: {
        handle: function(){
          //4、销毁事件 通过hub.$off()方法名销毁之后无法进行传递数据  
          hub.$off('tom-event');
          hub.$off('jerry-event');
        }
      }
    });
  </script>
~~~

### 混入 mixin 

- 混入是一种代码组织方式，可以在多个组件间横向复用代码。
#### 混入的应用场合
- 例如，假设你有许多用于显示不同类型用户的组件。虽然大部分显示的信息都依赖于用户的类别，但是组件间相当多的逻辑代码是共同的。有3 种处理方式：可以为所有的组件编写重复的代码（很明显这不是一个好主意）；可以将共同的代码分离到多个函数中，并存储到util 文件里；或者可以使用混入。后两种方式在这个例子中很相似，但是使用混入是一种更加符合Vue习惯的处理方式。
#### 如何实现混入
-  Vue实例中的mixins选项接受一个**混入对象的数组**。
-  这些混入实例对象可以像正常的实例对象一样包含选项，他们将在 Vue.extend() 里最终选择使用相同的选项合并逻辑合并。举例：如果你的混入包含一个钩子而创建组件本身也有一个，两个函数将被调用。
-  Mixin钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
~~~
//这是一个混入对象
var mixin = {
  created: function () { console.log(1) }
}
//把这个混入对象添加到Vue实例中
var vm = new Vue({
  created: function () { console.log(2) },
  mixins: [mixin]
})
// => 1
// => 2
~~~
- 混入对象可以引用几乎任何Vue组件中能用到的东西，就好像它是组件本身的一部分一样。
- 我们也可以使用全局api，Vue.mixin(),参数是一个混入对象。全局注册一个混入，影响注册之后所有创建的每个Vue实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。
#### 混入对象与组件中重复选项的处理
- 如果混入对象和组件间有重复的选项一一比如它们都有一个叫作addUser()的方法或者都有一个created()钩子一一根据它们的类型，Vue 会分别对待。
- 对于生命周期钩子一一诸如Created()和beforeMount()这样的一－Vue 会将它们添加到一个数组中并全部执行：
~~~
<div id="app">
</div>

<script>
    var myMixin = {
        created() {
            console.log('我是mixin中的纪录');
        },
    }    
    var app = new Vue({
        el: '#app',
        data: {
    
        },
        created() {
            console.log('我是组件中的纪录');
        },
      mixins: [myMixin]
    });
</script>
//=>我是mixin中的纪录
//=>我是组件中的纪录
~~~
- 对于重复的方法、计算属性或者其他任何非生命周期钩子属性，组件中的属性会**覆盖**混入对象中的属性。
~~~
var myMixin = {
    methods: {
        log() {
            console.log('我是mixin中的纪录');
        }
    },
}
var app = new Vue({
    el: '#app',
    mixins: [myMixin],
    created() {
        this.log();
    },
  methods: {
      log() {
        console.log('我是组件中的纪录');
      }
  },
});
~~~
- 有时候我们有意使用这种合并方式，但也有时候却是碰巧在不同的地方定义了相同名称的方法，如果它们中的某个方位被覆盖，可能会引发一些问题。
- 只要保证混入对象与使用混入对象组件中不要有相同的方法，计算属性就能避免这个问题。因此，官方的Vue代码风格指南建议对于混入中的私有属性，应该在它们的名称前面添加前缀。
### vue-loader 和 .vue 文件
- 在编写组件时，我们上面将方法不是很方便，特别是处理更加复杂的组件时，肯定不想在组件的template属性中编写大量的HTML代码。
- vue-loader提供了一种方法，可以在.vue文件中以**有条理并且易于理解的语法编写基于单个文件的组件**。
~~~
//在之前我们是这么写的
Vue.component('display-number',{
    template: '<p>当前数字是{{}}</p>',
    props: {
        number: {
            type: Number,
            required: true
        }
    }
}); 
-------- 现在我们这么写
<template>
    <p>当前数字是{{number}}</p>
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
如果将上面的代码保存为my-number.vue,之后可以将其导入到应用中并使用它。
    <div id="app">
        <my-number></my-number>
    </div>
    <script>
        import My-Number from '../component/my-number';
        var app = new Vue({
            el: '#app',
          components: {
            MyNumber 
          }
        });
    </script>
经过webpack 和vue-loader 处理后，上面的代码的执行效果就和之前示例中的displaynumber组件一样。你必须使用预处理器，因为它无法直接在浏览器中工作。
~~~
### 非prop属性
- prop属性，需要在组件内部接收，在组件引用的地方（我称为组件标签）定义。
- 非prop属性是指我们没有在组件内部接收的属性，通常这些非prop属性的作用，是添加到组件的HTML根元素上。
- 比如我们想要给\<display-number\>组件添加一个非prop属性class，我们需要在引用该组件的地方给它添加class即可。
~~~
<display-number class="some-class" :number="4"></display-number>
//以下为输出结果
<p class="some-class">当前数字是4</p>
~~~
- 这适用于任何HTML属性或特性，而不仅仅是calss。
- 如果我们为组件引用和组件模板上设置了同样的属性，大部分属性都会是组件引用上的属性覆盖组件模板上的引用，但是class属性和style会稍微聪明一点，同名的属性会进行合并。
~~~javascript
//组件引用是的非prop属性
<custom-button class="margin-top" style="font-weight:bold; background-color:red">
单击
</custom-button>
//组件模板中的属性
const CustomButton = {
            template: `
            <button class="custom-button" style="color:yellow; background-color:blue">
            <slot></slot>
            </button>
            `
 }
~~~
- class属性会被合并在一起变成 custom-button margin-top，style 属性则会被合并为color：yellow; background-color:red; font-weight:bold;。需要注意的是，组件属性中的background-color样式覆盖掉了内部模板中的background-color样式。
### 组件和V-for
- 当使用v - for指令遍历一个数组或是对象，并且给定的数组或对象改变时，Vue不会再重复生成所有的元素，而是智能地找到需要更改的元素，并且只更改这些元素。例如，如果有一个作为列表元素输出到页面上的数组，在它的末尾添加一个新元素，那么页面上现有的元素将保持不变，同时在末尾，新的元素会被创建。如果数组中间的一个元素改变了，则页面上只有对应的元素会更新。
- 可是，如果你在数组的中间删除或是添加一个元素，Vu e 不会知道该元素对应的是页面上哪一个元素，它会更新从删除或是添加元素的位置到列表结尾之间的每一个元素。对于简单的内容，这也许不是一个问题，但对于复杂的内容和组件，你肯定不希望Vue这么做。
- 使用v-for指令时可以设置一个key属性，通过它可以告诉Vue数组中的每个元素应该与页面上哪个元素相关联，从而删除正确的元素。key属性的值默认为元素在循环时的索引。
- 2.2.0+ 的版本里，**当在组件中使用** v-for 时，key 现在是必须的


### 特殊组件component

- Vue 提供了一个特殊的组件可以
  把其转换为任意的组件：component 组件。只需要将它的is prop 设置为一个组件名或组件定义
  对象，甚至是一个HTML 标签，component 组件就会变为相应的内容.

  ~~~
  <component is="h1">Title</component>
  <component is= "overlay-content-play-turn"/>

  ~~~

- 这个prop 和其他任何prop 一样，因此可以使用v-bind时指令并结合一个JavaScript 表达式来
  动态修改组件。如果使用activeOverlay 属性来做这件事情会怎样呢？有什么方法可以方便地
  为3 个浮层组件名称加上相同的over - content-前缀呢？我们来看一下：

  ~~~
  <component :is="'over-content' + activeOverlay "/>

  ~~~



### 组件过渡动画

- 组件的过渡动画很简单，把需要添加或移出的组件，包裹在transition组件中。我们可以指定组件的mode属性，如out-in、in-out等。

-