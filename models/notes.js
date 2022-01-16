const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    userId: String,
    title: String,
    content: String,
    color:{
        light: String,
        dark: String
    }
},{timestamps: true})

module.exports = mongoose.model('note',NoteSchema)