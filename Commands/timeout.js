const ms = require('ms');

module.exports = {
  name: 'timeout',
  description: 'Temporarily restrict a user for a specified duration to prevent them from talking.',
  async execute(message, args) {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply("You don't have permission to use this command.");
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Please mention a user to put in timeout.');
    }

    if (!member.kickable) {
      return message.reply('I cannot put this user in timeout.');
    }

    const duration = args[1];
    if (!duration) {
      return message.reply('Please provide a duration for the timeout.');
    }

    const reason = args.slice(2).join(' ') || 'No reason provided.';

    // Get the duration in milliseconds using the 'ms' library
    const durationMs = ms(duration);
    if (isNaN(durationMs)) {
      return message.reply('Invalid duration format. Please use a valid format (e.g., 1d, 2h, 30m).');
    }

    const timeoutRoleName = 'Timeout'; // Name of the role to be added during timeout
    let timeoutRole = message.guild.roles.cache.find(role => role.name === timeoutRoleName);

    if (!timeoutRole) {
      try {
        // Create the role if it doesn't exist
        timeoutRole = await message.guild.roles.create({
          name: timeoutRoleName,
          color: '#ff0000',
          permissions: [], // You can set specific permissions for the role here if needed
        });
      } catch (error) {
        console.error('Error creating the timeout role:', error);
        return message.reply('An error occurred while creating the timeout role.');
      }
    }

    try {
      // Add the timeout role to the member
      await member.roles.add(timeoutRole);
    } catch (error) {
      console.error('Error adding the timeout role:', error);
      return message.reply('An error occurred while adding the timeout role.');
    }

    setTimeout(async () => {
      try {
        // Remove the timeout role after the duration
        await member.roles.remove(timeoutRole);
        message.reply(`${member.user.tag} has been released from timeout.`);
      } catch (error) {
        console.error('Error removing the timeout role:', error);
        return message.reply('An error occurred while removing the timeout role.');
      }
    }, durationMs);

    message.reply(`${member.user.tag} has been put in timeout for ${duration}.`);

    // Optionally, you can log the timeout information to a separate channel or a log file.
  },
};
