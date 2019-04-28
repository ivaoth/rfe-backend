import Sequelize from 'sequelize'

import sequelize from '../services/sequelize'

const Flight = sequelize.define('flight', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  event: {
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

export default Flight
