import mongoose, { model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject_id
    delete returnedObject._id
    delete returnedObject._v

    delete returnedObject.passwordHash
  }
})

export const User = model('User', userSchema)
