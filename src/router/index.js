import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: ()=>import('views/recommend/recommend'),
      children: [
        {
          path: ':id',
          component: ()=>import('views/recommend/disc/disc')
        }
      ]
    },
    {
      path: '/rank',
      component: ()=>import('views/rank/rank'),
      children: [
        {
          path: ':id',
          component: ()=>import('views/rank/top-list/top-list')
        }
      ]
    },
    {
      path: '/singer',
      component: ()=>import('views/singer/singer'),
      children: [
        {
          path: ':id',
          component: ()=>import('views/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/search',
      component: ()=>import('views/search/search')
    }
  ]
})
