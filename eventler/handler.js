const { Events, Collection, EmbedBuilder } = require('discord.js');
const moment = require('moment')
moment.locale('tr')
module.exports = {
	name: Events.InteractionCreate,
	on:true,
	async execute(interaction) {
		

		if (interaction.isChatInputCommand()) {

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`${interaction.commandName} bu isimde bir komut yok!`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`${interaction.commandName} komutunu çalıştırırken bir hata meydana geldi. Hata konsola kaydedildi ve geliştiriciye iletildi.`);
			interaction.client.users.cache.get('966439765966741514').send(`Chariot ${moment(Date.now()).format('hh:mm:ss a DD/MM/YYYY')} tarihinde ${interaction.commandName} komutunu kullanırken \n${error}\nhatasıyla karşılaştı. pm2 logundan kontrol ediniz.`)
			console.error(error);
		}
	}
	

	},
};