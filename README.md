## 基于 Vue3、Element Plus 开发的一款表格组件，对Element Plus的el-table进行二次封装




## 安装
```
npm install element-plus-table -S
```

## 使用
```
import { createApp } from 'vue'
import App from './App.vue'
import ProTable from "element-plus-table"

const app = createApp(App);

app.use(ProTable)

app.mount('#app')
```