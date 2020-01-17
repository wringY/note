## TS里面的函数

- ts里面声明函数类型

~~~typescript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
~~~

- 完整的函数类型

~~~typescript
let myAdd: (x:number, y:number) => number =
    function(x: number, y: number): number { return x + y; };
~~~

- 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确

### 可选参数

- 可选参数必须跟在必须参数后面，也就是可选参数的位置必须在必选参数位置的后面。

### 默认参数

- 默认参数其实隐性的包含了可选参数。当我们声明一个默认参数时，同时也就意味着他是可选的。

~~~typescript
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
~~~

- 注意，默认参数可以放在必须参数的签名，但是必须传入undefined才能获取到默认值。

### 剩余参数

- 在js里面可以使用`arguments`来访问所有传入的参数。es6可以通过...扩展符号，来获取剩余参数。

~~~typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
~~~

