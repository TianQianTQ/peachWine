<template>
  <div id="container">
    <div id="item_left" class="item"></div>
    <div id="item_right" class="item" ></div>
  </div>
</template>
<script>
export default {
  mounted () {
    // this.init()
  },
  methods: {
    init () {
      /* eslint-disable */
    jsPlumb.ready(function () {
      jsPlumb.connect({
        source: 'item_left',
        target: 'item_right',
        // detachable: false,
        endpoint: 'Dot',
        anchor: ['Left', 'Right'],
        connector: ['Flowchart', { cornerRadius: 20, stub: 10 }], // 设置连接线的形状等
        endpointStyle: { fill: 'none' }
      })
      jsPlumb.draggable('item_left')
      jsPlumb.draggable('item_right')
    })
    }
  }
}
</script>
<style scoped>
#container {
  width: 400px;
  height: 400px;
  margin: auto;
}
.item {
  float: left;
  width: 70px;
  height: 70px;
  border: 2px solid #aaa;
}
</style>