import * as Discord from "discord.js";

export abstract class StaticMessage {
  abstract channelId: string;
  abstract existingMessageId: string | null;
  abstract message: Discord.BaseMessageOptions;

  async load(bot: Discord.Client<true>) {
    const channel = await bot.channels.fetch(this.channelId).catch(() => null);

    if (!channel) {
      console.error(`Channel not found for static message ${this.constructor.name}.`);
      return;
    }

    if (channel.type !== Discord.ChannelType.GuildText) {
      console.error(`Channel type not supported for static message ${this.constructor.name}.`);
      return;
    }

    if (this.existingMessageId) {
      const message = await channel.messages.fetch(this.existingMessageId).catch(() => null);

      if (!message) {
        console.error(`Message not found for static message ${this.constructor.name}. (${this.existingMessageId})`);
        return;
      }

      await message.edit(this.message);

      return;
    }

    await channel.send(this.message);
  }
}
