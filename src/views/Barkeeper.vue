<template>
  <div class="barkeeper">
    <v-container>
      <h1>Welkom bij barkeeper</h1>
      <p>Tafelnummer: {{ this.table }}</p>
      <template v-if="this.table >= 1">
        <router-view :categories="category.categories"></router-view>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'barkeeperPage',
  props: {
    table: { type: String, default: '0' },
  },
  computed: {
    ...mapState(['category']), // reference the modulename
  },
  created() {
    this.$store.dispatch('category/getCategories');
    this.$store.dispatch('setTable', this.table);
  },
};
</script>

<style lang="scss" scoped></style>
