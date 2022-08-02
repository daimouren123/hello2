<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <el-card>
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" maxlength="10" minlength="1"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-link type="info" @click="$router.push('/register')">去注册</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginAPI } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      // 登录的表单对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录的表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-z\d]{2,10}$/i, message: '用户名必须是2-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    // 登录校验
    handleLogin(){
      // 1.兜底校验
      this.$refs.loginFormRef.validate(async(valid)=>{
        if(!valid)return
        // 2.校验通过，调接口
       const {data:{code,message,token}}= await loginAPI(this.loginForm)
       if(code===0){
      //  3.登陆成功
      // a给个提示
      this.$message.success(message)
      // b存储token
      // todo
      this.$store.commit('user/setToken',token)
      // c 跳转到页面 replace直接替换当前的url，无法回退，push可以回退 
      this.$router.replace('/')
       }else{
      //  4.登陆失败
      // a给个提示
      this.$message.warning(message)
       }

    
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url('~@/assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .el-card {
    width: 400px;
    height: 320px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('~@/assets/images/login_title.png') center no-repeat;
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>