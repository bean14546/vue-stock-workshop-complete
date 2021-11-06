const express = require("express");
const router = express.Router();
const product = require("./models/product");
const Sequelize = require("sequelize");
const formidable = require("formidable"); // lib ใช้สำหรับแปลข้อมูลให้เป็นรูปแบบของ form-data
const path = require("path");
const fs = require("fs-extra");
const constants = require("./constant");
const { where } = require("sequelize");

// Upload img
uploadImage = async (files, doc) => {
  // doc คือ ผลลัพธ์ที่ได้จากการ insert ข้อมูลลง database
  if (files.image != null) {
    // image มาจากชื่อ key ใน postman หรือ ชื่อ field ที่ผู้ใช้ upload เข้ามา
    var fileExtention = files.image.name.split(".")[1]; // ถอดมาเฉพาะนามสกุลไฟล์ที่ได้จากการ insert
    doc.image = `${doc.id}.${fileExtention}`; // เอานามสกุลไฟล์ที่ถอดได้มาต่อกับ id เป็นการเปลี่ยนชื่อไฟล์จากชื่อเดิมเป็นชื่อใหม่โดยใช้ชื่อเดียวกับ id แล้วเอาข้อมูลที่ได้ยัดกลับเข้าไปใน doc.image เพื่อรอการ update ค่าต่อไป
    var newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image; // สร้าง path เพื่อเตรียมย้ายรูปลง dir ที่ต้องการ

    if (fs.exists(newpath)) {
      // ตรวจสอบว่าภายใน path ที่นิยามขึ้นมานั้นมีรูปที่ตรงกันอยู่แล้วหรือไม่
      await fs.remove(newpath); // ถ้ามีให้ลบรูปเก่าทิ้ง
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

// Query ข้อมูลทั้งหมด
router.get("/product", async (req, res) => {
  const result = await product.findAll({
    order: Sequelize.literal("id DESC"),
  });
  res.json(result);
});

// Query ข้อมูลทีละตัว
router.get("/product/id/:id", async (req, res) => {
  try {
    let result = await product.findOne({ where: { id: req.params.id } });
    if (result) {
      res.json(result);
    } else {
      res.json({});
    }
  } catch (error) {
    res.json({});
  }
});

// Insert ข้อมูล
router.post("/product", (req, res) => {
  //   res.json({result: "ok",detail : req.body}); // ยิง req แบบ json
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await product.create(fields); // สร้างสินค้า
      result = await uploadImage(files, result);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Update ข้อมูล
router.put("/product", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      let result = await product.update(fields, { where: { id: fields.id } });
      result = await uploadImage(files, fields);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result),
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

// Delete ข้อมูล
router.delete("/product/id/:id", async (req, res) => {
  try {
    const { id } = req.params; // ดึง id ออกมาจาก path ในบรรทัดที่ 80 (เป็น id ที่รับมาจากผู้ใช้)
    let result = await product.findOne({ where: { id } }); // หา id ภายใน product ที่ตรงกับ id ที่รับมา
    await fs.remove(__dirname + "/uploaded/images/" + result.image); // ลบ file
    result = await product.destroy({ where: { id: id } }); // ลบ raw
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

module.exports = router;
