---
title: 时间格式化转换【ms模块】源码解析
date: 2022-02-20
tags: ['source-code', 'npm', '正则']
draft: false
summary: 从源码研究ms模块是如何格式化时间字符
---

### 前言

[ms](https://www.npmjs.com/package/ms)属于我最喜欢的模块之一，简单小巧，可以很方便的转换时间，所以本文分析下该模块是如何转换的，也是为了简单分析一下`正则`的一个使用场景。

### 使用场景：

1. 设置 5 分钟 timeout 的时候，就不需要写类似这样的时间了: `1000 *60* 5`

   ```ts
   setTimeout(() => {
     console.log('hello')
   }, ms('5m'))
   ```

2. 把给定的时间（毫秒）转换成可读的输出。

   ```ts
   const time = 1000 * 60 * 5
   ms(time) // 5m
   ```

3. 支持负号（目前还没有改使用场景，这里就忽略了）

### 源码分析：

1. 入口判断入参类型：如果是`string`，则执行`parse`方法转毫秒。如果是`number`则执行`format`方法转可读字符串。

   ```js
   if (typeof value === 'string' && value.length > 0) {
     return parse(value)
   } else if (typeof value === 'number' && isFinite(value)) {
     return options?.long ? fmtLong(value) : fmtShort(value)
   }
   ```

2. `parse`方法：

   - 使用[正则](https://regex101.com/r/3YNdhG/1)的[捕获分组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-capturing-parentheses)提取符号、数值、单位。

     - 使用`^`和`$`表示匹配完整的字符（也不能多）。
       - 提取数值和符号（如何匹配一个数值的正则）：`(-?(?:\d+)?\.?\d+)`
         <img src="../../../public/static/md-img/image-20220220170100998.png" alt="image-20220220170100998" style="zoom:33%;" />
       - 匹配可选符号：`-?`
       - 匹配可选整数部分: `(?:\d+)?`
       - 匹配可选小数点：`\.?`
       - 匹配至少一个数值: `\d+`
     - 提取可选单位（也说明了这个模块不支持 i18n）：`(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?`

   - 然后根据提取的单位换算毫秒即可。

3. format 方法：

   入参分别和日、小时、分钟、秒做比较，分别返回对应的格式即可。

   ```ts
   function fmtShort(ms: number): StringValue {
     const msAbs = Math.abs(ms)
     if (msAbs >= d) {
       return `${Math.round(ms / d)}d`
     }
     if (msAbs >= h) {
       return `${Math.round(ms / h)}h`
     }
     if (msAbs >= m) {
       return `${Math.round(ms / m)}m`
     }
     if (msAbs >= s) {
       return `${Math.round(ms / s)}s`
     }
     return `${ms}ms`
   }
   ```

### 总结：

1. `ms`使用正则提取字符串日期。
2. 不支持 i18n 配置。
3. format 方法最大的单位是`day`，所以不可能输出超过这个单位的字符。
