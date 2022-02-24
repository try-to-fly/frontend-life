---
title: Es6 模块介绍
date: '2022-01-12'
tags: ['es6', 'module', 'javascript']
draft: false
summary: Es6 模块介绍。关于 commonJs、EsModule区别
---

### 前言

本文仅概要记录模块相关信息，具体细节详见尾部参考链接

### 模块的区别

1. `AMD`： 用于浏览器。

2. `CommonJs`：用于服务器。

   - 模块就是对象
   - 运行时加载
   - `module.exports` 用于模块导出。
   - `require`用于模块的加载。
   - 不能在`.mjs` 文件中使用。

3. `Module`：

   1. `Node.js` 版本默认开启支持。

   2. 编译时加载，编译时就可以确定依赖关系、确定导入和输出的变量。

   3. Es6 Module 不是对象，导入方式和对象结构相似，但并不属于。

   4. `import`、`export`只能在顶层使用。

   5. `export`命令

      - `export`规定的是对外的接口，必须和模块内部的变量建立对应关系。
      - `export * `会忽略引用模块 default 方法（待验证）

   6. `import`命令

      - 具有提升效果。
      - 输入的变量都是只读的（如果是对象的话，还是可以修改其引用属性的，但是不建议）。
      - 不能使用表达式或者变量。
      - 重复执行`import`语句，仅会执行一次。
      - 整体加载：使用\*指定一个对象，所有的输出都会加载上去。

   7. `import()` 方法（`ES2020`）

      - 和`import`的区别是，该方法是动态加载，返回一个 Promise。

      - 适用的地方：

        - 按需加载：`Route组件`等。
        - 条件加载：类似`require`方法，可以在条件语句中使用。
        - 动态模块路径：可以使用表达式作为模块的路径。

      - ###### 加载成功后，会返回一个对象，可以使用结构赋值来获取。

### 模块的加载

1. 浏览器默认同步加载`JavaScript` 脚本。
   - `defer`、`async` 属性用于异步加载。
   - `defer` ：需要等 Dom 渲染完才执行：可以按照顺序加载。
   - `async`：下载完就执行，无法保证加载顺序。
   - type=module 的脚本，默认使用 defer 属性。
2. `CommonJs`:
   - 输出的值的拷贝，会缓存。
     - 内部变化不会影响到输出结果。
   - require 加载的是一个对象
3. `Module`:
   - 输出的是值的只读引用。
     - 会跟随内部值一起变化。
   - `export`通过接口，输出的是同一个值。
     - 不同地方的`import`都指同一个引用。

### 循环依赖

## 参考资料

1. [Module 的语法](https://es6.ruanyifeng.com/#docs/module)
2. [How and when to use Async and Defer attributes](https://zellwk.com/blog/javascript-async-and-defer/)
3. [JavaScript modules 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
4. [深入 CommonJs 与 ES6 Module](https://segmentfault.com/a/1190000017878394)
5. [Modules: ECMAScript modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules)
