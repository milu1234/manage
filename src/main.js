import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import config from './config'
import axios from 'axios'
import request from './utils/request'
import storage from './utils/storage'
console.log("环境变量", import.meta.env);
const app = createApp(App)

app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage;
axios.get(config.mockApi + '/login').then((res) => {
  console.log(res);
})

app.use(router).use(ElementPlus).mount('#app')






