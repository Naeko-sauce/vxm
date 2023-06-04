// import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import 'virtual:windi.css'
import router from './router'
import '../public/reset.css'
//引入element全局图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
//引入element全局图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(ElementPlus)
app.mount('#app')
