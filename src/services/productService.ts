import { NewProduct, Product, ProductUpdate } from '../types'
import productData from './products.json'

const productsMap: Map<number, Product> = new Map()
const initialProducts: Product[] = productData as Product[]
initialProducts.forEach(p => productsMap.set(p.id, p))

export const getProduct = (): Product[] => Array.from(productsMap.values())

export const findById = (id: number): Product | undefined => {
  return productsMap.get(id)
}

export const addProduct = (newProduct: NewProduct): Product => {
  const id = Math.max(...getProduct().map(p => p.id)) + 1
  const createDate = new Date().toISOString()
  const product: Product = {
    id,
    ...newProduct,
    createDate
  }

  productsMap.set(product.id, product)
  return product
}

export const updateProduct = (id: number, productUpdate: ProductUpdate): Product => {
  const existingProduct = findById(id)
  if (existingProduct === undefined) {
    throw new Error('product to update does not exists')
  }

  if (productUpdate.imageUrl !== undefined) existingProduct.imageUrl = productUpdate.imageUrl
  if (productUpdate.product !== undefined) existingProduct.product = productUpdate.product
  if (productUpdate.price !== undefined) existingProduct.price = productUpdate.price
  if (productUpdate.category !== undefined) existingProduct.category = productUpdate.category
  if (productUpdate.type !== undefined) existingProduct.type = productUpdate.type

  productsMap.set(id, existingProduct) // not really required, but just to demostrate updating an element in a map

  return existingProduct
}

export const deleteProduct = (id: number): void => {
  if (!productsMap.has(id)) {
    throw new Error('product to delete does not exists')
  }
  productsMap.delete(id)
}
