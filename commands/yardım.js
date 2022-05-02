const {MessageEmbed, Permissions} = require("discord.js");
const client = global.client;
const config = require("../config.js")
module.exports = {
	name: 'yardım',
	description: 'yardım',
	async execute(message, args) {
        const prefix = config.bot.prefix;
        const help = new MessageEmbed().setAuthor({name: `Komutlar`, iconURL: client.user.displayAvatarURL()}).setColor("RANDOM").setFooter({text: config.sunucu.ip}).setThumbnail(client.user.displayAvatarURL());
        if(message.member.roles.cache.some(role => role.id === config.ticket.roleSupport) || message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            help.addField(`:military_medal: ${prefix}başarım ▸`, `Kanala minecraft başarım resmi gönderir\nkullanım: ${prefix}başarım <başarım>\n${prefix}başarım <başlık>|<başarım>`, true).addField(`:mag_right: ${prefix}kontrol ▸`, `Sunucu durumunu mesaj şeklinde atar (online, motd vb.)`, true).addField(`:man_pouting: ${prefix}skin ▸`, `Belirtilen oyuncunun skinini gösterir\nKullanım: ${prefix}skin <skin/kafa/avatar/vücut> <nick>`, true).addField('\u200b', '\u200b').addField(`:inbox_tray: ${prefix}ekle ▸`, `Belirtilen kullanıcı destek talebine eklenir\n${prefix}ekle <kullanıcı>`, true).addField(`:outbox_tray: ${prefix}çıkar ▸`, `Belirtilen kullanıcı destek talebinden çıkarılır\n${prefix}çıkar <kullanıcı>`, true).setDescription(`Tüm komutlarımız bu şekildedir.\n bot Ön Eki(prefix): ${prefix}`);
            await message.channel.send({embeds: [help]})
        } else {
            help.addField(`:military_medal: ${prefix}başarım ▸`, `Kanala minecraft başarım resmi gönderir\nkullanım: ${prefix}başarım <başarım>\n${prefix}başarım <başlık>|<başarım>`, true).addField(`:mag_right: ${prefix}kontrol ▸`, `Sunucu durumunu mesaj şeklinde atar (online, motd vb.)`, true).addField(`:man_pouting: ${prefix}skin ▸`, `Belirtilen oyuncunun skinini gösterir\nKullanım: ${prefix}skin <skin/kafa/avatar/vücut> <nick>`, true).setDescription(`Tüm komutlarımız bu şekildedir.\n bot Ön Eki(prefix): ${prefix}`);
            message.channel.send({embeds: [help]})
        }
    },
};
