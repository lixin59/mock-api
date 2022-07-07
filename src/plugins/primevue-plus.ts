import { App } from '@vue/runtime-core';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';

const components = [PrimeVue, ToastService, ConfirmationService];

function primevuePlus(app: App) {
  components.forEach((component) => {
    app.use(component);
  });
  app.directive('tooltip', Tooltip);
}

export default primevuePlus;
