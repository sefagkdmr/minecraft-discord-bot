const settings = require("../../../app.js")
const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');
const { ButtonStyle, ChannelType, PermissionFlagsBits, ComponentType,EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder } = require('discord.js');

module.exports =  {
	data: {
		name: "talebi sil",
        buttonId: "talebi-sil"
	},

	async execute(interaction) {
        const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      interaction.reply({
        content: 'Mesajlar kaydediliyor...'
      });

      chan.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
          `${new Date(m.createdTimestamp).toLocaleString('en-EN')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
        if (a.length < 1) a = "Nothing"
        var paste = new PrivateBinClient("https://privatebin.net/");
        var result = await paste.uploadContent(a, {uploadFormat: 'markdown'})
            const embed = new EmbedBuilder()
              .setAuthor({name: 'Talep kayıtları', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
              .setDescription(`📰 \`${chan.id}\` Talebinin Kayıtları | <@!${chan.topic}> Tarafından  oluşturuldu | <@!${interaction.user.id}> Tarafından kapatıldı\n\Kayıt: [**Talep kayıtlarını görüntülemek için tıkla**](${getPasteUrl(result)})`)
              .setColor('2f3136')
              .setFooter({text: "Talep kayıtları 24 saat içinde silinecek!"})
              .setTimestamp();

            const embed2 = new EmbedBuilder()
              .setAuthor({name: 'Talep kayıtları', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
              .setDescription(`📰 \`${chan.id}\` Talebinin Kayıtları: [**Talep kayıtlarını görüntülemek için tıkla**](${getPasteUrl(result)})`)
              .setColor('2f3136')
              .setFooter({text: "Talep kayıtları 24 saat içinde silinecek!"})
              .setTimestamp();

            client.channels.cache.get(settings.ticket.logsTicket).send({
              embeds: [embed]
            }).catch(() => console.log("Talep kayıt kanalı bulunamadı."));
            chan.send('Kanal Siliniyor...');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
    }}