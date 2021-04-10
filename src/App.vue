<template>
  <v-app>
    <v-system-bar></v-system-bar>
    <!--<v-navigation-drawer app>
      Side navigation
    </v-navigation-drawer>-->

    <v-app-bar app color="primary">
      <!-- Top menu bar -->
      <v-toolbar-title>Barkeeper</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- The content of the main view -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-bottom-navigation app color="primary" horizontal grow>
      <v-btn
          v-for="link in links"
          :key="link.label"
          rounded
          text
          :to="link.url"
        >
          <span>{{ link.label }}</span>
          <v-icon>{{ link.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    //
  },
  data() {
    return {
      drawer: false,
      group: null,
      links: [
        { label: 'Home', url: '/barkeeper', icon: 'mdi-home' },
        //{ label: 'Login', url: '/login' },
        { label: 'Cart', url: '/cart', icon: 'mdi-cart'  },
        { label: 'About', url: '/about', icon: 'mdi-information' },
      ],
    };
  },
};
</script>
