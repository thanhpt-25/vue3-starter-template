import type { ProductEntity } from '@/entities/ProductEntity'
import ProductRepository from '@/repositories/ProductRepository'
import type GetProductByIdRequest from '@/requests/GetProductByIdRequest'
class ProductService {
  private readonly repository: ProductRepository
  constructor() {
    this.repository = new ProductRepository()
  }
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.repository.getAllProducts()
  }
  async getProductById(request: GetProductByIdRequest): Promise<ProductEntity> {
    const productId: number = request.id
    return await this.repository.findOne(productId)
  }
}
export default ProductService
