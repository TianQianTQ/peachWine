## 方法比较
### v-show 与v-if

- 性能比较
   - v-show  切换css的display属性，在页面第一次加载就会出现，有较高的初始化渲染消耗【频繁切换需求使用】
   - v-if  添加/删除DOM结构，故有更高的切换消耗【条件很少改变】
- 跳坑场景【消息提示】
   - 背景：页面添加消息提示，分为提示红点和提示框。通过接口返回参数判断红点与提示框的显示
   - 梳理：
      - 红点是与提示框不同时显示【有红点说明有未读消息】，此处显示与否用v-show控制
      - 消息框使用接口提供的数据显示，接口在页面第一次渲染请求与返回，之后不再动，另消息体也由后端返回，使用v-show第一次也会渲染，导致报错，直到有数据返回报错停止，使用v-if效果更佳
### a标签跳转 与 vue-router跳转

- 区别
    - vue-router跳转 只刷新部分内容的情况，大部分页面结构不变，减少DOM性能消耗
    - a标签跳转  所有内容重新渲染
- 跳坑场景【store数据刷新】
    - 背景：状态存储于store中，使用a标签跳转，store中的状态重新初始化，导致数据显示有误
- 补充 vue-router 实现原理

   
