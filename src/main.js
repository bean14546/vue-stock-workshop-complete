import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vue2Filters from "vue2-filters";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vue2Filters)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
