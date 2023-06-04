<template>
    <el-row style="min-height: 100vh;" class="back">
        <el-col :lg="16" :md="12" class="zuo">
        <div>
            <div>欢迎光临</div>
        <div>此站点是vue后台开发</div></div>
        </el-col>
        <el-col :lg="8" :md="12" class=" you">
            <h2 >欢迎回来</h2>
            <div>
                <span></span>
                <span>账号密码登录</span>
                <span></span>
            </div>
            <!-- ref获取表单里的内容 -->
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
              <!--prop是 model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。 在定义了 validate、resetFields 的方法时，该属性是必填的 -->
    <el-form-item prop="username"  label="用户名">
      <el-input po v-model="form.username"  placeholder="请输入用户名" >
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item  prop="passowrd" label="用户密码">
      <el-input type="password" v-model="form.passowrd" s  placeholder="请输入密码" show-password>
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="w-[250px]" round color="#626aef" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
        </el-col>
    </el-row>
    
</template>
<script lang="ts" setup>
//引入useCookies 用来储存登录的用户名和密码
   import { useCookies } from '@vueuse/integrations/useCookies'
//表单插件引入
import { ref,reactive } from 'vue'
import type { FormRules } from 'element-plus'
//引入刚刚做好的登录请求
import { login } from '@/api/manager'
//引入点击消息报错弹出提示框
import { ElMessage } from 'element-plus'
//引入vue-rotuter里面的一个方法进行跳转
import { useRouter } from 'vue-router'
 //拿到这个然后调用pust方法
 const router = useRouter()
// do not use same name with ref
const form = reactive({
 username:'',
 passowrd:''
})
//图标插件引入//如果引入了全局图标这里就可以不用
// import { User, Search } from '@element-plus/icons-vue'
//表单验证的方法
const rules = reactive<FormRules>({
  //
  username: [
    { required: true,
      //指定报错内容
       message: '请输入用户名',
       //失去焦点的时候报出来
        trigger: 'blur' },
    { 
      //指定用户名长度
      // min: 3,
      //  max: 5,
        message: '长度', 
        trigger: 'blur' },
        
  ],
  passowrd: [ { required: true,
      //指定报错内容
       message: '请输入密码',
       //失去焦点的时候报出来
        trigger: 'blur' },
    { 
      //指定用户名长度/提交测试
      // min: 3,
      //  max: 5,
        message: '长度4-6', 
        trigger: 'blur' },] 
      })
//获取表单节点
const formRef:any = ref(null);
const onSubmit = () => {
  //点击登录后验证是否为空如果正确则通过否则不通过
  formRef.value.validate((vad:any)=>{
    if(!vad){
      return false
    } 
    //通过上面定义的form拿到用户名和密码
    login(form.passowrd,form.username)   
    // 通过.then拿到请求成功的结果
    .then(res=>{
      //请求成功的结果用res打印出来
      // console.log(res.data.data);
      //因为已经在aixo配置了data所以说打印就可以去掉data
      console.log(res.data.data)
      //提示成功
       ElMessage({
    showClose: true,
    message: '登录成功',
    type: 'success',
        duration:2000
  })  
      //存储token和用户相关的信息
        //并且用cookie接收
   const cookie = useCookies();  
   //因为配置了拦截器所以说可以省略后面的data
   cookie.set("admin.token",res.data.data.token)
  //这里有bug会报错所以说先不省略data
  // cookie.set("admin-token",res.token)
      //跳转到后台首页
    router.push("/")     
    })
    //.catch就可以捕获到请求失败的结果
    //请求失败的结果就用err打印出来
    //这里失败的结果移动到了aixo的拦截器
    // .catch(err=>{
  
    // })
  })
}
</script >
<style lang="scss" scoped>
.back{
  @apply bg-indigo-500;
}
.back .zuo ,.you{
  @apply flex items-center justify-center flex-col;
}
.back .you{
  @apply bg-light-50;
}
.zuo>div>div:nth-child(1){
  @apply font-bold text-5xl text-light-500;
}
.zuo>div>div:nth-child(2){
  @apply text-true-gray-200;
}
.you>h2{
  @apply font-bold text-3xl text-gray-800;
}
.you>div{
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.you>div>span:nth-child(1){
  @apply h-[1px] w-16 bg-gray-200
}
.you>div>span:nth-child(3){
  @apply h-[1px] w-16 bg-gray-200
}
</style>