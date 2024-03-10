import * as Discord from "discord.js";

export interface SlashCommand {
  command: Discord.SlashCommandBuilder;
  ephemeralReply: boolean;
  execute(interaction: Discord.Interaction): Promise<void>;
}
