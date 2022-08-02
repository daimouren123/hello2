import Vue from 'vue'
import Vuex from 'vuex'

// 导入用户子模块
import userModule from './modules/user'

// 导入 vuex的插件不用自己打了
import createState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 第三步加入插件配置
  plugins:[createState()],


  // 注册子模块 
  modules: {
    // 模块名:模块对象
    user:userModule
  }
})
