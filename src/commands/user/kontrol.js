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
            if (body.online.now >= 0) { 
                const embeda = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + body.hostname})
                    .addFields([
                      {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                      {name: ":stopwatch: Gecikme;" , value: '▸ ' + body.ping, inline: true},
                      {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.online.now + '/' + body.online.max, inline: true },
                      {name: ":wrench: Sürüm;" , value: '▸ ' + body.server.name, inline: false},
                    ])
                    .setImage("http://status.mclive.eu/"+ reason +"/"+ body.hostname +"/"+ body.port+ "/banner.png")
                    .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + body.hostname)
                    .setFooter({text: reason})
                  message.channel.send({embeds: [embeda]})
            } else {
                message.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
            }
        }).catch(error => {
            message.channel.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
        });
    },

    async executeSlash(interaction) {

      var url = "https://mcapi.tc/?" + settings.sunucu.ip + "/json";
      let reason = settings.sunucu.ip;

      got(url).then(response => {
          let body = JSON.parse(response.body);
          if (body.online.now >= 0) { 
              const embeda = new EmbedBuilder()
                  .setColor('Random')
                  .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + body.hostname})
                  .addFields([
                    {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                    {name: ":stopwatch: Gecikme;" , value: '▸ ' + body.ping, inline: true},
                    {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.online.now + '/' + body.online.max, inline: true },
                    {name: ":wrench: Sürüm;" , value: '▸ ' + body.server.name, inline: false},
                  ])
                  .setImage("http://status.mclive.eu/"+ reason +"/"+ body.hostname +"/"+ body.port+ "/banner.png")
                  .setThumbnail("https://eu.mc-api.net/v3/server/favicon/" + body.hostname)
                  .setFooter({text: reason})
                interaction.send({embeds: [embeda]})
          } else {
              interaction.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
          }
      }).catch(error => {
          interaction.send(':x: Böyle Bir Sunucu Yok Veya Şuanda Kapalı Lütfen İp Adresini Kontrol Et')
      });

  }
};
