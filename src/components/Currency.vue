<template>
  <strong>{{ getLocalePrice(amount, options) }}</strong>
</template>

<script>
export default {
  name: 'Currency',
  props: ['amount', 'options'],
  methods: {
    getLocalePrice(value, { locale = 'es-ES', currency = 'EUR' } = {}) {
      // `$${Number.parseFloat(value).toFixed(2)}`
      const numberFormat = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      })
      return numberFormat.format(value)
    }
  }
}
</script>
