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
console.log('abc'.padStart(10))
console.log('abcdef'.padStart(10))
//        abc
//     abcdef
console.log('0.00'.padEnd(20) + '0.00')
console.log('10,000.00'.padEnd(20) + '10,000.00')
