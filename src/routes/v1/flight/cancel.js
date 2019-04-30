import express from 'express'

import Flight from '../../../models/flight'

import IVAOToken from '../../../services/token'

const router = express.Router()

router.post('/', (req, res, next) => {
  const {body} = req

  /**
   * Example:
   * {
   *   "token": "IVAOTOKEN"
   *   "event": {
   *     "id": "someid"
   *   },
   *   "flight": {
   *     "id":  "flightid"
   *   }
   * }
   */
  if (!body.token || !body.event || !body.event.id || !body.flight || !body.flight.id) {
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

router.post('/', async (req, res) => {
  const {body} = req

  const fetchToken = await IVAOToken(body.token)

  if (fetchToken.result === 0) {
    return res.send(401).send({
      status: 'failure',
      code: 401,
      response: {
        message: 'rouge token',
      },
    })
  } else {
    const flight = await Flight.findOne({where: {eventID: body.event.id, flightID: body.flight.id}})

    if (flight.reserverVID === fetchToken.vid) {
      try {
        await Flight.update(
          {
            reserverVID: null,
            reserverFirstName: null,
            reserverLastName: null,
            reserverRatingPilot: null,
            reserverRatingATC: null,
            reserverDivision: null,
          },
          {where: {eventID: body.event.id, flightID: body.flight.id}},
        )

        return res.status(200).send({
          status: 'success',
          code: 201,
          response: {
            message: 'flight canceled',
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
    } else {
      return res.status(400).send({
        status: 'failure',
        code: 701,
        response: {
          message: 'token mismatch with reserver',
        },
      })
    }
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
