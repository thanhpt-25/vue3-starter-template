import {BaseRepository} from "@/repositories/BaseRepository";
import type { ProductEntity } from "@/entities/ProductEntity";
import { catchError, firstValueFrom } from 'rxjs';
import type { AxiosResponse, AxiosError } from "axios"
class ProductRepository extends BaseRepository{
    private static readonly url = "products"
    constructor() {
        super(ProductRepository.url);
    }
    async getAllProducts(): Promise<ProductEntity[]> {
        const {data}  = await firstValueFrom(this.get<ProductEntity[]>().pipe(
          catchError((error: AxiosError) => {
              console.log(error.response?.data);
              throw 'An error happened!';
          }),
        ))
        console.log(data)
        return data
    }
}
export default ProductRepository