const formName = document.getElementById('name-form')
const nameInput = document.getElementById('nombre')

formName.addEventListener('submit', (e) =>{
        e.preventDefault()

  const value = nameInput.value.trim()
  
  saveUser(value)

    })

const regexp  =  /^[a-zA-ZÁ-ÿ\s]{2,20}$/


const errorName = document.getElementById('error-name')

// Funcion para validar nombre
function isNameValid(input){
     if (regexp.test(input)){
         errorName.textContent = ''
         errorName.classList.add('hidden')
         return true
     }else{
        errorName.textContent = 'Introduce un nombre válido (solo letras y espacios, 2-20 caracteres)'
        errorName.classList.remove('hidden')
        return false
     }
}

// Funcion para registrar usuario

function saveUser(input){
    if(!isNameValid(input)) return

    const user = JSON.parse(localStorage.getItem('user')) || {}

    user.name = input

    localStorage.setItem('user', JSON.stringify(user))

    window.location.href = 'setup.html'
}