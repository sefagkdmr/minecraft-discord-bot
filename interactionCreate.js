const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');
const conf = require("../config.js")
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    if (interaction.customId == "talep-olustur") {
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.reply({
          content: 'Zaten açık bir destek talebin bulunmakta yeni bir talep açabilmek için mevcut talebini kapatman gerekir!',
          ephemeral: true
        });
      };

      interaction.guild.channels.create(`talep-${interaction.user.username}`, {
        parent: conf.ticket.parentOpened,
        topic: interaction.user.id,
        permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: conf.ticket.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: "GUILD_TEXT",
      }).then(async c => {
        interaction.reply({
          content: `Talep oluşturuldu! <#${c.id}>`,
          ephemeral: true
        });

        const embed = new client.discord.MessageEmbed()
          .setColor('6d6ee8')
          .setAuthor({name: `${interaction.user.username} adlı kullanıcının talebi;`, iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
          .setDescription('Talebini Detaylandırmak için bir kategori seç')
          .setFooter({text: `${conf.sunucu.isim} Destek Talebi Sistemi`, iconURL: client.user.displayAvatarURL()})
          .setTimestamp();

        const row = new client.discord.MessageActionRow()
          .addComponents(
            new client.discord.MessageSelectMenu()
            .setCustomId('category')
            .setPlaceholder('Talebin için bir kategori seç')
            .addOptions([{
                label: conf.ticket.Category1,
                value: conf.ticket.Category1,
                emoji: '💸',
              },
              {
                label: conf.ticket.Category2,
                value: conf.ticket.Category2,
                emoji: '⚠',
              },
              {
                label: conf.ticket.Category3,
                value: conf.ticket.Category3,
                emoji: '🤖',
              },
            ]),
          );

        msg = await c.send({
          content: `<@!${interaction.user.id}>`,
          embeds: [embed],
          components: [row]
        });

        const collector = msg.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 20000 //20 seconds
        });

        collector.on('collect', i => {
          if (i.user.id === interaction.user.id) {
            if (msg.deletable) {
              msg.delete().then(async () => {
                const embed = new client.discord.MessageEmbed()
                  .setColor('6d6ee8')
                  .setAuthor({name: 'Destek Talebi', iconURL: interaction.user.displayAvatarURL()})
                  .setDescription(`<@!${interaction.user.id}> Adlı kullanıcı \`${i.values[0]}\` kategorisinde bir talep oluşturdu`)
                  .setFooter({text: `${conf.sunucu.isim} Destek Talebi Sistemi`, iconURL: client.user.displayAvatarURL()})
                  .setTimestamp();

                const row = new client.discord.MessageActionRow()
                  .addComponents(
                    new client.discord.MessageButton()
                    .setCustomId('talebi-kapat')
                    .setLabel('Talebi Kapat')
                    .setEmoji('✖')
                    .setStyle('DANGER'),
                  );

                const opened = await c.send({
                  content: `<@&${conf.ticket.roleSupport}>`,
                  embeds: [embed],
                  components: [row]
                });

                opened.pin().then(() => {
                  opened.channel.bulkDelete(1);
                });
              });
            };
          };
        });

        collector.on('end', collected => {
          if (collected.size < 1) {
            c.send(`Kategori seçilmedi! Destek Talebi kapatılıyor..`).then(() => {
              setTimeout(() => {
                if (c.deletable) {
                  c.delete();
                };
              }, 5000);
            });
          };
        });
      });
    };

    if (interaction.customId == "talebi-kapat") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const chan = guild.channels.cache.get(interaction.channelId);

      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
          .setCustomId('onay-kapat')
          .setLabel('Talebi Kapat')
          .setStyle('DANGER'),
          new client.discord.MessageButton()
          .setCustomId('iptal')
          .setLabel('İptal Et')
          .setStyle('SECONDARY'),
        );

      const verif = await interaction.reply({
        content: 'Destek Talebini kapatmak istediğine emin misin?',
        components: [row]
      });

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 10000
      });

      collector.on('collect', i => {
        if (i.customId == 'onay-kapat') {
          interaction.editReply({
            content: `Destek Talebi <@!${interaction.user.id}> tarafından kapatıldı.`,
            components: []
          });

          chan.edit({
              name: `kapalı-${chan.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: conf.ticket.roleSupport,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })
            .then(async () => {
              const embed = new client.discord.MessageEmbed()
                .setColor('6d6ee8')
                .setAuthor({name: 'Destek Talebi', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
                .setDescription('```Destek Talebi Özeti```')
                .setFooter({text: `${conf.sunucu.isim} Destek Talebi Sistemi`, iconURL: client.user.displayAvatarURL()})
                .setTimestamp();

              const row = new client.discord.MessageActionRow()
                .addComponents(
                  new client.discord.MessageButton()
                  .setCustomId('talebi-sil')
                  .setLabel('Destek Talebini Sil.')
                  .setEmoji('🗑️')
                  .setStyle('DANGER'),
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
    };

    if (interaction.customId == "talebi-sil") {
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
            const embed = new client.discord.MessageEmbed()
              .setAuthor({name: 'Talep kayıtları', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
              .setDescription(`📰 \`${chan.id}\` Talebinin Kayıtları | <@!${chan.topic}> Tarafından  oluşturuldu | <@!${interaction.user.id}> Tarafından kapatıldı\n\Kayıt: [**Talep kayıtlarını görüntülemek için tıkla**](${getPasteUrl(result)})`)
              .setColor('2f3136')
              .setFooter({text: "Talep kayıtları 24 saat içinde silinecek!"})
              .setTimestamp();

            const embed2 = new client.discord.MessageEmbed()
              .setAuthor({name: 'Talep kayıtları', iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
              .setDescription(`📰 \`${chan.id}\` Talebinin Kayıtları: [**Talep kayıtlarını görüntülemek için tıkla**](${getPasteUrl(result)})`)
              .setColor('2f3136')
              .setFooter({text: "Talep kayıtları 24 saat içinde silinecek!"})
              .setTimestamp();

            client.channels.cache.get(conf.ticket.logsTicket).send({
              embeds: [embed]
            }).catch(() => console.log("Talep kayıt kanalı bulunamadı."));
            chan.send('Kanal Siliniyor...');

            setTimeout(() => {
              chan.delete();
            }, 5000);
          });
    };
  },
};
