import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
const WebUrlit='https://rococo-wisp-b5b1a7.netlify.app/';

bot.on('/start', async (msg) => {
    const chatId = msg.from.id;
    const text=msg.text;
    if (text==='/start'){
        await bot.sendMessage(chatId,'Down', {
            reply_markup:{
                keyboard:[
                    [{text:'Заполнить форму', web_app: {url: WebUrl + 'form'}}]
                ]
            }
        })


        await bot.sendMessage(chatId,'Check up:', {
            reply_markup:{
                inline_keyboard:[
                    [{text:'Make a check up', web_app: {url: WebUrl}}]
                ]
            }
        })
    }

    if (msg?.web_app_data?.data) {
        try {
            const data=JSON.parse(msg?.web_app_data?.data)

            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)
            await bot.sendMessage(chatId, 'Спасибо за форму!')

            setTimeout(async ()=>{
                await bot.sendMessage(chatId,'Всю  ифнормацию можно получить по... Никак!');
            }, 3000)

        }catch(e){
            console.log(e);
        }

        
    }
});
export default bot