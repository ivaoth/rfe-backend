import express from 'express'

import Event from '../../../models/event'
import Flight from '../../../models/flight'

const router = express.Router()

router.get('/:evid/:page', async (req, res, next) => {
  const {evid} = req.params

  const event = await Event.findOne({where: {eventID: evid, isOpen: true}})

  if (event === null) {
    res.status(400).send({
      status: 'failure',
      code: 706,
      response: {
        message: 'event is closed for reservation',
      },
    })
  } else {
    next()
  }
})

router.get('/:evid/:page', async (req, res) => {
  const {evid, page} = req.params

  const rows = await Flight.findAll({
    attributes: ['flightID', 'flightType'],
    where: {eventID: evid},
    limit: 50,
    offset: 50 * (page - 1),
  })

  const flights = []

  rows.map(row => {
    flights.push({id: row.flightID, type: row.flightType})
  })

  return res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        flights: flights,
      },
    },
  })
})

router.all('/:evid/:page', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
