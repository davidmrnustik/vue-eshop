import { defineStore } from 'pinia/dist/pinia'

export const useProductStore = defineStore('ProductStore', {
  state: () => {
    return {
      products: [],
      cart: []
    }
  },
  actions: {
    setProducts(items) {
      this.products = items
    },
    addItemToCart(item) {
      let whichProduct
      let existingProduct = this.cart.filter((item, index) => {
        if (Number(item.product.id) === Number(item.id)) {
          whichProduct = index
          return true
        } else {
          return false
        }
      })
      if (existingProduct.length) {
        this.cart[whichProduct].qty++
      } else {
        this.cart.push({ product: item, qty: 1 })
      }
    }
  },
  getters: {
    cartTotal: state => {
      return state.cart.reduce((acc, cur) => {
        acc += cur.product.price * cur.qty
        return acc
      }, 0)
    },
    cartQty: state => {
      return state.cart.reduce((acc, cur) => {
        acc += cur.qty
        return acc
      }, 0)
    }
  }
})
