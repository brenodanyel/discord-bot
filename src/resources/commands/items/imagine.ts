import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { OpenAI } from "../../../helpers/openai";
import { Command } from "../command.interface";

export class Imagine implements Command {
  command: SlashCommandBuilder;

  constructor(private openAI = new OpenAI()) {
    this.command = new SlashCommandBuilder();
    this.command.setName("imagine");
    this.command.setDescription("Peça para o bot imaginar algo");
    this.command.addStringOption((option) => {
      option.setName("imagine");
      option.setDescription("O que você quer que o bot imagine?");
      option.setRequired(true);
      return option;
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const question = interaction.options.getString("imagine", true);

    const response = await this.openAI.imagine(question);

    const embed = new EmbedBuilder()
      .setImage(response)
      .setFields([{ name: "Entrada:", value: question }])
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() || undefined })
      .setFooter({ text: "©edunext", iconURL: interaction.client.user.avatarURL() || undefined })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
}
