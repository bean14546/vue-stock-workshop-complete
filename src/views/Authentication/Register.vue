<template>
  <div id="register">
    <v-container>
      <v-row class="justify-center">
        <!-- justify จัดแนวตามแกนปัจจุบัน หากปัจจุบันอยู่ในแกน row จะจัดตาม row คือ แนวนอน -->
        <v-card style="width: 400px">
          <v-img
            class="white--text align-end"
            src="@/assets/login_header.jpg"
            height="200px"
          >
            <!-- align จะจัดแนวตรงข้ามกับแกนปัจจุบัน หากปัจจุบันอยู่ในแกน row จะจัตรงข้าม row คือ แนวตั้ง -->
            <v-card-title> Register </v-card-title>
          </v-img>
          <v-card-text>
            <v-form @submit="submit">

              <v-text-field
                name="username"
                label="Username"
                id="username"
                v-model="account.username"
                :rules="usernameRules"
              />

              <v-text-field
                name="password"
                label="Password"
                id="password"
                :append-icon="isShowpassword ? 'visibility' : 'visibility_off'"
                @click:append="togleIsShowpassword"
                :type="isShowpassword ? 'text' : 'password'"
                v-model="account.password"
                :rules="passwordRules"
              />
              <!-- @click:append เป็นการ modifier ให้เราสามารถคลิกปุ่ม append-icon ได้ -->

              <v-row class="justify-space-between px-3 py-3 pt-5"
                ><!-- px-3 หมายถึง Padding แกน x -->
                <v-btn block type="submit" class="mb-4">Confirm</v-btn>
                <v-btn block @click.prevent="switchBackToLogin">Cancle</v-btn>
                <!-- .prevent คือ object ที่ช่วยป้องกันพฤติกรรมที่เป็น defalse ของระบบ เช่น เมื่อกดแล้วจะป้องกันการรีเฟรชหน้าจอ -->
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      isShowpassword: false,
      account: {
        username: "",
        password: "",
      },
      usernameRules:[v1 => !!v1 || "Username is required"], // !!v1 แปลว่า ไม่มีข้อมูล ดังนั้น v1 => !!v1 || "..." จึงหมายถึงหากไม่มีข้อมูล ให้แสดง "..." ตัวนี้ต้องผูกกับ :rules ใน v-text-field
      passwordRules:[v1 => !!v1 || "Password is required",
                     v2 => !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) || "Minimum eight characters, at least one letter and one number"
      ]// หากไม่เป็นไปตาม expression จะแสดงข้อความ "..."
    };
  },
  methods: {
    togleIsShowpassword() {
      this.isShowpassword = !this.isShowpassword;
    },
    switchBackToLogin() {
      this.$router.back();
    },
    submit() {
      alert(JSON.stringify(this.account));
    },
  },
};
</script>

<style>
</style>