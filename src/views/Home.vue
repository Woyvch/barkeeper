<template>
  <div class="home">
    <v-container>
      <h1>Welkom bij barkeeper</h1>
      <v-row>
        <v-col cols="12">
          <!-- Enkel weer geven als er geen tafelnummer mee gegeven is -->
          <!--<p>Gelieve een barcode op de tafel te scannen aub.</p>-->
          <p>Vul hieronder het tafelnummer in zoals vermeld op het bordje</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Tafelnummer" v-model="table"></v-text-field>
          <v-btn text color="primary" @click="enter">Enter</v-btn>
          <v-spacer></v-spacer>
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <template v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            <v-btn text color="primary" v-if="!$auth.isAuthenticated" @click="login">Log in</v-btn>
            <!-- show logout when authenticated -->
            <v-btn text color="primary" v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn>
          </template>
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
      //table: sessionStorage.table,
      table: null,
    };
  },
  computed: {
    //
  },
  methods: {
    enter() {
      let tableNr = Number(this.table);
      if (Number.isInteger(tableNr) && tableNr > 0) {
        //console.log('table is number: '+ tableNr);
        this.$router.push({ path: `/barkeeper/${tableNr}` });
      } else {
        //console.log('table is not a number: ' + tableNr);
      }
    },
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>
