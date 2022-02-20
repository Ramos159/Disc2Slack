const { Client, Intents, Collection } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const { discordToken,discordClientID, discordClientSecret } = require('./config.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
// const path = require('path');

async function setupCommands(DClient){
  const rest = new REST({ version: '9' }).setToken(discordToken);
  const commands = [];
  DClient.commands = new Collection();
  
  const commandFiles = await fs.readdirSync('./commands/');

  for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
      DClient.commands.set(command.data.name,command);
  }
  
	try {
		console.log('Started refreshing application (/) commands.');

    // DClient.guilds.cache.forEach((guildID)=>{
    //   console.log(guildID);
      rest.put(
        Routes.applicationGuildCommands(discordClientID,'748365909449506847'),
        { body: commands },
      );
    // });

    // DClient.guilds.cache.forEach((guildID)=>{
    //   Routes.applicationGuildCommands(discordClientID,guildID), 
    //   { body: commands}});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}

}

// eslint-disable-next-line no-unused-vars
async function setupDClient(UM,UCM){
  const discordClient = await new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS] });
  await setupCommands(discordClient);

  discordClient.once('ready', () => {
    console.log('Discord booted up successfully');
  });

  discordClient.login(discordToken,).then(()=>{
    console.log('Discord logged in successfully');
  });

  discordClient.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = discordClient.commands.get(interaction.commandName);
  
    if (!command) return;

    // check if member is in database, if not create row for them
    try {
      await command.execute(discordClient,interaction,UM,UCM);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });

  return discordClient;
}

module.exports =  { setupDClient };