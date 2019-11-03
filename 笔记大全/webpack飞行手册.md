## webpack 

- 在此我们跳过webpack环境的搭建，主要介绍webpack.config.js中各个节点。

### webpack.config.js

- 基础的配置信息

~~~javascript
modules.export={
    entry:{
        /* 入口文件 */
    },
    output:{
        /* 出口文件 */
    },
    module:{
        /* Loader */
        rules:[{},{},{}]
    },
    plugins:[ 
        /* 插件 */ 
    ],
    devtool: ...
    devServer: {...}
    resolve:{...}
}
~~~

### entry

-  代表是入口文件，Webpack 工作的开始。 Webpack 会递归的探索出 入口文件中所依赖的模块，并按照顺序 利用 Loader 进行处理。 官网给出了其 3 种数据类型：

1. 字符串

~~~
entry: "app.js";
~~~

2. 数组，数组中的每一项都会被打包，形成互不依赖的文件

~~~
entry: ["app.js","main.js"];
~~~

3. 对象，对象中的每一项都会被打包，形成互不依赖的文件

~~~
entry:{
    app: "./src/js/app.js",
    main: "./src/js/main-c053464d83.js"
}
~~~

- 一般入口文件多是import或者require等模块导入命令。

### output

- 出口，webpack打包后文件的配置信息，常用属性有4个

1. path: `${__dirname }/dist` 打包后文件所在路径
2. filename: “js/[name].js” 打包后文件的名字，这里有 4 种常用的写法
   - 自定义
   - [name].js 代表的便是入口的文件名
   - [hash].js 此次打包后的hash值
   - [chunkhash] 该块打包后的hash值
3. publicPath: `"http://cdn.com/"` 上线时的公共路径，主要应用于线上
4. chunkFilename: ‘js/[name].js’ 按需加载模块时输出的文件名称

### loader

- Loader 是 Webpack 中最振奋人心的东西了！ 将一切浏览器不支持的语言，处理成 浏览器可以支持。 针对各个文件类型，都有各种的 Loader 等你去挖掘。
- Loader 的工作方式 是从右向左执行，链式地按照顺序进行编译。 loader 链中的第一个返回值给下一个 loader，在最后一个 loader，返回所预期的结果。
- loader 可以是同步或异步函数，也可使用 options 对象去接受配置参数。

~~~javascript
module:{
  rules:[
    {
      test:/\.xxx$/,//以xxx结尾的文件
      loader: "xxx-loader",
      exclude: {排除的路径},
      include: {包含的路径},
      options: {Loader配置}
    }
  ]
}
-----与下面的写法等价----
module:{
  rules:[
    {
      test:/\.xxx$/,use:["xxx-loader","xxx-loader"]
    }
  ]
}

~~~

- 其中每个loader都是一个对象

~~~
loaders:[
  {loader:"style-loader"},
  { loader: "css-loader?modules", options: { importLoaders: 1 } },
  {loader: "less-loader"}
]
~~~

- 使用!号拼接的写法

~~~
loader: "style-loader!css-loader?importLoaders=1!less-loader"
~~~

### plugins

-  在日常工作中，我们使用 Loader 处理不同类型的文件，当有某种其他方面的需求时，比如 抽离 CSS 、生成多页面 HTML ，plugins 便派上了用场。
- 插件的使用，一般都要先 require 出来，然后在 plugins 属性中 进行初始化

~~~
const htmlWebpackPlugin = require("html-webpack-plugin");
......
plugins: [ new htmlWebpackPlugin({/* options */}) ]
~~~

#### 常用插件

- clean-webpack-plugin 主要用于 打包之前 先清空 打包目录下的文件，防止文件混乱。

~~~
npm install --save-dev clean-webpack-plugin
~~~

- html-webpack-plugin 主要用于生成HTML，可以规定 模板HTML，也可以为 模板传入参数，压缩文件等

~~~
npm install --save-dev html-webpack-plugin
~~~

- 这个插件可谓是 前端必备的，它的配置有很多

~~~javascript
new htmlWebpackPlugin({
  //打包后的文件名
  filename: "index.html",
  
  //模板
  template: "index.html",
 
  //为true自动生成script标签添加到html中
  //或者写 body/head 标签名
  inject: false,//js的注入标签
 
  //通过<%= htmlwebpackplugin.options.title %>引用
  title: "参数title",
 
  //通过<%= htmlwebpackplugin.options.date %> 引用
  date: new Date()
 
  //网站的图标
  favicon: 'path/to/yourfile.ico'
 
  //生成此次打包的hash
  //如果文件名中有哈希，便代表有 合理的缓冲
  hash: true,
 
   //排除的块
   excludeChunks: [''],
  
  //选中的块 与入口文件相关
  chunks: ['app','people'],
 
  //压缩
  minify:{ 
   removeComments: true,
   collapseWhitespace: true,
   removeRedundantAttributes: true,
   useShortDoctype: true,
   removeEmptyAttributes: true,
   removeStyleLinkTypeAttributes: true,
   keepClosingSlash: true,
   minifyJS: true,
   minifyCSS: true,
   minifyURLs: true,
  }
 
}),
~~~

- 那么问题来了，我们在模板文件中 又该怎样使用参数呢？ 直接按照 ejs 的语法写入 html 文件即可！

~~~
<html lang="en">
<%= htmlWebpackPlugin.options.date %>
html>
~~~

- 生成后的模板文件

~~~
<html lang="en">
Thu Dec 07 2017 10:01:58 GMT+0800 (中国标准时间)
html>
~~~

- 另外，如果想生成 多页面应用，只需 将上面的配置，多复制几遍即可。

~~~
new htmlWebpackPlugin({ filename: "index1.html", }
new htmlWebpackPlugin({ filename: "index2.html", }
new htmlWebpackPlugin({ filename: "index3.html", }
~~~

- UglifyJsPlugin 主要用于压缩 Javascript 文件

~~~
npm i -D uglifyjs-webpack-plugin
~~~

- webpack.ProvidePlugin 自动加载模块，全局使用变量，下面借助 官网的DEMO

~~~javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})
// in a module
$('#item'); // <= 起作用
jQuery('#item'); // <= 起作用
// $ 自动被设置为 "jquery" 输出的内容
~~~

### devtool

- 不知道你现在时候有没有一个想法？ webpack 打包后的文件就一定正确无误吗？ 如果发生错误的话，该怎么办呢？
- devtool 属性 便提供了生成 sourcemap 的功能，具体有下面这些选项。

1. source-map 此选项具有最完备的source map，但会减慢打包的速度；

2. cheap-module-source-map 生成一个不带列映射的map

3. eval-source-map 使用eval打包源文件模块，生成一个完整的source map。

4. cheap-module-eval-source-map 这是最快生成source map的方法，生成后的Source Map 会和打包后的 

   JavaScript 文件同行显示，但没有列映射，所以慎用

### devServer

1. contentBase: “./dist”, 本地服务器所加载的页面所在的目录
2. historyApiFallback: true, 再找不到文件的时候默认指向index.html
3. inline: true, 当源文件改变时会自动刷新页面
4. hot: true, 热加载开启
5. port:8080 设置默认监听端口

### resolve

- extensions: [“.js”, “.html”, “.css”, “.txt”,”less”,”ejs”,”json”], 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
- extensions: [“.js”, “.html”, “.css”, “.txt”,”less”,”ejs”,”json”], 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名