import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vue2Filters from "vue2-filters";
import {
  imageUrl
} from "@/services/server.js"
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vue2Filters)
Vue.filter("imageUrl", function (image) {
  return `${imageUrl}/${image}?timestamp = ${Date.now()}`;
}); //filter ที่กำหนดเอง | ?timestamp (เรียกว่า string query)คือ การป้องกันรูปไม่ขึ้น หรือ cashing | "imageUrl" คือ ชื่อ filter ที่เรากำหนดขึ้นมาเพื่อเรียกใช้
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");