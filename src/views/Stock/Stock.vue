<template>
  <div id="stock">
    <v-container>
      <!-- Summary section -->
      <v-row>
        <v-col lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="TOTAL"
            subtitle="1,800"
            avatar_background="#00a65a"
            avatar_icon="mdi-cart-outline"
          />
        </v-col>

        <v-col lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="SOLD-OUT"
            subtitle="12"
            avatar_background="#f39c12"
            avatar_icon="mdi-flask-empty-outline"
          />
        </v-col>

        <v-col lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="SOLD-OUT"
            subtitle="2"
            avatar_background="#dd4b39"
            avatar_icon="mdi-keyboard-return"
          />
        </v-col>

        <v-col lg="3" md="6" sm="12" cols="12">
          <StockCard
            title="DISCOUNT"
            subtitle="101"
            avatar_background="#00c0ef"
            avatar_icon="mdi-gift-outline"
          />
        </v-col>
      </v-row>

      <!-- Table section -->
      <v-card class="mt-2">
        <v-data-table :search="search" :headers="headers" :items="mDataArray">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Stock</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                @click="$router.push('/stockcreate')"
                color="success"
                dark
                class="mb-2"
              >
                <v-icon left>add</v-icon>
                <span>New Product</span>
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item="{ item }">
            <tr>
              <td class="text-xs-right">{{ item.id }}</td>
              <td>
                <v-img
                  :src="item.image | imageUrl"
                  aspect-ratio="1"
                  max-width="50"
                  max-height="50"
                ></v-img>
              </td>
              <td class="text-xs-right">{{ item.name }}</td>
              <td class="text-xs-right">{{ item.price | currency("฿") }}</td>
              <td class="text-xs-right">
                {{ item.stock | number("0,0") }} pcs.
              </td>
              <td class="text-xs-right">
                <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
                <span class="ma-1"></span>
                <v-icon @click="deleteItem(item)">delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-dialog v-model="confirmDeleteDlg" max-width="290">
        <v-card>
          <v-card-title primary-title> Confirm Delete </v-card-title>
          <v-card-text class="body">
            Are you sure to delete? After deletion, it cannot be restored.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteDlg = false">Cancle</v-btn>
            <v-btn text @click="confirmDelete" color="error">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import StockCard from "@/components/Cards/StockCard.vue";
import api from "@/services/api";
export default {
  name: "Stock",
  components: {
    StockCard,
  },
  async mounted() {
    // สมารถเรียกใช้ได้แม้จะอยู่คนละไฟล์ getProduct มาจาก ไฟล์ api_product
    this.loadProduct()
  },
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    editItem(item) {
      this.$router.push(`/stock-edit/${item.id}`);
    },
    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteProduct(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProduct();
    },
    async loadProduct() {
      let result = await api.getProduct();
      this.mDataArray = result.data;
    },
  },
};
</script>

<style></style>
