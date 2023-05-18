<script lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineComponent } from 'vue'
import ProductService from '@/services/ProductService'
import GetProductByIdRequest from "@/requests/GetProductByIdRequest";
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
    try{
        const request = new GetProductByIdRequest({ id : 28 })
        const validatedRequest = request.validated() as GetProductByIdRequest
        const product = (await service.getProductById(validatedRequest))
        console.log(validatedRequest.id)
      console.log(product)
        return product
    }catch (e:Error){
      console.log(e.message)
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
