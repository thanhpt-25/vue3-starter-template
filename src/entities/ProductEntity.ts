interface ProductEntity {
  id: number,
  title: string,
  price : number,
  images: string[],
  description : string,
  category: object[],
  creationAt: Date,
  updatedAt: Date
}
export type { ProductEntity }