const { ActivityType ,ButtonStyle, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { fstat, writeFileSync } = require('fs');
const settings = require("../../app.js")
const ms = require("ms")

module.exports = {
    eventName: "messageCreate",
	name: 'Message Create',
	once: true,
	async execute(message) { 
        const settings = require("../../app.js")

        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (message.content == `<@${settings.bot.id}>`) {
            message.reply(`Prefixim: \`${settings.bot.prefix}\``);
        }

        if (settings.oylama.enabled === true && message.channel.id === settings.oylama.channelID) {
            message.react(settings.oylama.emoji)
            .then(() => 
            message.react(settings.oylama.emoji2)
            .then(() => 
            message.react(settings.oylama.emoji3)
            .then(async () => {

            if(settings.oylama.altBaslik.enabled === true) {

                const thread = await message.startThread({
                    name: message.author.username,
                    autoArchiveDuration: settings.oylama.altBaslik.arsivlemeSure
                });
                await thread.leave();

            }
        } )));
        }
    }
}