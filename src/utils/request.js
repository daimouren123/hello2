import axios from "axios";

// 创建一个axios本身用法一样的实例
const request = axios.create({
    // 基地址
    baseURL:'http://www.liulongbin.top:3008'
}) 

// 默认导出
export default request