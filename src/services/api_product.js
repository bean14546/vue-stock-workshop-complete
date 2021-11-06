// ไฟล์ที่ใช้ติดต่อ แลเปลี่ยนข้อมูลกับ backend
// import { imageUrl } from "./server";
import httpClient from "@/services/httpClient";
import { server } from "@/services/server";

export const getProduct = () => {
  return httpClient.get(server.PRODUCT_URL);
};

export const getProductById = (id) => {
  return httpClient.get(server.PRODUCT_URL + `/id/${id}`);
};

export const addProduct = (data) => {
  return httpClient.post(server.PRODUCT_URL, data);
};

export const updateProduct = (data) => {
  return httpClient.put(server.PRODUCT_URL, data);
};

export const deleteProduct = (id) => {
  return httpClient.delete(server.PRODUCT_URL + `/id/${id}`);
};
