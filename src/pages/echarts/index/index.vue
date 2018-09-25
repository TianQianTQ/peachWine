<template>
  <div class='container'>
    <div id="main" ></div>
    <div id='main1'></div>
    <div id='main2'></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)

      echarts.init(document.getElementById('main1')).setOption({
        series: {
          type: 'pie',
          data: [
            {name: 'A', value: 1212},
            {name: 'B', value: 2323},
            {name: 'C', value: 1919}
          ]
        }
      })
      var myChart2 = echarts.init(document.getElementById('main2'))
      myChart2.setOption({
        backgroundColor: '#2c343c',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            roseType: 'angle',
            data: [
              {value: 235, name: '视频广告'},
              {value: 274, name: '联盟广告'},
              {value: 310, name: '邮件营销'},
              {value: 335, name: '直接访问'},
              {value: 400, name: '搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.container{
  display:flex;
  align-items: center;
}
#main{
  width:500px;
  height:400px;
}
#main1{
  width:500px;
  height:400px;
}
#main2{
  width:500px;
  height:400px;
}
</style>
