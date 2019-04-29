import express from 'express'

import Flight from '../../../models/flight'

const router = express.Router()

router.get('/:evid/:page', async (req, res) => {
  const {evid, page} = req.params

  const rows = await Flight.findAll({attributes: ['flightID'], where: {eventID: evid}, limit: 50, offset: 50 * (page - 1)})

  const flights = []

  rows.map(row => {
    flights.push(row.flightID)
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
