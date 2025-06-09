import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/el-message-box.css';
import 'animate.css';

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import '@/permission.js'
import 'nprogress/nprogress.css'
import pinia from'@/stores'




const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
//注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)){
  app.component(key, component)
}
