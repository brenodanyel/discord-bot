import { Client } from "discord.js";
import { Module } from "../../core/module";
import { Imagine } from "./commands/imagine";
import { Welcome } from "./static-messages/welcome";

export class GPTIntegrationModule extends Module {
  constructor(bot: Client<true>) {
    super(bot, {
      commands: [new Imagine()],
      staticMessages: [new Welcome()],
    });
  }
}
