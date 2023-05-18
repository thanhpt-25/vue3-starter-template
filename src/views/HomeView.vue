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
        const data = {id:28} as Partial<GetProductByIdRequest>
        const request = new GetProductByIdRequest(data)
        const product = (await service.getProductById(request.validated()))
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
