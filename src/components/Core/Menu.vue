<template>
  <div id="menu_for_root">
    <v-navigation-drawer
      app
      absolute
      permanent
      dark
      src="@/assets/background.jpg"
    >
      <router-link to="/stock">
        <v-img src="../../assets/vue_display.jpg" width="100%" />
      </router-link>
      <v-list shaped>
        <v-list-item-group v-model="selectMenu" mandatory color="success">
          <v-list-item
            class="tile"
            v-for="(item, index) in menus"
            :key="index"
            link
            @click="onClickMenu(item.path)"
          >
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
  mounted() {
    this.selectMenu = this.menus.findIndex(
      (menu) => menu.path == this.$route.path
    );
  },
  methods: {
    onClickMenu(path) {
      this.$router.push(path).catch((err) => {
        err;
      });
    },
  },
  watch: {
    // เป็น section ที่จะใช้ตรวจจับ (detected) การเปลี่ยนแปลง ว่าเราต้องการตรวจจับการเปลี่ยนแปลงของตัวแปรอะไร
    $route(to) {
      this.selectMenu = this.menus.findIndex((menu) => menu.path == to.path); // เมื่อกดที่รูปภาพเมนูหลักจะทำให้เกิดการ high light ตาม route
    },
  },
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
.tile{
  color: white;
}
.tile:hover{
  background: green;
}
.tile:active{
  background: #05ab71;
}

.v-list-item-group .v-list-item--active {
    color: white !important; /* !important คือ property ที่ใช้สำหรับการ override หมายถึง ตัวนี้สำคัญที่สุด ต้องแสดงตัวนี้เท่านั้น */
}


.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    opacity: 0.7;
}
</style>
