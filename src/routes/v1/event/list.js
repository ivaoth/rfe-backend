import _ from 'lodash'
import express from 'express'

import Event from '../../../models/event'

const router = express.Router()

router.get('/', async (req, res) => {
  const rows = Event.findAll({
    where: {
      isOpen: true,
    },
  })

  console.log(rows)

  const events = []

  rows.map(row => {
    events.push({
      id: row.eventID,
      name: row.eventName,
      desc: row.eventDesc,
      cover:  row.eventCover,
    })
  })

  return res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        events: events
      }
    }
  })
})

router.all('/', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
