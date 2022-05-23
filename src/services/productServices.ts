import { NewProductEntry, ProductEntry } from '../types'
import productData from './products.json'

const products: ProductEntry[] = productData as ProductEntry[]

export const getEntries = (): ProductEntry[] => products

export const findById = (id: number): ProductEntry | undefined => {
  const entry = products.find(p => p.id === id)
  return entry
}

export const addProduct = (newProductEntry: NewProductEntry): ProductEntry => {
  const newProduct = {
    id: Math.max(...products.map(p => p.id)) + 1,
    ...newProductEntry
  }

  products.push(newProduct)
  return newProduct
}
