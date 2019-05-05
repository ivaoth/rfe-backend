import express from 'express'

import Flight from '../../../models/flight'
import Event from '../../../models/event'

const router = express.Router()

router.get('/:vid', async (req, res) => {
  const {vid} = req.params

  const flights = await Flight.findAll({where: {reserverVID: vid}, limit: 50, order: [['id', 'DESC']]})

  const payload = []
  const promises = []

  const fetchFlight = async flight => {
    const event = await Event.findOne({where: {eventID: flight.eventID}})

    return payload.push({
      flight: {
        id: flight.flightID,
        flight: flight.flightName,
        type: flight.flightType,
        aircraft: flight.flightAircraft,
        airline:
          flight.flightAirline === null
            ? null
            : {
                code: flight.flightAirline,
              },
        distance: flight.flightDistance,
        airport: {
          departure: flight.flightAirportDep,
          arrival: flight.flightAirportArr,
        },
        bay:
          flight.flightBayDep === null && flight.flightBayArr === null
            ? null
            : {
                departure: flight.flightBayDep,
                arrival: flight.flightBayArr,
              },
        time: {
          departure: flight.flightTimeDep,
          arrival: flight.flightTimeArr,
          total: flight.flightTimeTotal,
        },
      },
      event: {
        id: flight.eventID,
        name: event.eventName,
        desc: event.eventDesc,
        cover: event.eventCover,
        breifing: {
          pilot: event.eventBreifingPilot,
          atc: event.eventBreifingATC,
        },
        isOpen: event.isOpen,
      },
    })
  }

  flights.map(flight => {
    promises.push(fetchFlight(flight))
  })

  await Promise.all(promises)

  res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        flights: payload,
      },
    },
  })
})

router.all('/:vid', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
