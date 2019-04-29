import express from 'express'

import IVAOToken from '../../../services/token'

const router = express.Router()

router.get('/:token', async (req, res) => {
  const {token} = req.params

  const fetchToken = await IVAOToken(token)

  return res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        token: fetchToken,
      },
    },
  })
})

router.all('/:token', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
