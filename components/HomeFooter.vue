<template>
  <footer class="footer">
    <div class="container">
      <!-- Logo -->
      <div class="row">
        <div class="col"></div>
      </div>

      <!-- NavLinks -->
      <div class="row">
        <div class="col">
          <div class="navlinks d-flex">
            <div class="navlink-item">Products</div>
            <div class="navlink-item">Blog</div>
            <div class="navlink-item">About</div>
            <div class="navlink-item">Contact</div>
            <div class="navlink-item ml-auto mr-0">
              Top
              <i class="fal fa-angle-up icon-up"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Contents -->
      <div class="row">
        <div class="col-md-6">
          <h5 class="who-are-we">Who are we ?</h5>
          <p
            class="who-are-we-content"
          >We come from a spectrum of engineers, designers, artists, scientists, programmers; that turn the classroom into a lab for discovery!</p>

          <p>
            <i class="fal fa-copyright"></i>
            2020. Copyright Karkhana Pvt Ltd. All Rights Reserved.
          </p>
        </div>

        <div class="col-md-2"></div>

        <div class="col-md-2">
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
        </div>

        <div class="col-md-2 text-right">
          <ul class="links-list no-bullets">
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>
              <div class="d-flex social-icons">
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "HomeFooter"
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/_home_footer.scss";
</style>