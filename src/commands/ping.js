const { Client, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const Discord = require("discord.js");
const fs = require('fs').promises;
const path = require('path');

module.exports = {
  name: "ping",
  description: "You can learn the bot's ping values.",
  type: 1,
  options: [],

  run: async(client, interaction, db) => {

    const ping = client.ws.ping+"ms"
    const logoPath = path.join(__dirname, '..', '..', 'assets', 'images', 'logo.png');
    let logo;

    try {
        await fs.access(logoPath);
        logo = new AttachmentBuilder(logoPath, { name: 'logo.png' });
    } catch (fileError) {
        logo = null;
    }

    const embed = new EmbedBuilder()
    .setAuthor({ name: 'Bot - Ping', iconURL: logo ? 'attachment://logo.png' : null })
    .addFields(
      {
        name: "Bot Latency:",
        value: "```fix\n= "+ping+" =\n```",
        inline: true,
    },
    {
        name: "Message Delay:",
        value: "```fix\n= "+Math.floor(new Date().getTime() - interaction.createdTimestamp)+"ms =\n```",
        inline: true,
    },)
    .setColor("White")
    .setFooter({ text: 'This project is licensed under the MIT License.', iconURL: logo ? 'attachment://logo.png' : null });
    interaction.reply({ embeds: [embed], 
    ...(logo && { files: [logo] }) });
  }

};
