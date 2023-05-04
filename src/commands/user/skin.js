const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType, AttachmentBuilder } = require("discord.js");
const settings = require("../../../app.js");
module.exports = {
    data: {
	    name: 'skin',
        aliases: ['cilt'],
	    description: 'skin',
        cooldown: 0,
        slash: new SlashCommandBuilder()
            .addStringOption(option => option.setName("bolum").setDescription("Belirttiğiniz cildin görmek istediğiniz bölümünü yazınız <avatar,kafa,vücut,skin>").setRequired(true).addChoices(
				{ name: 'Avatar', value: 'avatar' },
				{ name: 'Kafa', value: 'kafa' },
				{ name: 'Vücut', value: 'vucut' },
                { name: 'Skin', value: 'skin'},
			))
            .addStringOption(option => option.setName("nick").setDescription("Nick giriniz").setRequired(true)),
        contextmenu: new ContextMenuCommandBuilder(),
    },
	async executePrefix(client, message, args) {
        let mesaj = args.slice(1).join(' ')
        let member = message.mentions.members.first()
        if (!args[0]) return message.channel.send(`:x: Bir seçenek belirtmelisin. Seçenekler \`avatar\`, \`kafa\`, \`vücut\` veya \`skin\` şeklinde olmalıdır. \`${settings.bot.prefix}skin kafa Sefa_GK\``)
        if (!mesaj) return message.channel.send(`:x: Bir kullanıcı adı belirtmelisin. \`${settings.bot.prefix}skin kafa Sefa_GK\``);
        if (mesaj == member) return message.channel.send(`:x: Bu bir kullanıcı adı değil, bir kullanıcı adı belirtmelisin.`)

        if (args[0] == 'avatar') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/avatar/${mesaj}.png`, {name: `${mesaj}.png`})
            message.channel.send({files: [webAttachment]})
        }

        if (args[0] == 'kafa') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/head/${mesaj}.png`, {name: `${mesaj}.png`})
            message.channel.send({files: [webAttachment]})
        }

        if (args[0] == 'vücut') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/body/${mesaj}.png`, {name: `${mesaj}.png`})
            message.channel.send({files: [webAttachment]})
        }

        if (args[0] == 'skin') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/skin/${mesaj}.png`, {name: `${mesaj}.png`})
            message.channel.send({files: [webAttachment]})
        }
    },
    async executeSlash(interaction) {
        let mesaj = interaction.options.getString('nick');
        let bolum = interaction.options.getString('bolum');

        if (bolum == 'avatar') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/avatar/${mesaj}.png`, {name: `${mesaj}.png`})
            interaction.reply({files: [webAttachment]})
        }

        if (bolum == 'kafa') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/head/${mesaj}.png`, {name: `${mesaj}.png`})
            interaction.reply({files: [webAttachment]})
        }

        if (bolum == 'vucut') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/body/${mesaj}.png`, {name: `${mesaj}.png`})
            interaction.reply({files: [webAttachment]})
        }

        if (bolum == 'skin') {
            const webAttachment = new AttachmentBuilder(`https://mc-heads.net/skin/${mesaj}.png`, {name: `${mesaj}.png`})
            interaction.reply({files: [webAttachment]})
        }
    }
}
