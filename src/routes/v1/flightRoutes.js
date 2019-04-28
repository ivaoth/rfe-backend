import express from 'express'

import flightIndex from './flight/index'

const router = express.Router()

router.use('/', flightIndex)

export default router
