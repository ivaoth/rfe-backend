import express from 'express'
import dotenv from 'dotenv'

import Airline from '../../../models/airline'

dotenv.config()
const {SECRET} = process.env

const router = express.Router()

router.post('/', (req, res, next) => {
  const {body} = req

  /**
   * Example:
   * {
   *   "secret": "somesecret",
   *   "airline": {
   *     "code": "THA",
   *     "name": "Thai Airways"
   *   },
   * }
   */

  if (!body.secret || !body.airline || !body.airline.code || !body.airline.name) {
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

  const payload = {
    airlineCode: body.airline.code,
    airlineName: body.airline.name,
  }

  try {
    await Airline.create(payload)
    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'record created',
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
