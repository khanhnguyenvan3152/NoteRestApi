import { addNote, updateNote, deleteNote, loadNotes, onNewNote } from "./socket.js";

const workspace = document.querySelector('.work-space')

export function noteUI(note) {
    let elem = document.createElement('div')
    elem.setAttribute('id', note._id)
    elem.classList.add('note')
    elem.innerHTML = `
    <div id="${note._id}_header"  class="note_header">
      <div class="note_title">
          <h3 contenteditable="">NOTE_TITLE</h3>
      </div>
      <div id="${note._id}_menu" class="note_menu">
          <span class="ti-menu"></span>
      </div>
  </div>
  <div class="note_body"  aria-multiline="true" contenteditable="">

  </div>
  <div  class="note_footer">
      <div class="note_footer_tools">
          <button class="btnBold"><span class="ti-bold">B</span></button>
          <button class="btnUnderline"><span class="ti-underline"></span></button>
          <button class="btnItalic"><span class="ti-Italic"></span></button>
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
      
      <div class="note_footer_checkmark hidden">
          <span class="ti-check"></span>
      </div>
      <div class="note_footer_checkmark spinner hidden">
      <img src="/images/Loader.gif" width="70px" alt="">
  </div>
  </div>
    `;
    const btnDelete = elem.querySelector('#btnDelete')
    btnDelete.addEventListener('click', deleteNote(note._id))
    return elem;
}

export function renderNotes(notes) {
    console.log(notes)
    workspace.innerHTML = ""
    notes.forEach(note => {
        workspace.append(noteUI(note))
    });
    setBackGroundColor()
    bindRadioOnChangeEvent()
}

export const appendNote = function (note) {
    workspace.append(noteUI(note))
    setBackGroundColor()
    bindRadioOnChangeEvent()
}

export const handleAddClick = function (e) {
    addNote(function (newNote) {
        appendNote(noteUI(newNote))
    })
}

//style="background-color:${note.color.light}"
//style="background-color:${note.color.light}"
//style="background-color:${note.color.dark}"