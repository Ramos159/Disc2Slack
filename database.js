const { Sequelize, DataTypes } = require('sequelize');

async function setupDB(){
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.db',
    // logging: (...msg) => console.log(msg)
  });  

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const User = sequelize.define('User',{
    Id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    DiscordId:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  },{
    timestamps: false,
    tableName: 'Users'
  });

  const UserChannel = sequelize.define('UserChannel',{
    Id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    UserId:{
      type:DataTypes.INTEGER,
      references: User.Id,
      primaryKey:true,
      allowNull:false
    },
    ChannelId:{
      type: DataTypes.TEXT,
      allowNull:false
    }
  },{
    timestamps: false,
    tableName:'UserChannels'
  });
  
  UserChannel.belongsTo(User,{foreignKey:'UserId'});


  return [User,UserChannel];
}


module.exports = { setupDB }; 