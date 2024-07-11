const Discord = require('discord.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName('ping')
    .setDescription('[DEVELOPER] botun pingini ölçer.'),
    async execute(interaction) {
        interaction.reply(`Pong! ${interaction.client.ws.ping}`)
    }
}