module.exports = {
    name: 'serverinfo',
    description: 'Display information about the current server.',
    execute(message, args) {
      // Check if the message is sent in a guild (server)
      if (!message.guild) {
        return message.reply('This command can only be used in a server (guild).');
      }
  
      const server = message.guild;
      const owner = server.owner;
  
      if (!owner) {
        return message.reply('Unable to fetch the server owner information. May not have perms :/');
      }
  
      const serverInfo = [
        `**Server Information**`,
        `Server Name: ${server.name}`,
        `Server ID: ${server.id}`,
        `Created: ${server.createdAt.toUTCString()}`,
        `Members: ${server.memberCount}`,
        `Owner: ${owner.user ? owner.user.tag : 'Unknown'} (ID: ${owner.id})`,
        `Region: ${server.region}`,
      ];
  
      message.channel.send(serverInfo.join('\n'));
    },
  };
  