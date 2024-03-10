import { Interaction, SlashCommandBuilder } from "discord.js";

export interface Command {
  command: SlashCommandBuilder;
  ephemeralReply: boolean;
  execute(interaction: Interaction): Promise<void>;
}
