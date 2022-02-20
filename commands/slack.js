const { SlashCommandBuilder } = require('@discordjs/builders');

async function addChannel(uId,cId,UM,UCM,interaction){
	// eslint-disable-next-line no-unused-vars
	const [user, created] = await UM.findOrCreate({
		where: { DiscordId: uId }
	});

	// eslint-disable-next-line no-unused-vars
	const [channel, chCreated] = await UCM.findOrCreate({
		where: {
			UserId: user.Id,
			ChannelId: cId
		}
	});

	if(!chCreated){
		interaction.reply(`You are already listening to Slack channel ${cId}.`);
	}  else {
		interaction.reply(`You are now listening to Slack channel ${cId}.`);
	}
}

async function removeChannel(uId,cId,UM,UCM,interaction){
	const [user, created] = await UM.findOrCreate({
		where: { DiscordId: uId }
	});

	if(created){
		interaction.reply('You are not subscribed to any Slack Channels.');
		return;
	}

	const channel = await UCM.findOne({
		where: {
			UserId: user.Id,
			ChannelId: cId
		}
	});

	if(channel == null){
		interaction.reply(`You are not subscribed to Slack channel ${cId}.`);
	} else {
		await channel.destroy();
		interaction.reply(`You are no longer subscribed to Slack channel ${cId}.`);
	}

}

async function listChannels(uId,UM,UCM,interaction){
	const [user, created] = await UM.findOrCreate({
		where: { DiscordId: uId }
	});

	if(created){
		interaction.reply('You are not subscribed to any Slack channels.');
		return;
	}

	const channels = await UCM.findAll({
		attribute: 'ChannelId',
		where: {
			UserId: user.Id
		}
	});

	if(channels.length == 0){
		interaction.reply('You are not subscribed to any Slack channels.');
		return;
	}

	let str = 'Below are the Channel id\'s you are currently subscribed to:\n\n';

	channels.forEach(channel => {
		str += `${channel.dataValues.ChannelId}\n`;
	});

		interaction.reply(str);

}

module.exports = { data: new SlashCommandBuilder()
	.setName('slack')
	.setDescription('Slack options')
	.addSubcommand(subcommand =>
		subcommand
			.setName('addchannel')
			.setDescription('Add a channel to subscribe to')
			.addStringOption(option =>
				option.setName('channelid')
					.setDescription('Specify a Slack channel id to subscribe to')
					.setRequired(true)))
	.addSubcommand(subcommand =>
		subcommand
			.setName('removechannel')
			.setDescription('Unsubscribe from a channel')
			.addStringOption(option =>
				option.setName('channelid')
					.setDescription('Specifiy Slack channel id to unsubscribe')
					.setRequired(true)))
	.addSubcommand(subcommand =>
		subcommand
			.setName('listchannels')
			.setDescription('List all the Slack channel id\'s')),
					async execute(interaction,UM,UCM){
						// needs work obvs
						// eslint-disable-next-line no-unused-vars
						const userId = interaction.user.id;
						const command = interaction.options._subcommand;
						const channelId = interaction.options.getString('channelid');
						// interaction.reply({content:`You used command ${command} with id: ${interaction.options.getString('channelid')}`,ephemeral:true});

						if(command == 'addchannel'){
							addChannel(userId,channelId,UM,UCM,interaction);
						} 
						if(command == 'removechannel'){
							removeChannel(userId, channelId,UM,UCM,interaction);
						}
						if(command == 'listchannels'){
							listChannels(userId,UM,UCM,interaction);
						}
					}
};