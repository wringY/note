 ## web开发框架 Express
- Node.js的Web开发相关的内容：
    1、Node.js不需要依赖第三方应用软件（Apache），可以基于api自己实现
    2、实现静态资源服务器
    3、路由处理
    4、动态网站
    5、模板引擎
    6、get和post参数传递和处理
- 以上逻辑从开发角度来讲有些麻烦，为了我们使用Express框架，这个框架主要是完成上面的功能。
### 安装express
- express是基于nodejs的框架，我们按照了nodejs，可以直接使用包管理工具npm进行安装。
  npm install express --save。
### 使用express

- 引入express的时候是一个函数。这个函数上也有一些api（如静态托管）
- 我们通常需要调用这个函数，得到一个对象。去调用这个对象上的api（如中间件）。

### express的快捷方式

- send也是可以结束一次请求。

1. `res.send()`
   1. 支持 发送 字符串 `Content-Type: text/html;`
   2. 支持 发送 对象 或 数组 自动设置类型。`Content-Type: application/json`
   3. 支持 发送 Buffer 此时会当作文件下载；
2. `res.sendFile()`
   - 用法1：`res.sendFile(path.join(__dirname, './view/index.html'))` 传递一个绝对路径
   - 用法2：`res.sendFile('./view/movie.html', { root: __dirname })` 也可以传入一个相对路径，第二个参数是对象指定了这个文件在服务器的路径。
   - 注意：`res.sendFile()` 可以向浏览器发送 静态页面；

### 中间件

#### 什么是中间件

- 中间件的概念：中间件：就是请求处理过程中的一个环节（本质上就是一个函数）
- Express是一个路由和中间件Web框架，它具有自己的最小功能：Express应用程序本质上是一系列中间件函数调用。
- 中间件函数是可以访问请求对象 （req），响应对象（res）以及应用程序的请求 - 响应周期中的下一个中间件函数的函数。下一个中间件函数通常由名为的变量表示next。
- 中间件功能可以执行以下任务：
  执行任何代码。
  更改请求和响应对象。
  结束请求 - 响应周期。
  调用堆栈中的下一个中间件函数。

#### 中间件的原理

- 中间件其是一个函数，在响应发送之前对请求进行一些操作。

  ~~~
  function middleware(req,res,next){
      // 做该干的事

      // 做完后调用下一个函数
      next();
  }
  ~~~

- 这个函数有些不太一样，它还有一个next参数，而这个next也是一个函数，它表示函数数组中的下一个函数。

- 函数数组：express内部维护一个函数数组，这个函数数组表示在发出响应之前要执行的所有函数，也就是中间件数组使用`app.use(fn)`后，传进来的`fn`就会被扔到这个数组里，执行完毕后调用`next()`方法执行函数数组里的下一个函数，如果没有调用`next()`的话，就不会调用下一个函数了，也就是说调用就会被终止。

- 自己实现一个实现简单的Express中间件。

  ~~~javascript
  /**
   * 仿照express实现中间件的功能
   *
   * Created by BadWaka on 2017/3/6.
   */

  var http = require('http');

  /**
   * 仿express实现中间件机制
   *
   * @return {app}
   */
  function express() {

      var funcs = []; // 待执行的函数数组

      var app = function (req, res) {
          var i = 0;

          function next() {
              var task = funcs[i++];  // 取出函数数组里的下一个函数
              if (!task) {    // 如果函数不存在,return
                  return;
              }
              task(req, res, next);   // 否则,执行下一个函数
          }

          next();
      }

      /**
       * use方法就是把函数添加到函数数组中
       * @param task
       */
      app.use = function (task) {
          funcs.push(task);
      }

      return app;    // 返回实例
  }

  // 下面是测试case

  var app = express();
  http.createServer(app).listen('3000', function () {
      console.log('listening 3000....');
  });

  function middlewareA(req, res, next) {
      console.log('middlewareA before next()');
      next();
      console.log('middlewareA after next()');
  }

  function middlewareB(req, res, next) {
      console.log('middlewareB before next()');
      next();
      console.log('middlewareB after next()');
  }

  function middlewareC(req, res, next) {
      console.log('middlewareC before next()');
      next();
      console.log('middlewareC after next()');
  }

  app.use(middlewareA);
  app.use(middlewareB);
  app.use(middlewareC)
  ~~~
#### 中间件的应用场景


- 当一个业务逻辑中需要处理复杂的逻辑和业务时，为了能够明确业务、方便维护，我们需要把业务划分成许多更具体的部分，中间件的作用就是如此。
- 把处理的事情分一下，分配成几个部分来做，而每个部分就是一个中间件。

#### 中间件的分类以及对象的api

- 中间件都是引入express（其实是函数）调用---得到的对象上的api。假设这个对象为app

##### 应用中间件 （使用中间件）

- 对应的api是 use。app.use 、app.get 、app.post、app.delete、app.put等
- 加载用于处理http请求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理。
- 语法参数：app.use（[path，] callback [，callback ...])
- 参数详解：
  - path。调用中间件函数的路径。默认是：'/'（根路径）。通过这个参数来**规定哪些请求路径可以调用中间件函数**。默认是所有整个目录。
  - callback回调函数。
- 如何使用app.use实现一次简单请求和响应。

~~~javascript
//第一个参数可以不写，默认是 '/'
//这样不论是哪个请求路径（只要是指定的域名和端口号），那么都会被成功响应。
app.use('/',(req,res)=>{
    res.end('hello');
    
}).listen(3000, ()=>{
    console.log('running...');
});
---------------------------------------
//如果我们获得监听的地址和端口号，可以 var server = app.listen(3000, "localhost", function() {})
//得到一个对象server，调用server.address()会得到一个对象，这个对象中有当前监听路径的信息（地址、端口号等）
var server = app.listen(3000, "localhost", function() {
    // 监听的域名或者IP
    var host = server.address().address;
    // 监听的端口
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
~~~
- 如何使用app.use来挂载中间件函数，如何挂载中间件函数，就是在回调函数中添加第三个参数**next**

- 然后再逻辑处理完毕后，**调用next() ,相当于把请求传递给下一个中间件** ，否则请求将会被挂起。

- 同时**如果同一个路径挂载了多个中间件**，**如果其中一个中间件结束了响应（res.end()），那么后续中间件不会被执行**。

  ~~~javascript
  const express = require('express');
  const app = express();
  //在http请求中挂载中间件
  app.use('/mm:id',(req,res,next)=>{
      console.log('a');  
      //把请求传递给下一个中简件
      next();
  });
  app.use('/mm:id',(req,res,next)=>{
      console.log('b');  
      next();
  });
  app.use('/mm:id',(req,res,next)=>{
      console.log('c');  
      next();
  });
  app.use('/mm:id',(req,res,next)=>{
      console.log('d');  
      next();
  });
  app.use('/mm:id',(req,res,next)=>{
      console.log('e');  
      res.end('over');
  });
  app.listen(3000,()=>{
      console.log('running...');
      
  });

  ~~~
##### 路由器级中间件

- 路由器级中间件的工作方式与应用程序级中间件的工作方式相同，只不过它被绑定到一个实例express.Router()。
- 我们可以使用route.get路由操作api，挂载路由中间件。
- 我们可以一个路由中挂载多个中间件，直接多写几个中间件函数即可。
- 我们可以使用next('route')进行跳转到下一个路由，下一个路由是指下一个路由api代码。

~~~javascript
const express = require('express');
const app = express();
//指定请求方式：如get post put delete
// app.get('/abc',(req,res,next)=>{
//     console.log(1);
//     next();
// });
// app.get('/abc',(req,res,next)=>{
//     console.log(2);
//     next();
// });
// app.get('/abc',(req,res,next)=>{
//     console.log(3);
//     res.end('over');
// });
// app.listen(3000, ()=>{
//     console.log('running...');
// });
// --------------上面的挂载中间件的方法，有很多的代码重复，我们可以使用简写语法------
// app.get('/abc',(req,res,next)=>{
//     console.log(1);
//     next();
// },(req,res,next)=>{
//     console.log(2);
//     next();
// },(req,res,next)=>{
//     console.log(3);
//     next();
// },(req,res,next)=>{
//     console.log(4);
//     res.end('over')
// }
// );
// app.listen(3000, ()=>{
//     console.log('running...');
// });
//-------------------------------------------可以传递一个数组进去----------
//可以我们。
//这应该是最优的方式了。
let cb0 = function(req, res, next) {
    console.log(0);
    next(); 
}
let cb1 = function(req, res, next) {
    console.log(1);
    next(); 
}
let cb2 = function(req, res, next) {
    console.log(2);
    next(); 
}
let cb3 = function(req, res, next) {
    console.log(3);
   res.end('over');
}
app.get('/abc',[cb0,cb1,cb2,cb3]);
app.listen(3000, ()=>{
    console.log('running');
    
});
~~~

#####错误处理中间件

- 错误处理中间件总是需要四个参数。您必须提供四个参数以将其标识为错误处理中间件函数。即使您不需要使用该next对象，也必须指定它以维护签名。否则，该next对象将被解释为常规中间件，并且将无法处理错误。
- 以与其他中间件函数相同的方式定义错误处理中间件函数，除了四个参数而不是三个，特别是签名(err, req, res, next)）。

~~~javascript
pp.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
~~~

#####内置中间件

- 内置中间件，我们使用的express.static就是属于内置中间件。

#####第三方中间件

- 使用第三方中间件为Express应用程序添加功能。
  安装Node.js模块以获得所需的功能，然后在应用程序级别或路由器级别将其加载到您的应用程序中。
- 以下示例说明了安装和加载cookie解析中间件功能cookie-parser。
  npm install cookie-parser

~~~
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
~~~

- 我们在这里使用body-parser 第三方中间件。

npm install body-parser --save

### 利用express托管静态页面

- 我们已经利用nodejs原生的api完成了静态服务器的功能，就是可以通过url地址来访问我们的静态资源。
- 现在express可以帮助我们实现这个功能。
- 这个功能是express函数的一个方法，不是其调用得到的对象app上的方法。
- use方法的第一个参数可以指定一个虚拟路径。
- 可以指定多个目录作为静态资源目录，多次调用use方法即可，为了区分我们给每个use方法添加上一个唯一的虚拟路径。
   **如果我们不添加虚拟路径，那么就会根据静态资源文件托管的顺序（也就是use代码的顺序）进行查找，如果有同名的文件，会造成某些文件无法访问到**。
~~~javascript
//假设我们有一个文件夹public，里面存放着静态资源（图片、html、js等）。
//托管静态资源
const express = require('express');
const app = express();
//express.static里面的参数是静态资源文件夹
let server = app.use(express.static('public'));
server.listen(3000,()=>{
    console.log('running....');
});
//现在我们就可以访问public目录中的所有文件。
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
-----------------------------
//同时我们可以添加一个虚拟路径前缀,如abc，这个文件夹是不存在的，所以是虚拟的。这样我们在访问静态资源的时候就需要添加上这个虚拟前缀了。
const express = require('express');
const app = express();
//express.static里面的参数是静态资源文件夹
let server = app.use('/abc',express.static('public'));
server.listen(3000,()=>{
    console.log('running....');
});
-----------------------
指定多个目录作为静态资源目录，多次调用use方法即可，为了区分我们给每个use方法添加上一个唯一的虚拟路径。
app.use('/abc',express.static('public'));
app.use('/nihao',express.static('hello'));
app.listen(3000,()=>{
    console.log('running...');
});
~~~
### 路由处理（route）
- 对于动态网站，在请求时我们都是url路径（这个路径中通常不包含.html等文件名）和参数的形式发起请求。
- 请求的url路径 + 请求模式 就构成了路由。
- 路由的作用：根据请求路径和请求方式进行路径分发处理。
- express支持这些http的常用请求方式：
    - post   添加
    - get    查询
    - put    更新
    - delete 删除
      restful api (一种URL的格式)
#### 路由操作的api
- 我们已经使用过一种了就是app.get()对应就是get请求。
- app.post()
- app.put()
- app.delete()
- app.all()
  其中第一个参数为路径，支持正则表达式形式
- 直接使用use分发可以处理所有的路由请求
~~~
app.use((req,res)=>{
     res.send('ok');
 });
~~~
- **all方法绑定的路由与请求方式无关**
~~~
app.all('/abc',(req,res)=>{
     res.end('test router');
 });
~~~
#### 另一种路由操作的api ---- Router
- 也是需要引入express，然后调用其中的Router方法，这个方法返回的对象中的api与app里面的api一样。
- 我们什么时候需要用到Router呢？当我们有许多路由中间件时，可以封装成一个模块，全部挂载到Router上，然后暴露出去。这样方便别的模块引入这些路由中间件。
~~~javascript
const express = require('express');
const router = express.Router();

router.get('/hi',(req,res)=>{
    res.send('hi router');
});

router.get('/hello',(req,res)=>{
    res.send('hello router');
});

router.post('/abc',(req,res)=>{
    res.send('abc router');
});
//把router暴露出去。
module.exports = router;

-------------------------
现在假设我们要在别的模块使用者写路由中间件，直接引入，然后use方法挂载即可。
cosnt router = require(router);
app.use(router);
app.listen(...)
~~~


### 第三方中间件的使用示例

##### body-parser 使用方法说明

- npm install body-parser --save


- body-parser 这个第三方中间件，一般来说是挂载在use这个api上。
- 这个中间件主要作用是处理post请求数据的处理，就是把 post请求体中符合 application/x-www-form-urlencoded 编码方式的参照转换为对象，同时把这个对象添加到req对象的body属性中。
- 对于get请求,在引入express之后，会自动把get请求的查询字符串转换为数组，内置到req.query属性中。
~~~
/*
    应用中间件
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// 挂载内置中间件
app.use(express.static('public'));

// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({ extended: false }));

// 处理get提交参数
app.get('/login',(req,res)=>{
    let data = req.query;
    console.log(data);
    res.send('get data');
});

// 处理post提交参数
app.post('/login',(req,res)=>{
    let data = req.body;
    // console.log(data);
    if(data.username == 'admin' && data.password == '123'){
        res.send('success');
    }else{
        res.send('failure');
    }
});

app.listen(3000,()=>{
    console.log('running...');
});
~~~
- body-parser这个中间件还支持json格式的数据传递。
  //处理post请求中，符合application/json格式的参数,同时把这个对象添加到req对象的body属性中。
  app.use(bodyParser.json());
- 通常情况下我们把 这两种处理post数据的方法都挂载即可。
##### 模板引擎

- 在express中对模板引擎进行了整合。
- 我们使用art-template模板引擎，我们此处安装的是4.0版本，所以根据其新特性我们需要安装npm install --save express-art-template。
~~~
// 模板引擎的处理 
//在express中对模板引擎做了整合处理
const express = require('../myexpress/app.js');
const app = express();
const art = require('art-template');
const path = require('path');
//设置模板文件夹的路径，这里是固定写法 views，与模板文件无关，第二个参数会替换第一个参数。
//设置模板文件的路径,在使用render函数时，其路径都是相对于art文件夹。即 ./ 代表模板文件夹路径
app.set('views',path.join(__dirname,'art'));
//设置选用的模板引擎
app.set('view engine','art');
//采用art-template4.0的新特性，使express兼容art-template模板引擎
app.engine('art',require('express-art-template'));
app.get('/list',(req,res)=>{
    let data = {
        title: '水果',
        list: ['apple','oranger','banner']
    };
//当完成上述步骤后，此时的模板引擎已经被包装到res对象里面的render方法里面
//第一个参数模板的名称，第二个参数是数据
res.render('list.art',data);

}).listen(3003,()=>{
    console.log('running...');
    
});
~~~

#### ejs 模板引擎

1. 安装 ejs 模板引擎` npm i ejs -S`
2. 使用 app.set() 配置默认的模板引擎 `app.set('view engine', 'ejs')`
3. 使用 app.set() 配置默认模板页面的存放路径 `app.set('views', './views')`
4. 使用 res.render() 来渲染模板页面`res.render('index.ejs', { 要渲染的数据对象 })`，注意，模板页面的 后缀名，可以省略不写！

- 语法格式

~~~ejs
//条件判断
<% if (condition) { %>
<% else { %>
<%  { %>
//文本插值,注意等号前面不能有空格
<%= value %>
//导入其他模板文件   = 号代表渲染成文本 - 代表渲染成标签
<%- include(路径) %>
~~~
