const { version: discordVersion, ClientUser } = require('discord.js');
const { version: nodeVersion } = require('process');

module.exports = {
  name: 'stats',
  description: 'Display statistics about the bot.',
  execute(message, args) {
    const { client } = message;

    // Get the bot's user details
    const botUser = client.user instanceof ClientUser ? client.user : null;

    const statsEmbed = {
      color: 0x0099ff, // Integer representation of the color #0099ff
      title: 'Bot Statistics',
      fields: [
        { name: 'Bot Username', value: botUser ? botUser.tag : 'Not available', inline: true },
        { name: 'Discord.js Version', value: discordVersion, inline: true },
        { name: 'Node.js Version', value: nodeVersion, inline: true },
        { name: 'Total Guilds', value: client.guilds.cache.size, inline: true },
        { name: 'Total Users', value: client.users.cache.size, inline: true },
        { name: 'Total Channels', value: client.channels.cache.size, inline: true },
      ],
      footer: { text: 'Bot made by Deads Pixel' },
    };

    message.channel.send({ embeds: [statsEmbed] });
  },
};
