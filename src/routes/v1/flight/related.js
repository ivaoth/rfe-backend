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
   *     "id": "flightid",
   *     "related": {
   *       "id": "returnFlightid",
   *     }
   *   },
   *   "set": true,
   * }
   */

  if (
    !body.secret ||
    !body.event ||
    !body.event.id ||
    !body.flight ||
    !body.flight.id ||
    !body.flight.related ||
    !body.flight.related.id ||
    !body.set
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

router.post('/', async (req, res, next) => {
  const {body} = req

  const flight = await Flight.findOne({where: {eventID: body.event.id, flightID: body.flight.id}})

  if (flight === null) {
    return res.status(404).send({
      status: 'failure',
      code: 704,
      response: {
        message: 'flight not found',
      },
    })
  } else {
    next()
  }
})

router.post('/', async (req, res, next) => {
  const {body} = req

  const flight = await Flight.findOne({where: {eventID: body.event.id, flightID: body.flight.related.id}})

  if (flight === null) {
    return res.status(404).send({
      status: 'failure',
      code: 704,
      response: {
        message: 'related flight not found',
      },
    })
  } else {
    next()
  }
})

router.post('/', async (req, res) => {
  const {body} = req

  try {
    await Flight.update(
      {
        relatedFlightID: body.set === false ? null : body.flight.related.id,
      },
      {where: {eventID: body.event.id, flightID: body.flight.id}},
    )

    await Flight.update(
      {
        relatedFlightID: body.set === false ? null : body.flight.id,
      },
      {where: {eventID: body.event.id, flightID: body.flight.related.id}},
    )

    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'related flight setted',
      },
    })
  } catch (err) {
    return res.status(400).send({
      status: 'failure',
      code: 701,
      response: {
        message: 'unexprected error',
        data: err,
      },
    })
  }
})

export default router
