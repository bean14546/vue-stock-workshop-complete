import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Authentication/Login.vue";
import Register from '../views/Authentication/Register.vue';
import Stock from '../views/Stock/Stock.vue';
import StockCreate from '../views/Stock/StockCreate.vue';
import StockEdit from '../views/Stock/StockEdit.vue';
import Report from '../views/Report/Report.vue';
Vue.use(VueRouter);

const routes = [{
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/stock",
    name: "Stock",
    component: Stock
  },
  {
    path: "/stockcreate",
    name: "StockCreate",
    component: StockCreate
  },
  {
    path: "/stockedit/:id", //อะไรก็ตามที่อยู่หลัง : จะเป็น paramiter
    name: "StockEdit",
    component: StockEdit
  },
  {
    path: "/report",
    name: "Report",
    component: Report
  },
  {
    path: "/", // หาก path ที่ใส่มา เป็น / จะ redirect เป็น /login อัตโนมัต
    redirect: "/login"
  },
  {
    path: "*", // หาก path ที่ใส่มา ไม่ตรงกับกรณีไหนเลยในด้านบน จะ redirect เป็น /login อัตโนมัต
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;