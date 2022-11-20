
const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: 33283 
});


const settings =  require("./config.js");


import("./handler.js");
global.client = client;


client.login(settings.bot.token)
    .catch(e => console.log("[BOT] Bota giriş yapılırken bir hata oluştu:\n" + e));


module.exports = settings;
