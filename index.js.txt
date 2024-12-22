// Import required modules
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// Create a new Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Bot token and API key
const DISCORD_TOKEN = "YOUR_DISCORD_BOT_TOKEN_HERE";
const NEWS_API_KEY = "YOUR_NEWS_API_KEY_HERE";

// Log a message when the bot is ready
client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}`);
});

// Helper function to fetch news
async function fetchNews(category) {
    const baseUrl = "https://newsapi.org/v2/top-headlines";
    const country = category === "nepal" ? "np" : "us";

    try {
        const response = await axios.get(baseUrl, {
            params: {
                apiKey: NEWS_API_KEY,
                country: country,
                category: "technology",
                pageSize: 10,
            },
        });

        const articles = response.data.articles;
        return articles.map((article, index) => `**${index + 1}. [${article.title}](${article.url})**`).join("\n");
    } catch (error) {
        console.error("Error fetching news:", error.message);
        return null;
    }
}

// Listen for messages
client.on('messageCreate', async (message) => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Command to fetch general cybersecurity news
    if (message.content.toLowerCase() === "cybersecurity news") {
        message.reply("Fetching top 10 cybersecurity news...");
        const news = await fetchNews("general");

        if (news) {
            message.reply(news);
        } else {
            message.reply("Sorry, I couldn't fetch the news at the moment.");
        }
    }

    // Command to fetch Nepal-specific cybersecurity news
    if (message.content.toLowerCase() === "nepal cybersecurity news") {
        message.reply("Fetching top 10 cybersecurity news related to Nepal...");
        const news = await fetchNews("nepal");

        if (news) {
            message.reply(news);
        } else {
            message.reply("Sorry, I couldn't fetch Nepal-specific news at the moment.");
        }
    }

    // Ping command
    if (message.content.toLowerCase() === "ping") {
        message.reply("Pong!");
    }
});

// Login to Discord with the bot token
client.login(DISCORD_TOKEN);
