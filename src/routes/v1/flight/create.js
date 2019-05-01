import _ from 'lodash'
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
   *   "event": {
   *     "id": "eventid"
   *   },
   *   "flight": {
   *     "name": "TG123",
   *     "type": "dep",
   *     "aircraft": "A320",
   *     "distance": 542,
   *     "airline": {
   *       "code": "THA"
   *     },
   *     "airport": {
   *       "departure": "VTBD",
   *       "arrival": "VTSG"
   *     },
   *     "bay": {
   *       "departure": "210",
   *       "arrival": "A24"
   *     },
   *     "time": {
   *       "departure": "10:00",
   *       "arrival": "11:00",
   *       "total": "1:42"
   *     }
   *   }
   * }
   */

  if (
    !body.secret ||
    !body.event ||
    !body.event.id ||
    !body.flight ||
    !body.flight.name ||
    !body.flight.type ||
    !body.flight.aircraft ||
    !body.flight.distance ||
    !body.flight.airport ||
    !body.flight.airport.departure ||
    !body.flight.airport.arrival ||
    !body.flight.time ||
    !body.flight.time.departure ||
    !body.flight.time.arrival ||
    !body.flight.time.total
  ) {
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
    next()
  }
})

router.post('/', async (req, res) => {
  const {body} = req

  const id = Math.random()
    .toString(36)
    .substring(2)

  const payload = {
    eventID: body.event.id,
    flightID: id,
    flightType: body.flight.type,
    flightName: body.flight.name,
    flightAircraft: body.flight.aircraft,
    flightAirline: !_.isEmpty(body.flight.airline.code) ? body.flight.airline.code : null,
    flightDistance: body.flight.distance,
    flightAirportDep: body.flight.airport.departure,
    flightAirportArr: body.flight.airport.arrival,
    flightBayDep: !_.isEmpty(body.flight.bay.departure) ? body.flight.bay.departure : null,
    flightBayArr: !_.isEmpty(body.flight.bay.arrival) ? body.flight.bay.arrival : null,
    flightTimeDep: body.flight.time.departure,
    flightTimeArr: body.flight.time.arrival,
    flightTimeTotal: body.flight.time.total,
    reserver: null,
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
