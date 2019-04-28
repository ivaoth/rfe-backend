import express from 'express'

import flightIndex from './flight/index'
import flightCreate from './flight/create'
import flightGet from './flight/get'
import flightList from './flight/list'
import flightRemove from './flight/remove'
import flightReserve from './flight/reserve'

const router = express.Router()

router.use('/', flightIndex)

router.use('/create', flightCreate)
router.use('/list', flightList)
router.use('/get', flightGet)
router.use('/remove', flightRemove)
router.use('/reserve', flightReserve)

export default router
