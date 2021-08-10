<template>
  <div id="app">
    <!--root component ต้องมี v-app เพื่อให้ vuetify render component ได้ -->
    <v-app> 
      <Header v-if="$store.state.isLogin"/>
      <Menu v-if="$store.state.isLogin"/>
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
  mounted(){
    this.$store.dispatch("restoreLogin",this.hlw)
  },
  data() {
    return {
      hlw:"Hello World"
    }
  },
  components:{
    Header,
    Menu,
    Content
  }
};
</script>

<style>
</style>