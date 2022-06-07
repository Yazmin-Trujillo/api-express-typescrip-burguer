/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { controller } from '../controllers/products'

const router = express.Router()

router.get('/', controller.products)

router.get('/:id', controller.product)

router.post('/', controller.createProdutc)

router.put('/', controller.createProdutc)

router.patch('/:id', controller.updateProduct)

router.delete('/:id', controller.deleteProduct)

export default router
