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
   *     "name": "eventname",
   *     "desc": "eventdesc",
   *     "cover": "eventcover"
   *   }
   * }
   */
  if (!body.secret || !body.event || !body.event.name || !body.event.desc || !body.event.cover) {
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

router.post('/', async (req, res) => {
  const {body} = req

  const id = Math.random()
    .toString(36)
    .substring(2)

  const payload = {
    id: id,
    eventName: body.event.namem,
    eventDesc: body.event.desc,
    eventCover: body.event.cover,
    isOpen: false,
  }

  try {
    await Event.create(payload)
    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'record created',
        data: {
          id: id,
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
