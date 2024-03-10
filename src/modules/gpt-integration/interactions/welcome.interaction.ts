import * as Discord from "discord.js";
import { Interaction } from "../../../core/interactions";

export class WelcomeInteraction extends Interaction {
  id = "welcome-button";

  async execute(interaction: Discord.Interaction): Promise<void> {
    if (!interaction.isMessageComponent()) return;
    interaction.reply("Welcome to the server!");
  }
}
