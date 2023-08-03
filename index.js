// index.js
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = 'YOUR_BOT_TOKEN_HERE'; //join the support server in README.md if you need help
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

// Variable to track if the bot has already responded to "crazy" in this session
let hasRespondedToCrazy = false; // Set it to false, so the bot responds to "crazy" at least once make it true to disable it 

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Load commands dynamically from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  client.commands.set(command.name, command);
}

client.on('messageCreate', async (message) => {
  // Check for the word "crazy" in the message content and respond with the link
  if (!hasRespondedToCrazy && message.content.toLowerCase().includes('crazy')) {
    const videoLink = 'https://cdn.discordapp.com/attachments/989707864098615327/1130001777408872499/Crazy_i_was_crazy_once_they_locked_me_in_a_room._a_rubber_room._a_rubber_room_filled_with_rats._and_rats_make_me_crazy..._Crazy_i_was_crazy_once_they_locked_me_in_a_room._a_rubber_room._a_rubber_room_filled_with_rats._and_rats_make_me_crazy..._Crazy_i_was_crazy_once_they_locked_me_in_a_room._a_rubber_room._a_rubber_room_filled_with_rats._and_rats_make_me_crazy..._Crazy_i_was_crazy_once_they_locked_me_in_a_room._a_rubber_room._a_rubber_room_filled_with_rats._and_rats_make_me_crazy..._Crazy_i_was_crazy_on..mp4';
    message.channel.send(videoLink);
    hasRespondedToCrazy = true;

    // Reset the variable to false after a cooldown (e.g., 3 seconds)
    setTimeout(() => {
      hasRespondedToCrazy = false;
    }, 3000); // 3 seconds in milliseconds
  }

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args, PREFIX); // Pass PREFIX as a parameter
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while executing the command.');
  }
});

client.login(TOKEN);

// Export the client so it can be used in other files
module.exports = client;
