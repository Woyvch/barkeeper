<template>
  <div class="orders">
    <v-container>
      <template>
        <v-data-table
          :headers="headers"
          :items="ordersData"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="id"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Orderslijst</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Value</th>
                      <th>OrderId</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ordering in orderingsData" :key="ordering.id">
                      <template v-if="ordering.orderId == item.id">
                        <td>{{ ordering.item }}</td>
                        <td>{{ ordering.quantity }}</td>
                        <td>{{ ordering.value }}</td>
                        <td>{{ ordering.orderId }}</td>
                      </template>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </td>
          </template>
        </v-data-table>
      </template>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ordersPage',
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Tafel',
          align: 'start',
          sortable: false,
          value: 'tablenr',
        },
        { text: 'Datum', value: 'datetime' },
        { text: '', value: 'data-table-expand' },
      ],
      ordersData: [],
      orderingsData: [],
    };
  },
  created() {
    this.$store.dispatch('order/getOrders');
    this.$store.dispatch('order/getOrderings');
    this.initialize();
  },
  computed: {
    ...mapState(['order']),
  },
  methods: {
    initialize() {
      this.ordersData = this.order.orders;
      this.orderingsData = this.order.orderings;
    },
    rij(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
