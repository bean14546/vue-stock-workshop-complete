<template>
  <div id="stock">
     <v-container>
        <v-row>

          <v-col lg="3" md="6" sm="12" cols="12">
              <StockCard title="TOTAL" subtitle="1,800" avatar_background="#00a65a" avatar_icon="mdi-cart-outline"/>
          </v-col>

          <v-col lg="3" md="6" sm="12" cols="12">
              <StockCard title="SOLD-OUT" subtitle="12" avatar_background="#f39c12" avatar_icon="mdi-flask-empty-outline"/>
          </v-col>

          <v-col lg="3" md="6" sm="12" cols="12">
              <StockCard title="SOLD-OUT" subtitle="2" avatar_background="#dd4b39" avatar_icon="mdi-keyboard-return"/>
          </v-col>

          <v-col lg="3" md="6" sm="12" cols="12">
              <StockCard title="DISCOUNT" subtitle="101" avatar_background="#00c0ef" avatar_icon="mdi-gift-outline" />
          </v-col>

        </v-row>
      </v-container>
  </div>
</template>

<script>
import StockCard from "@/components/Cards/StockCard.vue"
export default {
  name: "Stock",
  components:{
    StockCard
  }
};
</script>

<style>
</style>