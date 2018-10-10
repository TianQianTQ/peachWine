## es8特性
::: tip
es8标准已于2017年6月发布
:::
### Object.values()
- 遍历对象属性值

```js(6)
let obj = {a: 1, b: 2, c: 3}
//    - 使用Object.keys()获取
Object.keys(obj).forEach((key) => {
  console.log(obj[key])
})
//    - 使用for/of 获取
for (let key of Object.keys(obj)) {
  console.log(obj[key])
}
//    - 使用es8
Object.values(obj).forEach(value => { console.log(value) })
console.log(Object.values(obj))  // 输出结果为value组成的数组 [1,2,3]
```
::: warning
虽然使用for/in也可以，但是当它碰到迭代枚举属性时，会破坏像prototype和tostring的属性得到意想不到的值。
:::
### Object.entries()
- 遍历对象的属性名和属性值
```
let obj = {a: 1, b: 2, c: 3}
// 使用Object.keys()遍历
Object.keys(obj).forEach((key) => {
  console.log(key + ':' + obj[key])
})
// 使用for/of遍历
for (let key of Object.keys(obj)) {
  console.log(key + ':' + obj[key])
}
// 使用Object.entries()
Object.entries(obj).forEach(([key, value]) => {
  console.log(key + ':' + value) 
})
console.log(Object.entries(obj)) // [['a',1],['b',2],['c',3]]
```
::: warning
Object.entries(x)强制x转换为对象，并以数组的方式返回其可枚举的自定义字符串
:::
### 字符串填充
- padStart()
在字符串开始部位填充空格，返回一个给出长度的字符串--常用于格式化字符串
```
console.log('abc'.padStart(10))
console.log('abcdef'.padStart(10))
//        abc
//     abcdef
console.log('123'.padStart(10,'*')) // *******123
```
- padEnd()
在字符串尾端填充空格，返回一个给出长度的字符串
```
console.log('0.00'.padEnd(20) + '0.00')
console.log('10,000.00'.padEnd(20) + '10,000.00')
// 0.00                0.00
// 10,000.00           10,000.00
console.log('158'.padEnd(11,'*'))  // 158********
console.log('158'.padEnd(11,'*').length)  // 11
```
### Object.getOwnPropertyDescriptors()
- Object.getOwnPropertyDescriptors返回对象obj所有自身属性描述。
这是一个多参数版本的Object.getOwnPropertyDescriptors(obj,propName)将会返回obj中propName属性的一个单独描述。
- 在ES5中，ECMAScript中没有单个方法来简化两个对象之间的正确拷贝。开发者要使用Object.assign()来拷贝对象, Object.assign()分配属性只有copy和定义新的属性。当我们使用更加复杂对象和类原型，这可能会出问题。
- Object.getOwnPropertyDescriptors允许创建真实的对象浅副本并创建子类,它通过给开发者描述符来做到这一点.在Object.create(prototype, object)放入描述符后，返回一个真正的浅拷贝。
```
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```
### 函数参数列表尾部允许逗号
- 避免不必要的报错
```
function(a,b,c){
    console.log(a)
}
// es8
function(a,b,c,){
    console.log(a)
}
```
### async/await -- 后续整理
- 使用promise写异步代码
```
function fetchData(url) {  
  return fetch(url)  
    .then(request => request.text())  
    .then(text => {  
      return JSON.parse(text);  
     })  
    .catch(err => {  
      console.log(`Error: ${err.stack}`);  
    });  
}
```
- 使用async/await
```
async function fetchData(url) {  
  try {  
   let request = await fetch(url);  
   let text = await request.text();  
   return JSON.parse(text);  
  }  
  catch (err) {  
    console.log(`Error: ${err.stack}`);  
  }  
}
```
::: warning
Async/Await是写异步代码的新方式，以前的方法有回调函数和Promise。相比于Promise，它更加简洁，并且处理错误、条件语句、中间值都更加方便，
因此有望替代Promise，成为新一代的一步代码编写方式。
:::

