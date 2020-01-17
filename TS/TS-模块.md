## TS-模块

- 在TS里面除了AMD,CMD，es6的模块化规范之后，还支持自己的模块化。

- CommonJS和AMD都有一个`exports`对象的概念，它包含了一个模块的所有导出内容。

  它们也支持把`exports`替换为一个自定义对象。 默认导出就好比这样一个功能；然而，它们却并不相互兼容。 TypeScript模块支持`export =`语法以支持传统的CommonJS和AMD的工作流模型

  **`export =`语法定义一个模块的导出对象。 它可以是类，接口，命名空间，函数或枚举。**

- 若要导入一个使用了`export =`的模块时，必须使用TypeScript提供的特定语法`import module = require("module")`。

