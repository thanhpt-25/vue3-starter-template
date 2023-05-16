<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineComponent } from 'vue'
import ProductService from "@/services/ProductService"
import type {ProductEntity} from "@/entities/ProductEntity";
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
    const products = await service.getAllProducts() as ProductEntity[]
    console.log(products[0])
    /**
     * This is end of code for test
     */
    return products
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
