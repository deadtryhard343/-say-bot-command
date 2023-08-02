module.exports = {
    name: 'stop',
    description: 'Stop playing music and leave the voice channel.',
    execute(message, args) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel || message.guild.me.voice.channel !== voiceChannel) {
        return message.reply('You need to be in the same voice channel as me to stop the music.');
      }
  
      const dispatcher = voiceChannel.connection?.dispatcher;
      if (!dispatcher || dispatcher.destroyed) {
        return message.reply('There is no music playing.');
      }
  
      dispatcher.destroy();
      voiceChannel.leave();
      message.channel.send('Stopped the music and left the voice channel.');
    },
  };
  