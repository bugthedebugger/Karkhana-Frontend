<template>
  <nav class="navbar fixed-top navbar-expand-lg" :class="{'navbar-scroll': opaqueNav || opaque}">
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
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="productsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Products</a>
            <div class="dropdown-menu products-menu" aria-labelledby="productsDropdown">
              <div class="container">
                <div class="row">
                  <div class="col-4 product-category product-category-science">
                    <div class="product-circle"></div>
                    <p class="product-category-name">Karkhana Science</p>
                  </div>
                  <div class="col-4 product-category product-category-computing">
                    <div class="product-circle"></div>
                    <p class="product-category-name">Karkhana Computing</p>
                  </div>
                  <div class="col-4 product-category product-category-make">
                    <div class="product-circle"></div>
                    <p class="product-category-name">Karkhana Make</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <a class="nav-item nav-link" href="#">Blog</a>
          <nuxt-link to="/about" class="nav-item nav-link">About</nuxt-link>
          <a class="nav-item nav-link" href="#">Contact</a>

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
          <div class="nav-item nav-link nav-item-social" href="#">
            <a href="#">
              <i class="fab fa-facebook"></i>
            </a>
            <a href>
              <i class="fab fa-instagram"></i>
            </a>
            <a href>
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
      opaque: false
    };
  },

  created() {
    this.selectedLocale = this.locales[0];
    this.opaque = this.$route.name !== "index";
    if (process.browser) {
      window.addEventListener("scroll", this.updateScroll);
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener("scroll", this.updateScroll);
    }
  },

  methods: {
    selectLocale(index) {
      this.selectedLocale = this.locales[index];
      this.$axios.defaults.headers.common["LANG"] = this.selectedLocale.locale;
    },
    updateScroll() {
      if (process.browser) this.scrollPosition = window.scrollY;
    }
  },

  computed: {
    opaqueNav() {
      if (process.browser) return this.scrollPosition > window.innerHeight / 4;
    }
  },

  watch: {
    $route(to, from) {
      this.opaque = to.name !== "index";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_navbar.scss";
</style>