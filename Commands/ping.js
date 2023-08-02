module.exports = {
    name: 'ping',
    description: 'Check the bot\'s response time to Discord.',
    execute(message, args) {
      message.channel.send('Pinging...').then(sentMessage => {
        const ping = sentMessage.createdTimestamp - message.createdTimestamp;
        sentMessage.edit(`Pong!:ping_pong: Bot latency is ${ping}ms, API latency is ${message.client.ws.ping}ms.`);
      });
    },
  };
  