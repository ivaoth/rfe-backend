import express from 'express'

import airlineRoutes from './airlineRoutes'
import eventRoutes from './eventRoutes'
import flightRoutes from './flightRoutes'
import routeRoutes from './routeRoutes'
import tokenRoutes from './tokenRoutes'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    response: {
      message: 'healthy',
    },
  })
})

router.all('/', (req, res) => {
  res.status(405).send({
    status: 'failure',
    response: {
      message: 'invalid method',
    },
  })
})

router.use('/airline', airlineRoutes)
router.use('/event', eventRoutes)
router.use('/flight', flightRoutes)
router.use('/route', routeRoutes)
router.use('/token', tokenRoutes)

export default router
