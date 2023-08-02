module.exports = {
  name: 'help',
  description: 'Show a list of available commands.',
  execute(message, args) {
    const { commands } = message.client;

    const helpMessage = [
      'List of available commands:',
      '```',
      ...commands.map(command => `${command.name} - ${command.description}`).sort(),
      '```',
    ];

    message.channel.send(helpMessage.join('\n'));
  },
};
