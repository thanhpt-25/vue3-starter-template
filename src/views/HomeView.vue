<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineComponent } from 'vue'
import ProductService from '@/services/ProductService'
import type { ProductEntity } from '@/entities/ProductEntity'
import GetAllProductRequest from '@/requests/GetAllProductRequest'
export default defineComponent({
  name: 'HomeView',
  components: {
    TheWelcome
  },
  async mounted() {
    /**
     * This is begin of code for test
     */
    const service = new ProductService()
    const request = new GetAllProductRequest()
    const result = request.validated()
    if (result) {
      const products = (await service.getAllProducts(request)) as ProductEntity[]
      console.log(products)
      return products
    } else {
      console.log('error')
    }
    /**
     * This is end of code for test
     */
  },
  setup() {}
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
