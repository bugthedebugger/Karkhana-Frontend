
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Karkhana',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Makers Today, Shapers of Tomorrow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: "/js/jquery.min.js" },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' }
    ]
  },

  env: {
    CAL_API_KEY: "AIzaSyBepIVJdLIVOAHb2afbyVAxcF-sqJpy3dM",
    CAL_BASE_URL: "https://www.googleapis.com/calendar/v3/calendars",
    CAL_ID: "karkhana.asia_mdt3kr5jmvh1ld77g0fqfldc0k@group.calendar.google.com",
    BASE_API_URL: "https://api.karkhana.asia",
    TINY_MCE_API_KEY: "xzdc1n6z3n8g0op6mby6jp3yvm3gapvhbgzmcyw7554g6jf7",
    MY_URL: "https://api.karkhana.asia"
  },

  loading: false,
  /*
  ** Global CSS
  */
  css: [
    'styles/global.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'UA-158647375-1',
    // debug: {
    //   enabled: true,
    //   sendHitTask: true
    // },
  },

  'nuxt-i18n': {
    seo: false
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 2,
    trailingSlash: true,
    gzip: true
  },

  // Nuxt Toast
  toast: {
    theme: "bubble",
    position: "bottom-right",
    duration: 3000
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "https://api.karkhana.asia"
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },

    loaders: {
      scss: { sourceMap: false }
    }
  },

  // Auth configs
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `https://api.karkhana.asia/v1/login/email`, method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: 'https://api.karkhana.asia/me', method: 'post', propertyName: 'data' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/'
    }
  },

  router: {
    middleware: ['auth']
  }

}
