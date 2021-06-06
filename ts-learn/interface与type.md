# interface 和 type的区别

- 在ts中，定义类型由两种方式：接口（interface）和类型别名（type alias）

- 首先，interface只能表示function，object和class类型，**type除了这些类型还可以表示其他类型**，例如
~~~ts

interface A{name:string;
            add:()=>void;
}
interface B{():void}
 
type C=()=>number;
type D=string;
type E={name:string,age:number}
~~~
- **interface可以合并同名接口，type不可以**
~~~ts
interface A{name:string}
interface A{age:number}
var x:A={name:'xx',age:20}
~~~

- **interface可以继承interface，继承type，使用extends关键字，type也可继承type，也可继承interface，使用&**
~~~ts
interface A{name:string}
interface B extends A{age:number}
 
type C={sex:string}
 
interface D extends C{name:string}
 
type E={name:string}&C
type F ={age:number}&A
~~~
- **还有类可以实现接口，也可以实现type**
~~~ts
interface A{name:string;add:()=>void}
type B={age:number,add:()=>void}
 
class C implements A{
    name:'xx'
    add(){console.log('类实现接口')}
}
 
class D implements B{
    age:20
    add(){console.log('类实现type')}
}
~~~

## 语法不同

两者都可以用来描述对象或函数的类型，但是语法不同。

- Interface

~~~ts
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}

~~~

- type

~~~ts
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;

~~~

## interface可以定义多次，并将被视为单个接口

- 与类型别名不同，接口可以定义多次，并将被视为单个接口(合并所有声明的成员)。

~~~ts
// These two declarations become:
// interface Point { x: number; y: number; }
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };

~~~

## extends方式不同

- 两者都可以扩展，但是语法又有所不同。此外，请注意接口和类型别名不是互斥的。接口可以扩展类型别名，反之亦然。

- Interface extends interface

~~~ts
interface PartialPointX { x: number; }
interface Point extends PartialPointX { y: number; }

~~~

- Type alias extends type alias

~~~ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

~~~

- Interface extends type alias

~~~ts
type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }
~~~

- ####  Type可以用于更多的类型

- 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组

~~~TS
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;

~~~

## Type可以计算属性，生成映射类型

- type 能使用 in 关键字生成映射类型，但 interface 不行。
- 语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：

- 类型变量 K，它会依次绑定到每个属性。
- 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
- 属性的结果类型。

~~~TS
type Keys = "firstname" | "surname"

type DudeType = {
  [key in Keys]: string
}

const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek"
}

// 报错
//interface DudeType2 {
//  [key in keys]: string
//}

~~~

- ## 我应该如何使用React的Props和State？

- 一般的，你要使用的一致就可以（无论使用类型别名还是interface），就我个人而言，我还是推荐使用*类型别名*：

>- 书写起来更短`type Props = {}`
>- 你的用法是统一的（你不用为了类型交叉而*interface*和*类型别名*混用）

~~~js
// BAD
interface Props extends OwnProps, InjectedProps, StoreProps {}
type OwnProps = {...}
type StoreProps = {...}
// GOOD
type Props = OwnProps & InjectedProps & StoreProps
type OwnProps = {...}
type StoreProps = {...}

~~~

- 你组件公开的*props/state*不能被动态替换（译者注：因为原文作者这里说的 *monkey patched*翻译为动态替换 [what-is-monkey-patching](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F5626193%2Fwhat-is-monkey-patching)），就这个原因，你组件的使用者就不能利用interface的声明合并。对于扩展应该有像HOC这样明确的模式。

  
