import { angryEmojis, confusedEmojis, sadEmojis, happyEmojis } from "./faces.js";
import { angryResponses, confusedResponses, sadResponses, advice } from "./responses.js";

export const greetingFace = (emojis) => emojis[Math.floor(Math.random() * emojis.length)];

export const botReply = (username, responses) => {
  return `${username}, ${responses[Math.floor(Math.random() * responses.length)]} ( ͡° ͜ʖ ͡°)`
};

export const botReplyAdvice = (advice) => advice[Math.floor(Math.random() * advice.length)];

const handleMood = async (message, emojis, responses, advice) => {
  // console.log("how many times?");
  message.channel.send(greetingFace(emojis));
  message.reply(botReply(message.author.username, responses));
  message.reply(botReplyAdvice(advice));
};

export const handleReply = async (message, mood) => {
  return await {
    "$angry": handleMood(message, angryEmojis, angryResponses, advice),
    "$confused": handleMood(message, confusedEmojis, confusedResponses, advice),
    "$sad": handleMood(message, sadEmojis, sadResponses, advice)
  }[mood]
};