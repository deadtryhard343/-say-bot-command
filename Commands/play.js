const { VoiceChannel } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  description: 'Play music in a voice channel.',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to play music.');
    }

    if (message.guild.me.voice.channel && message.guild.me.voice.channel !== voiceChannel) {
      return message.reply('You need to be in the same voice channel as me to play music.');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.reply('I need the permissions to join and speak in your voice channel.');
    }

    if (!args[0]) {
      return message.reply('You must provide a YouTube URL to play.');
    }

    const connection = await voiceChannel.join();
    const stream = ytdl(args[0], { filter: 'audioonly' });
    const dispatcher = connection.play(stream);

    dispatcher.on('start', () => {
      message.channel.send(`Now playing: ${args[0]}`);
    });

    dispatcher.on('finish', () => {
      voiceChannel.leave();
    });

    dispatcher.on('error', (err) => {
      console.error(err);
      message.channel.send('Error while playing the music.');
      voiceChannel.leave();
    });
  },
};
