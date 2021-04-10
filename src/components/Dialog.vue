<template>
  <v-row justify="center">
    <v-dialog v-model="visibility" persistent max-width="600px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Persoonsgegevens</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" >
                <v-text-field
                  v-model="firstName"
                  :error-messages="firstNameErrors"
                  label="Voornaam*" 
                  required
                  @input="$v.firstName.$touch()"
                  @blur="$v.firstName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="lastName"
                  :error-messages="lastNameErrors"
                  label="Achternaam*"
                  required
                  @input="$v.lastName.$touch()"
                  @blur="$v.lastName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  :error-messages="phoneErrors"
                  label="GSM nummer*"
                  hint="Voorbeeld: 0477691085 of +32477691085"
                  persistent-hint
                  required
                  @input="$v.phone.$touch()"
                  @blur="$v.phone.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="Email*"
                  hint="voorbeeld@email.com"
                  persistent-hint
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Ik ga akkoord met de algemene voorwaarden en de privacy verklaring"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*verplicht in te vullen</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined rounded text color="error" @click="close">
            Sluiten
          </v-btn>
          <v-btn outlined rounded text color="success" @click="save(order)">
            Afrekenen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'dialogComponent',
  mixins: [validationMixin],
  validations: {
    firstName: { required },
    lastName: { required },
    phone: { required, minLength: minLength(10), maxLength: maxLength(13) },
    email: { required, email },
    checkbox: {
      checked(value) {
        return value;
      },
    },
  },
  data() {
    return {
      //visibility: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      checkbox: true,
    };
  },
  props: {
    dialogVisibility: {
      type: Boolean,
      default: false,
    },
    clientData: {
      type: Object,
      default: null,
    },
    order: {
      type: Number,
      default: null,
    }
  },
  computed: {
    visibility() {
      return this.dialogVisibility;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push('Gelieve je voornaam in te vullen')
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push('Gelieve je achternaam in te vullen')
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      // controle enkel cijfers
      !this.$v.phone.minLength && errors.push('gsm nummer moet minimum 10 karakters lang zijn')
      !this.$v.phone.maxLength && errors.push('gsm nummer mag maximum 13 characters lang zijn')
      !this.$v.phone.required && errors.push('gsm nummer is verplicht')
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Moet een geldig emailadres zijn')
      !this.$v.email.required && errors.push('Gelieve je emailadres in te vullen')
      return errors;
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push('Je moet akkoord gaan om door te gaan')
      return errors;
    },
    client() {
      let client = {
        name: `${this.firstName} ${this.lastName}`,
        phone: this.phone,
        email: this.email,
      };
      // De persoonsgegevens terug sturen
      return client;
    },
  },
  methods: {
    close() {
      this.$v.$reset();
      this.$emit('show-dialog', false);
    },
    save() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        // Wanneer alle gegevens correct zijn ingevuld de bestelling plaatsen
        console.log(this.client);
        this.$store
          .dispatch('checkout')
          .then(() => {
            // Alle velden terug leeg maken
            this.resetDialogForm();
            // Dialoogvenster sluiten
            this.$emit('order-completed', true);
            this.$emit('show-dialog', false);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    resetDialogForm() {
      this.firstName = '';
      this.lastName = '';
      this.phone = '';
      this.email = '';
      this.checkbox = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
