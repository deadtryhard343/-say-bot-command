module.exports = {
    name: 'say',
    description: 'Make the bot say something.',
    execute(message, args) {
      const text = args.join(' ');
      if (!text) {
        message.reply('Please provide some text for me to say!');
      } else {
        message.channel.send(text);
        message.delete().catch(console.error);
      }
    },
  };
  