<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- Side navigation -->
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <!-- Top menu bar -->
      <v-toolbar-title>Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"
        text
        rounded
        :to="link.url"
        >{{ link.label }}
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- The content of the main view -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer color="primary" padless>
      <!-- Bottom footer -->
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Project</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    //
  },
  data: () => ({
    drawer: false,
    group: null,
    links: [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Login',
        url: '/login',
      },
      {
        label: 'About',
        url: '/about',
      },
    ],
  }),
};
</script>
