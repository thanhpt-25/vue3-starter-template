<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineComponent } from 'vue'
import ProductService from "@/services/ProductService"
export default defineComponent({
  name: 'HomeView',
  components: {
    TheWelcome
  },
  async mounted() {
    /**
     * This is begin of code for test
     */
    const service =  new ProductService()
    const product = await service.getProductById(2)
    console.log(product)
    /**
     * This is end of code for test
     */
    return product
  },
  setup(){

  }
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
