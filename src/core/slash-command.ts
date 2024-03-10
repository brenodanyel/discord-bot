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
      return this.execute(interaction);
    });
  }

  register() {
    const route = Discord.Routes.applicationCommands(env.DISCORD_CLIENT_ID);
    new Discord.REST({ version: "10" })
      .setToken(env.DISCORD_TOKEN)
      .put(route, { body: [this.command.toJSON()] })
      .catch(console.error);
  }
}
