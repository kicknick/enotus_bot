'use strict';
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const hdls = require('./handlers')
var data = fs.readFileSync('data.json');
data = JSON.parse(data);
var path = ['main menu']

// replace the value below with the Telegram token you receive from @BotFather
const token = "1093557617:AAHR2KBejFqGVECJc8WDBy8DM7Ay1ljVzfc";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});



let currentKeys = []
const checkKey = (key) => {
	if(key == 'Главное меню' || key == 'Назад') {
		return true
	}
	for(i in currentKeys) {
		// console.log(currentKeys[i] , key)
		if(currentKeys[i] == key){
			return true
		}
	}
	return false
}


const createKeyboard = (path) => {
	const keys = hdls.getListOfButtons(hdls.getDataByPath(path, data))
	// console.log(keys)
	currentKeys = keys
	let res = []
	for(let i in keys) {
		res.push([{text: keys[i], callback_data: keys[i]}])
	}
	res.push([{text: '🗂 Главное меню', callback_data: 'Главное меню'}, {text: '⬅️ Назад', callback_data: 'Назад'}])
	return {
	  reply_markup: JSON.stringify({
	    inline_keyboard: res
	  })
	}
}


// console.log(hdls.putToPath("aaa", path))

bot.onText(/\/start/, function (msg, match) {
	const options = createKeyboard(path)
	let txt = "Главное меню"
	// console.log(options)
	bot.sendMessage(msg.chat.id, txt, options).catch(e => {
			console.log("errr", e)
		})
});

bot.on('callback_query', function (msg) {
  const answer = msg.data

  // console.log("keys:", currentKeys,answer,  checkKey(answer))

  if(checkKey(answer)) {
		path = hdls.onButtonClick(answer, path)
		console.log(path)
		const options = createKeyboard(path)
		// console.log(options)
		let txt = answer
		let d = hdls.getDataByPath(path, data)
		// console.log("data ", d)
		if(typeof d == 'string') {
			txt = d
		}

		// if(prevPath != path) {
			bot.sendMessage(msg.from.id, txt, options)
	}
})


bot.on("polling_error", (err) => console.error("err", err));







