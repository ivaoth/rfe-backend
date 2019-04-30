import express from 'express'
import dotenv from 'dotenv'

import Route from '../../../models/route'

dotenv.config()
const {SECRET} = process.env

const router = express.Router()

router.post('/', (req, res, next) => {
  const {body} = req

  /**
   * Example:
   * {
   *   "secret": "somesecret",
   *   "airport": {
   *     "departure": "VTBD",
   *     "arrival": "VTSG"
   *   },
   *   "route": "verylongroute"
   * }
   */

  if (!body.secret || !body.airport || !body.airport.departure || !body.airport.arrival || !body.route) {
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
    airportDep: body.flight.name,
    airportArr: body.flight.type,
    route: body.route,
  }

  try {
    await Route.create(payload)
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
