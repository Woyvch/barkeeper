<template>
  <div class="editCategories">
    <v-container>
      <div>
        <v-data-table 
          :headers="headers"
          :items="categorieslist"
          :search="search"
          sort-by="name"
          class="elevation-1"
          >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Categorieënlijst</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Zoeken"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-divider class="mx-4" inset vertical></v-divider>
              <!-- Dialoogvenster om een item toe te voegen -->
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                    Toevoegen
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="2">
                          <v-text-field v-model="editedItem.id" label="Id" :disabled="true"></v-text-field>
                        </v-col>
                        <v-col cols="10">
                          <v-text-field v-model="editedItem.name" label="Naam"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Annuleren
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Opslaan
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- Dialoogvenster om een item te verwijderen -->
              <v-dialog v-model="dialogDelete" max-width="510px">
                <v-card>
                  <v-card-title class="headline">
                    Ben je zeker dat je dit item wil verwijderen?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteDrink(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'editCategories',
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Id', value: 'id', sortable: false },
        { text: 'Naam', align: 'start', value: 'name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      categorieslist: [],
      catNames: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
      },
      defaultItem: {
        id: 0,
        name: '',
      },
      search: '',
    };
  },

  computed: {
    ...mapState(['category']),
    formTitle() {
      return this.editedIndex === -1 ? 'Nieuwe categorie' : 'Bewerk categorie';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.$store.dispatch('category/getCategories');
    this.$store.dispatch('category/getCatNames');
    this.initialize();
  },

  methods: {
    initialize() {
      this.categorieslist = this.category.categories;
      this.catNames = this.category.catNames;
    },

    editItem(item) {
      this.editedIndex = this.categorieslist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.categorieslist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    
    deleteDrink(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store
        .dispatch('category/deleteCategory', this.editedItem)
        .then(() => {
          // execute when there is a response from the API
          this.categorieslist.splice(this.editedIndex, 1);
        })
        .catch((error) => {
          console.log('There was a problem' + error);
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    
    save() {
      if (this.editedIndex > -1) {
        // Een categorie wijzigen
        Object.assign(this.categorieslist[this.editedIndex], this.editedItem)
        this.$store
          .dispatch('category/editCategory', this.editedItem)
          .then(() => {
            // execute when there is a response from the API
          })
          .catch((error) => {
            console.log('There was a problem' + error);
          });
      } else {
        // Een nieuwe categorie toevoegen
        //this.dranken.push(this.editedItem)
        this.$store
          .dispatch('category/addCategory', this.editedItem)
          .then(() => {
            // execute when there is a response from the API
            this.initialize();
          })
          .catch((error) => {
            console.log('There was a problem' + error);
          });
      }
      this.close()
    },
  },
};
</script>

<style lang="scss" scoped></style>
