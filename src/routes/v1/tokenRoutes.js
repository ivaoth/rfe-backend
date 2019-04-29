import express from 'express'

import tokenIndex from './token/index'
import tokenFetch from './token/fetch'

const router = express.Router()

router.use('/', tokenIndex)

router.use('/fetch', tokenFetch)

export default router
