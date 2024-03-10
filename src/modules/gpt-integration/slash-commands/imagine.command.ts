import * as Discord from "discord.js";
import { SlashCommand } from "../../../core/slash-command";

export class ImagineCommand extends SlashCommand {
  ephemeralReply = true;

  command = new Discord.SlashCommandBuilder() //
    .setName("imagine")
    .addStringOption((option) => option.setName("imagine").setDescription("O que você quer que o bot imagine?").setRequired(true))
    .setDescription("Peça para o bot imaginar algo");

  async execute(interaction: Discord.ChatInputCommandInteraction) {
    const question = interaction.options.getString("imagine", true);

    // const response = await this.openAI.imagine(question);

    const embed = new Discord.EmbedBuilder()
      .setFields([{ name: "Entrada:", value: question }])
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() || undefined })
      .setFooter({ text: "©edunext", iconURL: interaction.client.user.avatarURL() || undefined })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
}
