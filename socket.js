const Note = require('./models/notes')
const User = require('./models/users')

module.exports = function (io) {
    io.on("connection", (socket) => {
        console.log("socket connected:", socket.id)
        socket.on('client:getNotes',async function (uid){
            console.log(uid)
            let notes = await getNote(uid)
            socket.emit("server:sendNotes",notes)
        })
        socket.on('client:addNote',async function(uid){
            let note = await newNote(uid);
            socket.emit('server:newNote',note)
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
    const newNote = async function(uid){
        try{
            let note = await new Note({title:"",content: "",color:{dark:"#C4C4C4",light:"#D8D4D4"}})
            let user = await User.findById(uid)
            user.notes.push(note._id);
            await user.save()
            return note;
        }catch(err){
            console.log(err)
        }
    }
}