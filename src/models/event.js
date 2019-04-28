import Sequelize from 'sequelize'

import sequelize from '../database/sequelize'

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
    validate: {
      isUrl: true,
    },
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

export default Event
