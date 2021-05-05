<template>
  <div class="home">
    <v-container>
      <h1>Welkom bij barkeeper</h1>

      <v-row>
        <v-col cols="12">
          <!-- Enkel weer geven als er geen tafelnummer mee gegeven is -->
          <p>Gelieve een barcode op de tafel te scannen aub.</p>
          <p>Vul hieronder het tafelnummer in zoals vermeld op het bordje</p>
          <v-text-field label="Tafelnummer" v-model="table"></v-text-field>
          <v-btn text color="primary" :to="{ path: `/barkeeper/${table}` }">Enter</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    //
  },
  data() {
    return {
      table: sessionStorage.table,
    }
  },
  computed: {
    //
  },
};
</script>
