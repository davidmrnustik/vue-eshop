<template>
  <Navbar @remove-item="removeItem" />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { useProductStore } from '@/stores/ProductStore'
import { mapState, mapWritableState } from 'pinia'

const URL = 'https://hplussport.com/api/products/order/price'

export default {
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
      .then(this.setProducts)
      .catch(error => {
        console.log(error)
        new Error('Something went wrong: ', error)
      })
  },
  computed: {
    ...mapState(useProductStore, ['products']),
    ...mapWritableState(useProductStore, ['removeItem', 'setProducts'])
  }
}
</script>
<style lang="scss">
$primary: #6f42c1;
@import 'node_modules/bootstrap/scss/bootstrap';
</style>
