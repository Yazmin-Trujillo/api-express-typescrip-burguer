import { Category, Type } from './enum'

export interface ProductEntry {
  id: number
  imageUrl: string
  product: string
  price: number
  category: Category
  type: Type
  creation_date: string
}

export type NewProductEntry = Omit<ProductEntry, 'id'>
