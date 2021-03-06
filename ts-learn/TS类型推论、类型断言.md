# 类型推断
- 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
- 以下代码虽然没有指定类型，但是会在编译的时候报错：
~~~ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string
~~~
- 事实上，它等价于：
~~~ts
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
~~~
- TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
- 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
~~~ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
~~~
# 类型断言
- 有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
- 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。
- 类型断言有两种形式：
~~~ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
~~~
- as 语法
~~~ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
~~~
- 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言之外，也可能是表示一个泛型。故建议大家在使用类型断言时，统一使用 值 as 类型 这样的语法
## 用途
1. **将一个联合类型断言为其中一个类型**
- TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**
~~~ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function getName(animal: Cat | Fish) {
    return animal.name;
}
~~~
- 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，此时可以使用类型断言
~~~ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
~~~
- 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：
~~~ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`
~~~
- 原因是 (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，将 animal 直接断言为 Fish 了，而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误。
- 可是 swim 函数接受的参数是 Cat | Fish，一旦传入的参数是 Cat 类型的变量，由于 Cat 上没有 swim 方法，就会导致运行时错误了。
- 总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。
2. **将一个父类断言为更加具体的子类**
- 当类之间有继承关系时，类型断言也是很常见的：
~~~ts
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
~~~
- 上面的例子中，我们声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，为了实现这样一个函数，它的**参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了**。
- **但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code**。
- 大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof：
~~~ts
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
~~~
- 上面的例子中，确实使用 instanceof 更加合适，因为 **ApiError 是一个 JavaScript 的类，能够通过 instanceof 来判断 error 是否是它的实例**。
- 但是有的情况下 ApiError 和 HttpError 不是一个真正的类，**而只是一个 TypeScript 的接口（interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除**，当然就无法使用 instanceof 来做运行时判断了：
~~~ts
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
~~~
- 此时就只能用类型断言，通过判断是否存在 code 属性，来判断传入的参数是不是 ApiError 了：
~~~ts
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
~~~
2. **将任何一个类型断言为 any**
- 有的时候，我们非常确定这段代码不会出错，比如下面这个例子：
~~~ts
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
~~~
- 上面的例子中，我们需要将 window 上添加一个属性 foo，但 TypeScript 编译时会报错，提示我们 window 上不存在 foo 属性。
- **此时我们可以使用 as any 临时将 window 断言为 any 类型：**
~~~ts
(window as any).foo = 1;
~~~
- 在 any 类型的变量上，访问任何属性都是允许的。需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。**它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。**
- 总之，**一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡**（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。
3. **将 any 断言为一个具体的类型**
- 在日常的开发中，我们不可避免的需要处理 any 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。
- 遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。举例来说，历史遗留的代码中有个 getCacheData，它的返回值是 any：
~~~ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
~~~
- 那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：
~~~ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
~~~
- 上面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。
## 类型断言的限制
- 从上面的例子中，我们可以总结出：
1. 联合类型可以被断言为其中一个类型
2. 父类可以被断言为子类
3. 任何类型都可以被断言为 any
4. any 可以被断言为任何类型
- 那么类型断言有没有什么限制呢？是不是任何一个类型都可以被断言为任何另一个类型呢？答案是否定的——并不是任何一个类型都可以被断言为任何另一个类型。
- 具体来说，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。
~~~ts
interface Animal {
  name: string
}
interface Cat {
  name: string,
  run(): void
}
let tom: Cat = {
  name: 'Tom',
  run: () => {}
}
let animal: Animal = tom
~~~
- 我们知道，TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。在上面的例子中，Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的：
~~~ts
interface Animal {
    name: string;
}
interface Cat extends Animal {
    run(): void;
}
~~~
- 那么也不难理解为什么 Cat 类型的 tom 可以赋值给 Animal 类型的 animal 了——就像**面向对象编程中我们可以将子类的实例赋值给类型为父类的变量**。我们把它换成 TypeScript 中更专业的说法，即：Animal 兼容 Cat.
- 当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了：
~~~ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

function testAnimal(animal: Animal) {
    return (animal as Cat);
}
function testCat(cat: Cat) {
    return (cat as Animal);
}
~~~
- 这样的设计其实也很容易就能理解：
1. 允许 animal as Cat 是因为「父类可以被断言为子类」，这个前面已经学习过了
2. 允许 cat as Animal 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」
- 需要注意的是，这里我们使用了简化的父类子类的关系来表达类型的兼容性，而实际上 TypeScript 在判断类型的兼容性时，比这种情况复杂很多
- 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可，这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的。
## 双重断言
- 既然：任何类型都可以被断言为 any、any 可以被断言为任何类型
- 那么我们是不是可以使用双重断言 as any as Foo 来将任何一个类型断言为任何另一个类型呢？
~~~ts
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}

function testCat(cat: Cat) {
    return (cat as any as Fish);
~~~
- 在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型。若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
- **除非迫不得已，千万别用双重断言。**
## 类型断言 vs 类型转换
- 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
~~~ts
function toBoolean(something: any): boolean {
    return something as boolean;
}

toBoolean(1);
// 返回值为 1
~~~
- 在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：
~~~js
function toBoolean(something) {
    return something;
}
toBoolean(1);
// 返回值为 1
~~~
- 所以类型断言不是类型转换，它不会真的影响到变量的类型。若要进行类型转换，需要直接调用类型转换的方法
## 类型断言 vs 类型声明
~~~ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run()
~~~
- 我们使用 as Cat 将 any 类型断言为了 Cat 类型。但实际上还有其他方式可以解决这个问题：
~~~ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom: Cat = getCacheData('tom');
tom.run();
~~~
- 上面的例子中，我们通过类型声明的方式，将 tom 声明为 Cat，然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。这和类型断言是非常相似的，而且产生的结果也几乎是一样的——tom 在接下来的代码中都变成了 Cat 类型。
- 它们的区别，可以通过这个例子来理解：
~~~ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom = animal as Cat;
~~~
- 在上面的例子中，由于 Animal 兼容 Cat，故可以将 animal 断言为 Cat 赋值给 tom。但是若直接声明 tom 为 Cat 类型
~~~ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
~~~
- 则会报错，不允许将 animal 赋值为 Cat 类型的 tom。这很容易理解，Animal 可以看作是 Cat 的父类，当然不能将父类的实例赋值给类型为子类的变量。
- 深入的讲，它们的核心区别就在于：animal 断言为 Cat，只需要满足 **Animal 兼容 Cat 或 Cat 兼容 Animal 即可**、animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行
- 知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅
## 非空断言
- 在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined** 。
~~~ts
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
~~~