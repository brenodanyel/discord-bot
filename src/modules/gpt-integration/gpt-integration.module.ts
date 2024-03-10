import * as Discord from "discord.js";
import { Module } from "../../core/module";
import { CriarChatInteraction } from "./interactions/criar-chat.interaction";
import { MensagemNaConversaMessageListener } from "./message-listeners/mensagem-na-conversa.message-listener";
import { CriarChatModalSubmission } from "./modal-submissions/criar-chat.modal-submission";
import { ImagineCommand } from "./slash-commands/imagine.command";
import { CriarChatStaticMessage } from "./static-messages/criar-chat.static-message";

export enum TOKENS {
  MODAL_INICIAR_CONVERSA = "MODAL_INICIAR_CONVERSA",
  INPUT_ASSUNTO = "INPUT_ASSUNTO",
  BOTAO_INICIAR_CONVERSA = "BOTAO_INICIAR_CONVERSA",
}

export class GPTIntegrationModule extends Module {
  constructor(bot: Discord.Client<true>) {
    super({
      bot,
      commands: [new ImagineCommand()],
      staticMessages: [new CriarChatStaticMessage()],
      interactions: [new CriarChatInteraction()],
      modalSubmissions: [new CriarChatModalSubmission()],
      messageListeners: [new MensagemNaConversaMessageListener()],
    });
  }
}
