const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Replace with your bot token
const PREFIX = '!';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Create a collection to store the commands
client.commands = new Collection();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Load commands dynamically from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  client.commands.set(command.name, command);

  // Ensure the description is set for each command
  if (!command.description) {
    command.description = 'No description available.';
  }
}

// Export the PREFIX and client so they can be used in other files
module.exports = {
  client,
  PREFIX,
};

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while executing the command.');
  }
});

client.login(TOKEN);
