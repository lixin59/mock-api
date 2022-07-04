import { App } from '@vue/runtime-core';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
const components = [PrimeVue, ToastService];

function primevuePlus(app: App) {
  components.forEach((component) => {
    app.use(component);
  });
}

export default primevuePlus;
