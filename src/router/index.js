import Vue from 'vue'
import Router from 'vue-router'
import BotsList from '@/components/BotsList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: ('/bots/')
    },
    {
      path: '/bots',
      name: 'bots',
      component: BotsList
    }
  ]
})
