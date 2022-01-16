const collection = require('../models/users')
const bcrypt = require('bcrypt')
const salt = 12
const mailer = require('../mailer')
//Utils
function makeVerifyCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

//CRUD
const list = async function (req, res) {
    let result = await collection.find()
    res.status(200).json({ status: 200, result })
}

const addUser = async function (req, res, next) {
    let { username, email, password } = req.body;
    try {
        let hashedPassword = await bcrypt.hash(password, salt)
        let isUsernameExist = await collection.exists({ username: username })
        if(isUsernameExist == true){
            res.status(400).json({status:'error', message:'Username is used'})
            return;
        }
        let user = await collection.create({
            username: username,
            password: hashedPassword,
            email: email,
            notes: [],
            isVerified: false
        }
        )
        await mailer.sendVerifyMail(user._id, email)
        res.status(200).json({ user: user })

    } catch (err) {
        console.log(err)
        res.status(401).json({ error: err })
    }
}

const getUser = async function (req, res, next) {
    let id = req.params.id
    try {
        let user = await collection.findById(id)
        res.status(200).json({ user })
    } catch (err) {
        res.status(400).json({ err })
    }
}

const verifyUser = async function (req, res, next) {
    try {
        let userId = req.params.id;
        let user = await collection.findById(userId);
        if (user.isVerified == false) {
            user.isVerified = true
        }
        await user.save()
        res.status(200).json({ status: 'success', user })
    } catch (err) {
        res.staus(400).json({ err })
    }

}


module.exports = { list, addUser, getUser, verifyUser }