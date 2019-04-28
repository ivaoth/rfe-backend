import express from 'express'

import eventIndex from './event/index'
import eventCreate from './event/create'

const router = express.Router()

router.use('/', eventIndex)

router.use('/create', eventCreate)

export default router
