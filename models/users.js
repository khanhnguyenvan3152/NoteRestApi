const mongoose = require('mongoose')
const Types = require('mongoose').Schema.Types

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    notes: Array,
    isVerified: Boolean,
    noteIds: {
        type: Types.ObjectId,
        ref: 'note'
    }
})

module.exports = mongoose.model('user',UserSchema)