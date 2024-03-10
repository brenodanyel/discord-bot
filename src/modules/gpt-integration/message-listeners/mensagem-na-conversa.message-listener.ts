import * as Discord from "discord.js";
import { MessageListener } from "../../../core/message-listener";

export class MensagemNaConversaMessageListener extends MessageListener {
  async execute(message: Discord.Message<true>): Promise<void> {
    if (!message.channel.isThread()) return;

    const previousMessages = await message.channel.messages.fetch({ limit: 10 });

    console.log(previousMessages);

    console.log("Mensagem na conversa!", message.content);
  }
}
