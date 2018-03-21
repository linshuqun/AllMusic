import Vue from 'vue'
import Router from 'vue-router'
import QQ from '@/components/QQ'
import XiaMi from '@/components/XiaMi'
import NetEase from '@/components/NetEase'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/qq',
      name: 'QQ',
      component: QQ
    },
    {
      path: '/xiami',
      name: 'XiaMi',
      component: XiaMi
    },
    {
      path: '/netease',
      name: 'NetEase',
      component: NetEase
    }
  ]
})
