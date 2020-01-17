### $emit、$on、v-on

- $emit、$on 只能作用在一一对应的同一个组件实例
- v-on只能作用在父组件引入子组件后的模板上

## $attrs和$listeners

- 直接上代码

~~~vue
## 父组件
<template>
  <div>
    <child
      :firstProps="firstProps"
      :secondProps="secondProps"
    />
  </div>
</template>

<script>
import child from '../components/child'
export default {
  data () {
    return {
      firstProps: 'aaa',
      secondProps: 'bbb'
    }
  },
  components: {
    [child.name]: child
  }
}
</script>

<style>
</style>

## 子组件
<template>
  <div>

  </div>
</template>

<script>
import { create } from 'domain';
import { log } from 'util';
export default {
  name: 'child',
  created () {
    console.log(this.$attrs); // {firstProps: "aaa", secondProps: "bbb"}

  }
}

</script>

<style>
</style>
~~~

- 可以看出，当父组件传递给子组件props时，而子组件内没有显示的定义接收时，此时这些props就会在子组件的$attr中。
- 没有进行接收props的此时就会成为子组件根无素的属性节点。

~~~
// 实际在dom上的表现形式 
<div firstprops="aaa" secondprops="bbb">
  子
</div>
~~~

- inheritAttrs是什么： 字母意思是取消继承。当我们在子组件中添加inheritAttrs：false时，就会发现子组件中$attr还是有数据的，但是在dom的表现形式上发生了变化

~~~
<div>
  子
</div>
~~~

- 所以$attr到底是什么：
  - $attr就是包含了所有父作用域（父级组件）中不被认为 (且不预期为) props 的特性绑定 (class 和 style 除外)。也就是说父级作用域传入了props，但是在子组件中没有接收，不包含class和style。
  - 当一个组件没有声明任何 props 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。
- $attr适用于什么场景呢？适用于三层组件（爷，父，子）及以上的组件嵌套。
- 最有用的情况则是在深层次组件运用的时候，创建第三层孙子组件，作为第二层父组件的子组件，在子组件引入的孙子组件，在模版上把整个 `$attr` 当数作数据传递下去，中间则并不用通过任何方法去手动转换数据。

~~~vue
## 子组件
<template>
  <div>
    子
    <grandson v-bind="$attrs" />
  </div>
</template>

<script>
import { create } from 'domain';
import { log } from 'util';
import grandson from './grandson'
export default {
  name: 'child',
  created () {
    console.log('kk');

    console.log(this.$attrs);

  },
  inheritAttrs: true,
  components: {
    [grandson.name]: grandson
  }
}

</script>

<style>
</style>
## 孙子组件
<template>
  <div>
    孙子
  </div>
</template>

<script>
export default {
  name: 'grandson',
  created () {
    console.log('sunz');
    console.log(this.$attrs);

  }

}
</script>

<style>
</style>
~~~

- 下面来介绍什么是$listeners
- listeners 可以认为是监听者。

- 向下如何传递数据已经了解了，面临的问题是如何向顶层的组件改变数据，父子组件可以通过 v-model，.sync，v-on 等一系列方法，深层及的组件可以通过 `$listeners` 去管理。

- `$listeners` 和 `$attrs` 两者表面层都是一个意思，`$attrs` 是向下传递数据，`$listeners` 是向下传递方法，通过手动去调用 `$listeners` 对象里的方法，原理就是 `$emit` 监听事件，`$listeners` 也可以看成一个包裹监听事件的一个对象。

- 如何传递事件呢

~~~vue
## 我要改变我的思路，其实是父组件给子组件传递事件。子组件来触发这些时间，同时把自己的数据传递过来。从而完成子-父通信。

## 父组件传递了事件，子组件可以在$listner里面取到，同时也可以触发这些事件。同时还可以通过v-on:”$listners“把这些事件传递给下级组件

## 父级
<template>
  <div>
    <child
      :firstProps="firstProps"
      :secondProps="secondProps"
      @changeDate="change"
    />
  </div>
</template>

<script>
import child from '../components/child'
export default {
  data () {
    return {
      firstProps: 'aaa',
      secondProps: 'bbb'
    }
  },
  components: {
    [child.name]: child
  },
  methods: {
    change () {
      console.log('我被触发了');

      this.firstProps = 'ccc'
    }

  }
}
</script>

<style>
</style>
## 子级
<template>
  <div @click="$emit('changeDate')">
    子
    <grandson
      v-bind="$attrs"
      v-on="$listeners"
      @childChan="childChan"
    />
  </div>
</template>

<script>
import { create } from 'domain';
import { log } from 'util';
import grandson from './grandson'
export default {
  name: 'child',
  created () {
    console.log('kk');

    console.log(this.$attrs);
    console.log(this.$listeners);


  },
  methods: {
    childChan () {
      console.log('儿子');
    }
  },
  inheritAttrs: true,
  components: {
    [grandson.name]: grandson
  }
}

</script>

<style>
</style>
## 孙子级
<template>
  <div>
    孙子
  </div>
</template>

<script>
export default {
  name: 'grandson',
  created () {
    console.log('sunz');
    console.log(this.$attrs);
    console.log(this.$listeners);
  }

}
</script>

<style>
</style>
~~~

## $parent和$child

- 在此之前我们需要了解一下组件的简单分类

### 智能组件原理

- 智能组件可以称为第三方通用组件，也可以称之为业务型公用组件，与父组件之间的关系是完全解耦的，只能通过 props 进行数据传递，event 进行事件传递，不依赖于任何环境，只需要传递相应的数据和事件，就能得到你想要的操作。
- 比如props，$attrs等。对于智能组件你永远不知道你将作用于哪个组件之下，这本身就是一个不定因素，特别对于通用组件，这将会暴露各种方法和 props 数据，只有传递数据传递事件去做自己想做的事件，智能组件（也是一个封装模块），会根据传入的数据和事件去做内部封装后所做的事情，而你并不可以轻意的随便改动它。

### 木偶组件原理

- 木偶组件是为了业务页面进行拆分而形成的组件模式。比如一个页面，可以分多个模块，而每一个模块与其余页面并没有公用性，只是纯粹拆分。
- 还有一个方面则是复合组件的联动用法。当一个智能组件是由两个组件组成的一个复合智能组件，而它的子组件与父组件之间就有一个木偶的原理，因为两者是相互的，在开发者调用并需保持它们的关系性、规范性，一旦改变其本身的模式则会无效。
- 对于每一个木偶组件在定义之前，你必然会知道它将作用于哪个页面，在哪一层，都是有一个准确的不变性，取决于你对页面的拆分深度和数量。

- $parent 指向当前组件的父组件，可以拿到父组件的整个实例。前面已经说了，木偶组件可以明确的知道运用在每个 spa 页面对应路由的第几层组件，可能是当前页面的子组件，孙子组件，或者更深的层次。而想和父组件进行通信的话，在不考虑复用的前题下，可以明确如何与父组件进行数据通信或者行为通信。

- 对比一下通过 v-on 和 `$emit` 或者 v-model，.sync 这几种方法，不但方便很多，还更加快捷，并且明确了组件的位置，就像木偶一样，永远不会变，它的父组件永远只会是同一个。

- $children 也是针对于木偶组件的应用，它和`$parent`相反，此 Api是对于一个组件来说，已经明确知道它的子组件，也可能是一个子组件集，准确地拿到想要的子组件实例，或者子组件集实列`$children`可以通过父组件拿到子组件的实例，它是以一个数组的形式包裹。

## 智能组件里面的木偶组件

~~~vue
## 父级组件
<template>
  <div class="hello">
    <accordion :repeat='true'>
      <accordion-item title='vueTitle'>vue</accordion-item>
      <accordion-item title='vue-routerTitle'>vue-router</accordion-item>
      <accordion-item title='vuex-Title'>vuex</accordion-item>
    </accordion>
  </div>
</template>

<script>
import Accordion from '../components/child'
import AccordionItem from '../components/grandson'
export default {
  name: 'hello',
  components: {
    Accordion,
    AccordionItem
  }
}
</script>
可以看出父级组件给子级组件和孙子级组件传递 repeat 和 title
## 子组件
<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['repeat'],
  methods: {
    open (uid) {
      console.log(this.$children);
      this.$children.forEach(item => {
        if (item._uid != uid) {
          item.close = false
        }
      })
    }
  }
}
</script>
## 孙子级组件
<template>
  <div>
    <p @click='handleClick'>{{title}}</p>
    <div v-show='close'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      close: false
    }
  },
  created () {
    if (this.$parent.repeat === true) {
      this.close = true
    }
    // _uid，是当前组件的uid，因为组件被引用三次，所以会触发三次
    console.log(this._uid);

  },
  methods: {
    handleClick () {
      console.log(this._uid);
      // 触发父组件的事件
      this.$parent.open(this._uid)
      this.close = !this.close
    }
  }
}
</script>

~~~

- 分析孙子级组件根据父级的repreat来控制v-show，默认状态是全部展开。
- 同时在组件内部可以通过this._uid来拿到当前组件的uid。在孙子级组件内部触发父级组件的事件

## 中央事件通信（事件中心bus）

- 适用于同级组件。

同级组件通信，也是一种常见的通信模式，在一个大的容器下(父组件)底下有两个平级的组件，两个组件进行数据交或者行为交互，在 Api 的方法里也没有专门的设计。

- 父容器是world，里面两个同级组件tom，jerry

~~~vue
## world 组件
<template>
  <div class="world">
    <P>world</P>
    <Tom />
    <Jerry />
  </div>
</template>

<script>
import Tom from '../components/Tom'
import Jerry from '../components/Jerry'
export default {
  name: 'world',
  components: {
    Tom,
    Jerry
  }
}
</script>
## tom组件
<template>
  <div @click="handleClick">
    TOM
    <div>
      接收到的消息：{{msg}}
    </div>
  </div>

</template>
<script>
// 导入事件中心
import Bus from '../pages/Bus.js'
export default {
  methods: {
    handleClick () {
      Bus.$emit('TomEvent', '你好，我是tom')
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  created () {
    var that = this
    // 在页面加载成功之后我们，监听来自Jerry的事件
    Bus.$on('jerryEvent', (msg) => {
      that.msg = msg
    })
  }
}
</script>
## jerry组件
<template>
  <div @click="handleClick">
    JERRY
    <div>
      接收到的消息：{{msg}}
    </div>
  </div>
</template>

<script>
// 导入事件中心
import Bus from '../pages/Bus.js'
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    handleClick () {
      // 通过Bus.$emit触发一个事件
      Bus.$emit('jerryEvent', '你好，我是jerry')
    }
  },
  created () {
    var that = this
    Bus.$on('TomEvent', (msg) => {
      that.msg = msg
    })
  }
}
</script>


~~~

