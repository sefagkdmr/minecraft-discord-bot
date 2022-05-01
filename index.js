const { Client, Intents ,Collection } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs')
const config = require("./config.js")
const client = (global.client = new Client({ fetchAllMembers: true, fetchGuilds: true, fetchVanity: true, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]}));
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); 
/* Tüm Intent adları için https://github.com/discordjs/discord.js/blob/stable/src/util/Intents.js#L46 */
client.commands = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

client.discord = Discord;
client.config = config;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

  client.on('messageCreate', async message => {
  let prefix = config.bot.prefix
  let id = config.bot.id
    if (message.content === `<@${id}>`) {
        message.channel.send(`Benim prefixim \`${prefix}\``)
    }});

client.login(config.bot.token)
