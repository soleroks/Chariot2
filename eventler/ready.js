const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const moment = require('moment')
const ayarlar = require('../ayarlar.json');
const mongoose = require('mongoose')
module.exports = {
    name : "ready",
    on:true,
    async execute(on) {
    
        
		const commands = [];
			const commandFiles =  fs.readdirSync('./komutlar').filter(s => s.endsWith('.js'));
			for (const file of commandFiles) {
	

				const command = require(`../komutlar/${file}`);	
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				} else {
					console.log(`[UYARI] ${file} komutunda "data" veya "execute" argümanı eksik. ❌`);
				}
				
			
			}
		
			

	
const rest = new REST().setToken(ayarlar.token);

(async () => {
	try {
		console.log(`[İŞLEM] ${commands.length} adet komut güncellenecek. ⌛`);



		const data = await rest.put(
			Routes.applicationCommands(ayarlar.clientID, ayarlar.guildID),
			{ body: commands },
		);

		
		commands.forEach(s => {
			console.log(`⌛ - [KOMUT] - YÜKLENEN KOMUT: ${s.name} `)
		})

		await console.log(`[İŞLEM] ${data.length} adet komut güncellendi ve kullanıma hazır. ✅`);


		mongoose.connect('')
        console.log(`[CHARIOT] - Bot başarıyla başlatıldı. Alacakaranlık, hizmete hazır.`)

        
        
		
    
	} catch (error) {

		console.error(error);
	}
})();
    }}