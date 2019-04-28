import Sequelize from 'sequelize'

import sequelize from '../services/sequelize'

const Flight = sequelize.define('flight', {
  eventID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightAirpotDep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightAirportArr: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightTimeDep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reserver: {
    type: Sequelize.JSON,
    defaultValue: null,
  },
})

sequelize.sync()

export default Flight
