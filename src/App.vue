<template>
  <v-app>
    <v-system-bar></v-system-bar>

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
        <v-icon>{{ link.icon }}</v-icon>
        <span>{{ link.label }}</span>
        <v-badge :content="cartItems" :value="link.visible" inline></v-badge>
      </v-btn>
      <v-btn v-if="$auth.isAuthenticated" to="/settings">
        <v-icon>mdi-cog-outline</v-icon>
        <span>Instellingen</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['category', 'drinks', 'cart']),
    ...mapGetters({
      cartItems: 'cart/cartItems',
    }),
  },
  beforeCreate() {
    sessionStorage.clear();
  },
  created() {
    this.$store.dispatch('category/getCategories');
    this.$store.dispatch('drink/getDrinks');
  },
  data() {
    return {
      links: [
        {
          label: 'Start',
          url: `/`,
          icon: 'mdi-home-outline',
          visible: false,
        },
        {
          label: 'Bestelling',
          url: '/cart',
          icon: 'mdi-cart-outline',
          visible: true,
        },
      ],
    };
  },
};
</script>
