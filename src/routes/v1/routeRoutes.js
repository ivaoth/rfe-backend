import express from 'express'

import routeIndex from './route/index'
import routeCreate from './route/create'
import routeGet from './route/get'

const router = express.Router()

router.use('/', routeIndex)

router.use('/create', routeCreate)
router.use('/get', routeGet)

export default router
