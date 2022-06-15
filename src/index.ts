import express from 'express'
import productRouter from './routes/products'
import authRouter from './routes/auth'
import { openConnection } from './mongoDB/mongoConnection'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(PORT, async () => {
  await openConnection()
  console.log(`Server running on port ${PORT}`)
})
