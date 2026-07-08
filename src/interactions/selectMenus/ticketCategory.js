import { getGuildConfig } from '../../services/guildConfig.js';
import { createTicket } from '../../services/ticket.js';

export default {
  name: 'ticket_category',

  async execute(interaction, client) {
    const selected = interaction.values[0];

const reasons = {
  support: "Support",
  report: "Report User",
  partnership: "Partnership",
  other: "Other",
};

const reason = reasons[selected] || selected;

    const config = await getGuildConfig(client, interaction.guildId);

    const result = await createTicket(
      interaction.guild,
      interaction.member,
      config.ticketCategoryId,
      reason
    );

    if (!result.success) {
      return interaction.reply({
        content: result.error,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `✅ Your ticket has been created!\n**Reason:** ${reason}`,
      ephemeral: true,
    });
  },
};
