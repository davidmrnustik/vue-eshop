<template>
  <label for="max-price" class="form-label"
    >Max Price (
    <Currency :amount="modelValue" />
    )</label
  >
  <span class="badge bg-success">results: {{ products.length }}</span>
  <input
    type="number"
    id="max-price"
    class="form-control"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    type="range"
    class="form-range"
    min="0"
    max="130"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
import Currency from '@/components/Currency'

export default {
  name: 'RangeSelector',
  props: ['modelValue', 'products'],
  components: {
    Currency
  }
}
</script>
