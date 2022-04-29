<template>
  <nav class="navbar navbar-light sticky-top mr-3">
    <div
      v-if="cart.length"
      class="w-100 navbar-text ml-auto d-flex justify-content-end position-relative"
    >
      <div
        class="mr-auto d-flex align-items-end flex-column bd-highlight mb-3 position-absolute"
      >
        <div class="mb-2">
          <span :class="totalColor"><Currency :amount="cartTotal" /></span>
          <button
            @click="showCart"
            v-if="cart.length"
            class="btn btn-sm ml-3"
            :class="cardBtn"
            id="cartDropdown"
          >
            <fa icon="shopping-cart"></fa>
            {{ cartQty }}
          </button>
        </div>
        <CartDropdown
          :cart="cart"
          :cart-is-visible="cartIsVisible"
          @remove-item="removeItem"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import Currency from '@/components/Currency'
import CartDropdown from '@/components/CartDropdown'
import { useProductStore } from '@/stores/ProductStore'
import { storeToRefs } from 'pinia/dist/pinia'

export default {
  name: 'Navbar',
  props: {
    // cart: Array,
    // cartTotal: Number,
    // cartQty: Number
  },
  setup() {
    const { cartTotal, cart, cartQty } = storeToRefs(useProductStore())
    return { cartTotal, cart, cartQty }
  },
  emits: ['removeItem'],
  data() {
    return {
      totalColor: 'text-secondary',
      cartIsVisible: false,
      displayCart: false
    }
  },
  components: {
    CartDropdown,
    Currency
  },
  methods: {
    showCart() {
      this.cartIsVisible = !this.cartIsVisible
    },
    removeItem(item) {
      this.$emit('removeItem', item)
    }
  },
  computed: {
    cardBtn() {
      return {
        'btn-secondary': this.cartTotal <= 100,
        'btn-success': this.cartTotal > 100,
        'btn-danger': this.cartTotal > 200
      }
    }
  }
}
</script>
