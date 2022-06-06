import { productRepository } from '../repositores/mongoProductRepository'
import { NewProduct, Product, ProductUpdate } from '../types'

export const getProducts = async (): Promise<Product[]> => await productRepository.readAll()

export const findById = async (id: number): Promise < Product | undefined> => await productRepository.read(id)

export const addProduct = async (newProduct: NewProduct): Promise<Product> => {
  const products = await getProducts()
  const id = Math.max(...products.map(p => p.id)) + 1
  const createDate = new Date()
  const product: Product = {
    id,
    ...newProduct,
    createDate
  }

  return await productRepository.create(product)
}

export const updateProduct = async (id: number, productUpdate: ProductUpdate): Promise<Product> => {
//   const existingProduct = await findById(id)
//   if (existingProduct === undefined) {
//     throw new Error('product to update does not exists')
//   }

  //   if (productUpdate.imageUrl !== undefined) existingProduct.imageUrl = productUpdate.imageUrl
  //   if (productUpdate.name !== undefined) existingProduct.name = productUpdate.name
  //   if (productUpdate.price !== undefined) existingProduct.price = productUpdate.price
  //   if (productUpdate.category !== undefined) existingProduct.category = productUpdate.category
  //   if (productUpdate.type !== undefined) existingProduct.type = productUpdate.type

  return await productRepository.updateSave(id, productUpdate)
}

export const deleteProduct = async (id: number): Promise<void> => await productRepository.delete(id)
