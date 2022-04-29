import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia/dist/pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const pinia = createPinia()

library.add(faShoppingCart)

createApp(App)
  .use(router)
  .use(pinia)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
