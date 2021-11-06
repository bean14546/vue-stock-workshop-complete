import httpClient from "@/services/httpClient";
import { server } from "@/services/server";
import router from "@/router/index.js";
import * as productApis from "@/services/api_product.js"; // * คือ ทุกอย่าง ดึงทุก founction ที่อยู่ใน api_product มาให้หมด as คือการเปลี่ยนชื่อ

const isLoggedIn = () => {
    let token = localStorage.getItem(server.TOKEN_KEY);
    return token != null;
};
const login = async values => {
    let result = await httpClient.post(server.LOGIN_URL, values);
    if (result.data.result == "ok") { // ถ้า  result ok ให้ บันทึก username และ token จากนั้นให้เปลี่ยน route หาก ไม่ ok ก็ไม่ต้องไปไหน
      localStorage.setItem(server.USERNAME, values.username);
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      router.push("/stock");
      return true;
    } else {
      return false;
    }
  };
const register = async values => {
    let result = await httpClient.post(server.REGISTER_URL, values);
    if (result.data.result == "ok") {
      router.go(-1);
    } else {
      alert(JSON.stringify(result));
    }
};
const logoff = () =>{
    localStorage.removeItem(server.TOKEN_KEY);
    router.push("/login")
};

export default {
    isLoggedIn,
    login,
    register,
    logoff,
    ...productApis // อะไรก็ตามที่อยู่ใน productApis ให้เอามาต่อในนี้ให้หมด เรียกว่าการ spreding
}