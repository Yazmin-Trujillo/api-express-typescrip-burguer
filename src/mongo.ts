// import mongoose from 'mongoose'
import mongoPassword from './repositores/password'
import mongoose, { model, Model, Schema } from 'mongoose'

const encodedPassword = encodeURIComponent(mongoPassword)
const connectionString = `mongodb+srv://YazminTru88:${encodedPassword}@cluster0.bc8f3.mongodb.net/?retryWrites=true&w=majority`
console.log(connectionString)

// conexión a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

// create schema corresponding with model interface
const ProductSchema = new Schema({
  imageUrl: String,
  product: String,
  price: Number,
  category: String,
  type: String,
  createDate: Date
})

// create interface representing product data in mongo
interface IProduct {
  imageUrl: string
  product: string
  price: number
  category: string
  type: string
  createDate: Date
}

// creatae a new user model
const Product: Model<IProduct> = model('Product', ProductSchema)

// // create a new document
const product = new Product({
  imageUrl: '',
  product: 'Arroz con leche',
  price: 15,
  category: 'breakfast',
  type: 'drink',
  createDate: new Date()
})

product.save()
  .then((result) => {
    console.log('product sve result', result, typeof result)
    void mongoose.connection.close()
  })
  .catch((err: any) => {
    console.log(err)
  })
