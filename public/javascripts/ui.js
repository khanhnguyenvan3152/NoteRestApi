import { addNote, updateNote, deleteNote, loadNotes, onNewNote } from "./socket.js";

const workspace = document.querySelector('.work-space')

function handleRadioOnValueChange(e) {
    //reset style for radio
    let checkMarks = e.target.closest('.colorPalette').querySelectorAll('.checkmark')
    checkMarks.forEach(checkMark => {
        checkMark.style.border = 0
    })
    let dark = e.target.getAttribute('value');
    let light = e.target.getAttribute('light')
    e.target.parentNode.childNodes[3].style.border = '1px solid black'
    let note = e.target.closest('.note');
    let noteHeader = note.querySelector('.note_header')
    let noteBody = note.querySelector('.note_body')
    let noteFooter = note.querySelector('.note_footer')
    noteHeader.style.backgroundColor = light;
    noteBody.style.backgroundColor = dark;
    noteFooter.style.backgroundColor = light;
    let id = note.getAttribute('id')
    let title = note.querySelector('h3').innerText;
    var content = note.querySelector('.note_body').innerText;
    var color = {dark,light};
    updateNote(id,title,content,color)
}

function handleKeyUp(e){
    var note = e.target.closest('.note')
    var noteHeader = note.querySelector('.note_header')
    var noteBody = note.querySelector('.note_body')
    var id = note.getAttribute('id')
    var title = note.querySelector('h3').innerText;
    var content = noteBody.innerHTML;
    var color = {
        light: noteHeader.style.backgroundColor,
        dark: noteBody.style.backgroundColor 
    }
    updateNote(id,title,content,color)
}
export function noteUI(note) {
    let elem = document.createElement('div')
    elem.setAttribute('id', note._id)
    elem.classList.add('note')
    elem.innerHTML = `
    <div id="${note._id}_header" style="background-color:${note.color.light}"  class="note_header">
      <div class="note_title">
          <h3 contenteditable="">${note.title}</h3>
      </div>
      <div id="${note._id}_menu" class="note_menu">
          <span class="ti-menu"></span>
      </div>
  </div>
  <div class="note_body" style="background-color:${note.color.dark}"  aria-multiline="true" contenteditable="">
    ${note.content}
  </div>
  <div class="note_footer" style="background-color:${note.color.light}">
      <div class="note_footer_tools">
         
          <button id="btnColorPalette" class="btnColorPalette">
          <span class="ti-palette">
          </span>
          <div id="colorPalette" class="colorPalette">
              <label class="container">
                  <input class="radio-color" name="color" light="#E5D4F1" value="#C4C4C4" type="radio" />
                  <span class="checkmark"></span>
              </label>
              <label class="container">
                  <input class="radio-color" name="color" light="#4098FF" value="#0B7BFF" type="radio" />
                  <span class="checkmark"></span>
              </label>
              <label class="container">
                  <input class="radio-color" name="color" light="#ffd359" value="#fcba03" type="radio" />
                  <span class="checkmark"></span>
              </label>                            
              <label class="container">
                  <input class="radio-color" name="color" light="#52fa8a" value="#00ff55" type="radio" />
                  <span class="checkmark"></span>
              </label>
              <label class="container">
                  <input class="radio-color" name="color" light="#D8D4D4" value="#C4C4C4" type="radio" />
                  <span class="checkmark"></span>
              </label>
          </div>
      </button>
      <button class="btnDelete" id="btnDelete"><span class="ti-trash"></span></button>

      </div>
      
      <div class="note_footer_checkmark hidden" >
          <span class="ti-check"></span>
      </div>
      <div class="note_footer_checkmark spinner hidden">
      <img src="/images/Loader.gif" width="70px" alt="">
  </div>
  </div>
    `;
    elem.querySelector('h3').addEventListener('keyup',keyUpListeners)
    elem.querySelector('.note_body').addEventListener('keyup',keyUpListeners)
    var btnDelete = elem.querySelector('#btnDelete')
    btnDelete.addEventListener('click', (e) => {
        if (confirm('Are you sure to delete this note?')) {
            deleteNote(note._id);
            elem.remove()
        }
    })
    var inputElements = elem.querySelectorAll('input[name="color"]')
    inputElements.forEach(elem => {
        elem.addEventListener('change',handleRadioOnValueChange)
    })
    return elem;
}

export function renderNotes(notes) {
    workspace.innerHTML = ""
    notes.forEach(note => {
        workspace.append(noteUI(note))
    });
    setBackGroundColor()
}

const keyUpListeners = _.debounce(handleKeyUp,2000)
export const appendNote = function (note) {
    workspace.append(noteUI(note))
}

export const handleAddClick = function (e) {
    addNote()
}

//"
//style="background-color:${note.color.light}"
//style="background-color:${note.color.dark}"