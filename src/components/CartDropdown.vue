<template>
  <div class="dropdown-clip" v-if="cart.length > 0">
    <transition name="dropdown" @enter="priceColor" @leave="resetPriceColor">
      <div
        v-if="cartIsVisible"
        class="list-group bg-white"
        aria-labelledby="cartDropdown"
      >
        <div v-for="(item, index) in cart" :key="index">
          <div
            class="dropdown-item-text text-nowrap text-right align-middle"
            style="text-align: right"
          >
            <span class="badge bg-success align-text-top mr-1">{{
              item.qty
            }}</span>
            {{ item.product.name }}
            <strong>
              <Currency :amount="item.qty * Number(item.product.price)" />
            </strong>
            <button
              @click.stop="$emit('removeItem', index)"
              class="btn btn-sm btn-danger ml-2"
            >
              -
            </button>
          </div>
        </div>
        <router-link
          to="/checkout"
          class="btn btn-sm btn-success text-white float-right mr-2 mt-2"
          >checkout
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import Currency from '@/components/Currency'

export default {
  name: 'CartDropdown',
  props: ['cart', 'cartIsVisible'],
  emits: ['removeItem'],
  components: {
    Currency
  },
  methods: {
    priceColor() {
      this.totalColor = 'text-danger'
    },
    resetPriceColor() {
      this.totalColor = 'text-secondary'
    }
  }
}
</script>

<style scoped>
.dropdown-clip {
  overflow: hidden;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.5s ease-in-out;
  transform: auto;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-300px);
}
</style>
