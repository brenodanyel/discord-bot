import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { env } from "./env";
import { GPTIntegrationModule } from "./modules/gpt-integration";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.login(env.DISCORD_TOKEN);

client.on("ready", (bot) => {
  console.log(`Logged in as ${bot.user.tag}!`);

  new GPTIntegrationModule(bot);
});
