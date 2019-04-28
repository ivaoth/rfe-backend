import express from 'express'
import dotenv from 'dotenv'

import Event from '../../../models/event'

dotenv.config()
const {SECRET} = process.env

const router = express.Router()

router.delete('/', (req, res, next) => {
  const {body} = req

  /**
   * Example:
   * {
   *   "secret": "somesecret",
   *   "event": {
   *     "id": "someid"
   *   }
   * }
   */
  if (!body.secret || !body.event || !body.event.id) {
    return res.status(400).send({
      status: 'failure',
      code: 702,
      response: {
        message: 'provided data is not enough',
      },
    })
  } else {
    next()
  }
})

router.delete('/', (req, res, next) => {
  const {body} = req

  if (body.secret !== SECRET) {
    return res.status(401).send({
      status: 'failure',
      code: 707,
      response: {
        message: 'insufficient permission',
      },
    })
  } else {
    next()
  }
})

router.delete('/', async (req, res) => {
  const {body} = req

  try {
    await Event.destroy({
      where: {
        eventID: body.event.id,
      },
    })

    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'record deleted',
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

router.all('/', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
