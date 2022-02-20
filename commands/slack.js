const { SlashCommandBuilder } = require('@discordjs/builders');

// eslint-disable-next-line no-unused-vars
function addChannel(uID,cID){
	//database add cID to uID list
	console.log('use database to add to list of channels watched');
}

// eslint-disable-next-line no-unused-vars
function removeChannel(uID,cID){
	//database add cID to uID list
	console.log('use database to remove cid from channels watched');
}

// eslint-disable-next-line no-unused-vars
function listChannels(uID){
	console.log('returns all channels the user is subscribed to');
}

module.exports = { data: new SlashCommandBuilder()
	.setName('slack')
	.setDescription('Slack options')
	.addSubcommand(subcommand =>
		subcommand
			.setName('addchannel')
			.setDescription('add channel id to listen')
			.addStringOption(option =>
				option.setName('channelid')
					.setDescription('channel id to add')
					.setRequired(true)))
	.addSubcommand(subcommand =>
		subcommand
			.setName('removechannel')
			.setDescription('remove channel id from listening')
			.addStringOption(option =>
				option.setName('channelid')
					.setDescription('channel id to remove')
					.setRequired(true))),
					async execute(interaction){
						// needs work obvs
						// eslint-disable-next-line no-unused-vars
						const userID = interaction.user.id;
						const command = interaction.options._subcommand;
						const channelID = interaction.options.getString('channelid');
						// interaction.reply({content:`You used command ${command} with id: ${interaction.options.getString('channelid')}`,ephemeral:true});

						if(command == 'addchannel'){
							addChannel(userID,channelID);
						} 
						if(command == 'removechannel'){
							removeChannel(userID, channelID);
						}
						if(command == 'listchannels'){
							listChannels(userID);
						}
					}
};