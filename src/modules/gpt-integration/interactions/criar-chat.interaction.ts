import * as Discord from "discord.js";
import { Interaction } from "../../../core/interactions";
import { TOKENS } from "../gpt-integration.module";

export class CriarChatInteraction extends Interaction {
  id = TOKENS.BOTAO_INICIAR_CONVERSA;

  async execute(interaction: Discord.Interaction): Promise<void> {
    if (!interaction.isMessageComponent()) return;
    if (!interaction.channel) return;

    const inputAssunto = new Discord.TextInputBuilder()
      .setCustomId(TOKENS.INPUT_ASSUNTO)
      .setLabel("Insira o assunto da conversa:")
      .setPlaceholder("Ex: Como fazer um bolo?")
      .setValue("Como fazer um bolo?")
      .setRequired(true)
      .setMinLength(5)
      .setMaxLength(100)
      .setStyle(Discord.TextInputStyle.Short);

    const firstActionRow = new Discord.ActionRowBuilder<Discord.ModalActionRowComponentBuilder>() //
      .addComponents(inputAssunto);

    const modal = new Discord.ModalBuilder()
      .setCustomId(TOKENS.MODAL_INICIAR_CONVERSA)
      .setTitle("Iniciar conversa com o chat GPT")
      .setComponents(firstActionRow);

    await interaction.showModal(modal);
  }
}
