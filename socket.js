const Note = require('./models/notes')
const User = require('./models/users')
const { Types } = require('mongoose')
module.exports = function (io) {
    io.on("connection", (socket) => {
        console.log("socket connected:", socket.id)
        socket.on('client:getNotes', async function (uid) {
            console.log(uid)
            let notes = await getNote(uid)
            socket.emit("server:sendNotes", notes)
        })
        socket.on('client:addNote', async function (uid) {
            let note = await newNote(uid);
            console.log(note)
            socket.emit('server:newNote', note)
        })
        socket.on('client:deleteNote', async function ( {uid, noteId} ) {
            await deleteNote(uid, noteId)
        })
        socket.on('client:updateNote',async function({id,title,content,color}){
            console.log('update')
            await updateNote(id,title,content,color)
        })
    })

    const getNote = async function (uid) {
        try {
            let result = await User.findById(uid).populate('notes').select('notes').exec()
            return result.notes;
        } catch (err) {
            console.log(err)
        }
    }
    const newNote = async function (uid) {
        try {
            let note = new Note({ title: "", content: "", color: { dark: "#C4C4C4", light: "#D8D4D4" } })
            let user = await User.findById(uid)
            user.notes.push(note._id);
            await Promise.all([note.save(), user.save()])
            console.log(user.notes)
            return note;
        } catch (err) {
            console.log(err)
        }
    }
    const deleteNote = async function (uid, noteId) {
        try {
            const noteObjectId = Types.ObjectId(`${noteId}`)
            let user = await User.findById(uid);
            let newNotes = user.notes.filter(id => {
                return id!=noteObjectId
            })
            user.notes = newNotes;
            await Promise.all([user.save(), Note.findByIdAndRemove(noteId)])
        } catch (err) {
            console.log(err)
        }
    }
    const updateNote = async function(noteId,title,content,color){
        try{
            let note = await Note.findById(noteId)
            note.title = title;
            note.content = content;
            note.color.dark = color.dark;
            note.color.light = color.light;
            console.log(note);
            await note.save()
        }catch(err){
            console.log(err);
        }
    }
}