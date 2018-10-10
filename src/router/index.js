import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import forceDirectedGraph from '@/pages/d3/forceDirectedGraph/index'
import index from '@/pages/echarts/index/index'

import drag from '@/pages/drag/drag'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/d3/forceDirectedGraphr',
      name: 'forceDirectedGraphr',
      component: forceDirectedGraph
    },
    {
      path: '/echarts/index',
      name: 'index',
      component: index
    },
    {
      path: '/drag',
      name: 'drag',
      component: drag
    }
  ]
})
let obj = {a: 1, b: 2, c: 3}
Object.keys(obj).forEach((key) => {
  console.log(obj[key])
})
