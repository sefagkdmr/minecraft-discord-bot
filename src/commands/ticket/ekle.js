const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");

const settings = require("../../../app.js");
module.exports = {
data: {
	name: 'ekle',
	aliases: ['add'],
	description: 'ekle',
	cooldown: 0,
        slash: new SlashCommandBuilder(),
        contextmenu: new ContextMenuCommandBuilder()
	 },
	async executePrefix(client, message, args) {
		let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const chan = client.channels.cache.get(message.channelId);
		if (!message.member.roles.cache.find(r => r.id === settings.ticket.roleSupport)) return message.reply(`Komutu kullanabilmek için <@&${settings.ticket.roleSupport}> rolüne ihtiyacın var.`);
		if (!user) return message.reply(`Komutu doğru kullanabilmek için bir kullanıcı etiketlemen gerekir!`);
		if (chan.name.includes('talep')) {
		  chan.edit({
			permissionOverwrites: [{
			  id: user,
			  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
			},
			{
			  id: message.guild.roles.everyone,
			  deny: ['VIEW_CHANNEL'],
			},
			{
			  id: settings.ticket.roleSupport,
			  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
			},
			],
		  }).then(async () => {
			message.reply(`<@${user.id}> talebe eklendi!`);
		  });
		} else {
		  message.reply('Komutu kullanabilmek için bir talep kanalında olman gerekir!');
		};

	},
};
