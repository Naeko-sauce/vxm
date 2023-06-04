//接口的所有方法全部放在api里面管理
//引入axios
import axios from "@/axio";
//定义一个登录方法//有两个参数一个用户名一个密码//在使用export给他导出
export function login(username:string,password:any){
//使用axios的post方法进行请求//由于前面配置了域名就不需要域名了
   return axios.post("/admin/login",{
        username,password
    })
}