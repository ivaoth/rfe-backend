import express from 'express'

import Event from '../../../models/event'

const router = express.Router()

router.get('/:evid', async (req, res) => {
  const {evid} = req.params

  const event = await Event.findOne({where: {eventID: evid}})

  if (event === null) {
    return res.status(404).send({
      status: 'failure',
      code: 704,
      response: {
        message: 'event not found',
      },
    })
  } else {
    return res.status(200).send({
      status: 'success',
      code: 201,
      response: {
        message: 'data retrived',
        data: {
          event: {
            id: event.eventID,
            name: event.eventName,
            desc: event.eventDesc,
            cover: event.eventCover,
            breifing: {
              pilot: event.eventBreifingPilot,
              atc: event.eventBreifingATC,
            },
            isOpen: event.isOpen,
          },
        },
      },
    })
  }
})

router.all('/:evid', (req, res) => {
  res.status(405).send({
    status: 'failure',
    code: 705,
    response: {
      message: 'invalid method',
    },
  })
})

export default router
