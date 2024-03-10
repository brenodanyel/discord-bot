import * as Discord from "discord.js";

export abstract class StaticMessage {
  abstract channelId: string;
  abstract existingMessageId: string | null;
  abstract message: Discord.BaseMessageOptions;
}
