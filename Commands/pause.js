module.exports = {
    name: 'pause',
    description: 'Pause the currently playing music.',
    execute(message, args) {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel || message.guild.me.voice.channel !== voiceChannel) {
        return message.reply('You need to be in the same voice channel as me to pause the music.');
      }
  
      const dispatcher = voiceChannel.connection?.dispatcher;
      if (!dispatcher || dispatcher.paused) {
        return message.reply('There is no music playing or the music is already paused.');
      }
  
      dispatcher.pause();
      message.channel.send('Paused the music.');
    },
  };
  