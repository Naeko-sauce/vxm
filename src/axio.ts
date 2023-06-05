import axios from "axios"
//引入报错提示框
import { ElMessage } from 'element-plus'
//引入useCookies 用来储存登录的用户名和密码
import { useCookies } from '@vueuse/integrations/useCookies'
// import axion from "axios"
//通过axios创建对象实例
const servict = axios.create({
    //配置域名
    baseURL:"/api"
})
// 添加请求拦截器,把aixos改成你自定义的实列对象 
servict.interceptors.request.use(function (config) {
  //往header头自动添加token
  const cookie:any = useCookies()
  //拿到key值
  const token = cookie.get("admin-token")
  //判断toke值是否为空
  if(token){
    //往头传递
    config.headers["token"] = token
  }
    // 在发送请求之前做些什么

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
servict.interceptors.response.use(function (response) {
    // 对响应数据做点什么，发送请求之后就返回data里面的数据就可以不用在，添加data.data
    return response.data.data;
    //之后错误提示统一交给拦截器处理
  }, function (error) {
    // 对响应错误做点什么
       //拿到data报错信息
      // console.log(err.response.data);
      //报错弹出提示框
      ElMessage({
        showClose: true,
        //提示报错内容
        message: error.response.data.msg || "请求失败",
        type: 'error',
        // 修改报错框存在时间
        duration:2000
      })
    return Promise.reject(error);
  }); 
//配置完后导出模块
  export default servict
