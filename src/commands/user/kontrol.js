const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const client = global.client;
const settings = require("../../../app.js");
var request = require('request');
const { execute } = require("./yardım.js");
const got = require('got');
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
        //mcapius link
        var url = "https://mcapi.us/server/status?ip=" + settings.sunucu.ip + "&port=" + settings.sunucu.port;
        let reason = settings.sunucu.ip;

        got(url).then(response => {
            let body = JSON.parse(response.body);
            if (body.players.now >= 0) { 
                const embeda = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + reason})
                    .addFields([
                      {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                      {name: ":stopwatch: Web Site;" , value: '▸ ' + settings.sunucu.site, inline: true},
                      {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.players.now + '/' + body.players.max, inline: true },
                      {name: ":wrench: Sürüm;" , value: '▸ ' + body.server.name, inline: false},
                    ])
                    .setImage("http://status.mclive.eu/"+ reason +"/"+ reason +"/"+ settings.sunucu.port+ "/banner.png")
                    .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + reason)
                    .setFooter({text: reason})
                  message.channel.send({embeds: [embeda]})
            } else {
                message.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
            }
        }).catch(error => {
            console.log(error)
            message.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
        });
    },

    async executeSlash(interaction) {

      var url = "https://mcapi.us/server/status?ip=" + settings.sunucu.ip + "&port=" + settings.sunucu.port;
      let reason = settings.sunucu.ip;

      got(url).then(response => {
          let body = JSON.parse(response.body);
          if (body.players.now >= 0) { 
                const embeda = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + reason})
                    .addFields([
                      {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                      {name: ":stopwatch: Web Site;" , value: '▸ ' + settings.sunucu.site, inline: true},
                      {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.players.now + '/' + body.players.max, inline: true },
                      {name: ":wrench: Sürüm;" , value: '▸ ' + body.server.name, inline: false},
                    ])
                    .setImage("http://status.mclive.eu/"+ reason +"/"+ reason +"/"+ settings.sunucu.port+ "/banner.png")
                    .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + reason)
                    .setFooter({text: reason})
                interaction.send({embeds: [embeda]})
          } else {
              interaction.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
          }
      }).catch(error => {
          console.log(error)
          interaction.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
      });

  }
};
