---
title: 修复yarn安装报错：computed integrity doesn't match our records
tags: ['yarn']
date: 2022-04-12
draft: false
summary: 使用yarn安装依赖的时候一直报这个错误，然后一直使用`yarn cache clean --force`来尝试删除，发现一直无法解决问题，直到阅读了一下文档，才发现命令参数用错了。
---

### 遇到的问题

使用 yarn 安装依赖的时候一直报这个错误，然后一直使用`yarn cache clean --force`来尝试删除，发现一直无法解决问题，直到阅读了一下文档，才发现命令参数用错了。

computed integrity doesn't match our records

![image-20220412085302200](../../../public/static/md-img/image-20220412085302200.png)

### 解决方案：

1. 删除 yarn.lock 重新安装依赖。

   ```
   rm -rf yarn.lock
   ```

2. 清除 caceh 重新安装依赖（推荐）。

   ```
   # 移除所有依赖
   rm -rf node_modules
   # 删除全局和本地的缓存
   yarn cache clean --all

   ```

   1. 坑点：需要在项目目录外执行，不然仅仅删除 local cache 是有可能无法成功的。

### 参考资料：

1. [yarn cache clean](https://yarnpkg.com/cli/cache/clean)
