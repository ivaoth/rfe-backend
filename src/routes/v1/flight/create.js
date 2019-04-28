import express from 'express'
import dotenv from 'dotenv'

import Event from '../../../models/event'
import Flight from '../../../models/flight'

dotenv.config()
const {SECRET} = process.env

const router = express.Router()

router.post('/', (req, res, next) => {
  const {body} = req

  /**
   * Example:
   * {
   *   "secret": "somesecret",
   *   "event": "eventid"
   *   "flight": {
   *     "name": "FD123",
   *     "type": "A320",
   *     "airport": {
   *       "departure": "VTBD",
   *       "arrival": "VTSG"
   *     },
   *     "time": {
   *       "departure": "10:00"
   *     }
   *   }
   * }
   */

   if (!body.secret || !body.event || !body.flight || !body.flight.name || !body.flight.type || !body.flight.airport || !body.flight.airport.departure || !body.flight.airport.arrival || !body.flight.time || !body.flight.time.departure) {
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

  const event = await Event.findAll({where: {id: body.event}})

  if (event.length === 0) {
    return res.status(404).send({
      status: 'failure',
      code: 704,
      response: {
        message: 'event not found',
      },
    })
  } else {
    next()
  }
})

router.post('/', (req, res) => {
  const {body} = req

  const id = Math.random()
    .toString(36)
    .substring(2)

  const payload = {
    id: id,
    event: body.event,
    flightName: body.flight.name,
    flightType: body.flight.type,
    flightAirpotDep: body.flight.airport.departure,
    flightAirportArr: body.flight.airport.arrival,
    flightTimeDep: body.flight.time.departure,
    reserver: null
  }

  try {
    await Flight.create(payload)
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
