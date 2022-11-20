const settings = require("../../../app.js")
const { ButtonStyle, ChannelType, PermissionFlagsBits, ComponentType,EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder } = require('discord.js');

module.exports =  {
	data: {
		name: "Talebi Kapat",
        buttonId: "talebi-kapat"
	},

	async execute(interaction) {
        const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('onay-kapat')
          .setLabel('Talebi Kapat')
          .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
          .setCustomId('iptal')
          .setLabel('İptal Et')
          .setStyle(ButtonStyle.Secondary),
        );

      const verif = await interaction.reply({
        content: 'Destek Talebini kapatmak istediğine emin misin?',
        components: [row]
      });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 10000
      });

      collector.on('collect', i => {
        if (i.customId == 'onay-kapat') {
          interaction.editReply({
            content: `Destek Talebi <@!${interaction.user.id}> tarafından kapatıldı.`,
            components: [row]
          });

          chan.edit({
              name: `kapalı-${chan.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
                },
                {
                  id: settings.ticket.roleSupport,
                  allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: [PermissionFlagsBits.ViewChannel],
                },
              ],
            })
            .then(async () => {
              const embed = new EmbedBuilder()
                .setColor('6d6ee8')
                .setAuthor({name: 'Destek Talebi', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
                .setDescription('```Destek Talebi Özeti```')
                .setFooter({text: `${settings.sunucu.isim} Destek Talebi Sistemi`, iconURL: client.user.displayAvatarURL()})
                .setTimestamp();

              const row = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setCustomId('talebi-sil')
                  .setLabel('Destek Talebini Sil.')
                  .setEmoji('🗑️')
                  .setStyle(ButtonStyle.Danger),
                );

              chan.send({
                embeds: [embed],
                components: [row]
              });
            });

          collector.stop();
        };
        if (i.customId == 'iptal') {
          interaction.editReply({
            content: 'İptal ediliyor!',
            components: []
          });
          collector.stop();
        };
      });

      collector.on('son', (i) => {
        if (i.size < 1) {
          interaction.editReply({
            content: 'İptal ediliyor!',
            components: []
          });
        };
      });
    }
}