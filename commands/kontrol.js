const { MessageActionRow, MessageButton, MessageEmbed, Client } = require("discord.js");
const client = global.client;
const config = require("../config.js")
var request = require('request');
module.exports = {
	name: 'kontrol',
	description: 'kontrol',
	async execute(message, args) {

        var url = "https://mcapi.tc/?" + config.sunucu.ip + "/json";
        let reason = config.sunucu.ip;
          request(url, function (err, response, body) { 
              if (err) {
                  console.log(err);
                  return message.channel.send(":x: Hata! Sunucu bilgileri alınırken beklenmedik bir hatayla karşılaştık.");
              }
                  body = JSON.parse(body);
                  if (body.status) { 
                      message.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et') 
                  }
                  if (body.players || body.players == "0") {
                    const embeda = new MessageEmbed()
                      .setColor('RANDOM')
                      .setAuthor({name: `${config.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + body.hostname})
                      .addField(':link: Sunucu Ip;', '▸ ' + reason , true)
                      .addField(':stopwatch: Gecikme;', '▸ ' + body.ping , true)
                      .addField(':green_circle: Çevrimiçi; ', '▸ ' + body.players + '/' + body.max_players, true)
                      .addField(':wrench: Sürüm;', '▸ ' + body.version, false) 
                      .setImage("http://status.mclive.eu/"+ reason +"/"+ body.hostname +"/"+ body.port+ "/banner.png")
                      .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + body.hostname)
                      .setFooter({text: reason})
                    message.channel.send({embeds: [embeda]})
      
      
      }
          });

    },
};