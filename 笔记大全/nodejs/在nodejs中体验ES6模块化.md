## nodejs中体验ES6模块化

- 虽然nodejs中有自己的模块化规范CommonJS，但是我们也可以在nodejs中使用ES6模块化规范。
- 我们需要Bable第三方包，来报ES6的语法转为低版本的js语法。
- Node.js 中通过 babel 体验 ES6 模块化

1. npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node 
2. npm install --save @babel/polyfill
3. 项目跟目录创建文件 babel.config.js
4. babel.config.js 文件内容如右侧代码

~~~
const presets = [
    ["@babel/env", {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1"
      }
    }]
  ];
  module.exports = { presets }
~~~

5. 通过 npx babel-node index.js 执行代码