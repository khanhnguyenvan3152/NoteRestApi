const socket = io.connect()
const uid = window.localStorage.getItem('userId')

export function addNote() {
    socket.emit('client:addNote', uid)
}

export function updateNote(id, title, content, color) {
    socket.emit('client:updateNote', { id, title, content, color })
}

export function deleteNote(id, uid) {
    socket.emit('client:deleteNote', { id, uid })
}

export function getNotes(uid) {
    socket.emit('client:getNotes', uid)
}


export const onNewNote =(callback)=>{
    socket.on("server:newNote",callback)
}

export const loadNotes = (callback)=>{
    getNotes(uid)
    socket.on("server:sendNotes",callback)
}

