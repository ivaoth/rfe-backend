import express from 'express'

import flightIndex from './flight/index'
import flightCancel from './flight/cancel'
import flightCreate from './flight/create'
import flightGet from './flight/get'
import flightList from './flight/list'
import flightRemove from './flight/remove'
import flightReserve from './flight/reserve'
import flightReserved from './flight/reserved'
import flightRelated from './flight/related'

const router = express.Router()

router.use('/', flightIndex)

router.use('/cancel', flightCancel)
router.use('/create', flightCreate)
router.use('/list', flightList)
router.use('/get', flightGet)
router.use('/remove', flightRemove)
router.use('/reserve', flightReserve)
router.use('/reserved', flightReserved)
router.use('/related', flightRelated)

export default router
