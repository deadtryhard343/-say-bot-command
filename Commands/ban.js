module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply("You don't have permission to use this command.");
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply('Please mention a user to ban.');
      }
  
      if (!member.bannable) {
        return message.reply('I cannot ban this user.');
      }
  
      const reason = args.slice(1).join(' ') || 'No reason provided.';
  
      member
        .ban({ reason })
        .then((bannedMember) => {
          message.reply(`${bannedMember.user.tag} has been banned.`);
        })
        .catch((error) => {
          console.error(error);
          message.reply('An error occurred while banning the user.');
        });
    },
  };
  