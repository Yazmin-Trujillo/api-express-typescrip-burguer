/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import { sign, decode } from 'jsonwebtoken'

const router = express.Router()
const secret = 'my secret that needs to be move'

router.post('/', (req, res) => {
  const { email, password } = req.body

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!email || !password) {
    res.status(400).send()
  }

  // TODO: autenticar a la usuarix, algo como:
  // const user = userService.findUser(email);
  // if (user === undefined) { // si usuario no existe
  //   res.status(401)
  // } else if (!descrypt.validates(user.password, password){ //si la contraseña no corresponde
  //   res.status(401);
  // }

  const roles = ['READ_ONLY', 'DELIVER_ORDERS'] // sería user.roles o de donde vengan los accesos de usuario
  const tokenData = { roles }
  const token = sign(tokenData, secret)
  res.json({ token })
})

router.get('/admin', (req, res) => {
  const { authorization } = req.headers
  if (!authorization) {
    // no hay header authorizaton, usuario no puede seguir
    res.status(401).send()
    return
  }
  const parts = authorization.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    // patrón de authorization es invalido, tiene que ser dos partes y la primera ser Bearer
    res.status(401).send()
    return
  }

  const token = parts[1]
  const payload = decode(token)
  if (!payload) {
    // el token no tiene payload, y debería pues cuando se genera se le agrega los roles
    res.status(401).send()
    return
  }

  const { roles } = payload as any
  if (!roles.includes('ADMIN')) {
    // roles del token no aceptados
    res.status(403).send()
    return
  }

  res.status(200).send({ accepted: true })
})

export default router
