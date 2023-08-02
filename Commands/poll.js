module.exports = {
    name: 'poll',
    description: 'Create a poll with multiple options for users to vote on.',
    execute(message, args) {
      // Check if the user has permission to manage messages (to delete the original command message)
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply("You don't have permission to use this command.");
      }
  
      // Check if the poll question and options are provided
      if (args.length < 3) {
        return message.reply('Please provide a poll question and at least two options.');
      }
  
      // Extract the poll question and options from the arguments
      const question = args.shift();
      const options = args;
  
      // Construct the poll message
      const pollMessage = [
        `**${question}**`,
        ...options.map((option, index) => `${index + 1}. ${option}`),
      ].join('\n');
  
      // Send the poll message and react to it with number emojis
      message.channel.send(pollMessage).then((sentMessage) => {
        for (let i = 0; i < options.length; i++) {
          sentMessage.react(`${i + 1}️⃣`);
        }
      });
      
      // Delete the original command message
      message.delete().catch(console.error);
    },
  };
  