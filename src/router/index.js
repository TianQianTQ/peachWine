import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import forceDirectedGraph from '@/pages/d3/forceDirectedGraph/index'
import index from '@/pages/echarts/index/index'

import drag from '@/pages/drag/drag'
import jsPlumb from '@/pages/jsPlumb/index'
import flow from '@/pages/jsPlumb/flow'
import yuyan from '@/pages/jsPlumb/yuyan'

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
    },
    {
      path: '/jsplumb/index',
      name: 'jsplumb',
      component: jsPlumb
    },
    {
      path: '/jsplumb/flow',
      name: 'flow',
      component: flow
    },
    {
      path: '/jsplumb/yuyan',
      name: 'yuyan',
      component: yuyan
    }
  ]
})
