
import { model, Model, Schema, Document } from 'mongoose'
import { Product, ProductUpdate } from '../types'
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

export const productRepository = {
  create: async (product: Product): Promise<Product> => {
    let mongoProduct = new MongoProductModel({
      _id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      category: product.category.toString(),
      type: product.type.toString(),
      createDate: product.createDate
    })
    mongoProduct = await mongoProduct.save()
    return toProduct(mongoProduct)
    // const res = await MongoProductModel.create({
    //   _id: product.id,
    //   imageUrl: product.imageUrl,
    //   name: product.name,
    //   price: product.price,
    //   category: product.category.toString(),
    //   type: product.type.toString(),
    //   createDate: product.createDate
    // })

    // return toProduct(res)
  },

  read: async (id: number): Promise<Product | undefined> => {
    const res = await MongoProductModel.findOne({ _id: id })
    if (res === null) {
      return undefined
    }

    return toProduct(res)
  },

  readAll: async (): Promise<Product[]> => {
    const res = await MongoProductModel.find({})

    // return res.map(toProduct)
    return res.map(mongoProduct => toProduct(mongoProduct))
  },
  // Método uno para actualizar

  // update: async (product: Product): Promise<Product> => {
  //   await MongoProductModel.replaceOne({ _id: product.id }, {
  //     imageUrl: product.imageUrl,
  //     name: product.name,
  //     price: product.price,
  //     category: product.category.toString(),
  //     type: product.type.toString(),
  //     createDate: product.createDate
  //   })
  //   return product
  // },

  // Método dos para actualizar

  // update: async (id: number, update: ProductUpdate): Promise<void> => {
  //   const fields: any = {}
  //   if (update.name !== undefined) fields.name = update.name
  //   if (update.imageUrl !== undefined) fields.imageUrl = update.imageUrl
  //   if (update.price !== undefined) fields.price = update.price
  //   if (update.category !== undefined) fields.category = update.category.toString()
  //   if (update.type !== undefined) fields.type = update.type.toString()

  //   const updateRes = await MongoProductModel.updateOne({ _id: id }, { $set: fields })
  //   if (updateRes.matchedCount === 0) {
  //     throw new Error(`no update completed for id=${id}`)
  //   }
  // },

  // Método tres para actualizar
  updateSave: async (id: number, update: ProductUpdate): Promise<Product> => {
    let mongoProduct = await MongoProductModel.findById(id)
    if (mongoProduct === null) {
      throw new Error(`no update completed for id=${id}`)
    }

    if (update.name !== undefined) mongoProduct.name = update.name
    if (update.imageUrl !== undefined) mongoProduct.imageUrl = update.imageUrl
    if (update.price !== undefined) mongoProduct.price = update.price
    if (update.category !== undefined) mongoProduct.category = update.category.toString()
    if (update.type !== undefined) mongoProduct.type = update.type.toString()

    mongoProduct = await mongoProduct.save()

    return toProduct(mongoProduct)
  },

  delete: async (id: number): Promise<void> => {
    const res = await MongoProductModel.deleteOne({ _id: id })
    if (res.deletedCount === 0) {
      throw new Error(`no delete completed for id=${id}`)
    }
  }
}
