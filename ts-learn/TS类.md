# TypeScript 中类的用法

## 公共、私有与受保护的修饰符

- TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected.
- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- protected 修饰的属性或方法是受保护的，它和 private 类似，**区别是它在子类中也是允许被访问的**
~~~ts
class Animal {
  private name: string // 私有属性
  private run: () => any // 私有方法
  public swing: string // 共有属性、默认
  static pp: string
  static ll: () => any
  protected hh: string // 受保护的，只能在子类中使用
  constructor(a, b, c, d, f) {
    this.name = a
    this.hh = b
  }
}
new Animal("a",'b', "d", "c","w")
~~~
## 参数属性

- 可以使用下面的方式简化写法
~~~ts
class Animal {
 // public name: string;  等价于
  public constructor(public name: string) {
    // this.name = name;
  }
}
new Animal('aa')
~~~
## readonly只读修饰符
- 只读属性关键字，只允许出现在**属性声明或索引签名或构造函数中**。
- 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
~~~ts
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
~~~
## 抽象类
- 使用 abstract 关键字声明的类，我们称之为抽象类。抽象类不能被实例化，因为它里面包含一个或多个抽象方法。所谓的抽象方法，是指不包含具体实现的方法：
~~~ts
abstract class Person {
  constructor(public name: string){}

  abstract say(words: string) :void;
}
// Cannot create an instance of an abstract class.(2511)
const lolo = new Person(); // Error
}
~~~
- 其次，抽象类中的抽象方法必须被子类实现：
~~~ts
abstract class Person {
  constructor(public name: string){}

  // 抽象方法
  abstract say(words: string) :void;
}

class Developer extends Person {
  constructor(name: string) {
    super(name);
  }
  
  say(words: string): void {
    console.log(`${this.name} says ${words}`);
  }
}

const lolo = new Developer("lolo");
lolo.say("I love ts!"); // lolo says I love ts!
~~~
## 类的类型
- 类的最后一个特性——类的类型和函数类似，即在声明类的时候，其实也同时声明了一个特殊的类型（确切地讲是一个接口类型），**这个类型的名字就是类名，表示类实例的类型；在定义类的时候，我们声明的除构造函数外所有属性、方法的类型就是这个特殊类型的成员**。如下代码所示
~~~ts
class A {

  name: string;

  constructor(name: string) {

    this.name = name;

  }

}

const a1: A = {}; // ts(2741) Property 'name' is missing in type '{}' but required in type 'A'.

const a2: A = { name: 'a2' }; // ok

~~~
- 在第 1～6 行，我们在定义类 A ，也说明我们同时定义了一个包含字符串属性 name 的同名接口类型 A。因此，在第 7 行把一个空对象赋值给类型是 A 的变量 a1 时，TypeScript 会提示一个 ts(2741) 错误，因为缺少 name 属性。在第 8 行把对象{ name: 'a2' }赋值给类型同样是 A 的变量 a2 时，TypeScript 就直接通过了类型检查，因为有 name 属性。

## 继承

- 在 TypeScript 中，使用 extends 关键字就能很方便地定义类继承的抽象模式，派生类通常被称作子类，基类也被称作超类（或者父类）。
- **派生类如果包含一个构造函数，则必须在构造函数中调用 super() 方法，这是 TypeScript 强制执行的一条重要规则。**

## 存取器

- TypeScript 中还可以通过`getter`、`setter`截取对类成员的读写访问。

  通过对类属性访问的截取，我们可以实现一些特定的访问控制逻辑。下面我们把之前的示例改造一下，如下代码所示：

~~~ts
class Son {

  public firstName: string;

  protected lastName: string = 'Stark';

  constructor(firstName: string) {

    this.firstName = firstName;

  }

}

class GrandSon extends Son {

  constructor(firstName: string) {

    super(firstName);

  }

  get myLastName() {

    return this.lastName;

  }

  set myLastName(name: string) {

    if (this.firstName === 'Tony') {

      this.lastName = name;

    } else {

      console.error('Unable to change myLastName');

    }

  }

}

const grandSon = new GrandSon('Tony');

console.log(grandSon.myLastName); // => "Stark"

grandSon.myLastName = 'Rogers';

console.log(grandSon.myLastName); // => "Rogers"

const grandSon1 = new GrandSon('Tony1');

grandSon1.myLastName = 'Rogers'; // => "Unable to change myLastName"

~~~



# 泛型

- 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
- 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：类的实例成员、类的方法、函数参数和函数返回值。
- 泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。
- 首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：
~~~ts
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
~~~
- 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
- 这时候，泛型就派上用场了：
~~~ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
~~~
- 上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
- 接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来：
~~~ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
~~~
- 其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U，用于扩展我们定义的 createArray 函数：
~~~ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
~~~
## 泛型约束
- 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：
~~~ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// index.ts(2,19): error TS2339: Property 'length' does not exist on type 'T'.
~~~
- 上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了。这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束：
~~~
interface Arg {
  length: number
}
function loggingIdentity<T extends Arg >(arg: T): T {
  console.log(arg.length);
  return arg;
}
~~~
- 多个类型参数互相约束，比如我们相应把两个对象的字段拷贝到一起
~~~ts

function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
      target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

copyFields(x, { b: 10, d: 20 });
~~~
- 上例中，我们使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。
## 泛型接口
- 可以使用接口的方式来定义一个函数需要符合的形状：
~~~ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
~~~
- 当然也可以使用**含有泛型的接口**来定义函数的形状：
~~~ts
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
~~~
- 进一步，我们可以把**泛型参数提前到接口名上**：
~~~ts
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
~~~
- 注意，此时**在使用泛型接口的时候，需要定义泛型的类型**
## 泛型类
- 与泛型接口类似，泛型也可以用于类的类型定义中：
~~~ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
~~~
## 泛型参数的默认类型
在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
~~~ts
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
~~~
## 泛型工具类型
- 为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。出于篇幅考虑，这里我们只简单介绍 Partial 工具类型。不过在具体介绍之前，我们得先介绍一些相关的基础知识，方便读者自行学习其它的工具类型。
1. **typeof**
- 在 TypeScript 中，typeof 操作符可以用来获取一个变量声明或对象的类型。
~~~ts
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: 'semlinker', age: 33 };
type Sem= typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
~~~
2. **keyof**
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
- 在 TypeScript 中支持两种索引签名，数字索引和字符串索引：
~~~ts
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string; 
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}
~~~
- 为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。**其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引**。所以 keyof { [x: string]: Person } 的结果会返回 string | number。
3. **in**
- in 用来遍历枚举类型：
~~~ts
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} //
let a: Keys = 'a'
~~~
4. **Partial**
- Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?, 定义：
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
  title: "Learn TS",
  description: "Learn TypeScript",
};

const todo2 = updateTodo(todo1, {
  description: "Learn TypeScript Enum",
})
~~~
- 在上面的 updateTodo 方法中，我们利用 Partial<T> 工具类型，定义 fieldsToUpdate 的类型为 Partial<Todo>，即：
~~~ts
{
   title?: string | undefined;
   description?: string | undefined;
}
~~~~