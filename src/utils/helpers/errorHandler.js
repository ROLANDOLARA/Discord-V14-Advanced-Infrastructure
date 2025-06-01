const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

const handleError = async (error, interaction) => {

    const logoPath = path.join(__dirname, '..', '..', 'assets', 'images', 'logo.png');
    let logo;

    try {
        await fs.access(logoPath);
        logo = new AttachmentBuilder(logoPath, { name: 'logo.png' });
    } catch (fileError) {
        logo = null;
    }

    const errorEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Bot - Error Detected', iconURL: logo ? 'attachment://logo.png' : null })
        .setDescription('`❌` | An unexpected error was detected. Please try again later.')
        .setColor('Red')
        .setFooter({ text: 'Bot - Error Detected', iconURL: logo ? 'attachment://logo.png' : null });

    if (interaction && (interaction.isRepliable() || interaction.deferred)) {
        try {
            const replyOptions = {
                embeds: [errorEmbed],
                ephemeral: true,
                ...(logo && { files: [logo] })
            };

            if (interaction.deferred) {
                await interaction.editReply(replyOptions);
            } else {
                await interaction.reply(replyOptions);
            }
        } catch (sendError) {
        }
    }
};

module.exports = { handleError };