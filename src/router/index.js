import Vue from 'vue'
import Router from 'vue-router'

import Selected from '@/views/selected'
import Rank from '@/views/rank'
import Sheet from '@/views/sheet'
import Singer from '@/views/singer'
import Notfound from '@/views/notfound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/selected'
    },
    {
      path: '/selected',
      name: 'selected',
      component: Selected
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: Sheet
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '*',
      component: Notfound
    }
  ]
})
