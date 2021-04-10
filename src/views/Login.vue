<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <!-- Header -->
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <!-- body -->
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            prepend-icon="mdi-account-circle"
            required
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- container for the buttons -->
        <v-btn :disabled="!valid" color="info" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
//import UserService from '../services/UserService.js';
export default {
  name: 'LoginPage',
  components: {
    //
  },
  created() {
    /*UserService.getUsers().then((response) => {
      console.log(response.data);
    });*/
  },
  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      ],
      password: '',
      showPassword: false,
    };
  },
  methods: {
    login() {
      console.log('button login clicked');
      this.$refs.form.validate();
    },
    register() {
      console.log('go to page register');
      console.log(process.env.DATABASE_URL);
    },
  },
};
</script>

<style lang="scss" scoped></style>
