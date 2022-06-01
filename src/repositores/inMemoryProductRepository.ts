import { Product } from '../types'
import { parseCategory, parseType } from '../utils'
import productData from './products.json'

const db: Map<number, Product> = new Map()
const initialProducts: Product[] = productData.map((p) => {
  const product: Product = {
    id: p.id,
    imageUrl: p.imageUrl,
    name: p.product,
    price: p.price,
    category: parseCategory(p.category),
    type: parseType(p.type),
    createDate: new Date(p.createDate)
  }
  return product
})

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
