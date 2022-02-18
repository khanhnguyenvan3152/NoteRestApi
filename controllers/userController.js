const collection = require('../models/users')
const noteCollection = require('../models/notes')
const bcrypt = require('bcryptjs')
const salt = 12
const mailer = require('../mailer');
const notes = require('../models/notes');
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
        let isEmailExist = await collection.exists({ email: email })
        if (isUsernameExist == true) {
            res.status(400).json({ status: 'error', message: 'Username is already in used' })
            return;
        }
        if (isEmailExist == true) {
            res.status(400).json({ status: 'error', message: 'Email is already in use' })
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

const changePassword = async function (req, res, next) {
    try {
        let userId = req.params.id;
        let { currentPassword, newPassword } = req.body;
        const user = await collection.findById(userId)
        let isValidated = await bcrypt.compare(currentPassword, newPassword);
        if (isValidated) {
            let newHashedPassword = await bcrypt.hash(newPassword, salt)
            user.password = newHashedPassword
            let result = await user.save()
            res.status(200).json({ staus: 'success', result: result })
        }
        else {
            res.status(400).json({ status: 'fail', message: 'Current password does not match' })
        }

    } catch (err) {
        res.status(400).json({ status: 'error', message: 'Something gone wrong!' })
    }
}

const addNote = async function (req, res, next) {
        var userId = req.params.id
        console.log(userId)
        collection.exists({ _id: userId }).then(async (result) => {
            if (result == true) {
                const user = await collection.findById(req.params.id)
                let { title, content, light, dark, userId } = req.body
                let note = await noteCollection.create({
                    title,
                    content,
                    color: {
                        light,
                        dark
                    },
                    owner: userId
                })
                user.notes.push(note._id)
                await user.save();
                return res.status(200).json({ status: 'success', note })
            }else{
               return res.status(406).json({ status: 'error', message: 'User does not exist' })
            }
        })
}

const getListNoteIdsFromUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        const notes = await collections.find({ _id: userId }, 'notes')
        res.status(200).json({ status: 'success', result: { _id: userId, notes } })
    } catch (err) {
        res.status(400).json({ status: 'error', message: 'error' })
    }
}

const getListNote = async (req, res, next) => {
    const userId = req.params.id
    try {
        let isUserExist = await collection.exists({ '_id': userId })
        if (isUserExist) {
            const result = await collection.findById(userId).populate('notes')
            res.status(200).json({ success: true, notes: result.notes })
        }
    } catch (err) {

    }

}

const deleteUser = async function (req, res, next) {


}

module.exports = { list, addUser, getUser, verifyUser, changePassword, getListNoteIdsFromUser, getListNote, addNote }