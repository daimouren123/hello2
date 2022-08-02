// 这是渲染注册基础布局的第四步  全是复制的把之前的东西都顶掉
// 初始化注册页面的基础布局，并美化样式：
<template>
  <!-- 注册页面的整体盒子 -->
  <div class="register-container">
    <!-- 注册的盒子 -->
    <div class="register-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="regFormRef" :model="regForm" :rules="regFormRules" >
  <el-form-item prop="username">
    <!-- regFrom有自动校验的功能,又能获取又能校验 -->
    <el-input v-model="regForm.username"  placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
  </el-form-item>
    <el-form-item prop="password">
    <el-input v-model="regForm.password"  placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
  </el-form-item>
    <el-form-item prop="repassword">
    <el-input v-model="regForm.repassword"  placeholder="请再次确认密码" show-password prefix-icon="el-icon-lock"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleReg">注册</el-button>
  </el-form-item>
  <el-link type="info" @click="$router.push('/login')">去登陆</el-link>
</el-form>
    </div>
  </div>
</template>


<script>
// 目标:渲染注册的表单结构
// 1.看文档，找到对应的组件
// 2.把功能多的，全的标签+样式+数据复制过来
// 3.把多余的删掉，对照实际效果，修改结构，效果跑起来
// 4.读文档，查询属性。事件表示什么意思


import { registerAPI } from '@/api/register'
export default {
  name: 'Register',
  data() {
    // 自定义，确认密码的校验规则函数
    const validateRepass = (rule,value,callback)=>{
      if(value !==this.regForm.password) {
        callback(new Error('两次密码不一致'))
      }else {
        callback()
      }
    }
      return {
        // 注册的表单对象(属性推荐与后台需要的字段保持一致)
        regForm: {
          username:'',
          password:'',
          repassword:''
        },
        // 注册表单的校验规则对象
        regFormRules:{
          username:[
            {
              required:true,
              message:'请输入用户名',
              trigger:'blur'
            },
            {
              pattern:/^[a-z\d]{1,10}$/i,
              message:'用户名是1-10位的字母数字',
              trigger:'blur'
            }
          ],
          password:[
           {
              required:true,
              message:'请输入密码',
              trigger:'blur'
            },
            {
              pattern:/^\S{6,15}$/,
              message:'密码是6-15位的非空字符',
              trigger:'blur'
            }
          ],
          repassword:[
             {
              required:true,
              message:'请输入确认密码',
              trigger:'blur'
            },
            {
              pattern:/^\S{6,15}$/,
              message:'密码是6-15位的非空字符',
              trigger:'blur'
            },
            {
              // 确认密码需要和密码一直，需要借助自定义校验
              // todo
              validator:validateRepass,
              trigger:'blur'
            }
          ]
        }
      }
    },
     methods: {
      // 注册
      handleReg() {
      //  1.兜底校验
      this.$refs.regFormRef.validate(async (valid) =>{
        if(!valid) return
        
        // 2.通过兜底校验，可以发请求了，todo
        // 双重结构
          const {
            data:{code,message}
             } = await  registerAPI(this.regForm)
          if (code === 0){
         // 3.给个成功的提示
          this.$message.success(message)
        // 4.如果注册成功，需要跳转到登录页
           this.$router.push('/login')
          } else{
            // 5.注册失败，给个失败的提示
            this.$message.warning(message)
          }
          
          
      })
      }
    }
}
</script>


<style lang="less" scoped>
.register-container {
    // 注意：在样式中，要使用@路径对应src的绝对路径的话，需要在@前加个~，这样css才能识别@路径否则会报错
  background: url('~@/assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .register-box {
    box-sizing: border-box;
    width: 400px;
    height: 405px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;

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