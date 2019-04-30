import express from 'express'

import Route from '../../../models/route'

const router = express.Router()

router.get('/:dep/:arr', async (req, res) => {
  const {dep, arr} = req.params

  try {
    const row = await Route.findOne({where: {airportDep: dep, airportArr: arr}})

    const payload = {
      airport: {
        departure: row.airportDep,
        arrival: row.airportArr,
      },
      route: row.route,
    }

    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'data retrived',
        data: {
          route: payload,
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

router.all('/:dep/:arr', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
