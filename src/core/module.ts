import * as Discord from "discord.js";
import { Interaction } from "./interactions";
import { SlashCommand } from "./slash-command";
import { StaticMessage } from "./static-message";

type ModuleProps = {
  bot: Discord.Client<true>;

  commands: SlashCommand[];
  staticMessages: StaticMessage[];
  interactions: Interaction[];
};

export abstract class Module {
  constructor(
    private readonly props: ModuleProps //
  ) {
    for (const command of this.props.commands) {
      command.register(this.props.bot);
      command.setupEvents(this.props.bot);
    }

    for (const staticMessage of this.props.staticMessages) {
      staticMessage.load(this.props.bot);
    }

    for (const interaction of this.props.interactions) {
      interaction.setupEvents(this.props.bot);
    }
  }
}
