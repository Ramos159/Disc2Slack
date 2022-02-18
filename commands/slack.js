const { SlashCommandBuilder } = require('@discordjs/builders');

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
						interaction.reply({content:`You used command ${command} with id: ${interaction.options.getString('channelid')}`,ephemeral:true});
					}
};