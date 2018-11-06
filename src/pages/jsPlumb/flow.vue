<template>
    <div class="flowChart">
        <!-- <sti-button @click="addNode">新增节点</sti-button>
        <sti-button @click="addEnable">打开自定义模式</sti-button>
        <sti-button @click="addDisable">关闭自定义模式</sti-button>
        <sti-button @click="deleteEnable">打开删除连线</sti-button>
        <sti-button @click="deleteDisable">关闭删除连线</sti-button> -->
        <sti-button @click='designModelChange'>{{designModel}}</sti-button>
        <div v-if='getDesignModel'>
            <sti-button @click='lineModelChange'>{{lineModel}}</sti-button>
            <sti-button @click='addNode'>添加节点</sti-button>
        </div>
        <div class="flowChart-flow">
            <div class="flowChart-item" @click="toggleAnimation(item.id)"
            :id="item.id" v-for="(item,index) in flowData1" :key="index"
            :style="{'left': item.left, 'top': item.top,}">{{item.name}}</div>
        </div>
        <p>资料参考：<a href="https://jsplumbtoolkit.com" target="_blank">https://jsplumbtoolkit.com</a></p>
    </div>
</template>
<script>
const anchors = {
  '50': 'TopCenter',
  '105': 'RightMiddle',
  '510': 'BottomCenter',
  '05': 'LeftMiddle'
}
export default {
  data () {
    return {
      flowInstance: {},
      updateConnections: [],
      endPoints: [],
      designModel: '打开自定义模式',
      getDesignModel: false,
      lineModel: '增加连线',
      getLineModel: true,
      flowData1: [],
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
      this.flowData1 = JSON.parse(JSON.stringify(this.flowData))
      console.log('调用')
      console.log(this.flowData1)
      this.$nextTick(() => {
        this.init(this.flowData1)
      })
    },
    // 初始化
    init (data) {
      /* eslint-disable */
            let self = this;
            // this.flowInstance = jsPlumb.getInstance();
            console.log(111)
            jsPlumb.ready(() =>{
                data.forEach(item => {
                    item.target.forEach(target => {
                        jsPlumb.connect({
                            source: item.id,
                            target: target.id,
                            detachable: false,
                            scope: 'flowScope',
                            cssClass: 'flowChart-line',
                            connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                            anchors: target.anchors,
                            overlays:[ 
                                ["Arrow", { location: 1 }], 
                            ],
                            endpointStyle: { fill: 'none' }
                        });
                    })
                });
            })
            
        },
        // 开关控制
        designModelChange() {
            this.getDesignModel = !this.getDesignModel
            let self = this
            if (this.getDesignModel) {
                this.addEnable()
                console.log('打开设计模式')
            } else {
                console.log('关闭设计模式')
                if (this.getLineModel) {
                    this.addDisable()
                } else {
                    this.deleteDisable()
                }
                this.$confirm('是否保存当前布局?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    jsPlumb.reset();
                    this.flowData1 = []
                    this.init();
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        // 连线控制
        lineModelChange() {
            if (this.getLineModel) {
                this.addDisable();
                this.deleteEnable();
            } else {
                this.deleteDisable();
                this.addEnable();
            }
            this.getLineModel = !this.getLineModel
        },
        // 添加节点
        addNode() {
            this.flowData1.push({
                id: `flow-${this.flowData1.length + 1}`,
                name: `流程图节点${this.flowData1.length + 1}`,
                left: '0',
                top: '0',
                target: []
            })
        },
        addEnable() {
            let self = this;
            // let connects= self.flowInstance.getConnections({scope: "active"});
            // if (connects.length > 0) {
            //     connects.forEach(connection => {
            //         self.flowInstance.detach(connection);
            //     })
            // }
            this.endPoints = [];
            this.flowData1.forEach(item => {
                let endpointOptions = {
                    endpoint: 'Dot',
                    isSource: true,
                    isTarget: true ,
                    maxConnections: -1,
                    connector: ['Flowchart', { cornerRadius: 10, stub: 10 }],
                    connectorClass: 'flowChart-line'
                };
                jsPlumb.draggable(item.id);
                this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'TopCenter' }, endpointOptions));
                this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'BottomCenter' }, endpointOptions));
                this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'RightMiddle' }, endpointOptions));
                this.endPoints.push(jsPlumb.addEndpoint(item.id, { anchor: 'LeftMiddle' }, endpointOptions));
            });

            // 监听连接事件
            this.updateConnection = [];
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
                    overlays:[ 
                        ["Arrow", { location: 1 }], 
                    ],
                    endpointStyle: { fill: 'none' }
                })
            })
            this.endPoints.forEach(item => {
                jsPlumb.deleteEndpoint(item);
            })
        },
        deleteEnable: function() {
            let self = this
            // let connects= self.flowInstance.getConnections({scope: "active"});
            // if (connects.length > 0) {
            //     connects.forEach(connection => {
            //         self.flowInstance.detach(connection);
            //     })
            // }
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
                    overlays:[ 
                        ["Arrow", { location: 1 }], 
                    ],
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
            let node = this.flowData1.find(item => {
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
    }
}
</script>
<style scoped>
.flowChart {
    width: 100%;
    height: 80%;
}
.flowChart-flow {
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
.flowChart-line path:first-child {
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
