import * as Discord from "discord.js";
import { Module } from "../../core/module";
import { Imagine } from "./slash-commands/imagine";
import { Welcome } from "./static-messages/welcome";

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
