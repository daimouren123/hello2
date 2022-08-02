import request from '@/utils/request'


// 需要先导入 store实例
import store from '@/store'


// 获取用户信息
const  getUserInfoAPI = () =>{
    return request({
        method: 'get',
        url:'/my/userinfo',
        headers:{
            // Authorization:登陆成功的token
            // 现在这个是js文件，不能使用this.$store,也不能映射
            // js文件：需要先导入 store，然后可以获取 store的一切选项
            Authorization:store.state.user.token
        }
    })
}


// 获取左侧菜单
const getMenusAPI = () => {
    return request({
        method:'get',
        url:'/my/menus',
        headers:{
            Authorization:store.state.user.token
        }
    })
}

// 按需 导出
export{
    getUserInfoAPI,
    getMenusAPI 
}
