## 泛型

- 什么是泛型？ 我们想一个函数输入与输入的数据类型保持一致，有下面两种做法。

~~~typescript
function identity(arg: number): number {
    return arg;
}
function identity(arg: any): any {
    return arg;
}
~~~

- 现在我们有一种类型变量的做法，它是一种特殊的变量，只用于表示类型而不是值。

~~~typescript
function identity<T>(arg: T): T {
    return arg;
}
~~~

- 我们给identity添加了**类型变量**`T`。 `T`帮助我们捕获用户传入的类型（比如：`number`），之后我们就可以使用这个类型。 之后我们再次使用了`T`当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。
  - 我们把这个版本的`identity`函数叫做泛型，因为它可以适用于多个类型

### 使用泛型变量

- 使用泛型创建像`identity`这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。
- 如果我们想同时打印出`arg`的长度。 我们很可能会这样做：

~~~typescript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
~~~

- 正确做法

~~~typescript
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
~~~

### 泛型类型

- 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：

~~~typescript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity
~~~

- 我们还可以使用带有调用签名的对象字面量来定义泛型函数：

~~~typescript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: {<T>(arg: T): T} = identity;
~~~

- 这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口：

~~~typescript
// 定义一个泛型接口
interface CreateIndent {
  <T>(arg: T): T
}
let indent: CreateIndent = <T>(v: T): T => { return v }
console.log(indent('sssss'));

~~~

- 我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型（比如：`Dictionary而不只是Dictionary`）。 这样接口里的其它成员也能知道这个参数的类型了。

~~~typescript
interface CreateUserName<T> {
  (arg: T): T
}
let userName: CreateUserName<number> = <T>(arg: T): T => {
  return arg
}
~~~

- 我们的示例做了少许改动。 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。 当我们使用`GenericIdentityFn`的时候，**还得传入一个类型参数来指定泛型类型**（这里是：`number`），锁定了之后代码里使用的类型。 对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。

- 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。

### 泛型类

- 泛型类看上去与泛型接口差不多。 泛型类使用（`<>`）括起泛型类型，跟在类名后面。
- 我们可以看出，泛型类里面没有细节实现。

~~~typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
~~~

- 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。
- 我们在[类](https://typescript.bootcss.com/Classes.md)那节说过，类有两部分：静态部分和实例部分。 **泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型**。

### 泛型约束

- 我们有时候想使用泛型上的属性或方法，因为泛型是任意类型所以可能不存在.length方法

~~~typescript
function Login<T>(x: T, y: T): T {
  x.length
}
~~~

- 我们希望加个约束，希望这个泛型至少包含.length方法。想到的最好方式就是接口，也就是泛型就继承一个含有length的接口

~~~typescript
interface LengthWise {
  length: number
}
function Login<T extends LengthWise>(x: T, y: T): T {
  x.length
  return x
}
~~~

- 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型
- 你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象`obj`上，因此我们需要在这两个类型之间使用约束。

~~~
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
~~~

