<template>
  <div id="stockedit">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="10">
          <v-card class="pa-5" outline>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="product.name" label="Name" required />
              <v-text-field
                v-model="product.price"
                label="Price"
                type="number"
                required
                suffix="THB"
              />
              <v-text-field
                v-model="product.stock"
                label="Stock"
                type="number"
                required
                suffix="PCS"
              />

              <input type="file" @change="onFileSelected" />
              <!-- หากต้องการ browse (เรียกดู) รูปภาพ ต้องใช้ even @change -->
              <br />
              <v-img
                :src="getProductImage()"
                height="200"
                width="200"
                class="mt-3"
              ></v-img>
              <br />
              <br />
              <v-row>
                <v-spacer></v-spacer>
                <v-btn class="mr-4" @click="cancle"> Cancle </v-btn>
                <v-btn color="success" type="submit">
                  Confirm
                  <!-- หากกดปุ่มนี้จะทำให้ข้อมูลในฟอรร์มทำงาน -->
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "StockEdit",
  data() {
    return {
      product: {
        name: "",
        price: "",
        stock: "",
        image: null,
      },
      imageFile: null,
    };
  },

  async mounted() {
    let result = await api.getProductById(this.$route.params.id);
    this.product = result.data;
  },

  methods: {
    getProductImage() {
      if (this.product.image.length > 100) {
        // ถ้ามากกว่า 100 แสดงว่าไม่ใช่ชื่อรูปภาพ แต่มันคือ base64 จะเข้าเงื่อนไขนี้ก็ต่อเมื่อมีการอัพโหลดรูปเพื่อที่จะแก้ไข
        return this.product.image;
      } else {
        // ถ้าน้อยกว่า 100 แสดงว่าเป็นชื่อรูปที่ตั้งตาม id
        return this.$options.filters.imageUrl(this.product.image);
      }
    },
    onFileSelected(event) {
      // code มาตรฐานที่ใช้ในการอ่าน obj ของไฟล์
      const reader = new FileReader();
      // for preview
      reader.onload = (event) => {
        this.product.image = event.target.result;
      };
      // for upload
      reader.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0];
    },
    async submit() {
      try {
        let formData = new FormData();
        const { id, name, price, stock } = this.product;
        formData.append("id", id);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        if (this.imageFile != null) { //ถ้ามีค่าให้แบบรูปภาพขึ้นไป ถ้าไม่มี backend จะมี code ส่วนที่จัดการรูปภาพที่ไม่ได้ส่งมา ซึ่งมันจะแก้ไขเฉพาะส่วนของข้อมูลอื่นที่ไม่ใช่รูปภาพ
          formData.append("image", this.imageFile);
        }
        await api.updateProduct(formData);
        alert("Complete!!!");
        this.$router.back();
      } catch (error) {
        console.log(error);
      }
    },
    cancle() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
