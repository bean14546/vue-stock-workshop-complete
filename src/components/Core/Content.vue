<template>
  <div id="content_for_root">
    <v-main>
      <!-- ตาม document ของ vuetify กำหนดให้ router-view อยู่ภายใต้ v-main  -->
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Content_for_root",
};
</script>

<style>
</style>