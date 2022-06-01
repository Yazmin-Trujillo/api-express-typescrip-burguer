import { Category, Type } from './enum'

export interface Product {
  id: number
  imageUrl: string
  name: string
  price: number
  category: Category
  type: Type
  createDate: Date
}

export interface NewProduct {
  imageUrl: string
  name: string
  price: number
  category: Category
  type: Type
}

// export type NewProduct = Omit<Product, 'id', 'createDate'>

export interface ProductUpdate {
  imageUrl: string | undefined
  name: string | undefined
  price: number | undefined
  category: Category | undefined
  type: Type | undefined
}
