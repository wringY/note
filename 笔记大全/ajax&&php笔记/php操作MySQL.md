# PHP操作MySQL

如何在 PHP 代码中操作数据库是我们能否在自己的程序中使用数据库的核心。

如果需要使用 MySQLi 扩展，需要在 php.ini 文件中打开这个扩展（解除注释）

- ​

#### 创建连接

- 我们在使用php操作mysql数据库的时候必须要建立php与mysql的连接。

- mysqli_connect()，连接数据库，功返回一个连接对象资源，失败返回false。

- @mysqli_connect(); 当连接失败时，会屏蔽默认的报错信息。

- 参数：主机名、用户名、密码、数据库名

  我们利用Navicat for sql 创建连接，参数一致。

- 额外补充两个php函数：

  - die("提示信息"); 该函数会输出指定的字符串，同时退出。相当于echo "提示信息" 与return;的作用。
  - mysqli_error($conn);它可以输出最近一条sql语句在执行时所产生的错误信息。

~~~php
mysqli_connect(); //连接数据库，功返回一个连接对象资源，失败返回false
////失败的情况
// Access denied for user 'root'@'localhost' (using password: YES)：密码错误
// Access denied for user 'root1'@'localhost' (using password: YES)：用户名错误
// mysqli_connect():：这种错误一般是服务器相关的错误

-------------------------------------
  // 假定数据库用户名：root，密码：123456，数据库：baixiu
$connection = mysqli_connect("localhost", "root", "123456", "baixiu");
if (!$connection) {
  // 如果连接失败报错
  die('<h1>Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error() . '</h1>');
}
~~~

#### 设置sql编码

- 我们需要设置sql的编码方式，避免在有中文的情况下出现乱码。

- 有两种方式：

  - mysqli_set_charset(连接对象，编码格式字符串); 设置数据库的编码方式  utf8，没有中间的 “-”。
  - mysqli_query($conn,"set names utf8");设置数据库的编码方式  utf8，没有中间的 “-”

  ~~~php
  mysqli_set_charset($conn,"utf8");
  //set names utf8:设置编码格式为utf8
  mysqli_query($conn,"set names utf8")
  ~~~

#### 创建sql语句

- 我们需要写sql的语句，大多数是增删改查。

- php中sql语句是字符串类型。

- sql中数值如果是字符串类型需要加引号，单身双引号均可。

- 注意：如果sql语句中某字段的值为字符时需要加引号,可以采用花括号+单引号的方式。

  ~~~
  "insert into userInfo values(null,'{name}','{img}','{gender}','{birthday}')"
  ~~~

  ​

  ~~~php
  //增加
  $cre= "insert into mytable(name) values ("张三") where id = 2";
  //删除
  $del = "delete from mytable where id = 2";
  //改变
  $update = "update mytable set age = age + 1 where id = 2 or id =4";
  //查询
  $create = "select * from mytable where id = 2";
  ~~~

#### 执行sql语句

- php中通过mysqli_query()，来执行sql语句。


- mysqli_query("连接对象", "sql语句")，第一个参数是连接对象，第二个是sql语句字符串，适用所有的sql语句。
- mysqli_query()的返回值有以下情况
  - sql语句是增、该、删：返回值是true或false。
  - sql语句是查询操作的话返回是一个结果集
    - 这个结果集有可能为空
- 我们需要对结果集进行空值的判断
  - mysqli_num_rows($result): 获取结果集中的数据行数

~~~php
$result = mysqli_query($conn,$sql);
    // 1.判断本次查询是否成功
    if(!$result){
        die("查询失败");
    }
    // 判断结果集中是否有数据  mysqli_num_rows(结果集)可以获取当前结果中数据行数
    else if(mysqli_num_rows($result) == 0){ //说明查询到了结果集，但是结果集为空
        die("结果集为空");}else {
      die("结果集不为空");
    }
~~~

#### 获取结果集中的数据

- 参数为查询语句返回的结果集。


- 下面这几个函数有一个共同的特点，就是只能读取这一行，但是读取完这一行之后，会自动的将指针移到下一行,如果没有读取到任何的数据，则返回null

  - mysqli_fetch_array: 提取数据生成一个数组.同时生成索引数组和关联数组两种形式

  ​        mysqli_fetch_assoc:提取数据生成一个数组:将数据生成关联数组
  ​        mysqli_fetch_row:提取数据生成一个数组，将数据生成为索引数组

  -  我们可以设置mysqli_fetch_array的第二个参数，来指定生成哪种形式的数组

     mysqli_fetch_array(结果集资源，返回的内容的形式 MYSQL_ASSOC | MYSQL_NUM | MYSQL_BOTH)
       MYSQL_ASSOC是个常量需要大写：将数据生成关联数组。 MYSQL_NUM：将数据生成为索引数组
       MYSQL_BOTH：同时生成索引数组和关联数组两种形式。

- 一次性获取结果集中的数据行：

  -  mysqli_fetch_all();第一个参数是查询语句返回的结果集,第二个参数是返回的内容的形式 MYSQL_ASSOC | MYSQL_NUM | MYSQL_BOTH。

```php
      // 获取数据的函数:下面这几个函数有一个共同的特点，就是只能读取这一行，但是读取完这一行之后，会自动的        将指针移到下一行,如果没有读取到任何的数据，则返回null
        // mysqli_fetch_array(查询语句返回的结果集):提取数据生成一个数组.同时生成索引数组和关联数组两种形式
        // mysqli_fetch_assoc:提取数据生成一个数组:将数据生成关联数组
        // mysqli_fetch_row:提取数据生成一个数组，将数据生成为索引数组
        // print_r(mysqli_fetch_array($result)) ;
        // print_r(mysqli_fetch_assoc($result)) ;
        // print_r(mysqli_fetch_row($result)) ;
        // mysqli_fetch_array(结果集资源，返回的内容的形式 MYSQL_ASSOC | MYSQL_NUM | MYSQL_BOTH)

--------------------------
  //一次性获取结果集中的数据行
   mysqli_fetch_all("$result");
```

#### 关闭连接

- 及时的关闭连接对象，释放资源:什么时候释放：当与mysql相关的操作执行完毕之后就立刻释放。
  - mysqli_close($conn); 参数是连接对象。

## 用户管理案例

基于数据库的增删改查

### 用户查询与删除功能

![user](media/user.png)

### 用户新增与修改功能

![user-add](media/user-add.png)
