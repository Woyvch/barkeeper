<template>
  <div class="barkeeper">
    <v-container>
      <h1>Dit is de landingspagina voor de klanten</h1>
      <p>Tafelnummer: {{ this.table }}</p>

      <v-row v-if="this.table != 0">
        <v-col cols="12">
          <!-- Enkel weer geven als er geen tafelnummer mee gegeven is -->
          <p>Gelieve een barcode op de tafel te scannen aub.</p>
          <p>Vul hieronder de webcode in zoals vermeld op het bordje</p>
          <v-text-field label="Tafelnummer" v-model="table"></v-text-field>
          <v-btn>Login</v-btn>
          <p>Niet mogelijk om de menulijst te zien, maar niet te bestellen</p>
        </v-col>
      </v-row>
      <template v-if="this.table >= 1">
        <router-view :categories="categories"></router-view>
      </template>
    </v-container>
  </div>
</template>

<script>
import CategoriesData from '../data/categories.json';
export default {
  name: 'barkeeperPage',
  components: {
    //
  },
  computed: {
    //
  },
  data() {
    return {
      categories: CategoriesData,
      table: null,
    };
  },
  methods: {
    //
  },
};
</script>

<style lang="scss" scoped></style>
