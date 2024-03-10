import * as Discord from "discord.js";
import { env } from "../env";
import { Interaction } from './interactions';
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
    this.setupCommands();
    this.setupStaticMessages();
    this.setupInteractions();
  }

  private async setupCommands() {
    await this.registerCommands();

    this.props.bot.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.props.commands.find(({ command }) => command.name === interaction.commandName);
      if (!command) return;

      await interaction.deferReply({ ephemeral: command.ephemeralReply });

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({ content: "Houve um erro ao executar o comando." });
          return;
        }

        await interaction.reply({ content: "Houve um erro ao executar o comando.", ephemeral: command.ephemeralReply });
      }
    });
  }

  private async registerCommands() {
    const commandsNames = this.props.commands.map(({ command }) => command.name).join(", ");
    console.log(`Registering the following commands for ${this.constructor.name}: ${commandsNames}.`);

    const route = Discord.Routes.applicationCommands(env.DISCORD_CLIENT_ID);

    await new Discord.REST({ version: "10" })
      .setToken(env.DISCORD_TOKEN)
      .put(route, { body: this.props.commands.map(({ command }) => command.toJSON()) })
      .then(() => console.log(`Successfully reloaded application (/) commands for ${this.constructor.name}.`))
      .catch(console.error);
  }

  private async setupStaticMessages() {
    console.log(`Setting up static messages for ${this.constructor.name}.`);

    const callback = async (staticMessage: StaticMessage) => {
      console.log(`Setting up static message for ${this.constructor.name}: ${staticMessage.constructor.name}.`);

      const channel = await this.props.bot.channels.fetch(staticMessage.channelId);

      if (!channel) {
        console.error(`Channel not found for static message ${staticMessage.constructor.name}.`);
        return;
      }

      if (channel.type !== Discord.ChannelType.GuildText) {
        console.error(`Channel type not supported for static message ${staticMessage.constructor.name}.`);
        return;
      }

      if (staticMessage.existingMessageId) {
        const message = await channel.messages.fetch(staticMessage.existingMessageId);

        if (!message) {
          console.error(`Message not found for static message ${staticMessage.constructor.name}.`);
          return;
        }

        await message.edit(staticMessage.message);

        return;
      }

      await channel.send(staticMessage.message);
    };

    await Promise.all(this.props.staticMessages.map(callback));
  }

  private async setupInteractions() {
    this.props.bot.on("interactionCreate", async (interaction) => {
      if (!interaction.isButton()) return;

      const interactionHandler = this.props.interactions.find(({ id }) => id === interaction.customId);
      if (!interactionHandler) return;

      await interaction.deferUpdate();

      try {
        await interactionHandler.execute(interaction);
      } catch (error) {
        console.error(error);

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply({ content: "Houve um erro ao executar a interação." });
          return;
        }

        await interaction.reply({ content: "Houve um erro ao executar a interação.", ephemeral: true });
      }
    });
  }
}
