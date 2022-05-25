import { Product } from '../types'
import productData from './products.json'

const db: Map<number, Product> = new Map()
const initialProducts: Product[] = productData as Product[]
initialProducts.forEach(p => db.set(p.id, p))

export const productRepository = {
  create: (product: Product): Product => {
    db.set(product.id, product)
    return product
  },
  readAll: (): Product[] => Array.from(db.values()),
  read: (id: number): Product | undefined => db.get(id),
  update: (product: Product): Product => {
    validateExists(product.id)
    db.set(product.id, product)
    return product
  },
  delete: (id: number): void => {
    validateExists(id)
    db.delete(id)
  }
}

function validateExists (id: number): void {
  if (!db.has(id)) {
    throw new Error(`no product with id=${id}`)
  }
}
