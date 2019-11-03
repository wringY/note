## 6.0 Cookie



#### 什么是cookie

![cookie](images\cookie.jpg)



##### 关于cookie的描述

- 因为HTTP协议是无状态的，即服务器不知道用户上一次做了什么，这严重阻碍了交互式Web应用程序的实现。在典型的网上购物场景中，用户浏览了几个页面，买了一盒饼干和两瓶饮料。最后结帐时，由于HTTP的无状态性，不通过额外的手段，服务器并不知道用户到底买了什么，所以Cookie就是用来绕开HTTP的无状态性的“额外手段”之一。服务器可以设置或读取Cookies中包含信息，借此维护用户跟服务器会话中的状态。
- 在刚才的购物场景中，当用户选购了第一项商品，服务器在向用户发送网页的同时，还发送了一段Cookie，记录着那项商品的信息。当用户访问另一个页面，浏览器会把Cookie发送给服务器，于是服务器知道他之前选购了什么。用户继续选购饮料，服务器就在原来那段Cookie里追加新的商品信息。结帐时，服务器读取发送来的Cookie就行了。
- Cookie另一个典型的应用是当登录一个网站时，网站往往会请求用户输入用户名和密码，并且用户可以勾选“下次自动登录”。如果勾选了，那么下次访问同一网站时，用户会发现没输入用户名和密码就已经登录了。这正是因为前一次登录时，服务器发送了包含登录凭据（用户名加密码的某种加密形式）的Cookie到用户的硬盘上。第二次登录时，如果该Cookie尚未到期，浏览器会发送该Cookie，服务器验证凭据，于是不必输入用户名和密码就让用户登录了。

##### cookie小结

​	cookie是一个文件，用来存储当前的一些信息和服务器保持交流

​	在前端介绍的sessionStorage和localStorage也是类似的功能

| 内容      | cookie                                   | localStorage                    | sessionStorage                  |
| ------- | ---------------------------------------- | ------------------------------- | ------------------------------- |
| 生命周期    | 一般由服务器生成，可设置失效的时间，如果在浏览器端生成cookie，默认关闭浏览器后失效 | 除非被删除，否则永久保存                    | 仅在当前会话下有效，关闭页面或者浏览器后被删除         |
| 数据大小    | 4k                                       | 20M                             | 5M                              |
| 与服务器端通信 | 携带在http请求头中，若保存cookie过多数据会带来性能问题         | 仅在客户端即浏览器中保存，不参与和服务器的通信         | 仅在客户端即浏览器中保存，不参与和服务器的通信         |
| 易用性     | 需要程序员自己封装                                | 原生接口可以接受，亦可以再次封装来对obj和Arr有更好的支持 | 原生接口可以接受，亦可以再次封装来对obj和Arr有更好的支持 |



#### 使用cookie

- 语法：secookie(name [, value, expire, path, domain ]);

- expire: 设置cookie中数据的有效期，默认是关闭浏览器。时间是秒, 时间参照php的默认起始时间(1970-1-1) 设置永久的时间（PHP_INT_MAX）。

- path: 设置当前的cookie值，在哪个目录下能访用。设置目录是参照当前网站的根目录（根目录为www）。

  设置父级目录，子目录可以访问，设置子目录，上层不能访问。

    "/" 代表整站可以访问

- domain: 设置当前的cookie值，哪个域名可以访问。

  如：setcookie("userName", "admin","time() + 3066", "/", "a.com")

  只有在a.com以及它下面的子域名才能被访问。

```php
<?php
  	// 创建cookie
  	// setcookie("username", "tylor");  // 可以在请求头中查看
  
	// 判断是否拥有某个指定名称的cookie值 -- $_COOKIE
	if(isset($_COOKIE["username"])) {
      	echo "欢迎回来，朕的小仙女";
	}else {
		echo "大人头一回来，是打尖儿还是住店呀~";
      	setcookie("username", "tylor");
    }
  
?>
```

​	chrome： 设置 => 更多设置 => 内容设置 => cookie    

​	可以看到明文存储的cookie设置的值;



##### cookie的参数

​	cookie的有效期:

```php
<?php
    // 时间是秒, 时间参照php的默认起始时间(1970-1-1)
    // setcookie("username", "tylor", 100);
    setcookie("username", "tylor", time() + 10);

	// 设置永久的时间
	setcookie("username", "tylor", PHP_INT_MAX);

?>
```

​	cookie的有效目录

```php
<?php
    // 在不同的文件夹输出cookie中的键
  	echo $_COOKIE["username"];

	// 通过path可以设置访问权限，参照网站根目录
	setcookie("username", "tylor", PHP_INT_MAX, "/day05/down");
	// 设置父级目录，子目录可以访问，设置子目录，上层不能访问  "/" 代表整站可以访问
	// Domain: 域名  path： 路径   secure：只有在https这类安全的协议下才会发送
	

	// 某网站中显示的cookie
	// set-cookie: ds_user_id=3265153328; Domain=.instagram.com; expires=Wed, 13-Feb-2019 14:19:35 GMT; Max-Age=7776000; Path=/; Secure

?>
```



#### 删除cookie

```php
<?php
  	// 处理删除cookie的php文件
  	
  	// 1.0 怎么创建的就怎么删除的
  	//setcookie("username", "zs", PHP_INT_MAX, "/day05/down"); 最开始是这么创建的。
  	setcookie("username", "", PHP_INT_MAX, "/day05/down");   //需要这么删除
	echo "ok";

	// 2.0 设置一个过期时间，也是可以删除的 
?>
```



##### 关于cookie的缺陷

- Cookie存储的数据类型，只能是字符串。


- Cookie会被附加在每个HTTP请求中，所以无形中增加了流量
- 由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题，除非用HTTPS
- Cookie的大小限制在4KB左右，对于复杂的存储需求来说是不够用的

#### 登录案例

​	使用写好的表单文件, 在头部判断是否为post提交

```php
<?php
  	function login() {
      	// 验证用户数据是否合法
  		if(!isset($_POST["username"]) || trim($_POST["username"]) === "") {
          	$GLOBALS["error"] = "请输入用户名";
          	return;
  		}
  		if(!isset($_POST["password"]) || trim($_POST["password"]) === "") {
          	$GLOBALS["error"] = "请输入密码";
          	return; 
  		}
  
  		// 接收用户数据
  		$username = $_POST["username"];
 		$password = $_POST["password"];
  
  		// 读取文件，进行相应判断
  		$dataArr = json_decode(file_get_contents("users.json"), true);
  		foreach($dataArr as $value) {
          	// 如果下面的条件满足，说明至少用户名是正确的
          	if($value["username"] == $username) {
              	$user = $value;
              	break;
          	}
  		}
  		// 如果这里没有值，告诉用户用户名不存在
  		if(!isset($user)) {
          	$GLOBALS["error"] = "用户名不存在";
          	return;
  		}
        // 能走到这里来，证明$user已经拿到了用户的值  
  		if($user["password"] != $password) {
          	$GLOBALS["error"] = "密码输入错误";
          	return;
  		}
          
  		// 匹配成功跳转至主页，否则回到登录页
  		// !!!!!   将登陆成功的数据，写入到cookie中
  		setcookie("isLogin", true);
  		header("Location:./main.php");
  	}
  
  	// 判断是否为post提交
  	if($_SERVER["REQUEST_METHOD"] === "POST") {
      	login();
  	}
 
?>
```



```php
<?php
  	// 判断当前有没有定义全局成员
  	if(isset($GLOBALS["error"])) {
?>
      	<div class="alert alert-danger" role="alert"><?php echo $GLOBALS["error"] ?></div>
<?php
  	}
?>
```



##### 使用cookie进行判断

​	在跳转的首页去判断用户是否之前登录过

```php
<?php
  	// 约定好判断的名字是什么
  	if($_COOKIE["isLogin"] != true) {
      	header("Location:login.php");
  	}
?>
```



##### 删除cookie值

​	在点击退出登录的页面中，设置跳转到logout.php文件，在此文件中处理删除

```php
<?php
  	// 在删除cookie的时候，要注意它是怎么添加的
  	setcookie("isLogin", "");
	
	// 回去登录页面
  	header("Location:login.php");
?>
```



## 7.0 Session

#### session和cookie的区别

- session 保存在服务器，客户端不知道其中的信息；cookie 保存在客户端，服务器能够知道其中的信息
- session 中保存的是数组，cookie 中保存的是字符串
- session 不能区分路径，同一个用户在访问一个网站期间，所有的session在任何地方都可以访问到。而 cookie 中如果设置了路径参数，那么同一个网站不同路径下的 cookie 互相是不可以访问的
- cookie 不是很安全，本人可以分析存放在本地的 COOKIE 并进行 COOKIE欺骗
- session 会在一定时间内保存在服务器上。当访问增多，会占用你服务器的性能。考虑到减轻服务器性能方面，应该使用 COOKIE
- 单个 cookie 保存的数据不能超过 4k ，很多浏览器都限制一个站点最多保存 20 个 cookie
- session 是通过 cookie来工作的
- session默认是有过期时间，大约20分钟

#### 在php文件中设置session

​	要开启session的功能，才能使用session

```php
<?php
  	// !!! php中默认不能使用session功能，如果需要使用则需要手动设置
	session_start();
	/*  session_start()所做的事情
		1, 在服务器端动态生成一个sessionID
		2, 在服务器端动态生成一个可以存放本次会话数据的文件，文件名以sess_sessionID构成
		3, 通过相应头动态设置cookie， 在cookie中存放了本次会话所生成的sessionID
	*/
  
  	// 创建session  使用超全局变量 $_SESSION["name"] = value;
  	$_SESSION["user"] = Array(
							"name" => "dilireba",
  							"age" => 25
						);
?>
```



![session](images\session.jpg)



##### 发起请求过程

![session-cookie](images\session-cookie.jpg)

- 第一次向服务器发起请求不会存在这些参数
- 服务器创建sessionID存储对应的内容
- 服务器返回参数在cookie中
- 客户端通过返回回来的cookie的值，继续请求
- 服务器根据cookie中sessionID的值找到对应文件处理相关操作

##### session文件存放位置

C:\phpStudy\PHPTutorial\tmp\tmp

![session-local](images\session-local.jpg)

修改配置文件

```php
// 搜索 session.auto_start   将原本的0改为1即可
```



#### session的基本操作

##### 读取session的值

```php
<?php
 	session_start();
	$str = $_SESSION["username"];
?>
```

##### 删除session的值

```php
<?php
  	session_start();

  	// 删除一个session的值
	unset($_SESSION["username"]);

	// 清空session所有的值
	$_SESSION = [];

	// 销毁session文件
	session_destroy();
?>
```



#### 登录案例

##### 步骤1：将原先设置cookie的地方改写为session

```php
<?php
  	...
  
  		// 匹配成功跳转至主页，否则回到登录页
  		/* 
  			!!!!!   将登陆成功的数据，写入到cookie中
  			setcookie("isLogin", true);
  		*/
  		// 写入session数据
  		session_start();
  		$_SESSION["user"] = Array(
								"username" => $_POST["username"],
  								"userpwd" => $_POST["password"],
  								"isLogin" => "yes"
							);
  		header("Location:./main.php");

  	...
?>
```



##### 步骤2：在main文件中判断

```php
<?php
  	session_start();
  	// 判断是否写入了session
  	if(!isset($_SESSION["user"]) || $_SESSION["user"]["isLogin"] !== "yes") {
      	header("Location:login.php");
  	}
?>
```



##### 步骤3：退出登录

```php
<?php
  	session_start();
  	// 删除session
  	unset($_SESSION["user"]);
	
	// 回去登录页面
  	header("Location:login.php");
?>
```



| 区别        | cookie        | session          |
| --------- | ------------- | ---------------- |
| 存储位置      | 浏览器           | 服务器              |
| 浏览器携带的数据量 | 多             | 少（只携带session-id） |
| 存储的数据类型   | 只能是字符串        | 任意类型             |
| 安全性       | 较低            | 较高               |
| 默认的有效路径   | 当前路径及其子路径     | 整站有效             |
| 数据的传输量    | 有限制4k，不能超过20个 | 无限制              |



------

### Cookie和session工作流程图文详解



## JSON

JSON（JavaScript Object Notation） 是一种通过普通字符串描述数据的手段，用于表示有结构的数据。类似于编程语言中字面量的概念，语法上跟 JavaScript 的字面量非常类似。

### 数据类型

- null

  ```json
  null
  ```

- string

  ```json
  "hello json"
  ```

- number

  ```json
  2048
  ```

- boolean

  ```json
  true
  ```

- object

  ```json
  {
    "name": "zce",
    "age": 18,
    "gender": true,
    "girl_friend": null
  }
  ```

- array

  ```json
  ["zhangsan", "lisi", "wangwu"]
  ```

### 注意

1. JSON 中属性名称必须用双引号包裹
2. JSON 中表述字符串必须使用双引号
3. JSON 中不能有单行或多行注释
4. JSON 没有 `undefined` 这个值

### JSON 表述

有了 JSON 这种格式，我们就可以更加容易的表示拥有复杂结构的数据了。

```json
[
  {
    "id": "59d632855434e",
    "title": "错过",
    "artist": "梁咏琪",
    "images": ["/uploads/img/1.jpg"],
    "source": "/uploads/mp3/1.mp3"
  },
  {
    "id": "59d632855434f",
    "title": "开始懂了",
    "artist": "孙燕姿",
    "images": ["/uploads/img/2.jpg"],
    "source": "/uploads/mp3/2.mp3"
  },
  {
    "id": "59d6328554350",
    "title": "一生中最爱",
    "artist": "谭咏麟",
    "images": ["/uploads/img/3.jpg"],
    "source": "/uploads/mp3/3.mp3"
  },
  {
    "id": "59d6328554351",
    "title": "爱在深秋",
    "artist": "谭咏麟",
    "images": ["/uploads/img/4.jpg"],
    "source": "/uploads/mp3/4.mp3"
  }
]
```

## 功能实现

> 在服务端开发领域中所谓的**渲染**指的是经过程序执行得到最终的 HTML 字符串这个过程。

### 列表数据展示（展示类）

- 文件读取
- JSON 反序列化
  - json_decode 需要注意第二个参数
  - 如果希望以关联数组的方式而非对象的方式操作数据，可以将 json_decode 的第二个参数设置为 true
- 数组遍历 foreach
- PHP 与 HTML 混编

### 新增数据（表单类）

```sequence
客户端->服务端: GET /add.php\n获取一个添加音乐的表单
服务端->客户端: 响应一个空的表单页面
Note left of 客户端: 用户填写表单内容
客户端->服务端: POST /add.php\n提交用户数据的内容和选择的文件
Note right of 服务端: 接收并处理提交的数据
服务端->客户端: 跳转回列表页
```



- 表单使用（form action method enctype，input name label for id）
- 服务端表单校验并提示错误消息
  - empty 判断一个成员是否没定义或者值为 false（可以隐式转换为 false）
- 上传文件
  - 文件数量
  - 文件种类
  - 如果需要考虑文件重名的情况，可以给上传的文件重新命名（唯一名称）
- 单文件域多文件上传
  - name 一定 以 [] 结尾，服务端会接收到一个数组
- JSON 序列化
- 文件写入

### 删除数据

- 问号传参

  - 一般情况下，如果需要超链接点击发起的请求可以传递参数，我们可以采用 `?` 的方式

    ```html
    <a href="/delete.php?id=123">删除</a>
    ```

- 数组中查找是否有指定元素

  - `in_array`

- 数组移除元素

  - `array_splice`

#### 关于JSON的小补充



##### JSON数据格式

​	JSON数据格式目前是使用的最多的，用来传递大量数据的文件

```json
[
  	{
      	"title" : "《毒液》",
      	"director" : "tylor swift",
      	"actors" : "Kobe Bryent",
      	"time" : "2020-12-12",
      	"src" : "./upload/xxx.avi"
  	},
  	{
      	"title" : "《觉醒》",
      	"director" : "王家卫",
      	"actors" : "Lebron james",
      	"time" : "2019-1-14",
      	"src" : "./upload/xxx.avi"
  	}
]
```



##### JSON的特点

- 在json格式的文件中，不允许写任何的注释
- 属性和值，必须要使用双引号包含，值为数值或者非字符，没有undefined
- 对应关系
  - 对象 => { }  后期可以将其转换为一个对象
  - 数组 => [ ]  后期可以将其转换为一个数组
- 单个json的数据用对象表示，多个就是上面见到的数组的格式，这种数据类型以后会经常见到

##### JSON的方法

- PHP中操作json的方法

- json_encode()：可以将php数组或者对象转换为json格式的字符串

- json_decode()：可以将json格式的字符串转换为数组或者对象，如果发现json格式的数组以中括号包裹，就可以将字符串转换为数组；如果发现json格式的数组以大括号包裹，就可以将字符串转换为对象

  - 可以设置第二个参数为true代表强制设置为数组

     $arr = json_decode($str, true);

```php
<?php
  	// 要使用JSON里面的数据，首先要去读取数据
  	$str = file_get_contents("movie.json");
	echo $str;
	
	// 这里见到的数组其实是个字符串
	/*
		[
            {
                "title" : "《毒液》",
                "director" : "tylor swift",
                "actors" : "Kobe Bryent",
                "time" : "2020-12-12",
                "src" : "./upload/xxx.avi"
            },
            {
                "title" : "《觉醒》",
                "director" : "王家卫",
                "actors" : "Lebron james",
                "time" : "2019-1-14",
                "src" : "./upload/xxx.avi"
            }
        ]
	*/
	
  	// 读取出的数据，需要转换为最终需要的数据  数组
	// ！！！ json_encode()	
	// 可以将php数组或者对象转换为json格式的字符串
	
	// ！！！ json_decode()
	/* 可以将json格式的字符串转换为数组或者对象，
			- 如果发现json格式的数组以中括号包裹，就可以将字符串转换为数组
            - 如果发现json格式的数组以大括号包裹，就可以将字符串转换为对象
    */
	$arr = json_decode($str);
	print_r($arr);
	/*
		Array(
			[0] => stdclass object (
				[title] => 《毒液》,
                [director] => tylor swift,
                [actors] => Kobe Bryent,
                [time] => 2020-12-12,
                [src] => ./upload/xxx.avi
			)
			[1] => stdclass object (
				[title] : 《觉醒》,
                [director] : 王家卫,
                [actors] : Lebron james,
                [time] : 2019-1-14,
                [src] : [./upload/xxx.avi]
			)
		)
	*/
	// 这里多加一个true代表设置为数组，不然设置为一个对象
	$arr = json_decode($str, true);


	$arr2 = Array(
    	"name" => "tylor",
      	"age" => 32,
      	"gender" => true
    );
	// 转换为json格式的字符串
	$str2 = json_encode($arr2);
	echo $str2;
	/* {
			"name" : "tylor",
			"age" : "20",
			"gender" : true
		}
	*/
?>
```

​	

