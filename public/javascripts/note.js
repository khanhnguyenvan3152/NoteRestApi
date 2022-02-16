import {addNote,deleteNote,loadNotes,onNewNote,updateNote} from "./socket.js";
import {renderNotes,appendNote,handleAddClick} from "./ui.js";

const btnAdd = document.querySelector('#btnAdd')

window.addEventListener('DOMContentLoaded',(e)=>{
    loadNotes(renderNotes);
    onNewNote(appendNote);
})
btnAdd.addEventListener('click',handleAddClick)

handleUserInputEvent()