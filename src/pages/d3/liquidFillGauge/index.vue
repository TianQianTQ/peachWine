<template>
  <div class="page-container page-component">
    <div class='container'>
      <svg id="fillgauge1" width="16%" height="200"></svg>
      <svg id="fillgauge2" width="16%" height="200"></svg>
      <svg id="fillgauge3" width="16%" height="200"></svg>
      <svg id="fillgauge4" width="16%" height="200"></svg>
      <svg id="fillgauge5" width="16%" height="200"></svg>
      <svg id="fillgauge6" width="16%" height="200"></svg>
    </div>
    <sti-simple-grid title="loadLiquidFillGauge函数参数说明" :data="functionAttributes"></sti-simple-grid>
    <sti-simple-grid title="配置参数说明" :data="attributes"></sti-simple-grid>
  </div>
</template>
<script>
import loadLiquidFillGauge from './liquidFillGauge.js'
import {functionAttributes, attributes} from './attributes/attributes.js'
export default {
  name: 'liquidFillGauge',
  props: [],
  data() {
    return {
      functionAttributes,
      attributes
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    drawProgress() {
    loadLiquidFillGauge('fillgauge1', 55, true);

    var config2 = {
      circleColor: '#FF7777',
      textColor: '#FF4444',
      waveTextColor: '#FFAAAA',
      waveColor: '#FFDDDD',
      circleThickness: 0.2,
      textVertPosition: 0.2,
      waveAnimateTime: 1000
    };
    loadLiquidFillGauge('fillgauge2', 28, config2, false);

    var config3 = {
      circleColor: '#D4AB6A',
      textColor: '#553300',
      waveTextColor: '#805615',
      waveColor: '#AA7D39',
      circleThickness: 0.1,
      circleFillGap: 0.2,
      textVertPosition: 0.8,
      waveAnimateTime: 2000,
      waveHeight: 0.3,
      waveCount: 1
    }
    loadLiquidFillGauge('fillgauge3', 60.1, config3)

    var config4 = {
      textVertPosition: 0.8,
      waveAnimateTime: 5000,
      waveHeight: 0.15,
      waveAnimate: false,
      waveOffset: 0.25,
      valueCountUp: false,
      displayPercent: false
    }
    loadLiquidFillGauge('fillgauge4', 50, config4);

    var config5 = {
      circleThickness: 0.15,
      circleColor: '#808015',
      textColor: '#555500',
      waveTextColor: '#FFFFAA',
      waveColor: '#AAAA39',
      textVertPosition: 0.8,
      waveAnimateTime: 1000,
      waveHeight: 0.05,
      waveAnimate: true,
      waveRise: false,
      waveHeightScaling: false,
      waveOffset: 0.25,
      textSize: 0.75,
      waveCount: 3
    }
    loadLiquidFillGauge('fillgauge5', 60.44, config5)

    var config6 = {
      circleThickness: 0.4,
      circleColor: '#6DA398',
      textColor: '#0E5144',
      waveTextColor: '#6DA398',
      waveColor: '#246D5F',
      textVertPosition: 0.52,
      waveAnimateTime: 5000,
      waveHeight: 0,
      waveAnimate: false,
      waveCount: 2,
      waveOffset: 0.25,
      textSize: 1.2,
      minValue: 30,
      maxValue: 150,
      displayPercent: false
    }
    loadLiquidFillGauge('fillgauge6', 120, config6);
    }
  },
  created() { },
  mounted() {
    // this.drawProgress()
    let that = this
    this.$nextTick(() => {
      that.drawProgress()
    })
  },
  beforeDestroy() { }
}
</script>
<style>
 .liquidFillGaugeText { font-family: Helvetica; font-weight: bold; }
</style>
