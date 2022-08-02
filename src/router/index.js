import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入相应的组件对象
import Register from '@/views/Register'
import Login from '@/views/Login'
import Layout from '@/views/Layout'


Vue.use(VueRouter)

const routes = [
  {
     path:'/register',
     component: Register
  },{
    path:'/login',
    component: Login
  },{
    path:'/',
    component: Layout
  }

]

const router = new VueRouter({
  routes
})

export default router
