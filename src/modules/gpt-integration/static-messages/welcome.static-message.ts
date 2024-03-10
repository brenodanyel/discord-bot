import { BaseMessageOptions, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";
import { StaticMessage } from "../../../core/static-message";

const embed = new EmbedBuilder()
  .setTitle("Bem-vindo ao servidor!")
  .setAuthor({ name: "GPT Integration", iconURL: "https://i.imgur.com/3tj5J8J.png" })
  .setDescription("Este é um servidor de teste para o módulo de integração com GPT")
  .setColor("#FF0000")
  .setTimestamp();

const component = new ButtonBuilder()
  .setCustomId("welcome-button")
  .setLabel("Clique aqui para começar3")
  .setEmoji("👋")
  .setStyle(ButtonStyle.Primary);

export class WelcomeStaticMessage extends StaticMessage {
  channelId = "1035676142490877992";
  existingMessageId = "1216432111997685982";

  message: BaseMessageOptions = {
    embeds: [embed],
    components: [
      {
        type: ComponentType.ActionRow,
        components: [component],
      },
    ],
  };
}
