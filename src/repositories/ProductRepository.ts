import {BaseRepository} from "@/repositories/BaseRepository";
import type { ProductEntity } from "@/entities/ProductEntity";
class ProductRepository extends BaseRepository<ProductEntity>{
    private static readonly resource = "product"
    constructor() {
        super(ProductRepository.resource);
    }
}

export default ProductRepository