const { EmbedBuilder } = require('discord.js');
const { findBestMatch } = require('string-similarity');
const settings = require("../../app.js");

/* Event */
module.exports = {
    name: "Command Handler",
    eventName: "messageCreate",
    execute(message) {
        if (!settings.bot.prefix) return;
        if (!message.guild) return;
        if (message.author.bot) return;
        try {
          const prefix = settings.bot.prefix.find(p => message.content.startsWith(p))
          if (!prefix) return;
          
          const commandRoot = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
          const args = message.content.split(' ').slice(1);
          if (!commandRoot) return;
            const cmd = client.commands.get(commandRoot) || client.aliases.get(commandRoot);
            if (cmd) {
                const finish = new Date();
                const command = client.commands.get(cmd) || cmd;
                finish.setSeconds(finish.getSeconds() + command.data.cooldown);
          
                if (client.cooldowns.has(`${commandRoot}_${message.author.id}`)) {
                  const finish = client.cooldowns.get(`${commandRoot}_${message.author.id}`)
                  const date = new Date();
                  const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
                  return message.error(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`);
                };
                    
                command.executePrefix(client, message, args);
                if (command.data.cooldown > 0) {
                  client.cooldowns.set(`${commandRoot}_${message.author.id}`, finish);
                  setTimeout(() => {
                    client.cooldowns.delete(`${commandRoot}_${message.author.id}`);
                  }, command.data.cooldown * 1000);
                }
            } /*else {
              const commands = [];
              client.commands.forEach(cmd => {
                commands.push(cmd.data.name);
                cmd.data.aliases.forEach(alias => commands.push(alias));
              });
        
              const bestMatch = findBestMatch(commandRoot, commands);
              const didYouMean = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Oops! Bunu mu demek istediniz?')
                .setDescription(`**${prefix}${client.usages.get(bestMatch.bestMatch.target)}**`)
                .setFooter({ text: message.author.tag })
                .setTimestamp()

              message.reply({ embeds: [didYouMean] });
            }*/
        } catch (err) {
            message.error('Komudu çalıştırırken hata oluştu.');
            console.log(err);
        }
    }
}

