
## PHP

> 详细参考文档：http://php.net/manual/zh/index.php

### 起步

> - PHP 是什么？
> - PHP 写在哪？
> - PHP 能做啥？

> 超文本标记是用普通文本描述富文本的一种方式
>
> 富文本：有格式的文本

PHP（PHP: Hypertext Preprocessor）是一种被广泛应用的脚本语言，它可以被嵌入到 HTML中，尤其适合做动态网站开发开发。

## php语言的特点

- 开源（open source）软件，跨平台，常用操作系统稳定执行。Windows / Linux。做WEB开发的经典组合 WAMP,LAMP基本都是开源软件。
- 入门简单,用户只需要关注应用，开发成本低。
- 支持的大多数主流数据库。MySQL，oracle,Redis等
- 存在大量针对PHP开发的框架。如Laravel,ThinkPHP,Yii,CoderIgniter,Symfony等，加快开发速度

我们接下来会在 PHP 中看到的许多代码特性和其他编程语言类似，例如：变量、函数、循环，等等。 代码语法看起来略有不同，但是在概念上是基本类似的。

我们使用 PHP 的目的就是能让静态网页变成动态网页，能称之为动态网页的核心就是让 HTML 上的内容不再被写死，而是通过在 HTML 中嵌入一段可以在服务端执行的代码(php)，从而达到动态网页的目标。

例如：我们需要有一个网页，这个网页每次打开都可显示当前的年月日，如果采用 HTML 处理：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>当前日期</title>
</head>
<body>
  <h1>2020-01-01</h1>
</body>
</html>
```

我们必须每天到服务器上修改这个网页，从而让它保持显示最新日期，但是有了 PHP 这种能够在服务端执行的脚本语言就可以很轻松实现：

```php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>当前日期</title>
</head>
<body>
  <h1><?php echo date('Y-m-d'); ?></h1>
</body>
</html>
```

从以上这个最最简单的基础案例就能看出：PHP 无外乎为了可以在网页中动态输出最新内容的一种技术手段。

> 历史使人明智：http://php.net/manual/zh/history.php.php

### PHP 标记

> http://php.net/manual/zh/language.basic-syntax.phpmode.php

- `<?php` 可以让代码进入“PHP 模式”
- `?>` 可以让代码退出“PHP 模式”

```php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>这是一个包含 PHP 脚本的网页</title>
</head>
<body>
  <h1>这是一个包含 PHP 脚本的网页</h1>
  <p>这里原封不动的输出</p>

  <?php
  // 这里是 PHP 代码，必须满足 PHP 语法
  $foo = 'bar';
  echo $foo;
  ?>

  <p>这里也不变</p>

  <p><?php echo '<b>这还是 PHP 输出的</b>'; ?></p>
</body>
</html>
```

类似于在 HTML 中使用 JavaScript，但是不同的是 JavaScript 运行在客户端，而 PHP 运行在服务端。

**只有处于 PHP 标记内部的代码才是 PHP 代码，PHP 标记以外都原封不动。

### 输出内容方式

- echo：如果php中输出为true，那么结果为1，如果输出为false，那么结果为空

  ```php
  <?php
  // echo 是 PHP 中的一个特殊的“指令”，
  // 不一定需要像函数那样通过 `()` 去使用
  // 注意：echo 后面紧跟着一个空格
  echo 'hello php';
  echo 'hello', 'world';
  // => `helloworld`
  ```

- print：

  ```php
  <?php
  // print 与 echo 唯一区别就是只能有一个参数
  print 'hello php';
  // print 'hello', 'world';
  // => Parse error: syntax error ...
  ```

- var_dump：输出详细信息，如对象、数组，多用于调试。

  ```php
  <?php
  // var_dump 是一个函数，必须跟上 () 调用
  // 可以将数据以及数据的类型打印为特定格式
  var_dump('hello php');
  // => 'string(9) "hello php"'
  ```

> 还有一些输出函数（可以通过查手册自学，用到再说），例如：`exit()` / `print_r()` 等等

- var_export(): 输出复杂数据类型，如数组，多用于调试。
- print_r()：输出复杂数据类型，如数组，多用于调试。

### 与 HTML 混编

- 普通嵌入

  ```php
  <p><?php echo 'hello'; ?></p>
  ```

- 语句混编

  ```php
  <?php if ($age >= 18) { ?>
    <p>成年人</p>
  <?php } else { ?>
    <p>小朋友</p>
  <?php } ?>
  ```

  还可以这样：

  ```php
  <?php if ($age > 18): ?>
    <p>成年人</p>
  <?php else: ?>
    <p>小朋友</p>
  <?php endif ?>
  ```

### 注释

你可以在代码中添加注释，从而增强我们代码的可阅读性。PHP 中注释有两种方式（与 JavaScript 相同）：

- 单行注释

  ```php
  <?php
  // 这是一条单行注释
  # 井号也可以做注释（不要用，有点生僻）
  $foo = 'hello';
  ```

- 多行注释

  ```php
  <?php
  /*
  ......
  这里可以添加任意行数的注释内容
  ......
  */
  $foo = 'hello';
  ```

### 语法

编程语言常见的语法

- 变量 —— 用于临时存放数据的容器
- 顺序结构 —— 先干什么再干什么
- 分支结构 —— 如果怎样就怎样否则怎样
- 循环结构 —— 不断的做某件相同的事
- 函数 —— 提前设计好一件事怎么干，然后想什么时候干就什么时候干
- 运算符 —— 数学运算和字符串拼接
- 字面量 —— 在代码中用某些字符组成，能够表达一个具体的值 这些字符之间表示数据的方式叫做字面量

PHP 也是另外种编程语言，作为另外一种编程语言，PHP 也具备着绝大多数语言都有的特点，例如变量、条件分支、循环、函数等等，不同的是每个语言都会有自己的语法规定。这里不用太过担心，这些语法规定与之前学习的编程语言大同小异，对我们来说不会有太大的压力。

以下是重点注意的问题：

1. 变量
2. 双引号字符串和单引号字符串的差异
3. 指令式的语法
4. foreach
5. 函数作用域问题
6. 字符串拼接

#### 变量

> 变量是编程语言中临时存放数据的容器。

PHP 中申明一个变量是用一个美元符号后面跟变量名来表示。变量名同样是区分大小写的。

PHP 中变量无需声明类型，变量的类型根据值的类型来推断。

PHP没有预解析，变量和函数必须先声明后使用。

```php
<?php
  //所有变量声明必须以$符号作为前缀
  //变量名区分大小写
  //变量名由字母、数字、下划线组成。
//类似js中弱语言类型，无需声明变量类型
$foo; // 申明一个变量，变量名为 `foo`，未对其进行赋值，那么结果为null
$bar = 'baz'; // 申明一个变量，将一个值为 `baz` 的字符串赋值给它
echo $foo; // 输出一个变量名为 `foo` 的变量
fn($bar); // 将一个变量名为 `foo` 的变量作为 `fn` 的实参传递
```

#### 数据类型(了解)

常见的 PHP 数据类型与 JavaScript 基本一致：

- string（字符串） **
- integer（整型）—— 只能存整数
- float（浮点型）—— 可以存带小数位的数字
- boolean（布尔型）
- array（数组） **
- object（对象）
- NULL（空）

数据类型的分类：

- 基本数据类型：string（字符串） integer（整型） float（浮点型） boolean（布尔型）
- 复合数据类型： array（数组） object（对象）
- 特殊数据类型：NULL（空）       资源

判断数据类型：

- is_string():判断当前变量是否是字符串类型
- is_bool():判断当前变量是否是布尔类型
- is_int():判断当前变量是否是整形类型
- is_float():判断当前变量是否是浮点类型
- is_array():判断当前变量是否是数组类型
- is_object():判断当前变量是否是对象类型

##### 字符串（重要）

PHP 有多种创建字符串的方式：单引号、双引号等。

- js中字符串拼接用+；php中字符串拼接用  .


- 单引号字符串
  - 不支持特殊的转义符号，例如 `\n`
  - 如果要表示一个单引号字符内容，可以通过 `\'` 表达
  - 如果要表示一个反斜线字符内容，可以通过 `\\` 表达
- 双引号字符串
  - 支持转义符号：\"  \\  \$  \r \n \t
  - 支持变量解析
  - 如果在变量名后面紧接着其它的合法字符(中文，a-z A-Z 0-9 _),那么系统会将整个变量及后面的字符串当成一个变量进行解析。
  - 如果需要在这种情况下正确的解析变量，可以将变量包含在{}中，或者使变量名后面紧接着非合法字符。

```php
<?php
// ====== 单引号 ======
echo 'hello\nworld';
// => `hello\nworld`
echo 'I\'m a better man';
// => `I'm a better man`
echo 'OS path: C:\\Windows';
// => `OS path: C:\Windows`

// ====== 双引号 ======
echo "hello\nworld";
// => `hello
// world`
$name = 'zce';
echo "hello $name";
// => `hello zce`
```

> 字符串函数
>
> - http://php.net/manual/zh/ref.strings.php
> - http://www.w3school.com.cn/php/php_string.asp

##### 数组（重要）

PHP 中数组可以分为两类：

- 索引数组

  与 JavaScript 中的数组基本一致

  声明数组并初始化

  $arr = array("hello","hi"); 此时数组会产生从0开始的索引。

  输出数组数据：print_r()、var_dump()。

  输出数组指定索引的数据：echo $arr[0]。

  ```php
  <?php
  // 定义一个索引数组
  $arr = array(1, 2, 3, 4, 5);
  var_dump($arr);

  // PHP 5.4 以后定义的方式可以用 `[]`
  $arr2 = [1, 2, 3, 4, 5];
  var_dump($arr2);
  ```

- 关联数组

  有点类似于 JavaScript 中的对象

  给数组添加属性

  $arr1 = array("name"=>"ls","age"=>"18");

   PHP 5.4 以后定义的方式可以用[]

  此时我们可以通过指定字符的属性进行调用。

  echo ["name"];

  数字索引和属性是可以共存的。

  ```php
  <?php
  // 注意：键只能是`integer`或者`string`
  $arr = array('key1' => 'value1', 'key2' => 'value2');
  var_dump($arr);

  // PHP 5.4 以后定义的方式可以用 `[]`
  $arr2 = ['key1' => 'value1', 'key2' => 'value2'];
  var_dump($arr2);
  ```
  ##### 关于数组的补充

  ~~~php
  // php中的混合数组：综合了索引数组和关联数组的特点，意味着它里面包含索引和关联两种形式
      // 特点:
      // 1.如果添加元素的时候设置key,那么就没有索引
      // 2.如果没有设置key,那么系统自动生成索引
      // 3.数字索引和key不会互相影响。如果没有指定key,那么索引会取到之前的最大的索引下载+1
      // $arr = array(
      //     1,
      //     2,
      //     3,
      //     "name" => "jack",
      //     "age" => 20,
      //     4
      // );
      // echo '<pre>';
      // print_r($arr);
      // echo '</pre>';
      ----------------------------------------------------------
      // 通过[]创建数组：
      // 1.判断当前数组是否已经存在，如果不存在则先创建，再将元素添加到数组第一个元素位置
      // 2.如果数组已经存在，那么就将当前元素添加到数组中--追加
      // $arr[] = 1;
      // $arr[] = 100;
      // $arr["name"] = "jack";
      // $arr[] = 200;
      // print_r($arr);
      --------------------------------------------------------------
      // 说明与数组相关的常用函数
      // count():获取指定数组的长度
      // unset():它也可以用来删除数组中的某个成员。但是删除了数组的元素之后，并不会对数组元素的索引产       生影响，元素还会保留之前的索引。意味着它只是删除了索引位置的元素，并没有动态的改变数组的长度。
      // $arr = [1,2,3,4,5];
      // print_r($arr);
      // unset($arr[2]);
      // echo '<hr>';
  ~~~

  ##### 二维数组

  ~~~
  // 描述学生对象：姓名+年龄
      $arr = array( //索引数组
          // 描述第一个学生对象的数据
          "first" => array( //关联数组--类似于js中的对象
              "name" => "jack",
              "age" => 20
          ),
          array(
              "name" => "rose",
              "age" => 18
          )
      );
       print_r($arr);
        echo '<hr>';
        foreach($arr as $key => $value){
            // 二维数组的遍历需要考虑使用嵌套循环
            foreach($value as $subkey => $subvalue){
                echo $subkey .":".$subvalue ."<br>";
            }
        }
  ~~~

#### 类型转换

> 参考：http://php.net/manual/zh/language.types.type-juggling.php

-  数据有不同的类型，那么在操作数据的时候可能进行类型的转换才能完成对应的操作
-  类型转换大致可以分为两种：自动转换  强制类型转换，在php中大多数情况下都是自动转换。
-  在php中的强制类型转换，就是在变量前面添加(类型)

```php
// - 数据有不同的类型，那么在操作数据的时候可能进行类型的转换才能完成对应的操作
    // - 类型转换大致可以分为两种：自动转换  强制类型转换
    // - 在php中大多数情况下都是自动转换
    // $str = "123";
    // var_dump($str);
    // // 在php中的强制类型转换，就是在变量前面添加(类型)
    // var_dump((int)$str);
    // echo '<hr>';
    // // 将变量转换为数组:系统将创建一个数组，同时将这个变量做为数组的第一个元素
    // var_dump((array)$str);
    // (bool)$str  (string)$str  (object)$str
    $str = "abc";
    $num = (int)$str;
    var_dump($num); // 报错 | 0
```

#### 运算符

数学运算符，逻辑运算符与 JavaScript 基本一致，无额外特殊情况。

注意：字符串连接（拼接）采用的是比较特殊的 `.`

```php
<?php
    // +只能是算术运算符，系统会自动的将+两边的变量转换为数组，如果可以转换，就进行转换，否则返回这个数据类型的默认值  int >0 object > null bool>false float:0.0
    // 在php中字符串连接符使用.
    // 算术运算符： + - * / % ++ --
    // 赋值运算符：= += -= *= /=	
    // 逻辑运算符：！ && ||
    // 比较运算符：> >= < <= == === !=
    // 三元运算符：a>b ? "" : ""
?>
```

#### 语句

- 分号分割
- if、switch、while、for、 foreach、function......

#### 流程控制

- 顺序结构

- 分支结构

  - if ... else
  - switch ... case

- 循环结构

  - for

     count()是内置函数，用来计算数组的长度

    $arr = array(123,456,789);
         for($i=0;$i<count($arr);$i++){
             echo $arr[$i].'<br>'; 
         }
    ​~~~

  - while

  - foreach --- 专门用来遍历数组

    ```php
    //综合写法
    //这里的$key和$value只是普通的变量，而决定其本质的是它们所在位置的不同。
    foreach($arr as $key => $value){
            echo $key .":".$value.'<br>';
        }
    //简写模式
    foreach($arr as $value){
             echo $value.'<br>';
        }
    //注意：在简写语法里，$value就是数组的值，无论$value的表示形式是什么，本质上都是指数组的值。
     举例：
     $arr = array("username"=>"zhangsan","age"=>"12");
        foreach($arr as $key => $value){
            echo $key.'===='.$value.'<br>';
        }
    ```

指令式的 if、for、foreach、while 单独掌握

```php
// 指令式就是将开始 “{” 换成 “:”  结束 “}” 换成 “endif;”
if ($i > 0) :
  echo 'ok'
endif;
------------
// $score = 25; //A B C D E F 
    // if($score >= 90):
    //     echo 'A';
    // elseif($score >= 80):
    //     echo 'B';
    // elseif($score >= 70):
    //     echo 'C';
    // elseif($score >= 60):
    //     echo 'D';
    // else:
    //     echo 'E';
    // endif
 -----------------
// for foreach while 也是一样
for ($i = 0; $i < 10; $i++) :
  echo $i;
endfor;
```

#### 函数

##### 常用函数

1. isset():判断变量是否定义了，同时它还可以判断变量的值是否为null,如果定义了且值不为null,则返回true,否则返回false

2. empty():判断变量是否为空值，为空的值有：""  0 "0",null,false,array().如果值为以上中的某一个，则返回值

3. unset():删除变量

   - 如果删除一个变量，那么变量的值会置为null
   - 可以同时删除多个变量
   - 如果在函数中删除全局变量，那么并不会真正的将全局变量删除(以后再说)

4. date() 获取时间

5. gettype()   用来判断变量的类型。

6. json_encode() 将数组或对象转换为json格式字符串。第二个参数为true，以数组形式读取每一个元素。

7. uniqid() 随机生成一个唯一的id。

8. in_array(值,数组); 判断这个数组中是否有指定的值。

9. sleep():线程暂停，参数是number 单位是秒

10. array_rand();随机获取一个数组长度内的索引，参数是一个数组

11. array_keys() : 获取数组的所有键，返回数组形式。

12. array_values() : 获取数组的所有值，返回数组形式。

   ~~~
   [
   	{
   		"username":"jack",
   		"password":"123" 
   	},                  //如果设置true，则这个花括号会被转化为数组的形式，否则就是一个对象。
   	{
   		"username":"rose",
   		"password":"123"
   	},
   	{
   		"username":"tom",
   		"password":"123"
   	}
   ]
   ~~~

   ​

13. explode(): 使用explode方法进行字符串的拆分。这个方法可以通过指定的字符来分割指定的字符串，并将拆分的结构存储到数组并返回。

14.   implode( )  ：将数组以指定的字符分割，返回一个字符串。

   ~~~
    explode("|",$str);  //第一个参数通过哪个字符进行分割，第二个参数被分割的字符串。
    //返回是一个数组。
   ~~~

   ~~~
   $arr1 = array("a"=>"111","b"=>"222","c"=>"333");
   $ttt = json_encode($arr1);
   echo $ttt;  //{"a":"111","b":"222","c":"333"}
    //如果数组里面有汉字，那么在转换json格式字符串时，需要使用对应的unicod编码
    \u5f20\u4e09这种形式就是Unicode编码
   $arr = array("username"=>"张三","age"=>"12","sex"=>"male");
   $arr['127'] = array("username"=>"\u5f20\u4e09","chinese"=>"110");
   ~~~

##### 自定义函数

定义与使用函数的方式与 JavaScript 相同：

```php
<?php
// 函数名不区分大小写
function foo ($name, $title) {
  echo "$name ($title)";
}

// 调用
foo('zce', 'UFO');
Foo('zgd', 'SBO'); // 大小写不区分
```

注意：使用方式有点差异（函数名不区分大小写），但是不要这么搞！！！

> 建议在 PHP 中采用下划线式（snake_case）做命名规则，不管是函数还是变量

### 特性

#### 变量作用域

关于变量作用域这一点，PHP 与绝大多数语言也都不同：**默认函数内不能访问函数所在作用域的成员。**

在 JavaScript 中，我们可以在函数作用域中使用父级作用域中的成员：

```javascript
var top = 'top variable'

function foo () {
  var sub = 'sub variable'

  console.log(top)
  // => `top variable`

  function bar () {
    console.log(top)
    // => `top variable`
    console.log(sub)
    // => `sub variable`
  }

  bar()
}

foo()
```

而在 PHP 中：

```php
<?php
$top = 'top variable';

function foo () {
  $sub = 'sub variable';

  echo $top;
  // => 无法拿到

  function bar () {
    echo $top;
    // => 无法拿到

    echo $sub;
    // => 无法拿到
  }

  bar();
}

foo();
```

如果需要访问全局变量，可以通过 `global` 关键字声明：

global就是用来添加对外部成员的引用

注意点：不能在引用的同时对变量赋值，如果想赋值，则需要换下一行赋值

```php
<?php
$top = 'top variable';

function foo () {
  // 声明在当前作用域中获取全局作用域中的 `$top`
  global $top;

  $sub = 'sub variable';

  echo $top;
  // => `top variable`

  function bar () {
    // 声明在当前作用域中获取全局作用域中的 `$top` 和 `$bar`
    global $top, $bar;

    echo $top;
    // => `top variable`

    echo $sub;
    // => 任然无法拿到，因为 `$sub` 不再全局范围，而是在 `foo` 函数中定义
  }

  bar();
}

foo();
```

#### 超全局变量

> http://www.w3school.com.cn/php/php_superglobals.asp

PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。

这些超全局变量是：

- $GLOBALS — 引用全局作用域中可用的全部变量，本质上是一个数组存储了所有的全局变量。

  ~~~
  <?php
      $name = "jack";
      $age = 20;
      function test(){
          // global
          // 当前脚本中定义的全局变量也会存储在这个超全局变量中
          print_r($GLOBALS);
          echo '<hr>';
          echo $GLOBALS["name"] .":".$GLOBALS["age"];
      }
      test();
  ?>
  ~~~

- $_SERVER — 获取服务端相关信息

  - $_SERVER["PHP_SELF"]  
  - $_SERVER["REQUEST_URI'']  无论是get请求还是post请求，这个属性都把数据以键值对的形式拼接在地址后面。其实就是一个uri,这样我们就可以在post请求中获取get请求中的数据。

- $_REQUEST — 获取提交参数

- $_POST — 获取 POST 提交参数

- $_GET — 获取 GET 提交参数

- $_FILES — 获取上传文件

- $_ENV — 操作环境变量

- $_COOKIE — 操作 Cookie

- $_SESSION — 操作 Session


本节会介绍一些超全局变量，并会在稍后的章节讲解其他的超全局变量。

##### 预定义变量（表单处理）

- http协议的常用请求方式：(增删该查)

​    get ：用来从服务器获取数据，参数一般作为查询条件。

​    post：提交数据（添加数据）

​    put ：用来修改数据

​    delete ：用来删除数据

url地址就是导航栏上的地址。http://localhost/ajax/php/page4.php?flag=2

- $_GET **得到url地址上传递的地址**

  网页上的数据，后端需要通过$_GET获得。

  ```
   得到url地址中flag参数的值。
   $ss = $_GET["flag"];
      echo "<span>flag数据为：$ss</span>"
  ```

- $_POST

  - html表单默认请求方式get请求，会把表单数据作为url的参数自动追加，作为ge请求的查询参数。

  我们需要将表单的method改为post。 

  - get请求会将表单数据暴露在url地址中，而且浏览器对url地址上的参数有字节限制。
  - post请求，可以大量的发送数据请求。

#### $GLOBALS

$GLOBALS 这种全局变量用于在 PHP 脚本中的任意位置访问全局变量（从函数或方法中均可）。

PHP 在名为 $GLOBALS[index] 的数组中存储了所有全局变量。变量的名字就是数组的键。

下面的例子展示了如何使用超级全局变量 $GLOBALS：

```php
<?php
$x = 75;
$y = 25;

function foo () {
  $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
}

foo();
echo $z;
// => 100
```

#### 常量定义与使用

> 常量跟变量一样也是一个数据容器，但是不同的是一旦申明过后就不允许被修改。

##### 定义常量

 // 定义常量的语法：define(常量名称，常量值，标记是否对大小写敏感false)

​    // define(name,value,insensitive):insensitive:不敏感的，麻木不仁的，

​    // 默认情况下常量对大小写敏感--区分大小写

​    // 定义常量:一般情况下常量的名称使用大写字符

```php
<?php
// 定义常量使用的是内置的 `define` 函数
// 第一个参数是常量的名称，建议采用全大写字母命名，多个单词下划线分隔
// 第二个参数是常量中存放的数据，可以是任意类型
// 第三个参数是常量名称是否区不分大小写，默认 false 区分大小写
define('SYSTEM_NAME', '阿里百秀');
define('SYSTEM_ENABLE', true);
```

#### 使用常量

```php
<?php
// 直接通过常量的名称访问常量
// 与变量不同的是不需要用 $
echo SYSTEM_NAME;
echo SYSTEM_ENABLE;
```

#### 魔术常量

~~~
// php中的魔术常量的使用:魔术常量的意思是指这个常量值会根据不同的使用场合返回不同的值
    // __LINE__:可以获取当前的代码在当前文件的行数
    echo __LINE__;
    echo '<hr>';
    // __FILE__:它可以获取当前文件的路径 ：目录+文件名
    echo __FILE__;
    echo '<hr>';
    // __DIR__:它可以获取当前文件的目录
    echo __DIR__;
    echo '<hr>';
    // __FUNCTION__:它可以获取当前魔术常量所在的函数
    function test()
    {
        echo __FUNCTION__;
    }
    test();
~~~

### 载入其他文件：文件包含

通常情况下，当一个文件中的代码过长，自然会想到要拆分到多个文件中。随着开发经验的积累，慢慢的会发现，除了文件过程应该拆分文件，更应该做的事情是根据用途去划分。

不管你是怎样想的，核心问题都是一样：怎么将代码拆分到多个文件中？

PHP 中引入其他 PHP 文件有四种方式：

- require
- require_once
- include
- include_once

~~~
// 载入文件:相当于将被载入的文件的代码在当前位置复制一份
    // include:1.如果文件载入失败，也不会影响后续代码的执行  2.如果重复载入文件那么被载入的文件的代码会真正的重复执行
    // include_once:1.如果文件载入失败，也不会影响后续代码的执行 2.如果重复载入文件，最终也只会载入一次
    // require：1.如果文件载入失败，那么后续不再执行  2.如果重复载入文件那么被载入的文件的代码会真正的重复执行
    // require_once:1.如果文件载入失败，那么后续不再执行 2.如果重复载入文件，最终也只会载入一次
~~~

四种方式的对比：

|                    | require | require_once | include | include_once |
| ------------------ | ------- | ------------ | ------- | ------------ |
| 被载入文件如果不存在是否影响继续运行 | Y       | Y            | N       | N            |
| 多次调用是否会重复执行被载入的文件  | Y       | N            | Y       | N            |

总结来说：

- 横向分为两类：require 和 include 两种，区别在于 require 会因为载入文件不存在而停止当前文件执行，而 include 不会。
- 纵向分为两类：xxx 和 xxx_once，区别在于代码中每使用一次 xxx 就执行一次载入的文件，而 xxx_once 只会在第一次使用是执行。

使用层面：

- include 一般用于载入公共文件，这个文件的存在与否不能影响程序后面的运行
- require 用于载入不可缺失的文件
- 至于是否采用一次载入（once）这种方式取决于被载入的文件

### 常用 API

> API（Application Programming Interface）
>
> 接口都是提供某种特定能力的事物，特点是有输入有输出，而我们在开发时（写代码时）用到的接口称之为 API（应用程序编程接口）
>
> 任何编程语言本身并没有太多的能力，具体的能力大多数都来源于 API。

PHP 的能力来源于它有 1000+ 内置函数，不是每一个函数都默认直接可以使用，有一些需要安装或者启用额外的"插件" 扩展。

~~~
 $str = "hello world你好";//11-17
    // strlen():可以获取指定字符串的长度
    // 特点：strlen无法正确的处理中文字符(本质上说是不能处理宽字符集，所谓宽字符集就是指php默认不支持的字符，如中文，日文...),如果碰到宽字符集，它会根据当前宽字符集的编码获取这些字符所占据的字节数
    // GB2312：每个字符占据的2个字节
    // UTF-8：每个字符占据3个字节
    // echo strlen($str);
-----------------------------------------------
    // 获取php环境中的默认编码
    // mb_internal_encoding(); //UTF-8
    // mb_strlen():没有设置编码就使用当前php的默认编码
    // 特点：这个函数默认情况下不能使用，如果想使用就需要添加一个引用
    // php-ini > extension=php_mbstring.dll.打开这个引用，否则无法使用
    ----------------------------------------------------------
    // 这个 函数的结果也与当前php的版本有关系，只有php5.6及以上版本才能够真正获取长度
    echo mb_strlen($str);
~~~

#### 字符串与数组处理 

字符串与数组操作均使用php提供的内置函数，这里仅以几个函数作为示例，后面会有单独的部分进行讲解。

字符串函数

- int strlen ( string $string )
- mixed mb_strlen ( string $str [, string $encoding = mb_internal_encoding() ] )

数组长度

- count()


#### 时间处理

事件处理默认采用格林威治时间(与中国所在的时区相差8个小时)，需要进行设置。

这里我们要修改php的配置文件，timezone 时区

- 时间戳：`time()`
  - 从 Unix 纪元（格林威治时间 1970-01-01 00:00:00）到当前时间的秒数

- 格式化日期：`date()`
  - 获取有格式的当前时间
  - 格式化一个指定的时间戳
  - 可以通过 `strtotime()` 将有格式的时间字符串转换为时间戳

  ~~~
  // time():从 Unix 纪元（格林威治时间 1970-01-01 00:00:00）到当前时间的秒数
      // echo time();
      // 默认情况下这个函数获取的是格林威志时间，如果想获取中国时区的时间，就需要进行配置文件的修改
      // php-ini >date.timezone = PRC|Asia/shanghai|Asia/chongqing
      echo date("Y-m-d H:i:s");
      // strtitime()  将有格式的时间字符串转换为时间戳
      echo "<hr>";
      echo strtotime("1970-1-2");
  ~~~

#### 文件操作

| 函数                                       | 描述        | PHP  |
| ---------------------------------------- | --------- | ---- |
| [file_get_contents()](http://www.w3school.com.cn/php/func_filesystem_file_get_contents.asp) | 将文件读入字符串。 | 4    |
| [file_put_contents()](http://www.w3school.com.cn/php/func_filesystem_file_put_contents.asp) | 将字符串写入文件。 | 5    |
| unlink() 参数：需要删除文件的路径                    |           |      |

> 参考：http://www.w3school.com.cn/php/php_ref_filesystem.asp

~~~
 // 设置当前页面的返回值的类型是图片格式，意味着后期浏览器接收了返回值之后，会按照图片格式进行解析
    // header("Content-Type:text/html");
    // header("Content-Type:image/jpeg");
    // // file_get_contents:读取文件内容，如果读取成功，就会返回一个字符串类型的值（文件内容），如果读取失败，就会返回false
    $res = file_get_contents("data.txt");
    // // var_dump($res);

    // $res = file_get_contents("./images/monkey.png");
    // echo $res;

    // file_put_contents(文件路径，需要写入的内容,FILE_APPEND):将指定的内容写入到文件,同时返回当前成功写入的字符的数量
    // FILE_APPEND:设置当前的写入方式为追加,如果不设置默认写入方式是覆盖
    $count = file_put_contents("data.txt","这是我写入的内容",FILE_APPEND);
    echo $count;
~~~



### 后台接口

根据业务逻辑，决定是否需要返回完整的页面。

如果只需要返回部分数据，我们称为后台接口。拿到后台接口返回的数据，在前端渲染。

写后端接口时，就不要创建html骨架。

- 如果在服务器端里面渲染了页面，称为服务器端渲染。



### 修改chrome中network中后端资源header请求.

-  header('Content-Type:text/html; charset=utf-8')

  ​