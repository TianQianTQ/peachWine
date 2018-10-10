## es7特性

### includes()
-  不使用es7时

```
// 例1：
function isFruits(fruits){
    if(fruits == 'apple' || fruits == 'banana' || fruits == 'pear'){
        return true
    }
    return false
}
console.log(isFruits('baba'))
console.log(isFruits('apple'))
// 例2：
let arr = ['apple', 'banana', 'pear'];
 
if (arr.indexOf('apple') !== -1)
{
    console.log('apple');
}
```
- 使用es7时

```
// 例1：
let species = ['apple', 'banana', 'pear']
function isFruits(fruits){
    return species.includes(fruits)
}
console.log(isFruits('baba'))
console.log(isFruits('apple'))
// 例2：
let arr = ['apple', 'banana', 'pear'];
if (arr.includes('apple'))
{
    console.log('apple');
}
```
### 指数操作符
- 不使用es7时
```
// 方法：Math.pow()
   console.log(Math.pow(2,3))  // 8
   
```
- 使用es7时
```
console.log(2 ** 3)  // 8
```