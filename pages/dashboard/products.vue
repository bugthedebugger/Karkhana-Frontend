<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Products</h1>
      <div class="toolbar-controls">
        <button type="button" class="btn btn-primary mb-2" @click="createProduct()">
          <i class="fal fa-plus"></i> &nbsp;
          New Product
        </button>
      </div>
    </div>

    <div class="container-card">
      <div v-if="products">
        <div v-if="products.length">
          <table class="table table-borderless product-list">
            <tr
              v-for="(product, index) in products"
              :key="product.uuid"
              class="dashboard-list-item"
            >
              <td>
                <label class="checkbox title flex-fill">
                  <input type="checkbox" />
                  {{product.code}}
                </label>
              </td>
              <td>
                <label>{{product.name}}</label>
              </td>
              <td>
                <div class="controls d-flex">
                  <div class="btn-view mr-2">
                    <nuxt-link :to="'/products/' + product.id" target="_blank">
                      <i class="fal fa-eye"></i>
                    </nuxt-link>
                  </div>
                  <div class="btn-edit mr-2">
                    <nuxt-link :to="'create-product?id=' + product.id">
                      <i class="fal fa-edit"></i>
                    </nuxt-link>
                  </div>
                  <div class="btn-delete" @click="deleteProduct(product.id, index)">
                    <a href="#">
                      <i class="fal fa-trash-alt"></i>
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div v-else>No Products found</div>
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Loading from "~/components/Loading";

export default {
  layout: "dashboard",
  auth: true,
  components: { Loading },
  data() {
    return {
      products: null
    };
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    createProduct() {
      this.$router.push({
        path: "/dashboard/create-product",
        query: { id: "new-product" }
      });
    },

    fetchProducts() {
      this.products = null;
      this.$axios.get("/admin/product/all").then(response => {
        this.products = response.data.data || [];
      });
    },

    deleteProduct(id, index) {
      if (confirm("Are you sure you want to delete this product ?"))
        this.$axios.delete(`/admin/product/${id}`).then(response => {
          this.products.splice(index, 1);
        });
    },

    formatCreatedAt(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
