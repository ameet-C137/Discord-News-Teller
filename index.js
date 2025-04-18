require('dotenv').config({ path: './config.env' });
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

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
    console.log(`Bot is online as ${client.user.tag}`);
});

async function fetchNews(countryCode = "us") {
    const url = "https://newsapi.org/v2/top-headlines";

    try {
        const { data } = await axios.get(url, {
            params: {
                apiKey: NEWS_API_KEY,
                country: countryCode,
                category: "technology",
                pageSize: 10,
            },
        });

        if (!data.articles.length) return "No news found.";
        return data.articles
            .map((article, i) => `**${i + 1}. [${article.title}](${article.url})**`)
            .join("\n");
    } catch (err) {
        console.error("Error fetching news:", err.message);
        return "Error fetching news.";
    }
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content === "ping") {
        return message.reply("Pong!");
    }

    if (content === "cybersecurity news") {
        message.reply("Fetching top cybersecurity news...");
        const news = await fetchNews("us");
        return message.reply(news);
    }

    if (content === "nepal cybersecurity news") {
        message.reply("Fetching Nepal cybersecurity news...");
        const news = await fetchNews("np");
        return message.reply(news);
    }
});

client.login(DISCORD_TOKEN);
