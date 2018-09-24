## 方法

## count-exceed-limit
- **方法说明:**
  * 图片超出限制函数，返回参数为more表示超过限制，为less表示小于限制
- **返回值:**
  * exceedType

## image-upload-error
- **方法说明:**
  * 图片加入待上传数组出错
- **返回值:**
  * errorCode
  
## upload-img
- **方法说明:**
  * 上传图片，用户点击上传按钮触发，返回当前待上传图片数组
- **返回值:**
  * files数组
  
## image-list-change
- **方法说明:**
  * 每成功添加一张图片到待上传数组便会触发此回调
- **返回值:**
  * 添加到数组的file对象
  