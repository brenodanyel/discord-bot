import { BaseMessageOptions, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";
import { StaticMessage } from "../../../core/static-message";

export class Welcome implements StaticMessage {
  channelId: string;
  existingMessageId: string | null;
  message: BaseMessageOptions;

  constructor() {
    this.channelId = "1035676142490877992";
    this.existingMessageId = "1216400861409050716";

    const embed = new EmbedBuilder() //
      .setTitle("Bem-vindo ao servidor!")
      .setAuthor({ name: "GPT Integration", iconURL: "https://i.imgur.com/3tj5J8J.png" })
      .setDescription("Este é um servidor de teste para o módulo de integração com GPT")
      .setColor("#FF0000")
      .setTimestamp();

    const component = new ButtonBuilder() //
      .setCustomId("welcome-button")
      .setLabel("Clique aqui para começar2")
      .setEmoji("👋")
      .setStyle(ButtonStyle.Primary);

    this.message = {
      content: "Bem-vindo ao servidor!",
      embeds: [embed],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [component],
        },
      ],
    };
  }
}
