import express from 'express'

import Flight from '../../../models/flight'

const router = express.Router()

router.get('/:evid/:id', async (req, res) => {
  const {evid, id} = req.params

  const row = Flight.findOne({where: {eventID: evid, flightID: id}})

  const payload = {
    flight: row.flightName,
    type: row.flightType,
    airport: {
      departure: row.flightAirpotDep,
      arrival: row.flightAirportArr,
    },
    time: {
      departure: row.flightTimeDep,
    },
    reserved: reserver !== null,
  }

  res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        flight: payload
      }
    }
  })
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