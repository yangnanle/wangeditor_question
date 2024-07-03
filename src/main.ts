import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './style.css'
import router from './router/index'


createApp(App).use(router).use(ElementPlus, {
  locale: zhCn,
}).mount('#app')
