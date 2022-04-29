<template>
  <div class="text-center">
    <button class="btn btn-success" @click="showMe = !showMe">
      Try Animation
    </button>
    <transition name="animate-me">
      <h2 v-if="showMe">Animate Me</h2>
    </transition>
  </div>
  <div class="text-center">
    <button class="btn" :class="btnColor" @click="showMe2 = !showMe2">
      Try Animation 2
    </button>
    <transition
      enter-active-class="animate__animated animate__flipInY"
      leave-active-class="animate__animated animate__rotateOut"
      @enter="transitionColor"
      @enter-cancelled="successColor"
      @after-enter="successColor"
      @leave="transitionColor"
      @after-leave="resetColor"
    >
      <h2 v-if="showMe2">Animate Me</h2>
    </transition>
  </div>

  <section class="container">
    <RangeSelector v-model="max" :products="filteredProducts" />

    {{ myAlert }}

    <CustomAlert
      type="danger"
      close="true"
      v-if="cartTotal > 100"
    ></CustomAlert>
    <!--    <div id="maxHelp" class="form-text">Set the maximum price to: {{ max }}</div>-->
    <div class="form-check">
      <input
        v-model="displayLabels"
        class="form-check-input"
        type="checkbox"
        id="showLabels"
      />
      <label class="form-check-label" for="showLabels">
        <span class="badge bg-dark">show labels</span>
      </label>
    </div>

    <ProductList
      :products="filteredProducts"
      :displayLabels="displayLabels"
      @add-item="addItemToCart"
    />
  </section>
  <!--    <p><strong>Random: </strong> {{ (this.rand=10) && (rand)}}</p>-->
</template>

<script>
import CustomAlert from '@/components/CustomAlert'
import ProductList from '@/components/ProductList'
import RangeSelector from '@/components/RangeSelector'
import { useProductStore } from '@/stores/ProductStore'
import { mapActions, mapState } from 'pinia/dist/pinia'

export default {
  name: 'HomeView',
  props: {
    cart: Array,
    cartTotal: Number
  },
  // setup(__props, { emit }) {
  //   const addItem = event => {
  //     emit('addItem', event)
  //   }
  //   return { addItem }
  // },
  emits: ['removeItem'],
  data() {
    return {
      name: 'Eshop App',
      maxPrice: 100,
      max: 5,
      displayLabels: true,
      howBig: 10,
      myAlert: '',
      styles: {
        salesBtn: 'btn-secondary'
      },
      showMe: false,
      showMe2: false,
      btnColor: 'btn-success'
    }
  },
  components: {
    ProductList,
    RangeSelector,
    CustomAlert
  },
  methods: {
    transitionColor(el) {
      this.btnColor = 'btn-warning'
      console.log(el)
    },
    activeColor() {
      this.btnColor = 'btn-secondary'
    },
    successColor() {
      this.btnColor = 'btn-success'
    },
    resetColor() {
      this.btnColor = 'btn-secondary'
    }
    // addItem(product) {
    // this.$emit('addItem', product)
    // }
  },
  computed: {
    results() {
      return this.products.length
    },
    rand: {
      get() {
        return Math.floor(Math.random() * this.howBig)
      },
      set(myNumber) {
        this.howBig = myNumber
      }
    },
    filteredProducts() {
      return this.products.filter(i => Number(i.price) < Number(this.max))
    },
    ...mapState(useProductStore, ['products']),
    ...mapActions(useProductStore, ['addItemToCart'])
  },
  watch: {
    max(myValue) {
      // this.products = this.products.filter(i => Number(i.price) <= myValue);
    }
  }
}
</script>
