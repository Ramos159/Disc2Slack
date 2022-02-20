const { Sequelize, DataTypes } = require('sequelize');

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
    logging: (...msg) => console.log(msg)
  });  

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const User = sequelize.define('User',{
    ID:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    DiscordID:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  },{
    timestamps: false
  });

  const UserChannel = sequelize.define('UserChannel',{
    ID:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    UserID:{
      type:DataTypes.INTEGER,
      references: User,
      primaryKey:true,
      allowNull:false
    },
    ChannelID:{
      type: DataTypes.TEXT,
      allowNull:false
    }
  },{
    timestamps: false
  });


module.exports = { sequelize,User,UserChannel }; 