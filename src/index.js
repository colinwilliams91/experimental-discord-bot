import { Client, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
dotenv.config();


import { angryEmojis, confusedEmojis, sadEmojis, happyEmojis } from "../utils/faces.js";
import { angryResponses, confusedResponses, sadResponses, advice } from "../utils/responses.js";
import { greetingFace, botReply, botReplyAdvice, handleReply } from "../utils/helpers.js";

/**
 * @description This array represents the categories of Events we want available to our Bot.
 * @argument: `IntentsBitField.Flags.Guilds`
 * @satisfies Intents with "Guilds" flags facilitates Server access
 * @argument: `IntentsBitField.Flags.MessageContent`
 * @satisfies "MessageContent" permits your app to receive message content data across the APIs.
 * @see https://discord.com/developers/docs/topics/gateway#message-content-intent
 */
const intentOptions = [
  IntentsBitField.Flags.Guilds,        // <-- server
  IntentsBitField.Flags.GuildMembers,  // <-- members in server
  IntentsBitField.Flags.GuildMessages, // <-- messages in server
  IntentsBitField.Flags.MessageContent // <-- messages content
];

/**
 * @class: `Client` from discord.js
 * @instance: `client` is our Bot instance
 * @argument: must take in an options object with `intents` array, all other properties are optional
 *
 * @method: `.on("event" callback)` for bot event handling
 */
const client = new Client({
  intents: intentOptions
});

/**
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * ^^^^^^^^^^  ^^^ REGEX ^^^  ^^^^^^^^^^
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 */

const emojiRegex = /:[a-zA-Z_]+:/g;

/**
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * ^^^^^^^^^^ EVENT LISTENERS ^^^^^^^^^^
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 */

/**
 * @see https://old.discordjs.dev/#/docs/discord.js/main/general/welcome
 * @description: for BOT API documentation
 */

client.on("ready", (bot) => {
  console.log(`✅ ${bot.options.rest.authPrefix} ${bot.user.tag} is online! Listening to channels: ${bot.channels}`);
  // message.channel.send("Hi, please send $angry, $sad, or $confused to interact with me ( ͡° ͜ʖ ͡°)")
});

client.on("messageCreate", (message) => {
  /* this validation disallows bots from responding to each other/themselves, remove at your own risk 💀 */
  if (message.author.bot) return;
  let executed = false;

  /* this validation will delete a targetted user's message and replace it with a given message */
  // if (message.author.username = "target_username") {
  //   message.delete();
  //   message.channel.send(`${message.author.username} is a fart-sniffer (☞ﾟヮﾟ)☞`);
  // }

  /* custom "$" prepended commands " */
  // if (message.content.startsWith("$angry")) {
  //   message.channel.send(greetingFace(angryEmojis));
  //   message.reply(botReply(message.author.username, angryResponses));
  //   message.reply(botReplyAdvice(advice));
  // }
  if (message.content.startsWith("$angry") && !executed) {
    console.log("how many times?");
    handleReply(message, "$angry");
    executed = true;
  }
  if (message.content.startsWith("$confused") && !executed) {
    handleReply(message, "$confused");
    executed = true;
  }
  if (message.content.startsWith("$sad") && !executed) {
    handleReply(message, "$sad");
    executed = true;
  }

  /* message sent in server from any user: */
  console.log(`Discord message: "${message.content}" from User: ${message.author.username} at ${message.createdAt}`);

  /* bot will react to any message sent with this emoji */
  message.react('🤓');
});

client.login(process.env.TOKEN);
