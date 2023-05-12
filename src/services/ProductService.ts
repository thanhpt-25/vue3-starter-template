import type { AxiosResponse } from "axios";
import type { ProductEntity } from "@/entities/ProductEntity";
import ProductRepository from "@/repositories/ProductRepository";

class ProductService {
  private readonly repository  : ProductRepository
  constructor() {
      this.repository = new ProductRepository();
  }
  public getProductById(id:number):Promise<AxiosResponse<ProductEntity>> {
      return this.repository.get(id);
  }
}
export default ProductService