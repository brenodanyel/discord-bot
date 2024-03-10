import { BaseMessageOptions } from "discord.js";
import { StaticMessage } from "../../../core/static-message";

export class Welcome implements StaticMessage {
  channelId: string;
  existingMessageId: string | null;
  message: BaseMessageOptions;

  constructor() {
    this.channelId = "1035676142490877992";
    this.existingMessageId = "1216400861409050716";
    this.message = {
      content: "Bem-vindo ao servidor!",
    };
  }
}
