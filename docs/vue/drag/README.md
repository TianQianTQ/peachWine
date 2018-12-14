---
title： vue拖拽介绍
---
## 基本方法介绍

**基本使用方法同HTML5**
[w3school](http://www.w3school.com.cn/html5/html_5_draganddrop.asp)

## 方法介绍
 ### draggable  
 - 为了使元素可拖动，设置draggable="true"
 - 默认情况下，图像、链接和被选中的文本是可以拖动的，因为它们的draggable自动设置为true
 ### 应用于被拖动元素上的事件
   #### dragstart
   - 在被拖放的元素上触发该方法（按下鼠标拖动开始）
   #### drag
   - 触发dragstart事件后，随后触发drag事件（在元素拖动期间，持续触发）
   #### dragend
   - 拖动事件结束时触发（当鼠标松开）
 ### 应用于放置区域的事件
   #### dragenter
   - 当元素被拖动在可放置区域时触发
   #### dragover
   - 触发dragenter之后，只要被拖拽元素一直在可放置区域，便持续触发
   #### dragleave
   - 当被拖拽元素被拖出可放置区域，dragover事件不再触发，dragleave事件开始触发】
   #### drop
   - 当被拖拽元素放在可放置区域内，则会触发该事件
 ### 传递数据
   #### dataTransfer对象
   - 是事件对象的一个属性，只能在拖放事件的处理程序中访问。
     ##### setData(format, data)
     - 在dragstart事件中，针对被拖放元素调用setData()函数，用来传递数据，第一个参数是数据类型，支持“text”和“url”，第二个是字符串，表示要传递的数据
     ##### getData(format)
     - 在drop事件中，针对放置目标调用getData()函数，取得传递过来的值。第一个参数是getData中设置的数据类型
     ##### setDragImage(element, x, y)
     - 指定一副图像，当拖动发生的时候，显示在光标的下方。接受3个参数： 要显示的HTML元素和光标在图像中的x,y坐标。其中HTML元素可以是一幅图像，也可以是其他元素。
     ##### clearData(format)
     - 在drop中使用完取得的数据之后销毁数据
 ### 事件执行顺序
 - drop不触发时（即拖动到可放置区域但是又拖出去释放）：dragstart > drag > dragenter > dragover > dragleave > dragend 
 - 触发时（即拖放到正确的位置）：　dragstart > drag > dragenter > dragover > drop > dragend
 ### 阻止事件默认行为
 - dragover的时候无法将数据/元素放置到其他元素中。如果需要设置允许放置，必须阻止对元素的默认处理方式。
 - 通过调用 ondragover 事件的 event.preventDefault() 方法：event.preventDefault()
