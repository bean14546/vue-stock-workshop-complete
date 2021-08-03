<template>
  <div id="header_for_root">
    <v-app-bar color="primary" app dense dark> 
      <!-- ต้องใส่ prop app เพื่อผูกตัวนี้กับ  v-app ใน App.vue จะได้ไม่โดน side บัง -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>CMPOS Workshop V {{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <span class="mr-2">Username</span>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header_for_root",
  computed:{
    version(){
      return "1.0"
    }
  },
};
</script>

<style>
</style>