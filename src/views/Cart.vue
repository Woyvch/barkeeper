<template>
  <div class="cart">
    <v-card>
      <v-card-title>Shopping cart {{ products }}</v-card-title>
      <template v-if="products === 0">
        <p>Er staan nog geen producten in je bestelling.</p>
      </template>
      <template v-if="products !== 0">
        <v-list two-line>
          <v-list-item-group>
            <template v-for="(item, index) in cart">
              <v-list-item :key="index" @click="removeItem(index)">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>Verwijder</v-list-item-action-text>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <p>Total: {{ total }}€</p>
      </template>
      <v-card-actions>
        <v-btn :disabled="products === 0" outlined rounded text color="info" @click="dialogVisibility = true">
          Checkout
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn outlined rounded text color="warning" :to="{ path: '/barkeeper' }">
          Sluiten
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
    <DialogComponent
      :dialogVisibility="dialogVisibility"
      :clientData="clientData"
      @show-dialog="showDialog"
      @order-completed="orderCompleted"
      :order="products"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DialogComponent from '../components/Dialog.vue';
export default {
  name: 'cartPage',
  data() {
    return {
      empty: null,
      items: [],
      snackbar: false,
      text: ``,
      timeout: 5000,
      dialogVisibility: false,
      clientData: null,
      orderFinished: false,
    };
  },
  components: {
    DialogComponent,
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
    }),
    ...mapGetters({
      products: 'cartItems',
      total: 'cartValue',
    }),
    /*...mapActions({
      removeItem: 'removeItem',
    }),*/
  },
  methods: {
    removeItem(index) {
      this.$store
        .dispatch('removeItem', index)
        .then(() => {
          this.snackbar = true;
          this.text = 'Het item werd verwijderd uit de winkelwagen';
        })
        .catch(() => {
          console.log('Er was een probleem bij het verwijderen');
        });
    },
    // method emitted by the child to the parent
    showDialog(value) { 
      // value == true if Checkout is clicked
      this.dialogVisibility = value; 
    },
    orderCompleted(value) {
      this.orderFinished = value;
    },
    /*checkout(products) {
      this.$store.dispatch('checkout', products)
    },*/
  }
};
</script>

<style lang="scss" scoped></style>
