import request from "@/utils/request"

// 登录
const  loginAPI = (loginForm)=>{
    return request({
        method:'post',
        url: '/api/login',
        data: loginForm
    })
}


export {
	loginAPI
}