<template>
  <div class="drinks">
    <v-card>
      <v-card-title>{{ categoryName }}</v-card-title>
      <template v-if="categoryId === 0">
        <p>Geen categorie geselecteerd</p>
      </template>
      <template v-if="drinksCount !== 0">
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

      <!-- Knop terug naar het vorig scherm -->
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
//import DrinksData from '../data/drinks.json';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'drinksPage',
  props: {
    category: { type: Object, required: true },
    //table: { type: Number, required: true },
  },

  data() {
    return {
      //category: this.$route.params.category,
      drinksData: [],
      // Snackbar
      snackbar: false,
      text: ``,
      timeout: 5000,
      /*item: {
        id: 0,
        name: '',
        quantity: 0,
      }*/
    };
  },

  created() {
    this.$store.dispatch('drink/getDrinks');
    this.initialize();
  },

  computed: {
    ...mapState(['drink', 'cart']),
    ...mapGetters({
      drinksCount: 'drink/drinksCount',
    }),
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
      for (let index = 0; index < this.drinksData.length; index++) {
        if (this.drinksData[index].category === this.category.name) {
          drinks.push(this.drinksData[index]);
        }
      }
      return drinks;
    },
  },

  /*watch: {
    dialog(val) {
      val || this.close();
    },
  },*/

  methods: {
    initialize() {
      this.drinksData = this.drink.drinks;
      //this.categoryDrinks = this.drink.categoryDrinks;
      //console.log(this.categoryDrinks);
    },
    addToCart(item) {
      //this.dialog = true;
      this.$store
        .dispatch('cart/addItem', item)
        .then(() => {
          this.snackbar = true;
          this.text = 'Het item werd toegevoegd aan de winkelwagen';
        })
        .catch(() => {
          console.log('Het item kon niet toegevoegd worden aan de winkelwagen');
        });
      //this.$store.dispatch('setTable', this.table);
    },
    save() {
      // De bestelling plaatsen
      this.close()
    }
  },
};
</script>

<style lang="scss" scoped></style>
