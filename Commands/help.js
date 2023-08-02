// help.js
module.exports = {
  name: 'help',
  description: 'List all available commands.',
  // Add the cooldown property (in seconds) for this command (e.g., 3 seconds cooldown)
  cooldown: 3,
  execute(message, args, PREFIX) { // Receive PREFIX as a parameter
    const { client } = message;
    const { commands } = client;

    const helpMessage = [
      '**Commands List**',
      `Use \`${PREFIX}<command>\` to use a command.\n`,
      commands.map((command) => `\`${PREFIX}${command.name}\`: ${command.description || 'No description available.'}`).join('\n'),
      
    ];

    message.channel.send(helpMessage.join('\n'));
  },
};
