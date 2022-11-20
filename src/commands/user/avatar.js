
const { EmbedBuilder, ContextMenuCommandBuilder, SlashCommandBuilder, ApplicationCommandType } = require("discord.js");

/* Command */
module.exports =  {
	data: {
		name: "avatar",
        aliases: ["av"],
        usage: "avatar [@user]",
		cooldown: 0,
        description: "Etiketlediğiniz kişinin avatarını gösterir.",
		slash: new SlashCommandBuilder()
			.addUserOption(option => option.setName("user").setDescription("Kişi").setRequired(false)),
        contextMenu: new ContextMenuCommandBuilder().setType(ApplicationCommandType.User)
	},

    async executePrefix(client, message, args) {
		const user = message.mentions.users.first() || message.author;
		const avatarEmbed = new EmbedBuilder()
			.setTitle(`${user.tag} kişisinin avatarı`)
			.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
			.setFooter({ text: `${message.author.tag} tarafından istendi` })
        message.reply({ embeds: [avatarEmbed] });
    },

	async executeSlash(interaction) {
		const user = interaction.options.getMember("user")?.user || interaction.member.user;
		const avatarEmbed = new EmbedBuilder()
			.setTitle(`${user.tag} kişisinin avatarı`)
			.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
			.setFooter({ text: `${interaction.member.user.tag} tarafından istendi` })
        interaction.reply({ embeds: [avatarEmbed] });
    }
};
