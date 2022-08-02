import Vue from 'vue'
import App from './App.vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import router from './router'
import store from './store'
// 这是渲染注册基础布局的第二步  从网站复制导入的
// 在 src/main.js 中导入全局样式表：
import '@/assets/styles/global.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
