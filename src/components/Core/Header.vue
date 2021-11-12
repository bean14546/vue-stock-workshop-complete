<template>
  <div id="header_for_root">
    <v-app-bar color="success" app dense dark> 
      <!-- ต้องใส่ prop app เพื่อผูกตัวนี้กับ  v-app ใน App.vue จะได้ไม่โดน side บัง -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}} V {{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="mr-2">{{$store.getters["username"] | capitalize}}</span>
      <!-- | capitalize เป็นการเรียกใช้ lib ของ filters  -->
      <v-btn icon @click="onClickLogOff">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header_for_root",
  computed:{
    version(){ // ถ้า run หรือ build ในฝั่ง Deverloper จะเป็น V 1.2 ถ้าเป็นฝั่ง production จะเป็น V 1.0 โปรแกรมจะเป็นฝ่ายแยกแยะให้เองว่ากำลัง run ในส่วนไหน
      return process.env.VUE_APP_VERSION // มาจากไฟล์ .env การเรียกใช้ต้องมี VUE_APP
    },
    title(){
        return process.env.VUE_APP_TITLE
    }
  },
  methods: {
      onClickLogOff(){
        this.$store.dispatch("doLogout")
      }
    },
};
</script>

<style>
</style>