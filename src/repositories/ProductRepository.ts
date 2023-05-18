import { BaseRepository } from '@/repositories/BaseRepository'
import type { ProductEntity } from '@/entities/ProductEntity'
import { catchError, firstValueFrom } from 'rxjs'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import GetAllProductRequest from '@/requests/GetAllProductRequest'
class ProductRepository extends BaseRepository {
  private static readonly url = 'products'
  constructor() {
    super(ProductRepository.url)
  }
  async getAllProducts(request?: GetAllProductRequest): Promise<ProductEntity[]> {
    const config: AxiosRequestConfig = {
      data: request?.toObject()
    }
    const { data } = await firstValueFrom(
      this.get<ProductEntity[]>(config).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response?.data)
          throw 'An error happened!'
        })
      )
    )
    return data
  }
}
export default ProductRepository
