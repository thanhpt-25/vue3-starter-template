import type { ProductEntity } from "@/entities/ProductEntity";
import ProductRepository from "@/repositories/ProductRepository";
import type {AxiosResponse} from "axios";
class ProductService {
  private readonly repository  : ProductRepository
  constructor() {
      this.repository = new ProductRepository();
  }
  async getAllProducts():Promise<AxiosResponse<ProductEntity[]>> {
      return await this.repository.getAllProducts()
  }
}
export default ProductService