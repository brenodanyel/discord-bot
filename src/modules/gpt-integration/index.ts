import * as Discord from "discord.js";
import { Module } from "../../core/module";
import { Imagine } from "./slash-commands/imagine.command";
import { Welcome } from "./static-messages/welcome.static-message";

export class GPTIntegrationModule extends Module {
  constructor(bot: Discord.Client<true>) {
    super({
      bot,
      commands: [new Imagine()],
      staticMessages: [new Welcome()],
      interactions: [],
    });
  }
}
