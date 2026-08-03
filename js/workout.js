import {
  user, weights, history, doneDays,
  getUserName, getUserGoal, getUserDays, getCurrentDay,
  saveWeights, saveHistory, saveDoneDays, saveCurrentDay, clearDoneDays
} from './storage.js'
 
import {
  renderWorkoutHeader, createContainerFlex,
  renderExersices, updateCards, containerFlexCard
} from './render.js'
 
const userName = getUserName()
const userGoal = getUserGoal()
const userDays = getUserDays()
 
if (!user.name || !user.goal || !user.days) {
  window.location.href = 'login.html'
}
 
fetch('programs.json')
  .then(response => response.json())
  .then(data => generateProgram(data))
  .catch(err => console.log('Solicitud fallida', err))
 
function generateProgram(data) {
  renderWorkoutHeader(userName)
  createContainerFlex()
 
  const days = data[userGoal][userDays]
  const fragment = document.createDocumentFragment()
  const currentDay = getCurrentDay()
 
  days.forEach(day => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `<h2>Dia ${day.day}</h2><p>${day.title}</p>`
    card.dataset.day = day.day
 
    const btn = document.createElement('button')
    btn.classList.add('button', 'save-weight')
 
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
 
    renderExersices(card, day)
 
    card.appendChild(btn)
    card.appendChild(errorPesos)
    fragment.appendChild(card)
 
    btn.addEventListener('click', () => {
      const currentDay = getCurrentDay()
      let allValid = true
      errorPesos.classList.add('hidden')
 
      card.querySelectorAll('.weight-input').forEach(input => {
        const errorMsg = input.closest('.exercise').querySelector('.error-workout')
        if (!input.value) return
        if (!/^\d{1,3}$|^\d{1,2}\.\d$/.test(input.value)) {
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
 
      saveWeights()
      renderExersices(card, day)
 
      btn.textContent = 'Guardado ✓'
      btn.classList.add('saved')
      setTimeout(() => {
        btn.textContent = 'Guardar pesos'
        btn.classList.remove('saved')
      }, 2000)
 
      Object.keys(weights).forEach(inputId => {
        if (!history[inputId]) history[inputId] = []
        const newWeight = parseFloat(weights[inputId])
        const lastWeight = history[inputId][history[inputId].length - 1]
        if (lastWeight !== newWeight) history[inputId].push(newWeight)
      })
      saveHistory()
 
      doneDays[day.day] = true
      const totalDays = days.length
      let nextDay = currentDay + 1
 
      if (nextDay > totalDays) {
        nextDay = 1
        clearDoneDays()
      } else {
        saveDoneDays()
      }
      saveCurrentDay(nextDay)
 
      setTimeout(() => updateCards(), 2000)
    })
  })
 
  containerFlexCard.appendChild(fragment)
}
 
const btnChange = document.getElementById('change-user')
const avatar = document.getElementById('current-user')
avatar.textContent = userName[0].toUpperCase()
 
btnChange.addEventListener('click', () => {
  if (confirm('¿Cambiar de usuario?')) {
    localStorage.clear()
    window.location.href = 'login.html'
  }
})


