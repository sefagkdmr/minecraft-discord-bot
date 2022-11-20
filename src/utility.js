/* Definitions */
const { EmbedBuilder, ChatInputCommandInteraction, Message } = require("discord.js");


/* Classes & Functions */
ChatInputCommandInteraction.prototype.error = function(message = "Bilinmeyen bir hata oluştu.") {
    const errorEmbed = new EmbedBuilder()
        .setTitle("Opps!")
        .setDescription(message)
        .setColor("Red")
        .setTimestamp()
        .setFooter({ text: this.member.user.tag });

    this.reply({ embeds: [errorEmbed], ephemeral: true });
}

Message.prototype.error = function(message = "Bilinmeyen bir hata oluştu.") {
    const errorEmbed = new EmbedBuilder()
        .setTitle("Opps!")
        .setDescription(message)
        .setColor("Red")
        .setTimestamp()
        .setFooter({ text: this.member.user.tag });

    this.reply({ embeds: [errorEmbed], ephemeral: true });
}