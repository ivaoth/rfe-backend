import express from 'express'

import airlineIndex from './airline/index'
import airlineCreate from './airline/create'
import airlineGet from './airline/get'

const router = express.Router()

router.use('/', airlineIndex)

router.use('/create', airlineCreate)
router.use('/get', airlineGet)

export default router
