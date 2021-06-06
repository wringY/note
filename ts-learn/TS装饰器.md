# TypeScript 装饰器
-  装饰器是什么
1. 它是一个表达式
2. 该表达式被执行后，返回一个函数
3. 函数的入参分别为 target、name 和 descriptor
4. 执行该函数后，可能返回 descriptor 对象，用于配置 target 对象 
- 装饰器的分类
1. 类装饰器（Class decorators）
2. 属性装饰器（Property decorators）
3. 方法装饰器（Method decorators）
4. 参数装饰器（Parameter decorators）
## 类装饰器
- 类装饰器顾名思义，就是用来装饰类的。它接收一个参数：target: TFunction - 被装饰的类
~~~ts
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
~~~
- 看完第一眼后，是不是感觉都不好了。没事，我们马上来个例子：
~~~ts
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker!';
~~~
- 但是这个例子有个问题，访问greet报属性不存在，这是因为装饰器不能影响类型的结构。 有一个简单的解决方法。 用类调用装饰器，然后在函数内部用所需的方法创建派生类。 函数的结果将是新的" decorated"类，并将具有所有方法
~~~ts
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
      run = () => {
          console.log(this.hello)
      }
  }
}

const Greeter = classDecorator(class {
  property = "property";
  hello: string;
  constructor(m: string) {
      this.hello = m;
  }
});
const gg = new Greeter('aa')
console.log(gg.hello)
~~~
## 属性装饰器
- 属性装饰器声明：
~~~ts
declare type PropertyDecorator = (target:Object, 
  propertyKey: string | symbol ) => void;
~~~
- 属性装饰器顾名思义，用来装饰类的属性。它接收两个参数：target: Object - 被装饰的类、propertyKey: string | symbol - 被装饰类的属性名
~~~ts
function logProperty(target: any, key: string) {
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true
  });

  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Person { 
  @logProperty
  public name: string;

  constructor(name : string) { 
    this.name = name;
  }
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";
~~~
## 方法装饰器
- 方法装饰器声明：
~~~ts
declare type MethodDecorator = <T>(target:Object, propertyKey: string | symbol,    
  descriptor: TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void;
~~~
- 方法装饰器顾名思义，用来装饰类的方法。它接收三个参数：target: Object - 被装饰的类、propertyKey: string | symbol - 方法名、descriptor: TypePropertyDescript - 属性描述符
~~~ts
function enumerable(value: boolean) {
  return function (target: Function, propertyKey: string, descriptor: PropertyDescriptor) {
     console.log(descriptor)
  };
}

class Calculator {
  @enumerable(false)
  double (num: number): number {
    return num * 2;
  }
}

let calc = new Calculator();

~~~
##  参数装饰器
- 参数装饰器声明：
~~~ts
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, 
  parameterIndex: number ) => void
~~~
- 参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：target: Object - 被装饰的类、propertyKey: string | symbol - 方法名、parameterIndex: number - 方法中参数的索引值
~~~ts
function Log(target: Function, key: string, parameterIndex: number) {
  console.log(target, key, parameterIndex)
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
 been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
  this.greeting = phrase; 
  }
}
~~~