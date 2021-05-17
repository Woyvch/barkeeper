<template>
  <div class="cart">
    <v-data-table
      :headers="headers"
      :items="items"
      mobile-breakpoint=758
      sort-by="Naam"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Winkelwagen</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn text color="primary" :to="{ path: `/barkeeper/${table}` }">
            Sluiten
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="decrementItem(item)">
          mdi-minus-circle-outline
        </v-icon>
        <v-icon @click="incrementItem(item)">
          mdi-plus-circle
        </v-icon>
      </template>
      
      <template v-slot:footer>
        <div>
          <p>Totaal: {{ total }}€</p>
          <v-btn :disabled="products === 0" text color="info" @click="dialogVisibility = true">
            Checkout
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <DialogComponent
      :dialogVisibility="dialogVisibility"
      :clientData="clientData"
      @show-dialog="showDialog"
      @order-completed="orderCompleted"
      :order="cart.items"
    />

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DialogComponent from '../components/Dialog.vue';

export default {
  name: 'cartPage',
  data() {
    return {
      headers: [
        { text: 'Aantal',sortable: false, value: 'quantity' },
        { text: 'Naam', sortable: false, value: 'item.name' },
        { text: 'Prijs (€)', sortable: false, value: 'value' },
        { text: 'Wijzigen', value: 'actions', sortable: false },
      ],
      items: [],
      // snackbar
      snackbar: false,
      text: ``,
      timeout: 5000,
      // dialog
      dialogVisibility: false,
      clientData: null,
      orderFinished: false,
      // tafelnummer
      table: sessionStorage.table,
    }
  },
  components: {
    DialogComponent,
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters({
      products: 'cart/cartItems',
      total: 'cart/cartValue',
    }),
  },
  created () {
    this.items = this.cart.items;
  },
  methods: {
    itemIndex(item) {
      for (let index = 0; index < this.items.length; index++) {
        if(this.items[index].item.id === item.id) {
          return index;
        }
      }
    },
    decrementItem(item) {
      let index = this.itemIndex(item.item);
      if(item.quantity > 1) {
        this.$store
          .dispatch('cart/decrementItemQuantity', index)
          .then(() => {
            //console.log('succes');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.removeItem(index);
      }
    },
    incrementItem(item) {
      let index = this.itemIndex(item.item);
      this.$store
        .dispatch('cart/incrementItemQuantity', index)
        .then(() => {
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeItem(index) {
      this.$store
        .dispatch('cart/removeItem', index)
        .then(() => {
          this.snackbar = true;
          this.text = 'Het item werd verwijderd uit de winkelwagen';
        })
        .catch(() => {
          console.log('Er was een probleem bij het verwijderen');
        });
    },
    showDialog(value) { 
      // value == true if Checkout is clicked
      this.dialogVisibility = value; 
    },
    orderCompleted(value) {
      // true wanneer order afgewerkt is
      this.orderFinished = value;
      console.log(this.orderFinished);
      // Melding geven wanneer de bestelling voltooid is
      this.showSnackbar('De bestelling werd met succes voltooid.');
      // winkelkar leeg maken
      this.$store
        .dispatch('cart/clearCartItems')
        .then(() => {
          this.items = [];
          sessionStorage.clear();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showSnackbar(content) {
      this.snackbar = true;
      this.text = content;
    },
  },
};
</script>

<style lang="scss" scoped></style>
