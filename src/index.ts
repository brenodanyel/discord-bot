import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { Commands } from "./resources/commands";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.login(String(process.env.TOKEN));

client.on("ready", (bot) => {
  console.log(`Logged in as ${bot.user.tag}!`);
  new Commands(client);
});
