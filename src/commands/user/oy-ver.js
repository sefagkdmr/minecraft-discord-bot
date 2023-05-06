const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const client = global.client;
const settings = require("../../../app.js");

module.exports = {
    data: {
	    name: 'oy-ver',
        aliases: ['vote', 'oyver'],
	    description: 'oy-ver',
        cooldown: 0,
        slash: new SlashCommandBuilder(),
        contextmenu: new ContextMenuCommandBuilder(),
    },
    async executePrefix(client, message, args) {

        //send user vote link

        const embeda = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: `${settings.sunucu.isim}`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip})
            .setDescription(`Sunucumuza oy vererek bize destek olabilirsiniz!\n\n▸ ${settings.sunucu.vote}`)
            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip)
            .setFooter({text: settings.sunucu.ip})
            message.channel.send({embeds: [embeda]})

    },
    async executeSlash(interaction) {

        const embeda = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: `${settings.sunucu.isim}`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip})
            .setDescription(`Sunucumuza oy vererek bize destek olabilirsiniz!\n\n▸ ${settings.sunucu.vote}`)
            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip)
            .setFooter({text: settings.sunucu.ip})
            interaction.reply({embeds: [embeda]})
    
    }
}