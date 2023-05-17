const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Ticket=sequelize.define('ticket',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  tickets:{
    type: Sequelize.JSON
}
}
);

module.exports=Ticket;