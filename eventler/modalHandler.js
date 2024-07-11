const Discord = require('discord.js')
const moment = require('moment')

moment.locale('tr')
module.exports = {
    name: Discord.Events.InteractionCreate,
    on:true,
    async execute(interaction) {
        
        if(interaction.isModalSubmit()) {

        }
  
    }
}

// EMBED DÜZENLENECEK.