import express from 'express'

import Airline from '../../../models/airline'

const router = express.Router()

router.get('/:code', async (req, res) => {
  const {code} = req.params

  try {
    const row = await Airline.findOne({where: {airlineCode: code}})

    const payload = {
      airline: {
        code: row.airlineCode,
        name: row.airlineName,
      },
    }

    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'data retrived',
        data: payload,
      },
    })
  } catch (err) {
    return res.status(400).send({
      status: 'failure',
      code: 701,
      response: {
        message: 'could not create record',
        data: err,
      },
    })
  }
})

router.all('/:code', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
