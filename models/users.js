const mongoose = require('mongoose')
const Types = require('mongoose').Schema.Types
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    notes: [{type:Types.ObjectId,ref:'note'}],
    isVerified: {
        type: Boolean,
        default: false
    },
    roles: [{type:String,default:'user'}],
    password: String,

})

UserSchema.methods.checkPassword = async function(password){
    let isValid = await bcrypt.compare(password,this.password)
    console.log(isValid)
    return isValid;
}
module.exports = mongoose.model('user',UserSchema)