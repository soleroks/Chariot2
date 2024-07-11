const mongoose = require('mongoose')

let Member = new mongoose.Schema({
    userID: String,
    guildID: String,
   // Kendi DB alanlarınızı ekleyin.
})