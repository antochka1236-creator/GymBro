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

  const value = nameInput.value.trim();

  if (!isNameValid(value)) return;

  isUserExist(value);
    })
}

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

function isUserExist(input){
    if(!isNameValid(input)) return

    if (!localStorage.getItem("username")){
        localStorage.setItem("username", input)
        window.location.href = "setup.html"
    }else{
       window.location.href = "workout.html"
    }
}


// Pasamos a la pagina de workout si usuario existe

/* if (localStorage.getItem("username")) {
  window.location.href = "workout.html"
} */

const formSetup = document.getElementById('setup-form')
const selectGoal = document.getElementById('goal')
const selectDays = document.getElementById('days')
const errorGoal = document.getElementById('error-goal')
const errorDays = document.getElementById('error-days')

if (formSetup){
  formSetup.addEventListener('submit', (e) =>{
    e.preventDefault()

   isGoalSelected(selectGoal.value)
   areDaysSelected(selectDays.value)
  })
}

if (formSetup){
  formSetup.addEventListener('change', (e) =>{
  
  if (e.target === selectGoal) {
    isGoalSelected(e.target.value)
  }

  if (e.target === selectDays) {
    areDaysSelected(e.target.value)
  }
  })
}

// Funcion para validar si los campos de select no estan vacios


function isGoalSelected(goal){
   if (!goal){
      errorGoal.textContent = 'Elige un objetivo antes de seguir'
      errorGoal.classList.remove('hidden')
      return false
    }else{
      errorGoal.textContent = ''
      errorGoal.classList.add('hidden')
      return true
    }
}

function areDaysSelected(days){
   if (!days){
      errorDays.textContent = 'Selecciona cuántos días entrenarás'
      errorDays.classList.remove('hidden')
      return false
    }else{
      errorDays.textContent = ''
      errorDays.classList.add('hidden')
      return true
    }
}