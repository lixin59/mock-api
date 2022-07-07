import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';
import primevuePlus from '/@/plugins/primevue-plus';

// 全局引入css样式
import 'primevue/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; // icon
import './index.css';

// 注册svg脚本
import 'virtual:svg-icons-register';

const app = createApp(App);
// 配置 store
setupStore(app);

app.use(router);
primevuePlus(app);

// 自动注册全局组件
// const modules = import.meta.globEager('./components/**/index.ts');
// for (const path in modules) {
//   app.use(modules[path].default);
// }

app.mount('#app');
