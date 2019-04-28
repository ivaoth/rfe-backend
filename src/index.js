import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import indexRoute from './routes/indexRoute'

import v1Routes from './routes/v1/index'

dotenv.config()
const {PORT = 3000, APP_ENV} = process.env

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.use(cors())

server.use(passport.initialize())
server.use(passport.session())
passportService(passport)

server.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'rayriffy')
  next()
})

server.use('/', indexRoute)

server.use('/api/v1', v1Routes)

server.all('*', (req, res) => {
  res.status(404).send({
    status: 'failure',
    code: 704,
    response: {
      message: 'route not found',
    },
  })
})

server.listen(PORT, () => {
  console.log(`${chalk.black.bgGreen(' INFO ')} app is running on port ${PORT}`)
  if (APP_ENV !== 'production') {
    console.log(`${chalk.black.bgYellow(' WARN ')} this app is running on ${APP_ENV} environment!`)
  }
})

export default server