import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

export default {
  name: 'ticket_category',

  async execute(interaction) {
    const category = interaction.values[0];

    const modal = new ModalBuilder()
      .setCustomId(`create_ticket_modal:${category}`)
      .setTitle('Create a Ticket');

    const reasonInput = new TextInputBuilder()
      .setCustomId('reason')
      .setLabel('Why are you creating this ticket?')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Describe your issue...')
      .setRequired(true)
      .setMaxLength(1000);

    modal.addComponents(
      new ActionRowBuilder().addComponents(reasonInput)
    );

    await interaction.showModal(modal);
  },
};
