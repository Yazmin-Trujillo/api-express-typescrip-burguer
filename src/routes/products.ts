import express from 'express'
import * as productServices from '../services/productServices'
import getErrorMessage from '../utilError'
import toNewProductEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(productServices.getEntries())
})

router.get('/:id', (req, res) => {
  const product = productServices.findById(+req.params.id)

  return (product != null)
    ? res.send(product)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newProductEntry = toNewProductEntry(req.body)

    const addedProductEntry = productServices.addProduct(newProductEntry)

    res.json(addedProductEntry)
  } catch (e) {
    res.status(400).send(getErrorMessage(e))
  }
})

export default router
