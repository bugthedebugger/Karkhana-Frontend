<template>
  <nav class="navbar fixed-top navbar-expand-lg">
    <a class="navbar-brand" href="#">Logo</a>

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
          <div class="dropdown-menu" aria-labelledby="productsDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <a class="nav-item nav-link" href="#">Blog</a>
        <a class="nav-item nav-link" href="#">About</a>
        <a class="nav-item nav-link" href="#">Contact</a>
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

        <template v-if="$auth.loggedIn">{{$auth.user.email}}</template>
      </div>
    </div>
  </nav>
  <!-- <nav class="navbar fixed-top">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <a class="nav-item nav-link active" href="#">
          Home
          <span class="sr-only">(current)</span>
        </a>
        <a class="nav-item nav-link" href="#">Features</a>
        <a class="nav-item nav-link" href="#">Pricing</a>
        <a class="nav-item nav-link disabled" href="#">Disabled</a>
      </div>
    </div>
  </nav>-->
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss">
@import "@/styles/components/_navbar.scss";
</style>