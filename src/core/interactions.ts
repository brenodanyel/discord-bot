import * as Discord from "discord.js";

export abstract class Interaction {
  abstract id: string;
  abstract execute(interaction: Discord.Interaction): Promise<void>;

  setupEvents(bot: Discord.Client<true>): void {
    bot.on("interactionCreate", async (interaction) => {
      if (!interaction.isMessageComponent()) return;
      if (interaction.customId !== this.id) return;

      await interaction.deferUpdate();

      try {
        await this.execute(interaction);
      } catch (error) {
        console.error(error);

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({ content: "Houve um erro ao executar a interação." });
          return;
        }

        await interaction.reply({ content: "Houve um erro ao executar a interação.", ephemeral: true });
      }
    });
  }
}
