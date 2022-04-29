<template>
  <div
    class="alert"
    :class="[getAlert(type), close ? 'alert-dismissible' : '']"
    role="alert"
  >
    <slot>Congrats on getting some items in your cart!</slot>
    <button
      v-if="close"
      @click="closeButton"
      type="button"
      class="btn-close"
    ></button>
  </div>
</template>

<script>
export default {
  props: ['type', 'close'],
  methods: {
    getAlert(type) {
      return type ? `alert-${type}` : 'alert-secondary'
    },
    closeButton(event) {
      event.target.parentNode.remove()
    }
  }
}
</script>
