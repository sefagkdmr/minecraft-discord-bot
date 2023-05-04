const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const client = global.client;
const settings = require("../../../app.js");
var request = require('request');
const { execute } = require("./yardım.js");
const got = require('got');
module.exports = {
data: {
	name: 'ip',
    aliases: ['ip'],
    description: 'ip',
    cooldown: 0,
    slash: new SlashCommandBuilder(),
    contextmenu: new ContextMenuCommandBuilder(),
    },
	async executePrefix(client, message, args) {

        //send user server ip

        const embeda = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: `${settings.sunucu.isim}`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip})
            .setDescription(`▸ ${settings.sunucu.ip}`)
            .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip)
            .setFooter({text: settings.sunucu.ip})
            message.channel.send({embeds: [embeda]})

    },

    async executeSlash(interaction) {
            
            const embeda = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({name: `${settings.sunucu.isim}`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip})
                .setDescription(`▸ ${settings.sunucu.ip}`)
                .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + settings.sunucu.ip)
                .setFooter({text: settings.sunucu.ip})
                interaction.send({embeds: [embeda]})
    
        }
}