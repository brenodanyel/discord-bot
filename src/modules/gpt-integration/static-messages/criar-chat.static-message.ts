import { BaseMessageOptions, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } from "discord.js";
import { StaticMessage } from "../../../core/static-message";
import { TOKENS } from "../gpt-integration.module";

export class CriarChatStaticMessage extends StaticMessage {
  channelId = "1035676142490877992";
  existingMessageId = "1216439010759671889";

  message: BaseMessageOptions = {
    embeds: [
      new EmbedBuilder()
        .setTitle("Bem-vindo ao servidor!")
        .setAuthor({ name: "GPT Integration", iconURL: "https://i.imgur.com/3tj5J8J.png" })
        .setDescription("Este é um servidor de teste para o módulo de integração com GPT")
        .setColor("#FF0000")
        .setTimestamp(),
    ],
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          new ButtonBuilder()
            .setCustomId(TOKENS.BOTAO_INICIAR_CONVERSA)
            .setLabel("Clique aqui para iniciar um novo chat")
            .setEmoji("💫")
            .setStyle(ButtonStyle.Primary),
        ],
      },
    ],
  };
}
