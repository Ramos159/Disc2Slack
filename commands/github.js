const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { data: new SlashCommandBuilder()
	.setName('github')
	.setDescription('get the link to the Disc2Slack Github Repo'),
	async execute(interaction){
    await interaction.reply('Check out the repo for this bot here!\n https://github.com/Ramos159/Discord2Slack');
	}
};