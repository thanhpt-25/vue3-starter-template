import { BaseRepository } from '@/repositories/BaseRepository'
import type { ProductEntity } from '@/entities/ProductEntity'
import { catchError, firstValueFrom } from 'rxjs'
import type { AxiosError } from 'axios'
class ProductRepository extends BaseRepository {
  private static readonly url = 'products'
  async getAllProducts(): Promise<ProductEntity[]> {
    const { data } = await firstValueFrom(
      this.get<ProductEntity[]>(ProductRepository.url).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response?.data)
          throw 'An error happened!'
        })
      )
    )
    return data
  }
  async findOne(id:number):Promise<ProductEntity>{
    const url = `${ProductRepository.url}/${id}`
    const { data } = await firstValueFrom(
      this.get<ProductEntity>(url).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!'
        })
      )
    )
    return data
  }
}
export default ProductRepository
