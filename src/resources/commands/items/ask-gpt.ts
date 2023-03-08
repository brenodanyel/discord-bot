import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { OpenAI } from "../../../helpers/openai";
import { Command } from "../command.interface";

export class AskGPT implements Command {
  command: SlashCommandBuilder;

  constructor(private openAI = new OpenAI()) {
    this.command = new SlashCommandBuilder();

    this.command.setName("ask-gpt");
    this.command.setDescription("Pergunte algo ao GPT-3");
    this.command.addStringOption((option) => {
      option.setName("question");
      option.setDescription("A pergunta que você quer fazer");
      option.setRequired(true);
      return option;
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const question = interaction.options.getString("question", true);

    await interaction.deferReply();

    const response = await this.openAI.ask(question);

    const embed = new EmbedBuilder()
      .setFields([
        { name: "Pergunta:", value: question },
        { name: "Resposta:", value: response },
      ])
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() || undefined })
      .setFooter({ text: "©edunext", iconURL: interaction.client.user.avatarURL() || undefined })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
}
