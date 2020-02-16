<template>
  <nav
    class="navbar fixed-top navbar-expand-lg"
    :class="{'navbar-scroll': opaqueNav || opaqueByDefault}"
  >
    <div class="container">
      <nuxt-link to="/" class="navbar-brand">
        <img src="/images/logo-nav.png" class="logo-nav" />
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
          <li class="nav-item nav-item-dropdown nav-item-dropdown-handle d-none d-md-block">
            <a
              href="#"
              @click="navigateToProduct('all')"
              class="nav-link nav-link-dropdown-handle"
            >Products</a>
            <div class="dropdown-menu products-menu d-block" ref="productsDropdownMenu">
              <div class="row">
                <div class="col-md-4 col-sm-12 product-category product-category-science">
                  <a href="#" @click="navigateToProduct('science')">
                    <div class="product-circle d-none d-md-block">
                      <img src="/images/product-logo-science.svg" />
                    </div>
                    <p class="product-category-name">Karkhana Science</p>
                  </a>
                </div>
                <div class="col-md-4 col-sm-12 product-category product-category-computing">
                  <a href="#" @click="navigateToProduct('computing')">
                    <div class="product-circle d-none d-md-block">
                      <img src="/images/product-logo-computing.svg" />
                    </div>
                    <p class="product-category-name">Karkhana Computing</p>
                  </a>
                </div>
                <div class="col-md-4 col-sm-12 product-category product-category-make">
                  <a href="#" @click="navigateToProduct('make')">
                    <div class="product-circle d-none d-md-block">
                      <img src="/images/product-logo-make.svg" />
                    </div>
                    <p class="product-category-name">Karkhana Make</p>
                  </a>
                </div>
              </div>
              <!-- <div class="row">
                <div class="col-12 text-center">
                  <nuxt-link to="/products" class="mt-2">View All Products</nuxt-link>
                </div>
              </div>-->
            </div>
          </li>

          <nuxt-link to="/products" class="nav-item nav-link mt-3 d-md-none">Products</nuxt-link>
          <nuxt-link to="/blogs" class="nav-item nav-link">Blog</nuxt-link>
          <nuxt-link to="/about" class="nav-item nav-link">About</nuxt-link>
          <nuxt-link to="/contact" class="nav-item nav-link">Contact</nuxt-link>

          <!-- Locale dropdown -->
          <!-- <li class="nav-item dropdown">
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
          </li>-->

          <!-- Social handlers -->
          <div class="nav-item nav-link nav-item-social">
            <a href="https://www.facebook.com/karkhana.asia" target="_blank">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/karkhana.asia/" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/user/karkhanalabs" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
          </div>

          <!-- <template v-if="$auth.loggedIn">{{$auth.user.email}}</template> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      selectedLocale: null,
      locales: [
        { name: "English(US)", image: "locale-en.svg", locale: "en" },
        { name: "Nepali", image: "locale-np.svg", locale: "np" }
      ],
      scrollPosition: null,
      opaqueByDefault: true
    };
  },

  created() {
    this.selectedLocale = this.locales[0];
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
      if (type === "all") this.$router.push({ path: "/products" });
      else this.$router.push({ path: `/productDetail?type=${type}` });
      this.$refs.productsDropdownMenu.classList.add("invisible");
      setTimeout(() => {
        this.$refs.productsDropdownMenu.classList.remove("invisible");
      }, 500);
    },

    selectLocale(index) {
      this.selectedLocale = this.locales[index];
      this.$axios.defaults.headers.common["LANG"] = this.selectedLocale.locale;
    },
    updateScroll() {
      if (process.browser) this.scrollPosition = window.scrollY;
    },

    checkOpaqueByDefault(routeName) {
      this.opaqueByDefault =
        routeName !== "index" && routeName !== "ProductDetail";
    }
  },

  computed: {
    opaqueNav() {
      if (process.browser) return this.scrollPosition > window.innerHeight / 4;
    }
  },

  watch: {
    $route(to, from) {
      this.checkOpaqueByDefault(to.name);
      $("#navbar-links").collapse("hide");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_navbar.scss";
</style>