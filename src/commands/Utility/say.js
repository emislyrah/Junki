import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { logger } from '../../utils/logger.js';
import { handleInteractionError } from '../../utils/errorHandler.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot send a message.")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("The message to send")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    try {
      const message = interaction.options.getString("message");

      await interaction.channel.send({ content: message });

      await InteractionHelper.safeReply(interaction, {
        content: "✅ Message sent!",
        ephemeral: true
      });

      logger.info("Say command executed", {
        userId: interaction.user.id,
        guildId: interaction.guildId
      });

    } catch (error) {
      logger.error("Say command failed", {
        error: error.message,
        stack: error.stack
      });

      await handleInteractionError(interaction, error, {
        commandName: "say",
        source: "say_command"
      });
    }
  }
};
