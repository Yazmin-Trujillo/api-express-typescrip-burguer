import * as productService from '../services/productService'
import getErrorMessage from '../utilError'
import toNewProductEntry, { toProductUpdate } from '../utils'

export const controller = {

  // manejo de promesas con async/await (try/catch)
  products: async (_req: any, res: any): Promise<void> => {
    try {
      const products = await productService.getProducts()
      res.send(products)
    } catch (_) {
      res.sendStatus(500)
    }
  },
  // manejo de promesas con then/catch
  // products: (_req, res) => {
  //   void productService.getProducts()
  //     .then(products => res.send(products))
  //     .catch(_ => res.sendStatus(500))
  // }

  product: async (req: any, res: any) => {
    const id = +req.params.id
    try {
      const product = await productService.findById(id)

      return (product != null)
        ? res.send(product)
        : res.sendStatus(404)
    } catch (_) {
      res.sendStatus(500)
    }
  },
  // manejo de promesas con then/catach
  // produt: (req, res) => {
  //   const id = +req.params.id
  //   void productService.findById(id)
  //     .then(product => {
  //       if (product !== null) {
  //         res.send(product)
  //       } else {
  //         res.sendStatus(404)
  //       }
  //     })
  //     .catch(_ => res.sendStatus(500))
  // }
  createProdutc: async (req: any, res: any) => {
    try {
      const newProduct = toNewProductEntry(req.body)

      const addedProduct = await productService.addProduct(newProduct)

      res.json(addedProduct)
      // res.send(addedProduct)
    } catch (e) {
      console.error(e)
      res.status(400).send(getErrorMessage(e))
    }
  },

  updateProduct: async (req: any, res: any) => {
    try {
      const id = +req.params.id
      const productUpdate = toProductUpdate(req.body)

      const product = await productService.updateProduct(id, productUpdate)

      res.json(product)
    } catch (e) {
      res.status(400).send(getErrorMessage(e))
    }
  },

  deleteProduct: async (req: any, res: any) => {
    try {
      const id = +req.params.id

      void productService.deleteProduct(id)

      res.status(200).end()
    } catch (e) {
      res.status(400).send(getErrorMessage(e))
    }
  }
}
