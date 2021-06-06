# 编译上下文
- 编译上下文算是一个比较花哨的术语，可以用它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。定义这种逻辑分组，一个比较好的方式是使用 tsconfig.json 文件
- 例如，在项目的根目录下创建一个空 tsonfig.json 文件。通过这种方式，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，它还会包含一部分默认的编译选项。
# TS配置文件
## 编译选项
- 可以通过 compilerOptions 来定制你的编译选项：
~~~js
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
~~~
- 运行 tsc，它会在当前目录或者是父级目录寻找 tsconfig.json 文件。
- 运行 tsc -p ./path-to-project-directory 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。
- 可以使用 tsc -w 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译。
## 指定文件
- 也可以显式指定需要编译的文件
~~~js
{
  "files": [
    "./some/file.ts"
  ]
}
~~~
- 可以使用 include 和 exclude 选项来指定需要包含的文件和排除的文件：
~~~js
{
  "include": [
    "./folder"
  ],
  "exclude": [
    "./folder/**/*.spec.ts",
    "./folder/someSubFolder"
  ]
}
~~~
>
使用 globs：**/* （一个示例用法：some/folder/**/*）意味着匹配所有的文件夹和所有文件（扩展名为 .ts/.tsx，当开启了 allowJs: true 选项时，扩展名可以是 .js/.jsx）
# 声明空间
- 在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。下文将分别讨论这两个概念。
## 类型声明空间
- 类型声明空间包含用来当做类型注解的内容，例如下面的类型声明：
~~~ts
class Foo {}
interface Bar {}
type Bas = {};
~~~
- 你可以将 Foo, Bar, Bas 作为类型注解使用，示例如下：
~~~ts
let foo: Foo;
let bar: Bar;
let bas: Bas;
~~~
- 注意，尽管你定义了 interface Bar，却**并不能够把它作为一个变量来使用，因为它没有定义在变量声明空间中**。
~~~ts
interface Bar {}
const bar = Bar; // Error: "cannot find name 'Bar'"
~~~
- 出现错误提示提示： cannot find name 'Bar' 的原因是名称 Bar 并未定义在变量声明空间。这将带领我们进入下一个主题 -- 变量声明空间。
## 变量声明空间
- 变量声明空间包含可用作变量的内容，**在上文中 Class Foo 提供了一个类型 Foo 到类型声明空间，此外它同样提供了一个变量 Foo 到变量声明空间**，如下所示：
~~~js
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
~~~
- 这很棒，尤其是当你想把一个类来当做变量传递时。
- 与此相似，一些用 var 声明的变量，也只能在变量声明空间使用，不能用作类型注解
~~~ts
const foo = 123;
let bar: foo; // ERROR: "cannot find name 'foo'"
~~~
- 提示 ERROR: "cannot find name 'foo'" 原因是，名称 foo 没有定义在类型声明空间里。
# 模块
## 全局模块
- 在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码
~~~ts
const foo = 123;
~~~
- 如果你在相同的项目里创建了一个新的文件 bar.ts，TypeScript 类型系统将会允许你使用变量 foo，就好像它在全局可用一样：
~~~ts
const bar = foo; // allowed
~~~
- 毋庸置疑，使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。我们推荐使用下文中将要提到的文件模块
- 现在基本都不存在这种情况了，现在的项目都是基于npm的，npm就是依赖于nodejs的模块化机制，一个js文件就是一个模块，所以不同的文件foo.ts与bar.ts 有相同的变量 foo 也不会有冲突。
## 文件模块
- 文件模块也被称为外部模块。如果在**你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域**。因此，我们需要把上文 foo.ts 改成如下方式（注意 export 用法）：
~~~ts
export const foo = 123;
~~~
- 在全局命名空间里，我们不再有 foo，这可以通过创建一个新文件 bar.ts 来证明：
~~~ts
const bar = foo; // ERROR: "cannot find name 'foo'"
~~~
- 如果你想在 bar.ts 里使用来自 foo.ts 的内容，你必须显式地导入它，更新后的 bar.ts 如下所示
~~~ts
import { foo } from './foo';
const bar = foo; // allow
~~~
- 在 bar.ts 文件里使用 import 时，它不仅允许你使用从其他文件导入的内容，还会将此文件 bar.ts 标记为一个模块，文件内定义的声明也不会“污染”全局命名空间
### 文件模块详情
- **澄清：commonjs, amd, es modules, others**
- 首先，我们需要澄清这些模块系统的不一致性。我将会提供给你我当前的建议，以及消除一些你的顾虑。
- 你可以根据不同的 module 选项来把 TypeScript 编译成不同的 JavaScript 模块类型，这有一些你可以忽略的东西：
>
AMD：不要使用它，它仅能在浏览器工作；
SystemJS：这是一个好的实验，已经被 ES 模块替代；
ES 模块：它并没有准备好。
- 怎么书写 TypeScript 模块呢？，这也是一件让人困惑的事。在今天我们应该这么做：推荐使用 ES 模块语法
#### ES 模块语法
- 使用 export 关键字导出一个变量或类型
~~~ts
// foo.ts
export const someVar = 123;
export type someType = {
  foo: string;
};
~~~
- export 的写法除了上面这种，还有另外一种：
~~~ts
// foo.ts
const someVar = 123;
type someType = {
  type: string;
};

export { someVar, someType };
~~~
- 你也可以用重命名变量的方式导出
~~~ts
// foo.ts
const someVar = 123;
export { someVar as aDifferentName };
~~~
- 使用 import 关键字导入一个变量或者是一个类型：
~~~ts
// bar.ts
import { someVar, someType } from './foo';
~~~
- 通过重命名的方式导入变量或者类型：
~~~ts
// bar.ts
import { someVar as aDifferentName } from './foo';
~~~
- 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面
~~~ts
// bar.ts
import * as foo from './foo';
// 你可以使用 `foo.someVar` 和 `foo.someType` 以及其他任何从 `foo` 导出的变量或者类型
~~~
- 只导入模块：
~~~ts
import 'core-js'; // 一个普通的 polyfill 库
~~~
- 从其他模块导入后整体导出：
~~~ts
export * from './foo';
~~~
- 从其他模块导入后，部分导出
~~~ts
export { someVar } from './foo';
~~~
- 通过重命名，部分导出从另一个模块导入的项目：
~~~ts
export { someVar as aDifferentName } from './foo';
~~~
- 还有默认导入、导出
~~~ts
// some var
export default (someVar = 123);

// some function
export default function someFunction() {}

// some class
export default class someClass {}
~~~
- 导入使用 import someName from 'someModule' 语法（你可以根据需要为导入命名）：
~~~ts
import someLocalNameForThisFile from './foo';
~~~
#### 模块路径
>
TIP

如果你需要使用 moduleResolution: node 选项，你应该将此选项放入你的配置文件中。如果你使用了 module: commonjs 选项， moduleResolution: node 将会默认开启。
>
- 这里存在两种截然不同的模块:
    - 相对模块路径（路径以 . 开头，例如：./someFile 或者 ../../someFolder/someFile 等）；
    - 其他动态查找模块（如：core-js，typestyle，react 或者甚至是 react/core 等）。
- 它们的主要区别在于系统如何解析模块。
>
TIP
我将会使用一个概念性术语，place -- 将在提及查找模式后解释它。
- 相对模块路径, 这很简单，仅仅是按照相对路径来就可以了：
- 动态查找:
- 当导入路径不是相对路径时，模块解析将会**模仿 Node 模块解析策略**，下面我将给出一个简单例子：
>
当你使用 import * as foo from 'foo'，将会按如下顺序查找模块：
./node_modules/foo
../node_modules/foo
../../node_modules/foo
直到系统的根目录
当你使用 import * as foo from 'something/foo'，将会按照如下顺序查找内容
./node_modules/something/foo
../node_modules/something/foo
../../node_modules/something/foo
直到系统的根目录
#### 什么是 place
- 当我提及被检查的 place 时，我想表达的是在这个 place 上，TypeScript 将会检查以下内容（例如一个 foo 的 place）：
- 如果这个 place 表示一个文件，如：foo.ts，欢呼！
- 否则，如果这个 place 是一个文件夹，并且存在一个文件 foo/index.ts，欢呼！
- 否则，如果这个 place 是一个文件夹，并且存在一个 foo/package.json 文件，在该文件中指定 types 的文件存在，那么就欢呼！
- 否则，如果这个 place 是一个文件夹，并且存在一个 package.json 文件，在该文件中指定 main 的文件存在，那么就欢呼！
- 从文件类型上来说，我实际上是指 .ts， .d.ts 或者 .js
#### 重写类型的动态查找
- 在你的项目里，你**可以通过 declare module 'somePath' 声明一个全局模块的方式，来解决查找模块路径的问题**。
~~~ts
// global.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number;
}
~~~
- 接着 ：
~~~ts
// anyOtherTsFileInYourProject.ts
import * as foo from 'foo';
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
~~~
####  global.d.ts
- 在上文中，当我们讨论文件模块时，比较了全局变量与文件模块，并且我们推荐使用基于文件的模块，而不是选择污染全局命名空间。
- 然而，如果你的团队里有 TypeScript 初学者，你可以提供他们一个 global.d.ts 文件，用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。
- global.d.ts 是一种扩充 lib.d.ts 很好的方式，如果你需要的话。
# 动态导入表达式
- 动态导入表达式是 ECMAScript 的一个新功能，它允许你在程序的任意位置异步加载一个模块，TC39 JavaScript 委员会有一个提案，目前处于第四阶段，它被称为 import() proposal for JavaScript
- 此外，webpack bundler 有一个 Code Splitting 功能，它能允许你将代码拆分为许多块，这些块在将来可被异步下载。因此，你可以在程序中首先提供一个最小的程序启动包，并在将来异步加载其他模块。
- 这很自然就会让人想到（如果我们工作在 webpack dev 的工作流程中）TypeScript 2.4 dynamic import expressions 将会把你最终生成的 JavaScript 代码自动分割成很多块。但是这似乎并不容易实现，因为它依赖于我们正在使用的 tsconfig.json 配置文件。
- webpack 实现代码分割的方式有两种：使用 import() （首选，ECMAScript 的提案）和 require.ensure() （最后考虑，webpack 具体实现）。因此，我们期望 TypeScript 的输出是保留 import() 语句，而不是将其转化为其他任何代码
- 让我们来看一个例子，在这个例子中，我们演示了如何配置 webpack 和 TypeScript 2.4 +。
- 在下面的代码中，我希望懒加载 moment 库，同时我也希望使用代码分割的功能，这意味 moment 会被分割到一个单独的 JavaScript 文件，当它被使用时，会被异步加载。
~~~ts
import(/* webpackChunkName: "momentjs" */ 'moment')
  .then(moment => {
    // 懒加载的模块拥有所有的类型，并且能够按期工作
    // 类型检查会工作，代码引用也会工作  :100:
    const time = moment().format();
    console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
    console.log(time);
  })
  .catch(err => {
    console.log('Failed to load moment', err);
  });
~~~
- 这是 tsconfig.json 的配置文件：
~~~js
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": [
      "dom",
      "es5",
      "scripthost",
      "es2015.promise"
    ],
    "jsx": "react",
    "declaration": false,
    "sourceMap": true,
    "outDir": "./dist/js",
    "strict": true,
    "moduleResolution": "node",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "types": [
      "node",
      "react",
      "react-dom"
    ]
  }
}
~~~
>
重要的提示

使用 "module": "esnext" 选项：TypeScript 保留 import() 语句，该语句用于 Webpack Code Splitting。
进一步了解有关信息，推荐阅读这篇文章：Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4.
>
# 深入了解TS泛型
- 在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
- 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：类的实例成员、类的方法、函数参数和函数返回值。
## 为什么需要泛型
- 如果我们对一个函数进行TS类型约束
~~~ts
function identity (value: Number) : Number {
  return value;
}

console.log(identity(1)) // 1
~~~
- 这里 identity 的问题是我们将 Number 类型分配给参数和返回类型，使该函数仅可用于该原始类型。但该函数并不是可扩展或通用的，很明显这并不是我们所希望的。这个函数只适用于number类型。
- 我们确实可以把 Number 换成 any，我们失去了定义应该返回哪种类型的能力，并且在这个过程中使编译器失去了类型保护的作用。我们的目标是让 identity 函数可以适用于任何特定的类型，为了实现这个目标，我们可以使用泛型来解决这个问题，具体实现方式如下
~~~ts
function identity <T>(value: T) : T {
  return value;
}

console.log(identity<Number>(1)) // 1
~~~
- 当我们调用 identity<Number>(1) ，Number 类型就像参数 1 一样，它将在出现 T 的任何位置填充该类型。图中** <T> 内部的 T 被称为类型变量**，它是我们希望传递给 identity 函数的类型占位符，同时它被分配给 value 参数用来代替它的类型：此时 T 充当的是类型，而不是特定的 Number 类型。
- 其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：
>
K（Key）：表示对象中的键类型；
V（Value）：表示对象中的值类型；
E（Element）：表示元素类型。
- 类型变量基本都是大写的A-Z
- 除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号
~~~TS
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));
~~~
- 对于上述代码，编译器足够聪明，能够知道我们的参数类型，并将它们赋值给 T 和 U，而不需要开发人员显式指定它们

## 泛型接口
- 泛型其实就一个类型变量（不在是固定的类型），当然可以与接口相结合了
~~~ts
interface Identities<V, M> {
  value: V,
  message: M
}
~~~
- 在上述的 Identities 接口中，我们引入了类型变量 V 和 M，来进一步说明有效的字母都可以用于表示类型变量，之后我们就可以将 Identities 接口作为 identity 函数的返回类
~~~ts
function identity<T, U> (value: T, message: U): Identities<T, U> {
  console.log(value + ": " + typeof (value));
  console.log(message + ": " + typeof (message));
  let identities: Identities<T, U> = {
    value,
    message
  };
  return identities;
}

console.log(identity(68, "Semlinker"));

~~~
## 泛型类
- 泛型与类的配合使用
- 在类中使用泛型也很简单，我们只需要在类名后面，使用 <T, ...> 的语法定义任意多个类型变量
~~~ts
interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getIdentity(): T {
    return this.value
  }

}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>("Semlinker!");
console.log(myStringClass.getIdentity()); // Semlinker!

~~~
- 接下来我们以实例化 myNumberClass 为例，来分析一下其调用过程：
>
在实例化 IdentityClass 对象时，我们传入 Number 类型和构造函数参数值 68；
之后在 IdentityClass 类中，类型变量 T 的值变成 Number 类型；
IdentityClass 类实现了 GenericInterface<T>，而此时 T 表示 Number 类型，因此等价于该类实现了 GenericInterface<Number> 接口；
而对于 GenericInterface<U> 接口来说，类型变量 U 也变成了 Number。这里我有意使用不同的变量名，以表明类型值沿链向上传播，且与变量名无关。
- 在使用 Typescript 的 React 项目中使用了以下约定：
~~~ts
type Props = {
  className?: string
   ...
};

type State = {
  submitted?: bool
   ...
};

class MyComponent extends React.Component<Props, State> {
   ...
}

~~~
- 在以上代码中，我们将泛型与 React 组件一起使用，以确保组件的 props 和 state 是类型安全的。
- 在什么时候需要使用泛型呢？通常在决定是否使用泛型时，我们有以下两个参考标准：
>
当你的函数、接口或类将处理多种数据类型时；
当函数、接口或类在多个地方使用该数据类型时。
## 泛型约束
- 有时我们可能希望**限制每个类型变量接受的类型数量，这就是泛型约束的作用**。下面我们来举几个例子，介绍一下如何使用泛型约束
### 确保属性存在
- 有时候，我们希望类型变量对应的类型上存在某些属性。这时，除非我们显式地将特定属性定义为类型变量，否则编译器不会知道它们的存在。
- 一个很好的例子是在处理字符串或数组时，我们会假设 length 属性是可用的。让我们再次使用 identity 函数并尝试输出参数的长度：
~~~ts
function identity<T>(arg: T): T {
  console.log(arg.length); // Error
  return arg;
}

~~~
- 在这种情况下，编译器将不会知道 T 确实含有 length 属性，尤其是在可以将任何类型赋给类型变量 T 的情况下。我们需要做的就是让类型变量 extends 一个含有我们所需属性的接口，比如这样：
~~~ts
interface Length {
  length: number;
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length); // 可以获取length属性
  return arg;
}

~~~
- T extends Length 用于告诉编译器，我们支持已经实现 Length 接口的任何类型。之后，当我们使用不含有 length 属性的对象作为参数调用 identity 函数时，TypeScript 会提示相关的错误信息：
~~~ts
identity(68); // Error
// Argument of type '68' is not assignable to parameter of type 'Length'.(2345)

~~~
- 此外，我们还可以使用 , 号来分隔多种约束类型，比如：<T extends Length, Type2, Type3>。而对于上述的 length 属性问题来说，如果我们显式地将变量设置为数组类型，也可以解决该问题，具体方式如下：
~~~ts
function identity<T>(arg: T[]): T[] {
   console.log(arg.length);  
   return arg; 
}

// or
function identity<T>(arg: Array<T>): Array<T> {      
  console.log(arg.length);
  return arg; 
}

~~~
### 检查对象上的键是否存在
- 泛型约束的另一个常见的使用场景就是检查对象上的键是否存在。不过在看具体示例之前，我们得来了解一下 keyof 操作符，keyof 操作符是在 TypeScript 2.1 版本引入的，该操作符可以用于获取某种类型的所有键，其返回类型是联合类型。 "耳听为虚，眼见为实"，我们来举个 keyof 的使用示例：
~~~ts
interface Person {
  name: string;
  age: number;
  location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string | number
~~~
- 通过 keyof 操作符，我们就可以获取指定类型的所有键，之后我们就可以结合前面介绍的 extends 约束，即限制输入的属性名包含在 keyof 返回的联合类型中。具体的使用方式如下
~~~ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

~~~
- 在以上的 getProperty 函数中，我们通过 K extends keyof T 确保参数 key 一定是对象中含有的键，这样就不会发生运行时错误。这是一个类型安全的解决方案，与简单调用 let value = obj[key]; 不同。
~~~ts
enum Difficulty {
  Easy,
  Intermediate,
  Hard
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let tsInfo = {
   name: "Typescript",
   supersetOf: "Javascript",
   difficulty: Difficulty.Intermediate
}
 
let difficulty: Difficulty = 
  getProperty(tsInfo, 'difficulty'); // OK

let supersetOf: string = 
  getProperty(tsInfo, 'superset_of'); // Error
~~~
- 很明显通过使用泛型约束，在编译阶段我们就可以提前发现错误，大大提高了程序的健壮性和稳定性
## 泛型参数默认类型
- 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当**使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推断出类型**时，这个默认类型就会起作用。
- 泛型参数默认类型与普通函数默认值类似，对应的语法很简单，即 <T=Default Type>，对应的使用示例如下：
~~~ts
interface A<T=string> {
  name: T;
}

const strA: A = { name: "Semlinker" };
const numB: A<number> = { name: 101 };
~~~
- 泛型参数的默认类型遵循以下规则：
    - **有默认类型的类型参数被认为是可选的**
    - **必选的类型参数不能在可选的类型参数后**
    - 如果类型参数有约束，类型参数的默认类型必须满足这个约束
    - 当指定类型实参时，你只需要指定必选类型参数的类型实参。 未指定的类型参数会被解析为它们的默认类型。
    - 如果指定了默认类型，且类型推断无法选择一个候选类型，那么将使用默认类型作为推断结果。
    - 一个被现有类或接口合并的类或者接口的声明可以为现有类型参数引入默认类型。
    - 一个被现有类或接口合并的类或者接口的声明可以引入新的类型参数，只要它指定了默认类型
## 泛型条件类型
- 在 TypeScript 2.8 中引入了条件类型，使得我们可以根据某些条件得到不同的类型，这里所说的条件是类型兼容性约束。尽管以上代码中使用了 extends 关键字，也不一定要强制满足继承关系，而是**检查是否满足结构兼容性**
- 条件类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一：
~~~ts
T extends U ? X : Y
~~~
- 以上表达式的意思是：若 T 能够赋值给 U，那么类型是 X，否则为 Y。在条件类型表达式中，我们通常还会结合 infer 关键字，实现类型抽取：
~~~ts
interface Dictionary<T = any> {
  [key: string]: T;
}
 
type StrDict = Dictionary<string>

type DictMember<T> = T extends Dictionary<infer V> ? V : never
type StrDictMember = DictMember<StrDict> // string
~~~
- 在上面示例中，当类型 T 满足 T extends Dictionary 约束时，我们会使用 infer 关键字声明了一个类型变量 V，并返回该类型，否则返回 never 类型。
>
在 TypeScript 中，never 类型表示的是那些永不存在的值的类型。 例如， never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
另外，需要注意的是，没有类型是 never 的子类型或可以赋值给 never 类型（除了 never 本身之外）。 即使 any 也不可以赋值给 never
## 泛型工具类型
### typeof
- 在 TypeScript 中，typeof 操作符可以用来获取一个变量声明或对象的类型
~~~ts
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: 'semlinker', age: 30 };
type Sem= typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
~~~
### keyof
- keyof 操作符可以用来一个对象中的所有 key 值：
~~~ts
interface Person {
    name: string;
    age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" 
type K3 = keyof { [x: string]: Person };  // string | number
~~~
### in
~~~ts
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }

~~~
### infer
- 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用
~~~ts
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;
~~~
- 以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用
### extends
- 有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。
~~~ts
interface ILengthwise {
  length: number;
}

function loggingIdentity<T extends ILengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

~~~
### Partial
- Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。
~~~ts
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

~~~
- 在以上代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。
~~~ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter"
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash"
});
~~~
- 在上面的 updateTodo 方法中，我们利用 Partial<T> 工具类型，定义 fieldsToUpdate 的类型为 Partial<Todo>，即：
~~~ts
{
   title?: string | undefined;
   description?: string | undefined;
}

~~~
### Record
- Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
- **定义**
~~~ts
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
~~~
- **示例**
~~~ts
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" }
};
~~~
###  Pick
- Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
- **定义**
~~~ts
interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
  
  type TodoPreview = Pick<Todo, "title" | "completed">;
  
  const todo: TodoPreview = {
    title: "Clean room",
    completed: false
  };
  
~~~
### Exclude
- Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
- **定义**
~~~ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
~~~
- 如果 T 能赋值给 U 类型的话，那么就会返回 never 类型，否则返回 T 类型。最终实现的效果就是将 T 中某些属于 U 的类型移除掉。
~~~ts
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

~~~
### ReturnType
- ReturnType<T> 的作用是用于获取函数 T 的返回类型
- **定义**
~~~ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
~~~
- **示例**
~~~ts
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
type T6 = ReturnType<string>; // Error
type T7 = ReturnType<Function>; // Error
~~~
## 使用泛型来创建对象
- 类型不是变量，无法用类型来创建对象的
- 有时，泛型类可能需要基于**传入的泛型 T 来创建其类型相关的对象**。比如
~~~ts
class FirstClass {
  id: number | undefined;
}

class SecondClass {
  name: string | undefined;
}

class GenericCreator<T> {
  create(): T {
    return new T();
  }
}

const creator1 = new GenericCreator<FirstClass>();
const firstClass: FirstClass = creator1.create();

const creator2 = new GenericCreator<SecondClass>();
const secondClass: SecondClass = creator2.create();
~~~
- 在以上代码中，我们定义了两个普通类和一个泛型类 GenericCreator<T>。在通用的 GenericCreator 泛型类中，我们定义了一个名为 create 的成员方法，该方法会使用 new 关键字来调用传入的实际类型的构造函数，来创建对应的对象。但可惜的是，以上代码并不能正常运行，
- 根据 TypeScript 文档，为了使通用类能够创建 T 类型的对象，我们需要通过**其构造函数来引用 T 类型**。对于上述问题，在介绍具体的解决方案前，我们先来介绍一下构造签名。
### 构造签名
- 在 TypeScript 接口中，你可以使用 new 关键字来描述一个构造函数：
~~~ts
interface Point {
  new (x: number, y: number): Point;
}

~~~
- 以上接口中的 new (x: number, y: number) 我们称之为构造签名，其语法如下：
>
ConstructSignature:  new TypeParametersopt ( ParameterListopt ) TypeAnnotationopt
- 在上述的构造签名中，TypeParametersopt 、ParameterListopt 和 TypeAnnotationopt 分别表示：可选的类型参数、可选的参数列表和可选的类型注解。与该语法相对应的几种常见的使用形式如下：
~~~ts
new C  
new C ( ... )  
new C < ... > ( ... )

~~~
- 介绍完构造签名，我们再来介绍一个与之相关的概念，即构造函数类型。
### 构造函数类型
- 在 TypeScript 语言规范中这样定义构造函数类型：
>
An object type containing one or more construct signatures is said to be a constructor type. Constructor types may be written using constructor type literals or by including construct signatures in object type literals.

>
- 通过规范中的描述信息，我们可以得出以下结论：
    - 包含一个或多个构造签名的对象类型被称为构造函数类型
    - 构造函数类型可以使用**构造函数类型字面量** 或**包含构造签名的对象类型字面量**来编写。
- 那么什么是构造函数类型字面量呢？**构造函数类型字面量是包含单个构造函数签名的对象类型的简写**。具体来说，构造函数类型字面量的形式如下：
~~~ts
new < T1, T2, ... > ( p1, p2, ... ) => R
~~~
- 该形式与以下对象类型字面量是等价的：
~~~ts
{ new < T1, T2, ... > ( p1, p2, ... ) : R }
~~~
- 下面我们来举个实际的示例：
~~~ts
// 构造函数类型字面量
new (x: number, y: number) => Point

~~~
- 等价于以下对象类型字面量：
~~~ts
{
   new (x: number, y: number): Point;
}

~~~
### 构造函数类型的应用
- 在介绍构造函数类型的应用前，我们先来看个例子：
~~~ts
interface Point {
  new (x: number, y: number): Point;
  x: number;
  y: number;
}

class Point2D implements Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const point: Point = new Point2D(1, 2);

~~~
- 对于以上的代码，TypeScript 编译器会提示以下错误信息：
>
Class 'Point2D' incorrectly implements interface 'Point'.
Type 'Point2D' provides no match for the signature 'new (x: number, y: number): Point'.
- 相信很多刚接触 TypeScript 不久的小伙伴都会遇到上述的问题。要解决这个问题，我们就需要把对前面定义的 Point 接口进行分离，即把接口的属性和构造函数类型进行分离：
~~~ts
interface Point {
  x: number;
  y: number;
}

interface PointConstructor {
  new (x: number, y: number): Point;
}
~~~
- 完成接口拆分之后，除了前面已经定义的 Point2D 类之外，我们又定义了一个 newPoint 工厂函数，该函数用于根据传入的 PointConstructor 类型的构造函数，来创建对应的 Point 对象。
~~~ts
interface Point {
    x: number;
    y: number;
  }
  
  interface PointConstructor {
    new (x: number, y: number): Point;
  }
  
  class Point2D implements Point {
    readonly x: number;
    readonly y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
  
  function newPoint(
    pointConstructor: PointConstructor,
    x: number,
    y: number
  ): Point {
    return new pointConstructor(x, y);
  }
  
  const point: Point = newPoint(Point2D, 1, 2);
  
~~~
### 使用泛型创建对象
- 了解完构造签名和构造函数类型之后，下面我们来开始解决上面遇到的问题，首先我们需要重构一下 create 方法，具体如下所示：
~~~ts
class GenericCreator<T> {
  create<T>(c: { new (): T }): T {
    return new c();
  }
}

~~~
- 在以上代码中，我们重新定义了 create 成员方法，根据该方法的签名，我们可以知道该方法接收一个参数，其类型是构造函数类型，且该构造函数不包含任何参数，调用该构造函数后，会返回类型 T 的实例。
- 如果构造函数含有参数的话，比如包含一个 number 类型的参数时，我们可以这样定义 create 方法：
~~~ts
create<T>(c: { new(a: number): T; }, num: number): T {
  return new c(num);
}
~~~
- 更新完 GenericCreator 泛型类，我们就可以使用下面的方式来创建 FirstClass 和 SecondClass 类的实例：
~~~TS
class GenericCreator <T> {
    create<T>(c: { new(a: number): T; }, num: number): T {
        return new c(num);
      }
}
const creator1 = new GenericCreator<FirstClass>();
const firstClass: FirstClass = creator1.create(FirstClass);
const creator2 = new GenericCreator<SecondClass>();
const secondClass: SecondClass = creator2.create(SecondClass);
~~~