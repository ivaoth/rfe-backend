import express from 'express'
import dotenv from 'dotenv'

import Event from '../../../models/event'

dotenv.config()
const {SECRET} = process.env

const router = express.Router()

router.post('/', (req, res, next) => {
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

router.post('/', (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  const {body} = req

  const event = await Event.findOne({where: {eventID: body.event.id}})

  if (event === null) {
    return res.status(404).send({
      status: 'failure',
      code: 704,
      response: {
        message: 'event not found',
      },
    })
  } else {
    req.rfeEvent = event
    next()
  }
})

router.post('/', async (req, res) => {
  const {body, rfeEvent} = req

  try {
    const newState = !rfeEvent.isOpen
    await Event.update({isOpen: newState}, {where: {eventID: body.event.id}})

    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'event status toggled',
        data: {
          event: {
            isOpen: newState,
          },
        },
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
