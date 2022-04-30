const chalk = require('chalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const ayarlar = require("../config.js") 
		const i = require("util").promisify(setInterval)
		var statustring = "Bağlantı hatası!";
		var request = require('request');
		var url = 'http://mcapi.tc/?' + ayarlar.sunucu.ip + '/json';

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
      			var status = ayarlar.durum.mesaj.replace("{online}", body.players);
      			console.log(chalk.green(`[${ayarlar.sunucu.isim}]`) + chalk.yellow(` ${body.players}`) + chalk.cyan(` oyuncu sunucumuzda aktif!`));
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
      			client.user.setActivity(status, { type: 'PLAYING' })
  			}); 
		}

		function updates() {
  			request(url, function(err, response, body) {
  				if(err) console.log(err);  
    			body = JSON.parse(body);
    			if(body.players) {
      				client.channels.cache.get(ayarlar.kanal.id).setName(ayarlar.kanal.yazi.replace("{online}", body.players).replace("{maxonline}", body.max_players))
    			} else {
      				client.channels.cache.get(ayarlar.kanal.id).setName(ayarlar.kanal.yazi.replace("{online}", 0).replace("{maxonline}", body.max_players));
				}
  			})
		}

  		update();
  		updates();
  		console.log(chalk.green(`[${ayarlar.sunucu.isim}]`) + chalk.cyan(` ${ayarlar.sunucu.ip}`));
  		i(update,30000).catch(chalk.green(`[${ayarlar.sunucu.isim}]`) + ` ${console.error}`)
  		i(updates,600000).catch(chalk.green(`[${ayarlar.sunucu.isim}]`) + ` ${console.error}`)	

		const oniChan = client.channels.cache.get(ayarlar.ticket.ticketChannel)

		function sendTicketMSG() {
			const embed = new client.discord.MessageEmbed()
			  .setColor('6d6ee8')
			  .setAuthor({name: 'Ticket', iconURL: client.user.avatarURL()})
			  .setDescription('Destek talebi açmak için butona basın.')
			  .setFooter({text: `${ayarlar.sunucu.isim} Destek Talebi`, iconURL: client.user.displayAvatarURL()})
			const row = new client.discord.MessageActionRow()
			  .addComponents(
				new client.discord.MessageButton()
				.setCustomId('talep-olustur')
				.setLabel('Destek Talebi Oluştur')
				.setEmoji('✉️')
				.setStyle('PRIMARY'),
			  );
	  
			oniChan.send({
			  embeds: [embed],
			  components: [row]
			})
		  }

		  oniChan.bulkDelete(100).then(() => {
			sendTicketMSG()
			console.log(chalk.green(`[${ayarlar.sunucu.isim}]`) + chalk.cyan(' Talep oluşturma mesajı gönderildi..'))
		  })
	},
};