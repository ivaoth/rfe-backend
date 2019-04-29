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
  reserverVID: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  reserverFirstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  reserverLastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  reserverRatingPilot: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  reserverRatingATC: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  reserverDivision: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

sequelize.sync()

export default Flight
