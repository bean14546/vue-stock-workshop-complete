const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(__dirname+"/uploaded"));//หากไม่ระบุบรรทัดนี้ โลกภายนอกจะไม่สามารถเข้าถึงโฟเดอร์ได้ | __dirname+"/upload" หมายถึงจะสามรถเข้าถึงได้เฉพาะภายใต้ dir upload เท่านั้น

app.use("/api/v2",require("./api"));//ต้องไปลิงค์ที่ api.js ก่อน เพื่อเซตค่าต่างๆ แล้วค่อยแยกย่อยจาก api เป็น api_auth ฯลฯ | /api/v2 เป็นการกำหนด prefix เมื่อมีการอัพเกรดเวอร์ชั่นจะได้ไม่ชนกันเวลาเรียกใช้งาน

app.listen(8081, ()=>{
    console.log("server is runing...")
})
