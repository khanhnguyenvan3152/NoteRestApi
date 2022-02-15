const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}
var storage = window.localStorage;
var userId = JSON.parse(getCookie('user'))._id
console.log(userId)
var notes = JSON.parse(storage.getItem('notes')) || []; //note data
var noteObjects = [];

var unHideElement = document.querySelector('.login-form_password__unhide')
var isHide = false;
function handleUnHideClick(e) {
  document.querySelector('.strike').classList.toggle('hidden');
  if (isHide == true) {
    isHide = false
    document.querySelector("input[name='password']").setAttribute('type', 'text')
  } else {
    isHide = true
    document.querySelector("input[name='password']").setAttribute('type', 'password')
  }
}
if (unHideElement != null) {
  unHideElement.onclick = handleUnHideClick
}


/*NOTE APP SCRIPT */
let index = 1;


//prevent unable to edit title of the note

function removeEventHandlers() {
  document.querySelectorAll('h3').forEach(function (element) {
    element.removeEventListener('mousedown', dragMouseDown)
  })
}


var btnAddElement = document.getElementById('btnAdd')
function setBackGroundColor() {
  let radioColorElement = document.querySelectorAll('input[name="color"]')
  radioColorElement.forEach(elem => {
    elem.parentNode.childNodes[3].style.backgroundColor = elem.getAttribute('light')
  })
}
function handleRadioOnValueChange(e) {
  //reset style for radio
  let checkMarks = e.target.parentNode.parentNode.querySelectorAll('.checkmark')
  checkMarks.forEach(checkMark => {
    checkMark.style.border = 0
  })
  let dark = e.target.getAttribute('value');
  let light = e.target.getAttribute('light')
  e.target.parentNode.childNodes[3].style.border = '1px solid black'
  let note = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  let noteHeader = note.querySelector('.note_header')
  let noteBody = note.querySelector('.note_body')
  let noteFooter = note.querySelector('.note_footer')
  noteHeader.style.backgroundColor = light;
  noteBody.style.backgroundColor = dark;
  noteFooter.style.backgroundColor = light;
}
function bindRadioOnChangeEvent() {
  let radioElements = document.querySelectorAll('input[name="color"]')
  radioElements.forEach(elem => {
    elem.addEventListener('change', handleRadioOnValueChange)
  })
}
setBackGroundColor()
bindRadioOnChangeEvent()
btnAddElement.onclick = function () {
  index++;
  let note = new Note(null);
  //addNoteToList(note)
  socket.emit('savenote',"note to save")
  console.log(notes);
  // let noteElement = document.createElement('div')
  // noteElement.classList.add('note')
  // noteElement.setAttribute('id', index)
  // noteElement.innerHTML = `
  // <div id="${index}_header" class="note_header">
  //     <div class="note_title">
  //         <h3 contenteditable="">NOTE_TITLE</h3>
  //     </div>
  //     <div id="${index}_menu" class="note_menu">
  //         <span class="ti-menu"></span>
  //     </div>
  // </div>
  // <div class="note_body" aria-multiline="true" contenteditable="">

  // </div>
  // <div class="note_footer">
  //     <div class="note_footer_tools">
  //         <button class="btnBold"><span class="ti-bold">B</span></button>
  //         <button class="btnUnderline"><span class="ti-underline"></span></button>
  //         <button class="btnItalic"><span class="ti-Italic"></span></button>
  //         <button id="btnColorPalette" class="btnColorPalette">
  //         <span class="ti-palette">
  //         </span>
  //         <div id="colorPalette" class="colorPalette">
  //             <label class="container">
  //                 <input class="radio-color" name="color" light="#E5D4F1" value="#C4C4C4" type="radio" />
  //                 <span class="checkmark"></span>
  //             </label>
  //             <label class="container">
  //                 <input class="radio-color" name="color" light="#4098FF" value="#0B7BFF" type="radio" />
  //                 <span class="checkmark"></span>
  //             </label>
  //             <label class="container">
  //                 <input class="radio-color" name="color" light="#ffd359" value="#fcba03" type="radio" />
  //                 <span class="checkmark"></span>
  //             </label>                            
  //             <label class="container">
  //                 <input class="radio-color" name="color" light="#52fa8a" value="#00ff55" type="radio" />
  //                 <span class="checkmark"></span>
  //             </label>
  //             <label class="container">
  //                 <input class="radio-color" name="color" value="#C4C4C4" type="radio" />
  //                 <span class="checkmark"></span>
  //             </label>
  //             <label class="container">
  //                 <input class="radio-color" name="color" value="#C4C4C4" type="radio" />
  //                 <span class="checkmark"></span>
  //             </label>   
  //         </div>
  //     </button>
  //     </div>
      
  //     <div class="note_footer_checkmark hidden">
  //         <span class="ti-check"></span>
  //     </div>
  //     <div class="note_footer_checkmark spinner hidden">
  //     <img src="/Loader.gif" width="70px" alt="">
  // </div>
  // </div>
  // `
  let noteElement = note.getHTMLElement()
  document.querySelector('.work-space').append(noteElement)
  bindRadioOnChangeEvent()
  setBackGroundColor()
}

// Make the DIV element draggable:
let noteElements = document.querySelectorAll('.note')
noteElements.forEach(function (element) {
  dragElement(element)
})
// dragElement(document.getElementById("note"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_menu")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "_menu").addEventListener('mousedown', dragMouseDown)
  }
  else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (e.target.tagName != 'h3') {
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation()
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    if (e.target.tagName != 'h3') {
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation()

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, function (e) {
    if (e.target.matches(selector)) {
      callback(e)
    }
  })
}
function handleUserInputEvent() {
  let typingTimer
  let doneTypingInterval = 5000
  let titles = document.getElementsByTagName('h3')
  let bodies = document.getElementsByClassName('note_body')
  let elems = Array.from(titles).concat(Array.from(bodies))
  elems.forEach(function (elem) {
    elem.addEventListener('keyup', e => {
      clearTimeout(typingTimer)
      e.target.parentElement.parentElement
      if (e.target.innerText != '') {
        typingTimer = setTimeout(doneTyping, doneTypingInterval, [...id])
      }
    })
  })
  function doneTyping(args) {
    let id = arguments[0]
    let noteElement = document.getElementById(id)
    let title = noteElement.children[0].children[0].children[0].innerText
    let bodyContent = noteElement.children[1].innerText
    let spinnerElement = noteElement.querySelector('.spinner')
    spinnerElement.classList.toggle('hidden')
    console.log(title, bodyContent)
  }
}

const Note = function (id, title="Title", content="", color="#C4C4C4") {
  this.id = id;
  this.title = title;
  this.content = content;
  this.color = color;
  
 
}
Note.prototype.changeColor = function(color){
  this.color = color
}
Note.prototype.getHTMLElement = function(){
    let elem = document.createElement('div')
    elem.setAttribute('id', this.id)
    elem.classList.add('note')
    elem.innerHTML = `
    <div id="${this.id}_header" class="note_header">
      <div class="note_title">
          <h3 contenteditable="">NOTE_TITLE</h3>
      </div>
      <div id="${this.id}_menu" class="note_menu">
          <span class="ti-menu"></span>
      </div>
  </div>
  <div class="note_body" aria-multiline="true" contenteditable="">

  </div>
  <div class="note_footer">
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
                  <input class="radio-color" name="color" value="#C4C4C4" type="radio" />
                  <span class="checkmark"></span>
              </label>
          </div>
      </button>
      <button class="btnItalic"><span class="ti-trash"></span></button>

      </div>
      
      <div class="note_footer_checkmark hidden">
          <span class="ti-check"></span>
      </div>
      <div class="note_footer_checkmark spinner hidden">
      <img src="/images/Loader.gif" width="70px" alt="">
  </div>
  </div>
    `;
    return elem;
}
axios.get(`http://localhost:3001/users/${userId}/notes`).then(response=>{
  console.log(response.data.notes)
  notes = response.data.notes;
  window.localStorage.setItem('notes',JSON.stringify(notes))
})
function saveNote({title,content,color}){
  axios.post(`http://localhost:3001/users/${userId}/notes`,{
    title,
    content,
    color
  },{withCredentials:true}).then(()=>{
    console.log('success');
  })
}
function loadNote(note){
  var workspace = document.querySelector('.work-space')
  let noteObject = new Note(note._id,note.title,note.content,note.color)
  noteObjects.push(noteObject)
  let noteElement = noteObject.getHTMLElement()
  workspace.appendChild(noteElement)
  bindRadioOnChangeEvent()
  setBackGroundColor()
}
if (notes.length > 0) {
  notes.forEach(note => {
    loadNote(note)
  })
}
function addNoteToList(note) {
  notes.push(note)
  window.localStorage.setItem('notes',JSON.stringify(notes))
}
function debounce(fn, ms) {
  let timer;
  return function () {
    const args = arguments;
    const context = this;
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, ms)
  }
}
const debounceEvent = _.debounce(doSomething, 2000)
function doSomething(e) {
  console.log('done')
  console.log(e)
}

Array.from(document.getElementsByClassName('note_body')).forEach(elem => {
  elem.addEventListener('keyup', function(e) {
    debounceEvent(e)
  })
})



