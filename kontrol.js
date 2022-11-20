const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const client = global.client;
const settings = require("../../../app.js");
var request = require('request');
const { execute } = require("./yardım.js");
module.exports = {
data: {
	name: 'kontrol',
  aliases: ['ip'],
	description: 'kontrol',
  cooldown: 0,
  slash: new SlashCommandBuilder(),
  contextmenu: new ContextMenuCommandBuilder(),
   },
	async executePrefix(client, message, args) {

        var url = "https://mcapi.tc/?" + settings.sunucu.ip + "/json";
        let reason = settings.sunucu.ip;
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
                    const embeda = new EmbedBuilder()
                      .setColor('Random')
                      .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + body.hostname})
                      .addFields([
                        {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                        {name: ":stopwatch: Gecikme;" , value: '▸ ' + body.ping, inline: true},
                        {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.players + '/' + body.max_players, inline: true },
                        {name: ":wrench: Sürüm;" , value: '▸ ' + body.version, inline: false},
                      ])
                      .setImage("http://status.mclive.eu/"+ reason +"/"+ body.hostname +"/"+ body.port+ "/banner.png")
                      .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + body.hostname)
                      .setFooter({text: reason})
                    message.channel.send({embeds: [embeda]})
      
      
      }
          });

    },
    async executeSlash(interaction) {

      var url = "https://mcapi.tc/?" + settings.sunucu.ip + "/json";
      let reason = settings.sunucu.ip;
        request(url, function (err, response, body) { 
            if (err) {
                console.log(err);
                return interaction.channel.send(":x: Hata! Sunucu bilgileri alınırken beklenmedik bir hatayla karşılaştık.");
            }
                body = JSON.parse(body);
                if (body.status) { 
                    interaction.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et') 
                }
                if (body.players || body.players == "0") {
                  const embeda = new EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + body.hostname})
                    .addFields([
                      {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                      {name: ":stopwatch: Gecikme;" , value: '▸ ' + body.ping, inline: true},
                      {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.players + '/' + body.max_players, inline: true},
                      {name: ":wrench: Sürüm;" , value: '▸ ' + body.version, inline: false},
                    ])
                    .setImage("http://status.mclive.eu/"+ reason +"/"+ body.hostname +"/"+ body.port+ "/banner.png")
                    .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + body.hostname)
                    .setFooter({text: reason})
                  interaction.channel.send({embeds: [embeda]})
    
    
    }
        });

  }
};