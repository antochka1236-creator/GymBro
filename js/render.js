import { weights, history, saveWeights } from './storage.js'
import { openModal, closeModal, btnCloseModal, modal } from './modal.js'
 
const regexWeight = /^\d{1,3}$|^\d{1,2}\.\d$/
 
export const containerGeneral = document.createElement('div')
export const containerFlexCard = document.createElement('div')
const workoutPage = document.getElementById('workout-page')
 
export function renderWorkoutHeader(userName) {
  containerGeneral.setAttribute('id', 'container')
  containerGeneral.innerHTML = `
    <h1>Te damos la bienvenida, ${userName[0].toUpperCase() + userName.slice(1)}!</h1>
    <p>Aquí tienes tu rutina</p>`
  workoutPage.appendChild(containerGeneral)
}
 
export function createContainerFlex() {
  containerFlexCard.classList.add('flex-cards')
  containerGeneral.appendChild(containerFlexCard)
}
 
export function updateCards() {
  const newCurrentDay = parseInt(localStorage.getItem('currentDay')) || 1
  const newDoneDays = JSON.parse(localStorage.getItem('doneDays')) || {}
 
  document.querySelectorAll('.card').forEach(card => {
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
 
export function renderExersices(card, day) {
  card.querySelectorAll('.exercise').forEach(ex => ex.remove())
 
  day.exercises.forEach(ex => {
    const exersicesContainer = document.createElement('div')
    exersicesContainer.classList.add('exercise')
    const inputId = `input-${day.day}-${ex.name.replace(/\s/g, '-').replace(/[()]/g, '')}`
    const savedWeight = weights[inputId]
 
    if (savedWeight) {
      exersicesContainer.innerHTML = `
        <h3>${ex.name} <span class="arrow">↗</span></h3>
        <p>${ex.sets} sets x ${ex.rep} reps</p>
        <div class="weight-control">
          <div class="wrapper">
            <input type="text" class="weight-input" value="${savedWeight}" id="${inputId}">
            <p>Kg</p>
          </div>
          <button class="minus">-</button>
          <button class="plus">+</button>
        </div>
        <span class="error-workout hidden"></span>`
 
      const btnPlus = exersicesContainer.querySelector('.plus')
      const btnMinus = exersicesContainer.querySelector('.minus')
 
      btnPlus.addEventListener('click', () => {
        if (parseFloat(weights[inputId]) < 20) {
          weights[inputId] = parseFloat(weights[inputId]) + 1
        } else if (parseFloat(weights[inputId]) < 60) {
          weights[inputId] = parseFloat(weights[inputId]) + 2.5
        } else {
          weights[inputId] = parseFloat(weights[inputId]) + 5
        }
        saveWeights()
        renderExersices(card, day)
      })
 
      btnMinus.addEventListener('click', () => {
        if (parseFloat(weights[inputId]) < 20) {
          weights[inputId] = parseFloat(weights[inputId]) - 1
        } else if (parseFloat(weights[inputId]) < 60) {
          weights[inputId] = parseFloat(weights[inputId]) - 2.5
        } else {
          weights[inputId] = parseFloat(weights[inputId]) - 5
        }
        saveWeights()
        renderExersices(card, day)
      })
 
      const weightInput = exersicesContainer.querySelector('.weight-input')
      weightInput.addEventListener('input', () => {
        const errorMsg = weightInput.closest('.exercise').querySelector('.error-workout')
        if (!weightInput.value) return
        if (!regexWeight.test(weightInput.value)) {
          errorMsg.textContent = 'Solo numeros (máx. 3 dígitos)'
          errorMsg.classList.remove('hidden')
          return
        }
        errorMsg.classList.add('hidden')
        weights[weightInput.id] = weightInput.value
      })
 
    } else {
      exersicesContainer.innerHTML = `
        <h3>${ex.name} <span class="arrow">↗</span></h3>
        <p>${ex.sets} sets x ${ex.rep} reps</p>
        <div class="wrapper">
          <input type="text" placeholder="Introduce el peso" class="weight-input" id="${inputId}">
          <p>Kg</p>
        </div>
        <span class="error-workout hidden"></span>`
    }
 
    card.insertBefore(exersicesContainer, card.querySelector('.save-weight'))
 
    if (history[inputId] && history[inputId].length > 0) {
      exersicesContainer.querySelector('.arrow').textContent = '↗ •'
    }
 
    const title = exersicesContainer.querySelector('h3')
    title.addEventListener('click', () => openModal(ex, inputId))
 
    btnCloseModal.addEventListener('click', closeModal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('modal-visible')) closeModal()
    })
  })
}