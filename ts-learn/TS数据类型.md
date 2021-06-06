# 原始数据类型
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。
- 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 BigInt。
- 本节主要介绍前五种原始数据类型在 TypeScript 中的应用。
## 布尔值
- 布尔值是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型：
~~~ts
let isDone: boolean = false;
~~~
- 注意，使用**构造函数 Boolean 创造的对象不是布尔值**：
~~~ts
let createdByNewBoolean: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
~~~
- 事实上 new Boolean() 返回的是一个 **Boolean 对象**：
~~~ts
let createdByNewBoolean: Boolean  = new Boolean(1);
~~~
- 直接调用 Boolean 也可以返回一个 boolean 类型：
~~~ts
let isF: boolean = Boolean(1)
~~~
- 在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样，不再赘述。
## Number 类型
~~~ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
// 编译结果
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
~~~
## 字符串
~~~ts
let name: string = "semliker";
let myAge: number = 25;
let sentence: string = `Hello, my name is ${myName}.I'll be ${myAge + 1} years old next month.`;
// 编译结果
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".I'll be " + (myAge + 1) + " years old next month.";
~~~
## Symbol 类型
~~~ts
const sym = Symbol();
let obj = {
  [sym]: "semlinker",
};

console.log(obj[sym]); // semlinker 
~~~
## 空值
- JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
~~~ts
function alertName(): void {
    alert('My name is Tom');
}
~~~
- 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：
## Null 和 Undefined
- 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
~~~ts
let u: undefined = undefined;
let n: null = null;
~~~
- 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量,而 void 类型的变量不能赋值给 number 类型的变量。
- **然而，如果你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。**
## Any 类型
- 在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型（也被称作全局超级类型）。
~~~ts
let notSure: any = 666;
notSure = "semlinker";
notSure = false;
~~~
- any 类型本质上是类型系统的一个逃逸舱。作为开发者，这给了我们很大的自由：TypeScript 允许我们对 any 类型的值执行任何操作，而无需事先执行任何形式的检查。比如：
~~~ts
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
~~~
- 如果我们使用 any 类型，就无法使用 TypeScript 提供的大量的保护机制。为了解决 any 带来的问题，TypeScript 3.0 引入了 unknown 类型。
##  Unknown 类型
- 就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any）。下面我们来看一下 unknown 类型的使用示例：
~~~ts
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
~~~
- 对 value 变量的所有赋值都被认为是类型正确的。但是，当我们尝试将类型为 unknown 的值赋值给其他类型的变量时会发生什么？
~~~ts
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
~~~
- unknown 类型只能被赋值给 any 类型和 unknown 类型本身。直观地说，这是有道理的：只有能够保存任意类型值的容器才能保存 unknown 类型的值。毕竟我们不知道变量 value 中存储了什么类型的值。
- 现在让我们看看当我们尝试对类型为 unknown 的值执行操作时会发生什么。以下是我们在之前 any 章节看过的相同操作：
~~~ts
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
~~~
- 将 value 变量类型设置为 unknown 后，这些操作都不再被认为是类型正确的。通过将 any 类型改变为 unknown 类型，我们已将允许所有更改的默认设置，更改为禁止任何更改。
## Enum 类型
- 使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript 支持数字的和基于字符串的枚举
1. 数字枚举
~~~ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
// 编译结果
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
~~~
- 默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3。
- 当然我们也可以设置 NORTH 的初始值，比如：
~~~ts
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}
~~~
2. 字符串枚举
- 在 TypeScript 2.4 版本，允许我们使用字符串枚举。在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
~~~ts
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
// 编译结果
"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
~~~
- 通过观察数字枚举和字符串枚举的编译结果，我们可以知道数字枚举除了支持 从**成员名称到成员值** 的普通映射之外，它还支持 从**成员值到成员名称 的反向映射**：
~~~ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dirName = Direction[0]; // NORTH
let dirVal = Direction["NORTH"]; // 0
~~~
- 另外，对于纯字符串枚举，我们不能省略任何初始化程序。而数字枚举如果没有显式设置值时，则会使用默认规则进行初始化。
3. 常量枚举
- 除了数字枚举和字符串枚举之外，还有一种特殊的枚举 —— 常量枚举。它是使用 const 关键字修饰的枚举，常量枚举会使用内联语法，不会为枚举类型编译生成任何 JavaScript。为了更好地理解这句话，我们来看一个具体的例子：
~~~ts
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
// 编译结果
"use strict";
var dir = 0 /* NORTH */;
~~~
4. 异构枚举
- 异构枚举的成员值是数字和字符串的混合：
~~~ts
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
// 编译结果
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
~~~
- 通过观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 “反向映射”：
~~~ts
console.log(Enum.A) //输出：0
console.log(Enum[0]) // 输出：A
~~~
## Array 类型
~~~ts
let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
~~~
##  Tuple 类型
- 众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。
- 元组可用于**定义具有有限数量的未命名属性的类型**。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子：
~~~ts
let tupleType: [string, boolean];
tupleType = ["semlinker", true];
~~~
- 在上面代码中，我们定义了一个名为 tupleType 的变量，它的类型是一个类型数组 [string, boolean]，然后我们按照正确的类型依次初始化 tupleType 变量。与数组一样，我们可以通过下标来访问元组中的元素.
- 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
~~~ts
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);

// Argument of type 'true' is not assignable to parameter of type 'string | number'.
~~~
## 类数组
- 类数组（Array-like Object）不是数组类型，比如 arguments：
~~~
function sum() {
    let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
~~~
- arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口:
~~~ts
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
~~~
- 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。
- 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
~~~ts
function sum() {
    let args: IArguments = arguments;
}
~~~
- 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
~~~ts
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
~~~
- 关于内置对象，可以参考内置对象一章。
## 对象的类型——接口
### 接口
- 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
- TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
~~~ts
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
~~~
- 上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致。
- 定义的变量比接口少了一些属性是不允许的、多一些属性也是不允许的：
- 可见，赋值的时候，变量的形状必须和接口的形状保持一致。
#### 可选属性
- 有时我们希望不要完全匹配一个形状，那么可以用可选属性：
~~~ts
interface Person {
    name: string;
    age?: number;
}
~~~
#### 任意属性
- 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
~~~ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
~~~
- **一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：**
~~~ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
~~~
- 上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
- 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
~~~ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
~~~
#### 只读属性
- 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
~~~ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only proper
~~~
- 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
~~~ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only 
~~~
- 上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。
## Never 类型
- never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
~~~ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
~~~
- 在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：
~~~ts
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
~~~
- 注意在 else 分支里面，我们把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：
~~~ts
type Foo = string | number | boolean;
~~~
- 然而他忘记同时修改 controlFlowAnalysisWithNever 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 boolean 类型，导致无法赋值给 never 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保:
controlFlowAnalysisWithNever 方法总是穷尽了 Foo 的所有可能类型。 通过这个示例，我们可以得出一个结论：**使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码**。
## 函数的类型
- 在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）：
- 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单
~~~ts
function sum(x: number, y: number): number {
    return x + y;
}
~~~
- 注意，输入多余的（或者少于要求的）参数，是不被允许的。
- 如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：
~~~ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
~~~
- 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
~~~ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
~~~
- 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。

在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
### 用接口定义函数的形状
~~~ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
~~~
- 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
### 可选参数
- 前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？与接口中的可选属性类似，我们用 ? 表示可选的参数：
~~~ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
~~~
- 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
~~~ts
function buildName(firstName?: string, lastName: string) {
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
~~~
- 可缺省和类型是 undefined 等价呢？

>**答案显而易见：这里的 ?: 表示参数可以缺省、可以不传，也就是说调用函数时，我们可以不显式传入参数。但是，如果我们声明了参数类型为 xxx | undefined（这里使用了联合类型 |，详见 08 讲），就表示函数参数是不可缺省且类型必须是 xxx 或者 undfined。**

### 参数默认值

- 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
~~~ts
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
~~~
- 此时就不受「可选参数必须接在必需参数后面」的限制了：
~~~ts
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
~~~
- **函数的默认参数类型必须是参数类型的子类型**

~~~ts
function log3(x: number | string = 'hello') {

    console.log(x);

}
~~~

- 在上述代码中，函数 log3 的函数参数 x 的类型为可选的联合类型 number | string，但是因为默认参数字符串类型是联合类型 number | string 的子类型，所以 TypeScript 也会检查通过。

### 剩余参数

- ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）,事实上，rest 是一个数组。所以我们可以用数组的类型来定义它：
~~~ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
~~~
###  this

- 众所周知，在 JavaScript 中，函数 this 的指向一直是一个令人头痛的问题。因为 this 的值需要等到函数被调用时才能被确定，更别说通过一些方法还可以改变 this 的指向。也就是说 this 的类型不固定，它取决于执行时的上下文。
- 但是，使用了 TypeScript 后，我们就不用担心这个问题了。通过指定 this 的类型（严格模式下，必须显式指定 this 的类型），当我们错误使用了 this，TypeScript 就会提示我们，如下代码所示：

~~~ts
function say() {

    console.log(this.name); // ts(2683) 'this' implicitly has type 'any' because it does not have a type annotation

}

say();

~~~

- 在上述代码中，如果我们直接调用 say 函数，this 应该指向全局 window 或 global（Node 中）。但是，在 strict 模式下的 TypeScript 中，它会提示 this 的类型是 any，此时就需要我们手动显式指定类型了。
- 那么，在 TypeScript 中，我们应该如何声明 this 的类型呢？在 TypeScript 中，我们只需要在函数的第一个参数中声明 this 指代的对象（即函数被调用的方式）即可，比如最简单的作为对象的方法的 this 指向，如下代码所示：

~~~ts
function say(this: Window, name: string) {

    console.log(this.name);

}

window.say = say;

window.say('hi');

const obj = {

    say

};

obj.say('hi'); // ts(2684) The 'this' context of type '{ say: (this: Window, name: string) => void; }' is not assignable to method's 'this' of type 'Window'.

~~~

- 在上述代码中，我们在 window 对象上增加 say 的属性为函数 say。那么调用`window.say()`时，this 指向即为 window 对象。
- 调用`obj.say()`后，此时 TypeScript 检测到 this 的指向不是 window，于是抛出了如下所示的一个 ts(2684) 错误。
- **需要注意的是，如果我们直接调用 say()，this 实际上应该指向全局变量 window，但是因为 TypeScript 无法确定 say 函数被谁调用，所以将 this 的指向默认为 void，也就提示了一个 ts(2684) 错误。**
- 此时，我们可以通过调用 window.say() 来避免这个错误，这也是一个安全的设计。因为在 JavaScript 的严格模式下，全局作用域函数中 this 的指向是 undefined。
- **同样，定义对象的函数属性时，只要实际调用中 this 的指向与指定的 this 指向不同，TypeScript 就能发现 this 指向的错误，示例代码如下：**

~~~ts
interface Person {

    name: string;

    say(this: Person): void;

}

const person: Person = {

    name: 'captain',

    say() {

        console.log(this.name);

    },

};

const fn = person.say;

fn(); // ts(2684) The 'this' context of type 'void' is not assignable to method's 'this' of type 'Person'

~~~

- **注意：显式注解函数中的 this 类型，它表面上占据了第一个形参的位置，但并不意味着函数真的多了一个参数，因为 TypeScript 转译为 JavaScript 后，“伪形参” this 会被抹掉，这算是 TypeScript 为数不多的特有语法。**
- 同样，我们也可以显式限定类（class 类的介绍详见 06 讲）函数属性中的 this 类型，TypeScript 也能检查出错误的使用方式，如下代码所示：

~~~ts
class Component {

  onClick(this: Component) {}

}

const component = new Component();

interface UI {

  addClickListener(onClick: (this: void) => void): void;

}

const ui: UI = {

  addClickListener() {}

};

ui.addClickListener(new Component().onClick); // ts(2345)

~~~

- 上面示例中，我们定义的 Component 类的 onClick 函数属性（方法）显式指定了 this 类型是 Component，在第 14 行作为入参传递给 ui 的 addClickListener 方法中，它指定的 this 类型是 void，两个 this 类型不匹配，所以抛出了一个 ts(2345) 错误。

### 重载

- 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
- 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。利用联合类型，我们可以这么实现：
~~~ts
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
~~~
- **然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**
- 这时，我们可以使用重载定义多个 reverse 的函数类型：
~~~ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
~~~
- 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
- 注意，**TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面**。

### 可缺省和可推断的返回值类型

- 幸运的是，函数返回值的类型可以在 TypeScript 中被推断出来，即可缺省。

  函数内是一个相对独立的上下文环境，我们可以根据入参对值加工计算，并返回新的值。从类型层面看，我们也可以通过类型推断

  加工计算入参的类型，并返回新的类型，示例如下：

~~~ts
function computeTypes(one: string, two: number) {

  const nums = [two];

  const strs = [one]

  return {

    nums,

    strs

  } // 返回 { nums: number[]; strs: string[] } 的类型 

}

~~~

- **请记住：这是一个很重要也很有意思的特性，函数返回值的类型推断结合泛型（我们会在 10 讲中详细介绍）可以实现特别复杂的类型计算（本质是复杂的类型推断，这里称之为计算是为了表明其复杂性），比如 Redux Model 中 State、Reducer、Effect 类型的关联。**
- 一般情况下，TypeScript 中的函数返回值类型是可以缺省和推断出来的，但是有些特例需要我们显式声明返回值类型，比如 Generator 函数的返回值。

#### Generator 函数的返回值

- ES6 中新增的 Generator 函数在 TypeScript 中也有对应的类型定义。

  Generator 函数返回的是一个 Iterator 迭代器对象，我们可以使用 Generator 的同名接口泛型或者 Iterator 的同名接口泛型（在 10 讲会介绍）表示返回值的类型（Generator 类型继承了 Iterator 类型），示例如下：

~~~ts
type AnyType = boolean;

type AnyReturnType = string;

type AnyNextType = number;

function *gen(): Generator<AnyType, AnyReturnType, AnyNextType> {

  const nextValue = yield true; // nextValue 类型是 number，yield 后必须是 boolean 类型

  return `${nextValue}`; // 必须返回 string 类型

}

~~~



