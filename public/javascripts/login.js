let emailElement = document.querySelector('input[name="email"]')
let passwordElement = document.querySelector('input[name="password"]')
let localStorage = window.localStorage
let host = document.hr
function showError(input,message){
    let parentElement = input.parentElement.parentElement;
    let small = parentElement.querySelector('small')
    small.style.visibility = 'visible'
    small.classList.add('error')
    small.innerText = message
}
function showSuccess(input){
    let parentElement = input.parentElement.parentElement;
    let small = parentElement.querySelector('small')
    small.style.visibility = 'hidden'
    small.classList.remove('error')
}

function checkEmptyError(inputList){
    let isEmptyError = false;
    inputList.forEach(element => {
        element.value = element.value.trim();
        if(!element.value){
            isEmptyError = true
            showError(element)
        }else{
            showSuccess(element)
        }
    });
    return isEmptyError
}

document.forms[0].addEventListener('submit',function(e){
    e.preventDefault()
    let checkError = checkEmptyError([emailElement,passwordElement])
    if(!checkError){
        axios.post('users/login',{
            email: emailElement.value,
            password: passwordElement.value
        },{withCredentials: true}).then(function(response){
            alert('Đăng nhập thành công')
            localStorage.setItem('userId',response.data.user._id)
            window.location.href='/home'
        }).catch(err=>{
            alert(err.response.data.toString())
        })
    }
})

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

