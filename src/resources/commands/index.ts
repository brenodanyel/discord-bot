import { Client, REST, Routes, ChatInputCommandInteraction } from "discord.js";
import { Command } from "./command.interface";
import { AskGPT } from "./items/ask-gpt";
import { Imagine } from "./items/imagine";

const { TOKEN, CLIENT_ID } = process.env;

export class Commands {
  private commands: Command[];

  constructor(private client: Client) {
    this.commands = [new AskGPT(), new Imagine()];

    this.registerCommands();

    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      try {
        await this.handleInteraction(interaction);
      } catch (e) {
        console.error(e);
        if (!interaction.replied) {
          await interaction.reply({
            content: `Houve um erro ao executar este comando! ${e instanceof Error ? " (" + e.message + ")" : ""}`,
            ephemeral: true,
          });
        }
      }
    });
  }

  private async registerCommands() {
    const route = Routes.applicationCommands(String(CLIENT_ID));
    new REST({ version: "10" })
      .setToken(String(TOKEN))
      .put(route, { body: this.commands.map(({ command }) => command.toJSON()) })
      .then(() => console.log("Successfully reloaded application (/) commands."))
      .catch(console.error);
  }

  private async handleInteraction(interaction: ChatInputCommandInteraction) {
    const command = this.commands.find((item) => item.command.name === interaction.commandName);

    if (!command) {
      throw new Error("Comando não encontrado!");
    }

    if (typeof command.execute !== "function") {
      throw new Error("Comando não possui função de execução!");
    }

    await command.execute(interaction);

    if (!interaction.replied) {
      throw new Error("Comando não respondeu!");
    }
  }
}
