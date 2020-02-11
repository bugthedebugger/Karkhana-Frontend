<template>
  <footer class="footer">
    <div class="container">
      <!-- Logo -->
      <div class="row">
        <div class="col text-center mb-4">
          <img src="/images/logo-white.png" height="50" />
        </div>
      </div>

      <!-- NavLinks -->
      <div class="row">
        <div class="col">
          <div class="navlinks d-flex flex-wrap">
            <div class="navlink-item">
              <nuxt-link to="/products">Products</nuxt-link>
            </div>
            <div class="navlink-item">
              <nuxt-link to="/blogs">Blog</nuxt-link>
            </div>
            <div class="navlink-item">
              <nuxt-link to="/about">About</nuxt-link>
            </div>
            <div class="navlink-item">
              <nuxt-link to="/contact">Contact</nuxt-link>
            </div>
            <div class="navlink-item ml-auto mr-0" style="cursor: pointer" @click="scrollToTop">
              <a href="#">
                Top &nbsp;
                <i class="fal fa-angle-up icon-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Contents -->
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <!-- <h5 class="who-are-we">Who are we ?</h5>
          <p class="who-are-we-content">
            We are a diverse team of engineers, designers, social workers, programmers and educators
            that are bound together by one vision: empower people with the skills &amp;
            attitudes that will help them build their future and the future of their community.
          </p>-->

          <p class="mb-0">
            <i class="fal fa-copyright"></i>
            2020. Copyright Karkhana Pvt Ltd. All Rights Reserved.
          </p>
        </div>

        <div class="col-md-2"></div>

        <!-- <div class="col-md-2 col-sm-12">
          <ul class="links-list no-bullets">
            <li>
              <a href>FAQs</a>
            </li>
            <li>
              <a href>Terms &amp; Conditions</a>
            </li>
            <li>
              <a href>Privacy Policy</a>
            </li>
            <li>
              <a href>Terms of Use</a>
            </li>
          </ul>
        </div>-->

        <div class="col-md-2 text-right col-sm-12">
          <ul class="links-list no-bullets">
            <!-- <li class="d-none d-md-block">&nbsp;</li> -->
            <!-- <li class="d-none d-md-block">&nbsp;</li> -->
            <!-- <li class="d-none d-md-block">&nbsp;</li> -->
            <li>
              <div class="d-flex social-icons">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_footer.scss";
</style>