const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");
const client = global.client;
const settings = require("../../../app.js");
const got = require('got');
module.exports = {
data: {
	name: 'kontrol',
  aliases: ['sunucu'],
	description: 'kontrol',
  cooldown: 0,
  slash: new SlashCommandBuilder(),
  contextmenu: new ContextMenuCommandBuilder(),
   },
	async executePrefix(client, message, args) {
        //mcapius link
        var url = "https://api.mcstatus.io/v2/status/" + settings.sunucu.type + "/" + settings.sunucu.ip + ":" + settings.sunucu.port;
        let reason = settings.sunucu.ip;
        
        got.get(url).then(response => {
            let body = JSON.parse(response.body);
            if (body.players.online >= 0 && body.online == true) { 
              let version = settings.sunucu.type == "java" ? body.version.name_clean : body.version.name;
                const embeda = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + reason})
                    .addFields([
                      {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                      {name: ":stopwatch: Web Site;" , value: '▸ [Website](' + settings.sunucu.site + ")", inline: true},
                      {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.players.online + '/' + body.players.max, inline: true },
                      {name: ":wrench: Sürüm;" , value: '▸ ' + version, inline: false},
                    ])
                    .setImage("http://status.mclive.eu/"+ reason +"/"+ reason +"/"+ settings.sunucu.port+ "/banner.png")
                    //.setImage("http://api.taskium.dev/mcbanner/" + reason + "/" + reason + "/" + settings.sunucu.port + "/banner.png")
                    .setThumbnail("https://api.mcstatus.io/v2/icon/" + reason)
                    .setFooter({text: reason})
                  message.channel.send({embeds: [embeda]})
                  
            } else {
                message.channel.send(':x: Sunucumuz şuanda kapalı lütfen daha sonra tekrar deneyin veya yetkililere bildirin')
            }
        }).catch(error => {
            console.log(error)
            message.channel.send(':x: Sunucumuz şuanda kapalı lütfen daha sonra tekrar deneyin veya yetkililere bildirin')
        });
    },

    async executeSlash(interaction) {

      var url = "https://api.mcstatus.io/v2/status/" + settings.sunucu.type + "/" + settings.sunucu.ip + ":" + settings.sunucu.port;
      let reason = settings.sunucu.ip;

      got.get(url).then(response => {
          let body = JSON.parse(response.body);
          if (body.players.online >= 0 && body.online == true) { 
            let version = settings.sunucu.type == "java" ? body.version.name_clean : body.version.name;
                const embeda = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({name: `${settings.sunucu.isim} İstatistikleri`, iconURL: "https://eu.mc-api.net/v3/server/favicon/" + reason})
                    .addFields([
                      {name:":link: Sunucu Ip;", value: '▸ ' + reason, inline: true},
                      {name: ":stopwatch: Web Site;" , value: '▸ [Website](' + settings.sunucu.site + ")", inline: true},
                      {name: ":green_circle: Çevrimiçi; " , value: '▸ ' + body.players.online + '/' + body.players.max, inline: true },
                      {name: ":wrench: Sürüm;" , value: '▸ ' + version, inline: false},
                    ])
                    .setImage("http://status.mclive.eu/"+ reason +"/"+ reason +"/"+ settings.sunucu.port+ "/banner.png")
                    //.setImage("http://api.taskium.dev/mcbanner/" + reason + "/" + reason + "/" + settings.sunucu.port + "/banner.png")
                    .setThumbnail("https://api.mcstatus.io/v2/icon/" + reason)
                    .setFooter({text: reason})
                interaction.reply({embeds: [embeda]})
          } else {
              interaction.reply(':x: Sunucumuz şuanda kapalı lütfen daha sonra tekrar deneyin veya yetkililere bildirin')
          }
      }).catch(error => {
          console.log(error)
          interaction.reply(':x: Sunucumuz şuanda kapalı lütfen daha sonra tekrar deneyin veya yetkililere bildirin')
      });

  }
};
