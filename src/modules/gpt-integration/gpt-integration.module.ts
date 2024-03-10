import * as Discord from "discord.js";
import { Module } from "../../core/module";
import { WelcomeInteraction } from "./interactions/welcome.interaction";
import { ImagineCommand } from "./slash-commands/imagine.command";
import { WelcomeStaticMessage } from "./static-messages/welcome.static-message";

export class GPTIntegrationModule extends Module {
  constructor(bot: Discord.Client<true>) {
    super({
      bot,
      commands: [new ImagineCommand()],
      staticMessages: [new WelcomeStaticMessage()],
      interactions: [new WelcomeInteraction()],
    });
  }
}
