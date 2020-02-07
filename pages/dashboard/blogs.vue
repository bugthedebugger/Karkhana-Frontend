<template>
  <div class="dashboard-content">
    <div class="toolbar">
      <h1 class="title">Blog Posts</h1>
      <div class="toolbar-controls">
        <form class="form-inline">
          <div class="input-group mb-2 mr-sm-2 search-field">
            <div class="input-group-prepend">
              <div class="input-group-text">@</div>
            </div>
            <input type="text" class="form-control search-input" />
          </div>

          <nuxt-link to="/dashboard/create-blog" class="btn btn-primary mb-2">
            <i class="fal fa-plus"></i> &nbsp;
            New Blog Post
          </nuxt-link>
        </form>
      </div>
    </div>

    <div class="container-card">
      <div class="menubar"></div>
      <ul class="dashboard-list no-bullets">
        <li v-for="blogPost in blogPosts" :key="blogPost.uuid" class="dashboard-list-item d-flex">
          <label class="checkbox title flex-fill">
            <input type="checkbox" />
            {{blogPost.title}}
          </label>
          <label class="author">{{blogPost.author}}</label>
          <label class="created-at">{{blogPost.created_at}}</label>
          <label class="views">
            {{blogPost.views}}
            <i class="fal fa-arrow-up"></i>
          </label>
          <div class="controls d-flex">
            <div class="btn-view">
              <i class="fal fa-eye"></i>
            </div>
            <div class="btn-edit">
              <i class="fal fa-edit"></i>
            </div>
            <div class="btn-delete">
              <i class="fal fa-trash-alt"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      blogPosts: [
        {
          uuid: 1,
          title: "The best way to predict the way is to invent it",
          author: "Bibhuti Poudyal",
          created_at: "20/08/2020",
          views: 108
        },
        {
          uuid: 1,
          title: "The best way to predict the way is to invent it",
          author: "Bibhuti Poudyal",
          created_at: "20/08/2020",
          views: 108
        },
        {
          uuid: 1,
          title: "The best way to predict the way is to invent it",
          author: "Bibhuti Poudyal",
          created_at: "20/08/2020",
          views: 108
        },
        {
          uuid: 1,
          title: "The best way to predict the way is to invent it",
          author: "Bibhuti Poudyal",
          created_at: "20/08/2020",
          views: 108
        },
        {
          uuid: 1,
          title: "The best way to predict the way is to invent it",
          author: "Bibhuti Poudyal",
          created_at: "20/08/2020",
          views: 108
        },
        {
          uuid: 1,
          title: "The best way to predict the way is to invent it",
          author: "Bibhuti Poudyal",
          created_at: "20/08/2020",
          views: 108
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/pages/_dashboard_blogs.scss";
</style>
