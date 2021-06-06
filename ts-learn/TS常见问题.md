<!--
 * @Desc: 
 * @Author: wringY
 * @Date: 2021-05-22 11:36:09
 * @LastEditTime: 2021-05-22 23:14:09
 * @FilePath: \undefinedc:\Users\97432\Desktop\react\TS\learn\TS常见问题.md
-->
# ts类型中的?，<>意思是什么？

~~~js
// https://github.com/vuejs/vue/blob/dev/src/core/observer/watcher.js
before: ?Function;
options?: ?Object,
~~~

- 这是ts的interface中的一个概念。ts的interface就是"duck typing"或者"structural subtyping"，类型检查主要关注the shape that values have。因此我们先来熟悉一下interface，再引出?的解释。

~~~ts
deps: Array<Dep>a
newDeps: Array<Dep>
~~~

- ts中的数组类型与java中的定义类似:

~~~ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
~~~

# 什么是duck typing?

- duck test。如果"走路像鸭子，叫声像鸭子，那么这就是鸭子"。在computer programming，用于'判断对象是否可以按照预期的目的使用'。通常的typing中，适用性取决于对象的type。duck typing不一样，对象的适用性取决于**指定method或property的存在与否**，而不是取决于对象自身的类型

# constructor之前的变量定义是什么？

- 列如vnode的定义

~~~ts
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support

  constructor ()
...
}
~~~

- http://www.typescriptlang.org/docs/handbook/classes.html typeScript中的class要比es6的多一项：property。这和java或者c#中的一致。

~~~js
property
constructor
method
~~~

- 实际上es6提供了一种私有变量，仅仅能在class内部访问。

~~~ts
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {    
    this.#height = height;
    this.#width = width;
  }
}
~~~
