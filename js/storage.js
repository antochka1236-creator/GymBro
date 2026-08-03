export const user = JSON.parse(localStorage.getItem('user')) || {}
export const weights = JSON.parse(localStorage.getItem('weights')) || {}
export const history = JSON.parse(localStorage.getItem('history')) || {}
export const doneDays = JSON.parse(localStorage.getItem('doneDays')) || {}
 
export const getUserName = () => user.name
export const getUserGoal = () => user.goal
export const getUserDays = () => user.days
export const getCurrentDay = () => parseInt(localStorage.getItem('currentDay')) || 1
 
export const saveWeights = () => localStorage.setItem('weights', JSON.stringify(weights))
export const saveHistory = () => localStorage.setItem('history', JSON.stringify(history))
export const saveDoneDays = () => localStorage.setItem('doneDays', JSON.stringify(doneDays))
export const saveCurrentDay = (day) => localStorage.setItem('currentDay', day)
export const clearDoneDays = () => {
  Object.keys(doneDays).forEach(key => delete doneDays[key])
  localStorage.setItem('doneDays', JSON.stringify({}))
}