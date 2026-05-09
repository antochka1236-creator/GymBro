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
const history = JSON.parse(localStorage.getItem('history')) || {}
const doneDays = JSON.parse(localStorage.getItem('doneDays')) || {}
// Funcion para renderizar la pagina de workout
function generateProgram(data){
  
  renderWorkoutHeader()
  createContainerFlex()

  const days = data[userGoal][userDays]
  const fragment = document.createDocumentFragment()
  let currentDay = parseInt(localStorage.getItem('currentDay')) || 1
  days.forEach(day =>{
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `<h2>Dia ${day.day}</h2>
    <p>${day.title}</p>`
    card.dataset.day = day.day 


    const btn = document.createElement('button')
    btn.classList.add('button')
    btn.classList.add('save-weight')
    btn.textContent = 'Guardar pesos'

    if (day.day === currentDay) {
      card.classList.add('active-day')
      btn.textContent = 'Guardar pesos'
      } else if (doneDays[day.day]) {
        card.classList.add('completed-day')
        btn.textContent = 'Completado ✓'
        btn.classList.add('saved')
      } else {
        card.classList.add('inactive-day')
        btn.textContent = 'Próximo entrenamiento'
      }

    const errorPesos = document.createElement('span')
    errorPesos.classList.add('error', 'hidden')

    
    renderExersices(card, day, weights)

    card.appendChild(btn)
    card.appendChild(errorPesos)
    fragment.appendChild(card)
    
    btn.addEventListener('click', () =>{
       
      let currentDay = parseInt(localStorage.getItem('currentDay')) || 1
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
        
        Object.keys(weights).forEach(inputId => {
        if (!history[inputId]) {
        history[inputId] = []
         }

       const newWeight = parseFloat(weights[inputId])

       const lastWeight =
        history[inputId][history[inputId].length - 1]

       if (lastWeight !== newWeight) {
        history[inputId].push(newWeight)
         }
         })

        localStorage.setItem('history', JSON.stringify(history))


        doneDays[day.day] = true

       

        const totalDays = days.length

        let nextDay = currentDay + 1


        if (nextDay > totalDays) {

        nextDay = 1

        localStorage.setItem('doneDays', JSON.stringify({}))
        }

        localStorage.setItem('currentDay', nextDay)
       if (nextDay === 1) {
        localStorage.setItem('doneDays', JSON.stringify({}))
        Object.keys(doneDays).forEach(key => delete doneDays[key])
        } else {
        localStorage.setItem('doneDays', JSON.stringify(doneDays))
         }

        setTimeout(() =>{
          updateCards(days, btn)
        }, 2000)
        
        
       
    })
  })

  containerFlexCard.appendChild(fragment)
}

//Funcion para renderizar tarjetas
function updateCards(days, btn) {
  const newCurrentDay = parseInt(localStorage.getItem('currentDay')) || 1
  const newDoneDays = JSON.parse(localStorage.getItem('doneDays')) || {}

  document.querySelectorAll('.card').forEach((card, i) => {
    const dayNum = Number(card.dataset.day)
    const btn = card.querySelector('.save-weight')
    card.classList.remove('active-day', 'completed-day', 'inactive-day')

    if (dayNum === newCurrentDay) {
      card.classList.add('active-day')
      btn.textContent = 'Guardar pesos'
      btn.classList.remove('saved')
    } else if (newDoneDays[dayNum]) {
      card.classList.add('completed-day')
      btn.textContent = 'Completado ✓'
      btn.classList.add('saved')
    } else {
      card.classList.add('inactive-day')
      btn.textContent = 'Próximo entrenamiento'
      btn.classList.remove('saved')
    }
  })
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
     if ( history[inputId] && history[inputId].length > 0) {
          exersicesContainer.querySelector('.arrow').textContent= '↗ •'
          }
   const title = exersicesContainer.querySelector('h3') 
   title.addEventListener('click', () =>{
    openModal(ex, inputId)
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
const ctx = document.getElementById('weightChart')
let chartInstance = null

// Funciones modales
function openModal (ex, inputId){
    
    titleModal.innerText = ex.name
    descriptionModal.innerText = ex.description

    if (chartInstance) {
    chartInstance.destroy()
  }
  let exLabels = history[inputId]
  if (exLabels){
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: exLabels.map((_, i) => `Entreno ${i + 1}`),
      datasets: [{
        label: 'Evolución del peso',
        data: exLabels,
        borderColor: '#3355FF',
        borderWidth: 2,
        backgroundColor: '#f1f2fc',
        fill: true,
        tension: 0.3,
        pointRadius: 3
      }]
    }
  })
  }

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


