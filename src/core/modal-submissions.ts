import * as Discord from "discord.js";

export abstract class ModalSubmission {
  abstract id: string;
  abstract execute(interaction: Discord.Interaction): Promise<void>;

  setupEvents(bot: Discord.Client<true>): void {
    bot.on("interactionCreate", async (interaction) => {
      if (!interaction.isModalSubmit()) return;
      if (interaction.customId !== this.id) return;
      return this.execute(interaction);
    });
  }
}
