const mongoose = require('mongoose')
const Types = require('mongoose').Schema.Types
const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    color:{
        light: String,
        dark: String
    },
    owner:{
        ref:'user',
        type: Types.ObjectId,
    }
},{timestamps: true})

module.exports = mongoose.model('note',NoteSchema)