import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import forceDirectedGraph from '@/pages/d3/forceDirectedGraph/index'
import index from '@/pages/echarts/index/index'

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
    }
  ]
})
