import { NewProductEntry } from './types'
import { Category, Type } from './enum'

const parseImageUrl = (imageUrlFromRequest: any): string => {
  if (!isString(imageUrlFromRequest)) {
    throw new Error('Incorrect or missing Image Url')
  }
  return imageUrlFromRequest
}

const parseProduct = (productFromRequest: any): string => {
  if (!isString(productFromRequest)) {
    throw new Error('Incorrect or missing Product')
  }
  return productFromRequest
}

const parsePrice = (priceFromRequest: any): number => {
  if (!isNumber(priceFromRequest)) {
    throw new Error('Incorrect or missing Price')
  }
  return priceFromRequest
}

const parseCategory = (categoryFromRequest: any): Category => {
  if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest)) {
    throw new Error('Incorrect or missing Category')
  }
  return categoryFromRequest
}

const parseType = (typeFromRequest: any): Type => {
  if (!isString(typeFromRequest) || !isType(typeFromRequest)) {
    throw new Error('Incorrect or missing Type')
  }
  return typeFromRequest
}

const parseCreationDate = (creationDateFromRequest: any): string => {
  if (!isString(creationDateFromRequest)) {
    throw new Error('Incorrect or missing Creation Date')
  }
  return creationDateFromRequest
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

const toNewProductEntry = (object: any): NewProductEntry => {
  const newEntry: NewProductEntry = {
    imageUrl: parseImageUrl(object.imageUrl),
    product: parseProduct(object.product),
    price: parsePrice(object.price),
    category: parseCategory(object.category),
    type: parseType(object.type),
    creation_date: parseCreationDate(object.creation_date)
  }
  return newEntry
}

export default toNewProductEntry
