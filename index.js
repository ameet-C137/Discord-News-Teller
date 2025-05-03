const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}`);
});

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

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content === "cybersecurity news") {
        message.reply("Fetching top 10 cybersecurity news...");
        const news = await fetchNews("general");
        message.reply(news || "Sorry, I couldn't fetch the news.");
    }

    if (content === "nepal cybersecurity news") {
        message.reply("Fetching top 10 cybersecurity news related to Nepal...");
        const news = await fetchNews("nepal");
        message.reply(news || "Sorry, I couldn't fetch Nepal-specific news.");
    }

    if (content === "ping") {
        message.reply("Pong!");
    }
});

client.login(DISCORD_TOKEN);
