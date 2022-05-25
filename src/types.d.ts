import { Category, Type } from './enum'

export interface Product {
  id: number
  imageUrl: string
  product: string
  price: number
  category: Category
  type: Type
  createDate: string
}

export interface NewProduct {
  imageUrl: string
  product: string
  price: number
  category: Category
  type: Type
}

// export type NewProduct = Omit<Product, 'id', 'createDate'>

export interface ProductUpdate {
  imageUrl: string | undefined
  product: string | undefined
  price: number | undefined
  category: Category | undefined
  type: Type | undefined
}
