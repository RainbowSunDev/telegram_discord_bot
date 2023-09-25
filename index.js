require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Client, GatewayIntentBits, Partials, Events, interaction } = require('discord.js');

const telegramToken = process.env.TELEGRAMBOT_TOKEN;
console.log("telegrambottoken:", telegramToken);
const telegramBot = new TelegramBot(telegramToken, { polling: true });

const DISCORD_CHANNEL_ID="1114813144842387469";
const TELEGRAM_CHANNEL_ID="-1001942127180";

const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
    partials: [Partials.Channel],
  });
// console.log('telegramBot:',telegramBot);
telegramBot.on('channel_post', (msg) => {
    if (msg.chat.type === 'channel') {
        console.log("msgtype:", msg.chat.type)
        console.log("discordClient.channels:", discordClient.channels)
        const discordChannel = discordClient.channels.cache.get(DISCORD_CHANNEL_ID);
        console.log("discordChannel:", discordChannel)

        discordChannel.send(`Message from Telegram: ${msg.text}`);
    }
    // const chatId = msg.chat.id;
    // telegramBot.sendMessage(chatId, 'Hello, World!');
  });



// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
discordClient.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


discordClient.on(Events.MessageCreate, async message => {
    // Ignore messages from non-bots and from the bot itself
    if (message.author.bot ) {
        return;
    }
    console.log("messageCreate");
    telegramBot.sendMessage(TELEGRAM_CHANNEL_ID, `Response from Discord: ${message.content}`);

    // if (message.author.bot && message.content.includes('Response or some identifier')) {
    //     telegramBot.sendMessage(TELEGRAM_CHANNEL_ID, `Response from Discord: ${message.content}`);
    // }
});
discordClient.on(Events.MessageUpdate, message => {
    console.log("messageUpdate");
})

discordClient.login(process.env.BOT_TOKEN);

