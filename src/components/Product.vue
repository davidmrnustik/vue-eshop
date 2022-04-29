<template>
  <div class="col-2 m-auto">
    <button
      @click="$emit('addItem', product)"
      class="btn btn-success"
      :style="this.styles.addToCardButton"
    >
      +
    </button>
  </div>
  <div class="col-sm-4">
    <img class="img-fluid d-block" :src="product.image" :alt="product.name" />
  </div>
  <div class="col">
    <h3 class="text-info">{{ index + 1 }}) {{ product.name }}</h3>
    <p class="mb-0">{{ product.description }}</p>
    <div class="h5 float-right">
      <span v-if="product.price >= 90 && displayLabels" class="badge bg-success"
        >premier</span
      >
      <span
        v-else-if="product.price < 90 && product.price > 10 && displayLabels"
        class="badge bg-primary"
        >value</span
      >
      <span
        v-else-if="product.price <= 10 && displayLabels"
        class="badge bg-danger"
        >sale</span
      >
      <Currency :amount="product.price" />
      <!-- {{ getLocalePrice(product.price, { locale: 'en-US', currency: 'USD'}) }}-->
    </div>
  </div>
</template>

<script>
import Currency from '@/components/Currency'

export default {
  name: 'Product',
  emits: ['addItem'],
  props: ['product', 'displayLabels', 'index'],
  components: {
    Currency
  },
  data() {
    return {
      styles: {
        addToCardButton: {
          borderRadius: '50px',
          'border-width': '3px',
          'border-color': 'darkgreen'
        }
      }
    }
  }
}
</script>
