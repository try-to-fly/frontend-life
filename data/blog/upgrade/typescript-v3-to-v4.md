---
title: 升级Typescript到v4版本
date: 2022-02-20
tags: ['Typescript']
draft: false
summary: typescript升级流程
---

# 升级 Typescript 到 v3 版本

### 前言

> v4 版本刚出的时候，尝试升级了。但是 error 都是 unkown 的报错，然后项目中需要修改大量的代码，就放弃了。没想到随后出来这个配置项：`useUnknownInCatchVariables`可以关闭这个错误提示。

早期项目一直使用的 v2 版本的`Typescript`，但是最新的版本已经是`4.5.5`了。为了使用新的特性还有[type-fest](https://github.com/sindresorhus/type-fest)模块，所以尝试把已有的项目更新一下新版本。

### 流程

1. 升级最新版本：`yarn add typescript`。

2. 添加`useUnknownInCatchVariables`

   ```json {4}
   {
     compilerOptions: {
       ...,
       useUnknownInCatchVariables: false
     }
   }
   ```

3. 处理其他报错。

   - The operand of a 'delete' operator must be optional：目前是`as any` 解决的，后续需要研究一个优雅的方法。
