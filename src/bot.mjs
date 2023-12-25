import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
const WebUrlit='https://rococo-wisp-b5b1a7.netlify.app/';


bot.on('/form', msg => {

    let replyMarkup = bot.keyboard([
        [bot.button('form', 'Formed')]
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Button example.', {replyMarkup});

});


bot.on('/start', async (msg) => {
    const chatId = msg.from.id;

    // await bot.sendMessage(msg.from.id,bot.keyboard([['form']], {resize: true}))

    let replyMarkup = bot.inlineKeyboard([[bot.inlineButton('url', {url: 'https://rococo-wisp-b5b1a7.netlify.app/'})]]);
    
    await bot.sendMessage(msg.from.id, 'Check up:', {replyMarkup});

    // if (msg?.web_app_data?.data) {
    //     try {
    //         const data=JSON.parse(msg?.web_app_data?.data)

    //         await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
    //         await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)
    //         await bot.sendMessage(chatId, 'Спасибо за форму!')

    //         setTimeout(async ()=>{
    //             await bot.sendMessage(chatId,'Всю  ифнормацию можно получить по... Никак!');
    //         }, 3000)

    //     }catch(e){
    //         console.log(e);
    //     }

        
    // }
});


export default bot