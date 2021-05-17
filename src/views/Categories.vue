<template>
  <div class="categories">
    <v-card>
      <v-card-title>Categorieën</v-card-title>
      <template>
        <v-list rounded flat>
          <v-list-item-group color="primary">
            <template v-for="(category, index) in categories">
              <v-list-item :key="index" :to="{ name: 'Drinks', params: { category: category } }">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="category.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <!-- -->
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CategoriesPage',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
