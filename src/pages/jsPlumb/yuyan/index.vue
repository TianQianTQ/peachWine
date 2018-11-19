<template>
  <div class="flowChart">
<<<<<<< HEAD
    <sti-button @click='designModelChange'>{{designModel}}</sti-button>
    <div v-if="getDesignModel">
      <sti-button @click='addLineChange'>{{addLine}}</sti-button>
    </div>
    <div class="flowChart-flow">
        <div class="flowChart-item"
            :id="item.id" v-for="(item,index) in flowData"
            :key="index"
            :style="{'left': item.left, 'top': item.top,}">
            {{item.name}}
        </div>
    </div>
    <p>资料参考：<a href="https://jsplumbtoolkit.com" target="_blank">https://jsplumbtoolkit.com</a></p>
=======
    <el-button type="primary" @click='designModelChange'>{{designModel}}</el-button>
    <div v-if="getDesignModel">
      <el-button type="primary" plain @click='addLineChange'>{{addLine}}</el-button>
      <el-button type="primary" plain @click='addNode'>添加</el-button>
    </div>
    <div class="flowChart-flow">
      <div class="flowChart-item"
        :id="item.id" v-for="(item,index) in flowData" :key="index"
        :style="{'left': item.left, 'top': item.top,}">{{item.name}}</div>
    </div>
>>>>>>> e58e0c3fed759d924197a998ecbd2b0b5d269eee
  </div>
</template>
<script>
export default {
  data () {
    return {
      designModel: '打开自定义模式',
      getDesignModel: false,
      addLine: '增加连线',
      getAddLine: true,
      endPoints: [],
      flowData: [
        {
          id: 'flow-1',
          name: '流程图节点1',
          left: '20%',
          top: '25%',
          target: [
            {
              id: 'flow-2',
              anchors: ['RightMiddle', 'LeftMiddle']
            }
          ]
        },
        {
          id: 'flow-2',
          name: '流程图节点2',
          left: '45%',
          top: '25%',
          target: [
            {
              id: 'flow-3',
              anchors: ['RightMiddle', 'TopCenter']
            }
          ]
        },
        {
          id: 'flow-3',
          name: '流程图节点3',
          left: '70%',
          top: '50%',
          target: []
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      this.$nextTick(() => {
        this.init()
      })
    },
    // 初始化
    init () {
      /* eslint-disable */
<<<<<<< HEAD
            let self = this;
            console.log('开始')
              jsPlumb.ready(() => {
                console.log(this.flowData)
                this.flowData.forEach(item => {
                    item.target.forEach(target => {
                      console.log(target)
                      console.log(item.id)
                      console.log(target.id)
                      console.log(target.anchors)
                        jsPlumb.connect({
                          source: item.id,
                          target: target.id,
                          detachable: false,
                          scope: 'flowScope',
                          cssClass: 'flowChart-line',
                          connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                          anchors: target.anchors,
                          endpointStyle: { fill: 'none' }
                        });
                    })
                });     
            })
              
            // let self = this;
            // this.flowInstance = jsPlumb.getInstance();
            //   jsPlumb.ready(){
            //   self.flowData.forEach(item =>{
            //     item.target.forEach(target =>{
            //       jsPlumb.connect({
            //         source: item.id,
            //         target: target.id,
            //         anchors: target.anchors
            //       })
            //     })
            //   })
            // })
            
            
        },
        // 自定义模式开关
        designModelChange() {

        }
=======
      let self = this;
      // this.flowInstance = jsPlumb.getInstance();
      console.log('开始')
      jsPlumb.ready(() => {
        this.flowData.forEach(item => {
          item.target.forEach(target => {
            jsPlumb.connect({
              source: item.id,
              target: target.id,
              detachable: false,
              scope: 'flowScope',
              cssClass: 'flowChart-line',
              connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
              anchors: target.anchors,
              endpointStyle: { fill: 'none' }
            });
          })
        });     
      }) 
    },
        // 开关
      designModelChange() {
          this.getDesignModel = !this.getDesignModel
          if (this.getDesignModel) {
              this.designModel = '关闭自定义模式'
              this.addEnable()
          } else {
              this.designModel = '打开自定义模式'
              if (this.getAddLine) {
                  this.addDisable()
              } else {
                  this.deleteDisable()
              }
              this.$confirm('是否保存当前布局?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  console.log('保存')
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
              }).catch(() => {
                  console.log('取消')
                  jsPlumb.reset();
                  this.getData()
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });          
              });
          }
      },
      // 连线操作
      addLineChange() {
          if(this.getAddLine){
              this.addLine = '删除连线'
          } else {
              this.addLine = '增加连线'
          }
          this.getAddLine = !this.getAddLine
      },
      addNode() {
          this.flowData.push({
              id: `flow-${this.flowData.length + 1}`,
              name: `流程图节点${this.flowData.length + 1}`,
              left: '0',
              top: '0',
              target: []
          })
      },
      addEnable() {
          let self = this;
          /* eslint-disable */
          this.endPoints = [];
          this.flowData.forEach(item => {
              let endpointOptions = {
                  endpoint: 'Dot',
                  isSource: true,
                  isTarget: true ,
                  maxConnections: -1,
                  connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                  connectorClass: 'flowChart-line'
              };
              jsPlumb.draggable(item.id,{cintainment:'parent'});
              this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'TopCenter' }, endpointOptions));
              this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'BottomCenter' }, endpointOptions));
              this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'RightMiddle' }, endpointOptions));
              this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'LeftMiddle' }, endpointOptions));
          });

          // 监听添加元素
          jsPlumb.bind('connection', (info) => {
              let sourceKey = info.sourceEndpoint.anchor.x * 10 + '' + info.sourceEndpoint.anchor.y * 10;
              let targetKey = info.targetEndpoint.anchor.x * 10 + '' + info.targetEndpoint.anchor.y * 10;
              this.updateConnections.push({
                  sourceId: info.sourceId,
                  targetId: info.targetId,
                  anchors: [anchors[sourceKey], anchors[targetKey]]
              })
          });
      },
      // 变化节点删除端点
      addDisable: function() {
          /* eslint-disable */
          jsPlumb.unbind('connection');
          this.updateConnections.forEach(item => {
              jsPlumb.connect({
                  source: item.sourceId,
                  target: item.targetId,
                  detachable: false,
                  scope: 'flowScope',
                  cssClass: 'flowChart-line',
                  connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                  anchors: item.anchors,
                  endpointStyle: { fill: 'none' }
              })
          })
          this.endPoints.forEach(item => {
              jsPlumb.deleteEndpoint(item);
          })
      },
      // 端点可分
      deleteEnable: function() {
          jsPlumb.getConnections({scope:"flowScope"}).forEach(connection => {
              let sourceKey = connection.endpoints[0].anchor.x * 10 + '' + connection.endpoints[0].anchor.y * 10;
              let targetKey = connection.endpoints[1].anchor.x * 10 + '' + connection.endpoints[1].anchor.y * 10;
              jsPlumb.detach(connection);
              jsPlumb.connect({
                  source: connection.sourceId,
                  target: connection.targetId,
                  detachable: true,
                  scope: 'flowScope',
                  cssClass: 'flowChart-line',
                  connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                  anchors: [anchors[sourceKey], anchors[targetKey]]
              });
          })
      },
      // 端点不可分
      deleteDisable: function() {
          jsPlumb.getConnections({scope:"flowScope"}).forEach(connection => {
              let sourceKey = connection.endpoints[0].anchor.x * 10 + '' + connection.endpoints[0].anchor.y * 10;
              let targetKey = connection.endpoints[1].anchor.x * 10 + '' + connection.endpoints[1].anchor.y * 10;
              jsPlumb.detach(connection);
              jsPlumb.connect({
                  source: connection.sourceId,
                  target: connection.targetId,
                  detachable: false,
                  scope: 'flowScope',
                  cssClass: 'flowChart-line',
                  connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                  anchors: [anchors[sourceKey], anchors[targetKey]],
                  endpointStyle: { fill: 'none' }
              });
          })
      },
      toggleAnimation: function(id) {
            let self = this;
          let connects= jsPlumb.getConnections({scope: "active", source: id});
          if (connects.length > 0) {
              connects.forEach(connection => {
                  jsPlumb.detach(connection);
              })
              return;
          }
          let node = this.flowData.find(item => {
              return item.id == id;
          })
          node.target.forEach(target => {
              jsPlumb.connect({
                  source: node.id,
                  target: target.id,
                  detachable: false,
                  cssClass: 'flowChart-active-line',
                  scope: 'active',
                  connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                  anchors: target.anchors,
                  endpointStyle: { fill: 'none' }
              });
          })
      }
>>>>>>> e58e0c3fed759d924197a998ecbd2b0b5d269eee
    }
}
</script>
<style >
.flowChart {
    width: 100%;
<<<<<<< HEAD
    height: 80%;
}
.flowChart .flowChart-flow{
    position: relative;
        width: 100%;
        height: 100%;
}

=======
    height: 600px;
    border: 1px solid red;
    &> .flowChart-flow {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid red;
    }
>>>>>>> e58e0c3fed759d924197a998ecbd2b0b5d269eee
    .flowChart-item {
        position: absolute;
        background: #3464e2;
        color: #fff;
        padding: 10px;
        border-radius: 22px;
    }
    .flowChart-line path {
            stroke: #3464e2;
            stroke-opacity: 0.2;
            stroke-width: 7px;
    }
    .flowChart-active-line path {
            stroke-dasharray: 1 20;
            stroke-dashoffset: 10000;
            animation: draw 100s linear infinite;
            stroke-linecap: round;
            stroke: #3464e2;
            stroke-width: 7px;
    }
</style>
