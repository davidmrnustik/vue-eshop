<template>
  <div class="container">
    <h1>Checkout</h1>

    <table class="table table-hover" v-if="cart.length">
      <caption class="text-right h3">
        <b>Total: </b>
        <Currency :amount="cartTotal" />
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-right">Price</th>
          <th scope="col" class="text-right">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <td class="text-center">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                @click="addItemToCart(item.product)"
                class="btn btn-success"
              >
                +
              </button>
              <button
                @click="removeItem(index)"
                class="btn btn-outline-success"
              >
                -
              </button>
            </div>
          </td>
          <th scope="row">{{ item.product.name }}</th>
          <td class="text-center">{{ item.qty }}</td>
          <td class="text-right">
            <Currency :amount="item.product.price" />
          </td>
          <td class="text-right">
            <Currency :amount="item.qty * item.product.price" />
          </td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn btn-sm btn-success" to="/"
      >Keep Shopping
    </router-link>
  </div>
</template>

<script>
import Currency from '@/components/Currency'
import { mapState, mapWritableState } from 'pinia'
import { useProductStore } from '@/stores/ProductStore'

export default {
  name: 'Checkout',
  components: {
    Currency
  },
  computed: {
    ...mapState(useProductStore, ['cart', 'cartTotal']),
    ...mapWritableState(useProductStore, ['addItemToCart', 'removeItem'])
  }
}
</script>

<style scoped></style>
