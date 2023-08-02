const { Client, GatewayIntentBits } = require('discord.js');

const TOKEN = 'YOUR_BOT_TOKEN';   //Put your bot token there between the '
const PREFIX = '!'; // Replace '!' with your desired prefix

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    const text = args.join(' ');
    if (!text) {
      await message.reply('Please provide some text for me to say!');
    } else {
      await message.channel.send(text);

      // Delete the command message after executing the command, Needs manage messege perms
      message.delete().catch(console.error);
    }
  }
});

client.login(TOKEN);
