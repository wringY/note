# php简要札记

---

## 1.0 GET请求和POST请求  



#### get请求         

​	浏览器向线上服务器请求获取资源的一种方式。

__1.1.1 正常请求资源的方式__

- 在地址栏通过url发起请求
- 标签中src和href属性
- 表单

__1.1.2 通过事件发起的请求__

- 各种类型的搜索框
- 各种详情页面
- 点击分类、分页、导航...等链接



> __get请求在发起的时候有格式，在发起时会携带很多的参数__



​	例如： http://tieba.baidu.com/f?ie=utf-8&fr=bks0000&kw=%E8%BF%AA%E4%B8%BD%E7%83%AD%E5%B7%B4&red_tag=y2377671083



__1.1.3 get请求方式的特点__	

1，get方式在url后面拼接参数，只能以文本的形式传递数据

2，传递的数据很小，4KB左右(不同的浏览器有略微差异)

3，安全性低，因为在发起请求的时候会显示在地址栏

4，速度快，对于安全性要求不高的请求来说

5，携带的数据会保留在浏览器当前页面的缓存中,即使每次后退，会自动从缓存中获取数据。



#### post请求

__1.2.1 post请求方式__

​	post指的是提交数据，一般发送存储，类似于张三给李四邮寄一份礼物;

​	通常会通过form表单内的元素收集好数据之后进行提交和上传，不过必须要在form的method属性中写明提交的方式，不然默认是以get方式

![post](images\post.png)



__1.2.2 post请求提交的特点__

1，post方式安全性较高，不过也有可能被抓包，所以后期需要其他的加密形式

2，传递数据量大，请求数据没有长度的要求，上限默认为8M，可以在配置文件中修改

3，请求不会被缓存，也不会保留在浏览器历史记录中

4，每次后退或者重新打开，注意（但是POST请求携带的数据不会保留在缓存中），会自动发生请求。

使用场景：

>密码等安全性要求比较高的时候，提交的数据量比较大：发布文章、游记、上传文件；



#### 表单处理

创建form-get.php文件

```html
<?php
    // $_GET 可以接收客户端以get方式传递的数据
    // echo $_GET;  关联数组
    print_r($_GET); // Array([userName] => jack [userPwd] => 123)

    echo '我的名称是'.$_GET['userName123'].', 我的密码是'.$_GET['userPwd'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!-- 
        action: 设置提交数据的处理页面，是一个后台文件的地址
        method：如果没有设置，默认请求方式为 get
                get 一般用来获取数据, 参数会在url中拼接
                post 一般用来发送数据到服务器
     -->
 
    <form action="form-get.php" method="get">
        <!-- 
            ！！！ 如果提交表单元素，一定要保证元素有name属性
            提交的时候，在浏览器地址栏就会自动生成key值
         -->
        用户名： <input type="text" name="userName"> <br>
        密码： <input type="password" name="passWord"> <br>
        <input type="submit"> <br>
    </form>
</body>
</html>
```



#### get使用-完成水果详情页

​	从列表页，点击跳转到详情页

​	final.php  =>  最终展示页面

​	getList.php  =>  操作和渲染数据页面

​	detail.php  =>  详情页面



##### 步骤1：修改详情页面的后缀名为.php

​	在getList.php操作和渲染数据页面的时候，给a链接添加跳转页面的地址和动态id

```php
<?php
  	...
	foreach($result as $value) {
?>
      <li>
          <img src="<?php echo $value[1] ?>" alt="" />
          <a href="./detail.php?id=<?php echo $value[0] ?>"><?php echo $value[2] ?></a>
      </li>
   
<?php
	}
?>
```

##### 步骤2：修改detai.php里面显示内容

​	在页面最顶部使用$_GET接收参数

```php
<?php
  	$id = $_GET["id"];  // 接收id号

	// 读取文件
	$str = file_get_contents("fruit.txt");
	$arr = explode("\n", $str);
	
	// 遍历数组，再次分割
	foreach($arr as $key => $value) {
      	// 以名称中括号的方式，如果数组不存在就先创建数组，如果存在就直接追加
      	$result[] = explode("|", $value);
	}
	
	// 遍历，查找对应商品号的商品
	foreach($result as $value) {
      	// 如果id号对应，则查找到对应商品
      	if($id == $value[0]) {
          	// 将查找的结果，存储到一个新的变量
          	$data = $value;
          	break;
      	}
	}
	// print_r($data)
?>
```

##### 步骤3：修改详情页面文件内容

​	替换结构部分

```php
<li>
	<img src="<?php echo $data[1] ?>" alt="" />
	<p> <?php echo $data[2] ?></p>
</li>
```



#### 使用post方式实现

​	需要将form表单中的属性更改，将method属性设置为post，将action属性改变地址

​	当前的文件名称为 form-post.php 

```html
<form action="form-post.php" method="post">
	<!-- 
    	！！！ post请求不会在地址栏
    -->
    用户名： <input type="text"> <br>
    密码： <input type="password"> <br>
    <input type="submit"> <br>
</form>
```

​	在当前文件的最顶部用 $_POST来接收发送的值

```php
<?php
  // !!! 判断当前用户是否发送了请求，	是否是以post方式
  // 因为post请求，在页面刷新和后退时，会被重新提交。
  // print_r($_SERVER); 很大一串关联数组， REQUEST_METHOD
  if($_SERVER['REQUEST_METHOD'] === 'POST') {
    	echo '我的名称是'.$_POST['userName123'].', 我的密码是'.$_POST['userPwd'];
  }
?>
```



>__$_REQUEST 这个能接收到get或者post两者任何一种方式提交的数据__

​	** 效率低下，（它的取值）受配置文件的影响，不怎么推荐使用

request_order = "GP"，如果页面中就有GET请求又有POST请求而且某些键值相同，那么POST会把GET中键值相同的数据覆盖掉。



|          | get                                      | post                                     |
| -------- | ---------------------------------------- | ---------------------------------------- |
| 后退按钮/刷新  | 无害                                       | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）              |
| 书签       | 可收藏为标签                                   | 不可收藏为书签                                  |
| 缓存       | 能被缓存                                     | 不能缓存                                     |
| 编码类型     | application/x-www-form-urlencoded        | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码 |
| 历史       | 参数保留在浏览器历史中                              | 参数不会保存在浏览器历史中                            |
| 对数据长度的限制 | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符） | 无限制                                      |
| 对数据类型的限制 | 只允许 ASCII 字符                             | 没有限制。也允许二进制数据                            |
| 安全性      | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分,在发送密码或其他敏感信息时绝不要使用 GET ！ | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中 |
| 可见性      | 数据在 URL 中对所有人都是可见的                       | 数据不会显示在 URL 中                            |





#### 表单收集数据的说明

- 由于text类型的表单元素，是根据name属性生成键值，其输入的内容（value属性）生成value值。
- 但是其他类型的表单元素，收集数据的方式需要做特殊的处理。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!-- 
action:就是提交的目标地址 $_SERVER["PHP_SELF"]:可以获取当前文件的路径.它可以自动的获取当前文件的路径，避免由于文件名称或者路径改变带来的手动修改代码的问题
        method:get|post
     -->
    <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="get">
        用户名： <input type="text" name="userName"> <br>
        密码： <input type="password" name="userPwd"> <br>
  <!-- 系统会自动的收集当前表单元素的value值
      1。默认情况下，会收集当前被选择的单选按钮的值，只不过这个值默认都是on
      2.我们也可能为单选按钮设置value属性，那么在数据收集的时候就会将当前的value属性的值进行提交
      -->
      	性别：<input type="radio" name="gender" value="1"> 男  
      		 <input type="radio" name="gender" value="0"> 女  <br>
   <!-- 对于 复选框，重点掌握传递多个值的情况
            1.如果多个复选框的名称一样，那么就只会默认传递最后一个选项值
            2.如果需要传递所有被选择的复选框的数据，那么可以在name属性值后面添加[],如果添加了[],那么系             统会默认收集所有被选择的复选框的值，存储到一个数组中
        -->
      	爱好：<input type="checkbox" name="hobby[]"  value="code"> 写代码 
      		 <input type="checkbox" name="hobby[]"  value="reading"> 看书  <br> 
      <!-- 对于下拉列表，如果没有设置value属性，那么默认会传递当前被选择option的innertext 
        但是如果设置了value属性，那么就会传递value属性-->
      	<select name="subject" id="">
          	<option value="1">前端</option>
          	<option value="2">JAVA</option>
          <option value="3">IOS</option>
      	</select>
      
        <input type="submit"> <br>
    </form>
</body>
</html>
```

#### GET、POST请求优化

一般来说，根据业务逻辑我们需要判断，用户是否发送了请求，

- GET请求，一般判断是否有某个指定的键值。
- POST请求，一般判断$_SERVER['REQUEST_METHOD']。


---



## 2.0 文件上传操作

​	文件上传遵循的流程：

​		选取文件提交   ==>  存入服务器暂存区(如果没有后续操作，那么在暂存区的文件在程序运行结束后自动删除)  ==>   有后续操作后存入到服务器。

#### 步骤1：在表单中提交

```php
// !!! 在php中文件上传必须得是post请求
/*
	1, 必须给表单设置enctype属性
		application/x-www-form-unlencoded    将参数编码为键值对的格式，标准格式
			(UTF-8 GBK GB2312)  用来处理字符串，默认的编码格式 
		multipart/form-data   专门用来处理特殊文件，比如文件
*/
<form action=<?php echo $_SERVER['PHP_SELF'] ?> method="post" enctype="multipart/form-data">
  	文件选择： <input type="file" name="myFile"> <br>
  	<input type="submit">
</form>
```



#### 步骤2：在php代码中接收

```php
<?php
  	// 在php中，上传之后的相关信息都存储在 $_FILES 超全局变量中
  	print_r($_FILES)
  	/*
  		Array(
  			[myFile] => Array(
  				[name] => xxx.jpg   (源文件的名称)
  				[type] => image/png  (源文件的类型)
  				[tmp_name] => C:\windows\phpE412.tmp   (服务器临时保存文件的路径)
  				[error] => 0    0 代表没有错误
  				[size] => 256436   文件大小
  			)
  		)
  	*/
  
  // 使用一个方法来实现文件的移动，否则文件将在程序结束后被自动遗弃
  // move_uploaded_file(源文件的全路径, 目标文件的全路径)
  // 文件夹是手动创建的
  move_uploaded_file($_FILES["myFile"]["tmp_name"], "./upload/temp.png")
?>
```

#### 补充说明(1)

​	由于发送的是post请求，结果文件一打开的时候就开始了一些操作，发现报错了

​	所以，在打开文件的时候，还得需要一些判断

```php
<?php
  	// 判断当前的数组是否为空，为空则不进入
  	if(!empty($_FILES)) {
      	move_uploaded_file($_FILES["myFile"]["tmp_name"], "./upload/temp.png")
  	}
?>
  
// !!!通过表单元素的属性，限制文件上传的格式
  
// 1, 在表单元素中可以限制
//accept属性：限制文件的后缀名称，如果需要限制多个以逗号分隔。
<input type="file" accept=".jpg,.png" /> 
  
// 2, 在后端进行判断
<?php
  	if(!empty($_FILES)) {
      	
      	$type = $_FILES["myFile"]["type"];
      	// *****  strpos(源字符，搜索字符)  可以获取指定字符串在源字符中第一次出现的索引
      	if(strpos($type, "image/") === 0) {
          	move_uploaded_file($_FILES["myFile"]["tmp_name"], "./upload/temp.png");
      	}else {
          	echo "您选择的不是一张图片";
      	}
  	}
?>
```

​	服务器端结束数据的文件名称不应该固定，设置合理的文件名称。

​	如果两次上传的文件重名了，然后会覆盖之前的文件，生成随机的文件名称。

设置合理的文件名称：

        1.生成一个随机的文件名称
            $filename = $_FILES["myfile"]["name"];
            // 获取当前文件的扩展名 strrchr(源字符串，指定搜索的字符)
            $extension = strrchr($filename,".");
            // 生成一个随机的文件名称：获取到一个唯一值
            // 为了防止两个客户在同一时间，提交了文件，造成文件名重名，我们再加一个保险（随机数）。
            $myname = time().rand(1000,9999).$extension;
            move_uploaded_file($_FILES["myfile"]["tmp_name"],"./upload/".$myname); 
```php
<?php
  	// 获取当前文件的名称
  	$fileName = $_FILES["myFile"]["name"];
  	// 拼接文件的名称
  	// move_uploaded_file($_FILES["myFile"]["tmp_name"], "./upload/".$fileName);
  	// ？？？？ 如果两次都是一个名字，很有可能重名，然后会覆盖之前的文件

	// 生成随机数，时间是唯一的
	// $myname = time();

	// strrchr(源字符串，指定搜索的字符串)
	$extension = strrchr($fileName, "."); // 如果是 demo.png , 就能获取到后面的 .png
	$myname = time().rand(1000, 9999).$extension; // 得到一个随机的唯一的值, 还带扩展名
?>
```

| 方法                    | 作用                  | 示例                               |
| --------------------- | ------------------- | -------------------------------- |
| move_uploaded_file( ) | 移动文件                | move_uploaded_file(文件存储位置, "路径") |
| strpos(源字符, str)      | 搜索字符在源字符第1次出现的索引，数值 | strpos($type, "image/")          |
| strrchr(aa, ".")      | 获取当前符号及其右侧所有的字符串    | strrchr($fileName, ".")          |
| rand(1000, 9999)      | 获取随机数               |                                  |

#### 补充说明(2)

​	当上传的文件比较大的时候，会出不来想要的效果

​	而此时，得到的$_FILES数组中，error指向的值为1

根据查询手册得知，这里的意思指的是，上传的文件超出了大小

​	如果需要修改大小的范围，需要修改配置文件

![strlen](images\strlen.jpg)

​	搜索相关的信息

​	![maxload](images\maxload.jpg)

​	得到对应的位置之后，发现默认为2M的大小

![modefieLoad](images\modefieLoad.jpg)



​	修改完毕之后，一定要记得重启服务器!!!

​	

​	服务器对每一次post请求传递做了限制，默认为8M

​	可以修改配置文件php.ini，改大对应的值，搜索post_max_size

![strlen](images\strlen.jpg)

​	在文件中搜索

![post_max_size](images\post_max_size.jpg)



​	找到位置后，该变原有的大小

![modefieSize](images\modefieSize.jpg)



#### 补充说明(3)

同时上传多个文件

- 设置多文件选择，但是它只是能够选择多个文件，传递给服务器的文件数据只是后面的那个文件。如果在设置了multiple属性的时候，需要传递多个文件给服务器，那么只需要在name属性值后面添加[]。

        也可以添加多个表单元素，同时也需要在名称后面添加[]
            <input type="file" name="myfile[]">
            <input type="file" name="myfile[]">
```html
<!-- 在选择的表单元素中加入multiple, 则可以选中多个文件 -->
<input type="file" name="myfile" multiple>
```



> __1.0 如果需要后端服务器的 $_FILES 接收多个文件，则需要在name属性值后面加上[ ]__

```php
<input type="file" name="myfile[]" multiple>
```

> __2.0 实现完成效果__

```php
<?php
  /*
  	Array(
  		[myfile] => Array(
  			[name] => Array(
  				[0] => 11.png
  				[1] => 111222.jpg
  			)
  			[tmp_name] => Array(
  				[0] => C:\Windows\phpc51.tmp
  				[1] => C:\Windows\phpc62.tmp
  			)
  		)
  	)
  */
  
  if(!empty($_FILES)) {
    	// 获取扩展名的数组
    	$nameArr = $_FILES["myfile"]["name"];
    	$pathArr = $_FILES["myfile"]["tmp_name"];
    	foreach($pathArr as $key => $value) {
          	// 获取唯一的图片名称
          	$name = time().rand(1000, 9999).strrchr($nameArr[$key], ".");
          	// 将文件存储到永久目录  move_upload_file
          	move_upload_file($value, "./upload/".$name);
    	}	
  }
?>
```



---



## 3.0 注册案例

> 综合性案例

#### 基于文件的注册

​	直接使用写好的结构代码进行修改

​	将静态的文件修改为动态的文件



##### 步骤1：在form表单中增加action属性

```php
    <form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="post" enctype="multipart/form-data">
        姓名：<input type="text" name="username">
        昵称：<input type="text" name="nickname">
        年龄：<input type="text" name="age">
        电话：<input type="text" name="tel">
        性别：<input type="radio" name="gender" value="男" checked>男
             <input type="radio" name="gender" value="女" >女
             <br>
        班级：<select name="class" >
                <option value="1">黑马1期</option>
                <option value="2">黑马2期</option>
                <option value="3">黑马3期</option>
             </select>
        头像： <input type="file" name="photo" >
        <input type="submit" value="添加信息">
    </form>
```



##### 步骤2：判断是否提交post请求

```php
<?php
  	
  	if($_SERVER["REQUEST_METHOD"] == "POST") {
    	print_r($_POST);
  	}
?>
```



##### 步骤3：验证用户填写的内容

```php
<?php
  	if($_SERVER["REQUEST_METHOD"] == "POST") {
    	// 判断当前用户是否输入了用户名  或者 填入的是否为一个空字符串
      	if(!isset($_POST["username"]) || $_POST["username"] === "") {
          	echo "请输入姓名";
          	return;
      	}
  	}
?>
```

.

- 如果在php结构中直接写return,那么当运行到return代码的时候，整个php文件的执行就结束了。
- 2.如果在方法中写return,那么这个return就只能结束这个方法的执行。



```php
<?php
  	// 使用函数声明
  	function register() {
      	// 判断当前用户是否输入了用户名  或者 填入的是否为一个空字符串
      	if(!isset($_POST["username"]) || $_POST["username"] === "") {
          	echo "请输入姓名";
          	return;
      	}
  		if(!isset($_POST["nickname"]) || $_POST["nickname"] === "") {
          	echo "请输入昵称";
          	return;
      	}
  	}	
  
  
  	if($_SERVER["REQUEST_METHOD"] == "POST") {
    	register();
  	}

	// 去掉空格
	// trim($_POST["username"])
?>
```



##### 步骤4：数据的写入

​	明确数据的格式，在txt文档中，按照竖直线和换行分割

| 方法                  | 作用                    |
| ------------------- | --------------------- |
| implode( )          | 将数组以某个分割符进行拼接，返回一个字符串 |
| explode(”\|“, $str) | 将字符串以某个符号进行分割，返回一个数组  |
|                     |                       |



```php
<?php
  	// 使用函数声明
  	function register() {
      	// 判断当前用户是否输入了用户名  或者 填入的是否为一个空字符串
      	if(!isset($_POST["username"]) || trim($_POST["username"]) === "") {
          	echo "请输入姓名";
          	return;
      	}
  		if(!isset($_POST["nickname"]) || trim($_POST["nickname"]) === "") {
          	echo "请输入昵称";
          	return;
      	}
  
  		$str = implode($_POST, "|");
  		echo $str;
  	}	
  
  
  	if($_SERVER[REQUEST_METHOD] == "post") {
    	register();
  	}
?>
```



​	实现图片的上传操作

```php
<?php
  	// 判断图片上传操作是否成功
  	if(empty($_FILES) || $_FILES["photo"]["error"] != 0) {
      	echo '图片上传失败';
      	return;
  	}

	// 图片上传成功，需要获取上传成功之后的图片名称
	$picName = $_FILES["photo"]["name"];
	$ext = strrchr($picName, '.');
	$finaName = time().rand(1000, 9999).$ext;
	// 将这个文件名添加到 $_POST中
	$POST[] = $finaName;
	
  	$str = implode($_POST, "|");
	
	// !!! 最后一步，将数据写入到文件
  	file_put_contents("data.txt", $str."\n", FILE_APPEND);
?>
```

















