import express from 'express'

import eventIndex from './event/index'
import eventCreate from './event/create'
import eventList from './event/list'
import eventRemove from './event/remove'
import eventToggle from './event/toggle'

const router = express.Router()

router.use('/', eventIndex)

router.use('/create', eventCreate)
router.use('/list', eventList)
router.use('/remove', eventRemove)
router.use('/toggle', eventToggle)

export default router
