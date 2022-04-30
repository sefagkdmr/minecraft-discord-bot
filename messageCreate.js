//gerekli modüller

module.exports = {
	name: 'messageCreate',
    //komut sistemi 
	execute(message, client) {
        const config = require("../config.js")
        const prefix = config.bot.prefix;
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Bu komutta bir hata oluştu.');
        }
        
	}
};