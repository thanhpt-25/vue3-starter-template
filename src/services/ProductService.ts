import type { ProductEntity } from '@/entities/ProductEntity'
import ProductRepository from '@/repositories/ProductRepository'
import GetAllProductRequest from '@/requests/GetAllProductRequest'
class ProductService {
  private readonly repository: ProductRepository
  constructor() {
    this.repository = new ProductRepository()
  }
  async getAllProducts(request?: GetAllProductRequest): Promise<ProductEntity[]> {
    return await this.repository.getAllProducts(request)
  }
}
export default ProductService
