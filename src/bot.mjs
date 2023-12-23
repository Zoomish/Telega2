import TeleBot from "telebot"

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
const WebUrlit='https://rococo-wisp-b5b1a7.netlify.app/';

bot.on('/start', async (msg) => {
    const chatId = msg.from.id;
    const text=msg.text;
        await bot.sendMessage(chatId,'Down', {
            inlineKeyboard:[
                inlineButton[[{text:'Заполнить форму', web_app: {url: WebUrlit + 'form'}}]]
            ]
            
        })


        await bot.sendMessage(chatId,'Check up:', {
            reply_markup:{
                inline_keyboard:[
                    [{text:'Make a check up', web_app: {url: WebUrlit}}]
                ]
            }
        })

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

bot.on(['/start', '/back'], msg => {

    let replyMarkup = bot.keyboard([
        ['/buttons', '/inlineKeyboard'],
        ['/start', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Keyboard example.', {replyMarkup});

});

// Buttons
bot.on('/buttons', msg => {

    let replyMarkup = bot.keyboard([
        [bot.button('contact', 'Your contact'), bot.button('location', 'Your location')],
        ['/back', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Button example.', {replyMarkup});

});

// Hide keyboard
bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Hide keyboard example. Type /back to show.', {replyMarkup: 'hide'}
    );
});

// On location on contact message
bot.on(['location', 'contact'], (msg, self) => {
    return bot.sendMessage(msg.from.id, `Thank you for ${ self.type }.`);
});

// Inline buttons
bot.on('/inlineKeyboard', msg => {

    let replyMarkup = bot.inlineKeyboard([
        [
            bot.inlineButton('callback', {callback: 'this_is_data'}),
            bot.inlineButton('inline', {inline: 'some query'})
        ], [
            bot.inlineButton('url', {url: 'https://telegram.org'})
        ]
    ]);

    return bot.sendMessage(msg.from.id, 'Inline keyboard example.', {replyMarkup});

});

// Inline button callback
bot.on('callbackQuery', msg => {
    // User message alert
    return bot.answerCallbackQuery(msg.id, `Inline button callback: ${ msg.data }`, true);
});

// Inline query
bot.on('inlineQuery', msg => {

    const query = msg.query;
    const answers = bot.answerList(msg.id);

    answers.addArticle({
        id: 'query',
        title: 'Inline Query',
        description: `Your query: ${ query }`,
        message_text: 'Click!'
    });

    return bot.answerQuery(answers);

});
export default bot