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
  flightAircraft: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightAirline: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  flightAirportDep: {
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
  flightTimeArr: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightTimeTotal: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  flightDistance: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  flightBayDep: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  flightBayArr: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  flightType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  relatedFlightID: {
    type: Sequelize.STRING,
    allowNull: true,
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
