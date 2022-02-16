const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}
var storage = window.localStorage;
var userId = JSON.parse(getCookie('user'))._id

//Unhide effect on login password
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



