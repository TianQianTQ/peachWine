---
title： 文件上传下载
---

## 文件上传

### 前端组件-使用Element封装的组件

```html{1}
<el-upload name="file" class="upload-demo" :action="/saveFiles/" 
 :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple 
 :on-exceed="handleExceed" :file-list="fileList" :on-success="uploadSuccess" :on-error="uploadError">
    <el-button type="primary">上传文件</el-button>
    <span slot="tip" class="el-upload__tip">(文件大小不能超过10M)</span>
</el-upload>
```
### 上传接口

```js
  appIndex.post('/saveFiles', function(req, res, next) {
    let filePath = ''
    if (process.env.NODE_ENV !== 'development') { // 生产模式
      if (!fs.existsSync(proPath)) {  // proPath 建立本地文件夹（未保存在数据库中）
        mkdirsSync(proPath)
      }
      filePath = proPath
    } else { // 开发模式
      filePath = path.join(__dirname, '/upFiles') // 在本地文件夹下保存上传文件
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
    }
    var form = new formidable.IncomingForm({ keepExtensions: true }) // 创建上传表单
    form.encoding = 'utf-8' // 设置编辑
    form.uploadDir = filePath // 设置上传目录
    form.keepExtensions = true // 保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024 // 文件大小
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.locals.error = err
        return
      } else {
        fs.rename(files.file.path, filePath + '/' + files.file.name, function(a, b) {
        })
      }
    })
    res.json({ success: '上传成功' })
  })

```
## 文件下载
- 创建a标签
  - 方案一
```html
<el-button type="primary" @click=downLoadFile()>下载文件</el-button>
```
```js
downLoadFile() {
    const self = this
    var url = `/downfile?name=${this.uploadFileName}`
    let divA = document.getElementById('download')  <!--按钮的父组件或该文件的父组件，用来添加a标签-->
    if (!divA) {
    divA = document.createElement('a')
    divA.setAttribute('id', 'download')
    }
    divA.style.display = 'none'
    divA.download = self.uploadFileName
    divA.href = url
    const parent = document.getElementById('content') // 修复firefox中无法触发click
    parent.appendChild(divA)
    divA.click()
    parent.removeChild(divA)
},
```
  - 方案二
```js
downloade(url) {
    let link = document.createElement('a')
    link.setAttribute('download', name)
    link.setAttribute('href', url)
    Object.assign(link.style, {
      opacity: 0,
      position: 'absolute',
      top: 0
    })
    document.body.appendChild(link)
    link.click()
    link.remove()
}
```
### 下载接口
- 使用express的download方法
```js
// 文件事先保存在downLoad文件夹下
appIndex.get('/downfile', function(req, res) {
    const fileName = req.query.name
    let filePath = path.join(__dirname, '/downLoad/') + fileName
    if (process.env.NODE_ENV !== 'development') { // 生产模式
      filePath = path.join(global.__static, '/downLoad/' + fileName)
    }
    if (fs.existsSync(filePath)) {
      res.download(filePath)
    } else {
      res.send(reMessage({ 'res': '文件不存在' }, false))
      // 跳转
    }
  })
```
- 使用转文件流方式
```js
 appIndex.get('/downfile', function(req, res) {
    const fileName = req.query.name
    console.log(fileName)
    let filePath = path.join(__dirname, BASEURL + '/downLoad/') + fileName
    if (process.env.NODE_ENV !== 'development') { // 生产模式
      filePath = path.join(global.__static, '/downLoad/' + fileName)
    }
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-type', 'application/octet-stream')
      const name = urlencode(fileName, 'utf-8')
      res.setHeader('Content-Disposition', "attachment; filename* = UTF-8''" + name)
      var fileStream = fs.createReadStream(filePath)
      fileStream.on('data', function(data) {
        res.write(data, 'binary')
      })
      fileStream.on('end', function() {
        res.end()
      })
    } else {
      res.send(reMessage({ 'res': '文件不存在' }, false))
    }
  })
```