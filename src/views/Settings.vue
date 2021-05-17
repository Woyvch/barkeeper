<template>
  <div class="settings">
    <template>
      <v-navigation-drawer absolute permanent expand-on-hover>
        <v-list nav dense>
          <v-list-item v-for="link in links" :key="link.title" link :to="link.url">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'settingsPage',
  computed: {
    ...mapState(['category', 'drinks']),
  },
  created() {
    this.$store.dispatch('category/getCategories');
    this.$store.dispatch('drink/getDrinks');
    this.$store.dispatch('order/getOrders');
    this.$store.dispatch('order/getOrderings');
    this.$store.dispatch('client/getClients');
  },
  data() {
    return {
      links: [
        { title: 'Categorieën', url: '/settings/categories', icon: 'mdi-view-agenda' },
        { title: 'Dranken', url: '/settings/drinks', icon: 'mdi-cup' },
        { title: 'Bestellingen', url: '/settings/orders', icon: 'mdi-text' },
        { title: 'Klanten', url: '/settings/clients', icon: 'mdi-account-multiple-outline' },
        { title: 'QR-code', url: '/settings/qrcode', icon: 'mdi-qrcode' },
      ],
    }
  },
};
</script>

<style lang="scss" scoped></style>
