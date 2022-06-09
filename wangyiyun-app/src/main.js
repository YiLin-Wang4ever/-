import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant插件
import getVant from './plugins'

const app = createApp(App);
getVant(app)

app.use(store);
app.use(router);
app.mount('#app');
