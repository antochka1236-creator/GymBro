const formSetup = document.getElementById('setup-form')
const selectGoal = document.getElementById('goal')
const selectDays = document.getElementById('days')
const errorGoal = document.getElementById('error-goal')
const errorDays = document.getElementById('error-days')


formSetup.addEventListener('submit', (e) =>{
    e.preventDefault()

    const goal = selectGoal.value
    const days = selectDays.value

    const isGoalOk = isGoalSelected(goal)
    const isDaysOk = areDaysSelected(days)  

    if (isGoalOk && isDaysOk){
      saveUserGoal(goal,days)
      window.location.href = "workout.html"
    }
   
  })


// Escuchadores  de eventos para validar opciones y  generar programma 
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

// Funcion para guardar el objetivo del usuario
function saveUserGoal(goal,days){
  
  const user = JSON.parse(localStorage.getItem('user')) || {};

  user.goal = goal;
  user.days = days;

  localStorage.setItem('user', JSON.stringify(user));
}

const user = JSON.parse(localStorage.getItem('user')) || {}
if (!user.name) {
  window.location.href = 'login.html'
}