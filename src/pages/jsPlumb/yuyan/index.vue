<template>
  <div class="flowChart">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      flowInstance: {}, // jsplumb实例对象
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
    },
    conversionData() {
      this.flowData.forEach(item => {
        let connections = this.flowInstance.getConnections({scope:'flowScope', source: item.id})
        connections.forEach(connection => {
          
        })
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
          // 保存当前连线状态
          this.$message({
              type: 'success',
              message: '保存成功!'
          });
        }).catch(() => {
          console.log('取消')
          this.flowInstance.reset();
          this.init()
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
        this.addDisable();
        this.deleteEnable();
      } else {
        this.addLine = '增加连线'
        this.deleteDisable();
        this.addEnable();
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
        this.flowInstance.draggable(item.id,{cintainment:'parent'});
        this.endPoints.push(this.flowInstance.addEndpoint(item.id, { anchor: 'TopCenter' }, endpointOptions));
        this.endPoints.push(this.flowInstance.addEndpoint(item.id, { anchor: 'BottomCenter' }, endpointOptions));
        this.endPoints.push(this.flowInstance.addEndpoint(item.id, { anchor: 'RightMiddle' }, endpointOptions));
        this.endPoints.push(this.flowInstance.addEndpoint(item.id, { anchor: 'LeftMiddle' }, endpointOptions));
      });

      // 监听添加元素
      this.flowInstance.bind('connection', (info) => {
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
      this.flowInstance.unbind('connection');
      this.updateConnections.forEach(item => {
        this.flowInstance.connect({
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
        this.flowInstance.deleteEndpoint(item);
      })
    },
      // 端点可分
    deleteEnable: function() {
      this.flowInstance.getConnections({scope:"flowScope"}).forEach(connection => {
        let sourceKey = connection.endpoints[0].anchor.x * 10 + '' + connection.endpoints[0].anchor.y * 10;
        let targetKey = connection.endpoints[1].anchor.x * 10 + '' + connection.endpoints[1].anchor.y * 10;
        this.flowInstance.detach(connection);
        this.flowInstance.connect({
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
      this.flowInstance.getConnections({scope:"flowScope"}).forEach(connection => {
        let sourceKey = connection.endpoints[0].anchor.x * 10 + '' + connection.endpoints[0].anchor.y * 10;
        let targetKey = connection.endpoints[1].anchor.x * 10 + '' + connection.endpoints[1].anchor.y * 10;
        this.flowInstance.detach(connection);
        this.flowInstance.connect({
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
      let connects= this.flowInstance.getConnections({scope: "active", source: id});
      if (connects.length > 0) {
        connects.forEach(connection => {
          this.flowInstance.detach(connection);
        })
        return;
      }
      let node = this.flowData.find(item => {
        return item.id == id;
      })
      node.target.forEach(target => {
        this.flowInstance.connect({
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
  }
}
</script>
<style >
.flowChart {
    width: 100%;
    height: 80%;
}
.flowChart .flowChart-flow{
    position: relative;
        width: 100%;
        height: 100%;
}

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
