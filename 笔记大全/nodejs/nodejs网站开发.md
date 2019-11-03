###Web开发概述
- Node.js服务器模型与php服务器模型的区别
  ![](img/server.png)
- 之前我们也学过php服务器，开发网站。由于php服务器中有apache模块，可以处理网页等资源，但是node服务器中没有apache这样的模块，但是有与apache类似的模块http模块。
### http模块
- http模块有一系列的api，使用它们就可以完成node服务器的创建了。
#### 创建静态服务器实例 http.createServer([options][, requestlistener])
- 同样我们需要引入http模块：require("http");
- http.createServer这个api的返回值是一个http.server实例。
~~~javascript
const http = require("http");
//创建http.server实例
let server = http.createServer();
~~~
此时我们就创建了一个简单的服务器，我们如何发送请求呢？大部分请况下我们是通过浏览器向服务器发送请求的。
- 我们创建的http.server实例，有一整套的完整的服务器模型，包括请求事件，请求的端口等。
- 我们下面发送一个简单的请求。
~~~javascript
//我们通过监听request请求事件，当浏览器向node服务器发出请求时，通过回调函数输出hello。
const http = require("http");
//创建http.server实例
let server = http.createServer();
//这个回调函数中有两个参数：req 请求对象，res 响应对象
server.on("request",(req,res)=>{
    res.end("hello");
});
//同时需要给我们的服务器绑定一个端口号，我们写3000或其他的都行，注意不要是已被占用的端口号即可。
//这一点与php不同，在php服务器的配置文件中我们可以设置虚拟主机，且默认端口号是80.
server.listen(3000);
~~~
#### 启动服务器监听连接 server.listen([port[, host[, backlog]]][, callback])
- 通过这个api我们可以监听http协议的请求
- 启动一个TCP服务监听输入的port和host。
  如果port省略或是0，系统会随意分配一个在'listening'事件触发后能被server.address().port检索的无用端口。
- 如果host省略，如果IPv6可用，服务器将会接收基于unspecified IPv6 address (::)的连接，否则接收基于unspecified IPv4 address (0.0.0.0)的连接。
~~~javascript
我们有另一种创建风格,这样就不用加request监听事件了。
http.createServer((req,res)=>{
    res.end('ok');
}).listen(3000,'192.168.0.106',()=>{
    console.log('running...');
});
~~~
#### http.IncomingMessage
- IncomingMessage 对象由 http.Server 或 http.ClientRequest 创建，并分别作为第一个参数传给 'request' 和 'response' 事件。 它可用于访问响应状态、消息头、以及数据。
  它实现了可读流接口，还有以下额外的事件、方法、以及属性。
- message.url 仅对从 http.Server 获取的请求有效。
~~~javascript
const http = require('http');
http.createServer((req,res)=>{
    // req.url可以获取URL中的路径（端口之后部分）
    // res.end(req.url);
    if(req.url.startsWith('/index')){
        // write向客户端响应内容,可以写多次
        res.write('hello');
        res.write('hi');
        res.write('nihao');
        // end方法用来完成响应，只能执行一次
        res.end();
    }else if(req.url.startsWith('/about')){
        res.end('about');
    }else{
        res.end('no content');
    }
}).listen(3000,'192.168.0.106',()=>{
    console.log('running...');
});
~~~
#### http.ServerResponse
- 此对象由 HTTP 服务器在内部创建，而不是由用户创建。 它作为第二个参数传给 'request' 事件。
  响应继承自流，并额外实现以下内容：
#### 通过req和res来设置请求和响应案例
~~~javascript
//分布路径
//在正常的请求逻辑中，我们需要根据不同的路径返回不同的内容
const http = require("http");
const fs = require("fs");
const path = require("path");
//读取文件的内容，并返回到浏览器端
let reddFile = (url,res)=>{
    fs.readFile(path.join(__dirname,"www",url),"utf8",(err,fileContent)=>{
        if (err) {
            res.end("server error");
        } else {
            res.end(fileContent);
        }  
    });
}
//创建http.server实例
//req和res会在createServer中被自动传进去，其实就是对应的http.IncomingMessage和http.ServerResponse的实例
http.createServer((req, res) => {
    //在这里出来路径分配
    //我们可以通过req.url获取发送请求时的url路径
    // console.log(req.url);
    // res.end(req.url);
    if (req.url.startsWith("/index")) {
        //如果是index，那么把index的内容进行返回浏览器
        reddFile("index.html",res);
    }else if (req.url.startsWith("/about")) {
        reddFile("about.html",res);
    }else if (req.url.startsWith("/list")) {
        reddFile("list.html",res);
    }else{
        res.writeHeader(404,{
            "Content-type": 'text/plain; charset=utf8'
        });
        res.end("页面被傻狗叼走了");
    }
}).listen(4001, () => {
    //当node在提供服务器功能时会处于阻塞模块，我们为了更好体验，给出提示信息
    console.log("runing");
});
-----------------------
上面的代码我们可以进行简写，利用req.url属性。
const path = require('path');
const fs = require('fs');
const http = require("http");
//设置服务器功能
http.createServer((req,res)=>{
    //读取文件，分布路径，进行返回
    fs.readFile(path.join(__dirname,"www",req.url),'utf8',(err,fileData)=>{
        //如果文件读取失败
        if(err) {
            res.writeHeader(404,{
                "Content-Type":"text/plain;charset=utf8"
            });
            res.end("文件被傻狗叼走了");
        } else {
            res.end(fileData);
        }
    });
}).listen(4004,()=>{
    console.log("runing");
    
});
-----------------------------
以上的代码还是存在问题，就是我们没有去根据请求内容类型的不同去设置不同响应的响应行，下面我们就解决这个问题。
为了解决上面这个问题，我们找到了一个映射文件MIME.json表述了不同MIME对应的缩写形式。
const path = require('path');
const fs = require('fs');
const http = require('http');
const mime = require('./mime.json');
//我们需要根据不同请求的url，读取不同的文件，设置不同的响应行，在将数据返回
http.createServer((req,res)=>{
    //读取文件
    fs.readFile(path.join(__dirname,'www',req.url),'utf8',(err,fileData)=>{
        //如果文件读取失败
        if(err){
            res.writeHead(404,{'Content-Type':'text/plain; charset=utf8'});
            res.end('网页TMD被傻狗给叼走了');
        } else {
            //我们设置一个默认的类型,然后再根据扩展名的不同进行修改
            let defaultType = "text/html";
            //获取文件的扩展名
            let ext = path.extname(req.url);
            //判断扩展名是否在mime类型的文件中，主要是判断这个扩展名是否合理
            if (mime[ext]) {
                //修改类型
                defaultType = mime[ext];
            }
            //如果是text/ 需要设置编码方式为 utf8
            if (defaultType.startsWith('text/')) {
                defaultType += '; charset=utf8'
            }
            //返回响应
            res.writeHead(200,{'Content-Type':defaultType});
            res.end(fileData);
        }
    });
}).listen(4005,()=>{
    console.log("runing");
});
//我们还可以把写好的静态资源功能模块导出，方便在其他模块中调用
------------------------
//我们把写好的静态资源服务器功能模块导出
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
exports.staticServer = (root,req,res)=>{
//我们需要根据不同请求的url，读取不同的文件，设置不同的响应行，在将数据返回
    //读取文件
    fs.readFile(path.join(root,req.url),'utf8',(err,fileData)=>{
        //如果文件读取失败
        if(err){
            res.writeHead(404,{'Content-Type':'text/plain; charset=utf8'});
            res.end('网页TMD被傻狗给叼走了');
        } else {
            //我们设置一个默认的类型,然后再根据扩展名的不同进行修改
            let defaultType = "text/html";
            //获取文件的扩展名
            let ext = path.extname(req.url);
            //判断扩展名是否在mime类型的文件中，主要是判断这个扩展名是否合理
            if (mime[ext]) {
                //修改类型
                defaultType = mime[ext];
            }
            //如果是text/ 需要设置编码方式为 utf8
            if (defaultType.startsWith('text/')) {
                defaultType += '; charset=utf8'
            }
            //返回响应
            res.writeHead(200,{'Content-Type':defaultType});
            res.end(fileData);
        }
})
};
调用示例
//引入静态资源模块 
let ss = require("./15.js");
const http = require('http');
const path = require('path');
http.createServer((req,res)=>{
    //调用静态资源模块
    // ss.staticServer(path.join(__dirname,'www'),req,res);
    ss.staticServer(path.join('C:\\Users\\lenovo\\Desktop','main'),req,res);
}).listen(4008,()=>{
    console.log('running.....');
    
});
~~~
### 动态网站的开发
#### GET请求 和POST请求
- 因为在nodejs中GET请求和POST请求中参数获取方式差别很大，所以我们需要分开介绍。
#### GET请求中参数获取
- 如果要处理GET请求中的参数我们需要引入核心模块 url。
  const URL = require('url');
##### url.parse() -把标准的url字符串转化为对象
- url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
  参数详解：
1. urlString <string> 要解析的 URL 字符串。
2. parseQueryString <boolean> 如果设为 true，则返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象。 如果设为 false，则 query 会是一个未解析未解码的字符串。 默认为 false。
3. slashesDenoteHost <boolean> 如果设为 true，则 // 之后至下一个 / 之前的字符串会解析作为 host。 例如， //foo/bar 会解析为 {host: 'foo', pathname: '/bar'} 而不是 {pathname: '//foo/bar'}。 默认为 false。
~~~javascript
const URL = require('url',true);
let str = 'http://www.baidu.com/abc?flag=123&keyword=java';
let ret = URL.parse(str);
console.log(ret);
//最终结果是
  protocol: 'http:',  //协议
  slashes: true,  //计算机的斜杠语法 ：属性是一个 boolean，如果 protocol 中的冒号后面跟着两个 ASCII 斜杠字符（/），则值为 true。
  auth: null,  //是协议与域名（主机名）中间的字段，通常是user:pass表示权限认证，大部分情况下不用。
  host: 'www.baidu.com', // 属性是 URL 的完整的小写的主机部分，包括 port（如果有）。
  port: null,
  hostname: 'www.baidu.com', //是 host 组成部分排除 port 之后的小写的主机名部分。
  hash: null,  // 包含 URL 的碎片部分，包括开头的 ASCII 哈希字符（#），也就是锚点。
  search: '?flag=123&keyword=java',
  query: 'flag=123&keyword=java',
  pathname: '/abc',
  path: '/abc?flag=123&keyword=java',
  href: 'http://www.baidu.com/abc?flag=123&keyword=java' 
~~~
##### url.format把对象转化为标准的URL字符串.
- 这个对象是一个url对象，由以下两种获得方式
1. let str = 'http://www.baidu.com/abc?flag=123&keyword=java';
  let ret = URL.parse(str); 
  我们通常用这个方法，因为得到的url对象比较标准，在转换为字符串时比较方便。
2. const {URL} = require('url'); //此时URL是一个构造器
   let myURL = new URL('http://www.baidu.com/abc?flag=123&keyword=java');
   console.log(myURL);
~~~javascript
const {URL} = require('url');
const url = require('url');
let myURL = new URL('http://www.baidu.com/abc?flag=123&keyword=java');
console.log(url.format(myURL));
-------------------
// format的作用就是把对象转化为标准的URL字符串
// let obj = {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com',
//   port: null,
//   hostname: 'www.baidu.com',
//   hash: null,
//   search: '?flag=123&keyword=java',
//   query: 'flag=123&keyword=java',
//   pathname: '/abc/qqq',
//   path: '/abc/qqq?flag=123&keyword=java',
//   href: 'http://www.baidu.com/abc/qqq?flag=123&keyword=java' 
// };
// let ret1 = url.format(obj);
// console.log(ret1);
~~~
#### POST请求参数处理
- 因为POST请求的参数不包含在url中，所以我们需要其他模块
- 需要引入 querystring模块。
  const querystring = require('qureystring');
- 这个模块中的api有
1. querystring.escape(str) 
  querystring.escape() 方法以对 URL 查询字符串的特定要求进行了优化的方式对给定的 str 执行 URL 百分比编码，也就是对特殊字符进行了编码/转义处理。
  querystring.escape() 方法由 querystring.stringify() 使用，通常不会直接使用。 它的导出主要是为了允许应用程序代码在必要时通过将 querystring.escape 指定给替代函数来提供替换的百分比编码实现。
2. querystring.unescape(str)
  querystring.unescape() 方法在给定的 str 上执行 URL 百分比编码字符的解码，也就是不对特殊字符进行编码/转义处理。
  querystring.unescape() 方法由 querystring.parse() 使用，通常不会直接使用它。 它的导出主要是为了允许应用程序代码在必要时通过将 querystring.unescape 分配给替代函数来提供替换的解码实现。
  默认情况下， querystring.unescape() 方法将尝试使用 JavaScript 内置的 decodeURIComponent() 方法进行解码。 如果失败，将使用更安全的不会丢失格式错误的 URL 的等价方法。
##### querystring.parse(str[, sep[, eq[, options]]]) 把标准的url查询字符串转换为对象。
- 什么查询字符串就是?号后面的键值对形式的字符串。
~~~javascript
const querystring = require('querystring');
let str = 'ffoo=bar&abc=xyz&abc=123';
console.log(querystring.parse(str));
~~~
##### querystring.stringify(obj[, sep[, eq[, options]]]) 把对象转换为标准的url查询字符串。
~~~javascript
const querystring = require('querystring');
let obj = {
    flag: '123',
    abc: ['hello','hi']
};
console.log(querystring.stringify(obj));
~~~
#### POST请求参数是如何发送过来的
- 在POST请求中参数是在req对象中以数据的形式发送过来，所以我们需要在req发送数据的数据，把这些数据进行接收，才能获得POST请求中的参数。
- 在req对象中有一个开始发生数据事件 data 和 结束事件 end 
- 注意我们在发送POST请求的时候，如果需要发送数据，需要以x-www-form-urlencode的形式进行发送，这样在querystring中使用api才能获得正确的结果。
~~~javascript
//我们需要通过POSTMAN发送请求,如果使用表单或者XHR对象发送POST请求会出现 Provisional headers are shown（待解决）
const querystring = require('querystring');
const http = require('http');
http.createServer((req,res)=>{
    if(req.url.startsWith('/login')){
        let pdata = '';
        req.on('data',(chunk)=>{
            // 每次获取一部分数据
            pdata += chunk;
        }); 
        req.on('end',()=>{
            // 这里才能得到完整的数据
            console.log(pdata);
            let obj = querystring.parse(pdata);
            res.end(obj.username+'-----'+obj.password);
        });
    }
}).listen(3000,()=>{
    console.log('running...');
})
~~~
#### 简单的登录验证案例
- req.method = 'METHOD',注意必须是大写
~~~javascript
const http  = require('http');
const url = require('url');
const qureystring = require('qureystring');
const ss = require('./15.js');

http.createServer((req,res)=>{
   //启动静态资源服务
   if(req.url.startsWith("/www")){
    ss.staticServer(__dirname,req,res);
   }
   //动态资源
   if(req.url.startsWith("/login")) {
        //判断请求方式，如果是get请求需要获取url中的参数
        if(req.method == 'GET'){
         let param = url.parse(req.url,true).query;
         //判断数据是否一致
          if(param.username == 'admin' && param.password == '123'){
                res.end('get success');
            }else{
                res.end('get failure');
            }
        }
        //如果是POST请求，需要在req对象中读取POST请求体中的数据（其实是x-www-form-urlencoded编码方式的查询字符串），然后把查询字符串
        //转换为对象
        if(req.method == "POST") {
            let pdata = "";
            req.on('data',(chunk)=>{
                pdata += chunk;
            });
            req.on('end',(chunk)=>{
                let obi = qureystring.parse(pdata);
                if(obj.username == 'admin' && obj.password == '123'){
                    res.end('post success');
                }else{
                    res.end('post failure');
                }
            });
        }
   }
});
~~~
#### 动态网站案例
- 动态网站的特点就是根据请求内容的不同，返回不同的数据或页面，且这些页面都是动态生成的。
- 动态网站思路分析：因为js与php不同，无法使用向php混编的形式来动态生成内容，所以我们需要替换字符串和使用模板引擎来达到动态生成内容的效果。
- 下面这个学生成绩查询案例的思路如下：
1. 我们需要一个登录页面，和一个成绩展示页面。其中成绩展示页面的数据是根据参数的不同而动态生成的。
2. 当我们点击查询时，会发送post请求，把考号发送给后端。我们需要获取考号，拿到数据库进行对比，把正确的信息拿到，在把正确的信息渲染到页面上。
- 我们此处采用的是json文件模拟数据库，那么nodejs中有操作sql的api吗？
- 此处出现了路由的概念：路由（请求路径+请求方式），路由就是根据请求的路径和方式的不同，进行业务的分发（处理不同的业务）
~~~javascript
//我们实现动态网站案例，查询成绩。
//当输入考号，发起请求的时候，把成绩返回在渲染到页面上
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
//引入一个所有学生的成绩列表
const score = require('./score.json');
http.createServer((req,res)=>{
    //路由（请求路径+请求方式）
    //判断请求路径，如果是/query返回查询页面
    if (req.url.startsWith('/query') && req.method == 'GET') {
        //读取查询页面，进行返回
        fs.readFile(path.join(__dirname,'view','index.html'),'utf8',(err,content)=>{
            if (err) {
                res.writeHead(505,{
                    'Content-Type':'text/plain; charset=utf8'
                });
                res.end('读取文件失败');
            }
            res.end(content);
        });    
    }
     else if (req.url.startsWith('/score') && req.method == 'POST') {
        //如果是score则返回成绩页面
        let pdata = '';
        req.on('data',(chunk)=>{
            pdata += chunk;
        });
        req.on('end',()=>{
            //把post请求中的符合 x-www-from-urlencoded 格式的字符转换为对像
          let obj =   querystring.parse(pdata);
          //从score.json文件中根据考号获取成绩
          let result = score[obj.code];
          //把获取到的成绩渲染到页面，通过占位符的形式.
          //读取页面获取字符串，在替换相应的占位符
          fs.readFile(path.join(__dirname,'view','result.html'),'utf8',(err,content)=>{
            if (err) {
                res.writeHead(505,{
                    'Content-Type':'text/plain; charset=utf8'
                });
                res.end('读取文件失败');
            };
            //进行替换 
          content = content.replace('{{chinese}}',result.Chinese);
          content = content.replace('{{math}}',result.Math);
          content = content.replace('{{english}}',result.english);
          content = content.replace('{{summary}}',result.sumary);
          //把结果返回
          res.end(content);
          });

        });
    }
}).listen(3000,()=>{
    console.log('running....');
    
});
~~~
##### 使用模板引擎
- 在nodejs中模板引擎与在浏览器中使用的模板引擎不同，在nodejs中把模板引擎当作第三方的包来使用。



### 简述网站的业务逻辑

- 对于静态请求，如何判定为静态请求呢？

我们一般把静态的资源放置到一个文件夹中，如果请求路径中包含这个文件夹就是静态请求。

静态请求，就是读取文件，返回响应。

- 对于动态请求，我们把后台文件如php。nodejs等，放置到另一个文件夹中。如果请求路径中包含这个文件夹就是动态请求。

判断请求方式。获取参数，进行相应的处理。一般是去操作数据库，再把相应的信息返回。

### JSONP 和 CORS 的区别

1. JSONP的原理：动态创建script标签；
   - JSONP发送的不是Ajax请求
   - 不支持 Post 请求；
2. CORS中文意思是`跨域资源共享` ,需要服务器端进行 `CORS` 配置；
   - CORS 发送的是真正的Ajax请求
   - CORS 支持Ajax的跨域
   - 如果要启用 CORS 跨域资源共享，关键在于 服务器端，只要 服务器支持CORS跨域资源共享，则 浏览器肯定能够正常访问 这种 CORS 接口；而且，客户端在 发送 Ajax的时候，就像发送普通AJax一样，没有任何代码上的变化；
3. 对于Node来说，如果想要开启 CORS 跨域通信，只需要安装`cors`的模块即可。




### 网站开发需要注意

- 当我们的页面在服务器运行时如果需要引入服务器上的资源，需要将这些资源挂载为静态资源，否则引入不会成功。

### node中的状态保持

#### cookie

- 在Node中可以在`writeHeader`的时候，通过`Set-Cookie`来将cookie标识通过响应报文发送给客户端！

- 客户端也可以通过一些方式来操作自己的cookie，比如通过`jquery.cookie`这个插件！

- 我们如何在客户端设置cookie。设置头信息。这样在响应头中会设置cookie。

- 当下次发送请求时，请求头中会自动携带cookie

  ~~~
  res.writeHead(200,{
              'Content-Type': 'text/plain; charset=utf8',
              'Set-Cookie': ['isvisit=yes','test=ok']
          })
  ~~~

- 我们可以通过req.headers访问cookie

- 通过`expires` 设置Cookie的过期时间

~~~javascript
// 设置 过期时间 为60秒之后
// 注意：在设置过期时间的时候，需要将时间转换为 UTC 格式
var expiresTime = new Date(Date.now() + 1000 * 60).toUTCString();
res.writeHeader(200, {
  'Content-Type': 'text/html; charset=utf-8',
  //设置isvisit的过期时间
  'Set-Cookie': ['isvisit=true;expires=' + expiresTime, 'test=OK']
});
res.end('<h3>你好，欢迎光临，送给你一个苹果！</h3>');
~~~

#### session

1. 安装session模块

```bash
npm install express-session -S
```

2. 导入session模块

```js
var session = require('express-session')
```

3. 在express中使用`session`中间件：我们就可以访问req.session

```js
// 启用 session 中间件
app.use(session({
  secret: 'keyboard cat', // 相当于是一个加密密钥，值可以是任意字符串
  resave: false, // 强制session保存到session store中
  saveUninitialized: false // 强制没有“初始化”的session保存到storage中
}))
```

4. 将私有数据保存到当前请求的session会话中：

```js
// 将登录的用户保存到session中
req.session.user = result.dataValues;
// 设置是否登录为true
req.session.islogin = true;
```

5. 通过`destroy()`方法清空`session`数据：

```js
req.session.destroy(function(err){
  if(err) throw err;
  console.log('用户退出成功！');
  // 实现服务器端的跳转，可以让客户端重新访问指定页面
  res.redirect('/');
});
```

## 请求路径分类

- 第一种是?后面进行拼接参数 

  ~~~
  http://localhost:3001/?name=zs&age=18
  ~~~

- 第二种是restful风格

  ~~~
  http://localhost:3001/web/zs/18
  此时后台需要进行配合，后台的路由是
  app.get('/web/:name/:age',()=>{})
  //此时我们在req.parmas得到的数据是 {name:zs, age:18}。会根据设置的键（:键），与相应位置的值生成一个对象。
  ~~~

## 加密处理

- 对于用户的密码我们需要做加密处理

### MD5 的特性

1. **MD5 是一种加密算法**，在调用这个算法的时候，提供一个密码的明文， 调用的结果，得到一个 32 位长度的密文；
2. **MD5 算法的特性：**相同的字符串，如果多次调用 md5 算法，得到的结果，完全一样；
3. **MD5 算法，无法被逆向解密**；
4. 但是，基于 md5 算法的第二个特性，我们可以进行碰撞暴力破解；（MD5 存在被暴力破解的安全性问题）
5. 为了解决 简单的明文密码，被 md5 加密后，通过 暴力破解的安全性问题， 然后就出现了**加盐**的MD5加密；
6. 目前，md5的暴力破解，又升级了，升级到了 `彩虹表`；
7. 由于彩虹表出现，我们推荐大家，在存储网站密码的时候，使用 `bcrypt` 加密算法，得到加密之后的密文进行存储；

### bcrypt 加密算法

1. 在调用加密算法的时候，需要手动提供一个 `幂次`;
2. 调用加密算法，得到的加密结果格式：`$版本号$循环的幂次$22位的随机盐 31位的密文`
   - 加密的`随机盐`和`加密的幂次`，和`加密算法的版本号`已经被存储到了真正的密文中；

### 项目中使用 bcrypt 的步骤

1. 运行 `npm i node-pre-gyp -g` 

2. 在项目根目录中，打开终端，运行 `cnpm install bcrypt -S`

3. 导入 `bcrypt` 

   ```js
   // 导入加密的模块
   const bcrypt = require('bcrypt')
   ```

4. 定义幂次：

   ```js
   // 定义一个 幂次
   const saltRounds = 10    // 2^10
   ```

5. 调用 `bcrypt.hash()` 加密：

   ```js
   // 加密的方法
   bcrypt.hash('123', saltRounds, (err, pwdCryped) => {
      console.log(pwdCryped)
   })
   ```

6. 调用`bcrypt.compare()`对比密码是否正确：

   ```js
   // 对比 密码的方法
   bcrypt.compare('123', '$2b$10$i1ufUKnC9fXTsF9oqqvLMeDnpNfYIvhyqKRG03adiebNFPkjW3HPW', function(err, res) {
     console.log(res)
     // 内部对比的过程：
     // 1. 先获取 输入的明文
     // 2. 获取输入的密文
     // 2.1 从密文中，解析出来  bcrypt 算法的 版本号
     // 2.2 从密文中，解析出来 幂次
     // 2.3 从密文中，解析出来前 22 位 这个随机盐
     // 3. compare 方法内部，调用 类似于 hash 方法 把 明文，幂次，随机盐 都传递进去     最终得到正向加密后的密文
     // 4. 根据最新得到的密文，和 compare 提供的密文进行对比，如果相等，则 返回 true ，否则返回 false;
   })
   ```

   ​

##  如何把自己的项目发布到因特网上

- 首先购买自己的云服务器。运营商会提供一个远程服务器的id

- 购买域名，进行备案。

- 在window中通过命令控制行输入mstsc，打开远程连接面板。在这里我们输入远程服务器的id，就进入到了

  我们购买的远程服务器环境。

- 上传我们的项目：因为是nodejs项目，我们需要保证远程服务器的环境上也有nodejs环境。然后我们把源码进行压缩，注意因为有packjson文件，所以我们不要把node_module直接上传。

- 此时把压缩文件复制到服务器环境中，然后在项目文件夹中运行npm i ，此时会把packjson文件中所有依赖的包进行下载。



