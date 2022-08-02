<template>
<el-container class="layout-container">
  <!-- 顶部 头部 区域 -->
  <el-header>
    <!-- 右侧的菜单 -->
    <el-menu
             class="el-menu-top"
             mode="horizontal"
             background-color="#23262E"
             text-color="#fff"
             active-text-color="#409EFF"
             >
      <el-submenu index="1">
        <template slot="title">
            <!-- 本身的头像 -->
    <img v-if="userInfo.user_pic" class="avatar" :src="userInfo.user_pic" alt="avatar" />
    <!-- 默认的头像 -->
    <img v-else class="avatar" src="@/assets/images/default.jpg" alt="avatar" />
          <span>个人中心</span>
        </template>

<el-menu-item index="1-1"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
  >
<el-menu-item index="1-2"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
  >
<el-menu-item index="1-3"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
  >
</el-submenu>
<el-menu-item @click="handleLogout" index="2">
              <i class="el-icon-switch-button"></i>退出
              </el-menu-item>
</el-menu>
</el-header>
<!-- 右侧区域 -->
<el-container>
  <!-- 左侧菜单区域 -->
  <el-aside>
    <!-- 左侧的 logo -->
    <div class="logo-container">
      <img src="@/assets/images/logo.png" alt="logo" />
    </div>
    
    <!-- 左侧边栏区域 -->
    <div class="user-box">
      <!-- 本身的头像 -->
    <img v-if="userInfo.user_pic" class="avatar" :src="userInfo.user_pic" alt="avatar" />
    <!-- 默认的头像 -->
    <img v-else class="avatar" src="@/assets/images/default.jpg" alt="avatar" />

    <span class="username">欢迎 代某人 {{userInfo.nickname || userInfo.username}} </span>
  </div>
  <el-menu
  default-active="1"
  background-color="#23262E"
  text-color="#fff"
  active-text-color="#409EFF"
  unique-opened
>
    <template v-for="item in menus">

     <!-- 不包含子菜单的“一级菜单” -->
  <el-menu-item v-if="!item.children" :key= "item.indexPath" :index="item.indexPath"><i :class="item.icon"></i>{{item.title}} </el-menu-item>
  <!-- 包含子菜单的“一级菜单” -->
  <el-submenu v-else :key= "item.indexPath" :index="item.indexPath">
    <template #title>
      <i :class="item.icon"></i>
      <span>{{item.title}} </span>
    </template>
    <el-menu-item v-for="subltem in item.children" :key="subltem.indexPath" :index="subltem.indexPath"><i :class="subltem.icon"></i>{{subltem.title}} </el-menu-item>
   
  </el-submenu>
  </template>
  </el-menu>
  </el-aside>
  <el-container>
    <!-- 中间 主体 区域 -->
    <el-main> Layout后台主页 </el-main>
    <!-- 底部 footer 区域 -->
  <el-footer>© www.itheima.com - 黑马程序员</el-footer>
  </el-container>
  </el-container>
  </el-container>
</template>

<script>
// 导入辅助函数
import {mapMutations,mapState } from 'vuex'
import { getMenusAPI } from '@/api/layout'
  export default {
    name: 'Layout',
    data(){
      return{
        // 左侧菜单列表
        menus:[]
      }
    },
    created(){
      // 1.获取用户信息
      this.$store.dispatch('user/getUserInfoAction')
      // 2.获取左侧菜单信息
      this.initMenus()
    },
    // 映射
    computed:{
      ...mapState('user',['userInfo' ])
    },
    methods: {
        ...mapMutations('user',['setToken']),
        // 退出登录
        async handleLogout(){
            // 1.询问

            // try-catch是js内置的语句块，拿来就用的专门用来手动捕获错误的

            // 场景：捕获Promise的错误状态，就需要他出场了
            try {
                // try中放的是可能出错的代码
               await this.$confirm('确认退出？','温馨提示',{
                type:'warning'
            })
            // 2.点击确定了，做退出登录的事
            // a。清空vuex中的token
            this.setToken('')
            // b。跳转到登陆
            this.$router.replace('/login')
            // 测试一下replace跟push有什么区别区别就是push点前进后退键可以来回跳转页面replace不允许
            // this.$router.push('/login')
            // c。给个推出成功的提示
            this.$message.success('退出成功')
            } catch(e) {
              // e是当前错误的对象
                // 一但try中的代码出错了，就会被catch捕获到，如果try中的代码没有出错，
                // 那么久正常执行try中的代码
                // 3.点击了取消
               // a。无事发生给个提示即可
            this.$message('已取消')
            }
          
          
        },
        // 获取左侧菜单列表
        async initMenus () {
          // 1.结构出列表
         const {data: {data: menus}}  = await getMenusAPI()
        //  2.给menus数组赋值
         this.menus = menus
        }
    }
  }
</script>

<style lang="less" scoped>
  .layout-container {
    height: 100%;
    .el-aside {
      width: 200px !important;
      background: #23262e;
    .el-submenu,
  .el-menu-item {
    width: 200px !important;
    user-select: none;
  }
    }
    .el-header {
      padding: 0;
      display: flex;
      justify-content: flex-end;
      background: #23262e;
    }
    .el-main {
      overflow-y: scroll;
      height: 0;
      background-color: #f2f2f2;
    }
    .el-footer {
      background-color: #eee;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
  }

  // 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  .username {
    color: white;
    font-size: 16px;
  }
}
</style>