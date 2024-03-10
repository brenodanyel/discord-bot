import * as Discord from "discord.js";
import { ModalSubmission } from "../../../core/modal-submissions";
import { TOKENS } from "../gpt-integration.module";

export class CriarChatModalSubmission extends ModalSubmission {
  id = TOKENS.MODAL_INICIAR_CONVERSA;

  async execute(interaction: Discord.Interaction) {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.channel) return;
    if (interaction.channel.type !== Discord.ChannelType.GuildText) return;

    const channel = await this.$getChatsChannel(interaction.channel.guild);

    if (!channel) return;
    if (!channel.isTextBased()) return;

    const assunto = interaction.fields.getTextInputValue(TOKENS.INPUT_ASSUNTO);

    const message = await channel.send({
      content: `Uma nova conversa foi iniciada por ${interaction.user}!`,
      embeds: [
        new Discord.EmbedBuilder()
          .setDescription("Uma nova conversa foi iniciada!, sinta-se a vontade para conversar!")
          .setFields([{ name: "Titulo: ", value: assunto }])
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() || undefined })
          .setTimestamp(),
      ],
    });

    const thread = await message.startThread({
      name: assunto,
      autoArchiveDuration: Discord.ThreadAutoArchiveDuration.OneDay,
    });

    await interaction.reply({
      content: `Conversa iniciada! Clique aqui para acessar: ${thread.url}`,
      ephemeral: true,
    });
  }

  private async $getChatsChannel(guild: Discord.Guild) {
    const channels = await guild.channels.fetch();

    const existingChannel = channels.find((channel) => {
      if (!channel) return false;
      if (channel.type !== Discord.ChannelType.GuildText) return false;
      return channel.name === "conversas-gpt";
    });

    if (existingChannel) return existingChannel;

    return guild.channels.create({
      name: "conversas-gpt",
      type: Discord.ChannelType.GuildText,
    });
  }
}
