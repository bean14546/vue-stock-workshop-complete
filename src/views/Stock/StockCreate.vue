<template>
  <div id="stockcreate">
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
                v-if="imageURL"
                :src="imageURL"
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
  name: "Stockcreate",
  data() {
    return {
      product: {
        name: "",
        price: "",
        stock: "",
        image: null,
      },
      imageURL: null,
    };
  },
  methods: {
    onFileSelected(event) {
      // code มาตรฐานที่ใช้ในการอ่าน obj ของไฟล์
      const reader = new FileReader();
      // for preview
      reader.onload = (event) => {
        this.imageURL = event.target.result;
      };
      // for upload
      reader.readAsDataURL(event.target.files[0]);
      this.product.image = event.target.files[0];
    },
    async submit() {
      try {
        let formData = new FormData();
        const { name, price, stock } = this.product;
        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("image", this.product.image);
        await api.addProduct(formData);
        alert("Complete!!!")
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
