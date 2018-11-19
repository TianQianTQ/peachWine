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
