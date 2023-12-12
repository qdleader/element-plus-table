import { createApp } from 'vue'
import ElementPlus from "element-plus"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"

import App from './App.vue'
// import "element-plus/theme-chalk/src/index.scss"

import "element-plus/dist/index.css"


const app = createApp(App)

app.use(ElementPlus, { locale: zhCn })

app.mount('#app')