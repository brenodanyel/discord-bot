import * as Discord from "discord.js";

export abstract class MessageListener {
  abstract execute(message: Discord.Message<boolean>): void;

  setupEvents(bot: Discord.Client<true>): void {
    bot.on("messageCreate", async (message) => {
      if (!message.channel.isTextBased()) return;
      return this.execute(message);
    });
  }
}
