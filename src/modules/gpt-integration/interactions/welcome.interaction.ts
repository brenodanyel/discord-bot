import * as Discord from "discord.js";
import { Interaction } from "../../../core/interactions";

export class WelcomeInteraction extends Interaction {
  id = "welcome-button";

  async execute(interaction: Discord.Interaction): Promise<void> {
    if (!interaction.isMessageComponent()) return;
    if (!interaction.channel) return;

    await interaction.channel.send({ content: "Olá! Como posso te ajudar?" });
  }
}
