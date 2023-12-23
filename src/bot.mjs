import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
const WebUrl='https://rococo-wisp-b5b1a7.netlify.app/';

bot.on('/hello', (msg) => {
    return bot.sendMessage(msg.from.id, `Hello, ${msg.from.first_name}!`);
  });
bot.on(['/start', 'audio', 'sticker'], msg => {
  return bot.sendMessage(msg.from.id, 'Bam!');
});
bot.on('/start', async msg => {
    await bot.sendMessage(msg.from.id,'Down')
});
export default bot