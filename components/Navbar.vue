<template>
  <div>
    <nav
      class="navbar fixed-top navbar-expand-lg"
      :class="{'navbar-scroll': opaqueNav || opaqueByDefault}"
      v-if="navbarData"
    >
      <div class="container">
        <nuxt-link :to="'/?lang='+ selectedLocale.locale" class="navbar-brand">
          <img :src="navbarData.logo" class="logo-nav" />
        </nuxt-link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-links"
          aria-controls="navbar-links"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fal fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbar-links">
          <div class="navbar-nav ml-auto">
            <li
              class="nav-item nav-item-dropdown nav-item-dropdown-handle d-none d-md-block"
              v-if="navbarData.products"
            >
              <a
                href="#"
                @click="navigateToProduct('all')"
                class="nav-link nav-link-dropdown-handle"
              >{{navbarData.product_label}}</a>
              <div class="dropdown-menu products-menu d-block" ref="productsDropdownMenu">
                <div class="row">
                  <div
                    class="col-md-4 col-sm-12 product-category"
                    v-for="product in navbarData.products"
                    :key="product.code"
                  >
                    <a href="#" @click="navigateToProduct(product.code)">
                      <div class="product-circle d-none d-md-block">
                        <img :src="product.logo" />
                      </div>
                      <p
                        class="product-category-name"
                        :style="'color: ' + product.color"
                      >{{product.name}}</p>
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <nuxt-link
              :to="'/products?lang=' + selectedLocale.locale"
              class="nav-item nav-link mt-3 d-md-none"
            >Products</nuxt-link>
            <nuxt-link
              :to="'/blogs?lang=' + selectedLocale.locale"
              class="nav-item nav-link"
            >{{navbarData.blog}}</nuxt-link>
            <nuxt-link
              :to="'/about?lang=' + selectedLocale.locale"
              class="nav-item nav-link"
            >{{navbarData.about}}</nuxt-link>
            <nuxt-link
              :to="'/contact?lang=' + selectedLocale.locale"
              class="nav-item nav-link"
            >{{navbarData.contact}}</nuxt-link>

            <!-- Locale dropdown -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="localeDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img class="locale-img-selected" :src="'/images/' + selectedLocale.image" />
              </a>
              <div class="dropdown-menu" aria-labelledby="localeDropdown">
                <a
                  class="dropdown-item"
                  v-for="(locale, index) in locales"
                  :key="index"
                  @click="selectLocale(index)"
                >
                  <img class="locale-img" :src="'/images/' + locale.image" />
                  {{locale.name}}
                </a>
              </div>
            </li>

            <!-- Social handlers -->
            <div class="nav-item nav-link nav-item-social">
              <a :href="navbarData.facebook" target="_blank">
                <i class="fab fa-facebook"></i>
              </a>
              <a :href="navbarData.instagram" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
              <a :href="navbarData.youtube" target="_blank">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import DefaultValue from "~/helpers/default-values";

export default {
  name: "Navbar",
  data() {
    return {
      navbarData: null,
      selectedLocale: null,
      locales: [
        { name: "English(US)", image: "locale-en.svg", locale: "en" },
        { name: "Nepali", image: "locale-np.svg", locale: "np" }
      ],
      scrollPosition: null,
      opaqueByDefault: true
    };
  },

  async fetch() {
    this.navbarData = (
      await this.$axios.get("/pages/landing")
    ).data.data.header;

    // Default values
    Object.keys(this.navbarData).forEach(key => {
      this.vod(this.navbarData[key], this.dv[key]);
    });
    if (this.navbarData.products.length === 0)
      this.navbarData.products = this.dv.products;
  },
  fetchOnServer: true,

  created() {
    let validLocale = this.locales.findIndex(
      l => l.locale === this.$route.query.lang
    );
    if (validLocale) this.selectLocale(validLocale);
    else this.selectLocale(0);

    this.opaque = this.$route.name !== "index";
    if (process.browser) {
      window.addEventListener("scroll", this.updateScroll);
    }

    this.checkOpaqueByDefault(this.$route.name);
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.updateScroll);
    }
  },

  methods: {
    navigateToProduct(type) {
      if (type === "all")
        this.$router.push({
          path: "/products",
          query: { lang: this.selectedLocale.locale }
        });
      else
        this.$router.push({
          path: "/productDetail",
          query: { type, lang: this.selectedLocale.locale }
        });
      this.$refs.productsDropdownMenu.classList.add("invisible");
      setTimeout(() => {
        this.$refs.productsDropdownMenu.classList.remove("invisible");
      }, 500);
    },

    selectLocale(index) {
      this.selectedLocale = this.locales[index];
      this.$axios.defaults.headers.common[
        "Accept-Language"
      ] = this.selectedLocale.locale;
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, lang: this.selectedLocale.locale }
      });
    },

    updateScroll() {
      if (process.browser) this.scrollPosition = window.scrollY;
    },

    checkOpaqueByDefault(routeName) {
      // Transparent in homepage
      // In products page on Larger devices

      if (process.client) {
        this.opaqueByDefault =
          routeName !== "ProductDetail" ||
          (routeName === "ProductDetail" && $(window).width() < 768);
      }
    },

    vod(val, def) {
      return val ? val : def;
    }
  },

  computed: {
    opaqueNav() {
      if (process.browser) return this.scrollPosition > window.innerHeight / 4;
    },
    dv() {
      return DefaultValue.header;
    }
  },

  watch: {
    $route(to, from) {
      this.checkOpaqueByDefault(to.name);
      $("#navbar-links").collapse("hide");
    },

    watch: {
      "$route.query.lang": "$fetch"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_navbar.scss";
</style>