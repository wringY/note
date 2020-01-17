## 接口

- 接口是继类型检查之后，TS的又一重要特点
- TypeScript的核心原则之一是对值所具有的*结构*进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

## 最简单的接口

- 我们通常使用接口来表述一个数据的形状

~~~typescript
// 一个简单的接口 UserInfo 
interface UserInfo {
    name: string
}
function printUser(userObject: UserInfo){
}
// 也就是说UserInfo好比一个名字，告诉我们传入printUser的对象必须实现这个接口，
-------------
// 使用接口的其他方法    
interface Shape {
  color: string
}
let mm: Shape
let hh = <Shape>{}

~~~

- 我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
- 还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### 可选属性

~~~typescript
interface UserInfo {
    name: string;
    age?: number
}
~~~

- 就是对可能存在的属性进行预定义

- 可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误

### 只读属性

- 一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用`readonly`来指定只读属性:

~~~typescript
interface UserInfo {
    name: string;
    age?: number;
    readonly uid: number
}
~~~

- 此外TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

~~~
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
~~~

- 上面代码的最后一行，可以看到就算把整个`ReadonlyArray`赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写

~~~
a = ro as number[];
~~~

### 额外的属性检查

~~~typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}
 // 注意传入createSquare的参数拼写为colour而不是color。 在JavaScript里，这会默默地失败
let mySquare = createSquare({ colour: "red", width: 100 });
~~~

- 按照道理来说,color是可选属性，所以应该是不会报错的。但是对于**对象字面量**，TS会做额外的属性检查。
- 绕开这些检查非常简单。 最简便的方法是使用类型断言：

~~~
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
~~~

- 然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果`SquareConfig`带有上面定义的类型的`color`和`width`属性，并且*还会*带有任意数量的其它属性，那么我们可以这样定义它：

~~~typescript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
~~~

- 最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为`squareOptions`不会经过额外属性检查，所以编译器不会报错。

~~~typescript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
~~~

### 接口描述函数类型

- 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
- 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

~~~typescript
interface mySearch {
    (source: string, subString: string): boolean
}
// 下面展示了如何使用这个接口
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
----------------
interface Shape {
  (name: string): string
}
let hh: Shape
hh = function (name: string) {
  return name
}
let kk = <Shape>function (name: string) { }
~~~

- 对于函数类型的类型检查来说，**函数的参数名不需要与接口里定义的名字相匹配**。

- 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了`SearchFunc`类型变量。
- 函数的返回值类型是通过其返回值推断出来的（此例是`false`和`true`）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与`SearchFunc`接口中的定义不匹配。

### 可索引的类型

- 首先什么是可索引

~~~typescript
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0]; // Bob
~~~

- 上面表示定义了`StringArray`接口，它具有索引签名。 这个索引签名表示了当用`number`去索引`StringArray`时会得到`string`类型的返回值。

- 支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用`number`来索引时，JavaScript会将它转换成`string`然后再去索引对象。 也就是说用`100`（一个`number`）去索引等同于使用`"100"`（一个`string`）去索引，因此两者需要保持一致。

~~~typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用'string'索引，有时会得到Animal!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
~~~

- 下面这个会报错是因为，在这个接口中使用string索引应该能够得到number，name类型应该与string索引类型一致。
- 因为字符串索引声明了`obj.property`和`obj["property"]`两种形式都可以，所以类型需要保持一致

~~~typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
~~~

- 我们也可以将索引签名设置为只读的，这样就防止了给索引赋值

~~~typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
// 你不能设置myArray[2]，因为索引签名是只读的。
~~~

### 使用接口来描述类

- 当我们用一个接口来描述类时，我们称为实现接口
- 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。通过implements关键字来实现，implements有落实，使生效的意思

~~~typescript
interface ClockInterface {
	currentTime: Date;
}
class Clock implements ClockInterface {
    currentTime: Date
    constructor(h: number,m: number)
}
~~~

- 你也可以在接口中描述一个方法，在类里实现它，如同下面的`setTime`方法一样：

~~~typescript
interface ClockInterface {
	setTime(d: Date)
	currentTime: Date;
}
class Clock implements ClockInterface {
    currentTime: Date
    setTime(d:Date){
        this.currentTime = d
	}
    constructor(h: number,m: number){
        
    }
}
~~~

### 类的静态部分和实例部分

- 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

~~~
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
~~~

- 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。
- 所以我们需要对**类的静态部分和实例部分进行分开检查**

~~~typescript
// 定义一个接口检查 静态部分
interface ClockConstructor {
   new (hour: number, minute: number): ClockInterface;
}
// 定义一个接口 检查实例部分
interface ClockInterface {
    tick()
}
// 可以看出，类无法直接对静态部分进行检查的，我们
class FirstClock implements ClockInterface {
    constructor(h: number, m: number){
	}
    tick(){
        console.log("FirstClock")
    }
}
class SecondClock implements ClockInterface {
      constructor(h: number, m: number) { }
    tick() {
        console.log("Second");
    }
}
// 下面是关键: 我们通过createClock函数来创建类的实例，而且在入参的时候，间接进行了静态部分的类型检查
function createClock(ctor: ClockConstructor,hour: number,minute: number): ClockInterface {
    return new ctor(hour,minute)
}

let digital = createClock(FirstClock, 12, 17);
let analog = createClock(SecondClock, 7, 32);
// 因为createClock的第一个参数是ClockConstructor类型，在createClock(FirstClock, 7, 32)里，会检查FirstClock是否符合构造函数签名。也就是间接实现了类静态部分的类型检查
~~~

### 接口继承

- 和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

~~~typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
~~~

- 一个接口可以继承多个接口，创建出多个接口的合成接口。

~~~typescript
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

### 混合类型

- 先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

  一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

~~~typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
~~~

### 接口继承类

当接口继承了一个类类型时，**它会继承类的成员但不包括其实现**。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，**这个接口类型只能被这个类或其子类所实现（implement）。**

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：

~~~typescript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    select() { }
}

class Location {

}
~~~

- 在上面的例子里，`SelectableControl`包含了`Control`的所有成员，包括私有成员`state`。 因为`state`是私有成员，所以只能够是`Control`的子类们才能实现`SelectableControl`接口。 因为只有`Control`的子类才能够拥有一个声明于`Control`的私有成员`state`，这对私有成员的兼容性是必需的。
- 在`Control`类内部，是允许通过`SelectableControl`的实例来访问私有成员`state`的。 实际上，`SelectableControl`就像`Control`一样，并拥有一个`select`方法。 `Button`和`TextBox`类是`SelectableControl`的子类（因为它们都继承自`Control`并有`select`方法），但`Image`和`Location`类并不是这样的。