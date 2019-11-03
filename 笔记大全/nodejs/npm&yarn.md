### 包的概念

- 多个模块可以组合成包，不过需要满足特定的规则才能形成规范的包。

#### NPM （node.js package management）

- 全球最大的模块生态系统，里面所有的模块都是开源免费的；也是Node.js的包管理工具。
- npx是npm v5.20引入的一条命令，使用本地已安装的可执行工具，而不需要配置 scripts。我们可以在终端运行非全局安装的工具，只需加上npx前缀即可。

官方网站： https://www.npmjs.com/

#### NPM包安装方式

##### 本地安装

- 本地安装： 本地安装的包在当前目录下的node_modules里面，本地安装的包一般用于实际的开发工作。

##### 解决npm安装包被墙的问题（淘宝镜像）

- -registry
  - npm config set registry https://registry.npmjs.org 
- cnpm
  - 淘宝NPM镜像,与官方NPM的同步频率目前为10分钟一次 
  - 官网: http://npm.taobao.org/ 
  - npm install -g cnpm –registry=https//registry.npm.taobao.org 
  - 使用cnpm安装包: cnpm install 包名
  - 这个是装包工具，当我们安装这个工具后，我们就可以使用cnpm install 包名
- nrm
  - 作用：修改镜像源 
  - 项目地址：https://www.npmjs.com/package/nrm 
  - 安装：npm install -g nrm

##### 全局安装

- 全局安装 -g，全局安装的包位于Node.js环境的node_modules目录下，全局安装的包一般用于命令行工具。

##### NPM常用命令

1. 安装包（如果没有指定版本号，那么安装最新版本）
   npm install -g 包名称 (全局安装)
   npm install 包名称 (本地安装)
      安装包的时候可以指定版本
   npm install -g 包名称@版本号

2. 卸载包
   npm uninstall -g 包名

3. 更新包（更新到最新版本）
   npm update -g 包名

4. 当清node_modules 出现某一些包错误时候，查不到原因时候，可以适当的清除缓存试试。删掉重新安装。

   rm -rf node_modules
   npm cache clean
   npm install

##### 自定义包

- 在工作中我们主要使用自定义包完成工作，自定义包需要符合规范
  - 首先需要 我们需要创建一个包，即创建一个文件夹。
  - 然后再这个包中创建入口文件 index.js
  - 需要生成一个package.json文件来描述这个包的信息。
  - 在命令行输入 npm init 或者 npm init -y 即可生成package.json
  - 在package.json文件中有关于包强烈标识信息的name和version，来区分包.
  - 在命令行输入 node .  就可以执行index.js里面的代码，其实就在执行package.json中main属性指向的文件。
  - 在命令行输入 npm run test 就是执行scripts属性中test所指向的文件。我们可以添加属性然后指定路径，注意路径前面要加 node 标识 ,就可以运行指定属性对应的路径文件了。
- 我们通常需要在自定义的包中引入第三方的包， 本地安装的包在当前目录下的node_modules里面。
  - 我们引入一个art-template包

```
 //渲染模板
 var template = require('art-template');
var html = template(__dirname + '/tpl-user.art', {
    user: {
        name: 'aui'
    }
});
```

- 然后我们需要给出模板文件的路径。
- 注意：我们在引入包时，包的名称需要和package.json文件中name属性保持一致。

##### 包与包之间的依赖关系

- 如果两个包中存在依赖关系，那么我们在安装包是需要明确指出。
- 比如我们自定义的包中安装了其他包来实现功能，那么说明自定义的包依赖于其他包，所以我们需要说明依赖关系。
  **依赖关系是怎样产生的**
- 按照我的想法是直接把自定义包直接上传，那么所有的包都可以获得，我们就可以直接使用这些包。
- 其实是我们在上传包的时候，因为包的数据太大，所以我们不能直接将其上传。所以我们需要指明配置关系，那么在这个包在运行时会根据依赖关系随时的安装对应的包。
- 我们需要在安装包的时候添加依赖关系，就说明当前的包依赖于这个包
  开发环境（平时开发使用的环境）
  生产环境（项目部署上线之后的服务器环境）
  --save-dev 向开发环境添加依赖 DevDependencies 
  --save 向生产环境添加依赖 dependencies
  因为开发环境和生产环境的包有可能不一样。
- 当我们指明依赖关系后，会在自定义包（我称为主包）的package.json文件中添加配置信息。
- 上述步骤结束后，我们其实就可以删除有依赖关系的包了，因为已经明确依赖关系，我们就可以在运行包时让其自动下载依赖的包。
  npm install --production  //安装生产环境中依赖的包
  npm install //这样的就会安装所有环境下的包  
- 如果在node_mudele文件不存在的情况下，我们可以npm install //这样的就会安装所有环境下的包  

#### yarn 包管理工具

- 安装yarn工具：npm install -g yarn

##### yarn命令

```
1、初始化包
npm init
yarn init
2、安装生产环境依赖包包
npm install xxx --save
yarn add xxx  //默认是生产环境的依赖
3、移除包
npm uninstall xxx
yarn remove xxx
4、更新包
npm update xxx
yarn upgrade xxx
5、安装开发依赖的包
npm install xxx --save-dev
yarn add xxx --dev
6、全局安装
npm install -g xxx
yarn global add xxx
7、设置下载镜像的地址
npm config set registry url
yarn config set registry url
8、安装所有依赖
npm install
yarn install
9、执行包
npm run
yarn run
```

#### 详解自定义包

- package.json必须在包的顶层目录下
- 二进制文件应该在bin目录下
- 其他JavaScript模块应该在lib目录下
- 文档应该在doc目录下
- 单元测试应该在test目录下

##### 自定义包步骤

```
1.新建文件夹 mypack，里面通常有一个入口文件 index.js。
2.通过命令行，npm init 或者 npm init -y，生成package.json文件，在package.json文件中有关于包强烈标识信息的name和version，来区分包，通常包的名称为小写，可以包含 - 和 下划线 ;版本的书写符合语义化版本 1.1.1 类似这种形式;main属性是指入口文件需要保持一致。
```

#### package.json字段分析

- name：包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格
- description：包的简要说明
- version：符合语义化版本识别规范的版本字符串
- mian ：这个模块的入口文件，在这个文件中把需要暴露的模块暴露出去，这样别人在引入我的模块时，只能访问在这个文件中暴露出去的模块。
- keywords：关键字数组，通常用于搜索
- maintainers：维护者数组，每个元素要包含name、email（可选）、web（可选）字段
- contributors：贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一- 个元素
- bugs：提交bug的地址，可以是网站或者电子邮件地址
- licenses：许可证数组，每个元素要包含type（许可证名称）和url（链接到许可证文本的- 地址）字段
- repositories：仓库托管地址数组，每个元素要包含type（仓库类型，如git）、url（仓- 库的地址）和path（相对于仓库的路径，可选）字段
- dependencies：生产环境包的依赖，一个关联数组，由包的名称和版本号组成
- devDependencies：开发环境包的依赖，一个关联数组，由包的名称和版本号组成





