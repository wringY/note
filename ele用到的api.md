## ele-mobile 项目里面 我学习到的新的api

- 获取窗口的高度与宽度(不包含工具条与滚动条): window.innerHeight;

- 获取计算机屏幕的高度 window.screen.height

- 将一个HTMLCollection类型转换为数组 Array.from()方法从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。

- vue里面本身带有两个回调函数：

  一个是`Vue.nextTick(callback)`，当数据发生变化，更新后执行回调。

  另一个是`Vue.$nextTick(callback)`，当dom发生变化，更新后执行的回调。

  ~~~
  methods:{
          push:function(){
              this.list.push(11);
              this.nextTick(function(){
                  alert('数据已经更新')
              });
              this.$nextTick(function(){
                  alert('v-for渲染已经完成')
              })
          }
      }
  ~~~

- 为了兼容IE，在chrome使用XMLHttpRequest，在ie中使用ActiveXObject

- getBoundingClientRect()

  getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。

  rectObject.top：元素上边到视窗上边的距离;

  　rectObject.right：元素右边到视窗左边的距离;

  　rectObject.bottom：元素下边到视窗上边的距离;

  　rectObject.left：元素左边到视窗左边的距离;