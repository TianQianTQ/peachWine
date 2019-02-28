---
title: 属性方法
---
### js防抖函数与节流函数
#### 一些概念

 - **描述** ：函数防抖与节流都是优化高频率js函数执行的手段。
 -  **本质**：在时间轴上控制函数的执行次数
 -  **作用**：防止函数“短时间”的重复执行
#### 问题引入：

 - 用户在网络比较差的情况下提交表单，多次点击提交按钮导致表单重复提交
 - 监听scroll滚动事件，根据滚动位置显示返回顶部按钮
 
 #### 函数防抖

- **概念** ：在函数触发N秒后执行，如果在N秒时间内再次触发，则从再次触发的时间节点开始重新计时N秒之后执行。
- **实例理解**：电梯从开门到关门运行需要1分钟，假设电梯目前停留在一楼，这时A按开门走进来【触发事件】，电梯将在1分钟之后关门运行【执行监听器】；等待了30秒之后，B走进来【又一次触发事件】，电梯重新开始计时【清空计时器，重新执行监听器】，到B进来1分钟之后电梯才会关门运行。
- **代码**

```
function debounce(fn, wait) {
  var timer = null;
  return function () {
      var context = this
      var args = arguments // fn函数的参数
      if (timer) {        // 如果存在timer，说明之前有一个事件进来计时，这里清除定时器重新计时
          clearTimeout(timer);
          timer = null;     // 清空timer 下次重启定时器
      }
      timer = setTimeout(function () {
          fn.apply(context, args)  // wait时间之后再去执行fn函数
      }, wait)
  }
}
var fn = function () {
  console.log('执行')
}
setInterval(debounce(fn,500),1000) // 第一次在1500ms后触发，之后每1000ms触发一次
setInterval(debounce(fn,2000),1000) // 不会触发一次 因为第一次执行需要2000秒，但是每隔1000秒就执行一次，到最后也不会停止，也就不会执行
```
- 另一种方法【es6】
```
function debounce(fn, wait, ...arr) {  // fn为要触发的函数，wait是所需要等待的时间，arr是传递给fn的参数
  let timer = null;
  return () => {
    if (timer) {                             // 如果存在timer，说明之前有一个事件进来计时，这里清除定时器重新计时
      clearTimeout(timer);
      timer = null;                     // 清空timer 下次重启定时器
    }
    timer = setTimeout(() => {
      fn(...arr);                     // wait时间之后再去执行fn函数
    }, wait);
  };
}
```
 #### 函数节流

- **概念** ：规定一个时间，在这个时间内只有一次触发事件的回调函数执行，如果在同一时间内某个事件被多次触发，只能有一次生效。
- **实例理解**：下载文件，点击下载之后，文件随即触发保存路径页面，如果在规定时间内连续点击下载，只调用一次保存路径页面
- **代码**

```
function throttle(fn, gapTime) {
  let _lastTime = null;
  return function () {
    let _nowTime = + new Date()            // 定义回调函数被调用的当前时间
    if (_nowTime - _lastTime > gapTime || !_lastTime) {       // 判断当前时间与上次执行回调函数的时间间隔 和规定时间做比较
      fn();
      _lastTime = _nowTime                         // 重置上次执行时间为当前时间 方便下次执行
    }
  }
}
let fn = ()=>{
  console.log(‘执行')
}
setInterval(throttle(fn,1000),10) // 每隔10毫秒触发一次throttle函数，每隔1000毫秒触发一次fn函数回调，所以最终结果是1秒打印一次执行
```

 - 另一种方法【es6】

```
function throttle(fn, gapTime, ...arr) {   // fn为要触发的函数，gapTime是定义的单位时间，arr是传递给fn的参数
  let _lastTime = 0;          // 上次执行时间 第一次马上执行
  return () => {
    let _nowTime = Date.now();               // // 定义回调函数被调用的当前时间
    // 当前时间-上次执行的时间是否超过间隔时间 就执行回调
    if (_nowTime - _lastTime > gapTime) {
      fn(...arr); // ...arr为fn的参数
      _lastTime = _nowTime;        // 重置上次执行时间为当前时间 方便下次执行
    }
  };
}
```
 
 
