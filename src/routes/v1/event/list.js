import express from 'express'

import Event from '../../../models/event'

const router = express.Router()

router.get('/', async (req, res) => {
  const rows = await Event.findAll({
    where: {
      isOpen: true,
    },
  })

  const events = []

  rows.map(row => {
    events.push({
      id: row.eventID,
      name: row.eventName,
      desc: row.eventDesc,
      cover: row.eventCover,
      breifing: {
        pilot: row.eventBreifingPilot,
        atc: row.eventBreifingATC,
      },
    })
  })

  return res.status(200).send({
    status: 'success',
    code: 201,
    response: {
      message: 'data retrived',
      data: {
        events: events,
      },
    },
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
