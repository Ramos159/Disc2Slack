const { Client, Intents } = require('discord.js');
const { discordToken } = require('../config.js');

function setupDClient(){
  console.log('starting discord process...')
  const discordClient = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS] });

  discordClient.once('ready', () => {
    console.log('discord process booted up successfully...');
  });

  discordClient.login(discordToken,).then(()=>{
    console.log('discord process logged in successfully...');
  });
  // return discordClient;
}

setupDClient();
// module.exports =  { setupDClient };
