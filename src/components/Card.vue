<template>
  <div class="card">
    <v-card>
      <v-card-title>Shopping cart {{ products }}</v-card-title>
      <template v-if="products === 0">
        <p>Er staan nog geen producten in je bestelling.</p>
        <v-btn>Sluiten</v-btn>
      </template>

      <template v-if="products !== 0">
        <v-list two-line>
          <v-list-item-group>
            <template v-for="(item, index) in cart">
              <v-list-item :key="index" @click="removeItem(index)">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>Verwijder</v-list-item-action-text>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <p>Total: {{ total }}€</p>
        <v-btn>Checkout</v-btn>
      </template>
      <v-card-actions>
        <v-btn outlined rounded text @click="goBack">
          Checkout
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'card',
};
</script>

<style lang="scss" scoped></style>
