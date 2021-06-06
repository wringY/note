## JS代码优化的一些方法

### 优化比较耗时的计算（Memoization）

- 优化比较耗时的计算专业术语是Memoization，意为“记忆化”。通过将**计算结果缓存到内存中**，这样**对于同样的输入值，下次只需要中内存中读取结果**。

~~~
function memoizeFunction(func)
{
    var cache = {};
    return function()
    {
        var key = arguments[0];
        if (cache[key])
        {
            return cache[key];
        }
        else
        {
            var val = func.apply(this, arguments);
            cache[key] = val;
            return val;
        }
    };
}


var fibonacci = memoizeFunction(function(n)
{
    return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(100)); // 输出354224848179262000000
console.log(fibonacci(100)); // 输出354224848179262000000
~~~

代码中，第2次计算**fibonacci(100)**则只需要在内存中直接读取结果。

### 一行代码将格式化时间字符串

```
function time(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
}
time(); // "2018-08-09 18:25:54"
```
### 将短横线命名法的字符串转换成使用骆驼命名规则的字符串

- 例如: `'get-element-by-id'` => `'getElementById'`
- 采用数组的方法

~~~javascript
function getCamelCase( str ) {
    var arr = str.split( '-' );
    return arr.map( function( item, index ) {
        if( index === 0 ){
            return item;
        }else{
            return item.charAt(0).toUpperCase() + item.slice( 1 );
        }
    }).join('');
}
console.log( getCamelCase( 'get-element-by-id' ) ); //getEleme
~~~

