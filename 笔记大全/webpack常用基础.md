#   Webpack

## 在网页中会引用哪些常见的静态资源？

- JS
  - 常见的js后缀名: .js  .jsx  .coffee  .ts（TypeScript  类 C# 语言）
- CSS
  - 常见的CSS后缀.css  .less   .sass  .scss
- Images
  - 常见的图片后缀.jpg   .png   .gif   .bmp   .svg
- 字体文件（Fonts）
  - .svg   .ttf   .eot   .woff   .woff2
- 模板文件
  - .ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】

## 网页中引入的静态资源多了以后有什么问题？？？

1. 网页加载速度慢， 因为 我们要发起很多的二次请求。因为http是基于TCP协议的，这么多的请求握手和挥手都占用了很多时间。
2. 要处理错综复杂的依赖关系

## 如何解决上述两个问题

1. 合并、压缩、精灵图、图片的Base64编码
2. 可以使用之前学过的requireJS、也可以使用webpack可以解决各个包之间的复杂依赖关系；

## 什么是webpack?

webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；

## 如何完美实现上述的2种解决方案

1. 使用Gulp， 是基于 task 任务的；小巧灵活，方便使用，多用于小项目。

   每个 task 任务只能用于一定的范围，我们可以建立多个task任务，然后将其关联起来，最终构建整个项目。

2. 使用Webpack， 是基于整个项目进行构建的；适用于大型项目。

- 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
- 根据官网的图片介绍webpack打包的过程

## webpack安装的两种方式

1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令
2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目开发依赖中，推荐。

**第二种方式是官网推荐的**

## 初步使用webpack打包构建列表隔行变色案例

1. 运行`npm init`初始化项目，使用npm管理项目中的依赖包
2. 创建项目基本的目录结构
3. 使用`cnpm i jquery --save`安装jquery类库
4. 创建`main.js`并书写各行变色的代码逻辑：

```
	// 导入jquery类库
    import $ from 'jquery'
	//如在nodejs中：
	//const jquery = require('jquery');
	//对于第三方的包都是，从当前文件夹的mode_modules进行加载的。
    // 设置偶数行背景色，索引从0开始，0是偶数
    $('#list li:even').css('backgroundColor','lightblue');
    // 设置奇数行背景色
    $('#list li:odd').css('backgroundColor','pink');
```

- **直接在页面上引用`main.js`会报错**，因为浏览器不认识`import`这种高级的JS语法，需要使用webpack进行处理，webpack默认会把这种高级的语法转换为低级的浏览器能识别的语法；
- 我们可以使用webpack进行处理：在当前文件的根目录的终端中运行 webpack，注意是个相对路径，相对于当前终端。 
- 语法  webpack       '要处理的文件路径（源文件路径）'      '处理之后文件的路径（目标文件路径）' ，这样当我们处理之后，就会在目标路径创建一个js文件，这个js文件就可以被浏览器支持了。
- 第一个参数叫做入口文件，第二个参数叫做出口文件。
- 注意使用此语法需要配置好 webpack-cli，webpack-cli是webpack的一些命令。
- 注意：webpack4.0之后就可以实现0配置打包，因为webpack会默认把src目录下的index.js当作入口文件（必须有这些文件），会把dist文件夹里面的mian.js当作出口（如果没有自动创建）。这种方式缺点（灵活性差）

## 使用webpack的配置文件简化打包时候的命令

- 我们每次修改入口文件，都要手动输入  webpack       '要处理的文件路径（源文件路径）'      '处理之后文件的路径（目标文件路径）'，这样一条打包命令，我们可以通过配置文件来简化打包命令。


- 我们需要在项目根创建一个配置文件，且名字必须是webpack.config.js，我们需要在这个配置文件里面去配置入口文件和出口文件。webpack的配置文件默认遵循common.js规范。
- 为什么名字必须是webpack.config.js，因为在webpack-cli里面的bin>config>config-yargs.js里面进行的设定。
- 如何在配置文件里面进行配置

~~~
//因为webpack是基于nodejs，所以支持nodejs的语法规范
//这个配置文件其实就是一个js文件，通过nodejs中的模块操作，向外暴露了一个配置对象。
//在nodejs中路径操作使用path模块
const path = require('path');
module.exports = {
    mode: 'development' //模式开发模式和上线模式，最大的区别就是代码的压缩和混淆
    entry: path.join(__dirname,'./map.js'),//入口：表示要使用webpack打包哪个文件
    output: {
        //输出文件的相关配置，出口文件必须是绝对路径
        path: path.join(__dirname, './dist'),    //指定输出文件的路径
        filename: 'map1.js',  //指定输出文件的名字
    }
}
~~~

- 此时如果我们修改了入口文件，那么我们只需 运行 'webpack ',即可实现打包操作。
- 当我们在终端运行 ’webpack‘ 命令之后，webpack打包工具做了哪些工作：

1. 首先webpack工具发现我们并没有通过命令的形式，给它指定入口和出口。
2. webpack就去项目的根目录中查找一个webpack.config.js这个配置文件。
3. webpack去解析执行这个配置文件，当解析执行完毕，会得到一个配置文件中导出的配置对象。
4. 当webpack拿到配置对象后就拿到了入口和出口，然后进行打包构建。

- webpack的配置文件最起码是有两个的，一个用户开发模式，一个用于上线模式。通常项目里面还有基础配置，大概为3个。我们可以在webpack --config '文件名' 指定使用哪个配置文件

## 实现webpack实时打包构建的三种方式

- 虽然通过配置文件把打包命令简化了，但是每次修改入口文件都要重新运行打包命令。我们希望每次修改入口文件之后自动实时打包。
- 我们需要使用webpack-dev-server第三方的工具，来实现自动打包的功能。运行`cnpm i webpack-dev-server --save-dev`安装到开发依赖。
- 还可以使用 webpack的 watch mode 监视模式，和 webpack-dev-middleware 。
- watch: 就是在webpack指令后面加上 --wacth即可。主要作用就是监视本地项目文件的变化，发现有修改的代码会自动编译打包，生成输出文件。我们可以在package.json>script 里面添加--watch参数，也可以在配置里面与mode、entry平级的地方加个字段watch: true
- 安装完成之后，在命令行直接运行`webpack-dev-server`来进行打包构建，也就是相当于nodejs中的nodemon的作用。此时发现报错，因为webpack-dev-server不是全局安装的，对于**非全局安装的工具** 我们无法把它当作 脚本命令无法在终端中直接运行；如果是全局安装的如webpack,npm,node等，我们可以直接在终端运行。
- 对于**非全局安装的工具**,我们如何在终端运行呢? 我们需要借助package.json文件中的script属性（脚本），在这属性中添加配置信息如:  "dev": "webpack-dev-server"，然后我们就可以在终端里面运行 npm run dev,就可以运行这个工具了。
- **而且webpack-dev-server这个工具依赖于webpack，且必须要求我们在本地项目中安装webpack**。
- 经过上述步骤后我们可以成功运行 npm run dev。webpack-dev-server会把我们整个项目当作一个服务器，并且有一个默认的url地址，我们可以通过这个地址去访问我们的项目。

~~~
//默认的项目端口
i ｢wds｣: Project is running at http://localhost:8080/
//提示我们它把出口文件托管于 根目录
i ｢wds｣: webpack output is served from /      
~~~

- webpack-dev-server这个工具，它会把入口文件放到内存中，而不是去替换我们磁盘中的bundle.js文件。

  所以我们在我们的项目根目录就根本找不到bundle.js。我们可以认为webpack-dev-server把打包好的文件以一种虚拟的形式托管到了项目的根目录中，虽然我们看不到它，但是，可以认为， 和 dist  src   node_modules  平级，有一个看不见的文件，叫做 bundle.js。

  所以我们可以把磁盘中的bundle.js文件删除了(因为这个文件不会实时打包)，而需要引入托管于服务器上的入口文件（/bundle.js）。

- webpack-dev-server把入口文件放到内存中的好处：由于需要实时打包编译，所以放在内存中速度会非常快。

- 为了能在访问`http://localhost:8080/`的时候直接访问到index首页，可以使用`--contentBase src`指令来修改dev指令，指定启动的根目录：

  ~~~javascript
  "dev": "webpack-dev-server --contentBase src"
  ~~~

### webpack-dev-server 常用命令

- 我们可以在package.json文件中，修改"dev": "webpack-dev-server"为"webpack-dev-server --open"。

这样就可以自动帮我们去打开浏览器。

- 我们还可以修改默认的端口号:  webpack-dev-server --open --port 3000

- 我们还可以设置，打开浏览器时默认的路径（现在默认是项目目录）

  webpack-dev-server --open --port 3000 --contentBase src ，因为服务器会自动寻找index.html页面，所以我们就直接打开可index.html。

- 我们还可以设置热加载: webpack-dev-server --open --port 3000 --contentBase src --hot。在没设置热加载之前我们每次修改入口文件， webpack-dev-server都会重新帮我们打包一个新的入口文件。设置热加载之后，不是重新打包入口文件，而是把入口文件中修改的部分做成补丁文件，补丁到原有的入口文件中，提升了速度。此外热加载还可以异步刷新页面，减少刷新请求。

- 还可以设置compress，这是http服务器上的jzp技术，能够把bundle.js文件进行压缩，是文件资源变小。

- 对于这些命令参数，我们除了可以在package.json文件中script节点中设置，还可以在webpack.config.js文件中进行设置，我们不推荐，只需要知道有这么种写法即可。

- 在webpack.config.js文件中，如果是带s的属性节点，其值都是一个数组。

- 在vue里面只有props值是一个数组，其他带s的属性都是对象。

~~~javascript
const path = require('path');
//导入webpack模块，热更新需要使用  第二步
const webpack = require('webpack');
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: { //这是配置webpack-dev-server命令参数
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true ,  //热更新第一步，
        compress: true, //压缩
    },
    plugins: [ //这是配置插件的节点
        new webpack.HotModuleReplacementPlugin(), //new 一个热更新的模块对象  第三步
    ]
}
~~~

### webpack-dev-middleware

- 这是一个类似于中间件的概念，它是一个容器（wrapper）。我们利用nodejs与express构建服务器，用来打包编译，自动更新。它可以把webpack处理后的文件传递给一个服务器（server）。webpack-dev-server在内部使用了它。同时它也可以作为一个单独的包使用，以便来实现更多自定义配置。

1.安装express和webpack-dev-middleware

npm i express webpack-dev-middleware -D

2.在项目根目录下新建server.js

~~~javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');  //引入配置文件
const app = express();   //建立服务器
const complier = webpack(config); //通过webpack（）的形式，传入配置文件
app.use(webpackDevMiddleware(complier,{
    publicPath: '/'  //打包的代码放置到根目录下
}));

app.listen(3000,function(){  //在3000端口监听
    console.log('3000');
    
})
~~~

- 其实，webpack-dev-server其实是对webpack-dev-middleware进行的封装。

## 用`html-webpack-plugin`插件配置启动页面

- 我们的bundle.js也就被保存在内存中了，但是我们的index.html还是在磁盘里面，我们也可以把index.html放到内存里面。需要通过html-webpack-plugin第三方的包实现。
- 运行`cnpm i html-webpack-plugin --save-dev`安装到开发依赖
- 修改`webpack.config.js`配置文件如下：

~~~javascript
const path = require('path');
const webpack = require('webpack');
//导入在内存中生成HTMl文件的插件
  const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: { //这是配置webpack-dev-server命令参数
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true
    },
    plugins: [ //这是配置插件的节点
        new webpack.HotModuleReplacementPlugin(), //new 一个热更新的模块对象
        new htmlWebpackPlugin({  //这是创建一个在内存中生成html页面的插件
            //这个是要生成的源文件，磁盘中的文件
            template: path.join(__dirname, './src/index.html'),
            //这个是在内存中生成文件
            filename: 'index.html'

        })
    ]
}
~~~

- 注意：内存中生成文件的名称是有要求的，因为我们在上面配置了open自动打开网页，会寻找名字为index.html进行打开，如果我们内存中生成文件的名称不是index.html,那么就会去打开磁盘上的index.html。因此我们需要将 filename设置为index.html。而且通过对比可以发现内存中的index.html文件会比磁盘中的index.html多出来一个内存中bundle.js文件的引入，也就是我们可以删除磁盘上index.html文件中bundle.js的引入。
- 当使用 html-webpack-plugin 之后，我们不再需要手动处理 bundle.js 的引用路径了，因为 这个插件，已经帮我们自动 创建了一个 合适的 script , 并且，引用了 正确的路径 。

## 自动编译小结

- 只有在开发时才需要使用自动编译工具，如webpack-dev-server等。项目上线时都会使用webpack进行打包，不需要使用这些自动编译工具。自动编译工具只为了提高开发体验和效率。

## 导入css样式表

- webpack可以打包所有的静态资源，所以我们还可以在入口文件中导入css样式表。
- 我们在入口文件导入css文件 
~~~
import 'css文件路径'
~~~
- 如果我们直接打包会出现错误：ERROR in ./src/index.css 1:3；You may need an appropriate loader to handle this file type。
- webpack，默认只能打包处理js类型文件，无法处理其他非js类型文件。
- 如果我们需要处理非js类型的文件，我们需要手动安装一些合适的第三方loader加载器。

## webpack 处理第三方文件类型的过程

1. 发现这个 要处理的文件不是JS文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则


2. 如果能找到对应的规则， 就会调用 对应的 loader 处理 这种文件类型；


3. 在调用loader 的时候，是从后往前调用的；


4. 当最后的一个 loader 调用完毕，会把 处理的结果，直接交给 webpack 进行 打包合并，最终输出到  bundle.js 中去

## 使用webpack打包css文件

1. 运行`cnpm i style-loader css-loader --save-dev`
2. 修改`webpack.config.js`这个配置文件：在里面新增一个节点叫做module，是一个对象，在这个对象身上有一个rules属性是个数组，这个数组中存放了第三文件的匹配和处理规则。

```
module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
        ]
    }
```

1. 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中**相关loader模块的调用顺序是从后向前调用的**。 

##   使用webpack打包less文件

1. 运行`cnpm i less-loader less -D`
2. less-loader依赖于less，所以我们需要安装 cnpm i less -D ,但是不需要显式的在module中指定。
3. 修改`webpack.config.js`这个配置文件：

```
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```

## 使用webpack打包sass文件

1. 运行`cnpm i sass-loader node-sass --save-dev`
2. node-sass
3. 在`webpack.config.js`中添加处理sass文件的loader模块：

```
{ test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```

## 使用PostCSS自动添加 css 的兼容前缀

- 运行 npm i postcss-loader autoprefixer -D 命令
- 在项目根目录中创建 postcss 的配置文件 postcss.config.js，并初始化如下配置：

~~~javascript
const autoprefixer = require('autoprefixer') // 导入自动添加前缀的插件
  module.exports = {
    plugins: [ autoprefixer ] // 挂载插件
  }
~~~

- 在 webpack.config.js 的 module -> rules 数组中，修改 css 的 loader 规则如下：

~~~javascript
module: {
    rules: [
      { test:/\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
    ]
  }
~~~

## 使用webpack处理css中的路径

- 默认情况下webpack无法处理css文件中的url地址，不管是图片还是字体库，只要是url地址都处理不了。

1. 运行`cnpm i url-loader file-loader --save-dev`
2. url-loader内部依赖于file-loader，我们不需要显示的定义
3. 在`webpack.config.js`中添加处理url路径的loader模块：

```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```

1. 这个url-loader会把我们的图片url默认转为base64编码
2. 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：

```
{ test: /\.(png|jpg|gif|bmp|jpeg)$/, use: 'url-loader?limit=10*1024' },
```

1. 这个url-loader会把非base64编码的图片，进行重命名操作，主要是避免重名。
2. 我们可以通过name属性，设置url-loader不要对我们的非base64编码的图片进行重命名操作
3. name=[name].[ext],打包之前后的文件名与后缀名与打包之前的保持一致，固定写法。

~~~
{ test: /\.(png|jpg|gif|bmp|jpeg))$/, use: 'url-loader?limit=43960&name=[name].[ext]' },
~~~

1. 这么做的结果：因为我们使用的wenpack-dev-server，它会自动构造服务器环境，并把我们的项目进行托管，如果我们在项目中有两张名字相同但内容不同的图片（且处在项目不同的文件夹中），会使得这两种图片的url地址一致，导致后面的url覆盖前面的url。

2. 我们希望既然不会被重命名，又希望没有重名的副作用。我们可以手动的给图片rul添加一个hash值。

   [hash:8]表示8位的哈希值

~~~
{ test: /\.(png|jpg|gif|bmp|jpeg))$/, use: 'url-loader?limit=43960&name=[hash:8]-[name].[ext]' },           
~~~

- 比如我们引用bootstrap的css文件，其中还包含了如.ttf（字体图片）等其它文件类型，我们也需要设置合适的加载器。

~~~
 {test: /\.(ttf|svg|eot|woff|woff2)$/, use: 'url-loader'}
~~~

- 此时我们还发现一个问题，图片等资源文件经过base64编码后全部放置在了项目的根目录下，也就是build（打包）后的dist目录下，我们希望可以把图片全部放置到一个文件夹内.

~~~
{
            test: /\.(png|jpg|gif|bmp|jpeg)$/,
            loader: 'url-loader',
            options: {
                limit: '5*1024',
                outputPath: 'imgs', //把文件放置到imgs文件内（没有则进行创建）
                name: '[name]-[hash：8].[ext]' //文件名
            }
        }   
~~~

## 使用babel处理高级JS语法

- 在webpack中默认只能处理一部分的ES6新语法，一些更高级的ES6或者ES7语法，webpack是处理不了的。这时候，就需要借助于第三方的loader，来帮助webpack处理这些高级的语法，当第三方loader把高级的语法转为低级的语法之后，会把结果交给webpack去打包。
- 通过Babel可以帮助我们将高级的语法转换为低级的语法。
- 我们可以安装如下两套包，去安装Babel相关的loader功能。

第一步:安装babel-loader，这个loader依赖@babel/core，同时我们需要安装@babel/preset-env 这是babel的预设

~~~	
npm i babel-loader @babel/core @babel/preset-env -D
~~~

如果需要支持更多的高级的ES6语法，可以继续安装插件，去官网查找

~~~
npm i @babel/plugin-proposal-class-properties -D
~~~

- 在webpack.config,js的module节点的rules数组中，添加一个新的匹配规则，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项。
  - 如果我们不排除node_modules,则Babel会node_modules中所有的第三方js文件都打包编译，这样，会非常消耗CPU，同时打包编译速度非常慢。
  - 即使Babel把所有的node_modules中的js转换完毕了，但是项目也无法正常运行。

```javascript
{
test: /\.js$/,
use:{
	loader: 'babel-loader',
	options: {
      presets: ['@babel/env],
      plugins: ["@babel/plugin-proposal-class-properties"]            
       },      
	}
},
exclude: /node_modules/ }
```

- 官方更建议的做法是在项目的根目录下创建一个.babelrc的babel的配置文件，符合json格式。其实就是把配置文件的options里面的东西，放到babel的配置文件里。

~~~
{
"presets"： ["@babel/env"],
"plugins": [" @babel/plugin-proposal-class-properties"]
}
~~~

- 如果需要使用generator。generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。(暂时不做了解)。generator无法直接使用babel进行转换，因为会将generator转换为一个regenratorRuntimely，然后使用mark和wrap来实现generator。**但是由于babel里面没有内置regenratorRuntimely，所以无法直接使用,

  需要安装插件:

~~~
npm i @babel/plugin-transform-runtime -D
~~~

​	同时需要安装**运行依赖**：

~~~
npm i @babel/runtime -S
~~~

在.babelrc中添加插件

~~~
{
"presets"： ["@babel/env"],
"plugins": [" @babel/plugin-proposal-class-properties","@babel/plugin-transform-runtime"]
}
~~~

- 如果我们使用更高级的对象上的方法。如es6字符串上的includes方法。由于js是动态语法，在代码执行的时候可以随时为对象添加属性和方法，babel在看到对象用方法时不会转换 includes这样的新方法。

  我们需要安装**运行依赖**

  ~~~
  npm i @babel/polyfill -s 
  ~~~

  polyfill这个东西会把数组、字符串等原型上所有的方法进行判断，如果是新增的语法则进行转换。

  在使用的时候需要注意，哪里使用了JS对象上新增的方法，在哪里引入。

  ~~~&#39;
  import '@@babel/polyfill'
  let str = '123'
  console.log(str.includes('2'))
  ~~~

## 如何在webpack打包后的文件中进行调试

- 打包之后的代码，如果出错对于我们来说很难调试。我们配置一下工具方便我们进行调试。
- 不知道你现在时候有没有一个想法？ webpack 打包后的文件就一定正确无误吗？ 如果发生错误的话，该怎么办呢？
- devtool 属性 便提供了生成 sourcemap 的功能。sourcemap 是js支持的功能，暂时不做了解。
- 注意：sourcemap不要用在生产环境中，这只是为了我们开发时方便调试。平时我们不设置这个节点，或者设置为none。
- 在entry平均的节点加入devtool节点，更多选项见官网

~~~
devtool: 'cheap-module-eval-source-map';  这种模式是开发时最推荐的
~~~

## webpack其它插件扩展

- clean-webpack-plugin 该插件可以用于npm run build时自动清除dist目录后重新生成非常方便。

1. 安装插件：npm i clean-webpack-plugin -D
2. 在配置文件中引入，同时在plugins节点中new 这个构造函数。

~~~
const {cleanWebpackPlugin} = require('clean-webpack-plugin');
   new cleanWebpackPlugin()
~~~

- 比如我们加载一些静态资源时，如图片img的src。注意与css中的背景图片它们是有区别的。像src正常情况下都是cdn。对于某些静态资源我们不希望webpack打包成一个文件，但是确实需要引用这些静态资源。对于这些静态资源（不需要打包）我们通常建立一个文件夹与src目录同级assets。但是我们打包后会发现dist目录中没有assets文件夹。此时我们需要用到一个插件 copy-webpack-plugin。这个插件多用来处理视频、音频等资源文件。

1. 安装插件 npm i copy-webpack-plugin -D

2. 引入和配置插件 

   ~~~
   const copyWepacpkPlugin = require('copy-webpack-plugin');
   new copyWepacpkPlugin([
    { 
    	from: path.join(__dirname,'assets')                 //从哪里拷贝，推荐绝对路径
       to: 'assets'                   //拷贝到哪里,这是个相对路径，相对于output的path 
     }
   ])
   ~~~

- BannerPlugin

这是一个webpack的内置插件（不需要第三方安装包），用于给打包的js文件加上版权注释信息

1. 引入webpack

~~~
const webpack = require('webpack)
~~~

2. 进行配置，在plugins节点里面

~~~
new webpack.BannerPlugin('注释信息')
~~~

## webpack高级配置

### 1.HTML中img标签的图片资源处理

1. 上述中根据copy-webpack-plugin插件对图片进行处理，但只是简单的复制。下面我们要学习如何真正的处理img标签里面的图片。就像css中的背景图片一样，打包到bundle.js，而不是复制到assets文件夹里面。
2. 安装 npm i -S html-withimg-loader
3. 配置loader，这样就能把img里面的图片进行打包了像css里面的图片一样。
4. 使用时，只需要在html里面正常引用即可，webpack会找到对应的资源进行打包，并修改html中的引用路径

~~~
{
test: /\.(htm|htmml)$/,
loader: 'html-withimg-loader's
}
~~~

### 2.多页应用打包

1. 现在虽然流行spa，但是多页应用打包仍然有自己的需求场景。我们希望有多个页面，同时每个页面都引用相应的js。比如一个index.js 和 other.js同时对应也有两个页面
2. 在webpack.config.js中修改入口和出口配置

~~~javascript
module.exports = {
    //入口文件配置
    mode: 'production',
  //1.修改多入口
    entry: {  //表明有两个chunk,index 和chunk  
     index: path.join(__dirname,'index.js'),
     other: path.join(__dirname,'other.js')
    },
    output: {
        //输出文件的配置
        path: path.join(__dirname,'./dist'),  //路径
      //2.修改出口
        filename: '[name].js'    //多页面应用打包，是有多个出口文件
    },
    plugins: [
      //3.指定页面引用的输出文件
        new htmlWebpackplugin({  
            template: path.join(__dirname, './index.html'),
            filename: 'index.html',
            chunks: ['index']  //对应index chunk
        }),
        new htmlWebpackplugin({ 
            template: path.join(__dirname, './other.html'),
            filename: 'other.html',
            chunks: ['other']  //对应other chunk
        }),
    ],
} 
~~~

### 3.第三方库的两种引入方式

- 比如需要在项目中把jquery作为全局变量window注入，我们可以使用expose-loader。也可以使用webpack的内置插件webpack.ProvidePlugin对每个模块的闭包空间，注入一个变量，自动加载模块，而不必导入import或者require
- expose-loader 将库引入到全局作用域

1. 安装 npm i expose-loader -D
2. 配置loader

~~~
module: { 
    rules:[
      {
        test: require.resolve('jquery'),
        use: {
          loader: 'expose-loader',
          options: '$'  //把jquery挂载到全局上，暴露为$,可以通过window.$访问到
        }
      }
     ]
  }
~~~

- webpack的内置插件webpack.ProvidePlugin 自动注入到每个模块中

~~~
plugins: {
//这就相当于在node_module里面找jquery，把$和jquery注入到每个模块的闭包空间。也就是每个js文件里面都可以访问到$或者jquery了。
  new webpack.ProvidePlugin({
    $: 'jquery',
    jquery: 'jquery'
  })
}
~~~

### 4.生产模式和开发模块不同配置文件打包

项目开发一般需要使用两套配置文件，用于开发阶段打包（不压缩代码、不优化代码、增加效率）和上线阶段打包（压缩代码、优化代码、打包后直接上线使用）

基本上分为三个配置文件

- webpack.base.js
- webpack.prod.js
- wenpack.dev.js

步骤如下：

1. 将生产环境和开发环境下公用的配置放到base.js里面，不同的配置放置到不同的文件里（生产/开发）
2. 在dev和prod中使用webpack-merge -D把自己的配置与base里面的配置进行合并后导出
3. 将package.josn中脚本参数进行修改，通过--config手动指定特殊的配置文件

~~~javascript
//开发配置
const path = require('path')
const webpack = require('webpack')
//引入webpack-merge
const webpackMerge = require('webpack-merge');
//引入公共配置
const baseConfig = require('./webpack.base.js');
//webpackMerge，传入多个配置对象。返回一个结合了的新的配置对象，然后再暴露出去
module.exports =  webpackMerge(baseConfig, {
    mode: 'development',
    devServer: {
        open: true,
        hot: true,
        compress: true,
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map'
   })
// package.json 脚本
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --port 3000 --hot --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
  },
~~~

### 5.定义环境变量区分开发环境和生产环境

- 通常情况下，我们的项目中会有两个地址，一个是本地开发地址（内网或者本机），一个是项目上线地址。我们通常会准备一个配置文件如http.js。在这里面定义一些常量，如const host1 = 'http://192.168.1';const host2 = 'http://www.ithhhh.com'。
- 我们希望有一个变量（标识符），我们可以通过这个标识符，在npm run dev 和 npm run build时，自动切换不同的服务器（主要是请求api的切换）。这个变量我们需要使用webpack的内置插件来定义，webpack.DefinePlugin。
- 因为要区分开发环境和生产环境所以需要在开发文件里面定义一次，在生产环境里面定义一次。

~~~
在webpack.dev.config.js
在plugins节点里面
plugins: [
//定义环境变量
  new webpack.DefinePlugin({
  Is_Dev: 'true' //注意定义环境变量以键值对的形式，而且后面的字符串会当成js进行解析执行。
  test: '1+1' //事迹上test的值是2
  test1：'"hhhh"'            //此时就会产生一个问题，如果我们就想定义环境变量是一个字符串，那么我们就必须使用单引号套双引号或者双引号套单引号的形式 
})
]
在webpack.product.config.js里面Is_Dev应该定义为false
~~~

### 6.使用webpack.devServer解决跨域问题

我们在开发环境和生产环境用到不同的服务器势必会涉及到跨域问题（因为webpack.devServer就是把项目托管到服务器上）。

- 通常情况下我们使用http proxy（代理）。
- 在使用devServer的情况下，客户端会产生跨域问题的请求，由devServer进行代理发送（因为同源策略只在客户端与服务器，此时是两个服务器之间的请求）。
- 我们需要在开发环境的文件里面（因为只有开发环境下才可能有跨域问题），在devServer里面添加一个节点。

~~~
devServer： {
  open: true,
  hot: true,
  proxy: {
  //假设服务器上有个api/getUserInfo，我们在开发环境下访问时会出现跨域问题，此时我们需要代理它
  //举例：客户端此时请求api/getUserInfo，proxy就会把请求发送到http://local:9999/getUserInfo
  //我们打开network会发现，这个请求的请求地址是local：3000，但是返回的数据明明是local：9999的数据，这是因为devServer给我们做了代理，它去请求http://local:9999，然后把数据返回给客户端。
    '/api': 'http://local:9999'
  }
}
//在上述中请求接口是多级目录的如：api/getUserinfo,而有时候接口地址可能是一级地址/getUserinfo。这种情况下，我们如何进行匹配代理？我们规定前端请求都默认携带'/api',而实际代理的时候把api/去掉。
'/api': {
//这样的proxy请求的地址是http://local:9999，而不会带上'/api'
  traget: 'http://local:9999',
  pathRewrite: {
    '^/api': '' 把/api重写成空字符串
  }
}
~~~

### 7.HMR的使用

- 模块热更新，我们现在修改代码，项目在浏览器中会自动刷新。我们还可以指定模块进行热更新（不刷新浏览器）。HMR只应该被用于开发环境。
- 在index.js里面监听需要热更新的模块

~~~
//首次加载hotmodule模块
import str form './hotmodule.js'

module.hot.accept('./hotmodule.js',function(){
  //当/hotmodule.js模块内容发生变化时触发
  //当指定模块内容发送变化我们需要重新导入
  //import / export 只能用于顶级作用域，不能用于子级作用域
  //所以我们可以使用require.js
  var hotmodule = require('./hotmodule.js');
  console.log( hotmodule)
})
~~~

## webpack优化

### 1.procduction模式打包自带优化

- tree shaking

## webpack构建的项目中使用vue

- 下载vue包，npm i vue -S
- 我们平常是通过srcipt引入Vue的CDN，此时我们得到的Vue构造函数是完整版的。
- 注意： 在 webpack 中， 使用 import Vue from 'vue' 导入的 Vue 构造函数，功能不完整，只提供了 runtime-only 的方式，并没有提供 像网页中那样的使用方式。
  - 因为根据第三方包的查找规则：
    1. 找 项目根目录中有没有 node_modules 的文件夹
    2. 在 node_modules 中 根据包名，找对应的 vue 文件夹
    3. 在 vue 文件夹中，找 一个叫做 package.json 的包配置文件
    4. 在 package.json 文件中，查找 一个 main 属性【main属性指定了这个包在被加载时候，的入口文件】
    5. 此时mian属性对应的值是：dist/vue.runtime.common.js，显然不是我们需要的。我们需要dist/vue.js
- 第一种方式：修改mian属性对应的值，使其为dist/vue.js。
- 第二种方式：我们需要明确的指定引入的js文件，绕开main属性指定的文件。import Vue from 'vue/dist/vue.js'。
- 第三种方式，我们修改webpack.config.js,添加一个reolve节点，这个节点与entry等节点平级。
  - 这个relove节点的作用，就是当webpack解析 improt Vue from 'vue'时，此时导入的包以vue结尾，我们给它起个别名，让它导入vue/dist/vue.js。

~~~
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
~~~

## vue-loader 与webpack的使用

- 我们编写组件的时候，通常是在.vue中进行编写。
- webpack无法直接解析.vue文件，我们需要下载vue-loader加载器。
  - vue-loader依赖于vue-template-compiler，vue-template-compiler不需要显示的声明。

~~~
npm i vue-loader vue-template-compiler -D
~~~

- 在配置文件中新增loader配置项：{test: /\.vue$/, use: 'vue-loader'}
- Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的。
- 我安装的Vue-loader是15.7.0，所以我们需要在webpack配置文件中做如下配置：

~~~
const VueLoaderPlugin = require('vue-loader/lib/plugin');
在plugins节点中添加
 plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
~~~

## runtime-only

- 我们知道如果我们直接 import Vue from 'vue'那么就会导入dist/vue.runtime.common.js这个包，这个包提供了runtime-only的模式，不同于通过srcipt标签引入的vue.js文件。
- 这个runtime-only模式，无法渲染文本插值，以及通过components注册的组件，但是可以渲染render函数生成的组件。
- 那么我们怎么使用这个模式呢？我们可以把组件定义在.vue后缀的文件中，然后通过vue-loader加载器进行加载，同时使用render函数进行渲染。
- 在.vue文件中是可以使用插值表达式和方法等。

## vue-router与webpack的使用

- 导入路由模块：

```
import VueRouter from 'vue-router'
```

1. 安装路由模块：

```
Vue.use(VueRouter);
```

1. 导入需要展示的组件:

```
import login from './components/account/login.vue'

import register from './components/account/register.vue'
```

1. 创建路由对象:

```
var router = new VueRouter({

  routes: [

    { path: '/', redirect: '/login' },

    { path: '/login', component: login },

    { path: '/register', component: register }

  ]

});
```

1. 将路由对象，挂载到 Vue 实例上:

```
var vm = new Vue({

  el: '#app',

  // render: c => { return c(App) }

  render(c) {

    return c(App);  //render函数会把el指定的容器全都清空覆盖，所以无法把路由出口和路由导航写到el所控制的元素中。

  },

  router // 将路由对象，挂载到 Vue 实例上

});
```

1. 改造App.vue组件，在 template 中，添加`router-link`和`router-view`：

```
    <router-link to="/login">登录</router-link>

    <router-link to="/register">注册</router-link>

    <router-view></router-view>
```

- 注意： App 这个组件，是通过 VM 实例的 render 函数，渲染出来的， render 函数如果要渲染 组件， 渲染出来的组件，只能放到 el: '#app' 所指定的 元素中；
- login 和 register 组件， 是通过 路由匹配监听到的，所以， 这两个组件，只能展示到 属于 路由的 、、\<router-view>\</router-view> 中去；

##  webpack 打包发布

- 之前我们通过各种插件，将出口文件放到内存中编译，将html页面也放到内存中，当项目完成的时间，肯定要把，dist文件夹发布上去，但是此刻发现dist文件夹是空的！！ 我们需要把在内存中的文件，创建到dist文件夹中，所以我们可以使用 webpack -p，就会把内存中的文件创建到dist文件夹中了。
- 上线之前需要通过webpack将应用进行整体打包，可以通过 package.json 文件配置打包命令：
- **注意**：我们通过webpackdev和webpackHtml插件，把内存中的bundle.js和index.html关联起来，打包的时候会自动打包到dist目录中，此时html中引入bundle.js的路径是把dist目录作为根目录。也就是我们发布的时候需要把dist目录作为项目跟目录。

~~~javascript
// 在package.json文件中配置 webpack 打包命令
   // 该命令默认加载项目根目录中的 webpack.config.js 配置文件
   "scripts": {
     // 用于打包的命令
     "build": "webpack -p",
     // 用于开发调试的命令
     "dev": "webpack-dev-server --open --host 127.0.0.1 --port 3000",
   },
~~~

## 相关文章

[babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)
[Runtime transform 运行时编译es6](https://segmentfault.com/a/1190000009065987)