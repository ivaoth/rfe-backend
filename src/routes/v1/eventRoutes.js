import express from 'express'

import eventIndex from './event/index'
import eventCreate from './event/create'
import eventList from './event/list'
import eventRemove from './event/remove'

const router = express.Router()

router.use('/', eventIndex)

router.use('/create', eventCreate)
router.use('/list', eventList)
router.use('/remove', eventRemove)

export default router
