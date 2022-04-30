const { MessageActionRow, MessageButton, MessageEmbed, Client } = require("discord.js");
const client = global.client;
const config = require("../config.js")
module.exports = {
	name: 'çıkar',
	description: 'çıkar',
	async execute(message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const chan = client.channels.cache.get(message.channelId);
        if (!message.member.roles.cache.find(r => r.id === config.ticket.roleSupport)) return message.reply(`Komutu kullanabilmek için <@&${config.ticket.roleSupport}> rolüne ihtiyacın var.`)
        if (!user) return message.reply(`Komutu doğru kullanabilmek için bir kullanıcı etiketlemen gerekir!`);
        if (chan.name.includes('talep')) {
          chan.edit({
            permissionOverwrites: [{
              id: user,
              deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: message.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
            {
              id: config.ticket.roleSupport,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
          ],
          }).then(async () => {
            message.reply(`<@${user.id}> talepten çıkarıldı!`);
          });
        } else {
          message.reply('Komutu kullanabilmek için bir talep kanalında olman gerekir!!');
        };

	},
};