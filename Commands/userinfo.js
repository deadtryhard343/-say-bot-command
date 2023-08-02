const { PREFIX } = require('../index');

// Create a collection to store the user cooldowns
const userCooldowns = new Map();

module.exports = {
  name: 'userinfo',
  description: 'Display information about the mentioned user.',
  cooldown: 3, // Cooldown period in seconds
  execute(message, args) {
    const member = message.mentions.members.first() || message.member;

    // Check if the user is on cooldown
    if (userCooldowns.has(message.author.id)) {
      const cooldownExpiration = userCooldowns.get(message.author.id);
      const remainingCooldown = (cooldownExpiration - Date.now()) / 1000;

      if (remainingCooldown > 0) {
        return message.reply(`Please wait ${remainingCooldown.toFixed(1)} more seconds before using this command again.`);
      }
    }

    // If not on cooldown or cooldown has passed, execute the command
    const userInfo = [
      `**User Information**`,
      `Username: ${member.user.username}`,
      `User ID: ${member.user.id}`,
      `Account Created: ${member.user.createdAt.toUTCString()}`,
      `Joined Server: ${member.joinedAt.toUTCString()}`,
      `Roles: ${member.roles.cache.map(role => role.name).join(', ')}`,
    ];

    message.channel.send(userInfo.join('\n'));

    // Set the user on cooldown
    userCooldowns.set(message.author.id, Date.now() + this.cooldown * 1000);

    // Remove the cooldown entry after the cooldown period has passed
    setTimeout(() => {
      userCooldowns.delete(message.author.id);
    }, this.cooldown * 1000);
  },
};
