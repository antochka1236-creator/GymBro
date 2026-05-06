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
    card.innerHTML = `<h2>Dia ${day.day}</h2>
    <p>${day.title}</p>`
    
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
      errorPesos.classList.add('hidden')
      card.querySelectorAll('.weight-input').forEach(input =>{
          
          const errorMsg = input.closest('.exercise').querySelector('.error-workout')

          if (!input.value) return
          
          if (!regexWeight.test(input.value)){
            errorMsg.textContent = 'Solo numeros (máx. 3 dígitos)'
            errorMsg.classList.remove('hidden')
            errorPesos.textContent = 'Revisa los pesos introducidos antes de guardar'
            errorPesos.classList.remove('hidden')
            allValid = false
            return
          }
          
        
          errorMsg.classList.add('hidden')
          weights[input.id] = input.value

        })

        if (!allValid) return

        localStorage.setItem('weights', JSON.stringify(weights))
        renderExersices(card, day, weights)
        
        btn.textContent = 'Guardado ✓'
        btn.classList.add('saved')
      
         
       

        setTimeout(() => {
        btn.textContent = 'Guardar pesos'
        btn.classList.remove('saved')
      
        }, 2000)
        
        
        
       
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
              <h3>${ex.name} <span class="arrow">↗</span></h3>
              <p>${ex.sets} sets x ${ex.rep} reps</p>
              <div class="weight-control">
              <div class="wrapper">
              <input type="text" class="weight-input" value="${savedWeight}" id="input-${day.day}-${ex.name.replace(/\s/g, '-')}">
                        <p>Kg</p>
              </div>
                        <button class="minus">-</button>
                        <button class="plus">+</button>
                </div>
               <span class="error-workout hidden"></span>
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
        const weightInput = exersicesContainer.querySelector('.weight-input')
          weightInput.addEventListener('input', () =>{
          const errorMsg = weightInput.closest('.exercise').querySelector('.error-workout')

          if (!weightInput.value) return
          
          if (!regexWeight.test(weightInput.value)){
            errorMsg.textContent = 'Solo numeros (máx. 3 dígitos)'
            errorMsg.classList.remove('hidden')
            return
          }
          
        
          errorMsg.classList.add('hidden')
          weights[weightInput.id] = weightInput.value
  })

    }else{
      exersicesContainer.innerHTML = `
            <h3>${ex.name} <span class="arrow">↗</span></h3>
            <p>${ex.sets} sets x ${ex.rep} reps</p>
            <div class="wrapper">
            <input type="text" placeholder="Introduce el peso" class="weight-input" id="input-${day.day}-${ex.name.replace(/\s/g, '-')}">
              <p>Kg</p>
            </div>
            <span class="error-workout hidden"></span>`
    }
    

    card.insertBefore(exersicesContainer, card.querySelector('.save-weight'))
   
   const title = exersicesContainer.querySelector('h3') 
   title.addEventListener('click', () =>{
    openModal(ex)
   })

   btnCloseModal.addEventListener('click', closeModal)
   modal.addEventListener('click', (e) =>{
    if (e.target === modal ) closeModal()
    })

    window.addEventListener('keydown', (e) =>{
    if (e.key === 'Escape' && modal.classList.contains('modal-visible')){
        closeModal()
    }
    })

  })
  

}

// Constantes para ventana modal
const modal = document.getElementById('modal')
const titleModal = document.getElementById('modal-title')
const descriptionModal = document.getElementById('modal-description')
const btnCloseModal = document.getElementById('modal-boton')

// Funciones modales
function openModal (ex){
    
    titleModal.innerText = ex.name
    descriptionModal.innerText = ex.description

    modal.classList.add('modal-visible')
}

function closeModal(){
   modal.classList.remove('modal-visible')
}


const btnChange = document.getElementById('change-user')
const avatar = document.getElementById('current-user')

avatar.textContent = userName[0].toUpperCase()

// Listener para cambiar el usuario
btnChange.addEventListener('click', () =>{
      
  if (confirm('¿Cambiar de usuario?')) {
  localStorage.clear()
  window.location.href = 'login.html'
  }   
})
