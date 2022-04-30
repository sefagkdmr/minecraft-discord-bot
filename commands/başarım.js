const { MessageActionRow, MessageButton, MessageEmbed, Client } = require("discord.js");
const client = global.client;
const config = require("../config.js")
const snekfetch = require('snekfetch');
module.exports = {
	name: 'başarım',
	description: 'başarım',
	async execute(message, args) {
        if(!args[0]) return message.reply(`Hiç argüman girmediniz doğru kullanım; \`${config.bot.prefix}başarım <Başlık> | <Başarım>\` şeklinde olmalıdır`);
        let [title, contents] = args.join(" ").split("|");
        if(!contents) {
            [title, contents] = ["Yeni ödül kazandin !", title];
        }
        let rnd = Math.floor((Math.random() * 39) + 1);
        if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
        if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
        if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

        if(title.length > 22 || contents.length > 22) return message.reply("Karakter sınırı! En fazla 22'şer karakter kullanabilirsiniz").then(message.delete.bind(message), 2000);
        const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
        snekfetch.get(url)
        .then(r=>message.channel.send({files:[{attachment: r.body}]}));
        message.delete();

    },
}