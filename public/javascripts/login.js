let emailElement = document.querySelector('input[name="email"]')
let passwordElement = document.querySelector('input[name="password"]')
let localStorage = window.localStorage
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
            alert(response.data)
            localStorage.setItem('userId',response.data.user._id)
            window.location.href='/home'
        }).catch(err=>{
            console.log(err.response)
            alert(err.response.data.toString())
        })
    }
})
