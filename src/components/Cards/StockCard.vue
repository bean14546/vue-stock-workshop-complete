<template>
  <div id="stock_card">
    <v-card>
      <v-list-item two-line>
        
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{title}}</v-list-item-title>
          <v-list-item-subtitle class="title">{{subtitle}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" :color="avatar_background">
          <v-icon color="white">{{avatar_icon}}</v-icon>
        </v-list-item-avatar>

      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "StockCard",
  props:{
      title : String,
      subtitle :String,
      avatar_background :String,
      avatar_icon :String
  }
};
</script>

<style>
</style>    