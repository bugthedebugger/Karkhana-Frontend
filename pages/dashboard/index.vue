<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Dashboard</h1>
      <span class="current-date">{{currentDate}}</span>
    </div>

    <div class="dashboard-card">Welcome back, {{$auth.user.name}}</div>

    <div class="mt-4"></div>
    <a target="_black" download href="/pdfs/blog_guideline.pdf">Download Blog guideline</a>
  </div>
</template>
<script>
import moment from "moment";
export default {
  layout: "dashboard",
  auth: true,
  components: {},

  created() {
    this.currentDate = moment(new Date()).format("D MMM YYYY, dddd");
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/dashboard.scss";
</style>
