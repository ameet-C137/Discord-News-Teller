# Discord-News-Teller
Discord Cybersecurity News Bot

This is a Discord bot that provides the latest cybersecurity news. It supports the following features:
Fetching the top 10 global cybersecurity news articles.
Fetching the top 10 cybersecurity news articles related to Nepal.
Responding to the ping command with Pong!.

The bot fetches news using the News API and interacts with users in Discord servers.

Installation
Prerequisites

Node.js installed on your system (v16 or higher).
A Discord account and a bot token. You can create a bot on the Discord Developer Portal.
A News API key from newsapi.org.


Steps

Clone this repository or copy the files.
Install the dependencies by running:
npm install discord.js axios
Replace YOUR_DISCORD_BOT_TOKEN_HERE and YOUR_NEWS_API_KEY_HERE in index.js with your actual Discord bot token and News API key.
Start the bot by running:
node index.js


Usage
Commands

Ping: Type ping in any channel the bot has access to. The bot will reply with Pong!.
Global Cybersecurity News: Type cybersecurity news. The bot will fetch the top 10 global cybersecurity news articles and display them with links.
Nepal Cybersecurity News: Type nepal cybersecurity news. The bot will fetch the top 10 cybersecurity news articles related to Nepal and display them with links
