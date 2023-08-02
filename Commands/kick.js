module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    execute(message, args) {
      // Check if the bot has the "KICK_MEMBERS" permission
      if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
        return message.reply("I don't have permission to kick members.");
      }
  
      // Check if the author has the "KICK_MEMBERS" permission
      if (!message.member.permissions.has('KICK_MEMBERS')) {
        return message.reply("You don't have permission to use this command.");
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Please mention a user to kick.');
      }
  
      if (!member.kickable) {
        return message.reply('I cannot kick this user.');
      }
  
      const reason = args.slice(1).join(' ') || 'No reason provided.';
  
      member
        .kick(reason)
        .then(() => {
          message.reply(`${member.user.tag} has been kicked from the server.`);
        })
        .catch((error) => {
          console.error(error);
          message.reply('An error occurred while kicking the user.');
        });
    },
  };
  