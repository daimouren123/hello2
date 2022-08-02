// 1. 导入公共的request函数
import request from '@/utils/request'

// 2. 定义具体的接口
const registerAPI = (regForm) => {
	return request({
    method: 'post',
    url: '/api/reg',
    data: regForm
	})
}
// 3. 按需导出
export {
	registerAPI
}