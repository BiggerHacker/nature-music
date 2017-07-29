import Vue from 'vue'
import Router from 'vue-router'

import Selected from '@/views/selected'
import Rank from '@/views/rank'
import Sheet from '@/views/sheet'
import SheetDetail from '@/views/sheet-detail'
import Singer from '@/views/singer'
import SingerDetail from '@/views/singer-detail'
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
      component: Sheet,
      children: [
        {
          path: ':id',
          name: 'sheet-detail',
          component: SheetDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'singer-detail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '*',
      component: Notfound
    }
  ]
})
