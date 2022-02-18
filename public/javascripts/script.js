const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}
var storage = window.localStorage;
var userId = JSON.parse(getCookie('user'))._id || '';

//Unhide effect on login password


var btnAddElement = document.getElementById('btnAdd')
function setBackGroundColor() {
  let radioColorElement = document.querySelectorAll('input[name="color"]')
  radioColorElement.forEach(elem => {
    elem.parentNode.childNodes[3].style.backgroundColor = elem.getAttribute('light')
  })
}

setBackGroundColor()

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



