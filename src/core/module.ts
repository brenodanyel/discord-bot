import * as Discord from "discord.js";
import { Interaction } from "./interactions";
import { MessageListener } from "./message-listener";
import { ModalSubmission } from "./modal-submissions";
import { SlashCommand } from "./slash-command";
import { StaticMessage } from "./static-message";

type ModuleProps = {
  bot: Discord.Client<true>;

  commands: SlashCommand[];
  staticMessages: StaticMessage[];
  interactions: Interaction[];
  modalSubmissions: ModalSubmission[];
  messageListeners: MessageListener[];
};

export abstract class Module {
  constructor(
    private readonly props: ModuleProps //
  ) {
    for (const command of this.props.commands) {
      command.register();
      command.setupEvents(this.props.bot);
    }

    for (const staticMessage of this.props.staticMessages) {
      staticMessage.load(this.props.bot);
    }

    for (const interaction of this.props.interactions) {
      interaction.setupEvents(this.props.bot);
    }

    for (const modalSubmission of this.props.modalSubmissions) {
      modalSubmission.setupEvents(this.props.bot);
    }

    for (const messageListener of this.props.messageListeners) {
      messageListener.setupEvents(this.props.bot);
    }
  }
}
