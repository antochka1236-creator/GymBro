const formStart = document.getElementById('start-form')

if (formStart){
formStart.addEventListener('submit', (e) =>{
    e.preventDefault()

    window.location.href = "login.html"
})
}

const formName = document.getElementById('name-form')
const nameInput = document.getElementById('nombre')

if (formName){
    formName.addEventListener('submit', (e) =>{
        e.preventDefault()

      ifUserExist(nameInput.value)
    })
}

const regexp  =  /^[a-zA-ZÁ-ÿ\s]{2,20}$/


const errorName = document.getElementById('error-name')

// Funcion para validar nombre
function isNameValid(input){
     if (regexp.test(input)){
         errorName.textContent = ''
         return true
     }else{
        errorName.textContent = 'Introduce un nombre válido (solo letras y espacios, 2-20 caracteres)'
        return false
     }
}

