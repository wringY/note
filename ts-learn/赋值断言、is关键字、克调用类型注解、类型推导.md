# 明确赋值断言

- TypeScript 2.7 引入了一个新的控制严格性的标记: `--strictPropertyInitialization`
- 它的作用就是保证变量声明和实例属性都会有初始值:

~~~ts
class StrictClass {
    foo: number;
    bar = 'hello';
    baz: boolean; // 属性“baz”没有初始化表达式，且未在构造函数中明确赋值
    constructor() {
        this.foo = 42;
    }
}
~~~

- 这个功能本来是帮助开发者写出更严格的代码的，但是有的时候它并不是开发者的错误，而是不可避免的情况:
  - 该属性本来就可以是 `undefined`，这种情况下添加类型undefined
  - 属性被间接初始化了（例如构造函数中调用一个方法，更改了属性的值）

- 显然编译器没有开发者聪明，我们需要提醒编译器这里并不需要一个初始值，这就需要「明确赋值断言」。

- 明确赋值断言是一项功能，**它允许将`!`放置在实例属性和变量声明之后，来表明此属性已经确定它已经被赋值了**:

~~~ts
let x: number;
initialize();
console.log(x + x); // 在赋值前使用了变量“x”。ts(2454)
function initialize() {
    x = 10;
}
~~~

- 上面的例子就很棘手,我们明明已经间接地赋值了，但是它依然报错，因此我们 `let x!: number` 来修复此问题，同样也可以在表达式中直接使用:

~~~ts
let x: number;
initialize();
console.log(x! + x!); //ok

function initialize() {
    x = 10;
}
~~~

# is 关键字

- 如果你阅读过一些 TypeScript 代码，可能会看到类似于下面这种情况:

~~~ts
export function foo(arg: string): arg is MyType {
    return ...
}
~~~

- 你会好奇 `arg is MyType` 的 `is` 关键字是干什么的?然而 TypeScript 文档中几乎没有体现它的用法.

- 看下面的例子:

~~~ts
function isString(test: any): test is string{
    return typeof test === 'string';
}

function example(foo: number | string){
    if(isString(foo)){
        console.log('it is a string' + foo);
        console.log(foo.length); // string function
    }
}
example('hello world');
~~~

- 其实他的作用就是判断 `test` 是不是 `string` 类型，并根据结果返回 `boolean` 相关类型.
- 到这里肯定有人有疑问了，这不是多此一举吗?直接返回 `boolean` 跟这个有什么区别?
- 把我们把 `test is string` 换成 `boolean` 看看效果:

~~~ts
function isString(test: any): boolean{
  return typeof test === 'string';
}

function example(foo: number | string){
  if(isString(foo)){
      console.log('it is a string' + foo);
      console.log(foo.length); // string function
  }
}
example('hello world');
~~~

- 我们看到直接报错，这是为什么?
- 因为 `is` 为关键字的**「类型谓语」把参数的类型范围缩小了,当使用了 `test is string` 之后,我们通过 `isString(foo) === true` 明确知道其中的参数是 `string`**,而 `boolean` 并没有这个能力,这就是 `is` 关键字存在的意义.

# 可调用类型注解

- 我们已经可以用静态类型注解我们的函数、参数等等，但是假设我们有一个接口，我们如何操作才能让它被注解为可执行的:

~~~ts
interface ToString {
  
}

declare const sometingToString: ToString;

sometingToString() // This expression is not callable. Type 'ToString' has no call signatures.ts(2349)
~~~

- 上述代码会报错，因为表达式是不可调用的。

  我们必须用一种方法让编译器知道这个是可调用的，我们可以这样：

~~~ts
interface ToString {
  (): string
}

declare const sometingToString: ToString;

sometingToString() // ok
~~~

- 那么，当我们想实例化它呢？

~~~ts
interface ToString {
  (): string
}

declare const sometingToString: ToString;

new sometingToString() // 其目标缺少构造签名的 "new" 表达式隐式具有 "any" 类型
~~~

- 上述方法就失灵了，我们可以加上 `new` 来表示此接口可以实例化。

~~~ts
interface ToString {
  new (): string
}

declare const sometingToString: ToString;

new sometingToString() // ok
~~~

