import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import { debounce } from './libs/util'
Vue.prototype.$echarts = echarts
Vue.prototype.$debounce = debounce

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
