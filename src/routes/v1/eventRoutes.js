import express from 'express'

import eventIndex from './event/index'

const router = express.Router()

router.use('/', eventIndex)

export default router
