import Sequelize from 'sequelize'

import sequelize from '../database/sequelize'

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eventName: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  eventDesc: {
    type: Sequelize.TEXT,
  },
  eventCover: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

export default Event
