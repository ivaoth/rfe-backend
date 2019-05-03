import express from 'express'

import Flight from '../../../models/flight'

import IVAOToken from '../../../services/token'

const router = express.Router()

router.post('/', (req, res, next) => {
  const {body} = req

  /**
   * Example:
   * {
   *   "event": {
   *     "id": "someid"
   *   },
   *   "flight": {
   *     "id":  "flightid",
   *     "reserver": {
   *       "token": "ivaotoken"
   *     }
   *   },
   *   "withRelated": false
   * }
   */
  if (
    !body.event ||
    !body.event.id ||
    !body.flight ||
    !body.flight.id ||
    !body.flight.reserver ||
    !body.flight.reserver.token ||
    (body.withRelated !== true && body.withRelated !== false)
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

router.post('/', async (req, res) => {
  const {body} = req

  const fetchToken = await IVAOToken(body.flight.reserver.token)

  if (fetchToken.result === 0) {
    return res.send(401).send({
      status: 'failure',
      code: 401,
      response: {
        message: 'rouge token',
      },
    })
  } else {
    const dups = await Flight.findAll({where: {reserverVID: fetchToken.vid, eventID: body.event.id}})

    if (dups.length >= 2) {
      return res.status(400).send({
        status: 'failure',
        code: 701,
        response: {
          message: 'this vid has already booked',
        },
      })
    } else {
      console.log(dups.length)
      if (dups.length === 1) {
        if (dups[0].relatedFlightID === null) {
          return res.status(400).send({
            status: 'failure',
            code: 701,
            response: {
              message: 'this vid has already booked',
            },
          })
        }

        const relatedFlight = await Flight.findOne({where: {eventID: body.event.id, flightID: dups[0].relatedFlightID}})

        console.log(dups[0].relatedFlightID)
        console.log(relatedFlight === null)

        if (dups[0].reserverVID !== fetchToken.vid || relatedFlight.flightID !== body.flight.id) {
          return res.status(400).send({
            status: 'failure',
            code: 701,
            response: {
              message: 'this vid has already booked',
            },
          })
        }
      }

      const flight = await Flight.findOne({where: {eventID: body.event.id, flightID: body.flight.id}})

      if (flight === null) {
        return res.status(404).send({
          status: 'failure',
          code: 704,
          response: {
            message: 'flight not found',
          },
        })
      } else if (flight.reserverVID !== null) {
        return res.status(400).send({
          status: 'failure',
          code: 706,
          response: {
            message: 'someone already reserved this flight',
          },
        })
      } else {
        const payload = {
          reserverVID: fetchToken.vid,
          reserverFirstName: fetchToken.firstname,
          reserverLastName: fetchToken.lastname,
          reserverRatingPilot: fetchToken.ratingpilot,
          reserverRatingATC: fetchToken.ratingatc,
          reserverDivision: fetchToken.division,
        }

        await Flight.update(payload, {where: {eventID: body.event.id, flightID: body.flight.id}})

        if (body.withRelated === true) {
          const relatedFlight = await Flight.findOne({where: {eventID: body.event.id, flightID: flight.relatedFlightID}})

          if (relatedFlight.reserverVID !== null && relatedFlight.reserverVID !== fetchToken.vid) {
            return res.status(200).send({
              status: 'success',
              code: 202,
              response: {
                message: 'flight booked but related flight cannot be reserved because someone already reserved',
              },
            })
          } else {
            const payload = {
              reserverVID: fetchToken.vid,
              reserverFirstName: fetchToken.firstname,
              reserverLastName: fetchToken.lastname,
              reserverRatingPilot: fetchToken.ratingpilot,
              reserverRatingATC: fetchToken.ratingatc,
              reserverDivision: fetchToken.division,
            }

            await Flight.update(payload, {where: {eventID: body.event.id, flightID: flight.relatedFlightID}})
          }
        }

        return res.status(200).send({
          status: 'success',
          code: 201,
          response: {
            message: 'Flight reserved',
          },
        })
      }
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
