import colors from "vuetify/es5/util/colors";
import path from "path";
import fs from "fs";

export default {
  server: {
    // host: '0', // default: localhost,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.crt")),
    },
  },
  ssr: false,

  target: "static",

  head: {
    title: "Prizebond Checker",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [],

  plugins: ["@/plugins/bengali_number.js"],

  components: true,

  buildModules: ["@nuxtjs/vuetify"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    // [
    //   "@nuxtjs/google-adsense",
    //   {
    //     id: "ca-pub-3191573152654002",
    //   },
    // ],
  ],

  axios: {
    baseURL: "https://prizebondapi.abol-tabol.com/api/v1",
  },

  auth: {
    strategies: {
      awsCognito: {
        scheme: "oauth2",
        endpoints: {
          authorization: "https://prizebondauth.auth.us-east-1.amazoncognito.com/login",
          token: "https://prizebondauth.auth.us-east-1.amazoncognito.com/oauth2/token",
          userInfo: "https://prizebondauth.auth.us-east-1.amazoncognito.com/oauth2/userInfo",
          logout: "https://prizebondauth.auth.us-east-1.amazoncognito.com/logout",
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 3600,
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
        },
        responseType: "token",
        redirectUri: "https://prizebondchecker.mahbubalam.dev/login",
        logoutRedirectUri: "https://prizebondchecker.mahbubalam.dev",
        clientId: "1dd5n0rdjocrgs1hhsub3eiktv",
        scope: ["email", "openid", "profile"],
        codeChallengeMethod: "S256",
      },
    },
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#42b883",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},

  // router: {
  //   middleware: ["auth"]
  // }
};
