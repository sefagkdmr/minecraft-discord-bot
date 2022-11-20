const chalk = require('chalk');
const { ActivityType ,ButtonStyle, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    eventName: "ready",
	name: 'Client Ready',
	once: true,
	execute(client) {
		const settings = require("../../app.js") 
		const i = require("util").promisify(setInterval)
		var statustring = "Bağlantı hatası!";
		var request = require('request');
		var url = 'http://mcapi.tc/?' + settings.sunucu.ip + '/json';

		console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  	 	console.log(chalk.green('Bot İsmi: ') + chalk.cyan(client.user.username))
   		console.log(chalk.green('Bot Durumu: ') + chalk.cyan('Başlatıldı'))
    	console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

		function update() {
  			request(url, function(err, response, body) {
				if(err) {
          			console.log(err);
      			}
     			body = JSON.parse(body);
      			var status = settings.durum.mesaj.replace("{online}", body.players);
      			console.log(chalk.green(`[${settings.sunucu.isim}]`) + chalk.yellow(` ${body.players}`) + chalk.cyan(` oyuncu sunucumuzda aktif!`));
      			if(body.players) {
        			if((body.description=="&cWe are under maintenance.")||(body.players>=body.max_players)){
            			client.user.setStatus('idle')
            			.catch(console.error);
					}else{
            			client.user.setStatus('online')
         			}       
      			} else {
       				client.user.setStatus('dnd')
      			}
      			client.user.setActivity(status, { type: ActivityType.Playing })
  			}); 
		}

		function updates() {
  			request(url, function(err, response, body) {
  				if(err) console.log(err);  
    			body = JSON.parse(body);
    			if(body.players) {
      				client.channels.cache.get(settings.kanal.id).setName(settings.kanal.yazi.replace("{online}", body.players).replace("{maxonline}", body.max_players))
    			} else {
      				client.channels.cache.get(settings.kanal.id).setName(settings.kanal.yazi.replace("{online}", 0).replace("{maxonline}", body.max_players));
				}
  			})
		}

  		update();
  		if(settings.kanal.aktif == true) updates();
  		console.log(chalk.green(`[${settings.sunucu.isim}]`) + chalk.cyan(` ${settings.sunucu.ip}`));
  		i(update,30000).catch(chalk.green(`[${settings.sunucu.isim}]`) + ` ${console.error}`)
  		if(settings.kanal.aktif == true) i(updates,600000).catch(chalk.green(`[${settings.sunucu.isim}]`) + ` ${console.error}`);	

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
			console.log(chalk.green(`[${settings.sunucu.isim}]`) + chalk.cyan(' Talep oluşturma mesajı gönderildi..'))
		  }) 

		  
	},
};
