
import { model, Model, Schema, Document } from 'mongoose'
import { Product } from '../types'
import { parseCategory, parseType } from '../utils'

// create schema corresponding with model interface
const ProductSchema = new Schema({
  _id: Number,
  imageUrl: String,
  name: String,
  price: Number,
  category: String,
  type: String,
  createDate: Date
})

// create interface representing product data in mongo
interface MongoProduct extends Document {
  _id: number
  imageUrl: string
  name: string
  price: number
  category: string
  type: string
  createDate: Date
}

// creatae a new user model
const MongoProductModel: Model<MongoProduct> = model('Product', ProductSchema)

export const productRepository = {
  create: async (product: Product): Promise<Product> => {
    const res = await MongoProductModel.create({
      _id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      category: product.category.toString(),
      type: product.type.toString(),
      createDate: product.createDate
    })

    return toProduct(res)
  },

  read: async (id: number): Promise<Product | undefined> => {
    const res = await MongoProductModel.findById(id)
    if (res === null) {
      return undefined
    }

    return toProduct(res)
  },

  readAll: async (): Promise<Product[]> => {
    const res = await MongoProductModel.find({})

    // return res.map(toProduct)
    return res.map(mongoProduct => toProduct(mongoProduct))
  }

}

const toProduct = (res: MongoProduct): Product => {
  return {
    id: res._id,
    imageUrl: res.imageUrl,
    name: res.name,
    price: res.price,
    category: parseCategory(res.category),
    type: parseType(res.type),
    createDate: res.createDate
  }
}
