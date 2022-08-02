// 导入获取用户信息的接口

import {getUserInfoAPI} from "@/api/layout"

// 用户子模块
const userModule = {
    // 开启子模块的命名空间
    namespaced:true,
    state(){
        return {
            // 用户token字符串
            token:'',
            // 用户信息对象
            userInfo:{},


            // 这个也不用了用插件代替它
            // token: localStorage.getItem('token')
        }
    },
    mutations:{
        // 设置token
        setToken(state,tokenStr){
            state.token = tokenStr

            // 不用了会用插件代替它方便
            // localStorage.setItem('token',tokenStr)
        },
        // 给userinfo 的定义
        // 设置用户信息
        setUserInfo(state,userInfoObj){
            state.userInfo = userInfoObj  
        }
    },
    actions:{
        // 获取用户信息的Action
        async getUserInfoAction( ctx ){
            // 1.调接口
        const { data:{data}} = await getUserInfoAPI()
            // 2.把后台返回的用户信息对象提交到完成对userInfo的赋值
            ctx.commit('setUserInfo',data )
        },
    }
}

// 默认导出
export default userModule