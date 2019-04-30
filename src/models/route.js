import Sequelize from 'sequelize'

import sequelize from '../services/sequelize'

const Route = sequelize.define('route', {
  airportDep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  airportArr: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  route: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

sequelize.sync()

export default Route
