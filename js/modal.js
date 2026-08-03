import { history } from './storage.js'
 
const modal = document.getElementById('modal')
const titleModal = document.getElementById('modal-title')
const descriptionModal = document.getElementById('modal-description')
export const btnCloseModal = document.getElementById('modal-boton')
const ctx = document.getElementById('weightChart')
let chartInstance = null
 
export function openModal(ex, inputId) {
  titleModal.innerText = ex.name
  descriptionModal.innerText = ex.description
 
  if (chartInstance) chartInstance.destroy()
 
  const exLabels = history[inputId]
  if (exLabels) {
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
 
export function closeModal() {
  modal.classList.remove('modal-visible')
}
 
export { modal }