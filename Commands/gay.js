module.exports = {
    name: 'gay',
    description: 'Check how gay you are.',
    execute(message, args) {
      // Generate a random gayness percentage (between 0 and 100)
      const coolnessPercentage = Math.floor(Math.random() * 101);
  
      message.channel.send(`${message.author.username}, you are ${coolnessPercentage}% gay! :rainbow:`);
    },
  };
  