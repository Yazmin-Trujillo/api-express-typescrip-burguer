import { productRepository } from '../repositores/inMemoryProductRepository'
import { NewProduct, Product, ProductUpdate } from '../types'

export const getProduct = (): Product[] => productRepository.readAll()

export const findById = (id: number): Product | undefined => productRepository.read(id)

export const addProduct = (newProduct: NewProduct): Product => {
  const id = Math.max(...getProduct().map(p => p.id)) + 1
  const createDate = new Date().toISOString()
  const product: Product = {
    id,
    ...newProduct,
    createDate
  }

  return productRepository.create(product)
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

  return productRepository.update(existingProduct)
}

export const deleteProduct = (id: number): void => {
  productRepository.delete(id)
}
