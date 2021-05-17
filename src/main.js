import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify'; // path to vuetify export
import QRCodeGeneratorPlugin from '@/plugins/syncfusion';
import Vuelidate from 'vuelidate';
// Import the Auth0 configuration
import { domain, clientId } from '../auth_config.json';
// Import the plugin here
import { Auth0Plugin } from './auth';

Vue.config.productionTip = false;

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
  },
});

new Vue({
  router,
  store,
  vuetify,
  QRCodeGeneratorPlugin,
  Vuelidate,
  render(h) {
    return h(App);
  },
})
  .$mount('#app');
