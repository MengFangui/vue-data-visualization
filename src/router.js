import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import grid1 from './views/grid1.vue'
import grid2 from './views/grid2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/grid1',
      name: 'grid1',
      component: grid1
    },
    {
      path: '/grid2',
      name: 'grid2',
      component: grid2
    }
  ]
})
