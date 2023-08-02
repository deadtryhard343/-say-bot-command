module.exports = {
    name: 'userinfo',
    description: 'Display information about the mentioned user.',
    execute(message, args) {
      const member = message.mentions.members.first() || message.member;
  
      const userInfo = [
        `**User Information**`,
        `Username: ${member.user.username}`,
        `User ID: ${member.user.id}`,
        `Account Created: ${member.user.createdAt.toUTCString()}`,
        `Joined Server: ${member.joinedAt.toUTCString()}`,
        `Roles: ${member.roles.cache.map(role => role.name).join(', ')}`,
      ];
  
      message.channel.send(userInfo.join('\n'));
    },
  };
  