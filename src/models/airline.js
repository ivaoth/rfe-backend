import Sequelize from 'sequelize'

import sequelize from '../services/sequelize'

const Airline = sequelize.define('airline', {
  airlineCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  airlineName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

sequelize.sync()

export default Airline
