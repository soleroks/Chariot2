// SOLEROKS/CHARIOT 2.1
/**
 * Sürüm: Chariot2.1
 * Uyumluluk: Chariot 1.3 ile tamamen uyumludur.
 * Kullanıma hazır: ✅
 * Licence: GPL-2.0
 * GitHub: github.com/soleroks
 * Discord: discord.gg/Tdn3U4dFut
 * Kanal: Genel Kullanım (Sürüm veya Ek Chariot kütüphanesi içermez. Sadece bot altyapısını içerir.)
 * 
 */

// IMPORT

const Discord = require('discord.js')
const ayarlar = require('./ayarlar.json')
const fs = require('fs')
const mongoose = require('mongoose')
const path = require('path')

// DEF
const allIntents = new Discord.IntentsBitField(3276799)

const client = new Discord.Client({intents: allIntents})
// HANDLER
const eventsPath = path.join(__dirname, 'eventler');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if(event.name) {
		console.log(`[EVENT] - ${event.name} eventi ${file} dosyasından başarıyla yüklendi. ✅`)
	}
	else if(!event.name) {
		console.log(`[EVENT] - ${file} dosyasında bir problem mevcut. event yüklenmedi. ❌`)
	}
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'komutlar');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[UYARI] ${filePath} yolundaki komut "data" veya "execute" argümanı içermiyor. ℹ`);
	}
}



// API

client.login(ayarlar.token)
