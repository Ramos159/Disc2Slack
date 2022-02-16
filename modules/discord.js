const { Client, Intents } = require('discord.js');
const { discordToken } = require('../config.js');

function setupDClient(){
  const discordClient = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS] });

  discordClient.once('ready', () => {
    console.log('booted up successfully...');
  });

  discordClient.login(discordToken);
}

module.exports =  { setupDClient };
