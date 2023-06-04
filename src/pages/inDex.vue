<template>
     <div>后台首页</div>
     <!-- 设置cookies -->
     <el-button @click="setSetup">设置</el-button>
     <!-- 读取cookies -->
     <el-button @click="getSetup">读取</el-button>
     <!-- 删除cookies -->
     <el-button @click="removeSetup">删除</el-button>
</template>
<script lang="ts" setup>
//引入useCookies 用来储存token里的1bd79b2eaeb9f3dc6070bac283ef527f2ac4e772
   import { useCookies } from '@vueuse/integrations/useCookies'
//调用useCookise
     const cookie:any = useCookies()
     //创建点击事件函数“设置按钮”
     function setSetup(){
          //首先传入一个值
          //值先随便写一下
          cookie.set("admin-token","r23123123")
     }
     //写一个get方法获取c okies
     function getSetup(){
          //调用get方法
          //如果要拿到某一个cookies就要传入他的kye值
          //打印一下读取完之后的结果
          console.log(cookie.get("admin-token"));
          
     }
     //移出cookies方法
     //他提供了一个remove
     function removeSetup(){
          //如果要删除某个cookies方法也要传入一个kye值
          cookie.remove("admin-token")
     }
</script>



