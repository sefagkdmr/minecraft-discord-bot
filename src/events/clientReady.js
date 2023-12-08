const chalk = require('chalk');
const { ActivityType ,ButtonStyle, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    eventName: "ready",
	name: 'Client Ready',
	once: true,
	async execute(client) {
		const settings = require("../../app.js") 
		const i = require("util").promisify(setInterval)
		var statustring = "Bağlantı hatası!";
		var url = "https://api.mcstatus.io/v2/status/" + settings.sunucu.type + "/" + settings.sunucu.ip + ":" + settings.sunucu.port;
		const got = require('got');

		console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  	 	console.log(chalk.green('Bot İsmi: ') + chalk.cyan(client.user.username) + chalk.yellow('#' + client.user.discriminator))
		console.log(chalk.green('Bot Davet Linki: ') + chalk.bgBlue('https://discord.com/oauth2/authorize?client_id=' + client.user.id + '&permissions=8&scope=bot%20applications.commands'))
   		console.log(chalk.green('Bot Durumu: ') + chalk.cyan('Başlatıldı'))
		console.log(chalk.green(`Sunucu IP`) + chalk.cyan(` ${settings.sunucu.ip}`));
    	console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

		function update() {

			got.get(url).then(response => {
				const body = JSON.parse(response.body);
				var status = settings.durum.mesaj.replace("{online}", body.players.online);
				
				if(body.players.online >= 0 && body.online == true) {
					client.user.setStatus('online')
					client.user.setActivity(status, { type: ActivityType.Playing })
					console.log(chalk.magenta(`[${settings.sunucu.isim}]`) + chalk.cyan(" Sunucumuzda ") +chalk.bold(chalk.underline(chalk.yellow(`${body.players.online}`))) + chalk.cyan(` Oyuncu aktif!`));
				} else {
					client.user.setStatus('dnd')
					client.user.setActivity("Sunucu Kapalı", { type: ActivityType.Playing })
					console.log(chalk.yellow(`[${settings.sunucu.isim}]`) + chalk.red(` Sunucu Kapalı`));
				}
				
			}).catch(error => {
				console.log(error)
			})
		}

		function updates() {

			got.get(url).then(response => {
				const body = JSON.parse(response.body);
				if (body.online == false) {
					client.channels.cache.get(settings.kanal.id).setName("Sunucu Kapalı");
				}
				if(body.players.online > 0) {
					client.channels.cache.get(settings.kanal.id).setName(settings.kanal.yazi.replace("{online}", body.players.online).replace("{maxonline}", body.players.max))
				} else {
					client.channels.cache.get(settings.kanal.id).setName(settings.kanal.yazi.replace("{online}", 0).replace("{maxonline}", body.players.max));
				}
			}).catch(error => {
				console.log(error)
			})
		}
		update();
  		i(update,30000).catch(chalk.red(`[${settings.sunucu.isim}]`) + `sefa ${console.error}`)

		if(settings.kanal.aktif == true) updates();
  		if(settings.kanal.aktif == true) i(updates,30000).catch(chalk.green(`[${settings.sunucu.isim}]`) + ` ${console.error}`);	

		
		const oniChan = client.channels.cache.get(settings.ticket.ticketChannel)

		function sendTicketMSG() {
			const embed = new EmbedBuilder()
			  .setColor('6d6ee8')
			  .setAuthor({name: 'Ticket', iconURL: client.user.avatarURL()})
			  .setDescription('Destek talebi açmak için butona basın.')
			  .setFooter({text: `${settings.sunucu.isim} Destek Talebi`, iconURL: client.user.displayAvatarURL()})
			const row = new ActionRowBuilder()
			  .addComponents(
				new ButtonBuilder()
				.setCustomId('talep-olustur')
				.setLabel('Destek Talebi Oluştur')
				.setEmoji('✉️')
				.setStyle(ButtonStyle.Primary),
			  );
	  
			oniChan.send({
			  embeds: [embed],
			  components: [row]
			})
		  }
		  
		  oniChan.bulkDelete(100, true).catch(err => console.log(chalk.green(`[${settings.sunucu.isim}]`) + chalk.cyan(' Lütfen talep oluşturma kanalındaki eski mesajları temizleyin mesajlar 14 günden eski olduğu için silemiyorum '))).then(() => {
			sendTicketMSG()
			console.log(chalk.green(`[Talep Sistemi]`) + chalk.cyan(' Talep oluşturma mesajı gönderildi..'))
		  }) 

		  
	},
};
