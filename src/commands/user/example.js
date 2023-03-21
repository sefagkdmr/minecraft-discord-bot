const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const client = global.client;
const settings = require("../../../app.js");
module.exports = {
data: {
    name: 'example',
    aliases: ['test'],
    description: 'example',
    cooldown: 0,
    slash: new SlashCommandBuilder(),
    contextmenu: new ContextMenuCommandBuilder(),
    },
	async executePrefix(client, message, args) {

        const embeda = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: `${settings.sunucu.isim}`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip})
            .setDescription(`▸ Mesajınız`) // Buraya istediğiniz şeyi yazarak değiştirebilirsiniz
            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip)
            .setFooter({text: settings.sunucu.ip})
            message.channel.send({embeds: [embeda]})

    },

    async executeSlash(interaction) {
        
        const embeda = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: `${settings.sunucu.isim}`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip})
            .setDescription(`▸ Mesajınız`) // Buraya istediğiniz şeyi yazarak değiştirebilirsiniz
            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip)
            .setFooter({text: settings.sunucu.ip})
            interaction.reply({embeds: [embeda]})
        
    
        }
}