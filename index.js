const craigslist = require('node-craigslist');
let client = new craigslist.Client({
	baseHost : 'craigslist.org',
	city : 'Seattle'
});
var result = [];
var options = {};
options = {
	category: 'sya',
	hasPic: true,
	minAsk: 600,
	maxAsk: 1000
}
client
.search(options, 'Macbook pro 2015 13')
.then((listings) => {
    // play with listings here...
    listings.sort(function(a, b){
    	return a.price-b.price
    })
    listings.forEach((listing) => {
    	client.details(listing).then((details)=>{
			result.push(listing);
    	})
    });
})
.catch((err) => {
	console.error(err);
});
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
var keyword = "";
var minPrice;
var maxPrice;
const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Search on Craiglist', 'searchCraiglist')
])

const bot = new Telegraf();
bot.start((ctx) => {
	ctx.reply('Hey there! How can I help you today')
})
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(keyboard)))
bot.action('searchCraiglist', (ctx) =>{
	// var option = {
    //     "parse_mode": "Markdown",
    //     "reply_markup": {
    //         "one_time_keyboard": true
    //     }
    // };
	// ctx.telegram.sendMessage(ctx.chat.id, "Enter the keyword deal", option).then(()=>{
	// });
	result.forEach(function(element) {
		ctx.telegram.sendMessage(ctx.chat.id, JSON.stringify(element))
	}, this);
})
bot.startPolling();

