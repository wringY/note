# TypeScript

- [TypeScript](http://www.typescriptlang.org/) 是 JavaScript 的一个超集，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上。
- TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

## TypeScript的优缺点

- TypeScript 增加了代码的可读性和可维护性
  - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
  - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
  - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
- TypeScript 非常包容
  - TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可
  - 即使不显式的定义类型，也能够自动做出[类型推论]()
  - 可以定义从简单到复杂的几乎一切类型
  - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
  - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
- TypeScript 的缺点
  - 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
  - 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
  - 集成到构建流程需要一些工作量
  - 可能和一些库结合的不是很完美

## 安装 TypeScript

- TypeScript 的命令行工具安装方法如下

~~~
npm install -g typescript
~~~

- 以上命令会在全局环境下安装 `tsc` 命令，安装完成之后，我们就可以在任何地方执行 `tsc` 命令了。
- 编译一个 TypeScript 文件很简单：

~~~
tsc hello.ts
~~~

- 我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx` 为后缀。

### 编辑器

- TypeScript 最大的优势便是增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等。
- 主流的编辑器都支持 TypeScript，这里我推荐使用 [Visual Studio Code](https://code.visualstudio.com/)。
- 它是一款开源，跨终端的轻量级编辑器，内置了 TypeScript 支持。另外它本身也是[用 TypeScript 编写的](https://github.com/Microsoft/vscode/)

### Hello TypeScript

- 代码复制到 `hello.ts` 中：

~~~typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
~~~

- 然后执行   tsc hello.ts
- 这时候会生成一个编译好的文件 `hello.js`

~~~typescript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
~~~

- TypeScript 中，使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

  上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。但是编译为 js 之后，并没有什么检查的代码被插入进来。

- TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

- **TypeScript 编译的时候即使报错了，还是会生成编译结果**，我们仍然可以使用这个编译之后的文件

- 如果要在报错的时候终止 js 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可。关于 `tsconfig.json`，请参阅[官方手册](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)）

## TS的语法规范

### 基本数据类型

#### 布尔值

- 布尔值，布尔值是最基础的数据类型，在 TypeScript 中，使用 `boolean` 定义布尔值类型：

~~~typescript
let isDone: boolean = false;

// 编译通过
// 后面约定，未强调编译错误的代码片段，默认为编译通过
~~~

- 注意，使用构造函数 `Boolean` 创造的对象**不是**布尔值：

~~~
let createdByNewBoolean: boolean = new Boolean(1);

// index.ts(1,5): error TS2322: Type 'Boolean' is not assignable to type 'boolean'.
// 后面约定，注释中标出了编译报错的代码片段，表示编译未通过
~~~

- 事实上 `new Boolean()` 返回的是一个 `Boolean` 对象

~~~
let createdByNewBoolean: Boolean = new Boolean(1);
~~~

- 直接调用 `Boolean` 也可以返回一个 `boolean` 类型：
- 在 TypeScript 中，`boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。其他基本类型（除了 `null` 和 `undefined`）一样，不再赘述。

#### 数值

- 使用 `number` 定义数值类型

~~~typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
~~~

- 编译结果

~~~javascript
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infin
~~~

- 其中 `0b1010` 和 `0o744` 是 [ES6 中的二进制和八进制表示法](http://es6.ruanyifeng.com/#docs/number#二进制和八进制表示法)，它们会被编译为十进制数字

#### 字符串

- 使用 `string` 定义字符串类型

~~~
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
~~~

- 编译结果：

~~~
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
~~~

- 其中 ``` 用来定义 [ES6 中的模板字符串](http://es6.ruanyifeng.com/#docs/string#模板字符串)，`${expr}` 用来在模板字符串中嵌入表达式。

#### 空值

- JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数

~~~
function alertName(): void {
    alert('My name is Tom');
}
~~~

- 声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

~~~
let unusable: void = undefined;
~~~

#### Null 和 Undefined

- 在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型

~~~
let u: undefined = undefined;
let n: null = null;
~~~

- `undefined` 类型的变量只能被赋值为 `undefined`，`null` 类型的变量只能被赋值为 `null`
- 与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

~~~
// 这样不会报错
let num: number = undefined;


// 这样也不会报错
let u: undefined;
let num: number = u;
~~~

- 而 `void` 类型的变量不能赋值给 `number` 类型的变量：

~~~
let u: void;
let num: number = u;

// index.ts(2,5): error TS2322: Type 'void' is not assignable to type 'number'.
~~~

## 任意值

- 任意值（Any）用来表示允许赋值为任意类型。

### 什么是任意值类型

- 如果是一个普通类型，在赋值过程中改变类型是不被允许的

~~~javascript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
~~~

- 但如果是 `any` 类型，则允许被赋值为任意类型

~~~typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
~~~

### 任意值的属性和方法

- 在任意值上访问任何属性都是允许的

~~~typescript
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
~~~

- 也允许调用任何方法

~~~javascript
let anyThing: any = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat')
~~~

- 可以认为，**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**

### 未声明类型的变量

- 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

~~~typescript
let something;
something = 'seven';
something = 7;

something.setName('Tom');
~~~

- 等价于

~~~typescript
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
~~~

## 类型推论

- 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

### 什么是类型推论

- 以下代码虽然没有指定类型，但是会在编译的时候报错

~~~javascript
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
~~~

- 事实上，它等价于

~~~javascript
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
~~~

- TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
  - **如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成  `any`  类型而完全不被类型检查**：

~~~javascript
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
~~~

## 联合类型

- 联合类型（Union Types）表示取值可以为多种类型中的一种。

### 简单的例子

~~~typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
--------------------------
let myFavoriteNumber: string | number;
myFavoriteNumber = true;

// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
~~~

- 联合类型使用 `|` 分隔每个类型。

### 访问联合类型的属性或方法

- 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

~~~javascript
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
~~~

- 上段代码中，我们规定了函数的参数something的类型可以为string后者number，规定了函数getLength的返回值的类型是number。
- 上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。
- 访问 `string` 和 `number` 的共有属性是没问题的：

~~~typescript
function getlength(something: strig | number): string {
	return something.toString();
}
~~~

- 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

~~~typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
~~~

- 上例中，第二行的 `myFavoriteNumber` 被推断成了 `string`，访问它的 `length` 属性不会报错。
- 第四行的 `myFavoriteNumber` 被推断成了 `number`，访问它的 `length` 属性时就报错了。

## 对象的类型---接口

- 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

### 什么是接口

- 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
- TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]()以外，也常用于对「对象的形状（Shape）」进行描述。

### 简单的例子

~~~typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
~~~

- 上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。
- 接口一般首字母大写。[有的编程语言中会建议接口的名称加上 `I` 前缀](https://msdn.microsoft.com/en-us/library/8bc1fexb(v=vs.71).aspx)。
- 定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的。

### 可选属性

- 有时我们希望不要完全匹配一个形状，那么可以用可选属性：

~~~typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
~~~

~~~typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
~~~

- 可选属性的含义是: 该属性可以不存在。这时**仍然不允许添加未定义的属性**

~~~typescript
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    //试图添加未定义的属性
    gender: 'male'
};

// examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
~~~

### 任意属性

- 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

~~~typescript
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

- 在上面的代码中，我们定义了一个属性，其键是string类型，其值是任何类型。
- 需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

~~~typescript
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

- 在上面的代码中，我们定义了一个任意属性，其值允许是string，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。
- 另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

### 只读属性

- 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

~~~typescript
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

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
~~~

- 上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。
- ​
- 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**：

~~~typescript
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
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
~~~

- 上例中，报错信息有两处，第一处是在对 `tom` 进行赋值的时候，没有给 `id` 赋值。

  第二处是在给 `tom.id` 赋值的时候，由于它是只读属性，所以报错了。

### 函数类型的接口

- 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
- 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

~~~typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
  }
  let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
~~~

- 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

  ```typescript
  let mySearch: SearchFunc;
  mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  }
  ```

### 类的接口

- TypeScript也能够用它来明确的强制一个类去符合某种契约

~~~typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
~~~

- 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

### 继承接口

- 和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
- 一个接口可以继承多个接口，创建出多个接口的合成接口。

~~~
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
~~~



## 数组的类型

- 在 TypeScript 中，数组类型有多种定义方式，比较灵活。

### 「类型 + 方括号」表示法

- 最简单的方法是使用「类型 + 方括号」来表示数组：

~~~
let fibonacci: number[] = [1, 1, 2, 3, 5];
~~~

- 数组的项中**不允许**出现其他的类型

~~~
let fibonacci: number[] = [1, '1', 2, 3, 5];

// index.ts(1,5): error TS2322: Type '(number | string)[]' is not assignable to type 'number[]'.
//   Type 'number | string' is not assignable to type 'number'.
//     Type 'string' is not assignable to type 'number'.
~~~

- 上例中，`[1, '1', 2, 3, 5]` 的类型被推断为 `(number | string)[]`，这是联合类型和数组的结合。
- 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

~~~typescript
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');

// index.ts(2,16): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
~~~

- 上例中，`push` 方法只允许传入 `number` 类型的参数，但是却传了一个 `string` 类型的参数，所以报错了。

### 数组泛型

- 也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

~~~
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
~~~

### 用接口表示数组

- 接口也可以用来描述数组：

~~~typescript
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
~~~

- `NumberArray` 表示：只要 `index` 的类型是 `number`，那么值的类型必须是 `number`。

### any 在数组中的应用

- 一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型：

~~~typescript
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
~~~

### 类数组

- 类数组（Array-like Object）不是数组类型，比如 `arguments`：只有数组的属性，没有数组的方法

~~~typescript
function sum() {
    let args: number[] = arguments;
}

// index.ts(2,7): error TS2322: Type 'IArguments' is not assignable to type 'number[]'.
//   Property 'push' is missing in type 'IArguments'.
~~~

- 事实上常见的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等

~~~typescript
function sum() {
    let args: IArguments = arguments;
}
~~~

## 函数的类型

### 函数声明

- 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

~~~typescript
function sum(x: number, y: number): number {
    return x + y;
}
~~~

- 注意，**输入多余的（或者少于要求的）参数，是不被允许的**：

### 函数表达式

- 如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

~~~typescript
let mySum = function (x: number, y: number): number {
    return x + y;
};
~~~

- 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

~~~typescript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
~~~

- 注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。
- 在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
- 在 ES6 中，`=>` 叫做箭头函数，应用十分广泛

### 可选参数和默认参数

~~~
function buildName(firstName: string, lastName?: string) {
    return firstName + " " + lastName;
}
~~~

- 可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。
  在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为"Smith"

~~~
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
~~~

- 在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在**调用函数**的时候可以省略
- 也就是说可选参数与末尾的默认参数共享参数类型。

~~~
function buildName(firstName: string, lastName?: string) {
    // ...
}
和
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
共享同样的类型(firstName: string, lastName?: string) => string。 默认参数的默认值消失了，只保留了它是一个可选参数的信息。
~~~

## 泛型

- 在像C#和Java这样的语言中，可以使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
- 泛型指任意类型，如果使用泛型变量需要进行约束
- 不使用泛型

~~~
function identity(arg: number): number {
    return arg;
}
或者，我们使用any类型来定义函数：
function identity(arg: any): any {
    return arg;
}
~~~

### 使用泛型

~~~
因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
function identity<T>(arg: T): T {
    return arg;
}
~~~

我们给identity添加了类型变量`T`。 `T`帮助我们捕获用户传入的类型（比如：`number`），之后我们就可以使用这个类型。 之后我们再次使用了 `T`当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

- 我们把这个版本的`identity`函数叫做泛型，因为它可以适用于多个类型。 不同于使用 `any`，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

~~~
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString"); 
----第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：
let output = identity("myString");  // type of output will be 'string'
~~~

### 使用泛型变量

- 使用泛型创建像`identity`这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。

~~~
如果我们想同时打印出arg的长度。 我们很可能会这样做：
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
~~~

- 如果这么做，编译器会报错说我们使用了arg的.length属性，但是没有地方指明arg具有这个属性。 记住，这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 .length属性的。

  现在假设我们想操作T类型的数组而不直接是T。由于我们操作的是数组，所以.length属性是应该存在的。 我们可以像创建其它数组一样创建这个数组：

~~~
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
你可以这样理解loggingIdentity的类型：泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 T的的类型为number。 这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性。
~~~

- 我们也可以这样实现上面的例子：

~~~
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
~~~

### 泛型函数的类型

- 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

~~~
function identity<T>(arg: T): T {
    return arg;
}
// ts里面 => 左边输入 右边输出
let myIdentity: <T>(arg: T) => T = identity;
~~~

- 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

~~~
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
~~~

### 泛型接口

~~~
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
~~~

### 泛型类

- 泛型类看上去与泛型接口差不多。 泛型类使用（ `<>`）括起泛型类型，跟在类名后面。

~~~
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
~~~

- `GenericNumber`类的使用是十分直观的，并且你可能已经注意到了，没有什么去限制它只能使用`number`类型。 也可以使用字符串或其它更复杂的类型。

~~~
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
~~~

- 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

  我们在[类](https://www.tslang.cn/docs/handbook/classes.html)那节说过，类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

## 类型断言

- 类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 语法

- <类型>值                                  或者                          值 as 类型
- 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。

### 例子

- 将一个联合类型的变量指定为一个更加具体的类型。
- 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

~~~typescript
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
~~~

- 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：

~~~typescript
function getLength(something: string | number): number {
    if (something.length) {
        return something.length;
    } else {
        return something.toString().length;
    }
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// index.ts(3,26): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
~~~

- 上例中，获取 `something.length` 的时候会报错。
- 此时可以使用类型断言，将 `something` 断言成 `string`：

~~~typescript
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
~~~

- 类型断言的用法如上，在需要断言的变量前加上 `<Type>` 即可。
- **类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的**：

~~~typescript
function toBoolean(something: string | number): boolean {
    return <boolean>something;
}

// index.ts(2,10): error TS2352: Type 'string | number' cannot be converted to type 'boolean'.
//   Type 'number' is not comparable to type 'boolean'.
~~~

## 内置对象

- 在typescript中我们可以使用ECMA的内置对象和DOM和BOM的内置对象
- ECMAScript 标准提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp` 等。我们可以在 TypeScript 中将变量定义为这些类型：

~~~typescript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
~~~

- DOM 和 BOM 提供的内置对象有：`Document`、`HTMLElement`、`Event`、`NodeList` 等。
- TypeScript 中会经常用到这些类型：

~~~typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
~~~

### TypeScript 核心库的定义文件

- TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。
- 当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，比如:

~~~typescript
Math.pow(10, '2');

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
~~~

- 上面的例子中，`Math.pow` 必须接受两个 `number` 类型的参数。事实上 `Math.pow` 的类型定义如下：

~~~typescript
interface Math {
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    pow(x: number, y: number): number;
}
~~~

- 再举一个 DOM 中的例子：

~~~typescript
document.addEventListener('click', function(e) {
    console.log(e.targetCurrent);
});

// index.ts(2,17): error TS2339: Property 'targetCurrent' does not exist on type 'MouseEvent'.
~~~

- 上面的例子中，`addEventListener` 方法是在 TypeScript 核心库中定义的：

~~~typescript
interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
    addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
}
~~~

- 所以 `e` 被推断成了 `MouseEvent`，而 `MouseEvent` 是没有 `targetCurrent` 属性的，所以报错了。
- 注意，TypeScript 核心库的定义中不包含 Node.js 部分。

### 用 TypeScript 写 Node.js

- Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

~~~
npm install @types/node --save-dev
~~~

