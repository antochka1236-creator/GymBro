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

  const value = nameInput.value.trim()
  
  saveUser(value)

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

function saveUser(input){
    if(!isNameValid(input)) return

    const user = JSON.parse(localStorage.getItem('user')) || {}

    user.name = input

    localStorage.setItem('user', JSON.stringify(user))

    window.location.href = 'setup.html'
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

    const goal = selectGoal.value
    const days = selectDays.value

    const isGoalOk = isGoalSelected(goal)
    const isDaysOk = areDaysSelected(days)  

    if (isGoalOk && isDaysOk){
      saveUserGoal(goal,days)
      window.location.href = "workout.html"
    }
   
  })
}

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

// Gurdamos variables del localStorage 
const user = JSON.parse(localStorage.getItem('user')) || {}

const userName = user.name
const userGoal = user.goal
const userDays = user.days



// Hacemos un fetch de JSON y declaramos una variable para data para usar despues
fetch('programs.json')

  .then(response=>response.json())
  .then(data => generateProgram(data))
   
  .catch((err)=> console.log('Solicitud fallida', err))


const weights = JSON.parse(localStorage.getItem('weights')) || {}
// Funcion para renderizar la pagina de workout
function generateProgram(data){
  
  renderWorkoutHeader()
  createContainerFlex()

  const days = data[userGoal][userDays]
  const fragment = document.createDocumentFragment()
  
  days.forEach(day =>{
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `<h2>Dia ${day.day}</h2>`
    
    const btn = document.createElement('button')
    btn.classList.add('button')
    btn.classList.add('save-weight')
    btn.textContent = 'Guardar pesos'

    const errorPesos = document.createElement('span')
    errorPesos.classList.add('error', 'hidden')

    
    renderExersices(card, day, weights)

    card.appendChild(btn)
    card.appendChild(errorPesos)
    fragment.appendChild(card)

    btn.addEventListener('click', () =>{
       
      let allValid = true

      card.querySelectorAll('.weight-input').forEach(input =>{
          
          const errorMsg = input.nextElementSibling

          if (!input.value) return
          
          if (!regexWeight.test(input.value)){
            errorMsg.textContent = 'Solo numeros (máx. 3 dígitos)'
            errorMsg.classList.remove('hidden')
            errorPesos.textContent = 'Revisa los pesos introducidos antes de guardar'
            errorPesos.classList.remove('hidden')
            allValid = false
            return
          }
          
          errorPesos.classList.add('hidden')
          errorMsg.classList.add('hidden')
          weights[input.id] = input.value

        })

        if (!allValid) return

        localStorage.setItem('weights', JSON.stringify(weights))
        renderExersices(card, day, weights)
       
    })
  })

  containerFlexCard.appendChild(fragment)
}

const containerGeneral = document.createElement('div')
const workoutPage = document.getElementById('workout-page')
const containerFlexCard = document.createElement('div')

// Funcion para crear pagina de workout
function renderWorkoutHeader(){
  containerGeneral.setAttribute('id','container')
  containerGeneral.innerHTML = `
        <h1>Te damos la bienvenida, ${userName[0].toUpperCase() + userName.slice(1)}!</h1>
        <p>Aquí tienes tu rutina</p>`
  workoutPage.appendChild(containerGeneral)

}

// Funcion para crear un contenedro para las tarjetas
function createContainerFlex(){
    containerFlexCard.classList.add('flex-cards')
    containerGeneral.appendChild(containerFlexCard)
}

// Regex para el peso
const regexWeight = /^\d{1,3}$|^\d{1,2}\.\d$/

// Funcion para renderizar ejersicios
function renderExersices(card, day, weights){
  card.querySelectorAll('.exercise').forEach(ex=> ex.remove())

  day.exercises.forEach(ex=>{
    const exersicesContainer = document.createElement('div')
    exersicesContainer.classList.add('exercise')
    const inputId = `input-${day.day}-${ex.name.replace(/\s/g, '-')}`
    const savedWeight = weights[inputId]

    if (savedWeight){
      exersicesContainer.innerHTML = `
              <h3>${ex.name}</h3>
              <p>${ex.sets} sets x ${ex.rep} reps</p>
              <div class="weight-control">
              <input type="text" placeholder="Kg" class="weight-input" value="${savedWeight}" id="input-${day.day}-${ex.name.replace(/\s/g, '-')}">
                        <button class="minus">-</button>
                        <button class="plus">+</button>
                    </div>
                    `
        const btnPlus = exersicesContainer.querySelector('.plus')
        const btnMinus = exersicesContainer.querySelector('.minus')
        
        btnPlus.addEventListener('click', () =>{
              if (parseFloat(weights[inputId]) < 20){
            weights[inputId] = parseFloat(weights[inputId]) + 1
          }else if(parseFloat(weights[inputId]) < 60){
              weights[inputId] = parseFloat(weights[inputId]) + 2.5
          }else{
            weights[inputId] = parseFloat(weights[inputId]) + 5
          }

          localStorage.setItem('weights', JSON.stringify(weights))
          renderExersices(card, day, weights)
        })

        btnMinus.addEventListener('click', () =>{
          if (parseFloat(weights[inputId]) < 20){
            weights[inputId] = parseFloat(weights[inputId]) - 1
          }else if(parseFloat(weights[inputId]) < 60){
              weights[inputId] = parseFloat(weights[inputId]) - 2.5
          }else{
            weights[inputId] = parseFloat(weights[inputId]) - 5
          }

          localStorage.setItem('weights', JSON.stringify(weights))
          renderExersices(card, day, weights)
        })

    }else{
      exersicesContainer.innerHTML = `
            <h3>${ex.name}</h3>
            <p>${ex.sets} sets x ${ex.rep} reps</p>
            <input type="text" placeholder="Introduce el peso(Kg)" class="weight-input" id="input-${day.day}-${ex.name.replace(/\s/g, '-')}">
            <span class="error hidden"></span>`
    }
    

    card.insertBefore(exersicesContainer, card.querySelector('.save-weight'))
   
  })
  

}

