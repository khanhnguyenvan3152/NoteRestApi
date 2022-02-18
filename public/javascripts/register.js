let emailElement = document.querySelector('input[name="email"]')
let userNameElement = document.querySelector('input[name="username"]')
let passwordElement = document.querySelector('input[name="password"]')
let retypepasswordElement = document.querySelector('input[name="retypepassword"]')
function showError(input,message){
    let parentElement = input.parentElement.parentElement
    let small = parentElement.querySelector('small')
    small.style.visibility = 'visible'
    small.classList.add('error')
    small.innerText = message
}

function showSuccess(input){
    let parentElement = input.parentElement.parentElement
    let small = parentElement.querySelector('small')
    small.classList.remove('error')
    small.style.visibility = 'hidden'
}

function checkEmptyError(listInput){
    let isEmptyError = false
    listInput.forEach(input =>{
        input.value = input.value.trim()
        if(!input.value){
            isEmptyError = true
            showError(input,'Must not be empty')
        }else{
            showSuccess(input)
        }
    })
    return isEmptyError;
}

function checkEmail(input){
    let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    input.value = input.value.trim()
    let result = emailRegex.test(input.value)
    if(result){
        showSuccess(input)
    }else{
        showError(input,'Invalid email')
    }
    return result
}
function checkConfirmationPassword(inputPassword,inputConfirmationPassword){
    let password = inputPassword.value.trim()
    let confirmationPassword = inputConfirmationPassword.value.trim()
    let result = password===confirmationPassword?true:false;
    if(result){
        showSuccess(inputConfirmationPassword);
    }else{
        showError(inputConfirmationPassword,'Password does not match')
    }
    return result
}
document.forms[0].addEventListener('submit',function(e){
    e.preventDefault()
    let isEmptyError = checkEmptyError([emailElement,userNameElement,passwordElement,retypepasswordElement])
    let isEmailValid = checkEmail(emailElement)
    let isPasswordsEqual = checkConfirmationPassword(passwordElement,retypepasswordElement)
    if(!isEmptyError && isEmailValid && isPasswordsEqual){
        axios.post('users/register',{
            email: emailElement.value,
            password: passwordElement.value,
            username: userNameElement.value
        }).then(function(response){
            alert(response.data)
        }).catch(err=>{
            alert(err.response.data.details[0])
        })
    }

})