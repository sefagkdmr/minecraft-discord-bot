/* Command */
const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');
const settings = require("../../../app.js")
const { ButtonStyle, ChannelType, PermissionFlagsBits, ComponentType,EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder } = require('discord.js');

module.exports =  {
	data: {
		name: "Talep Oluşturma",
        buttonId: "talep-olustur"
	},

	async execute(interaction) {
        if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
			return interaction.reply({
			  content: 'Zaten açık bir destek talebin bulunmakta yeni bir talep açabilmek için mevcut talebini kapatman gerekir!',
			  ephemeral: true
			});
		  };
	
		  interaction.guild.channels.create({
			name: `talep-${interaction.user.username}`,
			type: ChannelType.GuildText,
			parent: settings.ticket.parentOpened,
			topic: interaction.user.id,
			permissionOverwrites: [{
				id: interaction.user.id,
				allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
			  },
			  {
				id: settings.ticket.roleSupport,
				allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
			  },
			  {
				id: interaction.guild.roles.everyone,
				deny: [PermissionFlagsBits.ViewChannel],
			  },
			],
			
		  }).then(async c => {
			interaction.reply({
			  content: `Talep oluşturuldu! <#${c.id}>`,
			  ephemeral: true
			});
	
			const embed = new EmbedBuilder()
			  .setColor('6d6ee8')
			  .setAuthor({name: `${interaction.user.username} adlı kullanıcının talebi;`, iconURL: 'https://i.imgur.com/oO5ZSRK.png'})
			  .setDescription('Talebini Detaylandırmak için bir kategori seç')
			  .setFooter({text: `${settings.sunucu.isim} Destek Talebi Sistemi`, iconURL: client.user.displayAvatarURL()})
			  .setTimestamp();
	
			const row = new ActionRowBuilder()
			  .addComponents(
				new SelectMenuBuilder()
				.setCustomId('category')
				.setPlaceholder('Talebin için bir kategori seç')
				.addOptions([{
					label: settings.ticket.Category1,
					value: settings.ticket.Category1,
					emoji: '💸',
				  },
				  {
					label: settings.ticket.Category2,
					value: settings.ticket.Category2,
					emoji: '⚠',
				  },
				  {
					label: settings.ticket.Category3,
					value: settings.ticket.Category3,
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
			  componentType: ComponentType.SelectMenu,
			  time: 20000 //20 seconds
			});
	
			collector.on('collect', i => {
			  if (i.user.id === interaction.user.id) {
				if (msg.deletable) {
				  msg.delete().then(async () => {
					const embed = new EmbedBuilder()
					  .setColor('6d6ee8')
					  .setAuthor({name: 'Destek Talebi', iconURL: interaction.user.displayAvatarURL()})
					  .setDescription(`<@!${interaction.user.id}> Adlı kullanıcı \`${i.values[0]}\` kategorisinde bir talep oluşturdu`)
					  .setFooter({text: `${settings.sunucu.isim} Destek Talebi Sistemi`, iconURL: client.user.displayAvatarURL()})
					  .setTimestamp();
	
					const row = new ActionRowBuilder()
					  .addComponents(
						new ButtonBuilder()
						.setCustomId('talebi-kapat')
						.setLabel('Talebi Kapat')
						.setEmoji('✖')
						.setStyle(ButtonStyle.Danger),
					  );
	
					const opened = await c.send({
					  content: `<@&${settings.ticket.roleSupport}>`,
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
		
		}
};