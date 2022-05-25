import express from 'express'
import * as productService from '../services/productService'
import getErrorMessage from '../utilError'
import toNewProduct, { toProductUpdate } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(productService.getProduct())
})

router.get('/:id', (req, res) => {
  const id = +req.params.id

  const product = productService.findById(id)

  return (product != null)
    ? res.send(product)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newProduct = toNewProduct(req.body)

    const addedProduct = productService.addProduct(newProduct)

    res.json(addedProduct)
  } catch (e) {
    res.status(400).send(getErrorMessage(e))
  }
})

router.put('/', (req, res) => {
  try {
    const newProduct = toNewProduct(req.body)

    const addedProduct = productService.addProduct(newProduct)

    res.json(addedProduct)
  } catch (e) {
    res.status(400).send(getErrorMessage(e))
  }
})

router.patch('/:id', (req, res) => {
  try {
    const id = +req.params.id
    const productUpdate = toProductUpdate(req.body)

    const product = productService.updateProduct(id, productUpdate)

    res.json(product)
  } catch (e) {
    res.status(400).send(getErrorMessage(e))
  }
})

router.delete('/:id', (req, res) => {
  try {
    const id = +req.params.id

    productService.deleteProduct(id)

    res.status(200).end()
  } catch (e) {
    res.status(400).send(getErrorMessage(e))
  }
})

export default router
