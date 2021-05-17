<template>
  <div class="home">
    <v-container>
      <h1>Welkom bij barkeeper</h1>
      <v-row>
        <v-col cols="12">
          <!-- Enkel weer geven als er geen tafelnummer mee gegeven is -->
          <p>
            Scan de barcode of vul hieronder het tafelnummer in zoals vermeld op het bordje
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Tafelnummer" v-model="table"></v-text-field>
          <v-btn text color="primary" @click="enter">Enter</v-btn>
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <template v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            <v-btn
              text color="primary"
              v-if="!$auth.isAuthenticated"
              @click="login"
            >
              Log in
            </v-btn>
            <!-- show logout when authenticated -->
            <v-btn
              text color="primary"
              v-if="$auth.isAuthenticated"
              @click="logout"
            >
              Log out
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data() {
    return {
      table: null,
    };
  },
  methods: {
    enter() {
      let tableNr = Number(this.table);
      if (Number.isInteger(tableNr) && tableNr > 0) {
        this.$router.push({ path: `/barkeeper/${tableNr}` });
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
