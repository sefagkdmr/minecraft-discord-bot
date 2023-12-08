/* Event */
module.exports = {
    name: "Interaction Handler",
    eventName: "interactionCreate",
    async execute(interaction) {
      const settings = require("../../app.js");
      if(settings.bot.slashCommands && settings.bot.slashCommands !== "undefined") {
      if (interaction.isModalSubmit()) {
        const modal = client.modals.get(interaction.customId);
        if (!modal) return;
        modal.execute(interaction);
      } else if (interaction.isButton()) { 
        const button = client.buttons.get(interaction.customId);
        if (!button) return;
        button.execute(interaction);
      } else if (interaction.isSelectMenu()) { 
        const selectMenu = client.selectMenus.get(interaction.customId);
        if (!selectMenu) return;
        selectMenu.execute(interaction);
      } else if (interaction.isCommand() || interaction.isContextMenu()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        const finish = new Date();
        finish.setSeconds(finish.getSeconds() + command.data.cooldown);

        if (client.cooldowns.has(`${interaction.commandName}_${interaction.user.id}`)) {
            const finish = client.cooldowns.get(`${interaction.commandName}_${interaction.user.id}`)
            const date = new Date();
            const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
            return interaction.error(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`);
          };

        command.executeSlash(interaction);
        if (command.data.cooldown > 0) {
            client.cooldowns.set(`${interaction.commandName}_${interaction.user.id}`, finish);
            setTimeout(() => {
              client.cooldowns.delete(`${interaction.commandName}_${interaction.user.id}`);
            }, command.data.cooldown * 1000);
          };
      }
    } else { 
      interaction.reply({ content: "Slash komutları kapalı", ephemeral: true });
    }
    }
}