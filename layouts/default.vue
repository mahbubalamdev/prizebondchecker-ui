<template>
  <v-app>
        <v-card>
      <v-toolbar color="cyan"
      dark
      flat >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
                  <v-toolbar-title>Prize bond</v-toolbar-title>

                  <v-spacer></v-spacer>
                   <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                  <v-menu
      v-if="loggedIn"
      v-model="profileMenu"
     
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-avatar
        v-bind="attrs"
        v-on="on"
        >
              <img
                :src="user.picture"
                :alt="user.name"
              >
            </v-list-item-avatar>
      </template>
      <v-card v-if="loggedIn">
    
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                :src="user.picture"
                :alt="user.name"
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>

            
          </v-list-item>
          <v-list-item @click="logout">
           
            <v-list-item-title >
              <v-list-item-action>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
      </v-menu>
      <v-btn v-else flat color="cyan" dark elevation="0" @click="login">Login</v-btn>
                  <template v-slot:extension>
                    <v-tabs
                      v-model="tab"
                      align-with-title
                    >
                      <v-tabs-slider color="white"></v-tabs-slider>

                      <v-tab
                        v-for="(menu,i) in menus"
                        :key="i"
                        :to="menu.to"
                      >
                        {{ menu.title }}
                      </v-tab>
                    </v-tabs>
                  </template>
                </v-toolbar>
                <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(menu,i) in menus"
        :key="i"
      >
        <v-card flat>
          <v-tabs
                      v-model="subTab"
                      align-with-title
                      v-if="menu.submenus"
                    >
                      <v-tabs-slider color="white"></v-tabs-slider>

                      <v-tab
                        v-for="(menu, i) in menu.submenus"
                        :key="i"
                        :to="menu.to"
                      >
                        {{ menu.title }}
                      </v-tab>
          </v-tabs>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
              </v-card>
     
   
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
        scripts: [
          { hid: 'adsense', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', defer: true, 'data-ad-client': 'ca-pub-3191573152654002' },
        ]
      }
  },
  data() {
    return {
      profileMenu: false,
      tab: null,
      subTab: null,
      menus: [
        { title: 'Prizebond results', icon: 'mdi-gauge', to:'/'},
   
        { title: 'My Prizebonds', icon: 'mdi-gauge', to:'/prizebonds/me', },
      
      ],
   
    };
  },
  created() {
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
    login() {
       this.$auth.loginWith("awsCognito");
    }
  },
  computed: {
    loggedIn(){
      return this.$auth.user
    },
    user(){
      return this.$auth.user
    }
  }
};
</script>
