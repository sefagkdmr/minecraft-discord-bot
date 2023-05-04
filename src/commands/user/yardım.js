const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder} = require("discord.js");

const settings = require("../../../app.js");
module.exports = {
    data: {
	    name: 'yardım',
        aliases: ['help'],
	    description: 'yardım',
        cooldown: 0,
        slash: new SlashCommandBuilder(),
        contextmenu: new ContextMenuCommandBuilder(),
    },
	async executePrefix(client, message, args) {
        const prefix = settings.bot.prefix;
        const help = new EmbedBuilder().setAuthor({name: `Komutlar`, iconURL: client.user.displayAvatarURL()}).setColor("Random").setFooter({text: settings.sunucu.ip}).setThumbnail(client.user.displayAvatarURL());
        if(message.member.roles.cache.some(role => role.id === settings.ticket.roleSupport) || message.member.permissions.has("ADMINISTRATOR")) {
            help
            .addFields([
                {name: `:bust_in_silhouette: ${prefix}avatar`, value: `Belirtilen kullanıcının veya belirtilmemişse kodu kullanan kullanıcının profil fotoğrafını gönderir`, inline: true},
                {name: `:mag_right: ${prefix}kontrol ▸`, value: "Sunucu durumunu mesaj şeklinde atar (online, motd vb.)", inline: true},
                {name: `:link: ${prefix}ip ▸`, value: `Sunucu IP Adresini gönderir`, inline: true},
                {name: `:man_pouting: ${prefix}skin ▸`, value: `Belirtilen oyuncunun skinini gösterir\nKullanım: ${prefix}skin <skin/kafa/avatar/vücut> <nick>`, inline: true},
                {name: `:pick: ${prefix}mc-indir ▸`, value: `Minecraft indirme linkini gönderir`, inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: `:inbox_tray: ${prefix}ekle ▸`, value: `Belirtilen kullanıcı destek talebine eklenir\n${prefix}ekle <kullanıcı>`, inline: true},
                {name: `:outbox_tray: ${prefix}çıkar ▸`, value: `Belirtilen kullanıcı destek talebinden çıkarılır\n${prefix}çıkar <kullanıcı>`, inline: true},
            ])
            .setDescription(`Tüm komutlarımız bu şekildedir.\n bot Ön Eki(prefix): ${prefix}`);
            await message.channel.send({embeds: [help]})
        } else {
            help
            .addFields([
                {name: `:bust_in_silhouette: ${prefix}avatar`, value: `Belirtilen kullanıcının veya belirtilmemişse kodu kullanan kullanıcının profil fotoğrafını gönderir`, inline: true},
                {name: `:mag_right: ${prefix}kontrol ▸`, value: "Sunucu durumunu mesaj şeklinde atar (online, motd vb.)", inline: true},
                {name: `:man_pouting: ${prefix}skin ▸`, value: `Belirtilen oyuncunun skinini gösterir\nKullanım: ${prefix}skin <skin/kafa/avatar/vücut> <nick>`, inline: true},
                {name: `:pick: ${prefix}mc-indir ▸`, value: `Minecraft indirme linkini gönderir`, inline: true},
            ])
            .setDescription(`Tüm komutlarımız bu şekildedir.\n bot Ön Eki(prefix): ${prefix}`);
            message.channel.send({embeds: [help]})
        }
    },
    async executeSlash(interaction) {
        const prefix = settings.bot.prefix;
        const help = new EmbedBuilder().setAuthor({name: `Komutlar`, iconURL: client.user.displayAvatarURL()}).setColor("Random").setFooter({text: settings.sunucu.ip}).setThumbnail(client.user.displayAvatarURL());
        if(interaction.member.roles.cache.some(role => role.id === settings.ticket.roleSupport) || interaction.member.permissions.has("ADMINISTRATOR")) {
            help
            .addFields([
                {name: `:bust_in_silhouette: ${prefix}avatar`, value: `Belirtilen kullanıcının veya belirtilmemişse kodu kullanan kullanıcının profil fotoğrafını gönderir`, inline: true},
                {name: `:mag_right: ${prefix}kontrol ▸`, value: "Sunucu durumunu mesaj şeklinde atar (online, motd vb.)", inline: true},
                {name: `:link: ${prefix}ip ▸`, value: `Sunucu IP Adresini gönderir`, inline: true},
                {name: `:man_pouting: ${prefix}skin ▸`, value: `Belirtilen oyuncunun skinini gösterir\nKullanım: ${prefix}skin <skin/kafa/avatar/vücut> <nick>`, inline: true},
                {name: `:pick: ${prefix}mc-indir ▸`, value: `Minecraft indirme linkini gönderir`, inline: true},
                {name: "\u200b", value: "\u200b"},
                {name: `:inbox_tray: ${prefix}ekle ▸`, value: `Belirtilen kullanıcı destek talebine eklenir\n${prefix}ekle <kullanıcı>`, inline: true},
                {name: `:outbox_tray: ${prefix}çıkar ▸`, value: `Belirtilen kullanıcı destek talebinden çıkarılır\n${prefix}çıkar <kullanıcı>`, inline: true},
            ])
            .setDescription(`Tüm komutlarımız bu şekildedir.\n bot Ön Eki(prefix): ${prefix}`);
            await interaction.reply({embeds: [help]})
        } else {
            help
            .addFields([
                {name: `:bust_in_silhouette: ${prefix}avatar`, value: `Belirtilen kullanıcının veya belirtilmemişse kodu kullanan kullanıcının profil fotoğrafını gönderir`, inline: true},
                {name: `:mag_right: ${prefix}kontrol ▸`, value: "Sunucu durumunu mesaj şeklinde atar (online, motd vb.)", inline: true},
                {name: `:man_pouting: ${prefix}skin ▸`, value: `Belirtilen oyuncunun skinini gösterir\nKullanım: ${prefix}skin <skin/kafa/avatar/vücut> <nick>`, inline: true},
                {name: `:pick: ${prefix}mc-indir ▸`, value: `Minecraft indirme linkini gönderir`, inline: true},
            ])
            .setDescription(`Tüm komutlarımız bu şekildedir.\n bot Ön Eki(prefix): ${prefix}`);
            interaction.reply({embeds: [help]})
        }
    }
};
