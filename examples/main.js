import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import WdTable from '../packages'

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(WdTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
