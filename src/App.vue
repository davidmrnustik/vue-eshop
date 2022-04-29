<template>
  <Navbar @remove-item="removeItem" />
  <div class="container">
    <router-view @remove-item="removeItem" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { useProductStore } from '@/stores/ProductStore'
import { mapWritableState } from 'pinia'

const URL = 'https://hplussport.com/api/products/order/price'

export default {
  data() {
    return {
      cart: [],
      products: []
    }
  },
  components: {
    Navbar
  },
  created() {
    // beforeCreate() could be used as well
    fetch(URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => (res.ok ? res.json() : new Error('Something went wrong.')))
      .then(data => {
        this.productStore.setProducts(data)
        this.products = this.productStore.products
      })
      .catch(error => {
        console.log(error)
        new Error('Something went wrong: ', error)
      })
  },
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  methods: {
    // addItem(product) {
    //   let whichProduct
    //   let existingProduct = this.cart.filter((item, index) => {
    //     if (Number(item.product.id) === Number(product.id)) {
    //       whichProduct = index
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    //   if (existingProduct.length) {
    //     this.cart[whichProduct].qty++
    //   } else {
    //     this.cart.push({ product, qty: 1 })
    //   }
    // },
    removeItem(id) {
      if (this.cart[id].qty > 1) {
        this.cart[id].qty--
      } else {
        this.cart.splice(id, 1)
      }
    }
  },
  computed: {
    cartTotal_old() {
      return this.cart.reduce((acc, cur) => (acc += Number(cur.price)), 0)
    }
    // cartTotal() {
    //   return this.cart.reduce((acc, cur) => {
    //     acc += cur.product.price * cur.qty
    //     return acc
    //   }, 0)
    // },
    // cartQty() {
    //   return this.cart.reduce((acc, cur) => {
    //     acc += cur.qty
    //     return acc
    //   }, 0)
    // }
    // ...mapWritableState(useProductStore, ['products'])
  }
}
</script>
<style lang="scss">
$primary: #6f42c1;
@import 'node_modules/bootstrap/scss/bootstrap';
</style>
