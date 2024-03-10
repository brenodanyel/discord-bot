import * as Discord from "discord.js";

export interface Interaction {
  id: string;
  execute(interaction: Discord.Interaction): Promise<void>;
}
