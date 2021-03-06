import { NewProduct, ProductUpdate } from './types'
import { Category, Type } from './enum'

const parseImageUrl = (imageUrlFromRequest: any): string => {
  if (!isString(imageUrlFromRequest)) {
    throw new Error('Incorrect or missing Image Url')
  }
  return imageUrlFromRequest
}

const parseName = (productFromRequest: any): string => {
  if (!isString(productFromRequest)) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing Product, value=' + productFromRequest)
  }
  return productFromRequest
}

const parsePrice = (priceFromRequest: any): number => {
  if (!isNumber(priceFromRequest)) {
    throw new Error('Incorrect or missing Price')
  }
  return priceFromRequest
}

export const parseCategory = (categoryFromRequest: any): Category => {
  if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest)) {
    throw new Error('Incorrect or missing Category')
  }
  return categoryFromRequest
}

export const parseType = (typeFromRequest: any): Type => {
  if (!isString(typeFromRequest) || !isType(typeFromRequest)) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing type=' + typeFromRequest)
  }
  return typeFromRequest
}

const isCategory = (params: any): boolean => {
  return Object.values(Category).includes(params)
}

const isType = (params: any): boolean => {
  return Object.values(Type).includes(params)
}

const isString = (string: string): boolean => {
  // if (typeof string === 'string' || string instanceof String){}
  return typeof string === 'string'
}

const isNumber = (number: number): boolean => {
  return typeof number === 'number'
}

const toNewProductEntry = (object: any): NewProduct => {
  const newEntry: NewProduct = {
    imageUrl: parseImageUrl(object.imageUrl),
    name: parseName(object.name),
    price: parsePrice(object.price),
    category: parseCategory(object.category),
    type: parseType(object.type)
  }
  return newEntry
}

export default toNewProductEntry

export const toProductUpdate = (object: any): ProductUpdate => {
  const update: ProductUpdate = {
    imageUrl: isString(object.imageUrl) ? parseImageUrl(object.imageUrl) : undefined,
    name: isString(object.name) ? parseName(object.name) : undefined,
    price: isNumber(object.price) ? parsePrice(object.price) : undefined,
    category: isString(object.category) ? parseCategory(object.category) : undefined,
    type: isString(object.type) ? parseType(object.type) : undefined
  }
  return update
}
