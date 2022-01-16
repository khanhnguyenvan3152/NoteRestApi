const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    notes: Array,
    isVerified: Boolean,
})

module.exports = mongoose.model('user',UserSchema)