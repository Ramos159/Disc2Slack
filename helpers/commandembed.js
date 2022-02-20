const { MessageEmbed } = require('discord.js');

function createCommandEmbed(DClient,message){
	const colors = ['#36c5f0','#ecb22e','#2eb67d','#e01e5a','#4a154b'];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	const embed = new MessageEmbed()
		.setColor(randomColor)
		.setAuthor({name:'Disc2slack',iconURL: DClient.user.displayAvatarURL()})
		.setDescription(message)
		.setTimestamp()
		.setFooter({ text: 'Disc2Slack bot'});

	return embed;
}

module.exports = { createCommandEmbed };