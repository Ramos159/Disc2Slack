const { MessageEmbed } = require('discord.js');



function createSlackEmbed(DClient,text,username,realname,channel,workspace,chatLink){
	const colors = ['#36c5f0','#ecb22e','#2eb67d','#e01e5a','#4a154b'];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	const embed = new MessageEmbed()
		.setColor(randomColor)
		.setAuthor({name:username == realname? 'Message from '+username : 'Message from '+realname+'('+username+')',iconURL: DClient.user.displayAvatarURL()})
    .setTitle(workspace + ' in channel #' + channel)
		.setDescription(text+`\n\n[Link to message](${chatLink})`)
		.setTimestamp()
		.setFooter({ text: 'Disc2Slack bot',link:chatLink});

	return embed;
}

module.exports = { createSlackEmbed };