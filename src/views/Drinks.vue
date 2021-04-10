<template>
  <div class="drinks">
    <v-card>
      <v-card-title>{{ categoryName }}</v-card-title>
      <template v-if="categoryId === 0">
        <p>Geen categorie geselecteerd</p>
      </template>
      <template v-if="categoryId !== 0">
        <v-list two-line rounded flat>
          <v-list-item-group color="primary">
            <template v-for="(drink, index) in drinks">
              <v-list-item :key="index" @click="addToCart(drink)">
                <template>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="drink.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="drink.description"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="drink.price"
                    ></v-list-item-action-text>
                    <v-icon>mdi-cart-arrow-down</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </template>
      <v-card-actions>
        <v-btn outlined rounded text @click="$router.go(-1)">
          Terug
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import DrinksData from '../data/drinks.json';
export default {
  name: 'drinksPage',
  props: {
    //
  },
  data() {
    return {
      category: this.$route.params.category,
      snackbar: false,
      text: ``,
      timeout: 5000,
    };
  },
  created() {
    //
  },
  computed: {
    categoryId() {
      let categoryId = this.category.id;
      return categoryId;
    },
    categoryName() {
      let categoryName = this.category.name;
      return categoryName;
    },
    drinks() {
      let drinks = [];
      for (let index = 0; index < DrinksData.length; index++) {
        if (DrinksData[index].category === this.category.id) {
          drinks.push(DrinksData[index]);
        }
      }
      return drinks;
    },
  },
  methods: {
    addToCart(event) {
      this.$store
        .dispatch('addItem', event)
        .then(() => {
          this.snackbar = true;
          this.text = 'Het item werd toegevoegd aan de winkelwagen';
        })
        .catch(() => {
          console.log('Het item kon niet toegevoegd worden aan de winkelwagen');
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
