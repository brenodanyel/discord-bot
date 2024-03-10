import * as Discord from "discord.js";
import { env } from "../env";

export abstract class SlashCommand {
  abstract command: Discord.SlashCommandBuilder;
  abstract ephemeralReply: boolean;
  abstract execute(interaction: Discord.Interaction): Promise<void>;

  setupEvents(bot: Discord.Client<true>): void {
    bot.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;
      if (interaction.commandName !== this.command.name) return;

      await interaction.deferReply({ ephemeral: this.ephemeralReply });

      try {
        await this.execute(interaction);
      } catch (error) {
        console.error(error);

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({ content: "Houve um erro ao executar o comando." });
          return;
        }

        await interaction.reply({ content: "Houve um erro ao executar o comando.", ephemeral: this.ephemeralReply });
      }
    });
  }

  register(bot: Discord.Client<true>) {
    const route = Discord.Routes.applicationCommands(env.DISCORD_CLIENT_ID);
    new Discord.REST({ version: "10" })
      .setToken(env.DISCORD_TOKEN)
      .put(route, { body: [this.command.toJSON()] })
      .catch(console.error);
  }
}
