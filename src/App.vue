<template>
  <div id="app">
    <!--root component ต้องมี v-app เพื่อใน vuetify render component ได้ -->
    <v-app> 
      <Header />
      <Menu />
      <Content />
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Core/Header.vue";
import Menu from "@/components/Core/Menu.vue";
import Content from "@/components/Core/Content.vue";
export default {
  name: "App",
  components:{
    Header,
    Menu,
    Content
  }
};
</script>

<style>
</style>