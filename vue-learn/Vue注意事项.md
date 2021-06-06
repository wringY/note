## Vue的注意事项

### 特殊属性Key

- v-for渲染的列表的结构采用“就地复用”的策略，也就说当数据重新排列数据时，会复用已在页面渲染好的元素，不会移动 DOM 元素来匹配数据项的顺序，这种模式是高效的，改变现有位置的结构的数据即可。
- 其实不只是vue、react中在执行**列表渲染**时也会要求给每个组件添加上key这个属性。
- key 这一特殊属性的用法与其他标准属性一致，所以如果想要对其动态赋值，需要使用v-bind 指令。
- **key的作用主要是为了高效的更新虚拟DOM。**另外vue中在使用**相同标签名元素的过渡切换**时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。


### v-for与v-if

- v-for和v-if不应该一起使用，必要情况下应该替换成computed属性。
- 原因：v-for比v-if优先，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候。

~~~javascript
  <ul>
<li
  v-for="user in users"
  v-if="user.isActive"
  :key="user.id"
>
  {{ user.name }}
</li>
  </ul>
~~~

- 如上情况，即使100个user中之需要使用一个数据，也会循环整个数组。
- 解决方案，使用计算属性

~~~javascript
computed: {
activeUsers: function () {
return this.users.filter(function (user) {
  return user.isActive
})
}
}
<ul>
<li
  v-for="user in activeUsers"
  :key="user.id"
>
{{ user.name }}
</li>
</ul>
~~~

### vue中数组响应式问题

- 在Vue中数组的响应式需要注意: 如果data属性中的数据是一个数组，我们修改这个数组中的某项元素，发现无法触发响应式。当你直接修改了对象属性的值，你会发现，只有数据改了，但是页面内容并没有改变。

~~~html
<body>
    <div id="app">
        {{array[1]}}
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
              //如果我们直接修改array[1]=5，则页面的渲染结果没有变化。
               array:[1,2,3]
            },
        });
    </script>
</body>
~~~

- 因此我们想保持数组数据的响应式，我们应该使用Vue提供的数组变异方法来操作数组元素。
- 变异数组方法即保持数组方法原有功能不变的前提下对其进行功能拓展

| `push()`    | 往数组最后面添加一个元素，成功返回当前数组的长度                 |
| ----------- | ---------------------------------------- |
| `pop()`     | 删除数组的最后一个元素，成功返回删除元素的值                   |
| `shift()`   | 删除数组的第一个元素，成功返回删除元素的值                    |
| `unshift()` | 往数组最前面添加一个元素，成功返回当前数组的长度                 |
| `splice()`  | 有三个参数，第一个是想要删除的元素的下标（必选），第二个是想要删除的个数（必选），第三个是删除 后想要在原位置替换的值 |
| `sort()`    | sort()  使数组按照字符编码默认从小到大排序,成功返回排序后的数组     |
| `reverse()` | reverse()  将数组倒序，成功返回倒序后的数组              |

### 替换数组

- 不会改变原始数组，但总是返回一个新数组

| filter | filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。 |
| ------ | ---------------------------------------- |
| concat | concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组      |
| slice  | slice() 方法可从已有的数组中返回选定的元素。该方法并不会修改数组，而是返回一个子数组 |

### 动态数组响应式数据

- 通过数组索引操作数组元素，如何设置响应式。


- Vue.set(vm.items,indexOfItem,newValue)    让 触发视图重新更新一遍，数据动态起来
- vm.$set((vm.items,indexOfItem,newValue)
  - 参数一：表示要处理的数组名称
  - 参数二：表示要处理的数组元素的索引
  - 参数三：表示要处理的数组元素的新值


~~~html
<body>
    <div id="app">
        {{array[1]}}
        <span @click="handle">点击</span>
    </div>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
               array:[1,2,3]
            },
            methods: {
                handle(){
                app.$set(this.array,1,3)
                  console.log(this.array); 
                }
            },
        });
    </script>
</body>
~~~

