import * as Discord from "discord.js";
import "dotenv/config";
import { env } from "./env";
import { GPTIntegrationModule } from "./modules/gpt-integration/gpt-integration.module";

const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent],
});

client.login(env.DISCORD_TOKEN);

client.on("ready", (bot) => {
  console.log(`Logged in as ${bot.user.tag}!`);

  new GPTIntegrationModule(bot);
});
