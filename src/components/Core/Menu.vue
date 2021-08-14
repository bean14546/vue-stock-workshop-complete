<template>
  <div id="menu_for_root">
    <v-navigation-drawer app absolute permanent>
      <router-link to="/stock">
        <v-img src="../../assets/vue_display.jpg" width="100%" />
      </router-link>
      <v-list shaped>
        <v-list-item-group v-model="selectMenu" mandatory color="success">
          <v-list-item v-for="( item, index ) in menus" :key="index">
           
            <v-list-item-icon>
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
                
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Menu_for_root",
  data() {
    return {
      selectMenu: 0,
      menus: [
        {
          icon: "mdi-apps-box",
          name: "Stock",
          path: "/stock",
        },
        {
          icon: "mdi-chart-areaspline",
          name: "Report",
          path: "/report",
        },
        {
          icon: " mdi-text-box-check-outline",
          name: "About",
          path: "/about",
        },
      ],
    };
  },
};
</script>

<style>
</style>