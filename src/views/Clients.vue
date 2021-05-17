<template>
  <div class="clients">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="clientsData"
        item-key="id"
        sort-by="table"
        group-by="datetime"
        class="elevation-1"
        show-group-by
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'clientsPage',
  data () {
    return {
      headers: [
        { text: 'Id', value: 'id', align: 'right', groupable: false, sortable: false },
        { text: 'Naam', align: 'start', value: 'name', groupable: false, sortable: false },
        { text: 'Phone', value: 'phone', align: 'right', groupable: false, sortable: false },
        { text: 'Email', value: 'email', align: 'right', groupable: false, sortable: false },
        { text: 'Tafelnr', value: 'tablenr', align: 'right', groupable: false, sortable: false },
        { text: 'Date', value: 'datetime', align: 'right' },
      ],
      clientsData: [],
    }
  },
  created() {
    this.$store.dispatch('client/getClients');
    this.initialize();
  },
  computed: {
    ...mapState(['client']),
  },
  methods: {
    initialize() {
      this.clientsData = this.client.clients;
    },
  },
};
</script>

<style lang="scss" scoped></style>
