import express from 'express'

import Flight from '../../../models/flight'
import Airline from '../../../models/airline'

const router = express.Router()

router.get('/:evid/:id', async (req, res) => {
  const {evid, id} = req.params

  const row = await Flight.findOne({where: {eventID: evid, flightID: id}})

  const airline = row.flightAirline === null ? null : await Airline.findOne({where: {airlineCode: row.flightAirline}})

  const payload = {
    id: row.flightID,
    flight: row.flightName,
    type: row.flightType,
    aircraft: row.flightAircraft,
    airline:
      airline === null
        ? null
        : {
            code: airline.airlineCode,
            name: airline.airlineName,
          },
    distance: row.flightDistance,
    airport: {
      departure: row.flightAirportDep,
      arrival: row.flightAirportArr,
    },
    bay:
      row.flightBayDep === null && row.flightBayArr === null
        ? null
        : {
            departure: row.flightBayDep,
            arrival: row.flightBayArr,
          },
    time: {
      departure: row.flightTimeDep,
      arrival: row.flightTimeArr,
      total: row.flightTimeTotal,
    },
    related: {
      id: row.relatedFlightID,
    },
    reserver:
      row.reserverVID === null
        ? null
        : {
            vid: row.reserverVID,
          },
  }

  res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        flight: payload,
      },
    },
  })
})

router.all('/:evid/:id', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
