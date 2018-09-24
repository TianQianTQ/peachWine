## 选择元素
- d3.select():是选择所有指定元素的第一个
- d3.selectAll():是选择指定元素的集合
- 选择函数中可以是元素或id名/class名
- [ ] d3.select('#container');
- [ ] d3.select('.Myclass')
## 添加文字
- text('')
## 绑定数据
- datum():绑定一个数据到选择集上
- data():绑定一个数组到选择集上，数组各项值分别与选择集的各元素绑定

```
            var p1 = d3.selectAll('p');
		 	var str = 'china';	 
		 	p1.datum(str);	 
		 	p1.text(function(d,i){	 	
	 	        return '第'+i+'个元素绑定的数据是'+d
		 	})
		 	
		 	var str = ['sss','ddd','fff'];
			var p1 = d3.selectAll('p');
			p1.data(str).text(function(d,i){
				return d
			})
```
## 插入元素
- append():在选择集末尾插入元素
- insert():在选择集前面插入元素

```
        // script代码在body闭合标签之后
        // 在id为myid的标签前面插入p标签
        var body = d3.select('body')
		body.insert('p','#myid').text('dfdsfs')
		// 在p标签内部插入p标签
		p1.insert('p').text('this is add div');
```
## 删除元素
- remove()

```
        // 删除class名为myClass的元素
        var p = d3.select('.myClass');
		p.remove();
```