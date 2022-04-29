<template>
  <transition-group name="products" appear>
    <div
      v-for="(product, index) in products"
      :key="product.id"
      id="item-list"
      class="row align-items-center]"
    >
      <Product
        @add-item="addItem"
        :product="product"
        :index="index"
        :display-labels="displayLabels"
      />
    </div>
  </transition-group>
</template>

<script>
import Product from '@/components/Product'

export default {
  name: 'ProductList',
  props: ['products', 'displayLabels'],
  emits: ['addItem'],
  components: {
    Product
  },
  methods: {
    addItem(product) {
      this.$emit('addItem', product)
    }
  }
}
</script>

<style scoped>
.products-enter-active,
.products-leave-active {
  transition: all 0.5s ease-in-out;
}

.products-enter-from {
  opacity: 0;
  transform: translateX(300px);
}

.products-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
</style>
