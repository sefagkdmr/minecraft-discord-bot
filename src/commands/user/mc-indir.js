const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType, AttachmentBuilder } = require("discord.js");
const settings = require("../../../app.js");
module.exports = {
    data: {
	    name: 'mc-indir',
        aliases: ['mcindir'],
	    description: 'Minecraft İndirme Linki',
        cooldown: 1000,
        slash: new SlashCommandBuilder(),
    },
    async executePrefix(client, message, args) {
        const embed = new EmbedBuilder()
        .setTitle(':link: MINECRAFT İNDİRME BAĞLANTISI')
        .setDescription(`:inbox_tray: Minecraft premium hesabınız varsa minecraft\'ı indirmek için [buraya](https://www.minecraft.net/en-us/download) tıklayabilirsiniz. \n\n :inbox_tray: Minecraft premium hesabınız yoksa minecraft\'ı indirmek için [buraya](${settings.sunucu.mcindir}) tıklayabilirsiniz.`)
        .setColor('Random')
        .setFooter({text: 'Minecraft İndirme Bağlantısı', iconURL: message.guild.iconURL({dynamic: true, size: 2048})})
        .setThumbnail('https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP')
        .setTimestamp()
        message.channel.send({embeds: [embed]})
    },
    async executeSlash(interaction) {
        const embed = new EmbedBuilder()
        .setTitle(':link: MINECRAFT İNDİRME BAĞLANTISI')
        .setDescription(`:inbox_tray: Minecraft premium hesabınız varsa minecraft\'ı indirmek için [buraya](https://www.minecraft.net/en-us/download) tıklayabilirsiniz. \n\n :inbox_tray: Minecraft premium hesabınız yoksa minecraft\'ı indirmek için [buraya](${settings.sunucu.mcindir}) tıklayabilirsiniz.`)
        .setColor('Random')
        .setFooter({text: 'Minecraft İndirme Bağlantısı', iconURL: interaction.guild.iconURL({dynamic: true, size: 2048})})
        .setThumbnail('https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP')
        .setTimestamp()
        interaction.reply({embeds: [embed]})
    }
}
