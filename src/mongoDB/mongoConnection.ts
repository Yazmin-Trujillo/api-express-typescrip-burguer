import mongoose from 'mongoose'
import password from './password'

const encodedPassword = encodeURIComponent(password)
const connectionString = `mongodb+srv://YazminTru88:${encodedPassword}@cluster0.bc8f3.mongodb.net/?retryWrites=true&w=majority`

export async function openConnection (): Promise<void> {
  await mongoose.connect(connectionString)
  console.log('Database connected')
}

export async function closeConnection (): Promise<void> {
  await mongoose.connection.close()
  console.log('Database disconnected')
}
