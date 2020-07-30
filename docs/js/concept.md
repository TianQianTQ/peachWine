---
title: 概念相关
---

### event loop
::: tip
此处参考阮一峰的[JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html "超链接title")
:::

#### JavaScript单线程
1. 单线程：在程序执行时，所走的程序路径按照连续顺序排下来，前面的必须处理好，后面的才会执行。即，同一个时间只能做一件事
2. js的单线程，与它的用途有关。
3. js主要任务是处理与用户之间的交互，即响应DOM的增删改，而使用事件队列的形式，一次事件循环只能处理一个事件响应，使得脚本相对连续，所以有了事件队列，用来存储待执行的事件。

#### 任务队列
任务分为两种：同步与异步

---
1. 同步指在主线程上排队执行的任务，只有前一个任务执行完成，下一个任务才能开始执行，所有同步任务都在主线程上执行，形成一个执行栈

2. 异步指任务不进入主线程，而进入**任务队列**，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

::: tip
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）
:::

#### 宏任务与微任务

<demo-1/>