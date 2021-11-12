import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Authentication/Login.vue";
import Register from '../views/Authentication/Register.vue';
import Stock from '../views/Stock/Stock.vue';
import StockCreate from '../views/Stock/StockCreate.vue';
import StockEdit from '../views/Stock/StockEdit.vue';
import Report from '../views/Report/Report.vue';
import About from '../views/About/About.vue';
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
    path: "/stock-edit/:id", //อะไรก็ตามที่อยู่หลัง : จะเป็น paramiter
    name: "StockEdit",
    component: StockEdit
  },
  {
    path: "/report",
    name: "Report",
    component: Report
  },
  {
    path: "/about",
    name: "About",
    component: About
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

// user ต้องการไปที่ไหนมันจะไปที่นั่น โดยการเช็ค history ใช้ร่วมกับ fallback ตอน build
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL, // path ปัจจุบันอยู่ที่ไหน หรือ path ตั้งต้นคืออะไร มาจากไฟล์ vue.config.js
  routes,
});

export default router;